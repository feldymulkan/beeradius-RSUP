import { PrismaClient } from '../src/generated/client';
const prisma = new PrismaClient();

async function main() {
  const HOURS_THRESHOLD = 12;
  const thresholdDate = new Date(Date.now() - HOURS_THRESHOLD * 60 * 60 * 1000);

  console.log('--- Cleaning Stale Sessions (> 12 Hours) ---');
  
  const staleSessions = await prisma.radacct.findMany({
    where: {
      acctstoptime: null,
      AND: [
        { OR: [
          { acctupdatetime: { lt: thresholdDate } },
          { acctupdatetime: null, acctstarttime: { lt: thresholdDate } }
        ]}
      ]
    },
    select: { radacctid: true, acctupdatetime: true, acctstarttime: true }
  });

  if (staleSessions.length === 0) {
    console.log('No stale sessions found.');
    return;
  }

  console.log(`Found ${staleSessions.length} stale sessions. Closing...`);

  for (const session of staleSessions) {
    const stopTime = session.acctupdatetime || session.acctstarttime || new Date();
    await prisma.radacct.update({
      where: { radacctid: session.radacctid },
      data: { 
        acctstoptime: stopTime,
        acctterminatecause: 'Auto-Cleanup-12H'
      }
    });
  }

  console.log('Cleanup finished successfully.');
}

main().catch(console.error).finally(() => prisma.$disconnect());
