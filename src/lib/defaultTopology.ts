import { TopologyData } from '@/types/topology';

export const defaultHospitalTopology: TopologyData = {
  name: 'Topologi Jaringan RSUD NTB',
  description: 'Pemetaan perangkat fisik terintegrasi dengan modul Switch, VLAN & Jaringan',
  isDefault: true,
  viewport: {
    zoom: 0.9,
    panX: 40,
    panY: 30,
  },
  nodes: [],
  edges: [],
};
