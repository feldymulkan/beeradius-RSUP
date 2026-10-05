"use server";

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { headers } from "next/headers";

export type AuditAction =
  | "CREATE_USER" | "UPDATE_USER" | "DELETE_USER" | "BATCH_DELETE_USERS" | "BATCH_STATUS_USERS"
  | "DISCONNECT_USER" | "CLEAR_STALE_SESSIONS"
  | "CREATE_GROUP" | "UPDATE_GROUP" | "DELETE_GROUP"
  | "CREATE_NAS" | "UPDATE_NAS" | "DELETE_NAS"
  | "CREATE_ADMIN" | "UPDATE_ADMIN" | "DELETE_ADMIN"
  | "UPDATE_PASSWORD" | "UPDATE_PROFILE"
  | "CREATE_POOL" | "UPDATE_POOL" | "DELETE_POOL" | "MANAGE_POOL_IPS"
  | "CREATE_WG_PEER" | "DELETE_WG_PEER" | "UPDATE_WG_PEER"
  | "CREATE_WIFI" | "UPDATE_WIFI" | "DELETE_WIFI"
  | "CREATE_MIKROTIK" | "UPDATE_MIKROTIK" | "DELETE_MIKROTIK"
  | "CREATE_SWITCH" | "UPDATE_SWITCH" | "DELETE_SWITCH"
  | "AUTO_DISCONNECT";

/**
 * Catat aktivitas admin ke tabel AuditLog.
 * Fungsi ini tidak akan throw error — kegagalan audit log
 * tidak boleh menggagalkan operasi utama.
 */
export async function logAudit(
  action: AuditAction,
  targetType: string,
  targetName?: string | null,
  details?: Record<string, any> | null
) {
  try {
    const session = await getServerSession(authOptions);
    const headerList = await headers();
    const ip = headerList.get("x-forwarded-for")
      || headerList.get("x-real-ip")
      || "unknown";

    await prisma.auditLog.create({
      data: {
        adminUser: (session?.user as any)?.username || (session?.user as any)?.name || "system",
        action,
        targetType,
        targetName: targetName || null,
        details: details ? JSON.stringify(details) : null,
        ipAddress: typeof ip === "string" ? ip.split(",")[0].trim() : "unknown",
      },
    });
  } catch (error) {
    // Log ke console tapi jangan throw — audit failure tidak boleh menggagalkan operasi utama
    console.error("[AuditLog Error]:", error);
  }
}
