import snmp from "net-snmp";

export interface SnmpConfig {
  ip: string;
  community?: string;
  port?: number;
  version?: "1" | "2c";
  timeout?: number;
  retries?: number;
}

export interface SwitchPortInfo {
  index: number;
  name: string;
  alias?: string;
  status: "up" | "down" | "unknown";
  speed?: string;
  pvid?: number;
}

export interface SwitchVlanInfo {
  vlanId: number;
  name: string;
  untaggedPorts: number[];
  taggedPorts: number[];
  allPorts: number[];
}

export interface SwitchProbeResult {
  brand: string;
  model: string;
  name: string;
  location: string;
  sysDescr: string;
  sysObjectID: string;
  uptime: string;
  status: "online" | "offline";
  ports: SwitchPortInfo[];
  vlans: SwitchVlanInfo[];
  error?: string;
}

// OIDs Standar
const OID_SYS_DESCR = "1.3.6.1.2.1.1.1.0";
const OID_SYS_OBJECT_ID = "1.3.6.1.2.1.1.2.0";
const OID_SYS_UPTIME = "1.3.6.1.2.1.1.3.0";
const OID_SYS_NAME = "1.3.6.1.2.1.1.5.0";
const OID_SYS_LOCATION = "1.3.6.1.2.1.1.6.0";

// IF-MIB (Interfaces)
const OID_IF_DESCR = "1.3.6.1.2.1.2.2.1.2";
const OID_IF_OPER_STATUS = "1.3.6.1.2.1.2.2.1.8";
const OID_IF_SPEED = "1.3.6.1.2.1.2.2.1.5";
const OID_IF_NAME = "1.3.6.1.2.1.31.1.1.1.1";
const OID_IF_ALIAS = "1.3.6.1.2.1.31.1.1.1.18";

// RFC 2674 Q-BRIDGE-MIB (Standar IEEE 802.1Q)
const OID_DOT1Q_VLAN_NAME = "1.3.6.1.2.1.17.7.1.4.3.1.1";
const OID_DOT1Q_EGRESS_PORTS = "1.3.6.1.2.1.17.7.1.4.3.1.2";
const OID_DOT1Q_UNTAGGED_PORTS = "1.3.6.1.2.1.17.7.1.4.3.1.4";
const OID_DOT1Q_PVID = "1.3.6.1.2.1.17.7.1.4.5.1.1";

// TP-Link Enterprise Dot1Q VLAN MIB (TL-SG2428P, JetStream series)
const OID_TPLINK_DOT1Q_VLAN = "1.3.6.1.4.1.11863.6.14.1.2.1.1";
const OID_TPLINK_PORT_PVID = "1.3.6.1.4.1.11863.6.14.1.1.1.1.3";

// Cisco Catalyst Enterprise MIBs (CISCO-VTP-MIB & CISCO-VLAN-MEMBERSHIP-MIB)
const OID_CISCO_VTP_VLAN_NAME = "1.3.6.1.4.1.9.9.46.1.3.1.1.4.1";
const OID_CISCO_VM_VLAN = "1.3.6.1.4.1.9.9.68.1.2.2.1.2";

/**
 * Format uptime dari centiseconds (timeticks) ke string yang mudah dibaca
 */
export function formatUpTime(ticks: number): string {
  const totalSeconds = Math.floor(ticks / 100);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);

  if (days > 0) {
    return `${days}h ${hours}j ${minutes}m`;
  }
  if (hours > 0) {
    return `${hours}j ${minutes}m`;
  }
  return `${minutes} menit`;
}

/**
 * Mendeteksi nomor port dari nama interface (misal: "gigabitEthernet 1/0/24" -> 24)
 */
export function extractPortNumber(name: string, fallbackIdx: number): number {
  if (!name) return fallbackIdx > 1000 ? fallbackIdx % 1000 : fallbackIdx;
  const match = name.match(/(?:[a-zA-Z0-9_\/]+\/)+(\d+)$/i) || name.match(/port\s*(\d+)$/i);
  if (match) {
    const num = parseInt(match[1], 10);
    if (!isNaN(num) && num > 0 && num < 1000) return num;
  }
  return fallbackIdx > 1000 ? fallbackIdx % 1000 : fallbackIdx;
}

