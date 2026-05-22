// // import { useEffect, useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import API from "../../api/axios";

// // function Dashboard() {
// //   const navigate = useNavigate();

// //   const [data, setData] = useState(null);
// //   const [notifications, setNotifications] = useState([]);
// //   const [filter, setFilter] = useState("all");

// //   const user = JSON.parse(localStorage.getItem("user") || "{}");

// //   useEffect(() => {
// //     fetchDashboard();
// //     fetchNotifications();
// //   }, []);

// //   const fetchDashboard = async () => {
// //     try {
// //       const res = await API.get("dashboard/");
// //       setData(res.data);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   const fetchNotifications = async () => {
// //     try {
// //       const res = await API.get("student-notifications/");
// //       setNotifications(res.data);
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };

// //   const filteredNotifications = notifications.filter((n) => {
// //     if (filter === "all") return true;

// //     if (filter === "course") {
// //       return (
// //         n.type === "course" ||
// //         n.course === user.course ||
// //         n.course_name === user.course
// //       );
// //     }

// //     return true;
// //   });

// //   const logout = () => {
// //     if (!window.confirm("Logout?")) return;

// //     localStorage.clear();
// //     navigate("/login");
// //   };

// //   return (
// //     <div style={styles.layout}>

// //       {/* ================= SIDEBAR ================= */}
// //       <div style={styles.sidebar}>
// //         <div style={styles.profileBox}>
// //           {user?.profile ? (
// //             <img src={user.profile} style={styles.avatarImg} />
// //           ) : (
// //             <div style={styles.avatar}>
// //               {user?.first_name?.charAt(0)}
// //             </div>
// //           )}

// //           <h3 style={{ marginTop: 10 }}>
// //             {user?.first_name} {user?.last_name}
// //           </h3>

// //           <p style={styles.email}>{user?.email}</p>
// //         </div>

// //         <div style={styles.menu}>
// //           <p>📊 Dashboard</p>
// //           <p>👤 Profile</p>
// //           <p>📢 Notifications</p>
// //           <p>⚙ Settings</p>

// //           <button style={styles.logoutBtn} onClick={logout}>
// //             🚪 Logout
// //           </button>
// //         </div>
// //       </div>

// //       {/* ================= MAIN ================= */}
// //       <div style={styles.main}>

// //         <div style={styles.topbar}>
// //           <h2>🎓 Student Dashboard</h2>
// //         </div>

// //         {/* USER INFO */}
// //         <div style={styles.infoCard}>
// //           <div>
// //             <span>📘 Course</span>
// //             <h4>{user?.course}</h4>
// //           </div>

// //           <div>
// //             <span>🆔 Reg No</span>
// //             <h4>{user?.reg_no}</h4>
// //           </div>

// //           <div>
// //             <span>🏫 UUCMS</span>
// //             <h4>{user?.uucms_no}</h4>
// //           </div>
// //         </div>

// //         {/* STATS */}
// //         <div style={styles.grid}>
// //           <div style={styles.card}>
// //             <h3>🟢 Status</h3>
// //             <p style={{ color: "#10b981" }}>Active</p>
// //           </div>

// //           <div style={styles.card}>
// //             <h3>🔔 Alerts</h3>
// //             <p>{data?.alerts ?? 0}</p>
// //           </div>

// //           <div style={styles.card}>
// //             <h3>📢 Message</h3>
// //             <p>{data?.message ?? "Welcome"}</p>
// //           </div>
// //         </div>

// //         {/* ================= NOTIFICATIONS ================= */}
// //         <div style={styles.notificationBox}>
// //           <div style={styles.notifHeader}>
// //             <h3>📢 Notifications</h3>

// //             <div style={styles.filterRow}>
// //               <button
// //                 style={{
// //                   ...styles.filterBtn,
// //                   background: filter === "all" ? "#111827" : "#e5e7eb",
// //                   color: filter === "all" ? "#fff" : "#111",
// //                 }}
// //                 onClick={() => setFilter("all")}
// //               >
// //                 All
// //               </button>

