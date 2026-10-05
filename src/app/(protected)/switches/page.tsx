"use client";

import { useEffect, useState, useMemo } from "react";
import {
  FaNetworkWired,
  FaServer,
  FaCheckCircle,
  FaSyncAlt,
  FaPlus,
  FaSearch,
  FaEye,
  FaTrash,
  FaEdit,
  FaBolt,
  FaTag,
  FaMicrochip,
  FaClock,
  FaMapMarkerAlt,
  FaTimes,
  FaRoute,
  FaVideo,
  FaWifi,
  FaShieldAlt,
} from "react-icons/fa";
import toast from "react-hot-toast";

interface SwitchVlan {
  vlanId: number;
  name: string;
  untaggedPorts: number[];
  taggedPorts: number[];
  allPorts: number[];
}

interface SwitchPort {
  index: number;
  name: string;
  alias?: string;
  status: "up" | "down" | "unknown";
  speed?: string;
  pvid?: number;
}

interface SwitchDevice {
  id: number;
  name: string;
  ip: string;
  community: string;
  snmpVersion: string;
  port: number;
  brand: string;
  model: string;
  sysDescr?: string;
  location?: string;
  status: "online" | "offline";
  deviceType?: string;
  connMethod?: string;
  uptime?: string;
  vlans: SwitchVlan[];
  ports: SwitchPort[];
  lastPolled?: string;
  createdAt: string;
}

