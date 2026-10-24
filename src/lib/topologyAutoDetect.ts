import prisma from "@/lib/prisma";
import {
  TopologyNode,
  TopologyEdge,
  TopologyData,
  DeviceType,
  DevicePort,
  SwitchVlanSummary,
  generateDefaultPorts,
} from "@/types/topology";
import { SwitchPortInfo, SwitchVlanInfo } from "@/lib/snmp";

export interface AutoDetectOptions {
  topologyId?: number;
  preserveCustomEdges?: boolean;
}

export interface AutoDetectResult {
  topologyId: number;
  topology: TopologyData;
  summary: {
    totalDevices: number;
    totalEdges: number;
    routersCount: number;
    coreSwitchesCount: number;
    accessSwitchesCount: number;
    endpointsCount: number;
    linkDetails: string[];
  };
}

/**
 * Helper mapping SwitchDevice JSON ports & vlans ke DevicePort[] & SwitchVlanSummary[]
 */
function mapDevicePorts(
  portsJson?: string | null,
  vlansJson?: string | null,
  deviceType: DeviceType = "switch"
): { ports: DevicePort[]; vlans: SwitchVlanSummary[] } {
  let parsedPorts: SwitchPortInfo[] = [];
  let parsedVlans: SwitchVlanInfo[] = [];

  try {
    if (portsJson) parsedPorts = JSON.parse(portsJson);
  } catch {}

  try {
    if (vlansJson) parsedVlans = JSON.parse(vlansJson);
  } catch {}

  const vlanSummaries: SwitchVlanSummary[] = parsedVlans.map((v) => ({
    vlanId: v.vlanId,
    name: v.name,
    untaggedPorts: v.untaggedPorts || [],
    taggedPorts: v.taggedPorts || [],
    allPorts: v.allPorts || [],
  }));

  if (!Array.isArray(parsedPorts) || parsedPorts.length === 0) {
    return {
      ports: generateDefaultPorts(deviceType),
      vlans: vlanSummaries,
    };
  }

  const ports: DevicePort[] = parsedPorts.map((p, idx) => {
    const portIndex = p.index || idx + 1;
    const tagged = parsedVlans
      .filter((v) => v.taggedPorts?.includes(portIndex))
      .map((v) => v.vlanId);
    const untagged = parsedVlans
      .filter((v) => v.untaggedPorts?.includes(portIndex))
      .map((v) => v.vlanId);

    const isSfp =
      p.name.toLowerCase().includes("sfp") ||
      p.name.toLowerCase().includes("fiber") ||
      p.name.toLowerCase().includes("10g");

    let portType: "rj45" | "sfp" | "poe" | "mgmt" = isSfp ? "sfp" : "rj45";
    if (p.name.toLowerCase().includes("mgmt")) portType = "mgmt";
    else if (p.name.toLowerCase().includes("poe")) portType = "poe";

    return {
      id: `p-${portIndex}`,
      name: p.name || `Port ${portIndex}`,
      alias: p.alias || undefined,
      type: portType,
      speed: p.speed || (isSfp ? "10G" : "1G"),
      status: p.status === "up" ? "up" : "down",
      pvid: p.pvid || (untagged.length > 0 ? untagged[0] : 1),
      taggedVlans: tagged,
      untaggedVlans: untagged,
    };
  });

  return { ports, vlans: vlanSummaries };
}

/**
 * Mencari port yang paling cocok untuk uplink / interkoneksi tanpa tabrakan port
 */
