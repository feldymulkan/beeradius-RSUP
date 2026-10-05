import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { defaultHospitalTopology } from '@/lib/defaultTopology';
import {
  TopologyData,
  TopologyNode,
  TopologyEdge,
  DevicePort,
  DeviceType,
  SwitchVlanSummary,
  generateDefaultPorts,
} from '@/types/topology';
import { SwitchPortInfo, SwitchVlanInfo } from '@/lib/snmp';

// Helper to convert SwitchDevice ports & vlans JSON into DevicePort[]
function mapSwitchPortsToDevicePorts(
  portsJson?: string | null,
  vlansJson?: string | null,
  deviceType: DeviceType = 'switch'
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
      p.name.toLowerCase().includes('sfp') ||
      p.name.toLowerCase().includes('fiber') ||
      p.name.toLowerCase().includes('10g');

    let portType: 'rj45' | 'sfp' | 'poe' | 'mgmt' = isSfp ? 'sfp' : 'rj45';
    if (p.name.toLowerCase().includes('mgmt')) portType = 'mgmt';

    return {
      id: `sw-p-${portIndex}`,
      name: p.name || `Port ${portIndex}`,
      alias: p.alias || undefined,
      type: portType,
      speed: p.speed || (isSfp ? '10G' : '1G'),
      status: p.status === 'up' ? 'up' : 'down',
      pvid: p.pvid || (untagged.length > 0 ? untagged[0] : 1),
      taggedVlans: tagged,
      untaggedVlans: untagged,
    };
  });

  return { ports, vlans: vlanSummaries };
}

// GET: Check diff and sync status between SwitchDevice and NetworkTopology
export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const [switches, activeTopology] = await Promise.all([
      prisma.switchDevice.findMany({
        orderBy: { name: 'asc' },
      }),
      prisma.networkTopology.findFirst({
        where: { isDefault: true },
        orderBy: { updatedAt: 'desc' },
      }) || prisma.networkTopology.findFirst({
        orderBy: { updatedAt: 'desc' },
      }),
    ]);

    let nodes: TopologyNode[] = [];
    if (activeTopology?.nodes) {
      try {
        nodes = JSON.parse(activeTopology.nodes);
      } catch {}
    } else {
      nodes = defaultHospitalTopology.nodes;
    }

    // Bandingkan setiap switch di database dengan node yang ada di kanvas topologi
    const diffList = switches.map((sw) => {
      let parsedPorts: SwitchPortInfo[] = [];
      let parsedVlans: SwitchVlanInfo[] = [];
      try {
        if (sw.ports) parsedPorts = JSON.parse(sw.ports);
      } catch {}
      try {
        if (sw.vlans) parsedVlans = JSON.parse(sw.vlans);
      } catch {}

      // Temukan node yang bersesuaian di kanvas
      const matchedNode = nodes.find(
        (n) =>
          n.switchDeviceId === sw.id ||
          (n.type === 'switch' && n.ip && sw.ip && n.ip === sw.ip) ||
          (n.type === 'switch' && n.name.toLowerCase() === sw.name.toLowerCase())
      );

      const realStatus = sw.status === 'online' ? 'online' : 'offline';

      if (!matchedNode) {
        return {
          switchId: sw.id,
          name: sw.name,
          deviceType: (sw as any).deviceType || 'switch',
          connMethod: (sw as any).connMethod || 'snmp',
          ip: sw.ip,
          brand: sw.brand || 'Perangkat',
          model: sw.model || 'Managed Device',
          location: sw.location || 'RSUD NTB',
          status: realStatus,
          lastPolled: sw.lastPolled,
          portCount: parsedPorts.length || 24,
          vlanCount: parsedVlans.length,
          syncStatus: 'new' as const, // Belum ada di topologi
          canvasNodeId: null,
          details: 'Perangkat belum ada di kanvas topologi',
        };
      }

      // Cek apakah ada perubahan status, IP, port, atau VLAN
      const statusDiff = matchedNode.status !== realStatus;
      const ipDiff = matchedNode.ip !== sw.ip;
      const nameDiff = matchedNode.name !== sw.name;
      const syncFlagMissing = !matchedNode.isSnmpSynced;
      const portCountDiff =
        parsedPorts.length > 0 && matchedNode.ports.length !== parsedPorts.length;

      const needsUpdate = statusDiff || ipDiff || nameDiff || syncFlagMissing || portCountDiff;

      return {
        switchId: sw.id,
        name: sw.name,
        deviceType: (sw as any).deviceType || matchedNode.type || 'switch',
        connMethod: (sw as any).connMethod || 'snmp',
        ip: sw.ip,
        brand: sw.brand || 'Perangkat',
        model: sw.model || 'Managed Device',
        location: sw.location || 'RSUD NTB',
        status: realStatus,
        lastPolled: sw.lastPolled,
        portCount: parsedPorts.length || matchedNode.ports.length,
        vlanCount: parsedVlans.length,
        syncStatus: needsUpdate ? ('needs_update' as const) : ('synced' as const),
        canvasNodeId: matchedNode.id,
        diffs: {
          status: statusDiff ? { canvas: matchedNode.status, db: realStatus } : null,
          ip: ipDiff ? { canvas: matchedNode.ip, db: sw.ip } : null,
          ports: portCountDiff
            ? { canvas: matchedNode.ports.length, db: parsedPorts.length }
            : null,
        },
        details: needsUpdate
          ? 'Perbedaan data terdeteksi (status, IP, atau port SNMP)'
          : 'Data sudah tersinkron dengan kanvas',
      };
    });

    const newCount = diffList.filter((d) => d.syncStatus === 'new').length;
    const updateCount = diffList.filter((d) => d.syncStatus === 'needs_update').length;
    const syncedCount = diffList.filter((d) => d.syncStatus === 'synced').length;

    return NextResponse.json({
      success: true,
      data: {
        switches: diffList,
        summary: {
          totalRegistered: switches.length,
          newCount,
          updateCount,
          syncedCount,
          hasDiscrepancy: newCount > 0 || updateCount > 0,
        },
      },
    });
  } catch (error: any) {
    console.error('Error checking topology switch sync status:', error);
    return NextResponse.json(
      { message: 'Gagal memeriksa status sinkronisasi switch', error: error.message },
      { status: 500 }
    );
  }
}

