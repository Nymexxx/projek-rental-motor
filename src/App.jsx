import { RouterProvider } from "react-router-dom";
import { router } from "./routes";

export default function App() {
  return <RouterProvider router={router} />; (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        background: "radial-gradient(ellipse at 25% 40%, #1e3a8a22 0%, transparent 55%), radial-gradient(ellipse at 75% 65%, #3b82f622 0%, transparent 55%), #e8edf5",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      {/* Android Phone Frame */}
      <div
        className="relative"
        style={{
          /* Outer bezel */
          width: "384px",
          height: "840px",
          background: "#1a1a1f",
          borderRadius: "44px",
          padding: "12px",
          boxShadow:
            "0 0 0 1px #2a2a33, 0 32px 80px rgba(0,0,0,0.55), 0 8px 24px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.07)",
        }}
      >
        {/* Side buttons */}
        <div
          className="absolute"
          style={{
            left: "-3px",
            top: "120px",
            width: "3px",
            height: "32px",
            background: "#111115",
            borderRadius: "2px 0 0 2px",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "-3px",
            top: "170px",
            width: "3px",
            height: "64px",
            background: "#111115",
            borderRadius: "2px 0 0 2px",
          }}
        />
        <div
          className="absolute"
          style={{
            left: "-3px",
            top: "248px",
            width: "3px",
            height: "64px",
            background: "#111115",
            borderRadius: "2px 0 0 2px",
          }}
        />
        <div
          className="absolute"
          style={{
            right: "-3px",
            top: "190px",
            width: "3px",
            height: "80px",
            background: "#111115",
            borderRadius: "0 2px 2px 0",
          }}
        />

        {/* Inner screen */}
        <div
          className="relative overflow-hidden h-full"
          style={{
            borderRadius: "34px",
            background: "#F1F5F9",
          }}
        >
          {/* Status Bar */}
          <div
            className="absolute top-0 left-0 right-0 z-50 flex items-center justify-between px-6"
            style={{ height: "36px", background: "transparent", pointerEvents: "none" }}
          >
            <span
              style={{ fontSize: "12px", fontWeight: 700, color: "#FFFFFF", fontFamily: "Poppins, sans-serif", mixBlendMode: "normal" }}
              className="status-time"
            >
              9:41
            </span>
            {/* Dynamic Island */}
            <div
              className="absolute left-1/2 top-2 -translate-x-1/2"
              style={{
                width: "88px",
                height: "22px",
                background: "#000000",
                borderRadius: "14px",
              }}
            />
            {/* Status icons */}
            <div className="flex items-center gap-1.5">
              {/* Signal */}
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                <rect x="0" y="7.5" width="2.5" height="3.5" rx="0.5" fill="white" />
                <rect x="4" y="5" width="2.5" height="6" rx="0.5" fill="white" />
                <rect x="8" y="2.5" width="2.5" height="8.5" rx="0.5" fill="white" />
                <rect x="12" y="0" width="3" height="11" rx="0.5" fill="white" />
              </svg>
              {/* WiFi */}
              <svg width="15" height="11" viewBox="0 0 15 11" fill="none">
                <path d="M7.5 9.5a1 1 0 100-2 1 1 0 000 2z" fill="white" />
                <path d="M5 7.5a3.5 3.5 0 015 0" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M2.5 5a6.5 6.5 0 0110 0" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
                <path d="M0 2.5a10 10 0 0115 0" stroke="white" strokeWidth="1.3" strokeLinecap="round" />
              </svg>
              {/* Battery */}
              <svg width="23" height="11" viewBox="0 0 23 11" fill="none">
                <rect x="0.5" y="0.5" width="19" height="10" rx="2.5" stroke="white" strokeOpacity="0.6" />
                <rect x="20" y="3.5" width="2.5" height="4" rx="1" fill="white" fillOpacity="0.6" />
                <rect x="2" y="2" width="15" height="7" rx="1.5" fill="white" />
              </svg>
            </div>
          </div>

          {/* App Content */}
          <div
            className="absolute left-0 right-0 bottom-0"
            style={{ top: "36px" }}
          >
            <RouterProvider router={router} />
          </div>
        </div>
      </div>

      {/* Label */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full"
        style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }}
      >
        <span style={{ fontSize: "12px", fontWeight: 700, color: "#1D4ED8" }}>🏍️ MotoZone</span>
        <span style={{ fontSize: "12px", color: "#64748B" }}>— Motorcycle Rental App</span>
      </div>
    </div>
  );
}