function findBestUplinkPort(
  ports: DevicePort[],
  usedPortNames: Set<string>,
  preferredType: "sfp" | "rj45" = "sfp"
): DevicePort {
  if (preferredType === "sfp") {
    const unusedSfp = ports.find(
      (p) => !usedPortNames.has(p.name) && (p.type === "sfp" || /sfp|fiber|10g/i.test(p.name))
    );
    if (unusedSfp) {
      usedPortNames.add(unusedSfp.name);
      return unusedSfp;
    }
  }
  // Cari port non-loopback pertama yang berstatus up dan belum dipakai
  const unusedUpPort = ports.find(
    (p) => !usedPortNames.has(p.name) && p.status === "up" && !/mgmt|loopback|null/i.test(p.name)
  );
  if (unusedUpPort) {
    usedPortNames.add(unusedUpPort.name);
    return unusedUpPort;
  }
  // Fallback ke port mana saja yang belum dipakai
  const unusedPort = ports.find(
    (p) => !usedPortNames.has(p.name) && !/mgmt|loopback|null/i.test(p.name)
  );
  if (unusedPort) {
    usedPortNames.add(unusedPort.name);
    return unusedPort;
  }
  return ports[0] || { id: "p-1", name: "ether1", type: "rj45", speed: "1G", status: "up" };
}

function findBestDownlinkPort(ports: DevicePort[], usedPortNames: Set<string>): DevicePort {
  const unused = ports.filter((p) => !usedPortNames.has(p.name) && !/mgmt|loopback|null/i.test(p.name));
  if (unused.length > 0) {
    usedPortNames.add(unused[0].name);
    return unused[0];
  }
  return ports[0] || { id: "p-default", name: "Port 1", type: "rj45", speed: "1G", status: "up" };
}

const BUILDING_DICTIONARY: Record<string, string[]> = {
  igd: ["igd", "emergency", "gawat darurat"],
  onkologi: ["onko", "onkologi", "cancer"],
  radioterapi: ["radioterapi", "radio", "linac"],
  diagnostik: ["diagnostic", "diagnostik", "pkrs"],
  ibs: ["ibs", "bedah", "operasi"],
  poli: ["poli", "poliklinik"],
  gedung_k: ["gedung k", "gedungk", "poli-gedung-k", "irna-k", "irna k"],
  vip: ["vip", "v.i.p"],
  fasum: ["fasum", "fasilitas umum"],
  irna: ["irna b", "irna-b", "irna"],
  linen: ["linen", "laundry"],
  ipsrs: ["ipsrs", "gudang ipsrs", "workshop"],
  gizi: ["gizi", "dapur"],
  forensik: ["forensik", "jenazah", "kamar mayat"],
  keperawatan: ["keperawatan", "mangku sakti", "mangkusakti", "tiu kelep", "tiukelep", "mata jitu", "matajitu"],
  manajemen: ["manajemen", "direksi", "keuangan", "umum", "pelayanan", "perencanaan", "sdm", "diklat", "media_center", "pbj", "aula-rinjani", "aula-graha", "admin"],
  noc: ["sirs", "noc", "server", "data center", "mainhall", "bank-darah", "bank darah", "rekam-medis", "rekam medis", "rm"],
  graha: ["graha", "gemilang", "mahaputra"],
  lab: ["lab", "laboratorium", "hd2", "lab_pa"],
};

