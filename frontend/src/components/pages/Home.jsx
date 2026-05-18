import { Link } from "react-router-dom";
import "../../index.css";

function Home() {
  return (
    <div style={styles.page}>
      
      {/* 🔹 ABSTRACT ANIMATED BACKGROUND ORBS */}
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>
      
      {/* 🔹 GLASSMORPHIC NAVBAR */}
      <nav style={styles.navbar} className="glass animate-fade-in delay-100">
        <h2 style={styles.logo}>Onscreen<span style={{color: "#38bdf8"}}>Monitor</span></h2>

        <div>
          <Link to="/login">
            <button className="hover-lift" style={styles.navBtnOutline}>Login</button>
          </Link>
          <Link to="/register">
            <button className="hover-lift" style={styles.navBtn}>Register</button>
          </Link>
        </div>
      </nav>

      {/* 🔹 HERO SECTION */}
      <div style={styles.hero}>
        <div style={styles.heroContent} className="glass animate-fade-up delay-200">
          <h1 style={styles.title}>
            Secure Onscreen <span style={{color: "#38bdf8"}}>Monitoring</span> System
          </h1>

          <p style={styles.subtitle}>
            State-of-the-art proctoring. Monitor user activity, prevent malpractice, and ensure secure sessions with AI-powered Face Detection.
          </p>

          <div style={styles.heroButtons}>
            <Link to="/login">
              <button className="hover-lift" style={styles.mainBtn}>Get Started</button>
            </Link>
            <Link to="/register">
              <button className="hover-lift" style={styles.secondaryBtn}>Create Account</button>
            </Link>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    background: "linear-gradient(-45deg, #0f172a, #1e293b, #0f172a, #020617)",
    backgroundSize: "400% 400%",
    animation: "gradientShift 15s ease infinite",
    color: "white",
    overflow: "hidden",
    position: "relative"
  },

  // Floating background elements
  orb1: {
    position: "absolute",
    top: "-10%",
    left: "-10%",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(0,0,0,0) 70%)",
    borderRadius: "50%",
    animation: "float 6s ease-in-out infinite"
  },
  
  orb2: {
    position: "absolute",
    bottom: "-20%",
    right: "-5%",
    width: "500px",
    height: "500px",
    background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(0,0,0,0) 70%)",
    borderRadius: "50%",
    animation: "floatReverse 8s ease-in-out infinite"
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 50px",
    position: "relative",
    zIndex: 10
  },

  logo: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "800",
    letterSpacing: "-0.5px"
  },

  navBtn: {
    marginLeft: "15px",
    padding: "10px 24px",
    background: "linear-gradient(to right, #38bdf8, #0ea5e9)",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(56, 189, 248, 0.4)",
  },

  navBtnOutline: {
    padding: "10px 24px",
    background: "transparent",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "8px",
    color: "white",
    fontWeight: "500",
    cursor: "pointer",
    transition: "background 0.3s"
  },

  hero: {
    height: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    position: "relative",
    zIndex: 10,
    padding: "0 20px"
  },

  heroContent: {
    padding: "50px",
    borderRadius: "24px",
    maxWidth: "800px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
  },

  title: {
    fontSize: "48px",
    fontWeight: "800",
    lineHeight: "1.2",
    marginBottom: "20px",
    letterSpacing: "-1px"
  },

  subtitle: {
    fontSize: "18px",
    color: "#cbd5e1",
    lineHeight: "1.6",
    marginBottom: "40px",
    fontWeight: "400"
  },

  heroButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },

  mainBtn: {
    padding: "14px 32px",
    background: "linear-gradient(to right, #38bdf8, #0ea5e9)",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
    cursor: "pointer",
    boxShadow: "0 4px 14px rgba(56, 189, 248, 0.4)",
  },

  secondaryBtn: {
    padding: "14px 32px",
    background: "rgba(255, 255, 255, 0.05)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    color: "white",
    cursor: "pointer",
  },
};