/**
 * Parse string range port vendor (misal: "1/0/13,1/0/23-24" atau "1-28" atau "1/0/22") ke array number
 */
export function parsePortRangeString(str: string): number[] {
  if (!str) return [];
  const ports: number[] = [];
  const parts = str.split(",");
  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    // Format "1/0/1-12" atau "1-12"
    const rangeMatch = trimmed.match(/(?:[a-zA-Z0-9_\/]+\/)?(\d+)\s*-\s*(?:[a-zA-Z0-9_\/]+\/)?(\d+)/);
    if (rangeMatch) {
      const start = parseInt(rangeMatch[1], 10);
      const end = parseInt(rangeMatch[2], 10);
      for (let i = start; i <= end; i++) {
        if (!ports.includes(i)) ports.push(i);
      }
    } else {
      const singleMatch = trimmed.match(/(?:[a-zA-Z0-9_\/]+\/)?(\d+)$/);
      if (singleMatch) {
        const port = parseInt(singleMatch[1], 10);
        if (!ports.includes(port)) ports.push(port);
      }
    }
  }
  return ports.sort((a, b) => a - b);
}

/**
 * Mendeteksi brand dan model dari sysDescr dan sysObjectID
 */
export function detectBrandAndModel(sysDescr: string, sysObjectID: string): { brand: string; model: string } {
  const desc = sysDescr || "";
  const oid = sysObjectID || "";

  // 1. Ruijie / Reyee
  if (oid.includes(".1.3.6.1.4.1.4881.") || /ruijie|reyee|rg-s/i.test(desc)) {
    const modelMatch = desc.match(/(RG-[A-Z0-9_-]+|NBS[A-Z0-9_-]+|Reyee\s+[A-Z0-9_-]+)/i);
    return {
      brand: "Ruijie Networks",
      model: modelMatch ? modelMatch[0] : "Ruijie Switch",
    };
  }

  // 2. ZTE
  if (oid.includes(".1.3.6.1.4.1.3902.") || /zte|zxr10/i.test(desc)) {
    const modelMatch = desc.match(/(ZXR10\s+[A-Z0-9_-]+|ZTE\s+[A-Z0-9_-]+)/i);
    return {
      brand: "ZTE",
      model: modelMatch ? modelMatch[0] : "ZXR10 Series",
    };
  }

  // 3. TP-Link
  if (oid.includes(".1.3.6.1.4.1.11863.") || /tp-link|jetstream|tl-sg|sg[0-9]/i.test(desc)) {
    const modelMatch = desc.match(/(TL-[A-Z0-9_-]+|SG[0-9]+[A-Z0-9_-]*|JetStream[A-Za-z0-9\s-]+)/i);
    return {
      brand: "TP-Link",
      model: modelMatch ? modelMatch[0].trim() : "JetStream Switch",
    };
  }

  // 4. Cisco
  if (oid.includes(".1.3.6.1.4.1.9.") || /cisco|catalyst|ios/i.test(desc)) {
    const modelMatch = desc.match(/(WS-C[A-Z0-9_-]+|C9[0-9]{3}[A-Z0-9_-]*|Catalyst\s+[A-Z0-9_-]+)/i);
    return {
      brand: "Cisco Systems",
      model: modelMatch ? modelMatch[0] : "Catalyst Switch",
    };
  }

  // 5. Huawei
  if (oid.includes(".1.3.6.1.4.1.2011.") || /huawei|vrp|quidway|s5700/i.test(desc)) {
    const modelMatch = desc.match(/(S[0-9]{4}[A-Z0-9_-]+|Quidway\s+[A-Z0-9_-]+)/i);
    return {
      brand: "Huawei",
      model: modelMatch ? modelMatch[0] : "CloudEngine / VRP",
    };
  }

  // 6. MikroTik
  if (oid.includes(".1.3.6.1.4.1.14988.") || /mikrotik|routeros|crs/i.test(desc)) {
    const modelMatch = desc.match(/(CRS[0-9]{3}-[A-Z0-9_-]+|RouterBOARD\s+[A-Z0-9_-]+)/i);
    return {
      brand: "MikroTik",
      model: modelMatch ? modelMatch[0] : "Cloud Router Switch",
    };
  }

  // Fallback
  return {
    brand: "Generic Switch",
    model: desc.slice(0, 40) || "Managed Switch",
  };
}

