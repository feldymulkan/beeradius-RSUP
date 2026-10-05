import prisma from '@/lib/prisma';
import TopologyCanvas from '@/components/topology/TopologyCanvas';
import { defaultHospitalTopology } from '@/lib/defaultTopology';
import { TopologyData } from '@/types/topology';

export const dynamic = 'force-dynamic';

export default async function TopologyPage() {
  let topologyData: TopologyData = defaultHospitalTopology;

  try {
    let active = await prisma.networkTopology.findFirst({
      where: { isDefault: true },
      orderBy: { updatedAt: 'desc' },
    });

    if (!active) {
      active = await prisma.networkTopology.findFirst({
        orderBy: { updatedAt: 'desc' },
      });
    }

    if (active) {
      topologyData = {
        id: active.id,
        name: active.name,
        description: active.description || undefined,
        isDefault: active.isDefault,
        nodes: JSON.parse(active.nodes || '[]'),
        edges: JSON.parse(active.edges || '[]'),
        viewport: active.viewport ? JSON.parse(active.viewport) : { zoom: 1, panX: 0, panY: 0 },
        createdAt: active.createdAt.toISOString(),
        updatedAt: active.updatedAt.toISOString(),
      };
    }
  } catch (error) {
    console.error('Error loading topology page data:', error);
  }

  return (
    <div className="space-y-4">
      <TopologyCanvas initialTopology={topologyData} />
    </div>
  );
}
