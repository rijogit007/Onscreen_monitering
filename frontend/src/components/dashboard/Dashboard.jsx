import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [filter, setFilter] = useState("all");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchDashboard();
    fetchNotifications();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await API.get("dashboard/");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchNotifications = async () => {
    try {
      const res = await API.get("student-notifications/");
      setNotifications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;

    if (filter === "course") {
      return (
        n.type === "course" ||
        n.course === user.course ||
        n.course_name === user.course
      );
    }

    return true;
  });

  const logout = () => {
    if (!window.confirm("Logout?")) return;

    localStorage.clear();
    navigate("/login");
  };

  return (
    <div style={styles.layout}>

      {/* ================= SIDEBAR ================= */}
      <div style={styles.sidebar}>
        <div style={styles.profileBox}>
          {user?.profile ? (
            <img src={user.profile} style={styles.avatarImg} />
          ) : (
            <div style={styles.avatar}>
              {user?.first_name?.charAt(0)}
            </div>
          )}

          <h3 style={{ marginTop: 10 }}>
            {user?.first_name} {user?.last_name}
          </h3>

          <p style={styles.email}>{user?.email}</p>
        </div>

        <div style={styles.menu}>
          <p>📊 Dashboard</p>
          <p>👤 Profile</p>
          <p>📢 Notifications</p>
          <p>⚙ Settings</p>

          <button style={styles.logoutBtn} onClick={logout}>
            🚪 Logout
          </button>
        </div>
      </div>

      {/* ================= MAIN ================= */}
      <div style={styles.main}>

        <div style={styles.topbar}>
          <h2>🎓 Student Dashboard</h2>
        </div>

        {/* USER INFO */}
        <div style={styles.infoCard}>
          <div>
            <span>📘 Course</span>
            <h4>{user?.course}</h4>
          </div>

          <div>
            <span>🆔 Reg No</span>
            <h4>{user?.reg_no}</h4>
          </div>

          <div>
            <span>🏫 UUCMS</span>
            <h4>{user?.uucms_no}</h4>
          </div>
        </div>

        {/* STATS */}
        <div style={styles.grid}>
          <div style={styles.card}>
            <h3>🟢 Status</h3>
            <p style={{ color: "#10b981" }}>Active</p>
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

        {/* ================= NOTIFICATIONS ================= */}
        <div style={styles.notificationBox}>
          <div style={styles.notifHeader}>
            <h3>📢 Notifications</h3>

            <div style={styles.filterRow}>
              <button
                style={{
                  ...styles.filterBtn,
                  background: filter === "all" ? "#111827" : "#e5e7eb",
                  color: filter === "all" ? "#fff" : "#111",
                }}
                onClick={() => setFilter("all")}
              >
                All
              </button>

              <button
                style={{
                  ...styles.filterBtn,
                  background: filter === "course" ? "#111827" : "#e5e7eb",
                  color: filter === "course" ? "#fff" : "#111",
                }}
                onClick={() => setFilter("course")}
              >
                My Course
              </button>
            </div>
          </div>

          {/* LIST */}
          <div style={{ marginTop: 15 }}>
            {filteredNotifications.length === 0 ? (
              <p style={{ color: "#6b7280" }}>No notifications</p>
            ) : (
              filteredNotifications.map((n) => (
                <div key={n.id} style={styles.notifCard}>
                  <h4 style={styles.notifTitle}>{n.title}</h4>
                  <p style={styles.notifMsg}>{n.message}</p>
                </div>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;

/* ================= MODERN STYLES ================= */
const styles = {

  layout: {
    display: "flex",
    minHeight: "100vh",
    fontFamily: "Segoe UI",
    background: "linear-gradient(135deg,#eef2f7,#dbeafe)",
  },

  /* SIDEBAR */
  sidebar: {
    width: "260px",
    background: "linear-gradient(180deg,#0f172a,#1e3c72)",
    color: "#fff",
    padding: 20,
    boxShadow: "10px 0 30px rgba(0,0,0,0.1)",
  },

  profileBox: {
    textAlign: "center",
    paddingBottom: 20,
    borderBottom: "1px solid rgba(255,255,255,0.1)",
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    background: "#fff",
    color: "#1e3c72",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: 24,
    fontWeight: "bold",
    margin: "auto",
  },

  avatarImg: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #fff",
  },

  email: {
    fontSize: 12,
    color: "#cbd5e1",
  },

  menu: {
    marginTop: 20,
    lineHeight: 2.5,
    fontSize: 14,
  },

  logoutBtn: {
    width: "100%",
    marginTop: 20,
    padding: 10,
    borderRadius: 10,
    border: "none",
    background: "#ef4444",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "bold",
  },

  /* MAIN */
  main: {
    flex: 1,
    padding: 25,
  },

  topbar: {
    background: "#fff",
    padding: 15,
    borderRadius: 14,
    marginBottom: 20,
    boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
  },

  infoCard: {
    background: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 20,
    display: "flex",
    justifyContent: "space-between",
    boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
    gap: 20,
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 16,
    textAlign: "center",
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  },

  /* NOTIFICATIONS */
  notificationBox: {
    marginTop: 25,
    background: "#fff",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  },

  notifHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },

  filterRow: {
    display: "flex",
    gap: 10,
  },

  filterBtn: {
    padding: "8px 14px",
    borderRadius: 10,
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.3s",
  },

  notifCard: {
    padding: 14,
    borderRadius: 12,
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    marginBottom: 10,
    transition: "0.3s",
  },

  notifTitle: {
    margin: 0,
    fontSize: 15,
  },

  notifMsg: {
    margin: 0,
    fontSize: 13,
    color: "#4b5563",
  },
};







// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../api/axios";

// function Dashboard() {
//   const navigate = useNavigate();

//   const [data, setData] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [filter, setFilter] = useState("all"); // all | course

//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   useEffect(() => {
//     fetchDashboard();
//     fetchNotifications();
//   }, []);

//   // ================= DASHBOARD =================
//   const fetchDashboard = async () => {
//     try {
//       const res = await API.get("dashboard/");
//       setData(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ================= NOTIFICATIONS =================
//   const fetchNotifications = async () => {
//     try {
//       const res = await API.get("student-notifications/");
//       setNotifications(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ================= FILTER =================
//   const filteredNotifications = notifications.filter((n) => {
//     if (filter === "all") return true;

//     if (filter === "course") {
//       return (
//         n.type === "course" ||
//         n.course === user.course ||
//         n.course_name === user.course
//       );
//     }

//     return true;
//   });

//   // ================= LOGOUT =================
//   const logout = () => {
//     const confirmLogout = window.confirm(
//       "Are you sure you want to logout?"
//     );

//     if (!confirmLogout) return;

//     localStorage.removeItem("access");
//     localStorage.removeItem("refresh");
//     localStorage.removeItem("user");

//     navigate("/login");
//   };

//   return (
//     <div style={styles.layout}>
//       {/* ================= SIDEBAR ================= */}
//       <div style={styles.sidebar}>
//         <div style={styles.profileBox}>
//           {user?.profile ? (
//             <img
//               src={user.profile}
//               alt="profile"
//               style={styles.avatarImg}
//             />
//           ) : (
//             <div style={styles.avatar}>
//               {user?.first_name?.charAt(0)}
//             </div>
//           )}

//           <h3 style={{ marginTop: "10px" }}>
//             {user?.first_name} {user?.last_name}
//           </h3>

//           <p style={{ fontSize: "12px", color: "#cbd5e1" }}>
//             {user?.email}
//           </p>
//         </div>

//         <div style={styles.menu}>
//           <p>📊 Dashboard</p>
//           <p>👤 Profile</p>
//           <p>📢 Notifications</p>
//           <p>⚙ Settings</p>

//           <button style={styles.logoutBtn} onClick={logout}>
//             🚪 Logout
//           </button>
//         </div>
//       </div>

//       {/* ================= MAIN ================= */}
//       <div style={styles.main}>
//         <div style={styles.topbar}>
//           <h2>Student Dashboard</h2>
//         </div>

//         {/* ================= USER INFO ================= */}
//         <div style={styles.infoCard}>
//           <p>
//             <strong>Course:</strong> {user?.course}
//           </p>

//           <p>
//             <strong>Reg No:</strong> {user?.reg_no}
//           </p>

//           <p>
//             <strong>UUCMS:</strong> {user?.uucms_no}
//           </p>
//         </div>

//         {/* ================= GRID ================= */}
//         <div style={styles.grid}>
//           <div style={styles.card}>
//             <h3>🟢 Status</h3>
//             <p>Active</p>
//           </div>

//           <div style={styles.card}>
//             <h3>🔔 Alerts</h3>
//             <p>{data?.alerts ?? 0}</p>
//           </div>

//           <div style={styles.card}>
//             <h3>📢 Message</h3>
//             <p>{data?.message ?? "Welcome"}</p>
//           </div>
//         </div>

//         {/* ================= NOTIFICATIONS ================= */}
//         <div style={styles.notificationBox}>
//           <h3>📢 Notifications</h3>

//           {/* FILTER BUTTONS */}
//           <div style={styles.filterRow}>
//             <button
//               style={{
//                 ...styles.filterBtn,
//                 background:
//                   filter === "all" ? "#111827" : "#e5e7eb",
//                 color: filter === "all" ? "white" : "black",
//               }}
//               onClick={() => setFilter("all")}
//             >
//               All
//             </button>

//             <button
//               style={{
//                 ...styles.filterBtn,
//                 background:
//                   filter === "course" ? "#111827" : "#e5e7eb",
//                 color: filter === "course" ? "white" : "black",
//               }}
//               onClick={() => setFilter("course")}
//             >
//               My Course
//             </button>
//           </div>

//           {/* LIST */}
//           <div style={{ marginTop: 15 }}>
//             {filteredNotifications.length === 0 ? (
//               <p>No notifications</p>
//             ) : (
//               filteredNotifications.map((n) => (
//                 <div key={n.id} style={styles.notifCard}>
//                   <h4>{n.title}</h4>
//                   <p>{n.message}</p>
//                 </div>
//               ))
//             )}
            
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;



// const styles = {

//   layout: {
//     display: "flex",
//     minHeight: "100vh",
//     fontFamily: "Segoe UI",
//     background: "#f1f5f9",
//   },

//   sidebar: {
//     width: "260px",
//     background: "linear-gradient(180deg, #0f172a, #1e3c72)",
//     color: "white",
//     padding: "20px",
//   },

//   profileBox: {
//     textAlign: "center",
//     paddingBottom: "20px",
//   },

//   avatar: {
//     width: "75px",
//     height: "75px",
//     borderRadius: "50%",
//     background: "white",
//     color: "#1e3c72",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },

//   menu: {
//     marginTop: "20px",
//     lineHeight: "2.8",
//   },

//   logoutBtn: {
//     width: "100%",
//     marginTop: "20px",
//     padding: "10px",
//     border: "none",
//     borderRadius: "8px",
//     background: "#ef4444",
//     color: "white",
//   },

//   main: {
//     flex: 1,
//     padding: "25px",
//   },

//   topbar: {
//     background: "white",
//     padding: "15px 20px",
//     borderRadius: "14px",
//     marginBottom: "20px",
//   },

//   infoCard: {
//     background: "white",
//     padding: "15px 20px",
//     borderRadius: "14px",
//     marginBottom: "20px",
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: "20px",
//   },

//   card: {
//     background: "white",
//     padding: "22px",
//     borderRadius: "16px",
//     textAlign: "center",
//   },

//   // ✅ ADD THIS PART BELOW 👇👇👇

//   notificationBox: {
//     marginTop: "25px",
//     background: "white",
//     padding: "20px",
//     borderRadius: "14px",
//     boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
//   },

//   filterRow: {
//     display: "flex",
//     gap: "10px",
//     marginTop: "10px",
//   },

//   filterBtn: {
//     padding: "8px 14px",
//     border: "none",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },

//   notifCard: {
//     padding: "12px",
//     border: "1px solid #eee",
//     borderRadius: "10px",
//     marginBottom: "10px",
//     background: "#f9fafb",
//   },
// };











// import { useEffect, useState } from "react";

// import { useNavigate } from "react-router-dom";
// import API from "../../api/axios";

// function Dashboard() {

//   const navigate = useNavigate();

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

//   // // 🔥 LOGOUT
//   // const logout = () => {

//   //   localStorage.removeItem("access");
//   //   localStorage.removeItem("refresh");
//   //   localStorage.removeItem("user");

//   //   navigate("/login");
//   // };

//   const logout = () => {

//   const confirmLogout = window.confirm(
//     "Are you sure you want to logout?"
//   );

//   if (!confirmLogout) return;

//   localStorage.removeItem("access");
//   localStorage.removeItem("refresh");
//   localStorage.removeItem("user");

//   navigate("/login");
// };

//   return (
//     <div style={styles.layout}>

//       {/* SIDEBAR */}
//       <div style={styles.sidebar}>

//         <div style={styles.profileBox}>

//           {user?.profile ? (
//             <img
//               src={user.profile}
//               alt="profile"
//               style={styles.avatarImg}
//             />
//           ) : (
//             <div style={styles.avatar}>
//               {user?.first_name?.charAt(0)}
//             </div>
//           )}

//           <h3 style={{ marginTop: "10px" }}>
//             {user?.first_name} {user?.last_name}
//           </h3>

//           <p style={{ fontSize: "12px", color: "#cbd5e1" }}>
//             {user?.email}
//           </p>

//         </div>

//         {/* MENU */}
//         <div style={styles.menu}>

//           <p>📊 Dashboard</p>

//           <p>👤 Profile</p>

//           <p>📢 Notifications</p>

//           <p>⚙ Settings</p>

//           {/* LOGOUT BUTTON */}
//           <button style={styles.logoutBtn} onClick={logout}>
//             🚪 Logout
//           </button>

//         </div>

//       </div>

//       {/* MAIN */}
//       <div style={styles.main}>

//         <div style={styles.topbar}>
//           <h2>Student Dashboard</h2>
//         </div>

//         {/* USER INFO */}
//         <div style={styles.infoCard}>

//           <p>
//             <strong>Course:</strong> {user?.course}
//           </p>

//           <p>
//             <strong>Reg No:</strong> {user?.reg_no}
//           </p>

//           <p>
//             <strong>UUCMS:</strong> {user?.uucms_no}
//           </p>

//         </div>

//         {/* GRID */}
//         <div style={styles.grid}>

//           <div style={styles.card}>
//             <h3>🟢 Status</h3>
//             <p>Active</p>
//           </div>

//           <div style={styles.card}>
//             <h3>🔔 Alerts</h3>
//             <p>{data?.alerts ?? 0}</p>
//           </div>

//           <div style={styles.card}>
//             <h3>📢 Message</h3>
//             <p>{data?.message ?? "Welcome"}</p>
//           </div>

//         </div>

//       </div>

//     </div>
//   );
// }

// export default Dashboard;

// /* ================= STYLES ================= */

// const styles = {

//   layout: {
//     display: "flex",
//     minHeight: "100vh",
//     fontFamily: "Segoe UI",
//     background: "#f1f5f9",
//     animation: "fadeIn 0.6s ease-in",
//   },

//   /* SIDEBAR */
//   sidebar: {
//     width: "260px",
//     background: "linear-gradient(180deg, #0f172a, #1e3c72)",
//     color: "white",
//     padding: "20px",
//     animation: "slideIn 0.6s ease-out",
//   },

//   profileBox: {
//     textAlign: "center",
//     paddingBottom: "20px",
//     borderBottom: "1px solid rgba(255,255,255,0.15)",
//   },

//   avatar: {
//     width: "75px",
//     height: "75px",
//     borderRadius: "50%",
//     background: "white",
//     color: "#1e3c72",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontSize: "28px",
//     fontWeight: "bold",
//     margin: "0 auto",
//     boxShadow: "0 0 15px rgba(255,255,255,0.3)",
//     animation: "pulse 2s infinite",
//   },

//   avatarImg: {
//     width: "75px",
//     height: "75px",
//     borderRadius: "50%",
//     objectFit: "cover",
//     border: "2px solid white",
//   },

//   menu: {
//     marginTop: "20px",
//     lineHeight: "2.8",
//     fontSize: "14px",
//     cursor: "pointer",
//   },

//   logoutBtn: {
//     width: "100%",
//     marginTop: "20px",
//     padding: "10px",
//     border: "none",
//     borderRadius: "8px",
//     background: "#ef4444",
//     color: "white",
//     cursor: "pointer",
//     fontWeight: "bold",
//     fontSize: "14px",
//   },

//   /* MAIN */
//   main: {
//     flex: 1,
//     padding: "25px",
//     animation: "fadeIn 0.8s ease-in",
//   },

//   topbar: {
//     background: "white",
//     padding: "15px 20px",
//     borderRadius: "14px",
//     marginBottom: "20px",
//     boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
//   },

//   infoCard: {
//     background: "white",
//     padding: "15px 20px",
//     borderRadius: "14px",
//     marginBottom: "20px",
//     boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
//     display: "flex",
//     justifyContent: "space-between",
//     flexWrap: "wrap",
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//     gap: "20px",
//   },

//   card: {
//     background: "white",
//     padding: "22px",
//     borderRadius: "16px",
//     textAlign: "center",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
//     transition: "all 0.3s ease",
//     cursor: "pointer",
//   },
// };

// /* ================= ANIMATIONS ================= */

// const styleSheet = document.styleSheets[0];

// styleSheet.insertRule(`
// @keyframes fadeIn {
//   from {
//     opacity: 0;
//     transform: translateY(10px);
//   }

//   to {
//     opacity: 1;
//     transform: translateY(0);
//   }
// }
// `, styleSheet.cssRules.length);

// styleSheet.insertRule(`
// @keyframes slideIn {
//   from {
//     transform: translateX(-20px);
//     opacity: 0;
//   }

//   to {
//     transform: translateX(0);
//     opacity: 1;
//   }
// }
// `, styleSheet.cssRules.length);

// styleSheet.insertRule(`
// @keyframes pulse {

//   0% {
//     box-shadow: 0 0 10px rgba(255,255,255,0.3);
//   }

//   50% {
//     box-shadow: 0 0 20px rgba(255,255,255,0.6);
//   }

//   100% {
//     box-shadow: 0 0 10px rgba(255,255,255,0.3);
//   }
// }
// `, styleSheet.cssRules.length);












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