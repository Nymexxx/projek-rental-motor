import { useLocation, useNavigate } from "react-router";
import { Home, ClipboardList, User, Search } from "lucide-react";

const NAV_ITEMS = [
  { icon: Home, label: "Home", path: "/" },
  { icon: Search, label: "Explore", path: "/explore" },
  { icon: ClipboardList, label: "Orders", path: "/orders" },
  { icon: User, label: "Profile", path: "/profile" },
];

export function BottomNav() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div
      className="absolute bottom-0 left-0 right-0"
      style={{
        background: "#FFFFFF",
        borderTop: "1px solid #F1F5F9",
        boxShadow: "0 -4px 24px rgba(0,0,0,0.08)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <div className="flex items-center">
        {NAV_ITEMS.map(({ icon: Icon, label, path }) => {
          const active = isActive(path);
          return (
            <button
              key={label}
              onClick={() => navigate(path)}
              className="flex-1 flex flex-col items-center gap-1 py-3 relative"
            >
              {active && (
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2"
                  style={{
                    width: "24px",
                    height: "3px",
                    background: "linear-gradient(90deg, #1D4ED8, #3B82F6)",
                    borderRadius: "0 0 4px 4px",
                  }}
                />
              )}
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{
                  background: active
                    ? "linear-gradient(135deg, #EFF6FF, #DBEAFE)"
                    : "transparent",
                }}
              >
                <Icon
                  size={19}
                  color={active ? "#1D4ED8" : "#94A3B8"}
                  strokeWidth={active ? 2.5 : 1.8}
                />
              </div>
              <span
                style={{
                  fontSize: "10px",
                  fontWeight: active ? 700 : 400,
                  color: active ? "#1D4ED8" : "#94A3B8",
                  lineHeight: 1,
                }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
