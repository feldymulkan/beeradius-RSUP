import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/lib/prisma';
import { mikrotikRequest } from '@/lib/mikrotik';
import type { MikrotikConfig } from '@/lib/mikrotik';

type NasHealth = {
  nasId: number;
  nasname: string;
  shortname: string | null;
  status: 'online' | 'offline' | 'unknown';
  latencyMs: number;
  uptime?: string;
  cpuLoad?: string;
  freeMemory?: string;
  totalMemory?: string;
  version?: string;
};

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const nasIp = searchParams.get('nasIp');
    
    // Get NAS list
    const nasWhere = nasIp ? { nasname: nasIp } : {};
    const nasList = await prisma.nas.findMany({ where: nasWhere });
    
    // Get all MikroTik configs for matching
    const mikrotikConfigs = await prisma.mikrotikConfig.findMany();
    
    // Create a map of host -> config for quick lookup
    const configMap = new Map<string, any>();
    for (const config of mikrotikConfigs) {
      configMap.set(config.host.trim(), config);
    }
    
    // Check health of each NAS in parallel
    const healthResults: NasHealth[] = await Promise.all(
      nasList.map(async (nas) => {
        const config = configMap.get(nas.nasname.trim());
        
        if (!config) {
          return {
            nasId: nas.id,
            nasname: nas.nasname,
            shortname: nas.shortname,
            status: 'unknown' as const,
            latencyMs: 0,
          };
        }
        
        const start = Date.now();
        try {
          const resource: any = await Promise.race([
            mikrotikRequest(
              { host: config.host, port: config.port, username: config.username, password: config.password, useSsl: config.useSsl },
              '/system/resource'
            ),
            new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout')), 5000))
          ]);
          
          return {
            nasId: nas.id,
            nasname: nas.nasname,
            shortname: nas.shortname,
            status: 'online' as const,
            latencyMs: Date.now() - start,
            uptime: resource?.uptime || undefined,
            cpuLoad: resource?.['cpu-load']?.toString() || undefined,
            freeMemory: resource?.['free-memory']?.toString() || undefined,
            totalMemory: resource?.['total-memory']?.toString() || undefined,
            version: resource?.version || undefined,
          };
        } catch {
          return {
            nasId: nas.id,
            nasname: nas.nasname,
            shortname: nas.shortname,
            status: 'offline' as const,
            latencyMs: Date.now() - start,
          };
        }
      })
    );
    
    return NextResponse.json(healthResults, { status: 200 });
  } catch (error) {
    console.error('[NAS Health Check Error]:', error);
    return NextResponse.json({ message: 'Gagal melakukan health check.' }, { status: 500 });
  }
}

export const dynamic = 'force-dynamic';
