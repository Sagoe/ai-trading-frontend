import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Dashboard    from "./pages/Dashboard";
import Markets      from "./pages/Markets";
import Predictions  from "./pages/Predictions";
import Portfolio    from "./pages/Portfolio";
import Settings     from "./pages/Settings";
import UploadPredict from "./pages/UploadPredict";

const BACKEND = "https://ai-trading-dashboard-sotg.onrender.com";

export default function App() {
  const [ready, setReady]     = useState(false);
  const [waking, setWaking]   = useState(true);

  useEffect(() => {
    // Wake up backend on app load
    const wake = async () => {
      try {
        await fetch(`${BACKEND}/health`);
        setReady(true);
      } catch {
        // retry after 3s
        setTimeout(wake, 3000);
      } finally {
        setWaking(false);
      }
    };
    wake();

    // Keep alive every 10 min
    const id = setInterval(() => {
      fetch(`${BACKEND}/health`).catch(() => {});
    }, 10 * 60 * 1000);

    return () => clearInterval(id);
  }, []);

  if (waking) {
    return (
      <div style={{
        minHeight: "100vh",
        background: "#0a0e1a",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        fontFamily: "DM Sans, sans-serif",
      }}>
        <div style={{
          width: 48, height: 48,
          border: "4px solid rgba(0,212,255,0.2)",
          borderTop: "4px solid #00d4ff",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }} />
        <p style={{ color: "#00d4ff", fontSize: 16, fontWeight: 600 }}>
          Starting AI Trading Engine…
        </p>
        <p style={{ color: "#8899aa", fontSize: 13 }}>
          Free server is waking up — this takes ~30 seconds
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/"             element={<Dashboard />}     />
      <Route path="/markets"      element={<Markets />}       />
      <Route path="/predictions"  element={<Predictions />}   />
      <Route path="/portfolio"    element={<Portfolio />}     />
      <Route path="/upload"       element={<UploadPredict />} />
      <Route path="/settings"     element={<Settings />}      />
    </Routes>
  );
}