export default function SwitchesPage() {
  const [switches, setSwitches] = useState<SwitchDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");

  // State polling/scanning per ID
  const [scanningId, setScanningId] = useState<number | null>(null);

  // Modal Detail
  const [detailSwitch, setDetailSwitch] = useState<SwitchDevice | null>(null);
  const [detailTab, setDetailTab] = useState<"vlans" | "ports" | "system">("vlans");

  // Modal Add / Edit
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSwitch, setEditingSwitch] = useState<SwitchDevice | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    ip: "",
    deviceType: "switch",
    connMethod: "snmp",
    community: "public",
    snmpVersion: "2c",
    port: 161,
    brand: "",
    model: "",
    location: "Ruang Server RSUD NTB",
  });
  const [savingSwitch, setSavingSwitch] = useState(false);

  // Modal Probe Test
  const [isProbeModalOpen, setIsProbeModalOpen] = useState(false);
  const [probeForm, setProbeForm] = useState({
    ip: "",
    community: "public",
    snmpVersion: "2c",
    port: 161,
  });
  const [probing, setProbing] = useState(false);
  const [probeResult, setProbeResult] = useState<any>(null);

  // Load switches from API
  const fetchSwitches = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/network/switches");
      if (!res.ok) throw new Error("Gagal mengambil data switch");
      const json = await res.json();
      setSwitches(json.data || []);
    } catch (err: any) {
      toast.error(err.message || "Gagal memuat switch");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSwitches();
  }, []);

  // Filtered Switches
  const filteredSwitches = useMemo(() => {
    return switches.filter((sw) => {
      const matchQuery =
        searchQuery === "" ||
        sw.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sw.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (sw.brand && sw.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (sw.model && sw.model.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (sw.location && sw.location.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchBrand =
        selectedBrand === "all" ||
        (sw.brand && sw.brand.toLowerCase().includes(selectedBrand.toLowerCase()));

      const matchStatus = selectedStatus === "all" || sw.status === selectedStatus;
      const matchType = selectedType === "all" || (sw.deviceType || "switch") === selectedType;

      return matchQuery && matchBrand && matchStatus && matchType;
    });
  }, [switches, searchQuery, selectedBrand, selectedStatus, selectedType]);

  // Summary Metrics
  const metrics = useMemo(() => {
    const total = switches.length;
    const online = switches.filter((s) => s.status === "online").length;
    const offline = total - online;
    const totalVlans = switches.reduce((acc, s) => acc + (s.vlans?.length || 0), 0);
    const totalPorts = switches.reduce((acc, s) => acc + (s.ports?.length || 0), 0);
    const upPorts = switches.reduce(
      (acc, s) => acc + (s.ports?.filter((p) => p.status === "up").length || 0),
      0
    );
    const switchesCount = switches.filter((s) => (s.deviceType || "switch") === "switch").length;
    const routersCount = switches.filter((s) => s.deviceType === "router").length;
    const serversCount = switches.filter((s) => s.deviceType === "server").length;
    const nvrsCount = switches.filter((s) => s.deviceType === "nvr" || s.deviceType === "cctv").length;
    const apsCount = switches.filter((s) => s.deviceType === "ap").length;

    return {
      total,
      online,
      offline,
      totalVlans,
      totalPorts,
      upPorts,
      switchesCount,
      routersCount,
      serversCount,
      nvrsCount,
      apsCount,
    };
  }, [switches]);

  // Trigger SNMP Scan
  const handleScanSwitch = async (id: number) => {
    try {
      setScanningId(id);
      const res = await fetch(`/api/network/switches/${id}`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Gagal memindai switch");

      toast.success(json.message || "Scan selesai");
      // Update state
      setSwitches((prev) =>
        prev.map((s) => (s.id === id ? { ...json.data } : s))
      );
      if (detailSwitch && detailSwitch.id === id) {
        setDetailSwitch(json.data);
      }
    } catch (err: any) {
      toast.error(err.message || "Gagal memindai switch via SNMP");
    } finally {
      setScanningId(null);
    }
  };

  // Delete Switch
  const handleDeleteSwitch = async (id: number, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus switch ${name}?`)) return;
    try {
      const res = await fetch(`/api/network/switches/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus switch");
      toast.success("Switch berhasil dihapus");
      setSwitches((prev) => prev.filter((s) => s.id !== id));
      if (detailSwitch?.id === id) setDetailSwitch(null);
    } catch (err: any) {
      toast.error(err.message || "Gagal menghapus switch");
    }
  };

  // Submit Add / Edit
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.ip) {
      toast.error("Nama dan IP Switch wajib diisi");
      return;
    }

    try {
      setSavingSwitch(true);
      if (editingSwitch) {
        const res = await fetch(`/api/network/switches/${editingSwitch.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Gagal memperbarui switch");
        toast.success("Switch berhasil diperbarui");
      } else {
        const res = await fetch("/api/network/switches", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Gagal menambahkan switch");
        toast.success("Switch berhasil didaftarkan dan dipindai!");
      }
      setIsAddModalOpen(false);
      setEditingSwitch(null);
      fetchSwitches();
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan");
    } finally {
      setSavingSwitch(false);
    }
  };

  // Probe Test Submit
  const handleProbeTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!probeForm.ip) {
      toast.error("IP Switch wajib diisi");
      return;
    }

    try {
      setProbing(true);
      setProbeResult(null);
      const res = await fetch("/api/network/switches/probe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(probeForm),
      });
      const json = await res.json();
      setProbeResult(json.data);
      if (json.data?.status === "online") {
        toast.success(`SNMP Terkoneksi: ${json.data.brand} ${json.data.model}`);
      } else {
        toast.error(json.data?.error || "Switch tidak merespon SNMP");
      }
    } catch (err: any) {
      toast.error(err.message || "Gagal menghubungi probe endpoint");
    } finally {
      setProbing(false);
    }
  };

  // Helper Brand Badge Color
  const getBrandBadge = (brand: string) => {
    const b = brand.toLowerCase();
    if (b.includes("ruijie")) return "bg-red-500/10 text-red-400 border-red-500/30";
    if (b.includes("zte")) return "bg-blue-500/10 text-blue-400 border-blue-500/30";
    if (b.includes("tp-link")) return "bg-emerald-500/10 text-emerald-400 border-emerald-500/30";
    if (b.includes("cisco")) return "bg-cyan-500/10 text-cyan-400 border-cyan-500/30";
    if (b.includes("huawei")) return "bg-rose-500/10 text-rose-400 border-rose-500/30";
    if (b.includes("mikrotik")) return "bg-amber-500/10 text-amber-400 border-amber-500/30";
    return "bg-slate-500/10 text-slate-400 border-slate-500/30";
  };

  const getDeviceIcon = (t?: string) => {
    switch (t) {
      case "router": return <FaRoute className="h-4 w-4 text-sky-400" />;
      case "switch": return <FaNetworkWired className="h-4 w-4 text-emerald-400" />;
      case "nvr": case "cctv": return <FaVideo className="h-4 w-4 text-amber-400" />;
      case "ap": return <FaWifi className="h-4 w-4 text-purple-400" />;
      case "server": return <FaServer className="h-4 w-4 text-indigo-400" />;
      case "firewall": return <FaShieldAlt className="h-4 w-4 text-rose-400" />;
      default: return <FaNetworkWired className="h-4 w-4 text-emerald-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
              <FaNetworkWired className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight">Manajemen Switch, VLAN &amp; Perangkat Jaringan</h1>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Deteksi otomatis &amp; inventaris perangkat fisik RSUD NTB (Switch, Router, NVR CCTV, Server, Access Point, Firewall) via SNMP, Ping, dan API
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => {
              setProbeResult(null);
              setIsProbeModalOpen(true);
            }}
            className="btn btn-sm btn-outline border-primary/30 hover:border-primary gap-2"
          >
            <FaBolt className="text-amber-400" />
            Uji Probe SNMP
          </button>
          <button
            onClick={() => {
              setEditingSwitch(null);
              setFormData({
                name: "",
                ip: "",
                deviceType: "switch",
                connMethod: "snmp",
                community: "public",
                snmpVersion: "2c",
                port: 161,
                brand: "",
                model: "",
                location: "Ruang Server RSUD NTB",
              });
              setIsAddModalOpen(true);
            }}
            className="btn btn-sm btn-primary gap-2 shadow-[0_0_12px_rgba(37,99,235,0.3)]"
          >
            <FaPlus />
            Tambah Perangkat
          </button>
          <button
            onClick={fetchSwitches}
            disabled={loading}
            className="btn btn-sm btn-ghost border border-base-300 gap-1.5"
            title="Refresh Data"
          >
            <FaSyncAlt className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Total Switch</span>
            <span className="p-2 rounded-lg bg-primary/10 text-primary">
              <FaServer className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold font-mono">{metrics.total}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">Switch terdaftar di RSUD NTB</p>
          </div>
        </div>

        <div className="card p-4 flex flex-col justify-between border-emerald-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Status Online</span>
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <FaCheckCircle className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold font-mono text-emerald-400">{metrics.online}</p>
              <span className="text-xs text-slate-500 font-mono">/ {metrics.total} perangkat</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {metrics.offline > 0 ? (
                <span className="text-rose-400">{metrics.offline} offline / timeout</span>
              ) : (
                "Semua switch merespon SNMP"
              )}
            </p>
          </div>
        </div>

        <div className="card p-4 flex flex-col justify-between border-primary/20">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Total VLAN</span>
            <span className="p-2 rounded-lg bg-primary/10 text-primary">
              <FaTag className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold font-mono text-primary">{metrics.totalVlans}</p>
            <p className="text-[11px] text-slate-500 mt-0.5">VLAN terkonfigurasi &amp; terdeteksi</p>
          </div>
        </div>

        <div className="card p-4 flex flex-col justify-between border-sky-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs text-slate-400 font-mono uppercase tracking-wider">Port Terhubung</span>
            <span className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
              <FaMicrochip className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold font-mono text-sky-400">{metrics.upPorts}</p>
              <span className="text-xs text-slate-500 font-mono">/ {metrics.totalPorts} port</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">OperStatus Up (Aktif melayani traffic)</p>
          </div>
        </div>
      </div>

      {/* Unified Toolbar */}
      <div className="card p-3 flex flex-col md:flex-row items-center gap-3">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="relative flex-1 w-full flex items-center gap-2"
        >
          <div className="relative flex-1">
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 h-3.5 w-3.5" />
            <input
              type="text"
              placeholder="Cari berdasarkan IP, Nama Switch, Brand, atau Lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-sm w-full pl-9 pr-8 text-xs bg-base-100 border border-base-300 rounded-lg focus:border-primary focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-base-content/40 hover:text-error cursor-pointer"
                title="Hapus pencarian"
              >
                <FaTimes size={12} />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-sm btn-primary text-xs px-3 gap-1.5 shadow-xs shrink-0 cursor-pointer"
          >
            <FaSearch size={11} />
            <span>Cari</span>
          </button>
        </form>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="select select-sm text-xs bg-base-100 border border-base-300 rounded-lg"
          >
            <option value="all">Semua Brand</option>
            <option value="ruijie">Ruijie / Reyee</option>
            <option value="zte">ZTE</option>
            <option value="tp-link">TP-Link</option>
            <option value="cisco">Cisco</option>
            <option value="huawei">Huawei</option>
            <option value="mikrotik">MikroTik</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="select select-sm text-xs bg-base-100 border border-base-300 rounded-lg"
          >
            <option value="all">Semua Status</option>
            <option value="online">Online</option>
            <option value="offline">Offline</option>
          </select>

          {(searchQuery || selectedBrand !== "all" || selectedStatus !== "all" || selectedType !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedBrand("all");
                setSelectedStatus("all");
                setSelectedType("all");
              }}
              className="btn btn-sm btn-ghost text-xs gap-1 border border-base-300 hover:text-rose-400"
              title="Reset semua filter dan pencarian"
            >
              <FaTimes size={10} />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Sub-bar Filter Jenis Perangkat */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs font-mono">
        {[
          { id: "all", label: `Semua Perangkat (${metrics.total})` },
          { id: "switch", label: `Switch (${metrics.switchesCount})` },
          { id: "router", label: `Router (${metrics.routersCount})` },
          { id: "server", label: `Server (${metrics.serversCount})` },
          { id: "nvr", label: `NVR & CCTV (${metrics.nvrsCount})` },
          { id: "ap", label: `Access Point (${metrics.apsCount})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedType(tab.id)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all ${
              selectedType === tab.id
                ? "bg-primary text-black border-primary font-bold shadow-xs"
                : "bg-base-200/50 border-base-300 text-base-content/60 hover:text-base-content"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Switch Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Perangkat &amp; IP</th>
                <th>Brand &amp; Model</th>
                <th>Status</th>
                <th>VLAN Terdeteksi</th>
                <th>Port (Up / Total)</th>
                <th>Uptime &amp; Lokasi</th>
                <th className="text-right">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <span className="loading loading-spinner text-primary loading-md" />
                    <p className="text-xs text-base-content/60 mt-2">Memuat daftar switch...</p>
                  </td>
                </tr>
              ) : filteredSwitches.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <FaNetworkWired className="h-10 w-10 text-base-content/30 mx-auto mb-2 opacity-50" />
                    <p className="font-semibold text-base-content/80">Belum ada switch yang ditemukan</p>
                    <p className="text-xs text-base-content/60 mt-1">
                      Klik "+ Tambah Switch" untuk mendaftarkan switch atau "Uji Probe SNMP" untuk test koneksi
                    </p>
                  </td>
                </tr>
              ) : (
                filteredSwitches.map((sw) => {
                  const isScanning = scanningId === sw.id;
                  const upCount = sw.ports?.filter((p) => p.status === "up").length || 0;
                  const totalCount = sw.ports?.length || 0;

                  return (
                    <tr key={sw.id} className="hover">
                      <td>
                        <div className="flex items-center gap-2.5">
                          <span className="p-1.5 rounded-lg bg-base-200 border border-base-300 shadow-xs shrink-0">
                            {getDeviceIcon(sw.deviceType)}
                          </span>
                          <div className="min-w-0">
                            <div className="font-semibold text-sm text-base-content flex items-center gap-1.5 flex-wrap">
                              <span className="truncate">{sw.name}</span>
                              <span className="badge badge-xs badge-outline border-base-300 font-mono text-[8px] uppercase">
                                {sw.deviceType || "SWITCH"}
                              </span>
                              <span className="badge badge-xs bg-primary/10 text-primary border border-primary/20 font-mono text-[8px] uppercase">
                                {sw.connMethod || "SNMP"}
                              </span>
                            </div>
                            <div className="text-xs font-mono text-primary flex items-center gap-1.5 mt-0.5">
                              <span>{sw.ip}</span>
                              {sw.connMethod === "snmp" && (
                                <span className="text-[10px] text-slate-500">
                                  :{sw.port} (v{sw.snmpVersion})
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col gap-1 items-start">
                          <span className={`badge badge-sm font-medium border ${getBrandBadge(sw.brand)}`}>
                            {sw.brand}
                          </span>
                          <span className="text-xs text-slate-400 font-mono truncate max-w-[180px]">
                            {sw.model || "-"}
                          </span>
                        </div>
                      </td>
                      <td>
                        {sw.status === "online" ? (
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                            <span className="status-dot" />
                            <span>Online</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs text-rose-400 font-mono">
                            <span className="h-2 w-2 rounded-full bg-rose-500" />
                            <span>Offline</span>
                          </div>
                        )}
                        {sw.lastPolled && (
                          <p className="text-[10px] text-slate-500 mt-0.5 font-mono">
                            {new Date(sw.lastPolled).toLocaleTimeString("id-ID", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        )}
                      </td>
                      <td>
                        <div className="flex flex-wrap gap-1 max-w-[220px]">
                          {sw.vlans && sw.vlans.length > 0 ? (
                            sw.vlans.slice(0, 4).map((v) => (
                              <span
                                key={v.vlanId}
                                className="badge badge-sm bg-base-300/80 border border-primary/20 text-[11px] font-mono"
                                title={`${v.name} (Untagged: ${v.untaggedPorts?.length || 0}, Tagged: ${v.taggedPorts?.length || 0})`}
                              >
                                V{v.vlanId}
                              </span>
                            ))
                          ) : (
                            <span className="text-xs text-slate-500 italic">Belum terdeteksi</span>
                          )}
                          {sw.vlans && sw.vlans.length > 4 && (
                            <span className="badge badge-sm bg-primary/10 text-primary text-[10px] font-mono">
                              +{sw.vlans.length - 4}
                            </span>
                          )}
                        </div>
                      </td>
                      <td>
                        <div className="text-xs font-mono">
                          <span className="text-emerald-400 font-semibold">{upCount}</span>
                          <span className="text-slate-500"> / {totalCount}</span>
                        </div>
                        {totalCount > 0 && (
                          <div className="w-20 bg-base-300 h-1 rounded-full mt-1.5 overflow-hidden">
                            <div
                              className="bg-emerald-500 h-full rounded-full"
                              style={{ width: `${(upCount / totalCount) * 100}%` }}
                            />
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="text-xs text-base-content/80 flex items-center gap-1">
                          <FaClock className="h-3 w-3 text-base-content/50" />
                          <span className="font-mono">{sw.uptime || "-"}</span>
                        </div>
                        <div className="text-[11px] text-base-content/60 flex items-center gap-1 mt-0.5">
                          <FaMapMarkerAlt className="h-2.5 w-2.5 text-base-content/50" />
                          <span className="truncate max-w-[140px]">{sw.location || "RSUD NTB"}</span>
                        </div>
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setDetailSwitch(sw);
                              setDetailTab("vlans");
                            }}
                            className="btn btn-xs btn-ghost border border-base-300 hover:border-primary/40 gap-1"
                            title="Detail VLAN & Port"
                          >
                            <FaEye className="text-primary" />
                            <span className="hidden sm:inline">VLAN</span>
                          </button>
                          <button
                            onClick={() => handleScanSwitch(sw.id)}
                            disabled={isScanning}
                            className="btn btn-xs btn-ghost border border-base-300 hover:border-primary/40"
                            title="Scan Ulang SNMP"
                          >
                            <FaSyncAlt className={`text-base-content/70 ${isScanning ? "animate-spin text-primary" : ""}`} />
                          </button>
                          <button
                            onClick={() => {
                              setEditingSwitch(sw);
                              setFormData({
                                name: sw.name,
                                ip: sw.ip,
                                deviceType: sw.deviceType || "switch",
                                connMethod: sw.connMethod || "snmp",
                                community: sw.community,
                                snmpVersion: sw.snmpVersion,
                                port: sw.port,
                                brand: sw.brand || "",
                                model: sw.model || "",
                                location: sw.location || "",
                              });
                              setIsAddModalOpen(true);
                            }}
                            className="btn btn-xs btn-ghost text-base-content/60 hover:text-base-content"
                            title="Edit Perangkat"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteSwitch(sw.id, sw.name)}
                            className="btn btn-xs btn-ghost text-rose-400 hover:text-rose-300"
                            title="Hapus Switch"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Detail VLAN & Port Matrix */}
      {detailSwitch && (
        <div className="modal modal-open z-50">
          <div className="modal-box max-w-4xl max-h-[90vh] flex flex-col p-6 border border-primary/20">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-primary/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                  <FaServer className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-base-content">{detailSwitch.name}</h3>
                    <span className={`badge badge-sm border ${getBrandBadge(detailSwitch.brand)}`}>
                      {detailSwitch.brand}
                    </span>
                  </div>
                  <p className="text-xs font-mono text-primary mt-0.5">
                    {detailSwitch.ip} · {detailSwitch.model || "Managed Switch"} · Uptime: {detailSwitch.uptime || "-"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDetailSwitch(null)}
                className="btn btn-sm btn-circle btn-ghost"
              >
                ✕
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 mt-4 border-b border-base-300 pb-2">
              <button
                onClick={() => setDetailTab("vlans")}
                className={`btn btn-xs ${
                  detailTab === "vlans" ? "btn-primary" : "btn-ghost border border-base-300"
                }`}
              >
                Daftar VLAN ({detailSwitch.vlans?.length || 0})
              </button>
              <button
                onClick={() => setDetailTab("ports")}
                className={`btn btn-xs ${
                  detailTab === "ports" ? "btn-primary" : "btn-ghost border border-base-300"
                }`}
              >
                Port Matrix ({detailSwitch.ports?.length || 0})
              </button>
              <button
                onClick={() => setDetailTab("system")}
                className={`btn btn-xs ${
                  detailTab === "system" ? "btn-primary" : "btn-ghost border border-base-300"
                }`}
              >
                SNMP Info &amp; SysDescr
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto mt-4 pr-1">
              {/* TAB 1: VLANS */}
              {detailTab === "vlans" && (
                <div className="space-y-3">
                  {detailSwitch.vlans && detailSwitch.vlans.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="table table-sm w-full">
                        <thead>
                          <tr>
                            <th className="w-24">VLAN ID</th>
                            <th>Nama VLAN</th>
                            <th>Untagged Ports (Access)</th>
                            <th>Tagged Ports (Trunk)</th>
                          </tr>
                        </thead>
                        <tbody>
                          {detailSwitch.vlans.map((vlan) => (
                            <tr key={vlan.vlanId} className="hover">
                              <td className="font-mono font-bold text-primary">
                                <span className="px-2 py-0.5 rounded bg-primary/10 border border-primary/20">
                                  {vlan.vlanId}
                                </span>
                              </td>
                              <td className="font-semibold text-base-content">{vlan.name}</td>
                              <td>
                                <div className="flex flex-wrap gap-1 max-w-sm">
                                  {vlan.untaggedPorts && vlan.untaggedPorts.length > 0 ? (
                                    vlan.untaggedPorts.map((p) => (
                                      <span
                                        key={p}
                                        className="badge badge-xs bg-emerald-500/10 text-emerald-400 border-emerald-500/30 font-mono"
                                      >
                                        P{p}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-[11px] text-slate-500">-</span>
                                  )}
                                </div>
                              </td>
                              <td>
                                <div className="flex flex-wrap gap-1 max-w-sm">
                                  {vlan.taggedPorts && vlan.taggedPorts.length > 0 ? (
                                    vlan.taggedPorts.map((p) => (
                                      <span
                                        key={p}
                                        className="badge badge-xs bg-sky-500/10 text-sky-400 border-sky-500/30 font-mono"
                                      >
                                        P{p}
                                      </span>
                                    ))
                                  ) : (
                                    <span className="text-[11px] text-slate-500">-</span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-10 text-slate-500">
                      <p>Tidak ada VLAN terdeteksi via Q-BRIDGE-MIB.</p>
                      <button
                        onClick={() => handleScanSwitch(detailSwitch.id)}
                        className="btn btn-xs btn-primary mt-2 gap-1.5"
                      >
                        <FaSyncAlt />
                        Scan Ulang
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: PORT MATRIX */}
              {detailTab === "ports" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400 bg-base-300/40 p-2.5 rounded-lg border border-primary/10">
                    <span className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded bg-emerald-500" /> Up / Terhubung
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded bg-slate-600" /> Down / Tidak Aktif
                    </span>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
                    {detailSwitch.ports && detailSwitch.ports.length > 0 ? (
                      detailSwitch.ports.map((port) => {
                        const isUp = port.status === "up";
                        return (
                          <div
                            key={port.index}
                            className={`p-2 rounded-lg border text-center transition-all ${
                              isUp
                                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.15)]"
                                : "bg-base-300/30 border-slate-700 text-slate-400"
                            }`}
                            title={`Port ${port.index} (${port.name}): ${isUp ? "UP" : "DOWN"} - PVID: ${port.pvid || 1} ${port.speed ? `(${port.speed})` : ""}`}
                          >
                            <p className="text-xs font-mono font-bold">P{port.index}</p>
                            <div className="mt-1 flex items-center justify-center gap-1">
                              <span
                                className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                                  isUp ? "bg-emerald-400" : "bg-slate-600"
                                }`}
                              />
                              <span className="text-[10px] font-mono truncate max-w-[48px]">
                                {isUp ? (port.speed || "UP") : "DOWN"}
                              </span>
                            </div>
                            {port.pvid && (
                              <p className="text-[9px] font-mono text-sky-400 mt-0.5 truncate">
                                V{port.pvid}
                              </p>
                            )}
                          </div>
                        );
                      })
                    ) : (
                      <p className="col-span-full text-center py-8 text-xs text-slate-500">
                        Tidak ada port terdeteksi via IF-MIB
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 3: SYSTEM INFO */}
              {detailTab === "system" && (
                <div className="space-y-4">
                  <div className="p-4 rounded-lg bg-base-300/30 border border-primary/10 space-y-2">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider font-mono">
                      System Description (sysDescr)
                    </p>
                    <p className="text-xs font-mono text-base-content bg-base-200/90 p-3 rounded border border-primary/10 whitespace-pre-wrap break-all">
                      {detailSwitch.sysDescr || "Tidak ada deskripsi sistem dari SNMP"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 rounded-lg bg-base-300/20 border border-base-300 text-xs space-y-1">
                      <p className="text-base-content/70">SNMP Community</p>
                      <p className="font-mono text-primary font-bold">{detailSwitch.community}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-base-300/20 border border-base-300 text-xs space-y-1">
                      <p className="text-base-content/70">SNMP Version &amp; Port</p>
                      <p className="font-mono text-base-content font-medium">
                        Version {detailSwitch.snmpVersion} · Port {detailSwitch.port}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="modal-action border-t border-primary/10 pt-3 mt-4 flex justify-between items-center">
              <button
                onClick={() => handleScanSwitch(detailSwitch.id)}
                disabled={scanningId === detailSwitch.id}
                className="btn btn-sm btn-primary gap-2"
              >
                <FaSyncAlt className={scanningId === detailSwitch.id ? "animate-spin" : ""} />
                Scan Ulang Sekarang
              </button>
              <button onClick={() => setDetailSwitch(null)} className="btn btn-sm btn-ghost">
                Tutup
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setDetailSwitch(null)}></div>
        </div>
      )}

      {/* MODAL 2: Tambah / Edit Perangkat */}
      {isAddModalOpen && (
        <div className="modal modal-open z-50">
          <div className="modal-box max-w-lg border border-primary/20">
            <h3 className="font-bold text-lg text-base-content flex items-center gap-2">
              <FaNetworkWired className="text-primary" />
              {editingSwitch ? "Edit Perangkat Jaringan" : "Tambah Perangkat Jaringan Baru"}
            </h3>
            <p className="text-xs text-base-content/70 mt-1">
              Daftarkan perangkat fisik rumah sakit (Switch, Router, NVR CCTV, Server, Access Point, Firewall).
            </p>

            <form onSubmit={handleSubmitForm} className="space-y-4 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label text-xs font-semibold text-base-content/80">Jenis Perangkat</label>
                  <select
                    value={formData.deviceType}
                    onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                    className="select select-sm w-full font-semibold"
                  >
                    <option value="switch">Switch Managed</option>
                    <option value="router">Router Core / Gateway</option>
                    <option value="nvr">NVR / CCTV Storage</option>
                    <option value="server">Server (SIMRS / DB)</option>
                    <option value="ap">Access Point Wi-Fi</option>
                    <option value="firewall">Hardware Firewall</option>
                    <option value="cctv">IP Camera</option>
                  </select>
                </div>

                <div className="form-control">
                  <label className="label text-xs font-semibold text-base-content/80">Metode Koneksi</label>
                  <select
                    value={formData.connMethod}
                    onChange={(e) => setFormData({ ...formData, connMethod: e.target.value })}
                    className="select select-sm w-full font-semibold"
                  >
                    <option value="snmp">SNMP (v1 / v2c)</option>
                    <option value="ping">ICMP Ping / Monitoring</option>
                    <option value="api">RouterOS / API</option>
                    <option value="manual">Manual / Static</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label text-xs font-semibold text-base-content/80">Nama Perangkat</label>
                <input
                  type="text"
                  placeholder="Contoh: SW-Core-Ruang-Server, R-CORE-CCR2004, NVR-IGD"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input input-sm w-full"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label text-xs font-semibold text-base-content/80">IP Address Perangkat</label>
                  <input
                    type="text"
                    placeholder="192.168.1.1 atau 10.1.8.2"
                    value={formData.ip}
                    onChange={(e) => setFormData({ ...formData, ip: e.target.value })}
                    className="input input-sm w-full font-mono"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label text-xs font-semibold text-base-content/80">Port Koneksi</label>
                  <input
                    type="number"
                    value={formData.port}
                    onChange={(e) => setFormData({ ...formData, port: parseInt(e.target.value, 10) || 161 })}
                    className="input input-sm w-full font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label text-xs font-semibold text-base-content/80">Brand / Vendor</label>
                  <input
                    type="text"
                    placeholder={formData.connMethod === "snmp" ? "Otomatis via SNMP / manual" : "MikroTik, Dell, Ruijie, dll"}
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="input input-sm w-full"
                  />
                </div>
                <div className="form-control">
                  <label className="label text-xs font-semibold text-base-content/80">Hardware Model</label>
                  <input
                    type="text"
                    placeholder={formData.connMethod === "snmp" ? "Otomatis via SNMP / manual" : "Model perangkat"}
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="input input-sm w-full"
                  />
                </div>
              </div>

              {formData.connMethod === "snmp" && (
                <div className="grid grid-cols-2 gap-3 bg-base-200/50 p-3 rounded-xl border border-base-300">
                  <div className="form-control">
                    <label className="label text-xs font-semibold text-base-content/80">SNMP Community</label>
                    <input
                      type="text"
                      placeholder="public"
                      value={formData.community}
                      onChange={(e) => setFormData({ ...formData, community: e.target.value })}
                      className="input input-sm w-full font-mono"
                      required
                    />
                  </div>
                  <div className="form-control">
                    <label className="label text-xs font-semibold text-base-content/80">SNMP Version</label>
                    <select
                      value={formData.snmpVersion}
                      onChange={(e) => setFormData({ ...formData, snmpVersion: e.target.value })}
                      className="select select-sm w-full font-mono"
                    >
                      <option value="2c">v2c (Rekomendasi)</option>
                      <option value="1">v1 (Legacy)</option>
                    </select>
                  </div>
                </div>
              )}

              <div className="form-control">
                <label className="label text-xs font-semibold text-base-content/80">Lokasi / Gedung</label>
                <input
                  type="text"
                  placeholder="Gedung Utama Lt. 2, Ruang Server RSUD NTB"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="input input-sm w-full"
                />
              </div>

              <div className="modal-action border-t border-primary/10 pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="btn btn-sm btn-ghost"
                  disabled={savingSwitch}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={savingSwitch}
                  className="btn btn-sm btn-primary gap-2"
                >
                  {savingSwitch && <span className="loading loading-spinner loading-xs" />}
                  {editingSwitch ? "Simpan Perubahan" : "Simpan & Scan SNMP"}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => !savingSwitch && setIsAddModalOpen(false)}></div>
        </div>
      )}

      {/* MODAL 3: Uji Cepat Probe SNMP */}
      {isProbeModalOpen && (
        <div className="modal modal-open z-50">
          <div className="modal-box max-w-xl border border-primary/20">
            <h3 className="font-bold text-lg text-base-content flex items-center gap-2">
              <FaBolt className="text-amber-400" />
              Uji Cepat Probe SNMP
            </h3>
            <p className="text-xs text-base-content/70 mt-1">
              Kirim paket SNMP get/walk langsung ke switch target tanpa menyimpan ke database.
            </p>

            <form onSubmit={handleProbeTest} className="space-y-3 mt-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="form-control">
                  <label className="label text-xs font-semibold text-base-content/80">IP Switch Target</label>
                  <input
                    type="text"
                    placeholder="192.168.1.1"
                    value={probeForm.ip}
                    onChange={(e) => setProbeForm({ ...probeForm, ip: e.target.value })}
                    className="input input-sm font-mono w-full"
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label text-xs font-semibold text-base-content/80">Community String</label>
                  <input
                    type="text"
                    placeholder="public"
                    value={probeForm.community}
                    onChange={(e) => setProbeForm({ ...probeForm, community: e.target.value })}
                    className="input input-sm font-mono w-full"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={probing}
                  className="btn btn-sm btn-primary gap-2"
                >
                  {probing && <span className="loading loading-spinner loading-xs" />}
                  Lakukan Probe SNMP
                </button>
              </div>
            </form>

            {/* Probe Results Box */}
            {probeResult && (
              <div className="mt-4 p-4 rounded-lg bg-base-300/40 border border-primary/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold font-mono uppercase tracking-wider text-base-content/80">
                    Hasil Deteksi SNMP
                  </span>
                  {probeResult.status === "online" ? (
                    <span className="badge badge-sm badge-success font-mono text-white">Terkoneksi</span>
                  ) : (
                    <span className="badge badge-sm badge-error font-mono text-white">Gagal / Timeout</span>
                  )}
                </div>

                {probeResult.status === "online" ? (
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Brand Terdeteksi:</span>
                      <span className="font-bold text-primary font-mono">{probeResult.brand}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Model:</span>
                      <span className="font-mono text-base-content font-medium">{probeResult.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Uptime:</span>
                      <span className="font-mono text-emerald-400">{probeResult.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Port Ditemukan:</span>
                      <span className="font-mono">{probeResult.ports?.length || 0} port</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">VLAN Ditemukan:</span>
                      <span className="font-mono text-primary">{probeResult.vlans?.length || 0} VLAN</span>
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-rose-400 font-mono">
                    {probeResult.error || "Perangkat tidak merespon SNMP pada port 161."}
                  </p>
                )}
              </div>
            )}

            <div className="modal-action border-t border-primary/10 pt-3 flex justify-end">
              <button
                type="button"
                onClick={() => setIsProbeModalOpen(false)}
                className="btn btn-sm btn-ghost"
              >
                Tutup
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => !probing && setIsProbeModalOpen(false)}></div>
        </div>
      )}
    </div>
  );
}
