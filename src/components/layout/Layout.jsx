import { useState } from "react";
import Sidebar    from "./Sidebar";
import Topbar     from "./Topbar";
import LiveTicker from "./LiveTicker";

export default function Layout({ children, onRefresh }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-primary">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <LiveTicker />

      {/* md+ pushed right by sidebar */}
      <div className="md:ml-60 pt-10">
        <Topbar onRefresh={onRefresh} onMenuClick={() => setSidebarOpen(true)} />
        <main className="pt-14 min-h-screen pb-20 md:pb-0">
          <div className="p-4 md:p-6 max-w-[1600px] mx-auto animate-fade-in-up">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}