// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../api/axios";

// function Dashboard() {
//   const navigate = useNavigate();

//   const [data, setData] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [filter, setFilter] = useState("all");

//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   useEffect(() => {
//     fetchDashboard();
//     fetchNotifications();
//   }, []);

//   const fetchDashboard = async () => {
//     try {
//       const res = await API.get("dashboard/");
//       setData(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const fetchNotifications = async () => {
//     try {
//       const res = await API.get("student-notifications/");
//       setNotifications(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

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

//   const logout = () => {
//     if (!window.confirm("Logout?")) return;

//     localStorage.clear();
//     navigate("/login");
//   };

//   return (
//     <div style={styles.layout}>

//       {/* ================= SIDEBAR ================= */}
//       <div style={styles.sidebar}>
//         <div style={styles.profileBox}>
//           {user?.profile ? (
//             <img src={user.profile} style={styles.avatarImg} />
//           ) : (
//             <div style={styles.avatar}>
//               {user?.first_name?.charAt(0)}
//             </div>
//           )}

//           <h3 style={{ marginTop: 10 }}>
//             {user?.first_name} {user?.last_name}
//           </h3>

//           <p style={styles.email}>{user?.email}</p>
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
//           <h2>🎓 Student Dashboard</h2>
//         </div>

//         {/* USER INFO */}
//         <div style={styles.infoCard}>
//           <div>
//             <span>📘 Course</span>
//             <h4>{user?.course}</h4>
//           </div>

//           <div>
//             <span>🆔 Reg No</span>
//             <h4>{user?.reg_no}</h4>
//           </div>

//           <div>
//             <span>🏫 UUCMS</span>
//             <h4>{user?.uucms_no}</h4>
//           </div>
//         </div>

//         {/* STATS */}
//         <div style={styles.grid}>
//           <div style={styles.card}>
//             <h3>🟢 Status</h3>
//             <p style={{ color: "#10b981" }}>Active</p>
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
//           <div style={styles.notifHeader}>
//             <h3>📢 Notifications</h3>

//             <div style={styles.filterRow}>
//               <button
//                 style={{
//                   ...styles.filterBtn,
//                   background: filter === "all" ? "#111827" : "#e5e7eb",
//                   color: filter === "all" ? "#fff" : "#111",
//                 }}
//                 onClick={() => setFilter("all")}
//               >
//                 All
//               </button>

//               <button
//                 style={{
//                   ...styles.filterBtn,
//                   background: filter === "course" ? "#111827" : "#e5e7eb",
//                   color: filter === "course" ? "#fff" : "#111",
//                 }}
//                 onClick={() => setFilter("course")}
//               >
//                 My Course
//               </button>
//             </div>
//           </div>

//           {/* LIST */}
//           <div style={{ marginTop: 15 }}>
//             {filteredNotifications.length === 0 ? (
//               <p style={{ color: "#6b7280" }}>No notifications</p>
//             ) : (
//               filteredNotifications.map((n) => (
//                 <div key={n.id} style={styles.notifCard}>
//                   <h4 style={styles.notifTitle}>{n.title}</h4>
//                   <p style={styles.notifMsg}>{n.message}</p>
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

// /* ================= MODERN STYLES ================= */
// const styles = {

//   layout: {
//     display: "flex",
//     minHeight: "100vh",
//     fontFamily: "Segoe UI",
//     background: "linear-gradient(135deg,#eef2f7,#dbeafe)",
//   },

//   /* SIDEBAR */
//   sidebar: {
//     width: "260px",
//     background: "linear-gradient(180deg,#0f172a,#1e3c72)",
//     color: "#fff",
//     padding: 20,
//     boxShadow: "10px 0 30px rgba(0,0,0,0.1)",
//   },

//   profileBox: {
//     textAlign: "center",
//     paddingBottom: 20,
//     borderBottom: "1px solid rgba(255,255,255,0.1)",
//   },

//   avatar: {
//     width: 70,
//     height: 70,
//     borderRadius: "50%",
//     background: "#fff",
//     color: "#1e3c72",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     fontSize: 24,
//     fontWeight: "bold",
//     margin: "auto",
//   },

//   avatarImg: {
//     width: 70,
//     height: 70,
//     borderRadius: "50%",
//     objectFit: "cover",
//     border: "2px solid #fff",
//   },

//   email: {
//     fontSize: 12,
//     color: "#cbd5e1",
//   },

//   menu: {
//     marginTop: 20,
//     lineHeight: 2.5,
//     fontSize: 14,
//   },

//   logoutBtn: {
//     width: "100%",
//     marginTop: 20,
//     padding: 10,
//     borderRadius: 10,
//     border: "none",
//     background: "#ef4444",
//     color: "#fff",
//     cursor: "pointer",
//     fontWeight: "bold",
//   },

//   /* MAIN */
//   main: {
//     flex: 1,
//     padding: 25,
//   },

//   topbar: {
//     background: "#fff",
//     padding: 15,
//     borderRadius: 14,
//     marginBottom: 20,
//     boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
//   },

//   infoCard: {
//     background: "#fff",
//     padding: 18,
//     borderRadius: 14,
//     marginBottom: 20,
//     display: "flex",
//     justifyContent: "space-between",
//     boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
//     gap: 20,
//   },

