import { getTopUsageReport } from "@/app/actions/reportActions";
import { formatBytes } from "@/lib/utils";

export default async function ReportsPage() {
  const result = await getTopUsageReport();

  if (result.error) {
    return <div className="p-6 text-error">{result.error}</div>;
  }

  const reports = result.data || [];

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Laporan Penggunaan Bandwidth</h1>
        <p className="text-gray-500">20 User dengan penggunaan data terbanyak (Total Download/Upload).</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body p-0">
            <div className="overflow-x-auto">
              <table className="table table-zebra w-full">
                <thead className="bg-base-200">
                  <tr>
                    <th>Username</th>
                    <th className="text-right">Total Sesi</th>
                    <th className="text-right">Upload (Input)</th>
                    <th className="text-right">Download (Output)</th>
                    <th className="text-right">Total Data</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((report: any) => {
                    const input = BigInt(report._sum.acctinputoctets || 0);
                    const output = BigInt(report._sum.acctoutputoctets || 0);
                    const total = input + output;

                    return (
                      <tr key={report.username} className="hover">
                        <td className="font-bold text-primary">{report.username}</td>
                        <td className="text-right">{report._count.radacctid}</td>
                        <td className="text-right font-mono text-sm">{formatBytes(input)}</td>
                        <td className="text-right font-mono text-sm">{formatBytes(output)}</td>
                        <td className="text-right font-mono font-bold text-secondary">
                          {formatBytes(total)}
                        </td>
                      </tr>
                    );
                  })}
                  {reports.length === 0 && (
                    <tr>
                      <td colSpan={5} className="text-center py-10 opacity-50">
                        Tidak ada data penggunaan ditemukan.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
