import os

filepath = r"c:\Users\rijov\Desktop\onscreen_monitoring_system\frontend\src\components\admin-dashboard\AdminDashboard.jsx"

with open(filepath, 'r', encoding='utf-8') as f:
    lines = f.readlines()

idx = 0
for i, line in enumerate(lines):
    if "return (" in line:
        idx = i
        break

logic_code = "".join(lines[:idx])

ui_code = """  return (
    <div style={styles.page}>
      <style>{`
        .menu-btn:hover {
          background: #1a1a1a !important;
          transform: translateX(4px);
        }
        .main-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 15px rgba(255,255,255,0.1);
        }
        .glass-input:focus {
          border: 1px solid rgba(255,255,255,0.2) !important;
          box-shadow: 0 0 10px rgba(255,255,255,0.05);
        }
        @keyframes pulseGlow {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        @keyframes pulseGlowGreen {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>
          Admin Panel
        </h2>

        <button
          className="menu-btn"
          style={styles.menuBtn}
          onClick={fetchStudents}
        >
          All Students
        </button>

        {courses.map((course) => (
          <button
            key={course.id}
            className="menu-btn"
            style={styles.menuBtn}
            onClick={() =>
              fetchCourseStudents(
                course.id,
                course.name
              )
            }
          >
            {course.name}
          </button>
        ))}
      </div>

      {/* MAIN */}
      <div style={styles.main}>

        <div style={styles.grid2}>
          {/* ADD COURSE */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Add Course</h3>
            <div style={styles.row}>
              <input
                className="glass-input"
                style={styles.input}
                placeholder="Enter course name"
                value={courseName}
                onChange={(e) => setCourseName(e.target.value)}
              />
              <button
                className="main-btn"
                style={styles.addBtn}
                onClick={addCourse}
              >
                Add
              </button>
            </div>
          </div>

          {/* EXAM MANAGEMENT */}
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>Exam Management</h3>
            <div style={styles.row}>
              <button
                className="main-btn"
                style={{...styles.addBtn, flex: 1}}
                onClick={() => navigate("/admin/create-exam")}
              >
                + Create Exam
              </button>
              <button
                className="main-btn"
                style={{...styles.addBtn, flex: 1, background: "#181818", color: "#ffffff", border: "1px solid rgba(255,255,255,0.08)"}}
                onClick={() => navigate("/admin/manage-exam")}
              >
                Manage Exams
              </button>
            </div>
          </div>
        </div>

        {/* EMAIL SECTION */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Email Notifications</h3>
          
          <div style={{...styles.row, marginBottom: "15px"}}>
            <input
              className="glass-input"
              style={styles.input}
              placeholder="Email subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
            />
          </div>

          <textarea
            className="glass-input"
            style={styles.textarea}
            placeholder="Write email message..."
            value={emailMessage}
            onChange={(e) => setEmailMessage(e.target.value)}
          />

          <div style={styles.emailActions}>
            <button
              className="main-btn"
              disabled={sendingAll}
              style={{
                ...styles.sendAllBtn,
                background: sendingAll ? "#16a34a" : "#ffffff",
                color: sendingAll ? "#ffffff" : "#000000",
                opacity: sendingAll ? 0.7 : 1,
              }}
              onClick={sendAllEmails}
            >
              {sendingAll ? "Sent ✓" : "Send To All"}
            </button>

            {courses.map((course) => (
              <button
                className="main-btn"
                key={course.id}
                disabled={sendingCourse === course.name}
                style={{
                  ...styles.courseEmailBtn,
                  background: sendingCourse === course.name ? "#16a34a" : "#181818",
                  opacity: sendingCourse === course.name ? 0.7 : 1,
                }}
                onClick={() => sendCourseEmail(course.name)}
              >
                {sendingCourse === course.name ? "Sent ✓" : `Send ${course.name}`}
              </button>
            ))}
          </div>
        </div>


        {/* TITLE AND LIVE MONITORING TOGGLE */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
          <h3 style={{ ...styles.title, margin: 0 }}>
            {selectedCourse
              ? `Students in ${selectedCourse}`
              : "All Students"}
          </h3>
          <button
            className="main-btn"
            onClick={() => setIsLiveMonitoringOn(!isLiveMonitoringOn)}
            style={{
              ...styles.liveBtn,
              background: isLiveMonitoringOn ? "#181818" : "#ffffff",
              color: isLiveMonitoringOn ? "#ffffff" : "#000000",
              border: isLiveMonitoringOn ? "1px solid rgba(255,255,255,0.08)" : "none",
            }}
          >
            <span style={{
              ...styles.liveDot,
              background: isLiveMonitoringOn ? "#ef4444" : "#10b981",
              animation: isLiveMonitoringOn ? "pulseGlow 2s infinite" : "pulseGlowGreen 2s infinite"
            }}></span>
            {isLiveMonitoringOn ? "Monitoring Active" : "Start Live Monitoring"}
          </button>
        </div>

        {/* LIVE REPORTS PANEL */}
        {showLivePanel && (
          <div style={styles.livePanel}>
            <div style={styles.livePanelHeader}>
              <h3 style={{ margin: 0, color: "white", display: "flex", alignItems: "center", gap: "10px", fontSize: "18px" }}>
                <span style={{...styles.liveDot, background: "#ef4444", animation: "pulseGlow 2s infinite"}}></span> Live Alert Feed
              </h3>
              <button onClick={() => setShowLivePanel(false)} style={styles.closeLiveBtn}>✕</button>
            </div>

            <div style={styles.liveReportsContainer}>
              {liveReports.length === 0 ? (
                <p style={{ textAlign: "center", color: "#71717a", padding: "20px 0" }}>Scanning environment for violations...</p>
              ) : (
                liveReports.map(report => (
                  <div key={report.id} style={styles.liveReportCard}>
                    <div style={styles.liveReportInfo}>
                      <p style={styles.liveReportTime}>{report.timestamp}</p>
                      <h4 style={styles.liveReportName}>{report.student_name}</h4>
                      <p style={styles.liveReportExam}>{report.exam_name}</p>
                      <p style={styles.liveReportDesc}>⚠️ {report.description}</p>
                    </div>
                    {report.screenshot && (
                      <img src={report.screenshot} alt="Screenshot" style={styles.liveReportImg} />
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TABLE */}
        <div style={styles.tableCard}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Profile</th>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Course</th>
                <th style={styles.th}>Reg No</th>
                <th style={styles.th}>UUCMS</th>
                <th style={styles.th}>Status</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td style={styles.td}>
                    <img
                      src={student.profile || "https://i.ibb.co/7Q9V9mZ/user.png"}
                      alt="profile"
                      style={styles.profileImg}
                    />
                  </td>
                  <td style={{...styles.td, fontWeight: "600", color: "#ffffff"}}>{student.name}</td>
                  <td style={styles.td}>{student.email}</td>
                  <td style={styles.td}>{student.course}</td>
                  <td style={styles.td}>{student.reg_no}</td>
                  <td style={styles.td}>{student.uucms_no}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        padding: "6px 12px",
                        borderRadius: "50px",
                        fontSize: "12px",
                        fontWeight: "700",
                        background: student.is_active ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
                        color: student.is_active ? "#4ade80" : "#f87171",
                        border: student.is_active ? "1px solid rgba(34,197,94,0.2)" : "1px solid rgba(239,68,68,0.2)",
                      }}
                    >
                      {student.is_active ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td style={styles.td}>
                    <div style={styles.actionBox}>
                      <button className="main-btn" style={styles.viewBtn} onClick={() => viewStudent(student)}>
                        View
                      </button>

                      <button className="main-btn" style={styles.viewBtn} onClick={() => fetchStudentResults(student)}>
                        Results
                      </button>

                      <button className="main-btn" style={styles.viewBtn} onClick={() => fetchStudentReports(student)}>
                        Reports
                      </button>

                      <button className="main-btn" style={styles.editBtn} onClick={() => openEdit(student)}>
                        Edit
                      </button>

                      <button className="main-btn" style={styles.blockBtn} onClick={() => toggleStatus(student.id)}>
                        {student.is_active ? "Block" : "Unblock"}
                      </button>

                      <button
                        className="main-btn"
                        disabled={sendingStudent === student.email}
                        style={{
                          ...styles.emailBtn,
                          background: sendingStudent === student.email ? "#16a34a" : "#1a1a1a",
                          opacity: sendingStudent === student.email ? 0.7 : 1,
                        }}
                        onClick={() => sendEmail(student.email)}
                      >
                        {sendingStudent === student.email ? "Sent ✓" : "Email"}
                      </button>

                      <button className="main-btn" style={styles.deleteBtn} onClick={() => deleteStudent(student.id)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* EDIT MODAL */}
        {editingStudent && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h3 style={styles.modalTitle}>Edit Student</h3>
              
              <input
                className="glass-input"
                style={styles.input}
                placeholder="First Name"
                value={editForm.first_name}
                onChange={(e) => setEditForm({ ...editForm, first_name: e.target.value })}
              />
              <input
                className="glass-input"
                style={styles.input}
                placeholder="Last Name"
                value={editForm.last_name}
                onChange={(e) => setEditForm({ ...editForm, last_name: e.target.value })}
              />
              <input
                className="glass-input"
                style={styles.input}
                placeholder="Email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
              <input
                className="glass-input"
                style={styles.input}
                placeholder="Register No"
                value={editForm.reg_no}
                onChange={(e) => setEditForm({ ...editForm, reg_no: e.target.value })}
              />
              <input
                className="glass-input"
                style={styles.input}
                placeholder="UUCMS No"
                value={editForm.uucms_no}
                onChange={(e) => setEditForm({ ...editForm, uucms_no: e.target.value })}
              />

              <div style={styles.modalBtns}>
                <button className="main-btn" style={styles.saveBtn} onClick={updateStudent}>
                  Save Changes
                </button>
                <button className="main-btn" style={styles.cancelBtn} onClick={() => setEditingStudent(null)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* RESULTS MODAL */}
        {viewingResultsStudent && (
          <div style={styles.modalOverlay}>
            <div style={{ ...styles.modal, width: "600px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h3 style={{ margin: 0, color: "#ffffff", fontSize: "22px" }}>Results: {viewingResultsStudent.name}</h3>
                <button onClick={() => setViewingResultsStudent(null)} style={styles.closeLiveBtn}>✕</button>
              </div>

              {studentResults.length === 0 ? (
                <p style={{ color: "#a1a1aa", marginTop: "10px" }}>No exams assigned to this student.</p>
              ) : (
                <div style={{ overflowX: "auto", marginTop: "10px" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                      <tr>
                        <th style={{ ...styles.th, background: "#141414" }}>Exam</th>
                        <th style={{ ...styles.th, background: "#141414" }}>Status</th>
                        <th style={{ ...styles.th, background: "#141414" }}>Score</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentResults.map((res, index) => (
                        <tr key={index}>
                          <td style={styles.td}>{res.exam_name}</td>
                          <td style={styles.td}>
                            <span style={{
                              padding: "6px 12px",
                              borderRadius: "50px",
                              fontSize: "12px",
                              fontWeight: "700",
                              background: res.status === "Submitted" ? "rgba(34,197,94,0.1)" : res.status === "In Progress" ? "rgba(234,179,8,0.1)" : "rgba(239,68,68,0.1)",
                              color: res.status === "Submitted" ? "#4ade80" : res.status === "In Progress" ? "#facc15" : "#f87171",
                              border: res.status === "Submitted" ? "1px solid rgba(34,197,94,0.2)" : res.status === "In Progress" ? "1px solid rgba(234,179,8,0.2)" : "1px solid rgba(239,68,68,0.2)"
                            }}>
                              {res.status}
                            </span>
                          </td>
                          <td style={{ ...styles.td, fontWeight: "700", color: "#ffffff" }}>
                            {res.status === "Submitted" ? `${res.score} / ${res.total_marks}` : "-"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* REPORTS MODAL */}
        {viewingReportsStudent && (
          <div style={styles.modalOverlay}>
            <div style={{ ...styles.modal, width: "700px", maxHeight: "80vh", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
                <h3 style={{ margin: 0, color: "#ffffff", fontSize: "22px" }}>Proctoring Reports: {viewingReportsStudent.name}</h3>
                <button onClick={() => setViewingReportsStudent(null)} style={styles.closeLiveBtn}>✕</button>
              </div>

              {studentReports.length === 0 ? (
                <p style={{ color: "#a1a1aa", marginTop: "10px" }}>No malpractice logs found for this student.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "15px", marginTop: "10px" }}>
                  {studentReports.map((report, index) => (
                    <div key={index} style={{ border: "1px solid rgba(239,68,68,0.3)", borderRadius: "20px", padding: "20px", background: "rgba(239,68,68,0.05)" }}>
                      <p style={{ margin: "0 0 12px 0", color: "#f87171", lineHeight: "1.6" }}>
                        <strong style={{ color: "#ffffff" }}>Exam:</strong> {report.exam_name} <br />
                        <strong style={{ color: "#ffffff" }}>Time:</strong> {report.timestamp} <br />
                        <strong style={{ color: "#ffffff" }}>Violation:</strong> {report.description}
                      </p>
                      {report.screenshot && (
                        <img src={report.screenshot} alt="Webcam Capture" style={{ width: "100%", maxHeight: "350px", objectFit: "contain", borderRadius: "12px", border: "1px solid rgba(239,68,68,0.2)" }} />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default AdminDashboard;

// ======================
// STYLES
// ======================

const styles = {
  page: {
    display: "flex",
    minHeight: "100vh",
    background: "linear-gradient(180deg, #000000 0%, #050505 40%, #0b0b0b 100%)",
    fontFamily: "'Poppins', sans-serif",
    color: "#ffffff",
  },
  sidebar: {
    width: "280px",
    background: "#0a0a0a",
    borderRight: "1px solid rgba(255,255,255,0.06)",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    position: "sticky",
    top: 0,
    height: "100vh",
    boxSizing: "border-box",
  },
  logo: {
    fontSize: "26px",
    fontWeight: "800",
    marginBottom: "25px",
    color: "#ffffff",
    letterSpacing: "1px",
  },
  menuBtn: {
    padding: "16px 20px",
    border: "1px solid rgba(255,255,255,0.04)",
    borderRadius: "16px",
    background: "#141414",
    color: "#d1d5db",
    cursor: "pointer",
    textAlign: "left",
    fontWeight: "600",
    fontSize: "14px",
    transition: "0.3s",
  },
  main: {
    flex: 1,
    padding: "35px",
    maxWidth: "1450px",
    margin: "0 auto",
  },
  grid2: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "25px",
    marginBottom: "25px",
  },
  card: {
    background: "#0f0f0f",
    borderRadius: "28px",
    padding: "26px",
    border: "1px solid rgba(255,255,255,0.06)",
    boxShadow: "0 10px 35px rgba(0,0,0,0.45)",
    marginBottom: "25px",
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "20px",
    letterSpacing: "0.5px",
    margin: "0 0 20px 0",
  },
  row: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
  },
  input: {
    flex: 1,
    padding: "16px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.05)",
    background: "#141414",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
    transition: "0.3s",
  },
  textarea: {
    width: "100%",
    minHeight: "140px",
    padding: "16px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.05)",
    background: "#141414",
    color: "#ffffff",
    resize: "vertical",
    outline: "none",
    fontSize: "14px",
    boxSizing: "border-box",
    transition: "0.3s",
  },
  addBtn: {
    padding: "16px 26px",
    border: "none",
    borderRadius: "16px",
    background: "#ffffff",
    color: "#000000",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
    transition: "0.3s",
  },
  emailActions: {
    display: "flex",
    gap: "15px",
    flexWrap: "wrap",
    marginTop: "20px",
  },
  sendAllBtn: {
    padding: "16px 26px",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    cursor: "pointer",
    transition: "0.3s",
    fontWeight: "700",
    fontSize: "14px",
  },
  courseEmailBtn: {
    padding: "16px 26px",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    cursor: "pointer",
    transition: "0.3s",
    fontWeight: "700",
    fontSize: "14px",
    color: "#ffffff",
  },
  title: {
    fontSize: "32px",
    fontWeight: "800",
    color: "#ffffff",
    letterSpacing: "1px",
  },
  liveBtn: {
    padding: "14px 20px",
    border: "none",
    borderRadius: "16px",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "14px",
    transition: "0.3s",
    fontWeight: "600",
  },
  liveDot: {
    width: "10px",
    height: "10px",
    borderRadius: "50%",
  },
  livePanel: {
    background: "#0f0f0f",
    borderRadius: "28px",
    marginBottom: "25px",
    border: "1px solid rgba(255,255,255,0.06)",
    boxShadow: "0 10px 35px rgba(0,0,0,0.45)",
    overflow: "hidden",
  },
  livePanelHeader: {
    background: "#141414",
    padding: "20px 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  closeLiveBtn: {
    background: "transparent",
    border: "none",
    color: "#71717a",
    fontSize: "20px",
    cursor: "pointer",
  },
  liveReportsContainer: {
    padding: "24px",
    maxHeight: "500px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "18px",
  },
  liveReportCard: {
    background: "#141414",
    borderRadius: "20px",
    padding: "20px",
    display: "flex",
    gap: "20px",
    border: "1px solid rgba(255,255,255,0.04)",
    alignItems: "center",
    justifyContent: "space-between",
    transition: "0.3s",
  },
  liveReportInfo: {
    flex: 1,
  },
  liveReportTime: {
    fontSize: "12px",
    color: "#71717a",
    marginBottom: "8px",
    letterSpacing: "0.5px",
    margin: "0 0 8px 0"
  },
  liveReportName: {
    color: "#ffffff",
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "6px",
    margin: "0 0 6px 0"
  },
  liveReportExam: {
    color: "#a1a1aa",
    fontSize: "14px",
    marginBottom: "10px",
    margin: "0 0 10px 0"
  },
  liveReportDesc: {
    color: "#ef4444",
    fontSize: "15px",
    fontWeight: "600",
    margin: 0
  },
  liveReportImg: {
    width: "140px",
    height: "100px",
    borderRadius: "14px",
    objectFit: "cover",
    border: "1px solid rgba(255,255,255,0.08)",
  },
  tableCard: {
    background: "#0f0f0f",
    padding: "24px",
    borderRadius: "28px",
    overflowX: "auto",
    border: "1px solid rgba(255,255,255,0.06)",
    boxShadow: "0 10px 35px rgba(0,0,0,0.45)",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    padding: "18px",
    background: "#141414",
    color: "#9ca3af",
    fontWeight: "600",
    fontSize: "13px",
    textTransform: "uppercase",
    letterSpacing: "1px",
    textAlign: "left",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
  },
  td: {
    padding: "18px",
    borderBottom: "1px solid rgba(255,255,255,0.04)",
    fontSize: "14px",
    color: "#d1d5db",
  },
  profileImg: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    objectFit: "cover",
    background: "#ffffff",
  },
  actionBox: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },
  viewBtn: {
    padding: "10px 16px",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    background: "#1a1a1a",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    transition: "0.3s"
  },
  editBtn: {
    padding: "10px 16px",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    background: "#1a1a1a",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    transition: "0.3s"
  },
  blockBtn: {
    padding: "10px 16px",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    background: "#1a1a1a",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    transition: "0.3s"
  },
  emailBtn: {
    padding: "10px 16px",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    transition: "0.3s"
  },
  deleteBtn: {
    padding: "10px 16px",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "12px",
    background: "#1a1a1a",
    color: "#ef4444",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "13px",
    transition: "0.3s"
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.8)",
    backdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  modal: {
    width: "480px",
    background: "#0f0f0f",
    padding: "30px",
    borderRadius: "28px",
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
  },
  modalTitle: {
    fontSize: "24px",
    fontWeight: "700",
    color: "#ffffff",
    marginBottom: "10px",
    margin: "0 0 10px 0"
  },
  modalBtns: {
    display: "flex",
    gap: "15px",
    marginTop: "10px",
  },
  saveBtn: {
    flex: 1,
    padding: "16px",
    border: "none",
    borderRadius: "16px",
    background: "#ffffff",
    color: "#000000",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
    transition: "0.3s"
  },
  cancelBtn: {
    flex: 1,
    padding: "16px",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "16px",
    background: "#181818",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
    transition: "0.3s"
  },
};
"""

with open(filepath, 'w', encoding='utf-8') as f:
    f.write(logic_code + ui_code)