function extractBuilding(text: string, name?: string): string | null {
  const nameLower = (name || "").toLowerCase();
  if (nameLower.includes("manajemen")) return "manajemen";
  if (nameLower.includes("radioterapi")) return "radioterapi";
  if (nameLower.includes("onkologi") || nameLower.includes("onko")) return "onkologi";
  if (nameLower.includes("keperawatan") || nameLower.includes("mangku sakti") || nameLower.includes("tiu kelep") || nameLower.includes("mata jitu")) return "keperawatan";
  if (nameLower.includes("diagnostik") || nameLower.includes("diagnostic")) return "diagnostik";
  if (nameLower.includes("ibs")) return "ibs";
  if (nameLower.includes("poli")) return "poli";
  if (nameLower.includes("gedung k") || nameLower.includes("gedungk")) return "gedung_k";
  if (nameLower.includes("vip")) return "vip";
  if (nameLower.includes("fasum")) return "fasum";
  if (nameLower.includes("irna")) return "irna";
  if (nameLower.includes("linen")) return "linen";
  if (nameLower.includes("ipsrs")) return "ipsrs";
  if (nameLower.includes("gizi")) return "gizi";
  if (nameLower.includes("forensik")) return "forensik";
  if (nameLower.includes("igd")) return "igd";
  if (nameLower.includes("lab")) return "lab";
  if (nameLower.includes("noc") || nameLower.includes("server") || nameLower.includes("sirs")) return "noc";

  const lower = text.toLowerCase();
  if (lower.includes("manajemen")) return "manajemen";
  if (lower.includes("onkologi") || lower.includes("onko")) return "onkologi";
  if (lower.includes("keperawatan") || lower.includes("mangku sakti") || lower.includes("tiu kelep") || lower.includes("mata jitu")) return "keperawatan";
  if (lower.includes("radioterapi")) return "radioterapi";
  if (lower.includes("diagnostik") || lower.includes("diagnostic") || lower.includes("pkrs")) return "diagnostik";
  if (lower.includes("ibs")) return "ibs";
  if (lower.includes("poli")) return "poli";
  if (lower.includes("gedung k") || lower.includes("gedungk")) return "gedung_k";
  if (lower.includes("vip")) return "vip";
  if (lower.includes("fasum")) return "fasum";
  if (lower.includes("irna")) return "irna";
  if (lower.includes("linen")) return "linen";
  if (lower.includes("ipsrs")) return "ipsrs";
  if (lower.includes("gizi")) return "gizi";
  if (lower.includes("forensik")) return "forensik";
  if (lower.includes("igd")) return "igd";
  if (lower.includes("lab")) return "lab";
  if (lower.includes("noc") || lower.includes("server") || lower.includes("sirs") || lower.includes("mainhall") || lower.includes("bank-darah") || lower.includes("rekam-medis")) return "noc";

  for (const [key, tokens] of Object.entries(BUILDING_DICTIONARY)) {
    if (tokens.some((t) => lower.includes(t))) return key;
  }
  return null;
}

function extractFloor(text: string): number | null {
  const lower = text.toLowerCase();
  const m1 = lower.match(/(?:lantai|lt|floor)[_\s.-]*([1-8])/);
  if (m1) return parseInt(m1[1], 10);
  const m2 = lower.match(/\b([1-8])(?:st|nd|rd|th)?\s*(?:floor|lt|lantai)\b/);
  if (m2) return parseInt(m2[1], 10);
  const m3 = lower.match(/onko(?:_|\s*)lt(?:_|\s*)([1-8])/i);
  if (m3) return parseInt(m3[1], 10);
  return null;
}

/**
 * Engine Deteksi Otomatis Bentuk & Kabel Topologi Jaringan
 */
