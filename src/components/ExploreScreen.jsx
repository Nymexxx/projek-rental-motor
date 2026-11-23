import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, SlidersHorizontal, Star } from "lucide-react";
import { MOTORCYCLES, formatPrice } from "../data/motorcycles";

export function ExploreScreen() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("rating");

  const filtered = MOTORCYCLES.filter(
    (m) =>
      m.name.toLowerCase().includes(query.toLowerCase()) ||
      m.brand.toLowerCase().includes(query.toLowerCase()) ||
      m.category.toLowerCase().includes(query.toLowerCase())
  ).sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return a.name.localeCompare(b.name);
  });

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
        <p style={{ fontSize: "20px", fontWeight: 800, color: "#FFFFFF", marginBottom: "14px" }}>
          Explore 🔍
        </p>
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
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Brand, model, category..."
            className="flex-1 outline-none bg-transparent"
            style={{ fontSize: "14px", color: "#0F172A" }}
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              style={{ fontSize: "13px", color: "#94A3B8" }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Sort */}
      <div className="flex-shrink-0 px-4 pt-3 pb-2 flex items-center justify-between">
        <p style={{ fontSize: "13px", fontWeight: 600, color: "#374151" }}>
          {filtered.length} result{filtered.length !== 1 ? "s" : ""}
        </p>
        <div className="flex items-center gap-2">
          <SlidersHorizontal size={14} color="#94A3B8" />
          <div className="flex gap-1">
            {(["rating", "price", "name"]).map((s) => (
              <button
                key={s}
                onClick={() => setSortBy(s)}
                className="px-3 py-1 rounded-full"
                style={{
                  fontSize: "11px",
                  fontWeight: 600,
                  background: sortBy === s ? "#1D4ED8" : "#FFFFFF",
                  color: sortBy === s ? "#FFFFFF" : "#64748B",
                  border: sortBy === s ? "none" : "1px solid #E2E8F0",
                }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto px-4 pb-24">
        <div className="flex flex-col gap-3">
          {filtered.map((moto) => (
            <div
              key={moto.id}
              onClick={() => navigate(`/detail/${moto.id}`)}
              className="flex gap-3 cursor-pointer"
              style={{
                background: "#FFFFFF",
                borderRadius: "16px",
                overflow: "hidden",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                padding: "0",
              }}
            >
              <div
                className="rounded-xl overflow-hidden bg-gray-100 flex-shrink-0"
                style={{
                  width: "140px",
                  height: "120px",
                }}
              >
                <img
                  src={moto.image}
                  alt={moto.name}
                  className="w-full h-full object-cover"
                  style={{
                    objectPosition: moto.imagePosition || "center 60%",
                  }}
                />
              </div>
              <div className="flex flex-col justify-center py-3 pr-3 flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p
                      className="truncate"
                      style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A" }}
                    >
                      {moto.name}
                    </p>
                    <p style={{ fontSize: "11px", color: "#94A3B8", marginTop: "1px" }}>
                      {moto.engineCC}cc · {moto.transmission} · {moto.year}
                    </p>
                  </div>
                  <div className="flex items-center gap-0.5 flex-shrink-0">
                    <Star size={10} fill="#F59E0B" color="#F59E0B" />
                    <span style={{ fontSize: "11px", fontWeight: 700, color: "#0F172A" }}>
                      {moto.rating}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mt-1.5">
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{ fontSize: "9px", fontWeight: 700, background: "#EFF6FF", color: "#1D4ED8" }}
                  >
                    {moto.category}
                  </span>
                  <span
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      fontSize: "9px",
                      fontWeight: 700,
                      background: moto.available ? "#DCFCE7" : "#FEE2E2",
                      color: moto.available ? "#15803D" : "#DC2626",
                    }}
                  >
                    {moto.available ? "Available" : "Unavailable"}
                  </span>
                </div>

                <div className="flex items-center justify-between mt-1.5">
                  <span style={{ fontSize: "14px", fontWeight: 800, color: "#1D4ED8" }}>
                    {formatPrice(moto.price)}
                    <span style={{ fontSize: "10px", fontWeight: 400, color: "#94A3B8" }}>/day</span>
                  </span>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="flex flex-col items-center py-12">
              <span style={{ fontSize: "48px" }}>🔍</span>
              <p style={{ fontSize: "14px", fontWeight: 600, color: "#374151", marginTop: "12px" }}>
                No results for "{query}"
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
