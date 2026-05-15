import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={styles.page}>
      
      {/* 🔹 NAVBAR */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>Onscreen Monitor</h2>

        <div>
          <Link to="/login">
            <button style={styles.navBtn}>Login</button>
          </Link>

          <Link to="/register">
            <button style={styles.navBtnOutline}>Register</button>
          </Link>
        </div>
      </nav>

      {/* 🔹 HERO SECTION */}
      <div style={styles.hero}>
        <h1 style={styles.title}>
          Secure Onscreen Monitoring System
        </h1>

        <p style={styles.subtitle}>
          Monitor user activity, prevent malpractice, and ensure secure sessions.
        </p>

        <div style={styles.heroButtons}>
          <Link to="/login">
            <button style={styles.mainBtn}>Get Started</button>
          </Link>

          <Link to="/register">
            <button style={styles.secondaryBtn}>Create Account</button>
          </Link>
        </div>
      </div>

    </div>
  );
}

export default Home;

const styles = {
  page: {
    height: "100vh",
    background: "linear-gradient(to right, #1e3c72, #2a5298)",
    color: "white",
    fontFamily: "Arial",
  },

  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 40px",
    background: "rgba(0,0,0,0.2)",
  },

  logo: {
    margin: 0,
  },

  navBtn: {
    marginRight: "10px",
    padding: "8px 16px",
    background: "#00c6ff",
    border: "none",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
  },

  navBtnOutline: {
    padding: "8px 16px",
    background: "transparent",
    border: "1px solid white",
    borderRadius: "5px",
    color: "white",
    cursor: "pointer",
  },

  hero: {
    height: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  title: {
    fontSize: "36px",
    marginBottom: "15px",
  },

  subtitle: {
    fontSize: "18px",
    maxWidth: "500px",
    marginBottom: "30px",
  },

  heroButtons: {
    display: "flex",
    gap: "15px",
  },

  mainBtn: {
    padding: "12px 25px",
    background: "#00c6ff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    color: "white",
    cursor: "pointer",
  },

  secondaryBtn: {
    padding: "12px 25px",
    background: "transparent",
    border: "1px solid white",
    borderRadius: "6px",
    fontSize: "16px",
    color: "white",
    cursor: "pointer",
  },
};