// //               <button
// //                 style={{
// //                   ...styles.filterBtn,
// //                   background: filter === "course" ? "#111827" : "#e5e7eb",
// //                   color: filter === "course" ? "#fff" : "#111",
// //                 }}
// //                 onClick={() => setFilter("course")}
// //               >
// //                 My Course
// //               </button>
// //             </div>
// //           </div>

// //           {/* LIST */}
// //           <div style={{ marginTop: 15 }}>
// //             {filteredNotifications.length === 0 ? (
// //               <p style={{ color: "#6b7280" }}>No notifications</p>
// //             ) : (
// //               filteredNotifications.map((n) => (
// //                 <div key={n.id} style={styles.notifCard}>
// //                   <h4 style={styles.notifTitle}>{n.title}</h4>
// //                   <p style={styles.notifMsg}>{n.message}</p>
// //                 </div>
// //               ))
// //             )}
// //           </div>
// //         </div>

// //       </div>
// //     </div>
// //   );
// // }

// // export default Dashboard;

// // /* ================= MODERN STYLES ================= */
// // const styles = {

// //   layout: {
// //     display: "flex",
// //     minHeight: "100vh",
// //     fontFamily: "Segoe UI",
// //     background: "linear-gradient(135deg,#eef2f7,#dbeafe)",
// //   },

// //   /* SIDEBAR */
// //   sidebar: {
// //     width: "260px",
// //     background: "linear-gradient(180deg,#0f172a,#1e3c72)",
// //     color: "#fff",
// //     padding: 20,
// //     boxShadow: "10px 0 30px rgba(0,0,0,0.1)",
// //   },

// //   profileBox: {
// //     textAlign: "center",
// //     paddingBottom: 20,
// //     borderBottom: "1px solid rgba(255,255,255,0.1)",
// //   },

// //   avatar: {
// //     width: 70,
// //     height: 70,
// //     borderRadius: "50%",
// //     background: "#fff",
// //     color: "#1e3c72",
// //     display: "flex",
// //     justifyContent: "center",
// //     alignItems: "center",
// //     fontSize: 24,
// //     fontWeight: "bold",
// //     margin: "auto",
// //   },

// //   avatarImg: {
// //     width: 70,
// //     height: 70,
// //     borderRadius: "50%",
// //     objectFit: "cover",
// //     border: "2px solid #fff",
// //   },

// //   email: {
// //     fontSize: 12,
// //     color: "#cbd5e1",
// //   },

// //   menu: {
// //     marginTop: 20,
// //     lineHeight: 2.5,
// //     fontSize: 14,
// //   },

// //   logoutBtn: {
// //     width: "100%",
// //     marginTop: 20,
// //     padding: 10,
// //     borderRadius: 10,
// //     border: "none",
// //     background: "#ef4444",
// //     color: "#fff",
// //     cursor: "pointer",
// //     fontWeight: "bold",
// //   },

// //   /* MAIN */
// //   main: {
// //     flex: 1,
// //     padding: 25,
// //   },

// //   topbar: {
// //     background: "#fff",
// //     padding: 15,
// //     borderRadius: 14,
// //     marginBottom: 20,
// //     boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
// //   },

// //   infoCard: {
// //     background: "#fff",
// //     padding: 18,
// //     borderRadius: 14,
// //     marginBottom: 20,
// //     display: "flex",
// //     justifyContent: "space-between",
// //     boxShadow: "0 6px 15px rgba(0,0,0,0.05)",
// //   },

// //   grid: {
// //     display: "grid",
// //     gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))",
// //     gap: 20,
// //   },

// //   card: {
// //     background: "#fff",
// //     padding: 20,
// //     borderRadius: 16,
// //     textAlign: "center",
// //     boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
// //   },

// //   /* NOTIFICATIONS */
// //   notificationBox: {
// //     marginTop: 25,
// //     background: "#fff",
// //     padding: 20,
// //     borderRadius: 16,
// //     boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
// //   },

// //   notifHeader: {
// //     display: "flex",
// //     justifyContent: "space-between",
// //     alignItems: "center",
// //     flexWrap: "wrap",
// //   },

// //   filterRow: {
// //     display: "flex",
// //     gap: 10,
// //   },

