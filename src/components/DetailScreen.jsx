import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Star,
  Heart,
  Share2,
  Gauge,
  Zap,
  Fuel,
  Settings,
  CheckCircle2,
  MapPin,
  ChevronDown,
} from "lucide-react";
import { getMotorcycleById, formatPrice } from "../data/motorcycles";

const REVIEWS = [
  { name: "Andi R.", avatar: "AR", color: "#3B82F6", rating: 5, text: "Smooth ride, well-maintained bike. Absolutely loved it for a Bali trip!", date: "Apr 28, 2025" },
  { name: "Maya S.", avatar: "MS", color: "#8B5CF6", rating: 5, text: "Easy pickup and drop-off. The motorcycle was in perfect condition.", date: "Apr 20, 2025" },
  { name: "Dimas P.", avatar: "DP", color: "#10B981", rating: 4, text: "Great value for money. Will definitely rent again next vacation.", date: "Apr 10, 2025" },
];

export function DetailScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [liked, setLiked] = useState(false);
  const [showFullDesc, setShowFullDesc] = useState(false);

  const moto = getMotorcycleById(id ?? "");

  if (!moto) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-white">
        <p style={{ fontSize: "48px" }}>😕</p>
        <p className="text-gray-500 mt-2">Motorcycle not found</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-6 py-3 rounded-xl text-white"
          style={{ background: "#1D4ED8" }}
        >
          Go Back
        </button>
      </div>
    );
  }

  const specs = [
    { icon: <Gauge size={17} />, label: "Engine", value: `${moto.engineCC}cc` },
    { icon: <Zap size={17} />, label: "Top Speed", value: `${moto.maxSpeed}km/h` },
    { icon: <Fuel size={17} />, label: "Fuel", value: moto.fuelType },
    { icon: <Settings size={17} />, label: "Gearbox", value: moto.transmission },
  ];

  const desc = moto.description;
  const shortDesc = desc.slice(0, 100) + (desc.length > 100 ? "..." : "");

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ fontFamily: "Poppins, sans-serif", background: "#F1F5F9" }}
    >
      {/* Hero Image */}
      <div className="relative flex-shrink-0" style={{ height: "280px" }}>
        <img src={moto.image} alt={moto.name} className="w-full h-full object-cover" 
          style={{ 
            objectPosition: "center 70%",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, transparent 45%, rgba(0,0,0,0.5) 100%)",
          }}
        />

        {/* Controls */}
        <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}
          >
            <ArrowLeft size={18} color="#0F172A" />
          </button>
          <div className="flex gap-2">
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}
            >
              <Share2 size={16} color="#0F172A" />
            </button>
            <button
              onClick={() => setLiked(!liked)}
              className="w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: liked ? "#FEE2E2" : "rgba(255,255,255,0.9)", backdropFilter: "blur(8px)" }}
            >
              <Heart size={16} color={liked ? "#EF4444" : "#0F172A"} fill={liked ? "#EF4444" : "none"} />
            </button>
          </div>
        </div>

        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
          <div className="flex items-end justify-between">
            <div>
              <span
                className="inline-block px-2 py-0.5 rounded-full mb-1"
                style={{
                  fontSize: "10px",
                  fontWeight: 700,
                  background: moto.available ? "#DCFCE7" : "#FEE2E2",
                  color: moto.available ? "#15803D" : "#DC2626",
                }}
              >
                {moto.available ? "● Available Now" : "● Unavailable"}
              </span>
              <p style={{ fontSize: "22px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1 }}>
                {moto.name}
              </p>
              <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)", marginTop: "2px" }}>
                {moto.year} Model · {moto.color}
              </p>
            </div>
            <div
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.92)" }}
            >
              <Star size={13} fill="#F59E0B" color="#F59E0B" />
              <span style={{ fontSize: "14px", fontWeight: 800, color: "#0F172A" }}>{moto.rating}</span>
              <span style={{ fontSize: "11px", color: "#64748B" }}>({moto.reviewCount})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div
        className="flex-1 overflow-y-auto"
        style={{ background: "#F1F5F9", borderRadius: "24px 24px 0 0", marginTop: "-16px" }}
      >
        {/* Price Row */}
        <div
          className="mx-4 mt-4 px-4 py-3 flex items-center justify-between"
          style={{ background: "#FFFFFF", borderRadius: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
          <div>
            <p style={{ fontSize: "11px", color: "#94A3B8" }}>Rental Price</p>
            <p style={{ fontSize: "22px", fontWeight: 800, color: "#1D4ED8", lineHeight: 1.1 }}>
              {formatPrice(moto.price)}
              <span style={{ fontSize: "12px", fontWeight: 400, color: "#94A3B8" }}>/day</span>
            </p>
          </div>
          <div className="text-right">
            <p style={{ fontSize: "11px", color: "#94A3B8" }}>Stock</p>
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A" }}>
              {moto.stock} unit{moto.stock > 1 ? "s" : ""}
            </p>
          </div>
        </div>

        {/* Specs */}
        <div className="px-4 pt-4">
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", marginBottom: "12px" }}>
            Specifications
          </p>
          <div className="grid grid-cols-4 gap-2">
            {specs.map((s) => (
              <div
                key={s.label}
                className="flex flex-col items-center gap-1.5 py-3"
                style={{ background: "#FFFFFF", borderRadius: "14px", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: "#EFF6FF", color: "#1D4ED8" }}
                >
                  {s.icon}
                </div>
                <p style={{ fontSize: "11px", fontWeight: 700, color: "#0F172A" }}>{s.value}</p>
                <p style={{ fontSize: "9px", color: "#94A3B8", fontWeight: 500 }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Engine Type row */}
        <div className="px-4 pt-3">
          <div
            className="px-4 py-3 flex items-center gap-3"
            style={{ background: "#EFF6FF", borderRadius: "12px" }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
              style={{ background: "#1D4ED8" }}
            >
              <Settings size={15} color="#FFFFFF" />
            </div>
            <div>
              <p style={{ fontSize: "10px", color: "#94A3B8" }}>Engine Type</p>
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>{moto.engineType}</p>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-4 pt-4">
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", marginBottom: "8px" }}>
            About This Bike
          </p>
          <p style={{ fontSize: "13px", color: "#64748B", lineHeight: 1.65 }}>
            {showFullDesc ? desc : shortDesc}
          </p>
          <button
            onClick={() => setShowFullDesc(!showFullDesc)}
            className="flex items-center gap-1 mt-1"
            style={{ fontSize: "12px", color: "#1D4ED8", fontWeight: 600 }}
          >
            {showFullDesc ? "Show less" : "Read more"}
            <ChevronDown size={14} style={{ transform: showFullDesc ? "rotate(180deg)" : "none" }} />
          </button>
        </div>

        {/* Features */}
        <div className="px-4 pt-4">
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", marginBottom: "10px" }}>
            Key Features
          </p>
          <div className="grid grid-cols-1 gap-2">
            {moto.features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <CheckCircle2 size={15} color="#1D4ED8" />
                <span style={{ fontSize: "13px", color: "#374151" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <div className="px-4 pt-4">
          <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A", marginBottom: "10px" }}>
            Pickup Location
          </p>
          <div
            className="flex items-center gap-3 px-4 py-3"
            style={{ background: "#FFFFFF", borderRadius: "14px", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: "#FEE2E2" }}
            >
              <MapPin size={16} color="#EF4444" />
            </div>
            <div className="flex-1">
              <p style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>MotoZone Rental Hub</p>
              <p style={{ fontSize: "11px", color: "#94A3B8" }}>Jl. Sunset Road No. 88, Kuta, Bali</p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="px-4 pt-4 pb-2">
          <div className="flex items-center justify-between mb-3">
            <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A" }}>Reviews</p>
            <button style={{ fontSize: "12px", color: "#1D4ED8", fontWeight: 500 }}>See All</button>
          </div>

          {/* Rating Summary */}
          <div
            className="flex items-center gap-4 px-4 py-3 mb-3"
            style={{ background: "#EFF6FF", borderRadius: "14px" }}
          >
            <div className="text-center">
              <p style={{ fontSize: "32px", fontWeight: 800, color: "#1D4ED8", lineHeight: 1 }}>
                {moto.rating}
              </p>
              <div className="flex gap-0.5 justify-center mt-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    size={10}
                    fill={s <= Math.floor(moto.rating) ? "#F59E0B" : "none"}
                    color={s <= Math.floor(moto.rating) ? "#F59E0B" : "#CBD5E1"}
                  />
                ))}
              </div>
              <p style={{ fontSize: "10px", color: "#64748B", marginTop: "4px" }}>
                {moto.reviewCount} reviews
              </p>
            </div>
            <div className="flex-1">
              {[5, 4, 3, 2, 1].map((star) => {
                const p = star === 5 ? 68 : star === 4 ? 22 : star === 3 ? 7 : 2;
                return (
                  <div key={star} className="flex items-center gap-2 mb-1">
                    <span style={{ fontSize: "10px", color: "#64748B", width: "8px" }}>{star}</span>
                    <div className="flex-1 rounded-full overflow-hidden" style={{ height: "5px", background: "#DBEAFE" }}>
                      <div style={{ width: `${p}%`, height: "100%", background: "#1D4ED8", borderRadius: "99px" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {REVIEWS.map((r, i) => (
            <div
              key={i}
              className="p-4 mb-3"
              style={{ background: "#FFFFFF", borderRadius: "14px", boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white flex-shrink-0"
                    style={{ background: r.color, fontSize: "11px", fontWeight: 700 }}
                  >
                    {r.avatar}
                  </div>
                  <div>
                    <p style={{ fontSize: "13px", fontWeight: 600, color: "#0F172A" }}>{r.name}</p>
                    <p style={{ fontSize: "10px", color: "#94A3B8" }}>{r.date}</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={10} fill={s <= r.rating ? "#F59E0B" : "none"} color={s <= r.rating ? "#F59E0B" : "#CBD5E1"} />
                  ))}
                </div>
              </div>
              <p style={{ fontSize: "12px", color: "#64748B", lineHeight: 1.55 }}>{r.text}</p>
            </div>
          ))}
        </div>

        {/* Bottom spacer */}
        <div style={{ height: "100px" }} />
      </div>

      {/* CTA Bar */}
      <div
        className="flex-shrink-0 px-4 py-3 flex items-center gap-3"
        style={{
          background: "#FFFFFF",
          borderTop: "1px solid #F1F5F9",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
          paddingBottom: "16px",
        }}
      >
        <div>
          <p style={{ fontSize: "10px", color: "#94A3B8" }}>Price / Day</p>
          <p style={{ fontSize: "18px", fontWeight: 800, color: "#1D4ED8", lineHeight: 1 }}>
            {formatPrice(moto.price)}
          </p>
        </div>
        <button
          onClick={() => moto.available && navigate(`/booking/${moto.id}`)}
          className="flex-1 flex items-center justify-center"
          style={{
            height: "48px",
            borderRadius: "14px",
            background: moto.available
              ? "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)"
              : "#E2E8F0",
            color: moto.available ? "#FFFFFF" : "#94A3B8",
            fontSize: "14px",
            fontWeight: 700,
            boxShadow: moto.available ? "0 4px 16px rgba(29,78,216,0.3)" : "none",
            cursor: moto.available ? "pointer" : "not-allowed",
          }}
        >
          {moto.available ? "Rent Now 🏍️" : "Unavailable"}
        </button>
      </div>
    </div>
  );
}