/**
 * Decode Q-Bridge port bitmask (OctetString) ke array nomor port (1-based)
 */
export function decodePortBitmap(val: any): number[] {
  const ports: number[] = [];
  if (!val) return ports;

  let buffer: Buffer;
  if (Buffer.isBuffer(val)) {
    buffer = val;
  } else if (typeof val === "string") {
    const cleanHex = val.replace(/[^0-9a-fA-F]/g, "");
    if (cleanHex.length > 0 && cleanHex.length % 2 === 0) {
      buffer = Buffer.from(cleanHex, "hex");
    } else {
      buffer = Buffer.from(val, "binary");
    }
  } else {
    return ports;
  }

  for (let byteIdx = 0; byteIdx < buffer.length; byteIdx++) {
    const byte = buffer[byteIdx];
    for (let bitIdx = 0; bitIdx < 8; bitIdx++) {
      if ((byte & (0x80 >> bitIdx)) !== 0) {
        ports.push(byteIdx * 8 + bitIdx + 1);
      }
    }
  }

  return ports;
}

/**
 * Buat session SNMP
 */
function createSession(config: SnmpConfig): any {
  const version = config.version === "1" ? snmp.Version1 : snmp.Version2c;
  const options = {
    port: config.port || 161,
    retries: config.retries ?? 1,
    timeout: config.timeout ?? 2500,
    transport: "udp4" as const,
    version,
  };
  return snmp.createSession(config.ip, config.community || "public", options);
}

/**
 * Promise wrapper untuk snmp.get
 */
function snmpGet(session: any, oids: string[]): Promise<any[]> {
  return new Promise((resolve, reject) => {
    session.get(oids, (error: any, varbinds: any[]) => {
      if (error) return reject(error);
      resolve(varbinds || []);
    });
  });
}

/**
 * Promise wrapper untuk snmp.subtree (SNMP Walk)
 */
function snmpSubtree(session: any, rootOid: string): Promise<any[]> {
  return new Promise((resolve) => {
    const results: any[] = [];
    session.subtree(
      rootOid,
      (varbinds: any[]) => {
        if (Array.isArray(varbinds)) {
          results.push(...varbinds);
        }
      },
      () => {
        resolve(results);
      }
    );
  });
}

/**
 * Probe lengkap Switch via SNMP: Sistem, Port, dan VLAN (Multi-Vendor: Q-Bridge, TP-Link, Cisco, Ruijie)
 */
