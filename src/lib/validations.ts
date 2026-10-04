import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(3, "Username minimal 3 karakter"),
  password: z.string().min(4, "Password minimal 4 karakter"),
  fullName: z.string().optional(),
  department: z.string().optional(),
  groupname: z.string().default("default"),
  passwordType: z.enum(["cleartext", "md5", "sha1"]).default("cleartext"),
  type: z.enum(["hotspot", "vpn"]).default("hotspot"),
  // Tambahan untuk VPN
  ipAddress: z.string().ipv4().optional().or(z.literal("")),
  poolName: z.string().optional(),
});

export type UserFormData = z.infer<typeof userSchema>;
