"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createMikrotikConfig(data: any) {
  try {
    const config = await prisma.mikrotikConfig.create({
      data: {
        name: data.name,
        host: data.host,
        port: parseInt(data.port),
        username: data.username,
        password: data.password,
        useSsl: data.useSsl === 'true' || data.useSsl === true,
        wgPublicHost: data.wgPublicHost || null,
      },
    });
    revalidatePath("/settings/mikrotik");
    return { success: true, data: config };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function updateMikrotikConfig(id: number, data: any) {
  try {
    const config = await prisma.mikrotikConfig.update({
      where: { id },
      data: {
        name: data.name,
        host: data.host,
        port: parseInt(data.port),
        username: data.username,
        password: data.password,
        useSsl: data.useSsl === 'true' || data.useSsl === true,
        wgPublicHost: data.wgPublicHost || null,
      },
    });
    revalidatePath("/settings/mikrotik");
    return { success: true, data: config };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function deleteMikrotikConfig(id: number) {
  try {
    await prisma.mikrotikConfig.delete({
      where: { id },
    });
    revalidatePath("/settings/mikrotik");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}