export async function autoDetectTopology(
  options: AutoDetectOptions = {}
): Promise<AutoDetectResult> {
  // 1. Ambil semua perangkat jaringan dari tabel SwitchDevice
  const devices = await prisma.switchDevice.findMany({
    orderBy: { id: "asc" },
  });

  if (devices.length === 0) {
    throw new Error("Belum ada perangkat jaringan terdaftar di sistem. Daftarkan perangkat terlebih dahulu.");
  }

  // 2. Ambil topologi aktif di database
  let topologyRecord = null;
  if (options.topologyId) {
    topologyRecord = await prisma.networkTopology.findUnique({
      where: { id: options.topologyId },
    });
  }
  if (!topologyRecord) {
    topologyRecord = await prisma.networkTopology.findFirst({
      where: { isDefault: true },
      orderBy: { updatedAt: "desc" },
    });
  }
  if (!topologyRecord) {
    topologyRecord = await prisma.networkTopology.findFirst({
      orderBy: { updatedAt: "desc" },
    });
  }

  // 3. Konversi SwitchDevice ke TopologyNode
  const nodesMap = new Map<number, TopologyNode>();
  for (const dev of devices) {
    const devType = (dev.deviceType || "switch") as DeviceType;
    const { ports, vlans } = mapDevicePorts(dev.ports, dev.vlans, devType);
    const realStatus: "online" | "warning" | "offline" =
      dev.status === "online" ? "online" : dev.status === "snmp_offline" ? "warning" : "offline";

    const node: TopologyNode = {
      id: `sw-node-${dev.id}`,
      name: dev.name,
      type: devType,
      ip: dev.ip,
      brand: dev.brand || "Network Device",
      model: dev.model || "Device",
      location: dev.location || "RSUD NTB",
      status: realStatus,
      switchDeviceId: dev.id,
      isSnmpSynced: true,
      lastPolled: dev.lastPolled ? dev.lastPolled.toISOString() : undefined,
      ports,
      vlans,
      x: 0,
      y: 0,
    };
    nodesMap.set(dev.id, node);
  }

  // 4. Klasifikasi Layer Jaringan (Tier Classification berstandar RSUD NTB)
  const allNodesList = Array.from(nodesMap.values());
  const routers: TopologyNode[] = [];
  const coreSwitches: TopologyNode[] = [];
  const accessSwitches: TopologyNode[] = [];
  const endpoints: TopologyNode[] = [];

  for (const node of allNodesList) {
    if (node.type === "router" || node.type === "firewall") {
      routers.push(node);
    } else if (node.type === "switch") {
      const isExplicitAccess =
        /access|acces|panel|lantai|ruang|gedung|edge|user|client/i.test(node.name) &&
        !/core|backbone/i.test(node.name);

      const isCore =
        !isExplicitAccess &&
        (/core|backbone|distribusi|utama/i.test(node.name) ||
          (node.model && /core|s5700|s6700|rg-s[5-9]/i.test(node.model)) ||
          node.ports.length >= 48);

      if (isCore) {
        coreSwitches.push(node);
      } else {
        accessSwitches.push(node);
      }
    } else {
      endpoints.push(node);
    }
  }

  // Jika tidak ada router, tetapi ada core switch, jadikan switch pertama sebagai root
  // Jika tidak ada core switch, ambil switch pertama menjadi core switch
  if (coreSwitches.length === 0 && accessSwitches.length > 0) {
    coreSwitches.push(accessSwitches.shift()!);
  }

  // Cari Primary Core Router (yang memiliki nama 'core' atau 'main' atau router pertama)
  let primaryCoreRouter: TopologyNode | null = null;
  if (routers.length > 0) {
    const candidate = routers.find((r) => /core|main|utama|gateway/i.test(r.name));
    primaryCoreRouter = candidate || routers[0];
  }

  // Primary Core Switch
  let primaryCoreSwitch: TopologyNode | null = null;
  if (coreSwitches.length > 0) {
    const candidate = coreSwitches.find((s) => /core|main|utama|backbone/i.test(s.name));
    primaryCoreSwitch = candidate || coreSwitches[0];
  }

  // 5. Hitung Posisi Koordinat Hirarkis & Estetis (Centered Zero-Overlap Tree)
  const canvasCenterX = 700;
  const routerSpacing = 360;
  const switchSpacing = 360;
  const accessSpacing = 520; // Ruang cukup untuk 2 kolom AP di bawah tiap switch

  // Layer 1: Routers & Firewall (Y = 90)
  if (routers.length > 0) {
    const sortedRouters = [...routers];
    if (primaryCoreRouter) {
      sortedRouters.sort((a, b) => {
        if (a.id === primaryCoreRouter?.id) return -1;
        if (b.id === primaryCoreRouter?.id) return 1;
        return 0;
      });
    }
    const totalWidth = (sortedRouters.length - 1) * routerSpacing;
    const startX = canvasCenterX - totalWidth / 2;
    sortedRouters.forEach((r, idx) => {
      r.x = Math.round(startX + idx * routerSpacing);
      r.y = 90;
    });
  }

  // Layer 2: Core Switches (Y = 320)
  if (coreSwitches.length > 0) {
    const totalWidth = (coreSwitches.length - 1) * switchSpacing;
    const startX = canvasCenterX - totalWidth / 2;
    coreSwitches.forEach((s, idx) => {
      s.x = Math.round(startX + idx * switchSpacing);
      s.y = 320;
    });
  }

  // Layer 3: Access Switches (Y = 550)
  if (accessSwitches.length > 0) {
    const totalWidth = (accessSwitches.length - 1) * accessSpacing;
    const startX = canvasCenterX - totalWidth / 2;
    accessSwitches.forEach((s, idx) => {
      s.x = Math.round(startX + idx * accessSpacing);
      s.y = 550;
    });
  }

  // Switch regional / fallback
  const igdCoreSwitch = coreSwitches.find((s) => /igd/i.test(s.name)) || primaryCoreSwitch;
  const manajemenSwitch = accessSwitches.find((s) => /manajemen/i.test(s.name)) || igdCoreSwitch;

  // Layer 4: Endpoints Clustered Under Their Parent Switch (Semantic Building & Floor Matching)
  const switchEndpointsMap = new Map<string, TopologyNode[]>();
  for (let i = 0; i < endpoints.length; i++) {
    const ep = endpoints[i];
    if (ep.type === "server" && primaryCoreSwitch) {
      const swId = primaryCoreSwitch.id;
      if (!switchEndpointsMap.has(swId)) switchEndpointsMap.set(swId, []);
      switchEndpointsMap.get(swId)!.push(ep);
    } else {
      const epText = `${ep.name} ${ep.location || ""}`;
      const epBld = extractBuilding(epText, ep.name);
      const epFlr = extractFloor(epText);

      let targetSwitch: TopologyNode | null = null;
      let bestScore = -1;

      for (const sw of accessSwitches) {
        const swText = `${sw.name} ${sw.location || ""}`;
        const swBld = extractBuilding(swText, sw.name);
        const swFlr = extractFloor(swText);

        let score = 0;
        if (epBld && swBld && epBld === swBld) {
          score += 100;
          if (epFlr !== null && swFlr !== null && epFlr === swFlr) {
            score += 50;
          }
        }

        // Kecocokan sub-ruangan khusus
        if (epText.toLowerCase().includes("tiu kelep") && swText.toLowerCase().includes("tiukelep")) score += 40;
        if (epText.toLowerCase().includes("mata jitu") && swText.toLowerCase().includes("mata jitu")) score += 40;
        if (epText.toLowerCase().includes("mangku sakti") && swText.toLowerCase().includes("mangkusakti")) score += 40;

        if (ep.type === "ap" && /ap/i.test(sw.name)) score += 10;
        if ((ep.type === "cctv" || ep.type === "nvr") && /cctv/i.test(sw.name)) score += 10;

        if (score > bestScore) {
          bestScore = score;
          targetSwitch = sw;
        }
      }

      if (bestScore < 100) {
        // Fallback cerdas berdasarkan zona gedung (bukan round-robin acak)
        if (epBld === "manajemen" || ep.location?.includes("MANAJEMEN")) {
          targetSwitch = manajemenSwitch || primaryCoreSwitch;
        } else if (epBld === "igd" || ep.location?.includes("IGD_ONKO_BLIP")) {
          targetSwitch = igdCoreSwitch || primaryCoreSwitch;
        } else {
          targetSwitch = primaryCoreSwitch;
        }
      }

      if (targetSwitch) {
        if (!switchEndpointsMap.has(targetSwitch.id)) switchEndpointsMap.set(targetSwitch.id, []);
        switchEndpointsMap.get(targetSwitch.id)!.push(ep);
      }
    }
  }

  // Tata letak sub-grid rapi di bawah masing-masing switch induk
  switchEndpointsMap.forEach((eps, switchId) => {
    const sw = allNodesList.find((n) => n.id === switchId);
    if (!sw) return;
    const cols = eps.length > 10 ? 3 : eps.length === 1 ? 1 : 2;
    const colSpacing = cols === 3 ? 100 : 130;
    const rowSpacing = 95;
    eps.forEach((ep, epIdx) => {
      const col = epIdx % cols;
      const row = Math.floor(epIdx / cols);
      const colOffset = cols === 1 ? 0 : (col - (cols - 1) / 2) * colSpacing;
      ep.x = Math.round(sw.x + colOffset);
      ep.y = Math.round(sw.y + 140 + row * rowSpacing);
    });
  });

  // 6. Deteksi Jalur Kabel & Link Otomatis (Intelligent Link Discovery)
  const generatedEdges: TopologyEdge[] = [];
  const usedPortsPerNode = new Map<string, Set<string>>();
  const linkDetails: string[] = [];

  const getUsedPortSet = (nodeId: string) => {
    if (!usedPortsPerNode.has(nodeId)) {
      usedPortsPerNode.set(nodeId, new Set<string>());
    }
    return usedPortsPerNode.get(nodeId)!;
  };

  const createEdge = (
    src: TopologyNode,
    tgt: TopologyNode,
    linkType: "fiber" | "copper" | "poe" | "trunk",
    speed: string,
    vlanDesc?: string,
    label?: string
  ) => {
    // Hindari duplikasi koneksi antar node yang sama
    const alreadyConnected = generatedEdges.some(
      (e) =>
        (e.sourceNodeId === src.id && e.targetNodeId === tgt.id) ||
        (e.sourceNodeId === tgt.id && e.targetNodeId === src.id)
    );
    if (alreadyConnected) return;

    const srcUsed = getUsedPortSet(src.id);
    const tgtUsed = getUsedPortSet(tgt.id);

    const srcPort =
      linkType === "fiber" || linkType === "trunk"
        ? findBestUplinkPort(src.ports, srcUsed, "sfp")
        : findBestDownlinkPort(src.ports, srcUsed);
    srcUsed.add(srcPort.name);

    const tgtPort =
      linkType === "fiber" || linkType === "trunk"
        ? findBestUplinkPort(tgt.ports, tgtUsed, "sfp")
        : findBestDownlinkPort(tgt.ports, tgtUsed);
    tgtUsed.add(tgtPort.name);

    const edge: TopologyEdge = {
      id: `edge-${src.id}-${tgt.id}`,
      sourceNodeId: src.id,
      sourcePort: srcPort.name,
      targetNodeId: tgt.id,
      targetPort: tgtPort.name,
      linkType,
      speed,
      vlan: vlanDesc,
      label: label || `${src.name} ↔ ${tgt.name}`,
      status: src.status === "online" && tgt.status === "online" ? "up" : "down",
    };

    generatedEdges.push(edge);
    linkDetails.push(
      `${src.name} [${srcPort.name}] ── (${linkType.toUpperCase()}) ── [${tgtPort.name}] ${tgt.name}`
    );
  };

  // LINK 1: Primary Core Router <-> Primary Core Switch (Fiber Optic 10G / 802.1Q Trunk)
  if (primaryCoreRouter && primaryCoreSwitch) {
    createEdge(
      primaryCoreRouter,
      primaryCoreSwitch,
      "fiber",
      "10 Gbps",
      "VLAN 1,10,20,30,40 (Trunk 10G)",
      "Backbone Fiber Optic 10G"
    );
  }

  // LINK 2: Sub-Routers <-> Primary Core Switch (atau Core Router jika switch terbatas)
  for (const r of routers) {
    if (primaryCoreRouter && r.id === primaryCoreRouter.id) continue;
    if (primaryCoreSwitch) {
      createEdge(
        r,
        primaryCoreSwitch,
        "trunk",
        "1 Gbps",
        "VLAN 10,20 (Trunk Gateway)",
        "Uplink Router Distribution"
      );
    } else if (primaryCoreRouter) {
      createEdge(
        r,
        primaryCoreRouter,
        "copper",
        "1 Gbps",
        "Routed PTP / Subnet Interconnect",
        "Inter-Router Link"
      );
    }
  }

  // LINK 3: Interkoneksi Core Switch Sekunder <-> Primary Core Switch (Distribution Backbone)
  for (const cs of coreSwitches) {
    if (primaryCoreSwitch && cs.id === primaryCoreSwitch.id) continue;
    if (primaryCoreSwitch) {
      createEdge(
        primaryCoreSwitch,
        cs,
        "fiber",
        "10 Gbps",
        "VLAN 10,20,30,40 (Distribution Trunk)",
        "Inter-Core Distribution Link"
      );
    } else if (primaryCoreRouter) {
      createEdge(
        primaryCoreRouter,
        cs,
        "fiber",
        "10 Gbps",
        "VLAN 10,20,30,40 (Core Uplink)",
        "Core Uplink 10G"
      );
    }
  }

  // LINK 4: Core Switch <-> Access Switches (VLAN Trunk 802.1Q)
  for (const acc of accessSwitches) {
    if (primaryCoreSwitch) {
      createEdge(
        primaryCoreSwitch,
        acc,
        "trunk",
        "1 Gbps",
        "VLAN 10,20,30,40 (802.1Q Trunk)",
        "Trunk Uplink Ruangan"
      );
    } else if (primaryCoreRouter) {
      createEdge(
        primaryCoreRouter,
        acc,
        "copper",
        "1 Gbps",
        "VLAN Untagged",
        "Direct Access Link"
      );
    }
  }

  // LINK 5: Access Switch / Core Switch <-> Endpoints (Kabel tepat ke switch induk masing-masing)
  switchEndpointsMap.forEach((eps, switchId) => {
    const parentSwitch = allNodesList.find((n) => n.id === switchId);
    if (!parentSwitch) return;
    for (const ep of eps) {
      if (ep.type === "server") {
        createEdge(
          parentSwitch,
          ep,
          "fiber",
          "10 Gbps",
          "VLAN 10 (SIMRS/Data Center)",
          "Server Farm Link"
        );
      } else {
        const isPoE = ep.type === "ap" || ep.type === "cctv";
        createEdge(
          parentSwitch,
          ep,
          isPoE ? "poe" : "copper",
          "1 Gbps",
          ep.type === "ap" ? "VLAN 20 (Hotspot)" : ep.type === "cctv" ? "VLAN 30 (CCTV)" : "VLAN 1",
          isPoE ? "PoE Power & Data" : "LAN Connection"
        );
      }
    }
  });

  // Preservasi kabel manual lama jika dipilih
  const finalEdges = [...generatedEdges];
  if (options.preserveCustomEdges && topologyRecord?.edges) {
    try {
      const oldEdges: TopologyEdge[] = JSON.parse(topologyRecord.edges);
      for (const oe of oldEdges) {
        const exists = finalEdges.some(
          (fe) =>
            (fe.sourceNodeId === oe.sourceNodeId && fe.targetNodeId === oe.targetNodeId) ||
            (fe.sourceNodeId === oe.targetNodeId && fe.targetNodeId === oe.sourceNodeId)
        );
        if (!exists) {
          finalEdges.push(oe);
        }
      }
    } catch {}
  }

  const finalNodes = allNodesList;

  // 7. Simpan kembali ke database NetworkTopology
  const topologyViewport = {
    zoom: 0.85,
    panX: 40,
    panY: 30,
  };

  let savedTopologyId = topologyRecord?.id || 1;
  const jsonNodes = JSON.stringify(finalNodes);
  const jsonEdges = JSON.stringify(finalEdges);
  const jsonViewport = JSON.stringify(topologyViewport);

  if (topologyRecord) {
    await prisma.networkTopology.update({
      where: { id: topologyRecord.id },
      data: {
        nodes: jsonNodes,
        edges: jsonEdges,
        viewport: jsonViewport,
      },
    });
    savedTopologyId = topologyRecord.id;
  } else {
    const created = await prisma.networkTopology.create({
      data: {
        name: "Topologi RSUD NTB (Auto-Detected)",
        description: "Bentuk topologi dan koneksi kabel terdeteksi otomatis dari perangkat fisik",
        isDefault: true,
        nodes: jsonNodes,
        edges: jsonEdges,
        viewport: jsonViewport,
      },
    });
    savedTopologyId = created.id;
  }

  const topologyResult: TopologyData = {
    id: savedTopologyId,
    name: topologyRecord?.name || "Topologi RSUD NTB (Auto-Detected)",
    description: topologyRecord?.description || undefined,
    isDefault: true,
    nodes: finalNodes,
    edges: finalEdges,
    viewport: topologyViewport,
  };

  return {
    topologyId: savedTopologyId,
    topology: topologyResult,
    summary: {
      totalDevices: finalNodes.length,
      totalEdges: finalEdges.length,
      routersCount: routers.length,
      coreSwitchesCount: coreSwitches.length,
      accessSwitchesCount: accessSwitches.length,
      endpointsCount: endpoints.length,
      linkDetails,
    },
  };
}
