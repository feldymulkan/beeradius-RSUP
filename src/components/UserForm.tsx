"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserFormData } from "@/lib/validations";
import { createUser } from "@/app/actions/userActions";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useState } from "react";

type UserFormProps = {
  type: "hotspot" | "vpn";
};

export default function UserForm({ type }: UserFormProps) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      type: type,
      passwordType: "cleartext",
      groupname: "default",
    },
  });

  const onSubmit = async (data: UserFormData) => {
    setIsSubmitting(true);
    const result = await createUser(data);
    setIsSubmitting(false);

    if (result.success) {
      toast.success(result.message || "User berhasil dibuat");
      router.push("/radius-users");
      router.refresh();
    } else {
      toast.error(result.error || "Gagal membuat user");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Username */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Username</span>
          </label>
          <input
            {...register("username")}
            type="text"
            placeholder="Masukkan username"
            className={`input input-bordered ${errors.username ? "input-error" : ""}`}
          />
          {errors.username && <span className="text-error text-xs mt-1">{errors.username.message}</span>}
        </div>

        {/* Password */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Password</span>
          </label>
          <input
            {...register("password")}
            type="password"
            placeholder="Masukkan password"
            className={`input input-bordered ${errors.password ? "input-error" : ""}`}
          />
          {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
        </div>

        {/* Full Name */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Nama Lengkap</span>
          </label>
          <input
            {...register("fullName")}
            type="text"
            placeholder="Nama lengkap karyawan"
            className="input input-bordered"
          />
        </div>

        {/* Department */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Departemen</span>
          </label>
          <input
            {...register("department")}
            type="text"
            placeholder="Contoh: IT, HR, Finance"
            className="input input-bordered"
          />
        </div>

        {/* Group */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Radius Group</span>
          </label>
          <input
            {...register("groupname")}
            type="text"
            placeholder="default"
            className="input input-bordered"
          />
        </div>

        {/* Password Type */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Tipe Enkripsi Password</span>
          </label>
          <select {...register("passwordType")} className="select select-bordered">
            <option value="cleartext">Cleartext (Default Mikrotik)</option>
            <option value="md5">MD5</option>
            <option value="sha1">SHA1</option>
          </select>
        </div>

        {/* VPN Specific: Static IP */}
        {type === "vpn" && (
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">IP Statis (Opsional)</span>
            </label>
            <input
              {...register("ipAddress")}
              type="text"
              placeholder="Contoh: 10.0.0.50"
              className={`input input-bordered ${errors.ipAddress ? "input-error" : ""}`}
            />
            {errors.ipAddress && <span className="text-error text-xs mt-1">{errors.ipAddress.message}</span>}
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <button
          type="button"
          onClick={() => router.back()}
          className="btn btn-ghost"
        >
          Batal
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className={`btn btn-primary min-w-[120px] ${isSubmitting ? "loading" : ""}`}
        >
          {isSubmitting ? "Menyimpan..." : "Buat User"}
        </button>
      </div>
    </form>
  );
}
