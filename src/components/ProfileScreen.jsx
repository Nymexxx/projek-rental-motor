import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  CreditCard,
  Bell,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  Star,
  Shield,
  Edit3,
  MapPin,
} from "lucide-react";

const PROFILE_IMG =
  "https://images.unsplash.com/photo-1758129090913-b1c6953d47d2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMGFzaWFuJTIwbWFuJTIwcHJvZmlsZSUyMGF2YXRhciUyMHByb2Zlc3Npb25hbHxlbnwxfHx8fDE3Nzc4OTk5NDR8MA&ixlib=rb-4.1.0&q=80&w=400";

const SETTINGS = [
  {
    section: "Account",
    items: [
      { icon: <User size={17} color="#1D4ED8" />, bg: "#EFF6FF", label: "Edit Profile", sub: "Update your personal info" },
      { icon: <CreditCard size={17} color="#7C3AED" />, bg: "#F5F3FF", label: "Payment Methods", sub: "Manage saved cards & wallets" },
      { icon: <MapPin size={17} color="#059669" />, bg: "#ECFDF5", label: "Saved Locations", sub: "Your favorite pickup spots" },
    ],
  },
  {
    section: "Preferences",
    items: [
      { icon: <Bell size={17} color="#F59E0B" />, bg: "#FFFBEB", label: "Notifications", sub: "Manage alerts & reminders" },
      { icon: <Shield size={17} color="#10B981" />, bg: "#F0FDF4", label: "Privacy & Security", sub: "Password and 2FA settings" },
    ],
  },
  {
    section: "Support",
    items: [
      { icon: <HelpCircle size={17} color="#0369A1" />, bg: "#F0F9FF", label: "Help Center", sub: "FAQs and support tickets" },
      { icon: <Star size={17} color="#F59E0B" />, bg: "#FFFBEB", label: "Rate the App", sub: "Tell us what you think" },
      { icon: <Info size={17} color="#6B7280" />, bg: "#F9FAFB", label: "About MotoZone", sub: "Version 2.4.1" },
    ],
  },
];

export function ProfileScreen() {
  const navigate = useNavigate();

  const authRaw = localStorage.getItem("moto_auth");
  const auth = authRaw ? JSON.parse(authRaw) : { name: "Budi Santoso", email: "budi@motozone.id" };

  const handleLogout = () => {
    localStorage.removeItem("moto_auth");
    navigate("/login");
  };

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ fontFamily: "Poppins, sans-serif", background: "#F1F5F9" }}
    >
      {/* Header */}
      <div
        className="flex-shrink-0 px-5 pb-6"
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1D4ED8 70%, #3B82F6 100%)",
          paddingTop: "16px",
        }}
      >
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginBottom: "16px" }}>
          MotoZone
        </p>

        {/* Profile Card */}
        <div
          className="flex items-center gap-4 p-4"
          style={{ background: "rgba(255,255,255,0.12)", borderRadius: "20px", backdropFilter: "blur(8px)" }}
        >
          <div className="relative">
            <img
              src={PROFILE_IMG}
              alt="Profile"
              className="w-16 h-16 rounded-2xl object-cover"
              style={{ border: "2.5px solid rgba(255,255,255,0.5)" }}
            />
            <div
              className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: "#22C55E", border: "2px solid white" }}
            >
              <div className="w-2 h-2 rounded-full bg-white" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p style={{ fontSize: "17px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2 }}>
              {auth.name}
            </p>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginTop: "2px" }}>
              {auth.email}
            </p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span
                className="px-2 py-0.5 rounded-full"
                style={{ background: "#F59E0B", fontSize: "9px", fontWeight: 800, color: "#7C2D12" }}
              >
                GOLD MEMBER
              </span>
              <span
                className="px-2 py-0.5 rounded-full"
                style={{ background: "rgba(255,255,255,0.2)", fontSize: "9px", color: "rgba(255,255,255,0.85)" }}
              >
                Since Jan 2024
              </span>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.2)" }}
          >
            <Edit3 size={15} color="#FFFFFF" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Quick Stats */}
        <div className="px-4 pt-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Total Rides", value: "12", icon: "🏍️", color: "#1D4ED8", bg: "#EFF6FF" },
              { label: "Avg Rating", value: "4.9", icon: "⭐", color: "#F59E0B", bg: "#FFFBEB" },
              { label: "Saved IDR", value: "150K", icon: "💰", color: "#16A34A", bg: "#F0FDF4" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center py-4"
                style={{ background: stat.bg, borderRadius: "16px" }}
              >
                <span style={{ fontSize: "20px" }}>{stat.icon}</span>
                <p style={{ fontSize: "18px", fontWeight: 800, color: stat.color, lineHeight: 1.2, marginTop: "4px" }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: "9px", color: "#64748B", fontWeight: 500 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="px-4 pt-4">
          <div
            className="p-4"
            style={{ background: "#FFFFFF", borderRadius: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
          >
            <p style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A", marginBottom: "12px" }}>
              Contact Information
            </p>
            {[
              { icon: <Mail size={15} color="#1D4ED8" />, label: auth.email },
              { icon: <Phone size={15} color="#1D4ED8" />, label: "+62 812-3456-7890" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3 mb-3 last:mb-0">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "#EFF6FF" }}
                >
                  {item.icon}
                </div>
                <span style={{ fontSize: "13px", color: "#374151" }}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Sections */}
        {SETTINGS.map((section) => (
          <div key={section.section} className="px-4 pt-4">
            <p style={{ fontSize: "11px", fontWeight: 700, color: "#94A3B8", letterSpacing: "0.08em", marginBottom: "8px" }}>
              {section.section.toUpperCase()}
            </p>
            <div
              style={{ background: "#FFFFFF", borderRadius: "16px", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              {section.items.map((item, i) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all"
                  style={{
                    borderBottom: i < section.items.length - 1 ? "1px solid #F1F5F9" : "none",
                  }}
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: item.bg }}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>{item.label}</p>
                    <p style={{ fontSize: "11px", color: "#94A3B8", marginTop: "1px" }}>{item.sub}</p>
                  </div>
                  <ChevronRight size={16} color="#CBD5E1" className="flex-shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ))}

        {/* Logout */}
        <div className="px-4 pt-4 pb-28">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2"
            style={{
              height: "50px",
              borderRadius: "14px",
              background: "#FEE2E2",
              color: "#DC2626",
              fontSize: "14px",
              fontWeight: 700,
              border: "1.5px solid #FECACA",
            }}
          >
            <LogOut size={17} />
            Log Out
          </button>
          <p
            className="text-center mt-3"
            style={{ fontSize: "11px", color: "#CBD5E1" }}
          >
            MotoZone v2.4.1 · Made with ❤️ in Bali
          </p>
        </div>
      </div>
    </div>
  );
}