// //   filterBtn: {
// //     padding: "8px 14px",
// //     borderRadius: 10,
// //     border: "none",
// //     cursor: "pointer",
// //     fontWeight: "bold",
// //     transition: "0.3s",
// //   },

// //   notifCard: {
// //     padding: 14,
// //     borderRadius: 12,
// //     background: "#f8fafc",
// //     border: "1px solid #e5e7eb",
// //     marginBottom: 10,
// //     transition: "0.3s",
// //   },

// //   notifTitle: {
// //     margin: 0,
// //     fontSize: 15,
// //   },

// //   notifMsg: {
// //     margin: 0,
// //     fontSize: 13,
// //     color: "#4b5563",
// //   },
// // };





// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../../api/axios";

// function Dashboard() {
//   const navigate = useNavigate();

//   const [data, setData] = useState(null);
//   const [notifications, setNotifications] = useState([]);
//   const [exams, setExams] = useState([]); // ✅ IMPORTANT FIX
//   const [filter, setFilter] = useState("all");
//   const [currentTime, setCurrentTime] = useState(Date.now());

//   const user = JSON.parse(localStorage.getItem("user") || "{}");

//   useEffect(() => {
//     const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
//     return () => clearInterval(timer);
//   }, []);

  

//   useEffect(() => {
//     fetchDashboard();
//     fetchNotifications();
//     fetchExams(); // ✅ ADD
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

//   // ================= EXAMS =================
//   const fetchExams = async () => {
//     try {
//       const res = await API.get("exams-list/");
//       setExams(res.data);
//     } catch (err) {
//       console.log("Exam load error:", err);
//     }
//   };

//   // ================= FILTER NOTIFICATIONS =================
//   const filteredNotifications = notifications.filter((n) => {
//     // Filter out if it's an exam notification and the exam has ended
//     if (n.exam_id) {
//       const linkedExam = exams.find((e) => e.id === n.exam_id);
//       if (linkedExam) {
//         const end = new Date(linkedExam.end_time).getTime();
//         if (currentTime > end) return false;
//       }
//     }

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

//   // ================= EXAM TIME LOGIC =================
//   const canStartExam = (exam) => {
//     if (exam.is_submitted) return false;

//     const start = new Date(exam.start_time).getTime();
//     const end = new Date(exam.end_time).getTime();

//     const startWindow = start - 10 * 60 * 1000; // 10 min before

//     return currentTime >= startWindow && currentTime <= end;
//   };

//   const getExamStatusText = (exam) => {
//     if (exam.is_submitted) return "Submitted";
    
//     const start = new Date(exam.start_time).getTime();
//     const end = new Date(exam.end_time).getTime();

//     if (currentTime > end) return "Ended";
//     if (currentTime >= start) return "Ongoing";

//     const diff = start - currentTime;
//     if (diff <= 10 * 60 * 1000 && diff > 0) {
//       const minutes = Math.floor(diff / 60000);
//       const seconds = Math.floor((diff % 60000) / 1000);
//       return `Starts in ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
//     }
//     return "Locked";
//   };

//   // Filter out ended exams
//   const activeExams = exams.filter(
//     (exam) => new Date(exam.end_time).getTime() >= currentTime
//   );

//   // ================= START EXAM =================
//   const startExam = (exam) => {
//     navigate(`/exam-terms/${exam.id}`, { state: { exam } });
//   };

//   // ================= LOGOUT =================
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
//           {/* <p>📊 Dashboard</p>
//           <p>👤 Profile</p>
//           <p>📢 Notifications</p>
//           <p>⚙ Settings</p> */}

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

//         {/* ================= EXAMS SECTION ================= */}
//         <div style={styles.examBox}>
//           <h3>📝 Available Exams</h3>

//           {activeExams.length === 0 ? (
//             <p style={{ color: "#6b7280" }}>No exams available</p>
//           ) : (
//             activeExams.map((exam) => (
//               <div key={exam.id} style={styles.examCard}>
                
//                 <div>
//                   <h4>{exam.name}</h4>
//                   <p style={{ fontSize: 13, color: "#666" }}>
//                       🕒 {new Date(exam.start_time).toLocaleString()} →{" "}
//                     {new Date(exam.end_time).toLocaleString()}
//                   </p>
//                   <p style={{ fontSize: 13, color: "#666", marginTop: 5 }}>
//                     <b>Status:</b> {getExamStatusText(exam)}
//                   </p>
//                 </div>