export async function probeSwitch(config: SnmpConfig): Promise<SwitchProbeResult> {
  const session = createSession(config);

  try {
    // 1. Ambil informasi sistem dasar
    let sysDescr = "";
    let sysObjectID = "";
    let uptimeTicks = 0;
    let sysName = "";
    let sysLocation = "";

    try {
      const varbinds = await snmpGet(session, [
        OID_SYS_DESCR,
        OID_SYS_OBJECT_ID,
        OID_SYS_UPTIME,
        OID_SYS_NAME,
        OID_SYS_LOCATION,
      ]);

      for (const vb of varbinds) {
        if (snmp.isVarbindError(vb)) continue;
        const oid = vb.oid;
        const val = vb.value;

        if (oid === OID_SYS_DESCR) sysDescr = String(val);
        else if (oid === OID_SYS_OBJECT_ID) sysObjectID = String(val);
        else if (oid === OID_SYS_UPTIME) uptimeTicks = Number(val) || 0;
        else if (oid === OID_SYS_NAME) sysName = String(val);
        else if (oid === OID_SYS_LOCATION) sysLocation = String(val);
      }
    } catch (err: any) {
      session.close();
      return {
        brand: "Unknown",
        model: "Unknown",
        name: config.ip,
        location: "",
        sysDescr: "",
        sysObjectID: "",
        uptime: "-",
        status: "offline",
        ports: [],
        vlans: [],
        error: `SNMP Timeout / Gagal terhubung ke ${config.ip}: ${err.message || err}`,
      };
    }

    const { brand, model } = detectBrandAndModel(sysDescr, sysObjectID);
    const uptimeStr = formatUpTime(uptimeTicks);

    // 2. Walk IF-MIB untuk port
    const ifDescrBinds = await snmpSubtree(session, OID_IF_DESCR);
    const ifNameBinds = await snmpSubtree(session, OID_IF_NAME);
    const ifAliasBinds = await snmpSubtree(session, OID_IF_ALIAS);
    const ifOperBinds = await snmpSubtree(session, OID_IF_OPER_STATUS);
    const ifSpeedBinds = await snmpSubtree(session, OID_IF_SPEED);
    const pvidBinds = await snmpSubtree(session, OID_DOT1Q_PVID);

    // Map internal key = ifIndex asli
    const portsMap = new Map<number, SwitchPortInfo>();

    // Mapping IfDescr
    for (const vb of ifDescrBinds) {
      if (snmp.isVarbindError(vb)) continue;
      const match = vb.oid.match(/\.([0-9]+)$/);
      if (!match) continue;
      const idx = parseInt(match[1], 10);
      const descr = String(vb.value || `Port ${idx}`);
      const cleanPortNum = extractPortNumber(descr, idx);

      portsMap.set(idx, {
        index: cleanPortNum,
        name: descr,
        status: "unknown",
      });
    }

    // Mapping IfName
    for (const vb of ifNameBinds) {
      if (snmp.isVarbindError(vb)) continue;
      const match = vb.oid.match(/\.([0-9]+)$/);
      if (!match) continue;
      const idx = parseInt(match[1], 10);
      const port = portsMap.get(idx);
      if (port && vb.value) {
        port.name = String(vb.value);
        // Refresh nomor port jika IfName lebih spesifik
        port.index = extractPortNumber(port.name, idx);
      }
    }

    // Mapping IfAlias
    for (const vb of ifAliasBinds) {
      if (snmp.isVarbindError(vb)) continue;
      const match = vb.oid.match(/\.([0-9]+)$/);
      if (!match) continue;
      const idx = parseInt(match[1], 10);
      const port = portsMap.get(idx);
      if (port && vb.value) {
        port.alias = String(vb.value);
      }
    }

    // Mapping OperStatus (1 = Up, 2 = Down)
    for (const vb of ifOperBinds) {
      if (snmp.isVarbindError(vb)) continue;
      const match = vb.oid.match(/\.([0-9]+)$/);
      if (!match) continue;
      const idx = parseInt(match[1], 10);
      const port = portsMap.get(idx);
      if (port) {
        port.status = Number(vb.value) === 1 ? "up" : "down";
      }
    }

    // Mapping Speed
    for (const vb of ifSpeedBinds) {
      if (snmp.isVarbindError(vb)) continue;
      const match = vb.oid.match(/\.([0-9]+)$/);
      if (!match) continue;
      const idx = parseInt(match[1], 10);
      const port = portsMap.get(idx);
      if (port) {
        const speedNum = Number(vb.value) || 0;
        if (speedNum >= 10000000000) port.speed = "10G";
        else if (speedNum >= 1000000000) port.speed = "1G";
        else if (speedNum >= 100000000) port.speed = "100M";
        else if (speedNum > 0) port.speed = `${Math.round(speedNum / 1000000)}M`;
      }
    }

    // Mapping PVID standar Q-BRIDGE
    for (const vb of pvidBinds) {
      if (snmp.isVarbindError(vb)) continue;
      const match = vb.oid.match(/\.([0-9]+)$/);
      if (!match) continue;
      const idx = parseInt(match[1], 10);
      const port = portsMap.get(idx);
      if (port && vb.value) {
        port.pvid = Number(vb.value);
      }
    }

    // 3. Walk VLAN Discovery
    const vlansMap = new Map<number, SwitchVlanInfo>();

    // A. Coba RFC 2674 Q-BRIDGE-MIB terlebih dahulu (Standar IEEE)
    const vlanNameBinds = await snmpSubtree(session, OID_DOT1Q_VLAN_NAME);
    const egressBinds = await snmpSubtree(session, OID_DOT1Q_EGRESS_PORTS);
    const untaggedBinds = await snmpSubtree(session, OID_DOT1Q_UNTAGGED_PORTS);

    for (const vb of vlanNameBinds) {
      if (snmp.isVarbindError(vb)) continue;
      const match = vb.oid.match(/\.([0-9]+)$/);
      if (!match) continue;
      const vlanId = parseInt(match[1], 10);
      const name = String(vb.value || `VLAN ${vlanId}`);
      vlansMap.set(vlanId, {
        vlanId,
        name,
        untaggedPorts: [],
        taggedPorts: [],
        allPorts: [],
      });
    }

    // Parse Q-Bridge Egress Ports
    for (const vb of egressBinds) {
      if (snmp.isVarbindError(vb)) continue;
      const match = vb.oid.match(/\.([0-9]+)$/);
      if (!match) continue;
      const vlanId = parseInt(match[1], 10);
      let vlan = vlansMap.get(vlanId);
      if (!vlan) {
        vlan = { vlanId, name: `VLAN ${vlanId}`, untaggedPorts: [], taggedPorts: [], allPorts: [] };
        vlansMap.set(vlanId, vlan);
      }
      vlan.allPorts = decodePortBitmap(vb.value);
    }

    // Parse Q-Bridge Untagged Ports
    for (const vb of untaggedBinds) {
      if (snmp.isVarbindError(vb)) continue;
      const match = vb.oid.match(/\.([0-9]+)$/);
      if (!match) continue;
      const vlanId = parseInt(match[1], 10);
      const vlan = vlansMap.get(vlanId);
      if (vlan) {
        vlan.untaggedPorts = decodePortBitmap(vb.value);
        const untaggedSet = new Set(vlan.untaggedPorts);
        vlan.taggedPorts = vlan.allPorts.filter((p) => !untaggedSet.has(p));
      }
    }

    // B. Jika Q-BRIDGE kosong dan perangkat adalah TP-Link (atau switch JetStream)
    if (vlansMap.size === 0 || brand.includes("TP-Link") || sysObjectID.includes(".11863.")) {
      const tpVlanBinds = await snmpSubtree(session, OID_TPLINK_DOT1Q_VLAN);
      for (const vb of tpVlanBinds) {
        if (snmp.isVarbindError(vb)) continue;
        const match = vb.oid.match(/(?:^|\.)1\.3\.6\.1\.4\.1\.11863\.6\.14\.1\.2\.1\.1\.(\d+)\.(\d+)$/);
        if (!match) continue;
        const col = parseInt(match[1], 10);
        const vlanId = parseInt(match[2], 10);

        let vlan = vlansMap.get(vlanId);
        if (!vlan) {
          vlan = { vlanId, name: `VLAN ${vlanId}`, untaggedPorts: [], taggedPorts: [], allPorts: [] };
          vlansMap.set(vlanId, vlan);
        }

        let val = vb.value;
        if (Buffer.isBuffer(val)) val = val.toString("utf8");

        if (col === 2 && val) {
          vlan.name = String(val).trim();
        } else if (col === 3 && val) {
          vlan.taggedPorts = parsePortRangeString(String(val));
        } else if (col === 4 && val) {
          vlan.untaggedPorts = parsePortRangeString(String(val));
        }
      }

      // Ambil Port PVID dari TP-Link Enterprise
      const tpPvidBinds = await snmpSubtree(session, OID_TPLINK_PORT_PVID);
      for (const vb of tpPvidBinds) {
        if (snmp.isVarbindError(vb)) continue;
        const match = vb.oid.match(/\.([0-9]+)$/);
        if (!match) continue;
        const ifIdx = parseInt(match[1], 10);
        const port = portsMap.get(ifIdx);
        if (port && vb.value) {
          port.pvid = Number(vb.value);
        }
      }
    }

    // C. Jika masih kosong dan perangkat adalah Cisco (CISCO-VTP-MIB)
    if (vlansMap.size === 0 && (brand.includes("Cisco") || sysObjectID.includes(".9."))) {
      const ciscoVlanBinds = await snmpSubtree(session, OID_CISCO_VTP_VLAN_NAME);
      for (const vb of ciscoVlanBinds) {
        if (snmp.isVarbindError(vb)) continue;
        const match = vb.oid.match(/\.([0-9]+)$/);
        if (!match) continue;
        const vlanId = parseInt(match[1], 10);
        const name = String(vb.value || `VLAN ${vlanId}`);
        vlansMap.set(vlanId, {
          vlanId,
          name,
          untaggedPorts: [],
          taggedPorts: [],
          allPorts: [],
        });
      }

      const ciscoVmBinds = await snmpSubtree(session, OID_CISCO_VM_VLAN);
      for (const vb of ciscoVmBinds) {
        if (snmp.isVarbindError(vb)) continue;
        const match = vb.oid.match(/\.([0-9]+)$/);
        if (!match) continue;
        const ifIdx = parseInt(match[1], 10);
        const port = portsMap.get(ifIdx);
        const vlanId = Number(vb.value);
        if (port && vlanId) {
          port.pvid = vlanId;
          const vlan = vlansMap.get(vlanId);
          if (vlan && !vlan.untaggedPorts.includes(port.index)) {
            vlan.untaggedPorts.push(port.index);
          }
        }
      }
    }

    // D. Hitung ulang allPorts untuk setiap VLAN
    for (const vlan of vlansMap.values()) {
      vlan.allPorts = Array.from(new Set([...vlan.untaggedPorts, ...vlan.taggedPorts])).sort((a, b) => a - b);
    }

    // E. Fallback: infer VLAN dari port PVID jika masih belum ada
    if (vlansMap.size === 0) {
      for (const port of portsMap.values()) {
        if (port.pvid) {
          let vlan = vlansMap.get(port.pvid);
          if (!vlan) {
            vlan = {
              vlanId: port.pvid,
              name: `VLAN ${port.pvid}`,
              untaggedPorts: [],
              taggedPorts: [],
              allPorts: [],
            };
            vlansMap.set(port.pvid, vlan);
          }
          if (!vlan.untaggedPorts.includes(port.index)) {
            vlan.untaggedPorts.push(port.index);
            vlan.allPorts.push(port.index);
          }
        }
      }
    }

    // F. Sinkronkan PVID port dari VLAN untagged (jika port belum punya PVID)
    for (const vlan of vlansMap.values()) {
      for (const pNum of vlan.untaggedPorts) {
        for (const port of portsMap.values()) {
          if (port.index === pNum && !port.pvid) {
            port.pvid = vlan.vlanId;
          }
        }
      }
    }

    // Urutkan port dan vlan
    const sortedPorts = Array.from(portsMap.values())
      .filter((p) => !/null|loopback|vlan/i.test(p.name))
      .sort((a, b) => a.index - b.index);

    const sortedVlans = Array.from(vlansMap.values()).sort((a, b) => a.vlanId - b.vlanId);

    session.close();

    return {
      brand,
      model,
      name: sysName || config.ip,
      location: sysLocation || "Ruang Server RSUD NTB",
      sysDescr,
      sysObjectID,
      uptime: uptimeStr,
      status: "online",
      ports: sortedPorts,
      vlans: sortedVlans,
    };
  } catch (err: any) {
    session.close();
    return {
      brand: "Unknown",
      model: "Unknown",
      name: config.ip,
      location: "",
      sysDescr: "",
      sysObjectID: "",
      uptime: "-",
      status: "offline",
      ports: [],
      vlans: [],
      error: `Error saat memproses SNMP: ${err.message || err}`,
    };
  }
}
