'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { FaSearch, FaSync, FaShieldAlt, FaUserShield, FaClock } from 'react-icons/fa';

export default function AuditLogPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [logs, setLogs] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const [filters, setFilters] = useState({
    admin: '',
    action: '',
    q: '',
    from: '',
    to: '',
  });

  const [admins, setAdmins] = useState<any[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated' || (status === 'authenticated' && session?.user?.role !== 'superadmin')) {
      router.push('/');
    }
  }, [status, session, router]);

  const fetchAdmins = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/manage');
      if (res.ok) {
        const data = await res.json();
        // API /api/admin/manage returns an array directly: [{ id, username, role }]
        setAdmins(Array.isArray(data) ? data : data.admins || []);
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  }, []);

  const fetchLogs = useCallback(async (page = 1) => {
    try {
      setIsLoading(true);
      const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: '20',
        ...(filters.admin && { admin: filters.admin }),
        ...(filters.action && { action: filters.action }),
        ...(filters.q && { q: filters.q }),
        ...(filters.from && { from: filters.from }),
        ...(filters.to && { to: filters.to }),
      });

      const res = await fetch(`/api/audit-log?${queryParams}`);
      if (!res.ok) throw new Error('Failed to fetch data');
      
      const data = await res.json();
      setLogs(data.logs || []);
      setTotal(data.total || 0);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);
    } catch (error) {
      toast.error('Gagal mengambil data audit log');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'superadmin') {
      fetchAdmins();
      fetchLogs(currentPage);
      const interval = setInterval(() => {
        fetchLogs(currentPage);
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [status, session, fetchAdmins, fetchLogs, currentPage]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const getActionBadgeClass = (action: string) => {
    if (action.startsWith('CREATE_')) return 'badge-success text-success-content font-semibold';
    if (action.startsWith('DELETE_') || action.startsWith('DISCONNECT_') || action.startsWith('CLEAR_') || action.startsWith('BATCH_DELETE_')) {
      return 'badge-error text-error-content font-semibold';
    }
    if (action.startsWith('UPDATE_') || action.startsWith('BATCH_STATUS_')) {
      return 'badge-warning text-warning-content font-semibold';
    }
    return 'badge-info text-info-content font-semibold';
  };

  const renderDetails = (detailsRaw: any) => {
    if (!detailsRaw) return <span className="text-base-content/40">-</span>;
    let parsed = detailsRaw;
    if (typeof detailsRaw === 'string') {
      try {
        parsed = JSON.parse(detailsRaw);
      } catch {
        parsed = detailsRaw;
      }
    }
    if (typeof parsed === 'object' && parsed !== null) {
      const entries = Object.entries(parsed);
      return (
        <div className="text-xs space-y-0.5 font-mono max-w-xs overflow-hidden">
          {entries.slice(0, 3).map(([k, v]) => (
            <div key={k} className="truncate">
              <span className="text-base-content/60">{k}:</span>{' '}
              <span className="text-base-content font-medium">
                {typeof v === 'object' ? JSON.stringify(v) : String(v)}
              </span>
            </div>
          ))}
          {entries.length > 3 && (
            <span className="text-[10px] text-primary block">+{entries.length - 3} data lainnya</span>
          )}
        </div>
      );
    }
    return <span className="text-xs font-mono text-base-content/80 truncate block max-w-xs">{String(parsed)}</span>;
  };

  if (status === 'loading' || (status === 'authenticated' && session?.user?.role !== 'superadmin')) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="p-2 rounded-lg bg-primary/10 text-primary border border-primary/20">
              <FaShieldAlt className="h-5 w-5" />
            </span>
            <h1 className="text-2xl font-bold tracking-tight text-base-content flex items-center gap-2">
              Audit Log
              <span className="badge badge-primary font-mono text-xs">{total} Log</span>
            </h1>
          </div>
          <p className="text-xs text-base-content/70 mt-1">
            Riwayat aktivitas dan jejak audit administrator pada sistem BeeRadius RSUD NTB
          </p>
        </div>
        <button
          className="btn btn-sm btn-ghost border border-base-300 gap-1.5"
          onClick={() => fetchLogs(currentPage)}
          title="Refresh Data"
        >
          <FaSync className={isLoading ? "animate-spin text-primary" : ""} /> Refresh
        </button>
      </div>

      {/* Filter Card */}
      <div className="card bg-base-100 shadow-sm border border-base-300">
        <div className="card-body p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {/* Filter Admin */}
            <div className="form-control">
              <label className="label py-1"><span className="label-text text-xs font-semibold text-base-content/80">Admin</span></label>
              <select
                name="admin"
                className="select select-bordered select-sm w-full text-xs bg-base-100 border-base-300"
                value={filters.admin}
                onChange={handleFilterChange}
              >
                <option value="">Semua Admin</option>
                {admins.map((a) => (
                  <option key={a.id} value={a.username}>
                    {a.username} ({a.role})
                  </option>
                ))}
              </select>
            </div>
            
            {/* Filter Aksi */}
            <div className="form-control">
              <label className="label py-1"><span className="label-text text-xs font-semibold text-base-content/80">Aksi</span></label>
              <select
                name="action"
                className="select select-bordered select-sm w-full text-xs bg-base-100 border-base-300"
                value={filters.action}
                onChange={handleFilterChange}
              >
                <option value="">Semua Aksi</option>
                <optgroup label="Pengguna RADIUS">
                  <option value="CREATE_USER">CREATE_USER</option>
                  <option value="UPDATE_USER">UPDATE_USER</option>
                  <option value="DELETE_USER">DELETE_USER</option>
                  <option value="BATCH_DELETE_USERS">BATCH_DELETE_USERS</option>
                  <option value="BATCH_STATUS_USERS">BATCH_STATUS_USERS</option>
                </optgroup>
                <optgroup label="Sesi & Online">
                  <option value="DISCONNECT_USER">DISCONNECT_USER</option>
                  <option value="CLEAR_STALE_SESSIONS">CLEAR_STALE_SESSIONS</option>
                </optgroup>
                <optgroup label="Grup & Profil">
                  <option value="CREATE_GROUP">CREATE_GROUP</option>
                  <option value="UPDATE_GROUP">UPDATE_GROUP</option>
                  <option value="DELETE_GROUP">DELETE_GROUP</option>
                </optgroup>
                <optgroup label="Perangkat Jaringan (Switch, Router, NVR)">
                  <option value="CREATE_SWITCH">CREATE_SWITCH</option>
                  <option value="UPDATE_SWITCH">UPDATE_SWITCH</option>
                  <option value="DELETE_SWITCH">DELETE_SWITCH</option>
                </optgroup>
                <optgroup label="NAS Gateway & IP Pool">
                  <option value="CREATE_NAS">CREATE_NAS</option>
                  <option value="UPDATE_NAS">UPDATE_NAS</option>
                  <option value="DELETE_NAS">DELETE_NAS</option>
                  <option value="CREATE_POOL">CREATE_POOL</option>
                  <option value="UPDATE_POOL">UPDATE_POOL</option>
                  <option value="DELETE_POOL">DELETE_POOL</option>
                  <option value="MANAGE_POOL_IPS">MANAGE_POOL_IPS</option>
                </optgroup>
                <optgroup label="VPN & WiFi">
                  <option value="CREATE_WG_PEER">CREATE_WG_PEER</option>
                  <option value="UPDATE_WG_PEER">UPDATE_WG_PEER</option>
                  <option value="DELETE_WG_PEER">DELETE_WG_PEER</option>
                  <option value="CREATE_WIFI">CREATE_WIFI</option>
                  <option value="UPDATE_WIFI">UPDATE_WIFI</option>
                  <option value="DELETE_WIFI">DELETE_WIFI</option>
                </optgroup>
                <optgroup label="Administrator">
                  <option value="CREATE_ADMIN">CREATE_ADMIN</option>
                  <option value="UPDATE_ADMIN">UPDATE_ADMIN</option>
                  <option value="DELETE_ADMIN">DELETE_ADMIN</option>
                </optgroup>
              </select>
            </div>

            {/* Dari Tanggal */}
            <div className="form-control">
              <label className="label py-1"><span className="label-text text-xs font-semibold text-base-content/80">Dari Tanggal</span></label>
              <input
                type="date"
                name="from"
                className="input input-bordered input-sm w-full text-xs bg-base-100 border-base-300"
                value={filters.from}
                onChange={handleFilterChange}
              />
            </div>

            {/* Sampai Tanggal */}
            <div className="form-control">
              <label className="label py-1"><span className="label-text text-xs font-semibold text-base-content/80">Sampai Tanggal</span></label>
              <input
                type="date"
                name="to"
                className="input input-bordered input-sm w-full text-xs bg-base-100 border-base-300"
                value={filters.to}
                onChange={handleFilterChange}
              />
            </div>

            {/* Cari Target */}
            <div className="form-control">
              <label className="label py-1"><span className="label-text text-xs font-semibold text-base-content/80">Cari Target</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-base-content/40 h-3 w-3" />
                </div>
                <input
                  type="text"
                  name="q"
                  placeholder="Nama target/IP..."
                  className="input input-bordered input-sm w-full pl-8 text-xs bg-base-100 border-base-300"
                  value={filters.q}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Table Card */}
      <div className="card bg-base-100 shadow-sm border border-base-300 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-sm w-full">
            <thead className="bg-base-200/60 text-xs font-mono uppercase tracking-wider text-base-content/70 border-b border-base-300">
              <tr>
                <th className="py-3">Waktu</th>
                <th className="py-3">Admin</th>
                <th className="py-3">Aksi</th>
                <th className="py-3">Target</th>
                <th className="py-3">Detail Aksi</th>
                <th className="py-3">IP Address</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-base-300">
              {isLoading && logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12">
                    <span className="loading loading-spinner text-primary loading-md"></span>
                    <p className="text-xs text-base-content/60 mt-2">Memuat audit log...</p>
                  </td>
                </tr>
              ) : logs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-base-content/60">
                    <FaUserShield className="h-8 w-8 text-base-content/30 mx-auto mb-2" />
                    <p className="font-semibold text-sm">Tidak ada log aktivitas ditemukan</p>
                    <p className="text-xs text-base-content/50 mt-1">Sesuaikan filter pencarian di atas untuk menemukan data.</p>
                  </td>
                </tr>
              ) : (
                logs.map((log) => {
                  const adminName = log.adminUser || log.admin?.username || 'system';
                  const isSystem = adminName.toLowerCase() === 'system';

                  return (
                    <tr key={log.id} className="hover:bg-base-200/40 transition-colors">
                      {/* Waktu */}
                      <td className="whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs text-base-content/80">
                          <FaClock className="h-3 w-3 text-base-content/40 shrink-0" />
                          <span className="font-mono">
                            {log.timestamp ? format(new Date(log.timestamp), 'dd MMM yyyy HH:mm:ss', { locale: id }) : '-'}
                          </span>
                        </div>
                      </td>

                      {/* Admin Name & Badge */}
                      <td>
                        <div className="flex items-center gap-2">
                          <div
                            className={`h-7 w-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs shrink-0 ${
                              isSystem
                                ? 'bg-base-300 text-base-content/60'
                                : 'bg-primary/10 text-primary border border-primary/20'
                            }`}
                          >
                            {adminName.charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <span className="font-semibold text-sm text-base-content block truncate">
                              {adminName}
                            </span>
                            {isSystem && (
                              <span className="text-[10px] text-base-content/50 font-mono">Automated / Job</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Aksi */}
                      <td>
                        <span className={`badge badge-sm font-mono text-[10px] ${getActionBadgeClass(log.action)}`}>
                          {log.action}
                        </span>
                      </td>

                      {/* Target */}
                      <td>
                        <div>
                          <span className="font-semibold text-sm text-base-content block">
                            {log.targetName || '-'}
                          </span>
                          <span className="badge badge-xs badge-outline border-base-300 text-base-content/60 font-mono text-[9px] uppercase mt-0.5">
                            {log.targetType || 'SYSTEM'}
                          </span>
                        </div>
                      </td>

                      {/* Detail */}
                      <td>
                        <div className="max-w-xs py-1">
                          {renderDetails(log.details)}
                        </div>
                      </td>

                      {/* IP Address */}
                      <td className="text-xs font-mono text-base-content/70">
                        {log.ipAddress || '-'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 bg-base-100 border-t border-base-300">
            <span className="text-xs text-base-content/70 font-mono">
              Halaman {currentPage} dari {totalPages} ({total} entri)
            </span>
            <div className="join">
              <button 
                className="join-item btn btn-xs btn-outline border-base-300" 
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                « Sebelumnya
              </button>
              <button className="join-item btn btn-xs btn-outline border-base-300 pointer-events-none">
                {currentPage}
              </button>
              <button 
                className="join-item btn btn-xs btn-outline border-base-300" 
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Selanjutnya »
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