// POST: Execute switch synchronization to NetworkTopology
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      switchDeviceIds, // Opsional: array ID switch yang ingin disinkronkan, jika kosong = semua
      preserveExistingEdges = true,
    } = body;

    // 1. Ambil topologi aktif
    let topologyRecord = await prisma.networkTopology.findFirst({
      where: { isDefault: true },
      orderBy: { updatedAt: 'desc' },
    });

    if (!topologyRecord) {
      topologyRecord = await prisma.networkTopology.findFirst({
        orderBy: { updatedAt: 'desc' },
      });
    }

    let topology: TopologyData;
    if (topologyRecord) {
      topology = {
        id: topologyRecord.id,
        name: topologyRecord.name,
        description: topologyRecord.description || undefined,
        isDefault: topologyRecord.isDefault,
        nodes: JSON.parse(topologyRecord.nodes || '[]'),
        edges: JSON.parse(topologyRecord.edges || '[]'),
        viewport: topologyRecord.viewport
          ? JSON.parse(topologyRecord.viewport)
          : { zoom: 1, panX: 0, panY: 0 },
      };
    } else {
      topology = { ...defaultHospitalTopology };
    }

    // 2. Ambil data SwitchDevice dari database
    const whereClause: any = {};
    if (Array.isArray(switchDeviceIds) && switchDeviceIds.length > 0) {
      whereClause.id = { in: switchDeviceIds.map((id: any) => Number(id)) };
    }

    const switchesToSync = await prisma.switchDevice.findMany({
      where: whereClause,
      orderBy: { id: 'asc' },
    });

    if (switchesToSync.length === 0) {
      return NextResponse.json(
        { message: 'Tidak ada perangkat switch yang dipilih untuk disinkronkan' },
        { status: 400 }
      );
    }

    let nodesAdded = 0;
    let nodesUpdated = 0;
    const updatedNodes: TopologyNode[] = [...topology.nodes];
    const updatedEdges: TopologyEdge[] = [...topology.edges];

    // Temukan posisi untuk penempatan node baru jika belum ada
    let nextX = 260;
    const startY = 320;

    for (const sw of (switchesToSync as any[])) {
      const devType = (sw.deviceType || 'switch') as DeviceType;
      const { ports, vlans } = mapSwitchPortsToDevicePorts(sw.ports, sw.vlans, devType);
      const realStatus = sw.status === 'online' ? 'online' : 'offline';

      // Cari apakah node sudah ada di canvas
      const nodeIndex = updatedNodes.findIndex(
        (n) =>
          n.switchDeviceId === sw.id ||
          (n.ip && sw.ip && n.ip === sw.ip) ||
          (n.name.toLowerCase() === sw.name.toLowerCase())
      );

      if (nodeIndex >= 0) {
        // --- UPDATE EXISTING NODE ---
        const existingNode = updatedNodes[nodeIndex];

        // Preservasi kabel: pastikan port yang sebelumnya terhubung kabel tetap ada
        if (preserveExistingEdges) {
          const connectedEdges = updatedEdges.filter(
            (e) => e.sourceNodeId === existingNode.id || e.targetNodeId === existingNode.id
          );

          // Cek apakah ada port yang dipakai kabel tapi namanya berbeda di port SNMP baru
          connectedEdges.forEach((edge) => {
            const isSource = edge.sourceNodeId === existingNode.id;
            const edgePortName = isSource ? edge.sourcePort : edge.targetPort;

            const portExists = ports.some(
              (p) => p.name.toLowerCase() === edgePortName.toLowerCase()
            );

            if (!portExists) {
              // Coba intelligent matching: jika edgePortName 'port 1' -> match dengan port pertama
              const numMatch = edgePortName.match(/\d+/);
              if (numMatch) {
                const portNum = parseInt(numMatch[0], 10);
                const matchedPort = ports.find((p) => {
                  const m = p.name.match(/\d+/);
                  return m && parseInt(m[0], 10) === portNum;
                });

                if (matchedPort) {
                  if (isSource) edge.sourcePort = matchedPort.name;
                  else edge.targetPort = matchedPort.name;
                } else {
                  // Tambahkan nama port lama sebagai fallback agar kabel tidak putus
                  ports.push({
                    id: `legacy-${Date.now()}-${Math.random()}`,
                    name: edgePortName,
                    type: 'rj45',
                    speed: '1G',
                    status: 'up',
                  });
                }
              } else {
                ports.push({
                  id: `legacy-${Date.now()}-${Math.random()}`,
                  name: edgePortName,
                  type: 'rj45',
                  speed: '1G',
                  status: 'up',
                });
              }
            }
          });
        }

        updatedNodes[nodeIndex] = {
          ...existingNode,
          name: sw.name,
          type: devType,
          ip: sw.ip,
          brand: sw.brand || existingNode.brand || 'Network Device',
          model: sw.model || existingNode.model || 'Device',
          location: sw.location || existingNode.location || 'RSUD NTB',
          status: realStatus,
          switchDeviceId: sw.id,
          isSnmpSynced: true,
          lastPolled: sw.lastPolled ? sw.lastPolled.toISOString() : undefined,
          ports,
          vlans,
        };
        nodesUpdated++;
      } else {
        // --- ADD NEW NODE TO TOPOLOGY ---
        // Hitung koordinat x & y sesuai tipe perangkat
        let posX = nextX + nodesAdded * 260;
        let posY = startY + (nodesAdded % 2 === 0 ? 0 : 30);
        if (devType === 'router' || devType === 'firewall') {
          posX = 380 + nodesAdded * 280;
          posY = 60;
        } else if (devType === 'server') {
          posX = 80 + nodesAdded * 260;
          posY = 320;
        } else if (devType === 'nvr' || devType === 'cctv' || devType === 'ap') {
          posX = 120 + nodesAdded * 240;
          posY = 560;
        }

        const newNode: TopologyNode = {
          id: `sw-node-${sw.id}`,
          name: sw.name,
          type: devType,
          ip: sw.ip,
          brand: sw.brand || 'Network Device',
          model: sw.model || 'Device',
          location: sw.location || 'RSUD NTB',
          status: realStatus,
          switchDeviceId: sw.id,
          isSnmpSynced: true,
          lastPolled: sw.lastPolled ? sw.lastPolled.toISOString() : undefined,
          ports,
          vlans,
          x: posX,
          y: posY,
        };

        updatedNodes.push(newNode);
        nextX += 280;
        nodesAdded++;
      }
    }

    // 3. Simpan kembali ke database NetworkTopology
    let savedTopologyId = topology.id;
    const jsonNodes = JSON.stringify(updatedNodes);
    const jsonEdges = JSON.stringify(updatedEdges);
    const jsonViewport = JSON.stringify(topology.viewport || { zoom: 1, panX: 0, panY: 0 });

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
          name: 'Topologi RSUD NTB (Synced)',
          description: 'Topologi terintegrasi dengan Switch & VLAN Discovery',
          isDefault: true,
          nodes: jsonNodes,
          edges: jsonEdges,
          viewport: jsonViewport,
        },
      });
      savedTopologyId = created.id;
    }

    return NextResponse.json({
      success: true,
      message: `Berhasil menyinkronkan switch (${nodesAdded} baru ditambahkan, ${nodesUpdated} diperbarui)`,
      data: {
        nodesAdded,
        nodesUpdated,
        totalNodes: updatedNodes.length,
        totalEdges: updatedEdges.length,
        topology: {
          ...topology,
          id: savedTopologyId,
          nodes: updatedNodes,
          edges: updatedEdges,
        },
      },
    });
  } catch (error: any) {
    console.error('Error synchronizing switches with topology:', error);
    return NextResponse.json(
      { message: 'Gagal melakukan sinkronisasi switch', error: error.message },
      { status: 500 }
    );
  }
}
