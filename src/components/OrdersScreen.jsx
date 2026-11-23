import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Star, ChevronRight, Package, ClipboardList } from "lucide-react";
import { ORDERS, STATUS_CONFIG, getOrderWithMoto } from "../data/orders";
import { formatPrice } from "../data/motorcycles";

export function OrdersScreen() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("active");
  const activeOrders = ORDERS.filter((o) => o.status === "active" || o.status === "pending");
  const historyOrders = ORDERS.filter((o) => o.status === "completed" || o.status === "cancelled");
  const shown = tab === "active" ? activeOrders : historyOrders;

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
        <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.6)", marginBottom: "2px" }}>
          MotoZone
        </p>
        <p style={{ fontSize: "20px", fontWeight: 800, color: "#FFFFFF", marginBottom: "16px" }}>
          My Orders
        </p>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Total Rides", value: ORDERS.length, icon: "🏍️" },
            { label: "Active", value: activeOrders.length, icon: "🟢" },
            { label: "Completed", value: historyOrders.filter((o) => o.status === "completed").length, icon: "✅" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center py-2.5 px-2"
              style={{ background: "rgba(255,255,255,0.12)", borderRadius: "12px" }}
            >
              <span style={{ fontSize: "16px" }}>{stat.icon}</span>
              <p style={{ fontSize: "18px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2 }}>
                {stat.value}
              </p>
              <p style={{ fontSize: "9px", color: "rgba(255,255,255,0.6)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tab Bar */}
      <div
        className="flex-shrink-0 mx-4 flex gap-1 p-1"
        style={{ background: "#FFFFFF", borderRadius: "14px", marginTop: "16px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      >
        {["active", "history"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5"
            style={{
              borderRadius: "10px",
              fontSize: "13px",
              fontWeight: 700,
              background: tab === t ? "#1D4ED8" : "transparent",
              color: tab === t ? "#FFFFFF" : "#94A3B8",
              transition: "all 0.2s",
              boxShadow: tab === t ? "0 2px 8px rgba(29,78,216,0.25)" : "none",
            }}
          >
            {t === "active" ? <ClipboardList size={14} /> : <Package size={14} />}
            {t === "active" ? `Active (${activeOrders.length})` : `History (${historyOrders.length})`}
          </button>
        ))}
      </div>

      {/* Order List */}
      <div className="flex-1 overflow-y-auto px-4 pt-3 pb-24">
        {shown.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16">
            <span style={{ fontSize: "56px" }}>📋</span>
            <p style={{ fontSize: "15px", fontWeight: 700, color: "#374151", marginTop: "12px" }}>
              No {tab === "active" ? "active" : "past"} orders
            </p>
            <p style={{ fontSize: "13px", color: "#94A3B8", marginTop: "4px" }}>
              {tab === "active" ? "Book a motorcycle to get started!" : "Your completed rentals will appear here."}
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-5 px-6 py-3"
              style={{
                borderRadius: "12px",
                background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                color: "#FFFFFF",
                fontSize: "13px",
                fontWeight: 700,
              }}
            >
              Browse Motorcycles
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {shown.map((order) => {
              const enriched = getOrderWithMoto(order);
              const moto = enriched.motorcycle;
              if (!moto) return null;
              const statusCfg = STATUS_CONFIG[order.status];

              return (
                <div
                  key={order.id}
                  onClick={() => navigate(`/detail/${moto.id}`)}
                  className="cursor-pointer"
                  style={{
                    background: "#FFFFFF",
                    borderRadius: "20px",
                    overflow: "hidden",
                    boxShadow: "0 2px 16px rgba(0,0,0,0.07)",
                  }}
                >
                  {/* Image Banner */}
                  <div className="relative" style={{ height: "120px" }}>
                    <img src={moto.image} alt={moto.name} className="w-full h-full object-cover" 
                    style={{ objectPosition: moto.imagePosition || "center" }}/>
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to right, rgba(0,0,0,0.6) 0%, transparent 60%)",
                      }}
                    />
                    <div className="absolute inset-0 p-4 flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <span
                          className="px-2.5 py-1 rounded-full"
                          style={{
                            fontSize: "10px",
                            fontWeight: 700,
                            background: statusCfg.bgColor,
                            color: statusCfg.textColor,
                          }}
                        >
                          ● {statusCfg.label}
                        </span>
                        {order.status === "active" && (
                          <span
                            className="px-2 py-1 rounded-full"
                            style={{ background: "#F59E0B", fontSize: "9px", fontWeight: 700, color: "#7C2D12" }}
                          >
                            IN PROGRESS
                          </span>
                        )}
                      </div>
                      <div>
                        <p style={{ fontSize: "16px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.2 }}>
                          {moto.name}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star size={10} fill="#F59E0B" color="#F59E0B" />
                          <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.8)" }}>
                            {moto.rating} · {moto.reviewCount} reviews
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="px-4 py-3">
                    {/* Order ID + Arrow */}
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className="px-2 py-0.5 rounded"
                        style={{ fontSize: "10px", fontWeight: 700, background: "#EFF6FF", color: "#1D4ED8" }}
                      >
                        {order.id}
                      </span>
                      <ChevronRight size={15} color="#CBD5E1" />
                    </div>

                    {/* Date Row */}
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {[
                        { label: "Pickup", value: order.startDate },
                        { label: "Return", value: order.endDate },
                        { label: "Duration", value: `${order.days}d` },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="flex flex-col items-center py-2"
                          style={{ background: "#F8FAFC", borderRadius: "10px" }}
                        >
                          <p style={{ fontSize: "10px", color: "#94A3B8" }}>{item.label}</p>
                          <p style={{ fontSize: "12px", fontWeight: 700, color: "#0F172A" }}>{item.value}</p>
                        </div>
                      ))}
                    </div>

                    {/* Bottom Row */}
                    <div className="flex items-center justify-between">
                      <span
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg"
                        style={{ background: "#F1F5F9", fontSize: "11px", color: "#374151", fontWeight: 500 }}
                      >
                        💳 {order.paymentMethod}
                      </span>
                      <span style={{ fontSize: "15px", fontWeight: 800, color: "#0F172A" }}>
                        {formatPrice(order.totalPrice)}
                      </span>
                    </div>

                    {/* Active Order CTA */}
                    {order.status === "active" && (
                      <button
                        className="w-full flex items-center justify-center mt-3"
                        style={{
                          height: "38px",
                          borderRadius: "10px",
                          background: "linear-gradient(135deg, #1D4ED8, #3B82F6)",
                          color: "#FFFFFF",
                          fontSize: "12px",
                          fontWeight: 700,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        Track My Rental
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
