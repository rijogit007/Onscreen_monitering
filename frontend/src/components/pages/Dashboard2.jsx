import { useEffect, useState } from "react";
// import API from "../api/axios";
import API from "../../api/axios";

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
            <img src={user.profile} style={styles.avatarImg} />
          ) : (
            <div style={styles.avatar}>
              {user?.first_name?.charAt(0)}
            </div>
          )}

          <h3 style={{ marginTop: "10px" }}>
            {user?.first_name} {user?.last_name}
          </h3>

          <p style={{ fontSize: "12px", color: "#cbd5e1" }}>
            {user?.email}
          </p>
        </div>

        <div style={styles.menu}>
          <p>📊 Dashboard</p>
          <p>👤 Profile</p>
          <p>📢 Notifications</p>
          <p>⚙ Settings</p>
        </div>

      </div>

      {/* MAIN */}
      <div style={styles.main}>

        <div style={styles.topbar}>
          <h2>Student Dashboard</h2>
        </div>

        <div style={styles.infoCard}>
          <p><strong>Course:</strong> {user?.course}</p>
          <p><strong>Reg No:</strong> {user?.reg_no}</p>
          <p><strong>UUCMS:</strong> {user?.uucms_no}</p>
        </div>

        <div style={styles.grid}>

          <div style={styles.card}>
            <h3>🟢 Status</h3>
            <p>Active</p>
          </div>

          <div style={styles.card}>
            <h3>🔔 Alerts</h3>
            <p>{data?.alerts ?? 0}</p>
          </div>

          <div style={styles.card}>
            <h3>📢 Message</h3>
            <p>{data?.message ?? "Welcome"}</p>
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
    fontFamily: "Segoe UI",
    background: "#f1f5f9",
    animation: "fadeIn 0.6s ease-in",
  },

  /* SIDEBAR */
  sidebar: {
    width: "260px",
    background: "linear-gradient(180deg, #0f172a, #1e3c72)",
    color: "white",
    padding: "20px",
    animation: "slideIn 0.6s ease-out",
  },

  profileBox: {
    textAlign: "center",
    paddingBottom: "20px",
    borderBottom: "1px solid rgba(255,255,255,0.15)",
  },

  avatar: {
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    background: "white",
    color: "#1e3c72",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "28px",
    fontWeight: "bold",
    margin: "0 auto",
    boxShadow: "0 0 15px rgba(255,255,255,0.3)",
    animation: "pulse 2s infinite",
  },

  avatarImg: {
    width: "75px",
    height: "75px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid white",
  },

  menu: {
    marginTop: "20px",
    lineHeight: "2.8",
    fontSize: "14px",
    cursor: "pointer",
  },

  /* MAIN */
  main: {
    flex: 1,
    padding: "25px",
    animation: "fadeIn 0.8s ease-in",
  },

  topbar: {
    background: "white",
    padding: "15px 20px",
    borderRadius: "14px",
    marginBottom: "20px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
  },

  infoCard: {
    background: "white",
    padding: "15px 20px",
    borderRadius: "14px",
    marginBottom: "20px",
    boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
  },

  card: {
    background: "white",
    padding: "22px",
    borderRadius: "16px",
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
};

/* Add animations globally */
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes slideIn {
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}
`, styleSheet.cssRules.length);

styleSheet.insertRule(`
@keyframes pulse {
  0% { box-shadow: 0 0 10px rgba(255,255,255,0.3); }
  50% { box-shadow: 0 0 20px rgba(255,255,255,0.6); }
  100% { box-shadow: 0 0 10px rgba(255,255,255,0.3); }
}
`, styleSheet.cssRules.length);













// import { useEffect, useState } from "react";
// import API from "../api/axios";

// function Dashboard() {

//   const [data, setData] = useState(null);
//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const fetchDashboard = async () => {
//     try {
//       const res = await API.get("dashboard/");
//       setData(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div style={styles.page}>

//       {/* HEADER */}
//       <div style={styles.header}>
//         <h2>📊 Student Dashboard</h2>
//       </div>

//       {/* PROFILE CARD */}
//       <div style={styles.profileCard}>

//         {/* PROFILE IMAGE / INITIAL */}
//         {user?.profile ? (
//           <img
//             src={user.profile}
//             alt="profile"
//             style={styles.profileImage}
//           />
//         ) : (
//           <div style={styles.avatar}>
//             {user?.first_name?.charAt(0)}
//           </div>
//         )}

//         <h3>
//           {user?.first_name} {user?.last_name}
//         </h3>

//         <p>{user?.email}</p>

//         <div style={styles.info}>
//           <p><strong>Course:</strong> {user?.course}</p>
//           <p><strong>Reg No:</strong> {user?.reg_no}</p>
//           <p><strong>UUCMS:</strong> {user?.uucms_no}</p>
//         </div>
//       </div>

//       {/* STATS */}
//       <div style={styles.grid}>

//         <div style={styles.card}>
//           <h3>🟢 Status</h3>
//           <p>Active</p>
//         </div>

//         <div style={styles.card}>
//           <h3>🔔 Alerts</h3>
//           <p>{data?.alerts ?? 0}</p>
//         </div>

//         <div style={styles.card}>
//           <h3>📢 Message</h3>
//           <p>{data?.message ?? "Welcome"}</p>
//         </div>

//       </div>
//     </div>
//   );
// }

// export default Dashboard;

// /* ================= STYLES ================= */

// const styles = {

//   page: {
//     minHeight: "100vh",
//     background: "#f4f7fb",
//     padding: "20px",
//     fontFamily: "Arial",
//   },

//   header: {
//     textAlign: "center",
//     marginBottom: "25px",
//     color: "#1e3c72",
//   },

//   profileCard: {
//     background: "white",
//     padding: "25px",
//     borderRadius: "12px",
//     maxWidth: "400px",
//     margin: "0 auto 30px",
//     textAlign: "center",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//   },

//   profileImage: {
//     width: "80px",
//     height: "80px",
//     borderRadius: "50%",
//     objectFit: "cover",
//     border: "3px solid #2a5298",
//     margin: "0 auto 15px",
//     display: "block",
//   },

//   avatar: {
//     width: "80px",
//     height: "80px",
//     borderRadius: "50%",
//     background: "#2a5298",
//     color: "white",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontSize: "28px",
//     margin: "0 auto 15px",
//   },

//   info: {
//     marginTop: "15px",
//     textAlign: "left",
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
//     gap: "20px",
//   },

//   card: {
//     background: "white",
//     padding: "20px",
//     borderRadius: "10px",
//     textAlign: "center",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
//   },
// };