import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  CreditCard,
  ChevronRight,
  CheckCircle2,
  Star,
  Tag,
  Smartphone,
  Banknote,
  Building2,
} from "lucide-react";
import { getMotorcycleById, formatPrice } from "../data/motorcycles";

const PAYMENT_METHODS = [
  { id: "gopay", label: "GoPay", icon: <Smartphone size={18} color="#00AA5B" />, color: "#00AA5B", bg: "#E8FDF0" },
  { id: "ovo", label: "OVO", icon: <Smartphone size={18} color="#4C3494" />, color: "#4C3494", bg: "#F0EDFC" },
  { id: "transfer", label: "Bank Transfer", icon: <Building2 size={18} color="#1D4ED8" />, color: "#1D4ED8", bg: "#EFF6FF" },
  { id: "cash", label: "Cash on Pickup", icon: <Banknote size={18} color="#16A34A" />, color: "#16A34A", bg: "#F0FDF4" },
  { id: "card", label: "Credit / Debit Card", icon: <CreditCard size={18} color="#6D28D9" />, color: "#6D28D9", bg: "#F5F3FF" },
];

const LOCATIONS = [
  "Kuta Branch – Jl. Sunset Road No. 88",
  "Seminyak Branch – Jl. Raya Seminyak No. 12",
  "Ubud Branch – Jl. Monkey Forest No. 5",
  "Canggu Branch – Jl. Batu Bolong No. 47",
];

const DURATIONS = [1, 2, 3, 5, 7];

