import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Bell, MapPin, Star, Zap, Shield, Clock, ChevronRight, TrendingUp } from "lucide-react";
import { MOTORCYCLES, CATEGORIES, formatPrice } from "../data/motorcycles";

export function HomeScreen() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const authRaw = localStorage.getItem("moto_auth");
  const auth = authRaw ? JSON.parse(authRaw) : { name: "Rider" };
  const firstName = auth.name?.split(" ")[0] ?? "Rider";

  const filtered = MOTORCYCLES.filter((m) => {
    const matchCat = activeCategory === "All" || m.category === activeCategory;
    const matchSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featured = MOTORCYCLES.find((m) => m.id === "yamaha-nmax-155");

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ fontFamily: "Poppins, sans-serif", background: "#F1F5F9" }}
    >
      {/* Header */}
      <div
        className="flex-shrink-0 px-5 pb-5"
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1D4ED8 70%, #3B82F6 100%)",
          paddingTop: "16px",
        }}
      >
        {/* Top Row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.15)" }}
            >
              <MapPin size={14} color="#FFFFFF" />
            </div>
            <div>
              <p style={{ fontSize: "10px", color: "rgba(255,255,255,0.6)", lineHeight: 1 }}>
                lokasi
              </p>
              <p style={{ fontSize: "12px", fontWeight: 600, color: "#FFFFFF" }}>
                Bali, Indonesia
              </p>
            </div>
          </div>
          <button
            className="relative w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <Bell size={17} color="#FFFFFF" />
            <span
              className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
              style={{ background: "#EF4444", border: "1.5px solid #1D4ED8" }}
            />
          </button>
        </div>

        {/* Greeting */}
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)", marginBottom: "2px" }}>
          Selamat Pagi
        </p>
        <p style={{ fontSize: "20px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2, marginBottom: "16px" }}>
          Halo, {firstName}!
        </p>

        {/* Search */}
        <div
          className="flex items-center gap-3 px-4"
          style={{
            background: "#FFFFFF",
            borderRadius: "14px",
            height: "48px",
            boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
          }}
        >
          <Search size={17} color="#94A3B8" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search motorcycles..."
            className="flex-1 outline-none bg-transparent"
            style={{ fontSize: "14px", color: "#0F172A" }}
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Quick Stats */}
        {!searchQuery && (
          <div className="px-5 pt-4 pb-2 grid grid-cols-3 gap-3">
            {[
              { icon: <Zap size={15} />, label: "Fast Delivery", color: "#F59E0B", bg: "#FFFBEB" },
              { icon: <Shield size={15} />, label: "Insured", color: "#10B981", bg: "#ECFDF5" },
              { icon: <Clock size={15} />, label: "24/7 Support", color: "#1D4ED8", bg: "#EFF6FF" },
            ].map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1.5 py-3"
                style={{ background: s.bg, borderRadius: "14px" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: s.color + "22", color: s.color }}
                >
                  {s.icon}
                </div>
                <span style={{ fontSize: "10px", fontWeight: 600, color: "#374151" }}>{s.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Featured Banner */}
        {!searchQuery && activeCategory === "All" && (
          <div className="px-5 pt-2 pb-2">
            <div
              className="relative cursor-pointer overflow-hidden"
              style={{ borderRadius: "20px", height: "160px" }}
              onClick={() => navigate(`/detail/${featured.id}`)}
            >
              <img
                src={featured.image}
                alt={featured.name}
                className="w-full h-full object-cover"
                style={{
                  objectPosition: featured.imagePosition || "center",
                }}
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(15,23,42,0.85) 0%, rgba(15,23,42,0.3) 60%, transparent 100%)",
                }}
              />
              <div className="absolute inset-0 p-4 flex flex-col justify-between">
                <div
                  className="flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full"
                  style={{ background: "#F59E0B" }}
                >
                  <TrendingUp size={10} color="#7C2D12" />
                  <span style={{ fontSize: "10px", fontWeight: 700, color: "#7C2D12" }}>
                    TOP RATED
                  </span>
                </div>
                <div>
                  <p style={{ fontSize: "16px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2 }}>
                    {featured.name}
                  </p>
                  <div className="flex items-center justify-between mt-1">
                    <div className="flex items-center gap-1">
                      <Star size={11} fill="#F59E0B" color="#F59E0B" />
                      <span style={{ fontSize: "12px", color: "#FFFFFF", fontWeight: 600 }}>
                        {featured.rating} · {featured.reviewCount} reviews
                      </span>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full"
                      style={{ background: "#1D4ED8", fontSize: "11px", fontWeight: 700, color: "#FFFFFF" }}
                    >
                      {formatPrice(featured.price)}/day
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Categories */}
        <div className="pt-2 pb-1">
          <div
            className="flex gap-2 px-5 overflow-x-auto"
            style={{ scrollbarWidth: "none", paddingBottom: "4px" }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="flex-shrink-0 px-4 py-2 rounded-full transition-all"
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  background: activeCategory === cat ? "#1D4ED8" : "#FFFFFF",
                  color: activeCategory === cat ? "#FFFFFF" : "#64748B",
                  border: activeCategory === cat ? "none" : "1.5px solid #E2E8F0",
                  boxShadow:
                    activeCategory === cat
                      ? "0 4px 12px rgba(29,78,216,0.3)"
                      : "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* List Header */}
        <div className="px-5 pt-3 pb-2 flex items-center justify-between">
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A" }}>
            {filtered.length} Available
          </p>
          <button className="flex items-center gap-1" style={{ fontSize: "12px", color: "#1D4ED8", fontWeight: 500 }}>
            Sort by <ChevronRight size={13} />
          </button>
        </div>

        {/* Motorcycle Cards */}
        <div className="px-5 pb-24 flex flex-col gap-4">
          {filtered.map((moto) => (
            <div
              key={moto.id}
              onClick={() => navigate(`/detail/${moto.id}`)}
              className="cursor-pointer"
              style={{
                background: "#FFFFFF",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
              }}
            >
              {/* Image */}
              <div className="relative" style={{ height: "176px" }}>
                <img
                  src={moto.image}
                  alt={moto.name}
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: moto.imagePosition || "center",
                  }}
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)",
                  }}
                />
                {/* Availability */}
                <div className="absolute top-3 left-3">
                  <span
                    className="px-2.5 py-1 rounded-full"
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      background: moto.available ? "#DCFCE7" : "#FEE2E2",
                      color: moto.available ? "#15803D" : "#DC2626",
                    }}
                  >
                    {moto.available ? "● Available" : "● Unavailable"}
                  </span>
                </div>
                {/* Category */}
                <div className="absolute top-3 right-3">
                  <span
                    className="px-2.5 py-1 rounded-full"
                    style={{
                      fontSize: "10px",
                      fontWeight: 600,
                      background: "rgba(255,255,255,0.9)",
                      color: "#374151",
                    }}
                  >
                    {moto.category}
                  </span>
                </div>
                {/* Bottom */}
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <p
                      style={{
                        fontSize: "16px",
                        fontWeight: 800,
                        color: "#FFFFFF",
                        textShadow: "0 1px 4px rgba(0,0,0,0.4)",
                        lineHeight: 1.2,
                      }}
                    >
                      {moto.name}
                    </p>
                    <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.75)" }}>
                      {moto.year} · {moto.engineCC}cc · {moto.transmission}
                    </p>
                  </div>
                  <div
                    className="flex items-center gap-1 px-2 py-1 rounded-full"
                    style={{ background: "rgba(255,255,255,0.92)" }}
                  >
                    <Star size={11} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ fontSize: "12px", fontWeight: 700, color: "#0F172A" }}>
                      {moto.rating}
                    </span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="px-2.5 py-0.5 rounded-full"
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      background:
                        moto.brand === "Honda"
                          ? "#FEE2E2"
                          : moto.brand === "Yamaha"
                          ? "#EFF6FF"
                          : moto.brand === "Kawasaki"
                          ? "#F0FDF4"
                          : "#F5F3FF",
                      color:
                        moto.brand === "Honda"
                          ? "#991B1B"
                          : moto.brand === "Yamaha"
                          ? "#1E40AF"
                          : moto.brand === "Kawasaki"
                          ? "#166534"
                          : "#6D28D9",
                    }}
                  >
                    {moto.brand}
                  </span>
                  <span style={{ fontSize: "11px", color: "#94A3B8" }}>
                    {moto.reviewCount} reviews
                  </span>
                </div>
                <div className="text-right">
                  <p style={{ fontSize: "15px", fontWeight: 800, color: "#0F172A" }}>
                    {formatPrice(moto.price)}
                  </p>
                  <p style={{ fontSize: "10px", color: "#94A3B8" }}>per day</p>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center py-12">
              <span style={{ fontSize: "48px" }}>🔍</span>
              <p style={{ fontSize: "15px", fontWeight: 600, color: "#374151", marginTop: "12px" }}>
                No results found
              </p>
              <p style={{ fontSize: "13px", color: "#94A3B8", marginTop: "4px" }}>
                Try a different keyword or category
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
