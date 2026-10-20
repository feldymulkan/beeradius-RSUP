export default function TableSkeleton() {
  const skeletonRows = Array.from({ length: 8 });

  return (
    <div className="space-y-6 animate-pulse">
      {/* Header bar skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="skeleton h-8 w-64 rounded-lg mb-2" />
          <div className="skeleton h-4 w-96 max-w-full rounded" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="skeleton h-9 w-32 rounded-lg" />
          <div className="skeleton h-9 w-28 rounded-lg" />
          <div className="skeleton h-9 w-28 rounded-lg" />
        </div>
      </div>

      {/* Single-Row Unified Toolbar skeleton */}
      <div className="card p-3 flex flex-col md:flex-row items-center gap-3 bg-base-100 border border-base-300">
        <div className="skeleton h-9 flex-1 w-full rounded-lg" />
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="skeleton h-9 w-36 rounded-lg" />
          <div className="skeleton h-9 w-32 rounded-lg" />
        </div>
      </div>

      {/* Table Card skeleton */}
      <div className="card bg-base-100 border border-base-300 shadow-md overflow-hidden">
        <div className="p-0">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="w-12">#</th>
                  <th>USERNAME</th>
                  <th>NAMA LENGKAP</th>
                  <th>GROUP</th>
                  <th>IP ADDRESS</th>
                  <th>STATUS</th>
                  <th>TERAKHIR LOGIN</th>
                  <th className="text-center w-28">AKSI</th>
                </tr>
              </thead>
              <tbody>
                {skeletonRows.map((_, index) => (
                  <tr key={index} className="border-b border-base-200">
                    <td><div className="skeleton h-4 w-4" /></td>
                    <td><div className="skeleton h-4 w-28 rounded font-mono" /></td>
                    <td><div className="skeleton h-4 w-36 rounded" /></td>
                    <td><div className="skeleton h-5 w-20 rounded-md" /></td>
                    <td><div className="skeleton h-4 w-24 rounded font-mono" /></td>
                    <td><div className="skeleton h-5 w-16 rounded-full" /></td>
                    <td><div className="skeleton h-4 w-24 rounded font-mono" /></td>
                    <td>
                      <div className="flex gap-1.5 justify-center">
                        <div className="skeleton h-6 w-14 rounded-md" />
                        <div className="skeleton h-6 w-8 rounded-md" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-3 bg-base-100/60 border-t border-base-300">
            <div className="skeleton h-4 w-44 rounded" />
            <div className="skeleton h-6 w-40 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}


export function EditFormSkeleton() {
  return (
    <div className="prose lg:prose-xl">
      {/* Skeleton Judul */}
      <div className="skeleton h-10 w-72"></div>

      <div className="not-prose">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            {/* Skeleton Tombol Kembali */}
            <div className="skeleton h-8 w-40"></div>

            <div className="space-y-4 mt-4">
              {/* Skeleton untuk 4 field input */}
              <div className="form-control w-full space-y-2">
                <div className="skeleton h-5 w-32"></div>
                <div className="skeleton h-12 w-full"></div>
              </div>
              <div className="form-control w-full space-y-2">
                <div className="skeleton h-5 w-32"></div>
                <div className="skeleton h-12 w-full"></div>
              </div>
              <div className="form-control w-full space-y-2">
                <div className="skeleton h-5 w-24"></div>
                <div className="skeleton h-12 w-full"></div>
              </div>
              <div className="form-control w-full space-y-2">
                <div className="skeleton h-5 w-48"></div>
                <div className="skeleton h-12 w-full"></div>
              </div>

              {/* Skeleton Tombol Simpan */}
              <div className="card-actions justify-end pt-4">
                <div className="skeleton h-12 w-44"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* 1. HEADER SECTION SKELETON */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="skeleton h-8 w-60 rounded-lg mb-2" />
          <div className="skeleton h-4 w-96 max-w-full rounded" />
        </div>
        <div className="flex items-center gap-3">
          <div className="skeleton h-8 w-28 rounded-lg" />
          <div className="flex gap-2">
            <div className="skeleton h-8 w-24 rounded-lg" />
            <div className="skeleton h-8 w-20 rounded-lg" />
          </div>
        </div>
      </div>

      {/* 2. 4 KPI METRIC CARDS SKELETON */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Sesi Online */}
        <div className="card relative overflow-hidden bg-base-100 border border-base-300">
          <div className="card-body p-5 gap-2">
            <div className="flex items-center justify-between">
              <div className="skeleton h-3 w-20 rounded" />
              <div className="skeleton h-3.5 w-12 rounded-full" />
            </div>
            <div className="skeleton h-10 w-24 rounded my-1" />
            <div className="flex items-center gap-3 pt-1">
              <div className="skeleton h-3.5 w-20 rounded" />
              <div className="skeleton h-3.5 w-16 rounded" />
            </div>
          </div>
        </div>

        {/* Card 2: Total Akun */}
        <div className="card relative overflow-hidden bg-base-100 border border-base-300">
          <div className="card-body p-5 gap-2">
            <div className="flex items-center justify-between">
              <div className="skeleton h-3 w-20 rounded" />
              <div className="skeleton h-4 w-4 rounded-full" />
            </div>
            <div className="skeleton h-10 w-24 rounded my-1" />
            <div className="flex items-center gap-2 pt-1">
              <div className="skeleton h-3.5 w-16 rounded" />
              <div className="skeleton h-3.5 w-16 rounded" />
            </div>
          </div>
        </div>

        {/* Card 3: Router NAS */}
        <div className="card relative overflow-hidden bg-base-100 border border-base-300">
          <div className="card-body p-5 gap-2">
            <div className="flex items-center justify-between">
              <div className="skeleton h-3 w-20 rounded" />
              <div className="skeleton h-4 w-4 rounded-full" />
            </div>
            <div className="skeleton h-10 w-20 rounded my-1" />
            <div className="skeleton h-3.5 w-40 rounded pt-1" />
          </div>
        </div>

        {/* Card 4: Sesi Gantung */}
        <div className="card relative overflow-hidden bg-base-100 border border-base-300">
          <div className="card-body p-5 gap-2">
            <div className="flex items-center justify-between">
              <div className="skeleton h-3 w-20 rounded" />
              <div className="skeleton h-3.5 w-14 rounded-full" />
            </div>
            <div className="skeleton h-10 w-20 rounded my-1" />
            <div className="skeleton h-3.5 w-36 rounded pt-1" />
          </div>
        </div>
      </div>

      {/* 3. TELEMETRY ROW SKELETON: BANDWIDTH CHART + TOP CONSUMPTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Bandwidth Chart Skeleton */}
        <div className="lg:col-span-2 card bg-base-100 border border-base-300 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1.5">
              <div className="skeleton h-4 w-44 rounded" />
              <div className="skeleton h-3 w-64 max-w-full rounded" />
            </div>
            <div className="skeleton h-7 w-28 rounded-lg" />
          </div>
          <div className="skeleton h-64 w-full rounded-xl" />
        </div>

        {/* Top Bandwidth Users Skeleton */}
        <div className="lg:col-span-1 card bg-base-100 border border-base-300 p-5">
          <div className="space-y-1.5 mb-4">
            <div className="skeleton h-4 w-36 rounded" />
            <div className="skeleton h-3 w-48 rounded" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between p-2.5 rounded-lg bg-base-200/50">
                <div className="flex items-center gap-2.5">
                  <div className="skeleton h-8 w-8 rounded-full shrink-0" />
                  <div className="space-y-1">
                    <div className="skeleton h-3.5 w-24 rounded" />
                    <div className="skeleton h-2.5 w-16 rounded" />
                  </div>
                </div>
                <div className="skeleton h-4 w-14 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. INFRASTRUCTURE ROW SKELETON: ROUTER HEALTH + RECENT SESSIONS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Router NAS Status Skeleton */}
        <div className="card bg-base-100 border border-base-300 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1.5">
              <div className="skeleton h-4 w-36 rounded" />
              <div className="skeleton h-3 w-48 rounded" />
            </div>
            <div className="skeleton h-6 w-20 rounded-full" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-3 rounded-xl border border-base-300">
                <div className="flex items-center gap-3">
                  <div className="skeleton h-10 w-10 rounded-xl shrink-0" />
                  <div className="space-y-1.5">
                    <div className="skeleton h-4 w-28 rounded" />
                    <div className="skeleton h-3 w-20 rounded" />
                  </div>
                </div>
                <div className="skeleton h-6 w-16 rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Recent Session Log Skeleton */}
        <div className="card bg-base-100 border border-base-300 p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1.5">
              <div className="skeleton h-3 w-24 rounded" />
              <div className="skeleton h-4 w-40 rounded" />
            </div>
            <div className="skeleton h-5 w-16 rounded-full" />
          </div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-base-200">
                <div className="skeleton h-3.5 w-24 rounded" />
                <div className="skeleton h-3 w-24 rounded" />
                <div className="skeleton h-3 w-20 rounded" />
                <div className="skeleton h-3 w-20 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function WifiLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* 1. Page Header Skeleton */}
      <div className="flex flex-wrap justify-between items-start gap-4">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="skeleton h-8 w-80 max-w-full rounded-lg" />
            <div className="skeleton h-6 w-32 rounded-full" />
          </div>
          <div className="skeleton h-4 w-96 max-w-full rounded mt-2" />
        </div>
        <div className="skeleton h-9 w-36 rounded-lg" />
      </div>

      {/* 2. Tabs Group Utama (Project / Gedung) Skeleton */}
      <div className="border-b border-base-300 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none flex-nowrap">
          <div className="skeleton h-8 w-32 rounded-lg shrink-0" />
          <div className="skeleton h-8 w-44 rounded-lg shrink-0" />
          <div className="skeleton h-8 w-36 rounded-lg shrink-0" />
          <div className="skeleton h-8 w-36 rounded-lg shrink-0" />
          <div className="skeleton h-8 w-40 rounded-lg shrink-0" />
        </div>
      </div>

      {/* 3. Filter Toolbar Skeleton */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-base-100 p-3.5 rounded-xl border border-base-300 shadow-xs">
        <div className="flex items-center gap-2">
          <div className="skeleton h-4 w-20 rounded" />
          <div className="skeleton h-8 w-64 rounded-lg" />
        </div>
        <div className="w-full sm:w-80">
          <div className="skeleton h-8 w-full rounded-lg" />
        </div>
      </div>

      {/* 4. Table Card Skeleton */}
      <div className="card bg-base-100 border border-base-300 shadow-md overflow-hidden">
        <div className="p-0">
          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th className="w-12">#</th>
                  <th>SSID &amp; NAMA JARINGAN</th>
                  <th>STRUKTUR GROUP &amp; SUB GROUP</th>
                  <th>PASSWORD WIFI</th>
                  <th className="text-center">VLAN</th>
                  <th>KEAMANAN &amp; RADIO</th>
                  <th className="text-center">STATUS SIARAN</th>
                  <th className="text-center w-24">AKSI</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8].map((idx) => (
                  <tr key={idx} className="border-b border-base-200">
                    <td><div className="skeleton h-4 w-4" /></td>
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="skeleton h-7 w-7 rounded-lg shrink-0" />
                        <div className="space-y-1">
                          <div className="skeleton h-4 w-36 rounded" />
                          <div className="skeleton h-3 w-28 rounded" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="space-y-1.5 py-0.5">
                        <div className="skeleton h-4 w-32 rounded" />
                        <div className="skeleton h-3.5 w-24 rounded ml-4" />
                      </div>
                    </td>
                    <td><div className="skeleton h-5 w-24 rounded" /></td>
                    <td className="text-center">
                      <div className="skeleton h-6 w-16 mx-auto rounded-md" />
                    </td>
                    <td>
                      <div className="space-y-1">
                        <div className="skeleton h-4 w-28 rounded" />
                        <div className="skeleton h-3 w-20 rounded" />
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="skeleton h-6 w-16 mx-auto rounded-full" />
                    </td>
                    <td>
                      <div className="flex justify-center">
                        <div className="skeleton h-7 w-16 rounded-md" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-3 bg-base-100/60 border-t border-base-300">
            <div className="skeleton h-4 w-48 rounded" />
            <div className="skeleton h-6 w-40 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function DevicesLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* 1. Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="skeleton h-9 w-9 rounded-lg shrink-0" />
            <div className="skeleton h-8 w-72 rounded-lg" />
          </div>
          <div className="skeleton h-4 w-96 max-w-full rounded mt-2" />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="skeleton h-8 w-36 rounded-full" />
          <div className="skeleton h-8 w-44 rounded-lg" />
          <div className="skeleton h-8 w-36 rounded-lg" />
          <div className="skeleton h-8 w-32 rounded-lg" />
          <div className="skeleton h-8 w-36 rounded-lg" />
        </div>
      </div>

      {/* 2. 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card p-4 flex flex-col justify-between bg-base-100 border border-base-300">
            <div className="flex items-center justify-between">
              <div className="skeleton h-3 w-28 rounded" />
              <div className="skeleton h-7 w-7 rounded-lg" />
            </div>
            <div className="mt-3">
              <div className="skeleton h-8 w-20 rounded mb-1.5" />
              <div className="skeleton h-3.5 w-40 rounded" />
            </div>
          </div>
        ))}
      </div>

      {/* 3. Unified Toolbar */}
      <div className="card p-3 flex flex-col md:flex-row items-center gap-3 bg-base-100 border border-base-300">
        <div className="skeleton h-9 flex-1 w-full rounded-lg" />
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          <div className="skeleton h-9 w-32 rounded-lg" />
          <div className="skeleton h-9 w-36 rounded-lg" />
          <div className="skeleton h-9 w-32 rounded-lg" />
        </div>
      </div>

      {/* 4. Sub-bar Filter Jenis Perangkat */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="skeleton h-7 w-24 rounded-xl shrink-0" />
        ))}
      </div>

      {/* 5. Devices Table Card */}
      <div className="card bg-base-100 border border-base-300 shadow-md overflow-hidden">
        <div className="p-0">
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
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <tr key={i} className="border-b border-base-200">
                    <td>
                      <div className="flex items-center gap-2.5">
                        <div className="skeleton h-8 w-8 rounded-lg shrink-0" />
                        <div className="space-y-1">
                          <div className="skeleton h-4 w-36 rounded" />
                          <div className="skeleton h-3 w-24 rounded" />
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="space-y-1">
                        <div className="skeleton h-5 w-20 rounded-md" />
                        <div className="skeleton h-3 w-28 rounded" />
                      </div>
                    </td>
                    <td>
                      <div className="flex items-center gap-1.5">
                        <div className="skeleton h-2.5 w-2.5 rounded-full" />
                        <div className="skeleton h-4 w-14 rounded" />
                      </div>
                    </td>
                    <td>
                      <div className="flex gap-1">
                        <div className="skeleton h-5 w-12 rounded-md" />
                        <div className="skeleton h-5 w-12 rounded-md" />
                      </div>
                    </td>
                    <td>
                      <div className="space-y-1">
                        <div className="skeleton h-4 w-16 rounded" />
                        <div className="skeleton h-1.5 w-20 rounded-full" />
                      </div>
                    </td>
                    <td>
                      <div className="space-y-1">
                        <div className="skeleton h-3.5 w-20 rounded" />
                        <div className="skeleton h-3 w-24 rounded" />
                      </div>
                    </td>
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <div className="skeleton h-6 w-14 rounded-md" />
                        <div className="skeleton h-6 w-7 rounded-md" />
                        <div className="skeleton h-6 w-7 rounded-md" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination skeleton */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4 py-3 bg-base-100/60 border-t border-base-300">
            <div className="skeleton h-4 w-52 rounded" />
            <div className="skeleton h-6 w-44 rounded" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function ReportsLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="skeleton h-8 w-72 rounded-lg mb-2" />
          <div className="skeleton h-4 w-96 max-w-full rounded" />
        </div>
        <div className="flex items-center gap-3">
          <div className="skeleton h-8 w-28 rounded-lg" />
          <div className="skeleton h-8 w-32 rounded-lg" />
        </div>
      </div>

      {/* 2. Navigation Tab Bar */}
      <div className="border-b border-base-300 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-none flex-nowrap">
          <div className="skeleton h-9 w-28 rounded-lg shrink-0" />
          <div className="skeleton h-9 w-36 rounded-lg shrink-0" />
          <div className="skeleton h-9 w-32 rounded-lg shrink-0" />
          <div className="skeleton h-9 w-32 rounded-lg shrink-0" />
          <div className="skeleton h-9 w-32 rounded-lg shrink-0" />
          <div className="skeleton h-9 w-40 rounded-lg shrink-0" />
        </div>
      </div>

      {/* 3. 4 KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="card p-5 bg-base-100 border border-base-300 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="skeleton h-3 w-28 rounded" />
              <div className="skeleton h-7 w-7 rounded-lg" />
            </div>
            <div className="skeleton h-9 w-28 rounded my-2" />
            <div className="skeleton h-3.5 w-40 rounded mt-1" />
          </div>
        ))}
      </div>

      {/* 4. Telemetry Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 card bg-base-100 border border-base-300 p-5 shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="space-y-1.5">
              <div className="skeleton h-4 w-44 rounded" />
              <div className="skeleton h-3 w-60 rounded" />
            </div>
            <div className="skeleton h-7 w-32 rounded-lg" />
          </div>
          <div className="skeleton h-64 w-full rounded-xl" />
        </div>
        <div className="lg:col-span-1 card bg-base-100 border border-base-300 p-5 shadow-lg">
          <div className="space-y-1.5 mb-4">
            <div className="skeleton h-4 w-36 rounded" />
            <div className="skeleton h-3 w-44 rounded" />
          </div>
          <div className="space-y-4 pt-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-1.5">
                <div className="flex justify-between">
                  <div className="skeleton h-3.5 w-24 rounded" />
                  <div className="skeleton h-3.5 w-16 rounded" />
                </div>
                <div className="skeleton h-2 w-full rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

