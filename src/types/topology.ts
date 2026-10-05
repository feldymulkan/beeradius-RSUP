export type DeviceType =
  | 'router'
  | 'switch'
  | 'nvr'
  | 'cctv'
  | 'ap'
  | 'server'
  | 'firewall'
  | 'pc';

export type LinkType =
  | 'fiber'
  | 'copper'
  | 'poe'
  | 'trunk'
  | 'wireless';

export interface DevicePort {
  id: string;
  name: string; // e.g. "ether1", "port 24", "SFP+ 1", "PoE 1"
  type?: 'rj45' | 'sfp' | 'poe' | 'mgmt';
  speed?: string; // "10G", "1G", "100M"
  status?: 'up' | 'down' | 'unconnected';
  alias?: string;
  pvid?: number;
  taggedVlans?: number[];
  untaggedVlans?: number[];
}

export interface SwitchVlanSummary {
  vlanId: number;
  name: string;
  untaggedPorts: number[];
  taggedPorts: number[];
  allPorts: number[];
}

export interface TopologyNode {
  id: string;
  name: string;
  type: DeviceType;
  ip?: string;
  mac?: string;
  location?: string;
  brand?: string;
  model?: string;
  ports: DevicePort[];
  x: number;
  y: number;
  status: 'online' | 'warning' | 'offline';
  switchDeviceId?: number;
  isSnmpSynced?: boolean;
  snmpCommunity?: string;
  lastPolled?: string;
  vlans?: SwitchVlanSummary[];
}

export interface TopologyEdge {
  id: string;
  sourceNodeId: string;
  sourcePort: string;
  targetNodeId: string;
  targetPort: string;
  linkType: LinkType;
  speed: string; // "10 Gbps", "1 Gbps", "100 Mbps"
  vlan?: string; // e.g. "VLAN 10,20 (Trunk)", "VLAN 40"
  label?: string;
  status: 'up' | 'down';
}

export interface TopologyData {
  id?: number;
  name: string;
  description?: string;
  isDefault?: boolean;
  nodes: TopologyNode[];
  edges: TopologyEdge[];
  viewport: {
    zoom: number;
    panX: number;
    panY: number;
  };
  createdAt?: string;
  updatedAt?: string;
}

// Preset Ports Generator Helper
export function generateDefaultPorts(type: DeviceType, portCount: number = 24): DevicePort[] {
  switch (type) {
    case 'router':
      return [
        { id: 'p1', name: 'ether1 (WAN)', type: 'rj45', speed: '1G' },
        { id: 'p2', name: 'ether2 (LAN)', type: 'rj45', speed: '1G' },
        { id: 'p3', name: 'ether3', type: 'rj45', speed: '1G' },
        { id: 'p4', name: 'ether4', type: 'rj45', speed: '1G' },
        { id: 'p5', name: 'ether5', type: 'rj45', speed: '1G' },
        { id: 'sfp1', name: 'sfp-sfpplus1', type: 'sfp', speed: '10G' },
        { id: 'sfp2', name: 'sfp-sfpplus2', type: 'sfp', speed: '10G' },
      ];
    case 'switch': {
      const ports: DevicePort[] = [];
      const total = portCount || 24;
      for (let i = 1; i <= total; i++) {
        ports.push({ id: `p${i}`, name: `port ${i}`, type: 'rj45', speed: '1G' });
      }
      ports.push({ id: 'sfp1', name: 'SFP+ 1', type: 'sfp', speed: '10G' });
      ports.push({ id: 'sfp2', name: 'SFP+ 2', type: 'sfp', speed: '10G' });
      return ports;
    }
    case 'nvr': {
      const ports: DevicePort[] = [
        { id: 'lan1', name: 'LAN 1 (Uplink)', type: 'rj45', speed: '1G' },
        { id: 'lan2', name: 'LAN 2', type: 'rj45', speed: '1G' },
      ];
      const poeCount = portCount <= 8 ? 8 : 16;
      for (let i = 1; i <= poeCount; i++) {
        ports.push({ id: `poe${i}`, name: `PoE ${i}`, type: 'poe', speed: '100M' });
      }
      return ports;
    }
    case 'ap':
      return [
        { id: 'poe', name: 'ETH/PoE in (Uplink)', type: 'poe', speed: '1G' },
        { id: 'lan2', name: 'LAN 2 (Pass-through)', type: 'rj45', speed: '1G' },
      ];
    case 'server':
      return [
        { id: 'nic1', name: 'NIC 1 (Data)', type: 'rj45', speed: '10G' },
        { id: 'nic2', name: 'NIC 2 (Cluster)', type: 'rj45', speed: '10G' },
        { id: 'idrac', name: 'iDRAC / iLO', type: 'mgmt', speed: '1G' },
      ];
    case 'firewall':
      return [
        { id: 'wan1', name: 'WAN 1 (Internet)', type: 'rj45', speed: '1G' },
        { id: 'wan2', name: 'WAN 2 (Backup)', type: 'rj45', speed: '1G' },
        { id: 'lan', name: 'LAN (Trust)', type: 'rj45', speed: '10G' },
        { id: 'dmz', name: 'DMZ', type: 'rj45', speed: '1G' },
        { id: 'mgmt', name: 'Management', type: 'mgmt', speed: '1G' },
      ];
    case 'cctv':
      return [
        { id: 'poe', name: 'PoE LAN', type: 'poe', speed: '100M' },
      ];
    case 'pc':
      return [
        { id: 'eth', name: 'LAN 1', type: 'rj45', speed: '1G' },
      ];
    default:
      return [
        { id: 'p1', name: 'Port 1', type: 'rj45', speed: '1G' },
        { id: 'p2', name: 'Port 2', type: 'rj45', speed: '1G' },
      ];
  }
}
