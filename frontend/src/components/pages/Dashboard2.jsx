import { useEffect, useState } from "react";
import API from "../../api/axios";
import "../../index.css";

function Dashboard() {
  const [data, setData] = useState(null);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("dashboard/");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={styles.layout}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <div style={styles.profileBox}>
          {user?.profile ? (
            <img src={user.profile} style={styles.avatarImg} alt="Profile" />
          ) : (
            <div style={styles.avatar}>
              {user?.first_name?.charAt(0)}
            </div>
          )}
          <h3 style={styles.userName}>
            {user?.first_name} {user?.last_name}
          </h3>
          <p style={styles.userEmail}>
            {user?.email}
          </p>
        </div>

        <div style={styles.menu}>
          <div className="hover-lift" style={styles.menuItem}>📊 Dashboard</div>
          <div className="hover-lift" style={styles.menuItem}>👤 Profile</div>
          <div className="hover-lift" style={styles.menuItem}>📢 Notifications</div>
          <div className="hover-lift" style={styles.menuItem}>⚙ Settings</div>
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        <div className="animate-fade-up" style={styles.topbar}>
          <h2 style={{margin: 0, color: "#1e293b", fontSize: "24px"}}>Student Dashboard</h2>
        </div>

        <div className="animate-fade-up delay-100 glass-dark" style={{...styles.infoCard, color: "white"}}>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Course</span>
            <span style={styles.infoValue}>{user?.course || "N/A"}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>Reg No</span>
            <span style={styles.infoValue}>{user?.reg_no || "N/A"}</span>
          </div>
          <div style={styles.infoItem}>
            <span style={styles.infoLabel}>UUCMS</span>
            <span style={styles.infoValue}>{user?.uucms_no || "N/A"}</span>
          </div>
        </div>

        <div style={styles.grid}>
          <div className="hover-lift animate-fade-up delay-200" style={styles.card}>
            <div style={styles.cardIcon}>🟢</div>
            <h3 style={styles.cardTitle}>Status</h3>
            <p style={styles.cardValue}>Active</p>
          </div>

          <div className="hover-lift animate-fade-up delay-300" style={styles.card}>
            <div style={styles.cardIcon}>🔔</div>
            <h3 style={styles.cardTitle}>Alerts</h3>
            <p style={styles.cardValue}>{data?.alerts ?? 0}</p>
          </div>

          <div className="hover-lift animate-fade-up delay-400" style={styles.card}>
            <div style={styles.cardIcon}>📢</div>
            <h3 style={styles.cardTitle}>Message</h3>
            <p style={{...styles.cardValue, fontSize: "16px"}}>{data?.message ?? "Welcome to the portal"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

const styles = {
  layout: {
    display: "flex",
    minHeight: "100vh",
    background: "#f8fafc",
  },

  /* SIDEBAR */
  sidebar: {
    width: "280px",
    background: "linear-gradient(180deg, #0f172a, #1e293b)",
    color: "white",
    padding: "30px 20px",
    boxShadow: "4px 0 15px rgba(0,0,0,0.1)",
    zIndex: 10,
  },

  profileBox: {
    textAlign: "center",
    paddingBottom: "30px",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    marginBottom: "20px"
  },

  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #38bdf8, #0ea5e9)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "32px",
    fontWeight: "bold",
    margin: "0 auto 15px",
    boxShadow: "0 0 20px rgba(56,189,248,0.4)",
  },

  avatarImg: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #38bdf8",
    margin: "0 auto 15px",
    boxShadow: "0 0 20px rgba(56,189,248,0.4)",
  },

  userName: {
    margin: "0 0 5px 0",
    fontSize: "18px",
    fontWeight: "600",
    letterSpacing: "-0.3px"
  },

  userEmail: {
    margin: 0,
    fontSize: "13px",
    color: "#94a3b8"
  },

  menu: {
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  menuItem: {
    padding: "12px 15px",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#cbd5e1",
    fontSize: "15px",
    fontWeight: "500",
    background: "rgba(255,255,255,0.03)",
    transition: "all 0.2s"
  },

  /* MAIN */
  main: {
    flex: 1,
    padding: "40px",
    overflowY: "auto"
  },

  topbar: {
    background: "white",
    padding: "20px 30px",
    borderRadius: "16px",
    marginBottom: "30px",
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.05)",
  },

  infoCard: {
    padding: "25px 30px",
    borderRadius: "16px",
    marginBottom: "30px",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "20px"
  },

  infoItem: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },

  infoLabel: {
    fontSize: "13px",
    color: "#94a3b8",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },

  infoValue: {
    fontSize: "18px",
    fontWeight: "600",
    color: "#f8fafc"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "25px",
  },

  card: {
    background: "white",
    padding: "30px 25px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px"
  },

  cardIcon: {
    fontSize: "32px",
    marginBottom: "10px"
  },

  cardTitle: {
    margin: 0,
    fontSize: "16px",
    color: "#64748b",
    fontWeight: "500"
  },

  cardValue: {
    margin: 0,
    fontSize: "28px",
    fontWeight: "700",
    color: "#0f172a"
  }
};