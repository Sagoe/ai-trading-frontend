import { useState } from "react";
import Sidebar    from "./Sidebar";
import Topbar     from "./Topbar";
import LiveTicker from "./LiveTicker";

export default function Layout({ children, onRefresh }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-primary overflow-x-hidden">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <LiveTicker />

      <div className="md:ml-60 pt-10 overflow-x-hidden">
        <Topbar onRefresh={onRefresh} onMenuClick={() => setSidebarOpen(true)} />
        <main className="pt-14 min-h-screen">
          <div className="p-3 md:p-6 max-w-[1600px] mx-auto animate-fade-in-up overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}