//                 <button
//                   disabled={!canStartExam(exam)}
//                   onClick={() => startExam(exam)}
//                   style={{
//                     ...styles.startBtn,
//                     background: canStartExam(exam) ? "#10b981" : "#9ca3af",
//                     cursor: canStartExam(exam) ? "pointer" : "not-allowed",
//                   }}
//                 >
//                   {exam.is_submitted ? "Completed" : canStartExam(exam) ? "Enter Exam" : "Locked"}
//                 </button>

//               </div>
//             ))
//           )}
//         </div>

//         {/* ================= STATS ================= */}
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

//   /* ================= EXAMS ================= */

//   examBox: {
//     marginTop: 25,
//     background: "#fff",
//     padding: 20,
//     borderRadius: 16,
//     boxShadow: "0 10px 25px rgba(0,0,0,0.06)",
//   },

//   examCard: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: 15,
//     borderRadius: 12,
//     background: "#f9fafb",
//     border: "1px solid #e5e7eb",
//     marginTop: 10,
//     transition: "0.3s",
//   },

//   startBtn: {
//     padding: "10px 16px",
//     border: "none",
//     borderRadius: 10,
//     color: "#fff",
//     fontWeight: "bold",
//     cursor: "pointer",
//     transition: "0.3s",
//   },

