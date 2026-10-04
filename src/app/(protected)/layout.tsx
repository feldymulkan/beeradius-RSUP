import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
        <footer className="py-4 text-center text-[11px] text-slate-500 font-mono border-t border-primary/10">
          © {new Date().getFullYear()} BeeRadius · RSUD NTB
        </footer>
      </div>
      <div className="drawer-side z-40">
        <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
        <Sidebar />
      </div>
    </div>
  );
}