import { 
  getTopUsageReport, 
  getRecentLoginReport, 
  getNASActivityReport, 
  getUserDistributionReport,
  getBandwidthUsageReport,
  getDailyActiveUsersReport,
  getAuthFailureReport,
  getTypeDistributionReport,
  getWireguardStatsReport,
  getYearlyBandwidthTotal
} from "@/app/actions/reportActions";
import ReportClient from "@/components/ReportClient";

export default async function ReportsPage() {
  const [usageRes, loginRes, nasRes, distRes, bwRes, userRes, failRes, typeRes, wgRes, yearlyRes] = await Promise.all([
    getTopUsageReport('30d'),
    getRecentLoginReport(),
    getNASActivityReport(),
    getUserDistributionReport(),
    getBandwidthUsageReport('30d'),
    getDailyActiveUsersReport('30d'),
    getAuthFailureReport(),
    getTypeDistributionReport(),
    getWireguardStatsReport(),
    getYearlyBandwidthTotal()
  ]);

  if (usageRes.error || loginRes.error || nasRes.error || distRes.error || bwRes.error || userRes.error || failRes.error || typeRes.error || wgRes.error || yearlyRes.error) {
    return (
      <div className="p-6">
        <div className="alert alert-error">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Terjadi kesalahan saat memuat laporan.</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ReportClient 
        usageData={usageRes.data || []}
        loginData={loginRes.data || []}
        nasData={nasRes.data || []}
        distributionData={distRes.data || []}
        bandwidthData={bwRes.data || []}
        dailyUserData={userRes.data || []}
        failureData={failRes.data || []}
        typeData={typeRes.data || []}
        wgData={wgRes.data || {}}
        yearlyData={yearlyRes.data || { upload: 0, download: 0 }}
      />
    </div>
  );
}
