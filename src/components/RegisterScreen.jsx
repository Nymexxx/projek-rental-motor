import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User, Phone, ArrowLeft, Bike } from "lucide-react";

export function RegisterScreen() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const update = (field, value) =>
    setForm((p) => ({ ...p, [field]: value }));

  const handleRegister = () => {
    if (!agreed) return;
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("moto_auth", JSON.stringify({ name: form.name || "New User", email: form.email }));
      setLoading(false);
      navigate("/");
    }, 1200);
  };

  const isValid =
    form.name.length > 2 &&
    /\S+@\S+\.\S+/.test(form.email) &&
    form.phone.length >= 8 &&
    form.password.length >= 6 &&
    form.password === form.confirm &&
    agreed;

  const InputRow = ({
    icon,
    placeholder,
    value,
    onChange,
    type = "text",
    rightEl,
  }) => (
    <div
      className="flex items-center gap-3 px-4 mb-3"
      style={{
        background: "#FFFFFF",
        borderRadius: "12px",
        border: "1.5px solid #E2E8F0",
        height: "50px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <span className="flex-shrink-0" style={{ color: "#94A3B8" }}>{icon}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 outline-none bg-transparent"
        style={{ fontSize: "14px", color: "#0F172A" }}
      />
      {rightEl}
    </div>
  );

  return (
    <div className="h-full flex flex-col bg-white overflow-y-auto" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Top */}
      <div
        className="flex flex-col px-5 pb-6"
        style={{
          background: "linear-gradient(150deg, #0F172A 0%, #1D4ED8 55%, #3B82F6 100%)",
          paddingTop: "56px",
          minHeight: "200px",
        }}
      >
        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 mb-4"
          style={{ color: "rgba(255,255,255,0.8)", width: "fit-content" }}
        >
          <ArrowLeft size={18} />
          <span style={{ fontSize: "13px" }}>Back to Login</span>
        </button>

        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)" }}
          >
            <Bike size={22} color="#FFFFFF" />
          </div>
          <div>
            <p style={{ fontSize: "20px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1 }}>
              Create Account
            </p>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)" }}>
              Join MotoZone today 🏍️
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div
        className="flex-1 px-5 pt-7 pb-8"
        style={{ background: "#F8FAFC", borderRadius: "28px 28px 0 0", marginTop: "-16px" }}
      >
        <p style={{ fontSize: "15px", fontWeight: 700, color: "#0F172A", marginBottom: "18px" }}>
          Your Information
        </p>

        {/* Full Name */}
        <div className="mb-1">
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
            Full Name
          </label>
        </div>
        <InputRow
          icon={<User size={17} />}
          placeholder="Budi Santoso"
          value={form.name}
          onChange={(v) => update("name", v)}
        />

        {/* Email */}
        <div className="mb-1 mt-1">
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
            Email Address
          </label>
        </div>
        <InputRow
          icon={<Mail size={17} />}
          placeholder="your@email.com"
          value={form.email}
          onChange={(v) => update("email", v)}
          type="email"
        />

        {/* Phone */}
        <div className="mb-1 mt-1">
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
            Phone Number
          </label>
        </div>
        <InputRow
          icon={<Phone size={17} />}
          placeholder="+62 812-xxxx-xxxx"
          value={form.phone}
          onChange={(v) => update("phone", v)}
          type="tel"
        />

        {/* Password */}
        <div className="mb-1 mt-1">
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
            Password
          </label>
        </div>
        <InputRow
          icon={<Lock size={17} />}
          placeholder="Minimum 6 characters"
          value={form.password}
          onChange={(v) => update("password", v)}
          type={showPass ? "text" : "password"}
          rightEl={
            <button onClick={() => setShowPass(!showPass)}>
              {showPass ? <EyeOff size={17} color="#94A3B8" /> : <Eye size={17} color="#94A3B8" />}
            </button>
          }
        />

        {/* Confirm Password */}
        <div className="mb-1 mt-1">
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
            Confirm Password
          </label>
        </div>
        <InputRow
          icon={<Lock size={17} />}
          placeholder="Re-enter password"
          value={form.confirm}
          onChange={(v) => update("confirm", v)}
          type={showConfirm ? "text" : "password"}
          rightEl={
            <button onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <EyeOff size={17} color="#94A3B8" /> : <Eye size={17} color="#94A3B8" />}
            </button>
          }
        />

        {/* Password mismatch */}
        {form.confirm && form.password !== form.confirm && (
          <p style={{ fontSize: "11px", color: "#EF4444", marginTop: "-8px", marginBottom: "12px" }}>
            Passwords don't match
          </p>
        )}

        {/* Terms */}
        <div className="flex items-start gap-3 mt-4 mb-5">
          <button
            onClick={() => setAgreed(!agreed)}
            className="flex-shrink-0 w-5 h-5 rounded flex items-center justify-center mt-0.5"
            style={{
              background: agreed ? "#1D4ED8" : "#FFFFFF",
              border: agreed ? "none" : "1.5px solid #CBD5E1",
            }}
          >
            {agreed && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6L5 9L10 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
          <p style={{ fontSize: "12px", color: "#64748B", lineHeight: 1.5 }}>
            I agree to MotoZone's{" "}
            <span style={{ color: "#1D4ED8", fontWeight: 600 }}>Terms of Service</span> and{" "}
            <span style={{ color: "#1D4ED8", fontWeight: 600 }}>Privacy Policy</span>
          </p>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={!isValid || loading}
          className="w-full flex items-center justify-center"
          style={{
            height: "52px",
            borderRadius: "14px",
            background:
              isValid && !loading
                ? "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)"
                : "#CBD5E1",
            color: isValid ? "#FFFFFF" : "#94A3B8",
            fontSize: "15px",
            fontWeight: 700,
            boxShadow: isValid ? "0 4px 16px rgba(29,78,216,0.35)" : "none",
            cursor: isValid && !loading ? "pointer" : "not-allowed",
          }}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Creating account...
            </span>
          ) : (
            "Create Account"
          )}
        </button>

        {/* Login Link */}
        <p className="text-center mt-5" style={{ fontSize: "13px", color: "#64748B" }}>
          Already have an account?{" "}
          <button onClick={() => navigate("/login")} style={{ color: "#1D4ED8", fontWeight: 700 }}>
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}
