import { useState, useRef } from "react";
import API from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";
import "../../index.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  // prevents StrictMode double call
  const loginLock = useRef(false);

  const login = async () => {
    // BLOCK duplicate calls
    if (loading || cooldown > 0 || loginLock.current) return;

    loginLock.current = true;
    setLoading(true);
    setError("");

    try {
      const res = await API.post("login/", {
        email,
        password,
      });

      // store auth
      localStorage.setItem("access", res.data.access);
      localStorage.setItem("refresh", res.data.refresh);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // cooldown timer
      setCooldown(6);
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      // navigate safely
      if (res.data.user.is_admin) {
        navigate("/admin-dashboard", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
      loginLock.current = false;
    }
  };

  return (
    <div style={styles.page}>
      
      {/* Background elements */}
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>

      <div className="glass animate-fade-up delay-100" style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Welcome Back</h2>
          <p style={styles.subtitle}>Sign in to your account</p>
        </div>

        <div style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address</label>
            <input
              style={styles.input}
              type="email"
              placeholder="name@example.com"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Password</label>
            <input
              style={styles.input}
              type="password"
              placeholder="••••••••"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button
            className="hover-lift"
            onClick={login}
            disabled={loading || cooldown > 0}
            style={{
              ...styles.button,
              opacity: loading || cooldown > 0 ? 0.7 : 1,
              cursor: loading || cooldown > 0 ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Logging in..." : cooldown > 0 ? `Wait ${cooldown}s` : "Sign In"}
          </button>
        </div>

        <div style={styles.footer}>
          <p style={styles.text}>
            Don't have an account?{" "}
            <Link to="/register" style={styles.link}>
              Register here
            </Link>
          </p>
          <p style={styles.text}>
            <Link to="/forgot-password" style={styles.link}>
              Forgot your password?
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(-45deg, #0f172a, #1e293b, #0f172a, #020617)",
    backgroundSize: "400% 400%",
    animation: "gradientShift 15s ease infinite",
    position: "relative",
    overflow: "hidden",
  },
  
  orb1: {
    position: "absolute",
    top: "10%",
    left: "15%",
    width: "300px",
    height: "300px",
    background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(0,0,0,0) 70%)",
    borderRadius: "50%",
    animation: "float 6s ease-in-out infinite"
  },
  
  orb2: {
    position: "absolute",
    bottom: "10%",
    right: "15%",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(0,0,0,0) 70%)",
    borderRadius: "50%",
    animation: "floatReverse 8s ease-in-out infinite"
  },

  card: {
    padding: "40px",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    zIndex: 10,
    color: "white",
  },

  header: {
    textAlign: "center",
    marginBottom: "30px",
  },

  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "8px",
    letterSpacing: "-0.5px"
  },

  subtitle: {
    fontSize: "15px",
    color: "#94a3b8",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#e2e8f0",
  },

  input: {
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    background: "rgba(15, 23, 42, 0.6)",
    color: "white",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s ease",
  },

  error: {
    color: "#ef4444",
    fontSize: "14px",
    background: "rgba(239, 68, 68, 0.1)",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
    border: "1px solid rgba(239, 68, 68, 0.2)"
  },

  button: {
    padding: "14px",
    background: "linear-gradient(to right, #38bdf8, #0ea5e9)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "10px",
    boxShadow: "0 4px 14px rgba(56, 189, 248, 0.4)",
  },

  footer: {
    marginTop: "30px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  text: {
    color: "#94a3b8",
    fontSize: "14px",
  },

  link: {
    color: "#38bdf8",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.2s ease"
  },
};