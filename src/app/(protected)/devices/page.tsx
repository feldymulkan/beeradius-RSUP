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
  FaMicrochip,
  FaClock,
  FaMapMarkerAlt,
  FaTimes,
  FaRoute,
  FaVideo,
  FaWifi,
  FaShieldAlt,
  FaEyeSlash,
  FaLock,
  FaCloud,
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

interface NetworkDevice {
  id: number;
  name: string;
  ip: string;
  community: string;
  snmpVersion: string;
  port: number;
  snmpUser?: string;
  snmpSecurityLevel?: "noAuthNoPriv" | "authNoPriv" | "authPriv";
  snmpAuthProtocol?: string;
  snmpAuthPassword?: string;
  snmpPrivProtocol?: string;
  snmpPrivPassword?: string;
  snmpContext?: string;
  brand: string;
  model: string;
  sysDescr?: string;
  location?: string;
  status: "online" | "offline" | "snmp_offline";
  deviceType?: string;
  connMethod?: string;
  uptime?: string;
  vlans: SwitchVlan[];
  ports: SwitchPort[];
  lastPolled?: string;
  createdAt: string;
}

export default function DevicesPage() {
  const [devices, setDevices] = useState<NetworkDevice[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedConnMethod, setSelectedConnMethod] = useState("all");

  // State polling/scanning
  const [scanningId, setScanningId] = useState<number | null>(null);
  const [isScanningAll, setIsScanningAll] = useState(false);
  const [isSyncingRuijie, setIsSyncingRuijie] = useState(false);

  // Modal Detail
  const [detailDevice, setDetailDevice] = useState<NetworkDevice | null>(null);
  const [detailTab, setDetailTab] = useState<"vlans" | "ports" | "system">("vlans");

  // Modal Add / Edit
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<NetworkDevice | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    ip: "",
    deviceType: "switch",
    connMethod: "snmp",
    community: "public",
    snmpVersion: "2c",
    port: 161,
    snmpUser: "",
    snmpSecurityLevel: "authPriv" as "noAuthNoPriv" | "authNoPriv" | "authPriv",
    snmpAuthProtocol: "sha",
    snmpAuthPassword: "",
    snmpPrivProtocol: "aes",
    snmpPrivPassword: "",
    snmpContext: "",
    brand: "",
    model: "",
    location: "Ruang Server RSUD NTB",
  });
  const [savingDevice, setSavingDevice] = useState(false);
  const [showFormAuthPass, setShowFormAuthPass] = useState(false);
  const [showFormPrivPass, setShowFormPrivPass] = useState(false);

  // Modal Probe Test
  const [isProbeModalOpen, setIsProbeModalOpen] = useState(false);
  const [probeForm, setProbeForm] = useState({
    ip: "",
    community: "public",
    snmpVersion: "2c",
    port: 161,
    snmpUser: "",
    snmpSecurityLevel: "authPriv" as "noAuthNoPriv" | "authNoPriv" | "authPriv",
    snmpAuthProtocol: "sha",
    snmpAuthPassword: "",
    snmpPrivProtocol: "aes",
    snmpPrivPassword: "",
    snmpContext: "",
  });
  const [showProbeAuthPass, setShowProbeAuthPass] = useState(false);
  const [showProbePrivPass, setShowProbePrivPass] = useState(false);
  const [probing, setProbing] = useState(false);
  const [probeResult, setProbeResult] = useState<any>(null);

  // Load devices from API
  const fetchDevices = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/network/devices");
      if (!res.ok) throw new Error("Gagal mengambil data perangkat jaringan");
      const json = await res.json();
      setDevices(json.data || []);
    } catch (err: any) {
      toast.error(err.message || "Gagal memuat perangkat");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
    const interval = setInterval(() => {
      fetchDevices();
    }, 5 * 60 * 1000); // 5 menit
    return () => clearInterval(interval);
  }, []);

  // Filtered Devices
  const filteredDevices = useMemo(() => {
    return devices.filter((dev) => {
      const matchQuery =
        searchQuery === "" ||
        dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dev.ip.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (dev.brand && dev.brand.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (dev.model && dev.model.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (dev.location && dev.location.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (dev.sysDescr && dev.sysDescr.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchBrand =
        selectedBrand === "all" ||
        (dev.brand && dev.brand.toLowerCase().includes(selectedBrand.toLowerCase()));

      const matchStatus = selectedStatus === "all" || dev.status === selectedStatus;
      const matchType = selectedType === "all" || (dev.deviceType || "switch") === selectedType;
      const matchConnMethod =
        selectedConnMethod === "all" || (dev.connMethod || "snmp") === selectedConnMethod;

      return matchQuery && matchBrand && matchStatus && matchType && matchConnMethod;
    });
  }, [devices, searchQuery, selectedBrand, selectedStatus, selectedType, selectedConnMethod]);

  // Summary Metrics
  const metrics = useMemo(() => {
    const total = devices.length;
    const online = devices.filter((s) => s.status === "online").length;
    const snmpOffline = devices.filter((s) => s.status === "snmp_offline").length;
    const hostOffline = devices.filter((s) => s.status === "offline").length;
    const offline = snmpOffline + hostOffline;
    const totalVlans = devices.reduce((acc, s) => acc + (s.vlans?.length || 0), 0);
    const totalPorts = devices.reduce((acc, s) => acc + (s.ports?.length || 0), 0);
    const upPorts = devices.reduce(
      (acc, s) => acc + (s.ports?.filter((p) => p.status === "up").length || 0),
      0
    );
    const switchesCount = devices.filter((s) => (s.deviceType || "switch") === "switch").length;
    const routersCount = devices.filter((s) => s.deviceType === "router").length;
    const serversCount = devices.filter((s) => s.deviceType === "server").length;
    const nvrsCount = devices.filter((s) => s.deviceType === "nvr" || s.deviceType === "cctv").length;
    const apsCount = devices.filter((s) => s.deviceType === "ap").length;
    const ruijieCloudCount = devices.filter((s) => s.connMethod === "cloud").length;

    return {
      total,
      online,
      snmpOffline,
      hostOffline,
      offline,
      totalVlans,
      totalPorts,
      upPorts,
      switchesCount,
      routersCount,
      serversCount,
      nvrsCount,
      apsCount,
      ruijieCloudCount,
    };
  }, [devices]);

  // Trigger SNMP Scan per Device
  const handleScanDevice = async (id: number) => {
    try {
      setScanningId(id);
      const res = await fetch(`/api/network/devices/${id}`, { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Gagal memindai perangkat");

      toast.success(json.message || "Scan selesai");
      setDevices((prev) =>
        prev.map((s) => (s.id === id ? { ...json.data } : s))
      );
      if (detailDevice && detailDevice.id === id) {
        setDetailDevice(json.data);
      }
    } catch (err: any) {
      toast.error(err.message || "Gagal memindai perangkat");
    } finally {
      setScanningId(null);
    }
  };

  // Trigger full scan & update all network devices (SNMP & Ping)
  const handleScanAllDevices = async () => {
    try {
      setIsScanningAll(true);
      const res = await fetch("/api/network/devices/poll", { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Gagal memindai perangkat");

      toast.success(
        `Pemindaian selesai: ${json.data.online} Online, ${json.data.offline} Offline (${json.data.changed} status berubah)`
      );
      fetchDevices();
    } catch (err: any) {
      toast.error(err.message || "Gagal memindai semua perangkat");
    } finally {
      setIsScanningAll(false);
    }
  };

  // Sinkronisasi Live dengan Ruijie Cloud
  const handleSyncRuijieCloud = async () => {
    try {
      setIsSyncingRuijie(true);
      toast.loading("Menghubungi Ruijie Cloud Northbound API...", { id: "sync-ruijie" });
      const res = await fetch("/api/network/devices/sync-ruijie", { method: "POST" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Gagal sinkronisasi Ruijie Cloud");

      toast.success(
        `Sinkron Ruijie Cloud Selesai! ${json.data.totalFound} AP ditemukan (${json.data.created} Baru, ${json.data.updated} Terupdate, ${json.data.online} Online)`,
        { id: "sync-ruijie", duration: 6000 }
      );
      fetchDevices();
    } catch (err: any) {
      toast.error(err.message || "Gagal sinkronisasi Ruijie Cloud", { id: "sync-ruijie" });
    } finally {
      setIsSyncingRuijie(false);
    }
  };

  // Delete Device
  const handleDeleteDevice = async (id: number, name: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus perangkat ${name}?`)) return;
    try {
      const res = await fetch(`/api/network/devices/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus perangkat");
      toast.success("Perangkat berhasil dihapus");
      setDevices((prev) => prev.filter((s) => s.id !== id));
      if (detailDevice?.id === id) setDetailDevice(null);
    } catch (err: any) {
      toast.error(err.message || "Gagal menghapus perangkat");
    }
  };

  // Submit Add / Edit
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.ip) {
      toast.error("Nama dan IP Perangkat wajib diisi");
      return;
    }

    try {
      setSavingDevice(true);
      if (editingDevice) {
        const res = await fetch(`/api/network/devices/${editingDevice.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Gagal memperbarui perangkat");
        toast.success("Perangkat berhasil diperbarui");
      } else {
        const res = await fetch("/api/network/devices", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Gagal menambahkan perangkat");
        toast.success("Perangkat berhasil didaftarkan dan dipindai!");
      }
      setIsAddModalOpen(false);
      setEditingDevice(null);
      fetchDevices();
    } catch (err: any) {
      toast.error(err.message || "Terjadi kesalahan");
    } finally {
      setSavingDevice(false);
    }
  };

  // Probe Test Submit
  const handleProbeTest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!probeForm.ip) {
      toast.error("IP Perangkat wajib diisi");
      return;
    }

    try {
      setProbing(true);
      setProbeResult(null);
      const res = await fetch("/api/network/devices/probe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(probeForm),
      });
      const json = await res.json();
      setProbeResult(json.data);
      if (json.data?.status === "online") {
        toast.success(`SNMP Terkoneksi: ${json.data.brand} ${json.data.model}`);
      } else if (json.data?.detailedStatus === "snmp_offline") {
        toast("Host UP (Ping OK), namun SNMP timeout", { icon: "⚠️" });
      } else {
        toast.error(json.data?.error || "Perangkat tidak merespon SNMP & Ping (Host Down)");
      }
    } catch (err: any) {
      toast.error(err.message || "Gagal menghubungi probe endpoint");
    } finally {
      setProbing(false);
    }
  };

  // Helper Brand Badge Color
  const getBrandBadge = (brand: string) => {
    const b = (brand || "").toLowerCase();
    if (b.includes("ruijie") || b.includes("reyee")) return "bg-red-500/10 text-red-400 border-red-500/30";
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
            <h1 className="text-2xl font-bold tracking-tight">Manajemen Perangkat Jaringan</h1>
          </div>
          <p className="text-xs text-base-content/70 mt-1">
            Inventaris &amp; pemantauan infrastruktur RSUD NTB (Switch, Router, AP Ruijie Cloud, NVR CCTV, Server, Firewall) via SNMP, Ping, dan Cloud API
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="badge badge-outline border-emerald-500/30 text-emerald-400 gap-1.5 py-3 px-3 text-xs hidden lg:flex items-center">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Auto-Check 5m Aktif
          </div>

          {/* Tombol Sinkron Ruijie Cloud */}
          <button
            onClick={handleSyncRuijieCloud}
            disabled={isSyncingRuijie}
            className="btn btn-sm btn-outline border-sky-500/40 text-sky-400 hover:bg-sky-500/10 gap-2 shadow-xs cursor-pointer"
            title="Tarik dan sinkronkan semua Access Point dari Ruijie Cloud Northbound API"
          >
            <FaCloud className={`h-3.5 w-3.5 ${isSyncingRuijie ? "animate-spin text-sky-300" : "text-sky-400"}`} />
            <span>{isSyncingRuijie ? "Sinkronisasi Cloud..." : "☁️ Sinkron Ruijie Cloud"}</span>
          </button>

          <button
            onClick={handleScanAllDevices}
            disabled={isScanningAll}
            className="btn btn-sm btn-outline border-base-300 hover:border-primary gap-2 cursor-pointer"
            title="Scan status online/offline semua perangkat jaringan sekarang"
          >
            <FaSyncAlt className={`text-sky-400 ${isScanningAll ? "animate-spin" : ""}`} />
            {isScanningAll ? "Memindai..." : "Scan Status Semua"}
          </button>

          <button
            onClick={() => {
              setProbeResult(null);
              setIsProbeModalOpen(true);
            }}
            className="btn btn-sm btn-outline border-primary/30 hover:border-primary gap-2 cursor-pointer"
          >
            <FaBolt className="text-amber-400" />
            Uji Probe SNMP
          </button>

          <button
            onClick={() => {
              setEditingDevice(null);
              setShowFormAuthPass(false);
              setShowFormPrivPass(false);
              setFormData({
                name: "",
                ip: "",
                deviceType: "switch",
                connMethod: "snmp",
                community: "public",
                snmpVersion: "2c",
                port: 161,
                snmpUser: "",
                snmpSecurityLevel: "authPriv",
                snmpAuthProtocol: "sha",
                snmpAuthPassword: "",
                snmpPrivProtocol: "aes",
                snmpPrivPassword: "",
                snmpContext: "",
                brand: "",
                model: "",
                location: "Ruang Server RSUD NTB",
              });
              setIsAddModalOpen(true);
            }}
            className="btn btn-sm btn-primary gap-2 shadow-[0_0_12px_rgba(37,99,235,0.3)] cursor-pointer"
          >
            <FaPlus />
            Tambah Perangkat
          </button>

          <button
            onClick={fetchDevices}
            disabled={loading}
            className="btn btn-sm btn-ghost border border-base-300 gap-1.5 cursor-pointer"
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
            <span className="text-xs text-base-content/70 font-mono uppercase tracking-wider">Total Perangkat</span>
            <span className="p-2 rounded-lg bg-primary/10 text-primary">
              <FaServer className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2">
            <p className="text-2xl font-bold font-mono text-base-content">{metrics.total}</p>
            <p className="text-[11px] text-base-content/60 mt-0.5">
              {metrics.switchesCount} Switch, {metrics.routersCount} Router, {metrics.apsCount} AP
            </p>
          </div>
        </div>

        <div className="card p-4 flex flex-col justify-between border-emerald-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs text-base-content/70 font-mono uppercase tracking-wider">Status Perangkat</span>
            <span className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <FaCheckCircle className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold font-mono text-emerald-400">{metrics.online}</p>
              <span className="text-xs text-base-content/60 font-mono">Online / {metrics.total} Total</span>
            </div>
            <div className="text-[11px] text-base-content/60 mt-1 flex flex-wrap gap-2">
              {metrics.snmpOffline > 0 && (
                <span className="text-amber-400 font-medium">⚠️ {metrics.snmpOffline} Offline SNMP</span>
              )}
              {metrics.hostOffline > 0 && (
                <span className="text-rose-400 font-medium">⛔ {metrics.hostOffline} Offline Host</span>
              )}
              {metrics.offline === 0 && (
                <span className="text-emerald-400">Semua perangkat normal</span>
              )}
            </div>
          </div>
        </div>

        <div className="card p-4 flex flex-col justify-between border-sky-500/20">
          <div className="flex items-center justify-between">
            <span className="text-xs text-base-content/70 font-mono uppercase tracking-wider">Wi-Fi &amp; Ruijie Cloud</span>
            <span className="p-2 rounded-lg bg-sky-500/10 text-sky-400">
              <FaCloud className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold font-mono text-sky-400">{metrics.apsCount}</p>
              <span className="text-xs text-base-content/60 font-mono">Access Point</span>
            </div>
            <p className="text-[11px] text-base-content/60 mt-0.5">
              {metrics.ruijieCloudCount} tersinkron Ruijie Cloud
            </p>
          </div>
        </div>

        <div className="card p-4 flex flex-col justify-between border-primary/20">
          <div className="flex items-center justify-between">
            <span className="text-xs text-base-content/70 font-mono uppercase tracking-wider">Switching &amp; Port</span>
            <span className="p-2 rounded-lg bg-primary/10 text-primary">
              <FaMicrochip className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2">
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold font-mono text-primary">{metrics.upPorts}</p>
              <span className="text-xs text-base-content/60 font-mono">/ {metrics.totalPorts} port up</span>
            </div>
            <p className="text-[11px] text-base-content/60 mt-0.5">
              {metrics.totalVlans} VLAN terdeteksi via SNMP
            </p>
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
            <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base-content/40 h-3.5 w-3.5" />
            <input
              type="text"
              placeholder="Cari berdasarkan IP, Nama, Brand, Model, Serial, atau Lokasi Gedung..."
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

        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="select select-sm text-xs bg-base-100 border border-base-300 rounded-lg"
          >
            <option value="all">Semua Brand</option>
            <option value="ruijie">Ruijie / Reyee</option>
            <option value="mikrotik">MikroTik</option>
            <option value="zte">ZTE</option>
            <option value="tp-link">TP-Link</option>
            <option value="cisco">Cisco</option>
            <option value="huawei">Huawei</option>
          </select>

          <select
            value={selectedConnMethod}
            onChange={(e) => setSelectedConnMethod(e.target.value)}
            className="select select-sm text-xs bg-base-100 border border-base-300 rounded-lg font-mono"
          >
            <option value="all">Semua Koneksi</option>
            <option value="snmp">SNMP (v1/v2c/v3)</option>
            <option value="cloud">☁️ Ruijie Cloud</option>
            <option value="ping">ICMP Ping</option>
            <option value="api">RouterOS / API</option>
            <option value="manual">Manual</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="select select-sm text-xs bg-base-100 border border-base-300 rounded-lg"
          >
            <option value="all">Semua Status</option>
            <option value="online">🟢 Online</option>
            <option value="snmp_offline">🟡 Offline SNMP (Ping OK)</option>
            <option value="offline">🔴 Offline (Host Down)</option>
          </select>

          {(searchQuery || selectedBrand !== "all" || selectedStatus !== "all" || selectedType !== "all" || selectedConnMethod !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedBrand("all");
                setSelectedStatus("all");
                setSelectedType("all");
                setSelectedConnMethod("all");
              }}
              className="btn btn-sm btn-ghost text-xs gap-1 border border-base-300 hover:text-rose-400 cursor-pointer"
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
          { id: "all", label: `Semua (${metrics.total})` },
          { id: "switch", label: `Switch (${metrics.switchesCount})` },
          { id: "router", label: `Router (${metrics.routersCount})` },
          { id: "ap", label: `Access Point (${metrics.apsCount})` },
          { id: "server", label: `Server (${metrics.serversCount})` },
          { id: "nvr", label: `NVR & CCTV (${metrics.nvrsCount})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedType(tab.id)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedType === tab.id
                ? "bg-primary text-black border-primary font-bold shadow-xs"
                : "bg-base-200/50 border-base-300 text-base-content/60 hover:text-base-content"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Devices Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Perangkat &amp; IP</th>
                <th>Brand &amp; Model</th>
                <th>Status</th>
                <th>VLAN / Info</th>
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
                    <p className="text-xs text-base-content/60 mt-2">Memuat daftar perangkat jaringan...</p>
                  </td>
                </tr>
              ) : filteredDevices.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12">
                    <FaNetworkWired className="h-10 w-10 text-base-content/30 mx-auto mb-2 opacity-50" />
                    <p className="font-semibold text-base-content/80">Belum ada perangkat yang sesuai filter</p>
                    <p className="text-xs text-base-content/60 mt-1">
                      Klik "+ Tambah Perangkat" untuk mendaftarkan secara manual atau "☁️ Sinkron Ruijie Cloud" untuk menarik seluruh Access Point
                    </p>
                  </td>
                </tr>
              ) : (
                filteredDevices.map((dev) => {
                  const isScanning = scanningId === dev.id;
                  const upCount = dev.ports?.filter((p) => p.status === "up").length || 0;
                  const totalCount = dev.ports?.length || 0;
                  const isCloud = dev.connMethod === "cloud";

                  return (
                    <tr key={dev.id} className="hover">
                      <td>
                        <div className="flex items-center gap-2.5">
                          <span className="p-1.5 rounded-lg bg-base-200 border border-base-300 shadow-xs shrink-0">
                            {getDeviceIcon(dev.deviceType)}
                          </span>
                          <div className="min-w-0">
                            <div className="font-semibold text-sm text-base-content flex items-center gap-1.5 flex-wrap">
                              <span className="truncate max-w-[200px]" title={dev.name}>{dev.name}</span>
                              <span className="badge badge-xs badge-outline border-base-300 font-mono text-[8px] uppercase">
                                {dev.deviceType || "SWITCH"}
                              </span>
                              {isCloud ? (
                                <span className="badge badge-xs bg-sky-500/10 text-sky-400 border border-sky-500/30 font-mono text-[9px] gap-1 px-1.5 py-0.5">
                                  <FaCloud className="h-2 w-2" /> Ruijie Cloud
                                </span>
                              ) : (
                                <span className="badge badge-xs bg-primary/10 text-primary border border-primary/20 font-mono text-[8px] uppercase">
                                  {dev.connMethod || "SNMP"}
                                </span>
                              )}
                            </div>
                            <div className="text-xs font-mono text-primary flex items-center gap-1.5 mt-0.5 flex-wrap">
                              <span>{dev.ip}</span>
                              {dev.connMethod === "snmp" && (
                                <span className="text-[10px] text-base-content/50">
                                  :{dev.port}
                                </span>
                              )}
                              {dev.connMethod === "snmp" && dev.snmpVersion === "3" ? (
                                <span className="badge badge-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-[9px] gap-1 px-1.5 py-1">
                                  <FaShieldAlt className="h-2 w-2" /> v3 ({dev.snmpSecurityLevel || "authPriv"})
                                </span>
                              ) : dev.connMethod === "snmp" ? (
                                <span className="text-[10px] text-base-content/60 font-mono">
                                  (v{dev.snmpVersion})
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <div className="flex flex-col gap-1 items-start">
                          <span className={`badge badge-sm font-medium border ${getBrandBadge(dev.brand)}`}>
                            {dev.brand || "Unknown"}
                          </span>
                          <span className="text-xs text-base-content/70 font-mono truncate max-w-[180px]" title={dev.model}>
                            {dev.model || "-"}
                          </span>
                        </div>
                      </td>
                      <td>
                        {dev.status === "online" ? (
                          <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono" title="Perangkat Online">
                            <span className="status-dot" />
                            <span>Online</span>
                          </div>
                        ) : dev.status === "snmp_offline" ? (
                          <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono" title="Ping OK, namun SNMP Timeout">
                            <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_6px_#f59e0b]" />
                            <span className="font-semibold">Offline SNMP</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-xs text-rose-400 font-mono" title="Perangkat Offline">
                            <span className="h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_6px_#ef4444]" />
                            <span className="font-semibold">Offline</span>
                          </div>
                        )}
                        {dev.lastPolled && (
                          <p className="text-[10px] text-base-content/50 mt-0.5 font-mono">
                            {new Date(dev.lastPolled).toLocaleTimeString("id-ID", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        )}
                      </td>
                      <td>
                        {isCloud ? (
                          <div className="text-xs font-mono text-base-content/70">
                            <span className="badge badge-sm bg-base-200 border border-base-300 text-[10px] truncate max-w-[150px]">
                              {dev.sysDescr ? dev.sysDescr.split("|")[0].replace("Ruijie Cloud AP - Project: ", "") : "Ruijie AP"}
                            </span>
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-1 max-w-[220px]">
                            {dev.vlans && dev.vlans.length > 0 ? (
                              dev.vlans.slice(0, 4).map((v) => (
                                <span
                                  key={v.vlanId}
                                  className="badge badge-sm bg-base-300/80 border border-primary/20 text-[11px] font-mono"
                                  title={`${v.name} (Untagged: ${v.untaggedPorts?.length || 0}, Tagged: ${v.taggedPorts?.length || 0})`}
                                >
                                  V{v.vlanId}
                                </span>
                              ))
                            ) : (
                              <span className="text-xs text-base-content/50 italic">-</span>
                            )}
                            {dev.vlans && dev.vlans.length > 4 && (
                              <span className="badge badge-sm bg-primary/10 text-primary text-[10px] font-mono">
                                +{dev.vlans.length - 4}
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td>
                        {isCloud ? (
                          <div className="text-xs font-mono text-base-content/60">
                            <span>AP Wireless</span>
                          </div>
                        ) : (
                          <div>
                            <div className="text-xs font-mono">
                              <span className="text-emerald-400 font-semibold">{upCount}</span>
                              <span className="text-base-content/50"> / {totalCount}</span>
                            </div>
                            {totalCount > 0 && (
                              <div className="w-20 bg-base-300 h-1 rounded-full mt-1.5 overflow-hidden">
                                <div
                                  className="bg-emerald-500 h-full rounded-full"
                                  style={{ width: `${(upCount / totalCount) * 100}%` }}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </td>
                      <td>
                        <div className="text-xs text-base-content/80 flex items-center gap-1">
                          <FaClock className="h-3 w-3 text-base-content/50" />
                          <span className="font-mono">{dev.uptime || "-"}</span>
                        </div>
                        <div className="text-[11px] text-base-content/60 flex items-center gap-1 mt-0.5">
                          <FaMapMarkerAlt className="h-2.5 w-2.5 text-base-content/50" />
                          <span className="truncate max-w-[140px]" title={dev.location}>{dev.location || "RSUD NTB"}</span>
                        </div>
                      </td>
                      <td className="text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => {
                              setDetailDevice(dev);
                              setDetailTab("vlans");
                            }}
                            className="btn btn-xs btn-ghost border border-base-300 hover:border-primary/40 gap-1 cursor-pointer"
                            title="Detail Informasi"
                          >
                            <FaEye className="text-primary" />
                            <span className="hidden sm:inline">Detail</span>
                          </button>
                          {!isCloud && (
                            <button
                              onClick={() => handleScanDevice(dev.id)}
                              disabled={isScanning}
                              className="btn btn-xs btn-ghost border border-base-300 hover:border-primary/40 cursor-pointer"
                              title="Scan Ulang Status / SNMP"
                            >
                              <FaSyncAlt className={`text-base-content/70 ${isScanning ? "animate-spin text-primary" : ""}`} />
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setEditingDevice(dev);
                              setShowFormAuthPass(false);
                              setShowFormPrivPass(false);
                              setFormData({
                                name: dev.name,
                                ip: dev.ip,
                                deviceType: dev.deviceType || "switch",
                                connMethod: dev.connMethod || "snmp",
                                community: dev.community || "public",
                                snmpVersion: dev.snmpVersion || "2c",
                                port: dev.port || 161,
                                snmpUser: dev.snmpUser || "",
                                snmpSecurityLevel: (dev.snmpSecurityLevel as any) || "authPriv",
                                snmpAuthProtocol: dev.snmpAuthProtocol || "sha",
                                snmpAuthPassword: dev.snmpAuthPassword || "",
                                snmpPrivProtocol: dev.snmpPrivProtocol || "aes",
                                snmpPrivPassword: dev.snmpPrivPassword || "",
                                snmpContext: dev.snmpContext || "",
                                brand: dev.brand || "",
                                model: dev.model || "",
                                location: dev.location || "",
                              });
                              setIsAddModalOpen(true);
                            }}
                            className="btn btn-xs btn-ghost text-base-content/60 hover:text-base-content cursor-pointer"
                            title="Edit Perangkat"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleDeleteDevice(dev.id, dev.name)}
                            className="btn btn-xs btn-ghost text-rose-400 hover:text-rose-300 cursor-pointer"
                            title="Hapus Perangkat"
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

      {/* MODAL 1: Detail VLAN, Port Matrix, & System */}
      {detailDevice && (
        <div className="modal modal-open z-50">
          <div className="modal-box max-w-4xl max-h-[90vh] flex flex-col p-6 border border-primary/20">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-primary/10">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-primary/10 text-primary border border-primary/20">
                  {getDeviceIcon(detailDevice.deviceType)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-lg text-base-content">{detailDevice.name}</h3>
                    <span className={`badge badge-sm border ${getBrandBadge(detailDevice.brand)}`}>
                      {detailDevice.brand}
                    </span>
                    {detailDevice.status === "online" ? (
                      <span className="badge badge-sm badge-success text-success-content font-mono font-bold">
                        ONLINE
                      </span>
                    ) : detailDevice.status === "snmp_offline" ? (
                      <span className="badge badge-sm badge-warning text-warning-content font-mono font-bold" title="Ping Berhasil, SNMP Tidak Merespon">
                        OFFLINE SNMP
                      </span>
                    ) : (
                      <span className="badge badge-sm badge-error text-error-content font-mono font-bold" title="Host Unreachable">
                        OFFLINE
                      </span>
                    )}
                  </div>
                  <p className="text-xs font-mono text-primary mt-0.5">
                    {detailDevice.ip} · {detailDevice.model || "Network Device"} · Uptime: {detailDevice.uptime || "-"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDetailDevice(null)}
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
                {detailDevice.connMethod === "cloud" ? "Info Ruijie Cloud" : `Daftar VLAN (${detailDevice.vlans?.length || 0})`}
              </button>
              {detailDevice.connMethod !== "cloud" && (
                <button
                  onClick={() => setDetailTab("ports")}
                  className={`btn btn-xs ${
                    detailTab === "ports" ? "btn-primary" : "btn-ghost border border-base-300"
                  }`}
                >
                  Port Matrix ({detailDevice.ports?.length || 0})
                </button>
              )}
              <button
                onClick={() => setDetailTab("system")}
                className={`btn btn-xs ${
                  detailTab === "system" ? "btn-primary" : "btn-ghost border border-base-300"
                }`}
              >
                Telemetri &amp; SysDescr
              </button>
            </div>

            {/* Tab Contents */}
            <div className="flex-1 overflow-y-auto mt-4 pr-1">
              {/* TAB 1: VLANS / CLOUD INFO */}
              {detailTab === "vlans" && (
                <div className="space-y-3">
                  {detailDevice.connMethod === "cloud" ? (
                    <div className="space-y-4">
                      <div className="alert bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs">
                        <FaCloud className="h-5 w-5 shrink-0 text-sky-400" />
                        <div>
                          <p className="font-bold">Access Point Ruijie Cloud Terintegrasi</p>
                          <p className="text-base-content/70 mt-0.5">
                            Perangkat ini disinkronkan secara otomatis dari Ruijie Cloud Northbound API RSUD NTB.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                        <div className="p-3 bg-base-200 rounded-lg border border-base-300">
                          <span className="text-base-content/60 block text-[11px]">Nama AP / Hostname</span>
                          <span className="font-bold text-base-content text-sm">{detailDevice.name}</span>
                        </div>
                        <div className="p-3 bg-base-200 rounded-lg border border-base-300">
                          <span className="text-base-content/60 block text-[11px]">Model Hardware</span>
                          <span className="font-bold text-primary text-sm">{detailDevice.model}</span>
                        </div>
                        <div className="p-3 bg-base-200 rounded-lg border border-base-300">
                          <span className="text-base-content/60 block text-[11px]">IP Address Lokal</span>
                          <span className="font-bold text-emerald-400 text-sm">{detailDevice.ip}</span>
                        </div>
                        <div className="p-3 bg-base-200 rounded-lg border border-base-300">
                          <span className="text-base-content/60 block text-[11px]">Lokasi Gedung &amp; Proyek</span>
                          <span className="font-bold text-base-content text-sm">{detailDevice.location || "RSUD NTB"}</span>
                        </div>
                      </div>
                    </div>
                  ) : detailDevice.vlans && detailDevice.vlans.length > 0 ? (
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
                          {detailDevice.vlans.map((vlan) => (
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
                                    <span className="text-[11px] text-base-content/50">-</span>
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
                                    <span className="text-[11px] text-base-content/50">-</span>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-10 text-base-content/60">
                      <p>Tidak ada VLAN terdeteksi via SNMP RFC 2674 / Q-BRIDGE-MIB.</p>
                      {detailDevice.connMethod === "snmp" && (
                        <button
                          onClick={() => handleScanDevice(detailDevice.id)}
                          className="btn btn-xs btn-primary mt-2 gap-1.5"
                        >
                          <FaSyncAlt />
                          Scan Ulang
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 2: PORT MATRIX */}
              {detailTab === "ports" && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 text-xs font-mono text-base-content/70 bg-base-300/40 p-2.5 rounded-lg border border-primary/10">
                    <span className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded bg-emerald-500" /> Up / Terhubung
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded bg-base-content/30" /> Down / Tidak Aktif
                    </span>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 gap-2">
                    {detailDevice.ports && detailDevice.ports.length > 0 ? (
                      detailDevice.ports.map((port) => {
                        const isUp = port.status === "up";
                        return (
                          <div
                            key={port.index}
                            className={`p-2 rounded-lg border text-center transition-all ${
                              isUp
                                ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-300 shadow-[0_0_8px_rgba(16,185,129,0.15)]"
                                : "bg-base-300/30 border-base-300 text-base-content/50"
                            }`}
                            title={`Port ${port.index} (${port.name}): ${isUp ? "UP" : "DOWN"} - PVID: ${port.pvid || 1} ${port.speed ? `(${port.speed})` : ""}`}
                          >
                            <p className="text-xs font-mono font-bold">P{port.index}</p>
                            <div className="mt-1 flex items-center justify-center gap-1">
                              <span
                                className={`h-1.5 w-1.5 rounded-full shrink-0 ${
                                  isUp ? "bg-emerald-400" : "bg-base-content/30"
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
                      <p className="col-span-full text-center py-8 text-xs text-base-content/60">
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
                    <p className="text-xs font-semibold text-base-content/70 uppercase tracking-wider font-mono">
                      System Description (sysDescr / Cloud Telemetry)
                    </p>
                    <p className="text-xs font-mono text-base-content bg-base-200/90 p-3 rounded border border-primary/10 whitespace-pre-wrap break-all">
                      {detailDevice.sysDescr || "Tidak ada deskripsi sistem dari SNMP/Cloud"}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-base-300/20 border border-base-300 text-xs space-y-1">
                      <p className="text-base-content/70">Metode &amp; Port</p>
                      <div className="flex items-center gap-1.5 font-mono">
                        <span className="badge badge-sm badge-ghost uppercase">
                          {detailDevice.connMethod || "SNMP"}
                        </span>
                        <span className="text-base-content font-medium">:{detailDevice.port}</span>
                      </div>
                    </div>
                    {detailDevice.connMethod === "snmp" && detailDevice.snmpVersion === "3" ? (
                      <>
                        <div className="p-3 rounded-lg bg-base-300/20 border border-base-300 text-xs space-y-1">
                          <p className="text-base-content/70">USM User &amp; Level</p>
                          <p className="font-mono text-primary font-bold truncate">
                            {detailDevice.snmpUser || "public"}{" "}
                            <span className="badge badge-xs badge-outline text-[9px] uppercase font-mono ml-1">
                              {detailDevice.snmpSecurityLevel || "authPriv"}
                            </span>
                          </p>
                        </div>
                        <div className="p-3 rounded-lg bg-base-300/20 border border-base-300 text-xs space-y-1">
                          <p className="text-base-content/70">Protokol Keamanan</p>
                          <p className="font-mono text-base-content font-medium text-[11px] truncate">
                            Auth: <span className="text-sky-400 font-bold uppercase">{detailDevice.snmpAuthProtocol || "SHA"}</span>
                            {detailDevice.snmpSecurityLevel === "authPriv" && (
                              <> · Priv: <span className="text-amber-400 font-bold uppercase">{detailDevice.snmpPrivProtocol || "AES"}</span></>
                            )}
                          </p>
                        </div>
                      </>
                    ) : detailDevice.connMethod === "snmp" ? (
                      <div className="p-3 rounded-lg bg-base-300/20 border border-base-300 text-xs space-y-1 col-span-1 md:col-span-2">
                        <p className="text-base-content/70">SNMP Community</p>
                        <p className="font-mono text-primary font-bold">{detailDevice.community}</p>
                      </div>
                    ) : (
                      <div className="p-3 rounded-lg bg-base-300/20 border border-base-300 text-xs space-y-1 col-span-1 md:col-span-2">
                        <p className="text-base-content/70">Kategori Perangkat</p>
                        <p className="font-mono text-sky-400 font-bold capitalize">{detailDevice.deviceType || "AP"}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="modal-action border-t border-primary/10 pt-3 mt-4 flex justify-between items-center">
              {detailDevice.connMethod === "snmp" ? (
                <button
                  onClick={() => handleScanDevice(detailDevice.id)}
                  disabled={scanningId === detailDevice.id}
                  className="btn btn-sm btn-primary gap-2 cursor-pointer"
                >
                  <FaSyncAlt className={scanningId === detailDevice.id ? "animate-spin" : ""} />
                  Scan Ulang SNMP
                </button>
              ) : (
                <span className="text-xs text-base-content/50 font-mono">
                  Terakhir dicek: {detailDevice.lastPolled ? new Date(detailDevice.lastPolled).toLocaleTimeString("id-ID") : "-"}
                </span>
              )}
              <button onClick={() => setDetailDevice(null)} className="btn btn-sm btn-ghost cursor-pointer">
                Tutup
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setDetailDevice(null)}></div>
        </div>
      )}

      {/* MODAL 2: Tambah / Edit Perangkat */}
      {isAddModalOpen && (
        <div className="modal modal-open z-50">
          <div className="modal-box max-w-lg border border-primary/20">
            <h3 className="font-bold text-lg text-base-content flex items-center gap-2">
              <FaNetworkWired className="text-primary" />
              {editingDevice ? "Edit Perangkat Jaringan" : "Tambah Perangkat Jaringan Baru"}
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
                    <option value="ap">Access Point Wi-Fi</option>
                    <option value="nvr">NVR / CCTV Storage</option>
                    <option value="server">Server (SIMRS / DB)</option>
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
                    <option value="snmp">SNMP (v1 / v2c / v3)</option>
                    <option value="ping">ICMP Ping / Monitoring</option>
                    <option value="cloud">Ruijie Cloud</option>
                    <option value="api">RouterOS / API</option>
                    <option value="manual">Manual / Static</option>
                  </select>
                </div>
              </div>

              <div className="form-control">
                <label className="label text-xs font-semibold text-base-content/80">Nama Perangkat</label>
                <input
                  type="text"
                  placeholder="Contoh: SW-Core-Ruang-Server, R-CORE-CCR2004, AP-IGD-01"
                  value={formData.name}
                  onChange={(e) => {
                    const newName = e.target.value;
                    let newType = formData.deviceType;
                    if (newType === "switch" && (/router|gateway|ccr|rb[0-9]|^r-/i.test(newName))) {
                      newType = "router";
                    }
                    setFormData({ ...formData, name: newName, deviceType: newType });
                  }}
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
                    placeholder={formData.connMethod === "snmp" ? "Otomatis via SNMP / manual" : "Ruijie, MikroTik, Cisco, dll"}
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
                <div className="space-y-3 bg-base-200/50 p-3.5 rounded-xl border border-base-300">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="form-control">
                      <label className="label text-xs font-semibold text-base-content/80">SNMP Version</label>
                      <select
                        value={formData.snmpVersion}
                        onChange={(e) => setFormData({ ...formData, snmpVersion: e.target.value })}
                        className="select select-sm w-full font-mono"
                      >
                        <option value="2c">v2c (Community String)</option>
                        <option value="3">v3 (USM Secure Enkripsi)</option>
                        <option value="1">v1 (Legacy)</option>
                      </select>
                    </div>

                    {formData.snmpVersion !== "3" ? (
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
                    ) : (
                      <div className="form-control">
                        <label className="label text-xs font-semibold text-base-content/80 flex items-center gap-1">
                          <FaShieldAlt className="text-emerald-400" /> Security Level
                        </label>
                        <select
                          value={formData.snmpSecurityLevel}
                          onChange={(e) => setFormData({ ...formData, snmpSecurityLevel: e.target.value as any })}
                          className="select select-sm w-full font-mono text-xs"
                        >
                          <option value="authPriv">authPriv (Auth &amp; Enkripsi)</option>
                          <option value="authNoPriv">authNoPriv (Auth Saja)</option>
                          <option value="noAuthNoPriv">noAuthNoPriv (Tanpa Auth/Priv)</option>
                        </select>
                      </div>
                    )}
                  </div>

                  {formData.snmpVersion === "3" && (
                    <div className="space-y-3 pt-2 border-t border-base-300/60">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="form-control">
                          <label className="label text-xs font-semibold text-base-content/80 flex items-center gap-1">
                            <FaLock className="text-sky-400 text-[10px]" /> USM Username / SecName
                          </label>
                          <input
                            type="text"
                            placeholder="Contoh: snmpuser, noc-admin"
                            value={formData.snmpUser}
                            onChange={(e) => setFormData({ ...formData, snmpUser: e.target.value })}
                            className="input input-sm w-full font-mono text-xs"
                            required
                          />
                        </div>
                        <div className="form-control">
                          <label className="label text-xs font-semibold text-base-content/80">
                            Context Name (Opsional)
                          </label>
                          <input
                            type="text"
                            placeholder="default / kosong"
                            value={formData.snmpContext}
                            onChange={(e) => setFormData({ ...formData, snmpContext: e.target.value })}
                            className="input input-sm w-full font-mono text-xs"
                          />
                        </div>
                      </div>

                      {formData.snmpSecurityLevel !== "noAuthNoPriv" && (
                        <div className="grid grid-cols-2 gap-3 p-2.5 rounded-lg bg-base-100/60 border border-base-300/70">
                          <div className="form-control">
                            <label className="label text-[11px] font-semibold text-base-content/80">
                              Auth Protocol
                            </label>
                            <select
                              value={formData.snmpAuthProtocol}
                              onChange={(e) => setFormData({ ...formData, snmpAuthProtocol: e.target.value })}
                              className="select select-xs w-full font-mono"
                            >
                              <option value="sha">SHA (SHA-1)</option>
                              <option value="sha256">SHA-256</option>
                              <option value="sha512">SHA-512</option>
                              <option value="md5">MD5</option>
                            </select>
                          </div>
                          <div className="form-control">
                            <label className="label text-[11px] font-semibold text-base-content/80 flex items-center justify-between">
                              <span>Auth Password</span>
                              <button
                                type="button"
                                onClick={() => setShowFormAuthPass(!showFormAuthPass)}
                                className="text-primary hover:underline text-[10px] cursor-pointer"
                              >
                                {showFormAuthPass ? "Tutup" : "Lihat"}
                              </button>
                            </label>
                            <div className="relative">
                              <input
                                type={showFormAuthPass ? "text" : "password"}
                                placeholder="Ketik auth password"
                                value={formData.snmpAuthPassword}
                                onChange={(e) => setFormData({ ...formData, snmpAuthPassword: e.target.value })}
                                className="input input-xs w-full font-mono pr-7"
                              />
                              <button
                                type="button"
                                onClick={() => setShowFormAuthPass(!showFormAuthPass)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                              >
                                {showFormAuthPass ? <FaEyeSlash size={10} /> : <FaEye size={10} />}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {formData.snmpSecurityLevel === "authPriv" && (
                        <div className="grid grid-cols-2 gap-3 p-2.5 rounded-lg bg-base-100/60 border border-base-300/70">
                          <div className="form-control">
                            <label className="label text-[11px] font-semibold text-base-content/80">
                              Privacy Protocol
                            </label>
                            <select
                              value={formData.snmpPrivProtocol}
                              onChange={(e) => setFormData({ ...formData, snmpPrivProtocol: e.target.value })}
                              className="select select-xs w-full font-mono"
                            >
                              <option value="aes">AES (AES-128)</option>
                              <option value="aes256b">AES-256 (Blumenthal)</option>
                              <option value="aes256r">AES-256 (Reeder)</option>
                              <option value="des">DES (Legacy)</option>
                            </select>
                          </div>
                          <div className="form-control">
                            <label className="label text-[11px] font-semibold text-base-content/80 flex items-center justify-between">
                              <span>Privacy Password</span>
                              <button
                                type="button"
                                onClick={() => setShowFormPrivPass(!showFormPrivPass)}
                                className="text-primary hover:underline text-[10px] cursor-pointer"
                              >
                                {showFormPrivPass ? "Tutup" : "Lihat"}
                              </button>
                            </label>
                            <div className="relative">
                              <input
                                type={showFormPrivPass ? "text" : "password"}
                                placeholder="Ketik privacy password"
                                value={formData.snmpPrivPassword}
                                onChange={(e) => setFormData({ ...formData, snmpPrivPassword: e.target.value })}
                                className="input input-xs w-full font-mono pr-7"
                              />
                              <button
                                type="button"
                                onClick={() => setShowFormPrivPass(!showFormPrivPass)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                              >
                                {showFormPrivPass ? <FaEyeSlash size={10} /> : <FaEye size={10} />}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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
                  className="btn btn-sm btn-ghost cursor-pointer"
                  disabled={savingDevice}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={savingDevice}
                  className="btn btn-sm btn-primary gap-2 cursor-pointer"
                >
                  {savingDevice && <span className="loading loading-spinner loading-xs" />}
                  {editingDevice ? "Simpan Perubahan" : "Simpan & Scan"}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => !savingDevice && setIsAddModalOpen(false)}></div>
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="form-control sm:col-span-2">
                  <label className="label text-xs font-semibold text-base-content/80">IP Target</label>
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
                  <label className="label text-xs font-semibold text-base-content/80">Port</label>
                  <input
                    type="number"
                    value={probeForm.port}
                    onChange={(e) => setProbeForm({ ...probeForm, port: parseInt(e.target.value, 10) || 161 })}
                    className="input input-sm font-mono w-full"
                  />
                </div>
              </div>

              <div className="space-y-3 bg-base-200/50 p-3.5 rounded-xl border border-base-300">
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-control">
                    <label className="label text-xs font-semibold text-base-content/80">SNMP Version</label>
                    <select
                      value={probeForm.snmpVersion}
                      onChange={(e) => setProbeForm({ ...probeForm, snmpVersion: e.target.value })}
                      className="select select-sm w-full font-mono"
                    >
                      <option value="2c">v2c (Community String)</option>
                      <option value="3">v3 (USM Secure Enkripsi)</option>
                      <option value="1">v1 (Legacy)</option>
                    </select>
                  </div>

                  {probeForm.snmpVersion !== "3" ? (
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
                  ) : (
                    <div className="form-control">
                      <label className="label text-xs font-semibold text-base-content/80 flex items-center gap-1">
                        <FaShieldAlt className="text-emerald-400" /> Security Level
                      </label>
                      <select
                        value={probeForm.snmpSecurityLevel}
                        onChange={(e) => setProbeForm({ ...probeForm, snmpSecurityLevel: e.target.value as any })}
                        className="select select-sm w-full font-mono text-xs"
                      >
                        <option value="authPriv">authPriv (Auth &amp; Enkripsi)</option>
                        <option value="authNoPriv">authNoPriv (Auth Saja)</option>
                        <option value="noAuthNoPriv">noAuthNoPriv (Tanpa Auth/Priv)</option>
                      </select>
                    </div>
                  )}
                </div>

                {probeForm.snmpVersion === "3" && (
                  <div className="space-y-3 pt-2 border-t border-base-300/60">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="form-control">
                        <label className="label text-xs font-semibold text-base-content/80 flex items-center gap-1">
                          <FaLock className="text-sky-400 text-[10px]" /> USM Username / SecName
                        </label>
                        <input
                          type="text"
                          placeholder="Contoh: snmpuser, noc-admin"
                          value={probeForm.snmpUser}
                          onChange={(e) => setProbeForm({ ...probeForm, snmpUser: e.target.value })}
                          className="input input-sm w-full font-mono text-xs"
                          required
                        />
                      </div>
                      <div className="form-control">
                        <label className="label text-xs font-semibold text-base-content/80">
                          Context Name (Opsional)
                        </label>
                        <input
                          type="text"
                          placeholder="default / kosong"
                          value={probeForm.snmpContext}
                          onChange={(e) => setProbeForm({ ...probeForm, snmpContext: e.target.value })}
                          className="input input-sm w-full font-mono text-xs"
                        />
                      </div>
                    </div>

                    {probeForm.snmpSecurityLevel !== "noAuthNoPriv" && (
                      <div className="grid grid-cols-2 gap-3 p-2.5 rounded-lg bg-base-100/60 border border-base-300/70">
                        <div className="form-control">
                          <label className="label text-[11px] font-semibold text-base-content/80">
                            Auth Protocol
                          </label>
                          <select
                            value={probeForm.snmpAuthProtocol}
                            onChange={(e) => setProbeForm({ ...probeForm, snmpAuthProtocol: e.target.value })}
                            className="select select-xs w-full font-mono"
                          >
                            <option value="sha">SHA (SHA-1)</option>
                            <option value="sha256">SHA-256</option>
                            <option value="sha512">SHA-512</option>
                            <option value="md5">MD5</option>
                          </select>
                        </div>
                        <div className="form-control">
                          <label className="label text-[11px] font-semibold text-base-content/80 flex items-center justify-between">
                            <span>Auth Password</span>
                            <button
                              type="button"
                              onClick={() => setShowProbeAuthPass(!showProbeAuthPass)}
                              className="text-primary hover:underline text-[10px] cursor-pointer"
                            >
                              {showProbeAuthPass ? "Tutup" : "Lihat"}
                            </button>
                          </label>
                          <div className="relative">
                            <input
                              type={showProbeAuthPass ? "text" : "password"}
                              placeholder="Ketik auth password"
                              value={probeForm.snmpAuthPassword}
                              onChange={(e) => setProbeForm({ ...probeForm, snmpAuthPassword: e.target.value })}
                              className="input input-xs w-full font-mono pr-7"
                            />
                            <button
                              type="button"
                              onClick={() => setShowProbeAuthPass(!showProbeAuthPass)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                            >
                              {showProbeAuthPass ? <FaEyeSlash size={10} /> : <FaEye size={10} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {probeForm.snmpSecurityLevel === "authPriv" && (
                      <div className="grid grid-cols-2 gap-3 p-2.5 rounded-lg bg-base-100/60 border border-base-300/70">
                        <div className="form-control">
                          <label className="label text-[11px] font-semibold text-base-content/80">
                            Privacy Protocol
                          </label>
                          <select
                            value={probeForm.snmpPrivProtocol}
                            onChange={(e) => setProbeForm({ ...probeForm, snmpPrivProtocol: e.target.value })}
                            className="select select-xs w-full font-mono"
                          >
                            <option value="aes">AES (AES-128)</option>
                            <option value="aes256b">AES-256 (Blumenthal)</option>
                            <option value="aes256r">AES-256 (Reeder)</option>
                            <option value="des">DES (Legacy)</option>
                          </select>
                        </div>
                        <div className="form-control">
                          <label className="label text-[11px] font-semibold text-base-content/80 flex items-center justify-between">
                            <span>Privacy Password</span>
                            <button
                              type="button"
                              onClick={() => setShowProbePrivPass(!showProbePrivPass)}
                              className="text-primary hover:underline text-[10px] cursor-pointer"
                            >
                              {showProbePrivPass ? "Tutup" : "Lihat"}
                            </button>
                          </label>
                          <div className="relative">
                            <input
                              type={showProbePrivPass ? "text" : "password"}
                              placeholder="Ketik privacy password"
                              value={probeForm.snmpPrivPassword}
                              onChange={(e) => setProbeForm({ ...probeForm, snmpPrivPassword: e.target.value })}
                              className="input input-xs w-full font-mono pr-7"
                            />
                            <button
                              type="button"
                              onClick={() => setShowProbePrivPass(!showProbePrivPass)}
                              className="absolute right-2 top-1/2 -translate-y-1/2 text-base-content/50 hover:text-base-content"
                            >
                              {showProbePrivPass ? <FaEyeSlash size={10} /> : <FaEye size={10} />}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  disabled={probing}
                  className="btn btn-sm btn-primary gap-2 cursor-pointer"
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
                  {probeResult.detailedStatus === "online" || probeResult.status === "online" ? (
                    <span className="badge badge-sm badge-success font-mono text-success-content font-bold">
                      Online (SNMP &amp; Ping)
                    </span>
                  ) : probeResult.detailedStatus === "snmp_offline" ? (
                    <span className="badge badge-sm badge-warning font-mono text-warning-content font-bold">
                      Offline SNMP (Ping OK)
                    </span>
                  ) : (
                    <span className="badge badge-sm badge-error font-mono text-error-content font-bold">
                      Offline Ping (Host Down)
                    </span>
                  )}
                </div>

                {probeResult.diagnosis && (
                  <div className={`p-2.5 rounded text-xs font-mono border ${
                    probeResult.status === "online"
                      ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                      : probeResult.detailedStatus === "snmp_offline"
                      ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                      : "bg-rose-500/10 border-rose-500/20 text-rose-400"
                  }`}>
                    {probeResult.diagnosis}
                  </div>
                )}

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
                      <span className="text-base-content/70">Uptime:</span>
                      <span className="font-mono text-emerald-400">{probeResult.uptime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/70">Port Ditemukan:</span>
                      <span className="font-mono">{probeResult.ports?.length || 0} port</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-base-content/70">VLAN Ditemukan:</span>
                      <span className="font-mono text-primary">{probeResult.vlans?.length || 0} VLAN</span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-base-300/40">
                      <span className="text-base-content/70">Jenis Terdeteksi:</span>
                      <span className="font-bold text-sky-400 font-mono capitalize">
                        {probeResult.deviceType === "router"
                          ? "Router Core / Gateway"
                          : probeResult.deviceType === "firewall"
                          ? "Firewall Gateway"
                          : probeResult.deviceType === "ap"
                          ? "Access Point Wi-Fi"
                          : probeResult.deviceType === "nvr"
                          ? "NVR CCTV Storage"
                          : "Switch Managed"}
                      </span>
                    </div>

                    <div className="pt-2 border-t border-base-300/60 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          const suggestedName =
                            probeResult.name && probeResult.name !== probeForm.ip
                              ? probeResult.name
                              : probeResult.deviceType === "router"
                              ? `R-${probeResult.model?.split(" ")[0] || "CORE"}`
                              : `SW-${probeResult.model?.split(" ")[0] || "NOC"}`;
                          setFormData({
                            name: suggestedName,
                            ip: probeForm.ip,
                            deviceType: probeResult.deviceType || "switch",
                            connMethod: "snmp",
                            community: probeForm.community,
                            snmpVersion: probeForm.snmpVersion,
                            port: probeForm.port,
                            snmpUser: probeForm.snmpUser,
                            snmpSecurityLevel: probeForm.snmpSecurityLevel,
                            snmpAuthProtocol: probeForm.snmpAuthProtocol,
                            snmpAuthPassword: probeForm.snmpAuthPassword,
                            snmpPrivProtocol: probeForm.snmpPrivProtocol,
                            snmpPrivPassword: probeForm.snmpPrivPassword,
                            snmpContext: probeForm.snmpContext,
                            brand: probeResult.brand,
                            model: probeResult.model,
                            location: probeResult.location || "Ruang Server RSUD NTB",
                          });
                          setIsProbeModalOpen(false);
                          setEditingDevice(null);
                          setIsAddModalOpen(true);
                        }}
                        className="btn btn-xs btn-primary gap-1 shadow-sm cursor-pointer"
                      >
                        <FaPlus size={10} />
                        Gunakan Data Ini untuk Tambah Perangkat
                      </button>
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
                className="btn btn-sm btn-ghost cursor-pointer"
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
