import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const [switches, mikrotiks, nasList] = await Promise.all([
      prisma.switchDevice.findMany({
        select: {
          id: true,
          name: true,
          ip: true,
          brand: true,
          model: true,
          location: true,
          status: true,
          port: true,
          ports: true,
          vlans: true,
          lastPolled: true,
        },
      }),
      prisma.mikrotikConfig.findMany({
        select: {
          id: true,
          name: true,
          host: true,
          port: true,
        },
      }),
      prisma.nas.findMany({
        select: {
          id: true,
          nasname: true,
          shortname: true,
          type: true,
          ports: true,
          description: true,
        },
      }),
    ]);

    return NextResponse.json({
      switches,
      mikrotiks,
      nasList,
    });
  } catch (error: any) {
    console.error('Error fetching registered network devices:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