//   card: {
//     background: "#fff",
//     padding: 20,
//     borderRadius: 16,
//     textAlign: "center",
//     boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
//   },

//   /* NOTIFICATIONS */
//   notificationBox: {
//     marginTop: 25,
//     background: "#fff",
//     padding: 20,
//     borderRadius: 16,
//     boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
//   },

//   notifHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     flexWrap: "wrap",
//   },

//   filterRow: {
//     display: "flex",
//     gap: 10,
//   },

//   filterBtn: {
//     padding: "8px 14px",
//     borderRadius: 10,
//     border: "none",
//     cursor: "pointer",
//     fontWeight: "bold",
//     transition: "0.3s",
//   },

//   notifCard: {
//     padding: 14,
//     borderRadius: 12,
//     background: "#f8fafc",
//     border: "1px solid #e5e7eb",
//     marginBottom: 10,
//     transition: "0.3s",
//   },

//   notifTitle: {
//     margin: 0,
//     fontSize: 15,
//   },

//   notifMsg: {
//     margin: 0,
//     fontSize: 13,
//     color: "#4b5563",
//   },
// };





import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../../api/axios";

function Dashboard() {
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [exams, setExams] = useState([]); // ✅ IMPORTANT FIX
  const [filter, setFilter] = useState("all");
  const [currentTime, setCurrentTime] = useState(Date.now());

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  

  useEffect(() => {
    fetchDashboard();
    fetchNotifications();
    fetchExams(); // ✅ ADD
  }, []);

  // ================= DASHBOARD =================
  const fetchDashboard = async () => {
    try {
      const res = await API.get("dashboard/");
      setData(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= NOTIFICATIONS =================
  const fetchNotifications = async () => {
    try {
      const res = await API.get("student-notifications/");
      setNotifications(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= EXAMS =================
  const fetchExams = async () => {
    try {
      const res = await API.get("exams-list/");
      setExams(res.data);
    } catch (err) {
      console.log("Exam load error:", err);
    }
  };

  // ================= FILTER NOTIFICATIONS =================
  const filteredNotifications = notifications.filter((n) => {
    // Filter out if it's an exam notification and the exam has ended
    if (n.exam_id) {
      const linkedExam = exams.find((e) => e.id === n.exam_id);
      if (linkedExam) {
        const end = new Date(linkedExam.end_time).getTime();
        if (currentTime > end) return false;
      }
    }

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

  // ================= EXAM TIME LOGIC =================
  const canStartExam = (exam) => {
    if (exam.is_submitted) return false;

    const start = new Date(exam.start_time).getTime();
    const end = new Date(exam.end_time).getTime();

    const startWindow = start - 10 * 60 * 1000; // 10 min before

    return currentTime >= startWindow && currentTime <= end;
  };

  const getExamStatusText = (exam) => {
    if (exam.is_submitted) return "Submitted";
    
    const start = new Date(exam.start_time).getTime();
    const end = new Date(exam.end_time).getTime();

    if (currentTime > end) return "Ended";
    if (currentTime >= start) return "Ongoing";

    const diff = start - currentTime;
    if (diff <= 10 * 60 * 1000 && diff > 0) {
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      return `Starts in ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    return "Locked";
  };

  // Filter out ended exams
  const activeExams = exams.filter(
    (exam) => new Date(exam.end_time).getTime() >= currentTime
  );

  // ================= START EXAM =================
  const startExam = (exam) => {
    navigate(`/exam-terms/${exam.id}`, { state: { exam } });
  };

  // ================= LOGOUT =================
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

        {/* ================= EXAMS SECTION ================= */}
        <div style={styles.examBox}>
          <h3>📝 Available Exams</h3>

          {activeExams.length === 0 ? (
            <p style={{ color: "#6b7280" }}>No exams available</p>
          ) : (
            activeExams.map((exam) => (
              <div key={exam.id} style={styles.examCard}>
                
                <div>
                  <h4>{exam.name}</h4>
                  <p style={{ fontSize: 13, color: "#666" }}>
                      🕒 {new Date(exam.start_time).toLocaleString()} →{" "}
                    {new Date(exam.end_time).toLocaleString()}
                  </p>
                  <p style={{ fontSize: 13, color: "#666", marginTop: 5 }}>
                    <b>Status:</b> {getExamStatusText(exam)}
                  </p>
                </div>

                <button
                  disabled={!canStartExam(exam)}
                  onClick={() => startExam(exam)}
                  style={{
                    ...styles.startBtn,
                    background: canStartExam(exam) ? "#10b981" : "#9ca3af",
                    cursor: canStartExam(exam) ? "pointer" : "not-allowed",
                  }}
                >
                  {exam.is_submitted ? "Completed" : canStartExam(exam) ? "Enter Exam" : "Locked"}
                </button>

              </div>
            ))
          )}
        </div>

        {/* ================= STATS ================= */}
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

  /* ================= EXAMS ================= */

  examBox: {
    marginTop: 25,
    background: "#fff",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
  },

  examCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    background: "#f9fafb",
    border: "1px solid #e5e7eb",
    marginTop: 10,
    transition: "0.3s",
  },

  startBtn: {
    padding: "10px 16px",
    border: "none",
    borderRadius: 10,
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "0.3s",
  },

  /* ================= NOTIFICATIONS ================= */

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