//   /* ================= NOTIFICATIONS ================= */

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
  const [exams, setExams] = useState([]);
  const [filter, setFilter] = useState("all");
  const [currentTime, setCurrentTime] = useState(Date.now());
  const [activeNav, setActiveNav] = useState("Dashboard");

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchDashboard();
    fetchNotifications();
    fetchExams();
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

  const fetchExams = async () => {
    try {
      const res = await API.get("exams-list/");
      setExams(res.data);
    } catch (err) {
      console.log("Exam load error:", err);
    }
  };

  const filteredNotifications = notifications.filter((n) => {
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

  const canStartExam = (exam) => {
    if (exam.is_submitted) return false;
    const start = new Date(exam.start_time).getTime();
    const end = new Date(exam.end_time).getTime();
    const startWindow = start - 10 * 60 * 1000;
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

  const activeExams = exams.filter(
    (exam) => new Date(exam.end_time).getTime() >= currentTime
  );

  const startExam = (exam) => {
    navigate(`/exam-terms/${exam.id}`, { state: { exam } });
  };

  const logout = () => {
    if (!window.confirm("Logout?")) return;
    localStorage.clear();
    navigate("/login");
  };

  const navItems = [
    { icon: "📊", label: "Dashboard" },
    { icon: "👤", label: "Profile" },
    { icon: "📝", label: "Exams" },
    { icon: "📢", label: "Notifications" },
    { icon: "⚙️", label: "Settings" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .sufee-layout {
          display: flex;
          min-height: 100vh;
          font-family: 'Nunito', sans-serif;
          background: #f5f6fa;
        }

        /* ===== SIDEBAR ===== */
        .sufee-sidebar {
          width: 240px;
          min-height: 100vh;
          background: #2b2d42;
          color: #fff;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }

        .sufee-brand {
          padding: 20px 22px;
          font-size: 20px;
          font-weight: 800;
          color: #fff;
          background: #23253a;
          letter-spacing: 0.5px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .sufee-brand span { color: #ef4444; }

        .sufee-profile-mini {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 18px 22px;
          border-bottom: 1px solid rgba(255,255,255,0.07);
        }
        .sufee-avatar {
          width: 44px; height: 44px;
          border-radius: 50%;
          background: #ef4444;
          display: flex; align-items: center; justify-content: center;
          font-size: 18px; font-weight: 800; color: #fff;
          flex-shrink: 0;
        }
        .sufee-avatar img {
          width: 44px; height: 44px;
          border-radius: 50%; object-fit: cover;
        }
        .sufee-profile-mini .name {
          font-size: 14px; font-weight: 700; color: #fff;
          line-height: 1.3;
        }
        .sufee-profile-mini .role {
          font-size: 11px; color: #9ca3af;
        }

        .sufee-nav-label {
          padding: 16px 22px 6px;
          font-size: 10px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #6b7280;
        }

        .sufee-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 22px;
          cursor: pointer;
          font-size: 13.5px;
          font-weight: 600;
          color: #9ca3af;
          transition: all 0.18s;
          border-left: 3px solid transparent;
        }
        .sufee-nav-item:hover {
          background: rgba(255,255,255,0.05);
          color: #fff;
        }
        .sufee-nav-item.active {
          background: rgba(239,68,68,0.12);
          color: #fff;
          border-left: 3px solid #ef4444;
        }
        .sufee-nav-item .icon { font-size: 16px; }

        .sufee-logout {
          margin: auto 16px 20px;
          padding: 10px;
          background: #ef4444;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          width: calc(100% - 32px);
          transition: background 0.2s;
        }
        .sufee-logout:hover { background: #dc2626; }

        /* ===== MAIN ===== */
        .sufee-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }

        .sufee-topbar {
          background: #fff;
          padding: 14px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
          border-bottom: 1px solid #e5e7eb;
        }
        .sufee-topbar h2 {
          font-size: 18px; font-weight: 800; color: #1f2937;
        }
        .sufee-breadcrumb {
          font-size: 13px; color: #9ca3af; font-weight: 600;
        }

        .sufee-content { padding: 24px 28px; overflow-y: auto; flex: 1; }

        /* ===== ALERT BANNER ===== */
        .sufee-alert {
          background: #d1fae5;
          border: 1px solid #6ee7b7;
          border-radius: 8px;
          padding: 10px 16px;
          font-size: 13px;
          font-weight: 600;
          color: #065f46;
          margin-bottom: 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sufee-alert .badge {
          background: #059669; color: #fff;
          border-radius: 4px; padding: 2px 8px;
          font-size: 11px; margin-right: 10px;
        }

        /* ===== STAT CARDS ===== */
        .sufee-stat-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          margin-bottom: 24px;
        }

        .sufee-stat-card {
          border-radius: 10px;
          padding: 20px 22px;
          color: #fff;
          position: relative;
          overflow: hidden;
          min-height: 110px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        .sufee-stat-card::after {
          content: '';
          position: absolute;
          bottom: -18px; right: -18px;
          width: 80px; height: 80px;
          border-radius: 50%;
          background: rgba(255,255,255,0.12);
        }
        .sufee-stat-card.blue   { background: linear-gradient(135deg,#3b82f6,#1d4ed8); }
        .sufee-stat-card.teal   { background: linear-gradient(135deg,#14b8a6,#0f766e); }
        .sufee-stat-card.yellow { background: linear-gradient(135deg,#f59e0b,#d97706); }
        .sufee-stat-card.red    { background: linear-gradient(135deg,#ef4444,#b91c1c); }

        .sufee-stat-card .stat-label {
          font-size: 12px; font-weight: 600; opacity: 0.85; text-transform: uppercase; letter-spacing: 0.5px;
        }
        .sufee-stat-card .stat-value {
          font-size: 28px; font-weight: 800; line-height: 1;
        }
        .sufee-stat-card .stat-sub {
          font-size: 11px; opacity: 0.75;
        }
        .sufee-stat-card .stat-icon {
          position: absolute; top: 18px; right: 20px;
          font-size: 26px; opacity: 0.6;
        }

        /* ===== INFO STRIP ===== */
        .sufee-info-strip {
          background: #fff;
          border-radius: 10px;
          padding: 16px 22px;
          display: flex;
          gap: 40px;
          margin-bottom: 24px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          flex-wrap: wrap;
        }
        .sufee-info-strip .info-item .info-label {
          font-size: 11px; color: #9ca3af; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.5px;
        }
        .sufee-info-strip .info-item .info-value {
          font-size: 15px; font-weight: 800; color: #1f2937; margin-top: 2px;
        }

        /* ===== TABLE/PANEL SHARED ===== */
        .sufee-panel {
          background: #fff;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          margin-bottom: 24px;
          overflow: hidden;
        }
        .sufee-panel-header {
          padding: 14px 20px;
          border-bottom: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .sufee-panel-header h3 {
          font-size: 15px; font-weight: 800; color: #1f2937;
        }
        .sufee-panel-body { padding: 16px 20px; }

        /* ===== EXAMS TABLE ===== */
        .sufee-table { width: 100%; border-collapse: collapse; }
        .sufee-table thead tr {
          background: #f9fafb;
        }
        .sufee-table th {
          text-align: left;
          padding: 10px 14px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.6px;
          color: #6b7280;
          border-bottom: 1px solid #e5e7eb;
        }
        .sufee-table td {
          padding: 13px 14px;
          font-size: 13.5px;
          color: #374151;
          border-bottom: 1px solid #f3f4f6;
          font-weight: 600;
        }
        .sufee-table tr:last-child td { border-bottom: none; }
        .sufee-table tr:hover td { background: #fafafa; }

        .badge-status {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }
        .badge-ongoing  { background: #d1fae5; color: #065f46; }
        .badge-locked   { background: #fee2e2; color: #991b1b; }
        .badge-submitted{ background: #dbeafe; color: #1e40af; }
        .badge-countdown{ background: #fef3c7; color: #92400e; }

        .exam-start-btn {
          padding: 7px 16px;
          border: none;
          border-radius: 7px;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .exam-start-btn.green { background: #059669; color: #fff; }
        .exam-start-btn.green:hover { opacity: 0.85; }
        .exam-start-btn.gray  { background: #e5e7eb; color: #9ca3af; cursor: not-allowed; }

        /* ===== NOTIFICATIONS ===== */
        .sufee-notif-item {
          padding: 13px 0;
          border-bottom: 1px solid #f3f4f6;
          display: flex;
          gap: 12px;
          align-items: flex-start;
        }
        .sufee-notif-item:last-child { border-bottom: none; }
        .notif-dot {
          width: 10px; height: 10px; border-radius: 50%;
          background: #3b82f6; margin-top: 5px; flex-shrink: 0;
        }
        .notif-title { font-size: 13.5px; font-weight: 700; color: #1f2937; }
        .notif-msg   { font-size: 12.5px; color: #6b7280; margin-top: 2px; }

        .filter-tabs { display: flex; gap: 8px; }
        .filter-tab {
          padding: 5px 14px;
          border-radius: 20px;
          border: none;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.2s;
        }
        .filter-tab.active   { background: #2b2d42; color: #fff; }
        .filter-tab.inactive { background: #f3f4f6; color: #6b7280; }
        .filter-tab.inactive:hover { background: #e5e7eb; }

        .empty-msg { color: #9ca3af; font-size: 13px; padding: 12px 0; }
      `}</style>

      <div className="sufee-layout">

        {/* ===== SIDEBAR ===== */}
        <div className="sufee-sidebar">
          <div className="sufee-brand">
            Student <span>Portal</span>
          </div>

          <div className="sufee-profile-mini">
            {user?.profile ? (
              <div className="sufee-avatar"><img src={user.profile} alt="profile" /></div>
            ) : (
              <div className="sufee-avatar">{user?.first_name?.charAt(0) || "S"}</div>
            )}
            <div>
              <div className="name">{user?.first_name} {user?.last_name}</div>
              <div className="role">Student</div>
            </div>
          </div>

          <div className="sufee-nav-label">Navigation</div>

          {navItems.map((item) => (
            <div
              key={item.label}
              className={`sufee-nav-item ${activeNav === item.label ? "active" : ""}`}
              onClick={() => setActiveNav(item.label)}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </div>
          ))}

          <button className="sufee-logout" onClick={logout}>🚪 Logout</button>
        </div>

        {/* ===== MAIN ===== */}
        <div className="sufee-main">

          {/* TOPBAR */}
          <div className="sufee-topbar">
            <h2>🎓 Student Dashboard</h2>
            <div className="sufee-breadcrumb">Dashboard</div>
          </div>

          <div className="sufee-content">

            {/* ALERT BANNER */}
            {data?.message && (
              <div className="sufee-alert">
                <span>
                  <span className="badge">Info</span>
                  {data.message}
                </span>
                <span style={{ cursor: "pointer", color: "#6b7280" }}>✕</span>
              </div>
            )}

            {/* STAT CARDS */}
            <div className="sufee-stat-grid">
              <div className="sufee-stat-card blue">
                <span className="stat-icon">📘</span>
                <div className="stat-label">Course</div>
                <div className="stat-value" style={{ fontSize: 18 }}>{user?.course || "—"}</div>
                <div className="stat-sub">Enrolled Program</div>
              </div>

              <div className="sufee-stat-card teal">
                <span className="stat-icon">🟢</span>
                <div className="stat-label">Status</div>
                <div className="stat-value" style={{ fontSize: 22 }}>Active</div>
                <div className="stat-sub">Account standing</div>
              </div>

              <div className="sufee-stat-card yellow">
                <span className="stat-icon">🔔</span>
                <div className="stat-label">Alerts</div>
                <div className="stat-value">{data?.alerts ?? 0}</div>
                <div className="stat-sub">Pending alerts</div>
              </div>

              <div className="sufee-stat-card red">
                <span className="stat-icon">📝</span>
                <div className="stat-label">Active Exams</div>
                <div className="stat-value">{activeExams.length}</div>
                <div className="stat-sub">Available now</div>
              </div>
            </div>

            {/* INFO STRIP */}
            <div className="sufee-info-strip">
              <div className="info-item">
                <div className="info-label">🆔 Registration No.</div>
                <div className="info-value">{user?.reg_no || "—"}</div>
              </div>
              <div className="info-item">
                <div className="info-label">🏫 UUCMS No.</div>
                <div className="info-value">{user?.uucms_no || "—"}</div>
              </div>
              <div className="info-item">
                <div className="info-label">✉️ Email</div>
                <div className="info-value">{user?.email || "—"}</div>
              </div>
            </div>

            {/* EXAMS PANEL */}
            <div className="sufee-panel">
              <div className="sufee-panel-header">
                <h3>📝 Available Exams</h3>
              </div>

              {activeExams.length === 0 ? (
                <div className="sufee-panel-body">
                  <p className="empty-msg">No exams available at this time.</p>
                </div>
              ) : (
                <table className="sufee-table">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Exam Name</th>
                      <th>Start Time</th>
                      <th>End Time</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {activeExams.map((exam, idx) => {
                      const statusText = getExamStatusText(exam);
                      const can = canStartExam(exam);
                      const badgeClass =
                        statusText === "Ongoing"   ? "badge-ongoing"  :
                        statusText === "Submitted" ? "badge-submitted":
                        statusText.startsWith("Starts in") ? "badge-countdown" :
                        "badge-locked";

                      return (
                        <tr key={exam.id}>
                          <td>{idx + 1}</td>
                          <td style={{ fontWeight: 700 }}>{exam.name}</td>
                          <td>{new Date(exam.start_time).toLocaleString()}</td>
                          <td>{new Date(exam.end_time).toLocaleString()}</td>
                          <td>
                            <span className={`badge-status ${badgeClass}`}>{statusText}</span>
                          </td>
                          <td>
                            <button
                              disabled={!can}
                              onClick={() => can && startExam(exam)}
                              className={`exam-start-btn ${can ? "green" : "gray"}`}
                            >
                              {exam.is_submitted ? "Completed" : can ? "Enter Exam" : "Locked"}
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {/* NOTIFICATIONS PANEL */}
            <div className="sufee-panel">
              <div className="sufee-panel-header">
                <h3>📢 Notifications</h3>
                <div className="filter-tabs">
                  <button
                    className={`filter-tab ${filter === "all" ? "active" : "inactive"}`}
                    onClick={() => setFilter("all")}
                  >All</button>
                  <button
                    className={`filter-tab ${filter === "course" ? "active" : "inactive"}`}
                    onClick={() => setFilter("course")}
                  >My Course</button>
                </div>
              </div>

              <div className="sufee-panel-body">
                {filteredNotifications.length === 0 ? (
                  <p className="empty-msg">No notifications to display.</p>
                ) : (
                  filteredNotifications.map((n) => (
                    <div key={n.id} className="sufee-notif-item">
                      <div className="notif-dot" />
                      <div>
                        <div className="notif-title">{n.title}</div>
                        <div className="notif-msg">{n.message}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;