export function BookingScreen() {
  const { id } = useParams();
  const navigate = useNavigate();
  const moto = getMotorcycleById(id || "");

  const today = new Date().toISOString().split("T")[0];

  const [step, setStep] = useState("form");
  const [startDate, setStartDate] = useState(today);
  const [duration, setDuration] = useState(1);
  const [location, setLocation] = useState(LOCATIONS[0]);
  const [payment, setPayment] = useState("gopay");
  const [promo, setPromo] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoErr, setPromoErr] = useState("");

  if (!moto) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Not found</p>
      </div>
    );
  }

  const endDate = (() => {
    const d = new Date(startDate);
    d.setDate(d.getDate() + duration);
    return d.toISOString().split("T")[0];
  })();

  const subtotal = moto.price * duration;
  const serviceFee = 15000;
  const discount = promoApplied ? Math.floor(subtotal * 0.1) : 0;
  const total = subtotal + serviceFee - discount;

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === "MOTO10") {
      setPromoApplied(true);
      setPromoErr("");
    } else {
      setPromoApplied(false);
      setPromoErr("Invalid promo code. Try MOTO10");
    }
  };

  const orderId = `MZ-${Math.random().toString(36).substr(2, 8).toUpperCase()}`;

  if (step === "success") {
    return (
      <div
        className="h-full flex flex-col items-center justify-center px-6 text-center"
        style={{ fontFamily: "Poppins, sans-serif", background: "#F8FAFC" }}
      >
        {/* Success Icon */}
        <div
          className="w-24 h-24 rounded-full flex items-center justify-center mb-5"
          style={{ background: "linear-gradient(135deg, #DCFCE7, #BBF7D0)" }}
        >
          <CheckCircle2 size={52} color="#16A34A" />
        </div>
        <p style={{ fontSize: "22px", fontWeight: 800, color: "#0F172A", lineHeight: 1.3 }}>
          Booking Confirmed! 🎉
        </p>
        <p style={{ fontSize: "13px", color: "#64748B", marginTop: "8px", marginBottom: "28px", lineHeight: 1.6 }}>
          Your {moto.name} is booked for {duration} day{duration > 1 ? "s" : ""}. We'll send the details to your phone.
        </p>

        {/* Order Card */}
        <div
          className="w-full p-5 mb-5 text-left"
          style={{
            background: "#FFFFFF",
            borderRadius: "20px",
            boxShadow: "0 2px 16px rgba(0,0,0,0.08)",
          }}
        >
          <div className="flex items-center gap-3 mb-4 pb-4" style={{ borderBottom: "1px dashed #E2E8F0" }}>
            <img
              src={moto.image}
              alt={moto.name}
              className="w-16 h-14 rounded-2xl object-cover flex-shrink-0"
              style={{
                objectPosition: "center 75%",
              }}
            />
            <div>
              <p style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A" }}>{moto.name}</p>
              <div className="flex items-center gap-1 mt-0.5">
                <Star size={10} fill="#F59E0B" color="#F59E0B" />
                <span style={{ fontSize: "11px", color: "#64748B" }}>{moto.rating} · {moto.reviewCount} reviews</span>
              </div>
            </div>
          </div>
          {[
            { label: "Order ID", value: orderId },
            { label: "Pickup Date", value: startDate },
            { label: "Return Date", value: endDate },
            { label: "Duration", value: `${duration} day${duration > 1 ? "s" : ""}` },
            { label: "Payment", value: PAYMENT_METHODS.find((p) => p.id === payment)?.label ?? payment },
            { label: "Total Paid", value: formatPrice(total), bold: true, blue: true },
          ].map((row) => (
            <div key={row.label} className="flex justify-between items-center mb-2">
              <span style={{ fontSize: "12px", color: "#94A3B8" }}>{row.label}</span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: row.bold ? 800 : 500,
                  color: row.blue ? "#1D4ED8" : "#0F172A",
                }}
              >
                {row.value}
              </span>
            </div>
          ))}
        </div>

        <button
          onClick={() => navigate("/")}
          className="w-full flex items-center justify-center"
          style={{
            height: "50px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)",
            color: "#FFFFFF",
            fontSize: "14px",
            fontWeight: 700,
            boxShadow: "0 4px 16px rgba(29,78,216,0.3)",
          }}
        >
          Back to Home
        </button>
        <button
          onClick={() => navigate("/orders")}
          className="w-full flex items-center justify-center mt-3"
          style={{
            height: "48px",
            borderRadius: "14px",
            background: "#F1F5F9",
            color: "#374151",
            fontSize: "14px",
            fontWeight: 600,
          }}
        >
          View My Orders
        </button>
      </div>
    );
  }

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ fontFamily: "Poppins, sans-serif", background: "#F1F5F9" }}
    >
      {/* Header */}
      <div
        className="flex-shrink-0 px-4 pb-4"
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1D4ED8 70%, #3B82F6 100%)",
          paddingTop: "16px",
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => (step === "review" ? setStep("form") : navigate(-1))}
            className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <ArrowLeft size={18} color="#FFFFFF" />
          </button>
          <div className="flex-1">
            <p style={{ fontSize: "16px", fontWeight: 700, color: "#FFFFFF" }}>
              {step === "review" ? "Review Booking" : "Book a Ride"}
            </p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.65)" }}>Step {step === "review" ? "2" : "1"} of 2</p>
          </div>
        </div>
        {/* Progress */}
        <div className="flex gap-2 mt-4">
          <div className="flex-1 h-1 rounded-full" style={{ background: "#FFFFFF" }} />
          <div
            className="flex-1 h-1 rounded-full"
            style={{ background: step === "review" ? "#FFFFFF" : "rgba(255,255,255,0.3)" }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* Bike Summary */}
        <div
          className="mx-4 mt-4 p-3 flex items-center gap-3"
          style={{ background: "#FFFFFF", borderRadius: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
        >
          <img
            src={moto.image}
            alt={moto.name}
            className="w-20 h-14 rounded-xl object-cover flex-shrink-0"
            style={{
              objectPosition: "center 75%",
            }}
          />
          <div className="flex-1 min-w-0">
            <p
              className="truncate"
              style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A" }}
            >
              {moto.name}
            </p>
            <p style={{ fontSize: "11px", color: "#94A3B8" }}>{moto.engineCC}cc · {moto.transmission} · {moto.year}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p style={{ fontSize: "13px", fontWeight: 800, color: "#1D4ED8" }}>{formatPrice(moto.price)}</p>
            <p style={{ fontSize: "10px", color: "#94A3B8" }}>/day</p>
          </div>
        </div>

        {step === "form" && (
          <div className="px-4 pt-4 pb-2 flex flex-col gap-4">
            {/* Dates */}
            <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A", marginBottom: "12px" }}>
                Rental Date
              </p>
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1">
                  <label style={{ fontSize: "10px", fontWeight: 600, color: "#94A3B8", display: "block", marginBottom: "4px" }}>
                    PICKUP
                  </label>
                  <div
                    className="flex items-center gap-2 px-3"
                    style={{
                      background: "#F8FAFC",
                      border: "1.5px solid #E2E8F0",
                      borderRadius: "12px",
                      height: "44px",
                    }}
                  >
                    <CalendarDays size={15} color="#1D4ED8" />
                    <input
                      type="date"
                      value={startDate}
                      min={today}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="flex-1 outline-none bg-transparent"
                      style={{ fontSize: "12px", color: "#0F172A" }}
                    />
                  </div>
                </div>
                <ChevronRight size={16} color="#CBD5E1" className="flex-shrink-0 mt-4" />
                <div className="flex-1">
                  <label style={{ fontSize: "10px", fontWeight: 600, color: "#94A3B8", display: "block", marginBottom: "4px" }}>
                    RETURN
                  </label>
                  <div
                    className="flex items-center gap-2 px-3"
                    style={{
                      background: "#F8FAFC",
                      border: "1.5px solid #E2E8F0",
                      borderRadius: "12px",
                      height: "44px",
                    }}
                  >
                    <CalendarDays size={15} color="#94A3B8" />
                    <input
                      type="text"
                      value={endDate}
                      readOnly
                      className="flex-1 outline-none bg-transparent"
                      style={{ fontSize: "12px", color: "#0F172A" }}
                    />
                  </div>
                </div>
              </div>

              {/* Duration Picker */}
              <label style={{ fontSize: "10px", fontWeight: 600, color: "#94A3B8", display: "block", marginBottom: "8px" }}>
                DURATION (DAYS)
              </label>
              <div className="flex gap-2">
                {DURATIONS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setDuration(d)}
                    className="flex-1 flex items-center justify-center"
                    style={{
                      height: "36px",
                      borderRadius: "10px",
                      fontSize: "13px",
                      fontWeight: 700,
                      background: duration === d ? "#1D4ED8" : "#F1F5F9",
                      color: duration === d ? "#FFFFFF" : "#64748B",
                      border: duration === d ? "none" : "1.5px solid transparent",
                      boxShadow: duration === d ? "0 2px 8px rgba(29,78,216,0.3)" : "none",
                    }}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            {/* Pickup Location */}
            <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A", marginBottom: "12px" }}>
                Pickup Location
              </p>
              <div className="flex flex-col gap-2">
                {LOCATIONS.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => setLocation(loc)}
                    className="flex items-center gap-3 px-3 py-2.5 text-left transition-all"
                    style={{
                      borderRadius: "12px",
                      background: location === loc ? "#EFF6FF" : "#F8FAFC",
                      border: location === loc ? "1.5px solid #93C5FD" : "1.5px solid transparent",
                    }}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: location === loc ? "#DBEAFE" : "#E2E8F0" }}
                    >
                      <MapPin size={13} color={location === loc ? "#1D4ED8" : "#94A3B8"} />
                    </div>
                    <span
                      style={{
                        fontSize: "12px",
                        fontWeight: location === loc ? 600 : 400,
                        color: location === loc ? "#1E3A8A" : "#374151",
                        flex: 1,
                      }}
                    >
                      {loc}
                    </span>
                    {location === loc && (
                      <CheckCircle2 size={14} color="#1D4ED8" className="flex-shrink-0" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A", marginBottom: "12px" }}>
                Payment Method
              </p>
              <div className="grid grid-cols-1 gap-2">
                {PAYMENT_METHODS.map((pm) => (
                  <button
                    key={pm.id}
                    onClick={() => setPayment(pm.id)}
                    className="flex items-center gap-3 px-3 py-3 text-left transition-all"
                    style={{
                      borderRadius: "12px",
                      background: payment === pm.id ? pm.bg : "#F8FAFC",
                      border: payment === pm.id ? `1.5px solid ${pm.color}40` : "1.5px solid transparent",
                    }}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ background: payment === pm.id ? pm.bg : "#E2E8F0" }}
                    >
                      {pm.icon}
                    </div>
                    <span
                      style={{
                        fontSize: "13px",
                        fontWeight: payment === pm.id ? 700 : 400,
                        color: payment === pm.id ? pm.color : "#374151",
                        flex: 1,
                      }}
                    >
                      {pm.label}
                    </span>
                    <div
                      className="w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0"
                      style={{
                        borderColor: payment === pm.id ? pm.color : "#CBD5E1",
                      }}
                    >
                      {payment === pm.id && (
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background: pm.color }}
                        />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Promo */}
            <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A", marginBottom: "12px" }}>
                Promo Code
              </p>
              <div className="flex gap-2">
                <div
                  className="flex-1 flex items-center gap-2 px-3"
                  style={{
                    background: "#F8FAFC",
                    border: "1.5px solid #E2E8F0",
                    borderRadius: "12px",
                    height: "44px",
                  }}
                >
                  <Tag size={15} color="#94A3B8" />
                  <input
                    type="text"
                    value={promo}
                    onChange={(e) => { setPromo(e.target.value); setPromoErr(""); setPromoApplied(false); }}
                    placeholder='Try "MOTO10"'
                    className="flex-1 outline-none bg-transparent"
                    style={{ fontSize: "13px", color: "#0F172A" }}
                  />
                </div>
                <button
                  onClick={applyPromo}
                  style={{
                    height: "44px",
                    borderRadius: "12px",
                    background: "#1D4ED8",
                    color: "#FFFFFF",
                    fontSize: "13px",
                    fontWeight: 700,
                    paddingInline: "16px",
                  }}
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="flex items-center gap-1 mt-2" style={{ fontSize: "12px", color: "#16A34A" }}>
                  <CheckCircle2 size={13} /> 10% discount applied!
                </p>
              )}
              {promoErr && (
                <p className="mt-2" style={{ fontSize: "12px", color: "#EF4444" }}>{promoErr}</p>
              )}
            </div>
          </div>
        )}

        {/* Review Step */}
        {step === "review" && (
          <div className="px-4 pt-4 pb-2 flex flex-col gap-4">
            {/* Summary */}
            <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A", marginBottom: "14px" }}>
                Booking Summary
              </p>
              {[
                { label: "Pickup Date", value: startDate },
                { label: "Return Date", value: endDate },
                { label: "Duration", value: `${duration} day${duration > 1 ? "s" : ""}` },
                { label: "Location", value: location },
                { label: "Payment", value: PAYMENT_METHODS.find((p) => p.id === payment)?.label ?? "" },
              ].map((row) => (
                <div key={row.label} className="flex justify-between items-start mb-3">
                  <span style={{ fontSize: "12px", color: "#94A3B8" }}>{row.label}</span>
                  <span
                    className="text-right max-w-[55%]"
                    style={{ fontSize: "12px", fontWeight: 600, color: "#374151", lineHeight: 1.4 }}
                  >
                    {row.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div style={{ background: "#FFFFFF", borderRadius: "16px", padding: "16px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <p style={{ fontSize: "13px", fontWeight: 700, color: "#0F172A", marginBottom: "14px" }}>
                Price Breakdown
              </p>
              {[
               { label: `${formatPrice(moto.price)} × ${duration} day(s)`, value: formatPrice(subtotal) },
               { label: "Service Fee", value: formatPrice(serviceFee) },
               ...(promoApplied ? [
                 { label: "Promo (MOTO10)", value: `-${formatPrice(discount)}`, green: true }
                ] : []),
              ].map((row, i) => (
                 <div key={i} className="flex justify-between items-center mb-3">
                   <span style={{ fontSize: "12px", color: row.green ? "#16A34A" : "#64748B" }}>
                     {row.label}
                   </span>
                   <span style={{ fontSize: "12px", fontWeight: 600, color: row.green ? "#16A34A" : "#0F172A" }}>
                     {row.value}
                   </span>
                 </div>
               ))}
              <div
                className="flex justify-between items-center pt-3 mt-1"
                style={{ borderTop: "1.5px dashed #E2E8F0" }}
              >
                <span style={{ fontSize: "14px", fontWeight: 700, color: "#0F172A" }}>Total</span>
                <span style={{ fontSize: "18px", fontWeight: 800, color: "#1D4ED8" }}>{formatPrice(total)}</span>
              </div>
            </div>

            {/* Warning */}
            <div
              className="flex gap-3 px-4 py-3"
              style={{ background: "#FFFBEB", borderRadius: "12px", border: "1px solid #FDE68A" }}
            >
              <span style={{ fontSize: "16px" }}>⚠️</span>
              <p style={{ fontSize: "11px", color: "#92400E", lineHeight: 1.6 }}>
                Please bring a valid ID and driver's license upon pickup. Fuel is not included in the rental price.
              </p>
            </div>
          </div>
        )}

        <div style={{ height: "100px" }} />
      </div>

      {/* Bottom CTA */}
      <div
        className="flex-shrink-0 px-4 py-3"
        style={{
          background: "#FFFFFF",
          borderTop: "1px solid #F1F5F9",
          boxShadow: "0 -4px 20px rgba(0,0,0,0.06)",
          paddingBottom: "16px",
        }}
      >
        {step === "form" && (
          <div className="flex items-center justify-between mb-3">
            <div>
              <p style={{ fontSize: "10px", color: "#94A3B8" }}>Estimated Total</p>
              <p style={{ fontSize: "18px", fontWeight: 800, color: "#1D4ED8" }}>{formatPrice(total)}</p>
            </div>
            <p style={{ fontSize: "11px", color: "#94A3B8" }}>{duration} day{duration > 1 ? "s" : ""}</p>
          </div>
        )}
        <button
          onClick={() => {
            if (step === "form") setStep("review");
            else setStep("success");
          }}
          className="w-full flex items-center justify-center"
          style={{
            height: "50px",
            borderRadius: "14px",
            background: "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)",
            color: "#FFFFFF",
            fontSize: "14px",
            fontWeight: 700,
            boxShadow: "0 4px 16px rgba(29,78,216,0.3)",
          }}
        >
          {step === "review" ? `Confirm & Pay ${formatPrice(total)}` : "Review Booking →"}
        </button>
      </div>
    </div>
  );
}
