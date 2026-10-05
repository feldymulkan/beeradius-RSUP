'use client';

import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import {
  TopologyNode,
  TopologyEdge,
  TopologyData,
  DeviceType,
} from '@/types/topology';
import DeviceModal from './DeviceModal';
import ConnectPortModal from './ConnectPortModal';
import ImportDeviceModal from './ImportDeviceModal';
import DeviceDetailsDrawer from './DeviceDetailsDrawer';
import SwitchSyncModal from './SwitchSyncModal';
import {
  FaRoute,
  FaNetworkWired,
  FaVideo,
  FaWifi,
  FaServer,
  FaShieldAlt,
  FaDesktop,
  FaPlus,
  FaLink,
  FaDownload,
  FaSave,
  FaSearchPlus,
  FaSearchMinus,
  FaCompress,
  FaMagic,
  FaTrash,
  FaCamera,
  FaSyncAlt,
} from 'react-icons/fa';
import toast from 'react-hot-toast';

interface TopologyCanvasProps {
  initialTopology: TopologyData;
}

export default function TopologyCanvas({ initialTopology }: TopologyCanvasProps) {
  const [topology, setTopology] = useState<TopologyData>(initialTopology);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [isSaving, setIsSaving] = useState(false);

  // Modals state
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
  const [editingDevice, setEditingDevice] = useState<TopologyNode | null>(null);

  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [preselectedSource, setPreselectedSource] = useState<{ nodeId: string; port?: string } | null>(null);

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [syncBadgeCount, setSyncBadgeCount] = useState<number>(0);

  // Cek perbedaan switch pada database saat canvas pertama kali dimuat
  useEffect(() => {
    const checkSyncDiff = async () => {
      try {
        const res = await fetch('/api/network/topology/sync-switches');
        const json = await res.json();
        if (res.ok && json.data?.summary) {
          const count =
            (json.data.summary.newCount || 0) + (json.data.summary.updateCount || 0);
          setSyncBadgeCount(count);
        }
      } catch (err) {
        console.error('Error checking switch sync on mount:', err);
      }
    };
    checkSyncDiff();
  }, []);

  // Selected edge state for quick inspection/deletion
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);

  // Viewport Pan & Zoom state
  const [zoom, setZoom] = useState(initialTopology.viewport?.zoom || 1);
  const [pan, setPan] = useState({
    x: initialTopology.viewport?.panX || 40,
    y: initialTopology.viewport?.panY || 30,
  });

  const canvasRef = useRef<HTMLDivElement>(null);
  const [isPanning, setIsPanning] = useState(false);
  const [panStart, setPanStart] = useState({ x: 0, y: 0 });

  // Node Dragging state
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  // -------------------------------------------------------------
  // Pan & Zoom Event Handlers
  // -------------------------------------------------------------
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const zoomFactor = e.deltaY < 0 ? 1.08 : 0.92;
    setZoom((prev) => Math.min(Math.max(prev * zoomFactor, 0.3), 2.5));
  };

  const handleMouseDownCanvas = (e: React.MouseEvent) => {
    // Only pan if clicking canvas background (not node or button)
    if (e.target === canvasRef.current || (e.target as HTMLElement).tagName === 'svg') {
      setIsPanning(true);
      setPanStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
      setSelectedNodeId(null);
      setSelectedEdgeId(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPan({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y,
      });
    } else if (draggingNodeId) {
      const nodeX = (e.clientX - pan.x) / zoom - dragOffset.x;
      const nodeY = (e.clientY - pan.y) / zoom - dragOffset.y;

      setTopology((prev) => ({
        ...prev,
        nodes: prev.nodes.map((n) =>
          n.id === draggingNodeId ? { ...n, x: Math.round(nodeX), y: Math.round(nodeY) } : n
        ),
      }));
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
    setDraggingNodeId(null);
  };

  const startDragNode = (e: React.MouseEvent, node: TopologyNode) => {
    e.stopPropagation();
    setDraggingNodeId(node.id);
    setSelectedNodeId(node.id);
    setSelectedEdgeId(null);

    const mouseCanvasX = (e.clientX - pan.x) / zoom;
    const mouseCanvasY = (e.clientY - pan.y) / zoom;
    setDragOffset({
      x: mouseCanvasX - node.x,
      y: mouseCanvasY - node.y,
    });
  };

  // -------------------------------------------------------------
  // Device CRUD Operations
  // -------------------------------------------------------------
  const handleSaveDevice = (deviceData: Omit<TopologyNode, 'x' | 'y'> & { x?: number; y?: number }) => {
    if (editingDevice) {
      // Update existing
      setTopology((prev) => ({
        ...prev,
        nodes: prev.nodes.map((n) =>
          n.id === deviceData.id
            ? {
                ...n,
                ...deviceData,
                x: n.x,
                y: n.y,
              }
            : n
        ),
      }));
      toast.success(`Perangkat "${deviceData.name}" berhasil diperbarui`);
    } else {
      // Add new node in center of current viewport
      const centerX = Math.round((-pan.x + 600) / zoom);
      const centerY = Math.round((-pan.y + 350) / zoom);
      const newNode: TopologyNode = {
        ...deviceData,
        x: deviceData.x !== undefined ? deviceData.x : centerX,
        y: deviceData.y !== undefined ? deviceData.y : centerY,
      };

      setTopology((prev) => ({
        ...prev,
        nodes: [...prev.nodes, newNode],
      }));
      setSelectedNodeId(newNode.id);
      toast.success(`Perangkat "${deviceData.name}" berhasil ditambahkan ke topologi`);
    }
  };

  const handleDeleteDevice = (nodeId: string) => {
    const node = topology.nodes.find((n) => n.id === nodeId);
    setTopology((prev) => ({
      ...prev,
      nodes: prev.nodes.filter((n) => n.id !== nodeId),
      // Also remove all edges connected to this device
      edges: prev.edges.filter((e) => e.sourceNodeId !== nodeId && e.targetNodeId !== nodeId),
    }));
    if (selectedNodeId === nodeId) setSelectedNodeId(null);
    toast.success(`Perangkat "${node?.name || nodeId}" telah dihapus`);
  };

  // -------------------------------------------------------------
  // Connection / Edge Operations
  // -------------------------------------------------------------
  const handleAddEdge = (newEdge: TopologyEdge) => {
    // Cek apakah koneksi dengan port yang sama sudah ada
    const exists = topology.edges.some(
      (e) =>
        (e.sourceNodeId === newEdge.sourceNodeId &&
          e.sourcePort === newEdge.sourcePort &&
          e.targetNodeId === newEdge.targetNodeId &&
          e.targetPort === newEdge.targetPort) ||
        (e.sourceNodeId === newEdge.targetNodeId &&
          e.sourcePort === newEdge.targetPort &&
          e.targetNodeId === newEdge.sourceNodeId &&
          e.targetPort === newEdge.sourcePort)
    );

    if (exists) {
      toast.error('Koneksi antar port ini sudah ada!');
      return;
    }

    setTopology((prev) => ({
      ...prev,
      edges: [...prev.edges, newEdge],
    }));

    toast.success(`Kabel ${newEdge.linkType.toUpperCase()} berhasil disambungkan`);
  };

  const handleDisconnectEdge = (edgeId: string) => {
    setTopology((prev) => ({
      ...prev,
      edges: prev.edges.filter((e) => e.id !== edgeId),
    }));
    if (selectedEdgeId === edgeId) setSelectedEdgeId(null);
    toast.success('Koneksi kabel telah diputus');
  };

  // -------------------------------------------------------------
  // Auto-Layout / Hierarchical Arranger
  // -------------------------------------------------------------
  const handleAutoAlign = () => {
    // Hierarchical layering:
    // Level 0: Firewall & Router Core (y ~ 60)
    // Level 1: Core Switch & Servers (y ~ 300)
    // Level 2: Distribution Switches (y ~ 540)
    // Level 3: Access Points, NVRs, Cameras, PCs (y ~ 780)

    const routers = topology.nodes.filter((n) => n.type === 'router' || n.type === 'firewall');
    const switches = topology.nodes.filter((n) => n.type === 'switch');
    const servers = topology.nodes.filter((n) => n.type === 'server');
    const edgesDevs = topology.nodes.filter(
      (n) => n.type === 'ap' || n.type === 'nvr' || n.type === 'cctv' || n.type === 'pc'
    );

    const updatedNodes = topology.nodes.map((node) => {
      let x = node.x;
      let y = node.y;

      if (routers.some((r) => r.id === node.id)) {
        const idx = routers.findIndex((r) => r.id === node.id);
        x = 400 + idx * 280;
        y = 60;
      } else if (switches.some((s) => s.id === node.id)) {
        const idx = switches.findIndex((s) => s.id === node.id);
        x = 280 + idx * 300;
        y = 300;
      } else if (servers.some((s) => s.id === node.id)) {
        const idx = servers.findIndex((s) => s.id === node.id);
        x = 80 + idx * 240;
        y = 300;
      } else if (edgesDevs.some((e) => e.id === node.id)) {
        const idx = edgesDevs.findIndex((e) => e.id === node.id);
        x = 120 + idx * 220;
        y = 560 + (idx % 2 === 0 ? 0 : 160);
      }

      return { ...node, x, y };
    });

    setTopology((prev) => ({ ...prev, nodes: updatedNodes }));
    toast.success('Topologi telah dirapikan secara hierarkis');
  };

  // -------------------------------------------------------------
  // Save to Database
  // -------------------------------------------------------------
  const handleSaveToDatabase = async () => {
    setIsSaving(true);
    try {
      const res = await fetch('/api/network/topology', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: topology.id,
          name: topology.name,
          description: topology.description,
          isDefault: true,
          nodes: topology.nodes,
          edges: topology.edges,
          viewport: { zoom, panX: pan.x, panY: pan.y },
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Gagal menyimpan');

      setTopology((prev) => ({ ...prev, id: data.id }));
      toast.success('Peta topologi jaringan berhasil disimpan ke database!');
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || 'Gagal menyimpan topologi');
    } finally {
      setIsSaving(false);
    }
  };

  // -------------------------------------------------------------
  // Export as Image (Canvas to DataURL)
  // -------------------------------------------------------------
  const handleExportJson = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(topology, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `topologi-rsud-ntb-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success('File konfigurasi JSON topologi berhasil diunduh');
  };

  // Helpers
  const getNodeById = useCallback((id: string) => topology.nodes.find((n) => n.id === id), [topology.nodes]);

  const selectedNode = useMemo(() => getNodeById(selectedNodeId || ''), [selectedNodeId, getNodeById]);
  const selectedEdge = useMemo(
    () => topology.edges.find((e) => e.id === selectedEdgeId),
    [selectedEdgeId, topology.edges]
  );

  const getDeviceIcon = (t: DeviceType) => {
    switch (t) {
      case 'router': return <FaRoute className="h-4 w-4 text-sky-400" />;
      case 'switch': return <FaNetworkWired className="h-4 w-4 text-emerald-400" />;
      case 'nvr': return <FaVideo className="h-4 w-4 text-amber-400" />;
      case 'ap': return <FaWifi className="h-4 w-4 text-purple-400" />;
      case 'server': return <FaServer className="h-4 w-4 text-indigo-400" />;
      case 'firewall': return <FaShieldAlt className="h-4 w-4 text-rose-400" />;
      case 'cctv': return <FaVideo className="h-4 w-4 text-teal-400" />;
      default: return <FaDesktop className="h-4 w-4 text-blue-400" />;
    }
  };

  const getLinkColor = (linkType: string) => {
    switch (linkType) {
      case 'fiber': return '#38bdf8'; // Cyan 10G
      case 'copper': return '#10b981'; // Emerald 1G
      case 'poe': return '#f59e0b'; // Amber PoE
      case 'trunk': return '#8b5cf6'; // Purple Trunk
      case 'wireless': return '#60a5fa'; // Blue
      default: return '#94a3b8';
    }
  };

  // Card dimensions for port center calculating
  const NODE_WIDTH = 220;
  const NODE_HEIGHT = 100;

  return (
    <div className="flex flex-col h-[calc(100vh-13rem)] min-h-[620px] w-full relative overflow-hidden bg-base-100 rounded-2xl border border-primary/10 shadow-2xl">
      {/* 1. TOP UNIFIED TOOLBAR */}
      <div className="min-h-14 py-2 px-4 border-b border-primary/10 bg-base-100/90 backdrop-blur-xl flex flex-wrap xl:flex-nowrap items-center justify-between gap-3 z-30 select-none">
        {/* Left: Info Title & Topology Name */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-linear-to-br from-primary to-secondary flex items-center justify-center text-white shadow-sm shrink-0">
            <FaNetworkWired className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-bold text-base-content tracking-tight flex items-center gap-2">
              <span>{topology.name}</span>
              <span className="badge badge-xs badge-primary font-mono text-[9px]">LIVE MAP</span>
            </h1>
            <p className="text-[10px] text-base-content/70 font-mono">
              {topology.nodes.length} Perangkat Terdaftar · {topology.edges.length} Koneksi Port
            </p>
          </div>
        </div>

        {/* Center: Device Type Filter Badges */}
        <div className="hidden lg:flex items-center gap-1 bg-base-200/70 p-1 rounded-xl border border-base-300 text-xs shrink-0">
          {['all', 'router', 'switch', 'nvr', 'ap', 'server', 'cctv'].map((ft) => (
            <button
              key={ft}
              onClick={() => setFilterType(ft)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                filterType === ft
                  ? 'bg-primary text-primary-content font-bold shadow-xs'
                  : 'text-base-content/70 hover:text-base-content hover:bg-base-300/50'
              }`}
            >
              {ft === 'all' ? 'Semua' : ft.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Right: Action Buttons */}
        <div className="flex items-center gap-1.5 flex-wrap shrink-0">
          {/* Zoom Controls */}
          <div className="join bg-base-200/70 border border-base-300 rounded-xl overflow-hidden hidden sm:flex">
            <button
              onClick={() => setZoom((z) => Math.max(z - 0.15, 0.3))}
              className="btn btn-xs join-item btn-ghost text-base-content/70 hover:text-base-content"
              title="Perkecil Tampilan"
            >
              <FaSearchMinus />
            </button>
            <span className="px-2 text-[11px] font-mono flex items-center text-base-content/80 font-semibold">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={() => setZoom((z) => Math.min(z + 0.15, 2.5))}
              className="btn btn-xs join-item btn-ghost text-base-content/70 hover:text-base-content"
              title="Perbesar Tampilan"
            >
              <FaSearchPlus />
            </button>
            <button
              onClick={() => {
                setZoom(0.9);
                setPan({ x: 40, y: 30 });
              }}
              className="btn btn-xs join-item btn-ghost text-base-content/70 hover:text-base-content"
              title="Kembalikan Tampilan (Fit View)"
            >
              <FaCompress />
            </button>
          </div>

          {/* Auto Align */}
          <button
            onClick={handleAutoAlign}
            className="btn btn-xs btn-outline border-base-300 text-base-content/80 hover:text-base-content hover:bg-base-200 gap-1"
            title="Rapikan posisi perangkat secara hierarkis"
          >
            <FaMagic className="text-amber-400" />
            <span className="hidden md:inline">Rapikan</span>
          </button>

          {/* Sync Switch Devices from DB */}
          <button
            onClick={() => setIsSyncModalOpen(true)}
            className={`btn btn-xs gap-1.5 transition-all ${
              syncBadgeCount > 0
                ? 'btn-warning shadow-[0_0_12px_rgba(245,158,11,0.3)] animate-pulse'
                : 'btn-outline border-primary/40 text-primary hover:bg-primary/10'
            }`}
            title="Sinkronkan perangkat fisik dari modul Switch & VLAN Discovery"
          >
            <FaSyncAlt className="h-2.5 w-2.5" />
            <span className="hidden md:inline">Sinkron Switch</span>
            {syncBadgeCount > 0 && (
              <span className="badge badge-xs badge-neutral font-bold text-[9px] px-1">
                {syncBadgeCount}
              </span>
            )}
          </button>

          {/* Import Registered Devices */}
          <button
            onClick={() => setIsImportModalOpen(true)}
            className="btn btn-xs btn-outline border-primary/30 text-primary hover:bg-primary/10 gap-1"
            title="Import switch atau router dari database"
          >
            <FaDownload />
            <span className="hidden md:inline">Import Switch</span>
          </button>

          {/* Connect Cable */}
          <button
            onClick={() => {
              setPreselectedSource(null);
              setIsConnectModalOpen(true);
            }}
            className="btn btn-xs btn-outline border-emerald-500/40 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 gap-1"
          >
            <FaLink />
            <span className="hidden md:inline">Hubungkan Port</span>
          </button>

          {/* Add Device */}
          <button
            onClick={() => {
              setEditingDevice(null);
              setIsDeviceModalOpen(true);
            }}
            className="btn btn-xs btn-primary gap-1 shadow-[0_0_10px_rgba(56,189,248,0.25)]"
          >
            <FaPlus />
            <span>Tambah Perangkat</span>
          </button>

          {/* Save Button */}
          <button
            onClick={handleSaveToDatabase}
            disabled={isSaving}
            className="btn btn-xs btn-secondary gap-1 font-bold shadow-[0_0_12px_rgba(37,99,235,0.3)]"
          >
            <FaSave />
            <span>{isSaving ? 'Menyimpan...' : 'Simpan'}</span>
          </button>

          {/* Export JSON / Backup */}
          <button
            onClick={handleExportJson}
            className="btn btn-xs btn-ghost text-base-content/70 hover:text-base-content"
            title="Unduh file konfigurasi JSON"
          >
            <FaCamera />
          </button>
        </div>
      </div>

      {/* 2. MAIN INTERACTIVE SVG / HTML CANVAS */}
      <div
        ref={canvasRef}
        onWheel={handleWheel}
        onMouseDown={handleMouseDownCanvas}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        className="flex-1 relative cursor-grab active:cursor-grabbing overflow-hidden select-none"
        style={{
          backgroundColor: 'var(--topo-canvas-bg)',
          backgroundImage: `radial-gradient(var(--topo-grid-color) 1.5px, transparent 1.5px)`,
          backgroundSize: `${28 * zoom}px ${28 * zoom}px`,
          backgroundPosition: `${pan.x}px ${pan.y}px`,
        }}
      >
        {/* SVG Cable Layers */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          style={{ width: '100%', height: '100%' }}
        >
          <g transform={`translate(${pan.x}, ${pan.y}) scale(${zoom})`}>
            <defs>
              <filter id="glow-fiber" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#38bdf8" floodOpacity="0.8" />
              </filter>
              <filter id="glow-copper" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#10b981" floodOpacity="0.7" />
              </filter>
            </defs>

            {topology.edges.map((edge) => {
              const srcNode = getNodeById(edge.sourceNodeId);
              const tgtNode = getNodeById(edge.targetNodeId);
              if (!srcNode || !tgtNode) return null;

              // Check filter: if either node is filtered out, skip
              if (
                filterType !== 'all' &&
                srcNode.type !== filterType &&
                tgtNode.type !== filterType
              ) {
                return null;
              }

              const x1 = srcNode.x + NODE_WIDTH / 2;
              const y1 = srcNode.y + NODE_HEIGHT / 2;
              const x2 = tgtNode.x + NODE_WIDTH / 2;
              const y2 = tgtNode.y + NODE_HEIGHT / 2;

              // Smooth Bézier curve calculation
              const dx = x2 - x1;
              const dy = y2 - y1;
              const dist = Math.hypot(dx, dy);
              const cx1 = x1 + dx * 0.1;
              const cy1 = y1 + dy * 0.5;
              const cx2 = x2 - dx * 0.1;
              const cy2 = y2 - dy * 0.5;

              const midX = (x1 + x2) / 2;
              const midY = (y1 + y2) / 2;

              const strokeColor = getLinkColor(edge.linkType);
              const isSelected = selectedEdgeId === edge.id;

              // Distance-aware badge placement:
              // If distance >= 220px, show dedicated end port badges near devices.
              // If distance < 220px, suppress end badges to prevent badge overlap and show combined ports in center badge.
              const showEndBadges = dist >= 220;

              return (
                <g key={edge.id} className="pointer-events-auto">
                  {/* Invisible thicker path for easier click */}
                  <path
                    d={`M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`}
                    fill="none"
                    stroke="transparent"
                    strokeWidth="20"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEdgeId(edge.id);
                      setSelectedNodeId(null);
                    }}
                  />

                  {/* Visual Rendered Cable */}
                  <path
                    d={`M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={isSelected ? 4 : edge.linkType === 'fiber' ? 3 : 2.5}
                    strokeDasharray={edge.status === 'down' ? '6 4' : undefined}
                    filter={edge.linkType === 'fiber' ? 'url(#glow-fiber)' : undefined}
                    className="transition-all duration-150"
                  />

                  {/* Port Label Source Badge - only when distance is safe */}
                  {showEndBadges && (
                    <g transform={`translate(${x1 + dx * 0.14}, ${y1 + dy * 0.14})`}>
                      <rect
                        x="-32"
                        y="-9"
                        width="64"
                        height="18"
                        rx="4"
                        fill="var(--topo-cable-bg)"
                        stroke={strokeColor}
                        strokeWidth="1"
                        opacity="0.95"
                      />
                      <text
                        x="0"
                        y="3.5"
                        textAnchor="middle"
                        fill="var(--topo-cable-text)"
                        fontSize="8.5"
                        fontFamily="monospace"
                        fontWeight="600"
                      >
                        {edge.sourcePort.split(' ')[0]}
                      </text>
                    </g>
                  )}

                  {/* Port Label Target Badge - only when distance is safe */}
                  {showEndBadges && (
                    <g transform={`translate(${x2 - dx * 0.14}, ${y2 - dy * 0.14})`}>
                      <rect
                        x="-32"
                        y="-9"
                        width="64"
                        height="18"
                        rx="4"
                        fill="var(--topo-cable-bg)"
                        stroke={strokeColor}
                        strokeWidth="1"
                        opacity="0.95"
                      />
                      <text
                        x="0"
                        y="3.5"
                        textAnchor="middle"
                        fill="var(--topo-cable-text)"
                        fontSize="8.5"
                        fontFamily="monospace"
                        fontWeight="600"
                      >
                        {edge.targetPort.split(' ')[0]}
                      </text>
                    </g>
                  )}

                  {/* Center Cable Info Badge */}
                  <g
                    transform={`translate(${midX}, ${midY})`}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEdgeId(edge.id);
                    }}
                  >
                    <rect
                      x={showEndBadges ? "-55" : "-70"}
                      y={showEndBadges ? "-12" : "-14"}
                      width={showEndBadges ? "110" : "140"}
                      height={showEndBadges ? "24" : "28"}
                      rx="6"
                      fill="var(--topo-cable-bg)"
                      stroke={isSelected ? '#38bdf8' : strokeColor}
                      strokeWidth={isSelected ? '2' : '1'}
                      opacity="0.96"
                    />
                    {showEndBadges ? (
                      <text
                        x="0"
                        y="4"
                        textAnchor="middle"
                        fill={isSelected ? '#38bdf8' : 'var(--topo-cable-text)'}
                        fontSize="10"
                        fontFamily="monospace"
                        fontWeight="bold"
                      >
                        {edge.speed} {edge.vlan ? `· ${edge.vlan.split(' ')[0]}` : ''}
                      </text>
                    ) : (
                      <>
                        <text
                          x="0"
                          y="-2"
                          textAnchor="middle"
                          fill="var(--topo-cable-text)"
                          fontSize="9"
                          fontFamily="monospace"
                          fontWeight="bold"
                        >
                          {edge.sourcePort.split(' ')[0]} ⇄ {edge.targetPort.split(' ')[0]}
                        </text>
                        <text
                          x="0"
                          y="8"
                          textAnchor="middle"
                          fill="#38bdf8"
                          fontSize="8"
                          fontFamily="monospace"
                        >
                          {edge.speed} {edge.vlan ? `· ${edge.vlan.split(' ')[0]}` : ''}
                        </text>
                      </>
                    )}
                  </g>
                </g>
              );
            })}
          </g>
        </svg>

        {/* Nodes Layer (DOM elements for crisp text and full interactivity) */}
        <div
          className="absolute inset-0 origin-top-left pointer-events-none"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          {topology.nodes.map((node) => {
            const isSelected = selectedNodeId === node.id;
            const isFiltered = filterType !== 'all' && node.type !== filterType;

            // Hitung berapa port yang terhubung
            const connectedPortsCount = topology.edges.filter(
              (e) => e.sourceNodeId === node.id || e.targetNodeId === node.id
            ).length;

            return (
              <div
                key={node.id}
                onMouseDown={(e) => startDragNode(e, node)}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedNodeId(node.id);
                  setSelectedEdgeId(null);
                }}
                className={`absolute pointer-events-auto rounded-2xl border transition-shadow select-none group ${
                  isFiltered ? 'opacity-30' : 'opacity-100'
                } ${
                  isSelected
                    ? 'border-primary ring-2 ring-primary/40 bg-base-100/95 shadow-[0_0_24px_rgba(56,189,248,0.4)] z-30'
                    : 'border-base-300/80 bg-base-100/90 hover:border-primary/50 shadow-lg hover:shadow-2xl z-20'
                }`}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  width: `${NODE_WIDTH}px`,
                  backdropFilter: 'blur(12px)',
                }}
              >
                {/* Node Header */}
                <div className="p-3 border-b border-base-300/60 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="p-1.5 rounded-lg bg-base-200/80 border border-base-300 shadow-xs shrink-0">
                      {getDeviceIcon(node.type)}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h4 className="text-xs font-bold font-mono text-base-content truncate group-hover:text-primary transition-colors">
                          {node.name}
                        </h4>
                        {node.type === 'switch' && (node.isSnmpSynced || node.switchDeviceId) && (
                          <span
                            className="badge badge-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-[8px] px-1 shrink-0"
                            title="Tersinkron dengan SNMP Switch VLAN"
                          >
                            SNMP
                          </span>
                        )}
                      </div>
                      <p className="text-[10px] text-base-content/60 font-mono truncate">
                        {node.ip || 'No IP'}
                      </p>
                    </div>
                  </div>

                  {/* Status Indicator Dot */}
                  <span
                    className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                      node.status === 'online'
                        ? 'bg-emerald-400 shadow-[0_0_8px_#10b981]'
                        : node.status === 'warning'
                        ? 'bg-amber-400 shadow-[0_0_8px_#f59e0b]'
                        : 'bg-rose-500 shadow-[0_0_8px_#ef4444]'
                    }`}
                    title={`Status: ${node.status.toUpperCase()}`}
                  ></span>
                </div>

                {/* Node Body Telemetry */}
                <div className="p-2.5 space-y-1.5 text-[10px]">
                  <div className="flex items-center justify-between text-base-content/60 font-mono">
                    <span>Model:</span>
                    <span className="text-base-content/90 truncate max-w-[120px]">
                      {node.model || node.brand || '-'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-base-content/60 font-mono">
                    <span>Lokasi:</span>
                    <span className="text-base-content/80 truncate max-w-[120px]">
                      {node.location || 'RSUD NTB'}
                    </span>
                  </div>

                  {/* If Switch has VLANs, show count */}
                  {node.type === 'switch' && node.vlans && node.vlans.length > 0 && (
                    <div className="flex items-center justify-between text-base-content/70 font-mono">
                      <span>VLAN:</span>
                      <span className="badge badge-xs badge-info font-bold text-[9px]">
                        {node.vlans.length} VLANs
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-base-300/40 font-mono">
                    <span className="text-[9px] uppercase tracking-wider text-base-content/70">
                      {node.type === 'switch' && node.isSnmpSynced ? 'Port Riil' : 'Port Aktif'}
                    </span>
                    <span className="badge badge-xs badge-neutral font-bold text-emerald-600 dark:text-emerald-400">
                      {connectedPortsCount} kabel / {node.ports?.length || 0}
                    </span>
                  </div>
                </div>

                {/* Quick Action Ribbon on Hover / Selection */}
                <div className="px-2 pb-2 pt-1 flex items-center justify-between gap-1 border-t border-base-300/40 bg-base-200/40 rounded-b-2xl">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setPreselectedSource({ nodeId: node.id });
                      setIsConnectModalOpen(true);
                    }}
                    className="btn btn-xs btn-ghost text-primary text-[10px] p-1 h-6 flex-1 gap-1"
                    title="Sambung kabel dari perangkat ini"
                  >
                    <FaLink className="h-2.5 w-2.5" /> Link
                  </button>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingDevice(node);
                      setIsDeviceModalOpen(true);
                    }}
                    className="btn btn-xs btn-ghost text-base-content/70 hover:text-base-content text-[10px] p-1 h-6 flex-1"
                    title="Edit spesifikasi perangkat"
                  >
                    Edit
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Edge Quick Action Floating Card */}
        {selectedEdge && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 bg-base-100/95 backdrop-blur-xl border border-primary/30 p-3.5 rounded-2xl shadow-2xl flex flex-wrap sm:flex-nowrap items-center justify-between gap-3 text-xs font-mono animate-slideUp max-w-[92vw]">
            <div className="min-w-0">
              <span className="text-base-content/60 text-[10px] block uppercase font-bold">Kabel Terpilih</span>
              <p className="text-base-content font-bold truncate max-w-sm sm:max-w-md">
                {getNodeById(selectedEdge.sourceNodeId)?.name} ({selectedEdge.sourcePort}) ↔{' '}
                {getNodeById(selectedEdge.targetNodeId)?.name} ({selectedEdge.targetPort})
              </p>
              <p className="text-[11px] text-primary truncate font-semibold">
                {selectedEdge.speed} · {selectedEdge.linkType.toUpperCase()}{' '}
                {selectedEdge.vlan ? `· ${selectedEdge.vlan}` : ''}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={() => handleDisconnectEdge(selectedEdge.id)}
                className="btn btn-xs btn-error btn-outline gap-1 font-sans"
              >
                <FaTrash className="h-3 w-3" /> Putuskan
              </button>
              <button
                onClick={() => setSelectedEdgeId(null)}
                className="btn btn-xs btn-ghost text-base-content/70"
              >
                Tutup
              </button>
            </div>
          </div>
        )}

        {/* 3. DEVICE DETAILS DRAWER (When a device is selected) */}
        <DeviceDetailsDrawer
          device={selectedNode}
          edges={topology.edges}
          allDevices={topology.nodes}
          onClose={() => setSelectedNodeId(null)}
          onEdit={(dev) => {
            setEditingDevice(dev);
            setIsDeviceModalOpen(true);
          }}
          onDelete={handleDeleteDevice}
          onConnectPort={(deviceId, portName) => {
            setPreselectedSource({ nodeId: deviceId, port: portName });
            setIsConnectModalOpen(true);
          }}
          onDisconnectEdge={handleDisconnectEdge}
        />

        {/* Mini Legend on Bottom Left */}
        <div className="absolute bottom-4 left-4 z-20 bg-base-100/90 backdrop-blur-md border border-base-300 p-2.5 rounded-xl shadow-xl text-[10px] font-mono space-y-1.5 pointer-events-none hidden sm:block">
          <p className="font-bold text-base-content/70 uppercase tracking-wider text-[9px] mb-1">Keterangan Kabel:</p>
          <div className="flex items-center gap-2">
            <span className="h-2 w-5 rounded-full bg-sky-400 shadow-[0_0_6px_#38bdf8]"></span>
            <span className="text-base-content font-medium">Fiber Optic SFP+ (10G)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-5 rounded-full bg-emerald-400 shadow-[0_0_6px_#10b981]"></span>
            <span className="text-base-content font-medium">UTP Cat6 Gigabit (1G)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-5 rounded-full bg-amber-400"></span>
            <span className="text-base-content font-medium">PoE (NVR CCTV / Access Point)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-5 rounded-full bg-purple-400"></span>
            <span className="text-base-content font-medium">VLAN Trunk 802.1Q</span>
          </div>
        </div>
      </div>

      {/* 4. MODALS */}
      <DeviceModal
        isOpen={isDeviceModalOpen}
        onClose={() => {
          setIsDeviceModalOpen(false);
          setEditingDevice(null);
        }}
        onSave={handleSaveDevice}
        initialDevice={editingDevice}
      />

      <ConnectPortModal
        isOpen={isConnectModalOpen}
        onClose={() => {
          setIsConnectModalOpen(false);
          setPreselectedSource(null);
        }}
        devices={topology.nodes}
        onConnect={handleAddEdge}
        preselectedSourceNodeId={preselectedSource?.nodeId}
        preselectedSourcePort={preselectedSource?.port}
      />

      <ImportDeviceModal
        isOpen={isImportModalOpen}
        onClose={() => setIsImportModalOpen(false)}
        onImport={(node) => {
          setTopology((prev) => ({
            ...prev,
            nodes: [...prev.nodes, node],
          }));
          setSelectedNodeId(node.id);
          toast.success(`Perangkat "${node.name}" berhasil diimport ke diagram topologi`);
        }}
        existingNodeNames={topology.nodes.map((n) => n.name)}
      />

      <SwitchSyncModal
        isOpen={isSyncModalOpen}
        onClose={() => setIsSyncModalOpen(false)}
        onSyncComplete={(newTopology) => {
          setTopology(newTopology);
          setSyncBadgeCount(0);
          toast.success('Kanvas topologi berhasil disinkronkan dengan Switch & VLAN!');
        }}
      />
    </div>
  );
}
