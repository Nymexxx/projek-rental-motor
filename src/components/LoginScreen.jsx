import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Bike } from "lucide-react";

export function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("pandu@motozone.id");
  const [password, setPassword] = useState("pandu123");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Invalid email format";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Minimum 6 characters";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("moto_auth", JSON.stringify({ name: "Pandu Ariffalah", email }));
      setLoading(false);
      navigate("/");
    }, 1200);
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-y-auto" style={{ fontFamily: "Poppins, sans-serif" }}>
      {/* Blue Gradient Hero */}
      <div
        className="flex flex-col items-center justify-center px-6 pb-8"
        style={{
          background: "linear-gradient(150deg, #0F172A 0%, #1D4ED8 55%, #3B82F6 100%)",
          paddingTop: "56px",
          minHeight: "260px",
        }}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)" }}
          >
            <Bike size={26} color="#FFFFFF" />
          </div>
          <div>
            <p style={{ fontSize: "22px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1 }}>
              MotoZone
            </p>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.7)", letterSpacing: "0.08em" }}>
              RENTAL MOTOR
            </p>
          </div>
        </div>
        <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.75)", marginTop: "8px" }}>
          Menuju Tak Terbatas Dan Melampauinya 🏍️
        </p>
      </div>

      {/* Form Card */}
      <div
        className="flex-1 px-5 pt-7 pb-8"
        style={{ background: "#F8FAFC", borderRadius: "28px 28px 0 0", marginTop: "-20px" }}
      >
        <p style={{ fontSize: "20px", fontWeight: 700, color: "#0F172A", marginBottom: "6px" }}>
          SELAMAT DATANG
        </p>
        <p style={{ fontSize: "13px", color: "#64748B", marginBottom: "24px" }}>
          Sign in to continue your rental journey
        </p>

        {/* Email */}
        <div className="mb-4">
          <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151", display: "block", marginBottom: "6px" }}>
            Email Address
          </label>
          <div
            className="flex items-center gap-3 px-4"
            style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              border: errors.email ? "1.5px solid #EF4444" : "1.5px solid #E2E8F0",
              height: "50px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <Mail size={17} color={errors.email ? "#EF4444" : "#94A3B8"} />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
              placeholder="your@email.com"
              className="flex-1 outline-none bg-transparent"
              style={{ fontSize: "14px", color: "#0F172A" }}
            />
          </div>
          {errors.email && (
            <p style={{ fontSize: "11px", color: "#EF4444", marginTop: "4px" }}>{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-1.5">
            <label style={{ fontSize: "12px", fontWeight: 600, color: "#374151" }}>Password</label>
            <button style={{ fontSize: "12px", color: "#1D4ED8", fontWeight: 500 }}>
              Forgot Password?
            </button>
          </div>
          <div
            className="flex items-center gap-3 px-4"
            style={{
              background: "#FFFFFF",
              borderRadius: "12px",
              border: errors.password ? "1.5px solid #EF4444" : "1.5px solid #E2E8F0",
              height: "50px",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <Lock size={17} color={errors.password ? "#EF4444" : "#94A3B8"} />
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => { setPassword(e.target.value); setErrors((p) => ({ ...p, password: undefined })); }}
              placeholder="Enter your password"
              className="flex-1 outline-none bg-transparent"
              style={{ fontSize: "14px", color: "#0F172A" }}
            />
            <button onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={17} color="#94A3B8" /> : <Eye size={17} color="#94A3B8" />}
            </button>
          </div>
          {errors.password && (
            <p style={{ fontSize: "11px", color: "#EF4444", marginTop: "4px" }}>{errors.password}</p>
          )}
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full flex items-center justify-center"
          style={{
            height: "52px",
            borderRadius: "14px",
            background: loading ? "#93C5FD" : "linear-gradient(135deg, #1D4ED8 0%, #3B82F6 100%)",
            color: "#FFFFFF",
            fontSize: "15px",
            fontWeight: 700,
            boxShadow: "0 4px 16px rgba(29,78,216,0.35)",
            transition: "all 0.2s",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span
                className="inline-block w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"
              />
              Signing in...
            </span>
          ) : (
            "Sign In"
          )}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-5">
          <div style={{ flex: 1, height: "1px", background: "#E2E8F0" }} />
          <span style={{ fontSize: "12px", color: "#94A3B8", fontWeight: 500 }}>or continue with</span>
          <div style={{ flex: 1, height: "1px", background: "#E2E8F0" }} />
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            {
              name: "Google",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
              ),
            },
            {
              name: "Apple",
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0F172A">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.7 9.05 7.4c1.29.07 2.17.79 2.95.8.98-.2 1.94-.93 3.26-.75 1.56.23 2.73.96 3.49 2.35-3.18 1.9-2.4 5.8.3 7.2-.52 1.36-1.22 2.69-2 3.28zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                </svg>
              ),
            },
          ].map((social) => (
            <button
              key={social.name}
              className="flex items-center justify-center gap-2"
              style={{
                height: "46px",
                borderRadius: "12px",
                background: "#FFFFFF",
                border: "1.5px solid #E2E8F0",
                fontSize: "13px",
                fontWeight: 600,
                color: "#374151",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              {social.icon}
              {social.name}
            </button>
          ))}
        </div>

        {/* Register Link */}
        <p className="text-center" style={{ fontSize: "13px", color: "#64748B" }}>
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            style={{ color: "#1D4ED8", fontWeight: 700 }}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
