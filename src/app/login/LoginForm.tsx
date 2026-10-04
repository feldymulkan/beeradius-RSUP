"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const result = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (result?.error) {
      setError("Username atau password salah!");
    } else if (result?.ok) {
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center space-y-2">
          <div className="mx-auto h-12 w-12 rounded-xl bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white shadow-[0_0_24px_rgba(56,189,248,0.4)]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M8.111 16.556c3.221-3.221 4.557-3.221 7.778 0M5.333 13.021c5.037-5.037 10.297-5.037 15.334 0M12 19h.01" /></svg>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">BeeRadius</h1>
          <p className="text-xs text-slate-500 font-mono uppercase tracking-wider">RSUD NTB · RADIUS Management</p>
        </div>

        <form className="card" onSubmit={handleSubmit}>
          <div className="card-body gap-4">
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Username</label>
              <input
                type="text"
                className="input w-full"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs text-slate-400">Password</label>
              <input
                type="password"
                className="input w-full"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-error text-sm">{error}</p>}
            <button type="submit" className="btn btn-primary w-full">Masuk</button>
          </div>
        </form>
      </div>
      <p className="absolute bottom-4 w-full text-center text-[11px] text-slate-500 font-mono">
        © {new Date().getFullYear()} BeeRadius · RSUD NTB
      </p>
    </div>
  );
}