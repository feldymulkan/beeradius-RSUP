import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";

export async function getRadiusUserDetailsById(id: number) {
  const userInfo = await prisma.userinfo.findUnique({
    where: { id },
  });

  if (!userInfo) {
    notFound(); 
  }

  const { username, type } = userInfo;
  const [checkAttributes, replyAttributes, userGroup] = await Promise.all([
    prisma.radcheck.findMany({ where: { username }, select: { attribute: true, op: true, value: true } }),
    prisma.radreply.findMany({ where: { username }, select: { attribute: true, op: true, value: true } }),
    prisma.radusergroup.findFirst({ where: { username }, select: { groupname: true } }),
  ]);

  const allAttributes = [...checkAttributes, ...replyAttributes];

  // Filter atribut berdasarkan tipe layanan
  const filteredAttributes = allAttributes.filter(attr => {
    // Password selalu ditampilkan
    if (attr.attribute.toLowerCase().includes("password")) return true;

    if (type === 'vpn') {
      // Atribut khusus VPN
      return [
        'Service-Type', 
        'Framed-IP-Address', 
        'Framed-Pool', 
        'Tunnel-Type', 
        'Tunnel-Medium-Type', 
        'Tunnel-Private-Group-Id',
        'Framed-Protocol',
        'MS-MPPE-Encryption-Policy',
        'MS-MPPE-Encryption-Types'
      ].includes(attr.attribute);
    } else {
      // Atribut khusus Hotspot
      return ['NAS-Port-Type', 'Simultaneous-Use'].includes(attr.attribute);
    }
  });

  return {
    id, 
    username,
    type,
    group: userGroup?.groupname || "N/A",
    fullName: userInfo.fullName || "N/A",
    department: userInfo.department || "N/A",
    checkAttributes: filteredAttributes.map((attr) => ({
      ...attr,
      value: attr.value,
    })),
  };
}