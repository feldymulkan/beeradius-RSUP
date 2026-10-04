'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import toast from 'react-hot-toast';
import { FaSearch, FaFilter, FaSync } from 'react-icons/fa';

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
      router.push('/dashboard');
    }
  }, [status, session, router]);

  const fetchAdmins = async () => {
    try {
      const res = await fetch('/api/admin/manage');
      if (res.ok) {
        const data = await res.json();
        setAdmins(data.admins || []);
      }
    } catch (error) {
      console.error('Error fetching admins:', error);
    }
  };

  const fetchLogs = async (page = 1) => {
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
      setLogs(data.logs);
      setTotal(data.total);
      setTotalPages(data.totalPages);
      setCurrentPage(data.currentPage);
    } catch (error) {
      toast.error('Gagal mengambil data audit log');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.role === 'superadmin') {
      fetchAdmins();
      fetchLogs();
      const interval = setInterval(() => {
        fetchLogs(currentPage);
      }, 30000);
      return () => clearInterval(interval);
    }
  }, [status, session, filters, currentPage]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
    setCurrentPage(1);
  };

  const getActionBadgeColor = (action: string) => {
    if (action.startsWith('CREATE_')) return 'badge-success';
    if (action.startsWith('DELETE_') || action.startsWith('DISCONNECT_') || action.startsWith('CLEAR_')) return 'badge-error';
    if (action.startsWith('UPDATE_')) return 'badge-warning';
    return 'badge-info';
  };

  if (status === 'loading' || (status === 'authenticated' && session?.user?.role !== 'superadmin')) {
    return <div className="flex justify-center items-center h-64"><span className="loading loading-spinner loading-lg text-primary"></span></div>;
  }

  return (
    <div className="p-4 max-w-full">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Audit Log</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">Log aktivitas admin dalam sistem</p>
        </div>
        <button className="btn btn-sm btn-ghost" onClick={() => fetchLogs(currentPage)}>
          <FaSync className={isLoading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <div className="card bg-base-100 shadow-md mb-6 border border-base-200">
        <div className="card-body p-4">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div className="form-control">
              <label className="label py-1"><span className="label-text">Admin</span></label>
              <select name="admin" className="select select-bordered select-sm w-full" value={filters.admin} onChange={handleFilterChange}>
                <option value="">Semua Admin</option>
                {admins.map(a => (
                  <option key={a.id} value={a.id}>{a.username} ({a.nama})</option>
                ))}
              </select>
            </div>
            
            <div className="form-control">
              <label className="label py-1"><span className="label-text">Aksi</span></label>
              <select name="action" className="select select-bordered select-sm w-full" value={filters.action} onChange={handleFilterChange}>
                <option value="">Semua Aksi</option>
                <option value="CREATE_USER">Create User</option>
                <option value="UPDATE_USER">Update User</option>
                <option value="DELETE_USER">Delete User</option>
                <option value="LOGIN">Login</option>
                <option value="LOGOUT">Logout</option>
                {/* Add more as needed */}
              </select>
            </div>

            <div className="form-control">
              <label className="label py-1"><span className="label-text">Dari Tanggal</span></label>
              <input type="date" name="from" className="input input-bordered input-sm w-full" value={filters.from} onChange={handleFilterChange} />
            </div>

            <div className="form-control">
              <label className="label py-1"><span className="label-text">Sampai Tanggal</span></label>
              <input type="date" name="to" className="input input-bordered input-sm w-full" value={filters.to} onChange={handleFilterChange} />
            </div>

            <div className="form-control">
              <label className="label py-1"><span className="label-text">Cari Target</span></label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <input type="text" name="q" placeholder="Nama target..." className="input input-bordered input-sm w-full pl-10" value={filters.q} onChange={handleFilterChange} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-md border border-base-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-sm w-full">
            <thead className="bg-base-200">
              <tr>
                <th>Waktu</th>
                <th>Admin</th>
                <th>Aksi</th>
                <th>Target</th>
                <th>Detail</th>
                <th>IP Address</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && logs.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8"><span className="loading loading-spinner text-primary"></span></td></tr>
              ) : logs.length === 0 ? (
                <tr><td colSpan={6} className="text-center py-8 text-gray-500">Tidak ada log aktivitas ditemukan</td></tr>
              ) : (
                logs.map((log) => (
                  <tr key={log.id} className="hover">
                    <td className="whitespace-nowrap">
                      {log.timestamp ? format(new Date(log.timestamp), 'dd MMM yyyy HH:mm:ss', { locale: id }) : '-'}
                    </td>
                    <td>{log.admin?.username || '-'}</td>
                    <td>
                      <span className={`badge badge-sm ${getActionBadgeColor(log.action)}`}>
                        {log.action}
                      </span>
                    </td>
                    <td>
                      <div>
                        <span className="font-medium">{log.targetName}</span>
                        <br/>
                        <span className="text-xs text-gray-500">{log.targetType}</span>
                      </div>
                    </td>
                    <td>
                      <div className="max-w-xs truncate" title={log.details ? JSON.stringify(log.details) : ''}>
                        {log.details ? JSON.stringify(log.details).substring(0, 50) + (JSON.stringify(log.details).length > 50 ? '...' : '') : '-'}
                      </div>
                    </td>
                    <td className="text-sm font-mono">{log.ipAddress || '-'}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {totalPages > 1 && (
          <div className="flex justify-center p-4 bg-base-100 border-t border-base-200">
            <div className="join">
              <button 
                className="join-item btn btn-sm" 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                «
              </button>
              <button className="join-item btn btn-sm">Halaman {currentPage} dari {totalPages}</button>
              <button 
                className="join-item btn btn-sm" 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
