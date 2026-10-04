'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { FaDownload } from 'react-icons/fa';

interface ExportCSVProps {
  type?: string;
}

export default function ExportCSV({ type }: ExportCSVProps) {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const handleExport = () => {
    setLoading(true);

    const params = new URLSearchParams();

    const q = searchParams.get('q');
    if (q) params.set('q', q);

    const group = searchParams.get('group');
    if (group) params.set('group', group);

    const status = searchParams.get('status');
    if (status) params.set('status', status);

    const neverLoggedIn = searchParams.get('never_logged_in');
    if (neverLoggedIn) params.set('never_logged_in', neverLoggedIn);

    if (type) params.set('type', type);

    const url = `/api/radius/users/export-csv?${params.toString()}`;
    window.open(url, '_blank');

    // Reset loading after a short delay since we can't track the download
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <button
      onClick={handleExport}
      disabled={loading}
      className={`btn btn-outline btn-sm gap-2 ${loading ? 'loading' : ''}`}
    >
      {!loading && <FaDownload />}
      {loading ? 'Mengunduh...' : 'Export CSV'}
    </button>
  );
}
