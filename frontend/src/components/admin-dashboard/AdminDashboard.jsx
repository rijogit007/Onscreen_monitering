
import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate } from "react-router-dom";
function AdminDashboard() {
  const navigate = useNavigate();
  // ======================
  // STATES
  // ======================

  const [courseName, setCourseName] = useState("");
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const [editingStudent, setEditingStudent] = useState(null);

  const [editForm, setEditForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    reg_no: "",
    uucms_no: "",
  });

  // EMAIL STATES

  const [emailSubject, setEmailSubject] = useState("");
  const [emailMessage, setEmailMessage] = useState("");

  // BUTTON LOADING STATES

  const [sendingAll, setSendingAll] = useState(false);

  const [sendingCourse, setSendingCourse] =
    useState("");

  const [sendingStudent, setSendingStudent] =
    useState("");
  // ======================
  // EXAM STATES
  // ======================

  const [studentResults, setStudentResults] = useState([]);
  const [viewingResultsStudent, setViewingResultsStudent] = useState(null);  // ======================

  const [studentReports, setStudentReports] = useState([]);
  const [viewingReportsStudent, setViewingReportsStudent] = useState(null);

  // ======================
  // LIVE MONITORING STATE
  // ======================
  const [isLiveMonitoringOn, setIsLiveMonitoringOn] = useState(false);
  const [liveReports, setLiveReports] = useState([]);
  const [showLivePanel, setShowLivePanel] = useState(false);


  // ======================
  // DASHBOARD STATS STATE
  // ======================
  const [stats, setStats] = useState({
    total_students: 0,
    active_students: 0,
    blocked_students: 0,
    total_courses: 0,
    active_exams: 0,
    malpractice_today: 0,
  });

  // ======================
  // SEARCH & PAGINATION STATES
  // ======================
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // ======================
  // LOAD DATA
  // ======================

  useEffect(() => {
    fetchStats();
    fetchCourses();
    fetchStudents();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await API.get("admin-dashboard/");
      if (res.data && !res.data.error) setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ======================
  // LIVE ALERTS POLLING
  // ======================
  useEffect(() => {
    if (!isLiveMonitoringOn) {
      setShowLivePanel(false);
      return;
    }

    setShowLivePanel(true);

    // Initial fetch
    const fetchLive = async () => {
      try {
        const res = await API.get("recent-malpractice/");
        if (res.data) setLiveReports(res.data);
      } catch (err) { }
    };
    fetchLive();

    const pollAlerts = setInterval(async () => {
      try {
        const res = await API.get("recent-malpractice/");
        if (res.data) {
          setLiveReports(res.data);
        }
      } catch (err) {
        console.error("Alert polling failed", err);
      }
    }, 5000); // 5 seconds for smoother updates

    return () => clearInterval(pollAlerts);
  }, [isLiveMonitoringOn]);

  // ======================
  // FETCH COURSES
  // ======================

  const fetchCourses = async () => {

    try {

      const res = await API.get("courses/");

      setCourses(res.data);

    } catch (err) {

      console.log(err);
    }
  };

  // ======================
  // FETCH STUDENTS
  // ======================

  const fetchStudents = async () => {

    try {

      const res = await API.get("students/");

      setStudents(res.data);

      setSelectedCourse(null);

    } catch (err) {

      console.log(err);
    }
  };

  // ======================
  // FETCH COURSE STUDENTS
  // ======================

  const fetchCourseStudents = async (
    courseId,
    courseName
  ) => {

    try {

      const res = await API.get(
        `course/${courseId}/`
      );

      setStudents(res.data.students);

      setSelectedCourse(courseName);

    } catch (err) {

      console.log(err);
    }
  };

  // ======================
  // ADD COURSE
  // ======================

  const addCourse = async () => {

    if (!courseName.trim()) {

      alert("Enter course name");

      return;
    }

    try {

      await API.post(
        "add-course/",
        {
          name: courseName,
        }
      );

      setCourseName("");

      fetchCourses();

      alert("Course added");

    } catch (err) {

      console.log(err);

      alert("Failed");
    }
  };

  // ======================
  // DELETE STUDENT
  // ======================

  const deleteStudent = async (id) => {

    const confirmDelete =
      window.confirm(
        "Delete student?"
      );

    if (!confirmDelete) return;

    try {

      await API.delete(
        `students/delete/${id}/`
      );

      fetchStudents();

      alert("Deleted");

    } catch (err) {

      console.log(err);

      alert("Delete failed");
    }
  };

  // ======================
  // BLOCK / UNBLOCK
  // ======================

  const toggleStatus = async (id) => {

    try {

      await API.put(
        `students/status/${id}/`
      );

      fetchStudents();

    } catch (err) {

      console.log(err);

      alert("Status failed");
    }
  };

  // ======================
  // OPEN EDIT
  // ======================

  const openEdit = (student) => {

    setEditingStudent(student);

    const names =
      student.name.split(" ");

    setEditForm({

      first_name: names[0] || "",

      last_name:
        names.slice(1).join(" ") || "",

      email: student.email || "",

      reg_no: student.reg_no || "",

      uucms_no:
        student.uucms_no || "",
    });
  };

  // ======================
  // UPDATE STUDENT
  // ======================

  const updateStudent = async () => {

    try {

      await API.put(
        `students/update/${editingStudent.id}/`,
        editForm
      );

      alert("Student updated");

      setEditingStudent(null);

      fetchStudents();

    } catch (err) {

      console.log(err);

      alert("Update failed");
    }
  };

  // ======================
  // VIEW STUDENT
  // ======================

  const viewStudent = (student) => {

    alert(`
Name: ${student.name}

Email: ${student.email}

Course: ${student.course}

Register No: ${student.reg_no}

UUCMS No: ${student.uucms_no}

Status:
${student.is_active
        ? "Active"
        : "Blocked"}
`);
  };

  // ======================
  // SEND SINGLE EMAIL
  // ======================

  const sendEmail = async (
    email
  ) => {

    if (
      !emailSubject ||
      !emailMessage
    ) {

      alert(
        "Enter subject and message"
      );

      return;
    }

    try {

      setSendingStudent(email);

      await API.post(
        "send-email/",
        {
          email: email,
          subject: emailSubject,
          message: emailMessage,
        }
      );

      alert("Email sent");

      setTimeout(() => {

        setSendingStudent("");

      }, 4000);

    } catch (err) {

      console.log(err);

      setSendingStudent("");

      alert("Email failed");
    }
  };

  // ======================
  // FETCH STUDENT RESULTS
  // ======================

  const fetchStudentResults = async (student) => {
    try {
      const res = await API.get(`student-results/${student.id}/`);
      setStudentResults(res.data);
      setViewingResultsStudent(student);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch results");
    }
  };

  // ======================
  // FETCH STUDENT REPORTS
  // ======================

  const fetchStudentReports = async (student) => {
    try {
      const res = await API.get(`student-reports/${student.id}/`);
      setStudentReports(res.data);
      setViewingReportsStudent(student);
    } catch (err) {
      console.log(err);
      alert("Failed to fetch reports");
    }
  };

  // ======================
  // SEND ALL EMAILS
  // ======================

  const sendAllEmails = async () => {

    if (
      !emailSubject ||
      !emailMessage
    ) {

      alert(
        "Enter subject and message"
      );

      return;
    }

    try {

      setSendingAll(true);

      await API.post(
        "send-all-emails/",
        {
          subject: emailSubject,
          message: emailMessage,
        }
      );

      alert(
        "Email sent to all students"
      );

      setTimeout(() => {

        setSendingAll(false);

      }, 4000);

    } catch (err) {

      console.log(err);

      setSendingAll(false);

      alert("Failed");
    }
  };

  // ======================
  // SEND COURSE EMAIL
  // ======================

  const sendCourseEmail = async (
    course
  ) => {

    if (
      !emailSubject ||
      !emailMessage
    ) {

      alert(
        "Enter subject and message"
      );

      return;
    }

    try {

      setSendingCourse(course);

      await API.post(
        "send-course-email/",
        {
          course: course,
          subject: emailSubject,
          message: emailMessage,
        }
      );

      alert(
        `Email sent to ${course}`
      );

      setTimeout(() => {

        setSendingCourse("");

      }, 4000);

    } catch (err) {

      console.log(err);

      setSendingCourse("");

      alert("Failed");
    }
  };

  // ======================
  // FILTERING & PAGINATION LOGIC
  // ======================
  const filteredStudents = students.filter(student => {
    const matchesSearch = (
      (student.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.email || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.reg_no || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (student.uucms_no || "").toLowerCase().includes(searchQuery.toLowerCase())
    );
    const matchesStatus = 
      statusFilter === "All" ? true :
      statusFilter === "Active" ? student.is_active :
      statusFilter === "Blocked" ? !student.is_active : true;
    
    return matchesSearch && matchesStatus;
  });

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, startIndex + itemsPerPage);

  // Auto-reset page if filter results are fewer than current page allows
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [filteredStudents.length, currentPage, totalPages]);


  return (

    <div style={styles.page}>

      {/* SIDEBAR */}

      <div style={styles.sidebar}>

        <h2 style={styles.logo}>
          Admin Panel
        </h2>

        <button
          style={styles.menuBtn}
          onClick={fetchStudents}
        >
          All Students
        </button>

        {courses.map((course) => (

          <button
            key={course.id}
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

        {/* DASHBOARD STATS CARDS */}
        <div style={styles.statsGrid}>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>👥</div>
            <div>
              <p style={styles.statTitle}>Total Students</p>
              <h3 style={styles.statValue}>{stats.total_students}</h3>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📚</div>
            <div>
              <p style={styles.statTitle}>Total Courses</p>
              <h3 style={styles.statValue}>{stats.total_courses}</h3>
            </div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statIcon}>📝</div>
            <div>
              <p style={styles.statTitle}>Active Exams</p>
              <h3 style={styles.statValue}>{stats.active_exams}</h3>
            </div>
          </div>
          <div style={{...styles.statCard, borderLeft: "4px solid #ef4444"}}>
            <div style={{...styles.statIcon, background: "rgba(239, 68, 68, 0.2)", color: "#ef4444"}}>⚠️</div>
            <div>
              <p style={styles.statTitle}>Alerts Today</p>
              <h3 style={{...styles.statValue, color: stats.malpractice_today > 0 ? "#ef4444" : "white"}}>{stats.malpractice_today}</h3>
            </div>
          </div>
        </div>

        {/* ADD COURSE */}

        <div style={styles.card}>

          <h3>Add Course</h3>

          <div style={styles.row}>

            <input
              style={styles.input}
              placeholder="Enter course"
              value={courseName}
              onChange={(e) =>
                setCourseName(
                  e.target.value
                )
              }
            />

            <button
              style={styles.addBtn}
              onClick={addCourse}
            >
              Add
            </button>

          </div>

        </div>

        {/* EMAIL SECTION */}

        <div style={styles.card}>

          <h3>
            Email Notifications
          </h3>

          <input
            style={styles.input}
            placeholder="Email subject"
            value={emailSubject}
            onChange={(e) =>
              setEmailSubject(
                e.target.value
              )
            }
          />


          <textarea
            style={styles.textarea}
            placeholder="Write email message..."
            value={emailMessage}
            onChange={(e) =>
              setEmailMessage(
                e.target.value
              )
            }
          />

          <div style={styles.emailActions}>

            {/* SEND ALL */}

            <button
              disabled={sendingAll}
              style={{
                ...styles.sendAllBtn,

                background:
                  sendingAll
                    ? "#16a34a"
                    : "#dc2626",

                opacity:
                  sendingAll
                    ? 0.7
                    : 1,
              }}
              onClick={sendAllEmails}
            >
              {sendingAll
                ? "Sent ✓"
                : "Send All"}
            </button>

            {/* COURSE EMAIL */}

            {courses.map((course) => (

              <button
                key={course.id}
                disabled={
                  sendingCourse ===
                  course.name
                }
                style={{
                  ...styles.courseEmailBtn,

                  background:
                    sendingCourse ===
                      course.name
                      ? "#16a34a"
                      : "#2563eb",

                  opacity:
                    sendingCourse ===
                      course.name
                      ? 0.7
                      : 1,
                }}
                onClick={() =>
                  sendCourseEmail(
                    course.name
                  )
                }
              >
                {sendingCourse ===
                  course.name
                  ? "Sent ✓"
                  : `Send ${course.name}`}
              </button>

            ))}

          </div>

        </div>
        <div style={styles.card}>
          <h3>Exam Management</h3>

          <button
            style={styles.addBtn}
            onClick={() => navigate("/admin/create-exam")}
          >
            + Create Exam
          </button>

          <button
            style={styles.addBtn}
            onClick={() => navigate("/admin/manage-exam")}
          >
            +Manage
          </button>

        </div>


        {/* TITLE AND LIVE MONITORING TOGGLE */}

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "15px" }}>
          <h3 style={{ ...styles.title, marginBottom: 0 }}>
            {selectedCourse
              ? `Students in ${selectedCourse}`
              : "All Students"}
          </h3>
          <button
            onClick={() => setIsLiveMonitoringOn(!isLiveMonitoringOn)}
            style={{
              padding: "10px 16px",
              border: "none",
              borderRadius: "8px",
              background: isLiveMonitoringOn ? "#ef4444" : "#10b981",
              color: "white",
              fontWeight: "600",
              cursor: "pointer",
              boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "0.3s"
            }}
          >
            <span style={{
              width: "10px",
              height: "10px",
              background: isLiveMonitoringOn ? "#fca5a5" : "#a7f3d0",
              borderRadius: "50%",
              boxShadow: isLiveMonitoringOn ? "0 0 8px #fca5a5" : "none",
              animation: isLiveMonitoringOn ? "pulseGlow 2s infinite" : "none"
            }}></span>
            {isLiveMonitoringOn ? "Turn OFF Live Monitoring" : "Turn ON Live Monitoring"}
          </button>
        </div>

        {/* LIVE REPORTS PANEL */}
        {showLivePanel && (
          <div style={styles.livePanel}>
            <div style={styles.livePanelHeader}>
              <h3 style={{ margin: 0, color: "white", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={styles.liveDot}></span> Live Reports feed
              </h3>
              <button onClick={() => setShowLivePanel(false)} style={styles.closeLiveBtn}>✕</button>
            </div>

            <div style={styles.liveReportsContainer}>
              {liveReports.length === 0 ? (
                <p style={{ textAlign: "center", color: "#64748b", marginTop: "20px" }}>No recent malpractice reports.</p>
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


        {/* TABLE CONTROLS */}
        <div style={styles.tableControls}>
          <input
            style={{...styles.input, flex: 1, minWidth: "250px"}}
            placeholder="Search by Name, Email, Reg No, UUCMS..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <select 
            style={styles.select}
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
          </select>
        </div>

        {/* TABLE */}

        <div style={styles.tableCard}>

          <table style={styles.table}>

            <thead>

              <tr>

                <th style={styles.th}>
                  Profile
                </th>

                <th style={styles.th}>
                  Name
                </th>

                <th style={styles.th}>
                  Email
                </th>

                <th style={styles.th}>
                  Course
                </th>

                <th style={styles.th}>
                  Reg No
                </th>

                <th style={styles.th}>
                  UUCMS
                </th>

                <th style={styles.th}>
                  Status
                </th>

                <th style={styles.th}>
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {paginatedStudents.map(
                (student) => (

                  <tr
                    key={student.id}
                  >

                    <td
                      style={styles.td}
                    >

                      <img
                        src={
                          student.profile ||
                          "https://i.ibb.co/7Q9V9mZ/user.png"
                        }
                        alt="profile"
                        style={
                          styles.profileImg
                        }
                      />

                    </td>

                    <td
                      style={styles.td}
                    >
                      {student.name}
                    </td>

                    <td
                      style={styles.td}
                    >
                      {student.email}
                    </td>

                    <td
                      style={styles.td}
                    >
                      {student.course}
                    </td>

                    <td
                      style={styles.td}
                    >
                      {student.reg_no}
                    </td>

                    <td
                      style={styles.td}
                    >
                      {student.uucms_no}
                    </td>

                    <td
                      style={styles.td}
                    >

                      <span
                        style={{
                          color:
                            student.is_active
                              ? "green"
                              : "red",

                          fontWeight:
                            "bold",
                        }}
                      >
                        {student.is_active
                          ? "Active"
                          : "Blocked"}
                      </span>

                    </td>

                    <td
                      style={styles.td}
                    >

                      <div
                        style={
                          styles.actionBox
                        }
                      >

                        {/* VIEW */}

                        <button
                          style={
                            styles.viewBtn
                          }
                          onClick={() =>
                            viewStudent(
                              student
                            )
                          }
                        >
                          View
                        </button>

                        {/* VIEW RESULTS */}
                        <button
                          style={{
                            ...styles.viewBtn,
                            background: "#0ea5e9"
                          }}
                          onClick={() =>
                            fetchStudentResults(
                              student
                            )
                          }
                        >
                          Results
                        </button>

                        {/* REPORTS */}
                        <button
                          style={{
                            ...styles.viewBtn,
                            background: "#f59e0b"
                          }}
                          onClick={() => fetchStudentReports(student)}
                        >
                          Reports
                        </button>

                        {/* EDIT */}

                        <button
                          style={
                            styles.editBtn
                          }
                          onClick={() =>
                            openEdit(
                              student
                            )
                          }
                        >
                          Edit
                        </button>

                        {/* BLOCK */}

                        <button
                          style={
                            styles.blockBtn
                          }
                          onClick={() =>
                            toggleStatus(
                              student.id
                            )
                          }
                        >
                          {student.is_active
                            ? "Block"
                            : "Unblock"}
                        </button>

                        {/* EMAIL */}

                        <button
                          disabled={
                            sendingStudent ===
                            student.email
                          }
                          style={{
                            ...styles.emailBtn,

                            background:
                              sendingStudent ===
                                student.email
                                ? "#16a34a"
                                : "#7c3aed",

                            opacity:
                              sendingStudent ===
                                student.email
                                ? 0.7
                                : 1,
                          }}
                          onClick={() =>
                            sendEmail(
                              student.email
                            )
                          }
                        >
                          {sendingStudent ===
                            student.email
                            ? "Sent ✓"
                            : "Email"}
                        </button>

                        {/* DELETE */}

                        <button
                          style={
                            styles.deleteBtn
                          }
                          onClick={() =>
                            deleteStudent(
                              student.id
                            )
                          }
                        >
                          Delete
                        </button>

                      </div>

                    </td>

                  </tr>

                )
              )}

            </tbody>

          </table>

        </div>

        {/* PAGINATION */}
        {totalPages > 1 && (
          <div style={styles.pagination}>
            <button 
              style={styles.pageBtn} 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            >
              Previous
            </button>
            <span style={{color: "white", fontWeight: "600"}}>Page {currentPage} of {totalPages}</span>
            <button 
              style={styles.pageBtn} 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            >
              Next
            </button>
          </div>
        )}

        {/* EDIT MODAL */}

        {editingStudent && (

          <div
            style={
              styles.modalOverlay
            }
          >

            <div
              style={styles.modal}
            >

              <h3>
                Edit Student
              </h3>

              <input
                style={styles.input}
                placeholder="First Name"
                value={
                  editForm.first_name
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    first_name:
                      e.target.value,
                  })
                }
              />

              <input
                style={styles.input}
                placeholder="Last Name"
                value={
                  editForm.last_name
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    last_name:
                      e.target.value,
                  })
                }
              />

              <input
                style={styles.input}
                placeholder="Email"
                value={
                  editForm.email
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    email:
                      e.target.value,
                  })
                }
              />

              <input
                style={styles.input}
                placeholder="Register No"
                value={
                  editForm.reg_no
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    reg_no:
                      e.target.value,
                  })
                }
              />

              <input
                style={styles.input}
                placeholder="UUCMS No"
                value={
                  editForm.uucms_no
                }
                onChange={(e) =>
                  setEditForm({
                    ...editForm,
                    uucms_no:
                      e.target.value,
                  })
                }
              />

              <div
                style={
                  styles.modalBtns
                }
              >

                <button
                  style={
                    styles.saveBtn
                  }
                  onClick={
                    updateStudent
                  }
                >
                  Save
                </button>

                <button
                  style={
                    styles.cancelBtn
                  }
                  onClick={() =>
                    setEditingStudent(
                      null
                    )
                  }
                >
                  Cancel
                </button>

              </div>

            </div>

          </div>

        )}

        {/* RESULTS MODAL */}
        {viewingResultsStudent && (
          <div style={styles.modalOverlay}>
            <div style={{ ...styles.modal, maxWidth: "600px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ margin: 0 }}>Results: {viewingResultsStudent.name}</h3>
                <button
                  onClick={() => setViewingResultsStudent(null)}
                  style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>

              {studentResults.length === 0 ? (
                <p>No exams assigned to this student.</p>
              ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
                  <thead>
                    <tr style={{ background: "#f1f5f9", textAlign: "left" }}>
                      <th style={{ padding: "10px", borderBottom: "2px solid #cbd5e1" }}>Exam</th>
                      <th style={{ padding: "10px", borderBottom: "2px solid #cbd5e1" }}>Status</th>
                      <th style={{ padding: "10px", borderBottom: "2px solid #cbd5e1" }}>Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {studentResults.map((res, index) => (
                      <tr key={index} style={{ borderBottom: "1px solid #e2e8f0" }}>
                        <td style={{ padding: "12px 10px" }}>{res.exam_name}</td>
                        <td style={{ padding: "12px 10px" }}>
                          <span style={{
                            padding: "4px 8px",
                            borderRadius: "4px",
                            fontSize: "12px",
                            fontWeight: "bold",
                            background: res.status === "Submitted" ? "#dcfce7" : res.status === "In Progress" ? "#fef9c3" : "#fee2e2",
                            color: res.status === "Submitted" ? "#166534" : res.status === "In Progress" ? "#854d0e" : "#991b1b"
                          }}>
                            {res.status}
                          </span>
                        </td>
                        <td style={{ padding: "12px 10px", fontWeight: "bold" }}>
                          {res.status === "Submitted" ? `${res.score} / ${res.total_marks}` : "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {/* REPORTS MODAL */}
        {viewingReportsStudent && (
          <div style={styles.modalOverlay}>
            <div style={{ ...styles.modal, maxWidth: "700px", maxHeight: "80vh", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h3 style={{ margin: 0 }}>Proctoring Reports: {viewingReportsStudent.name}</h3>
                <button
                  onClick={() => setViewingReportsStudent(null)}
                  style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer" }}
                >
                  ✕
                </button>
              </div>

              {studentReports.length === 0 ? (
                <p>No malpractice logs found for this student.</p>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  {studentReports.map((report, index) => (
                    <div key={index} style={{ border: "1px solid #ef4444", borderRadius: "8px", padding: "15px", background: "#fef2f2" }}>
                      <p style={{ margin: "0 0 10px 0", color: "#b91c1c" }}>
                        <strong>Exam:</strong> {report.exam_name} <br />
                        <strong>Time:</strong> {report.timestamp} <br />
                        <strong>Violation:</strong> {report.description}
                      </p>
                      {report.screenshot && (
                        <img src={report.screenshot} alt="Webcam Capture" style={{ width: "100%", maxHeight: "300px", objectFit: "contain", borderRadius: "4px", border: "1px solid #fca5a5" }} />
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
    background:
      "linear-gradient(135deg,#020617,#0f172a,#111827)",
    color: "white",
    fontFamily: "Inter, sans-serif",
  },

  sidebar: {
    width: "280px",
    background:
      "rgba(15,23,42,0.85)",
    backdropFilter: "blur(18px)",
    borderRight:
      "1px solid rgba(255,255,255,0.08)",
    padding: "25px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    position: "sticky",
    top: 0,
    height: "100vh",
    boxSizing: "border-box",
  },

  logo: {
    fontSize: "32px",
    fontWeight: "900",
    marginBottom: "20px",
    background:
      "linear-gradient(to right,#38bdf8,#818cf8)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor:
      "transparent",
  },

  menuBtn: {
    padding: "14px 18px",
    border:
      "1px solid rgba(255,255,255,0.05)",
    borderRadius: "14px",
    background:
      "rgba(255,255,255,0.04)",
    color: "#e2e8f0",
    cursor: "pointer",
    textAlign: "left",
    fontWeight: "600",
    transition: "0.3s",
  },

  main: {
    flex: 1,
    padding: "30px",
  },

  card: {
    background:
      "rgba(255,255,255,0.05)",
    backdropFilter: "blur(14px)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    padding: "25px",
    borderRadius: "24px",
    marginBottom: "25px",
  },

  row: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
  },

  input: {
    flex: 1,
    padding: "14px",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    background:
      "rgba(255,255,255,0.05)",
    color: "white",
    outline: "none",
  },

  textarea: {
    width: "100%",
    minHeight: "130px",
    padding: "14px",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,0.08)",
    background:
      "rgba(255,255,255,0.05)",
    color: "white",
    resize: "none",
    outline: "none",
    marginTop: "12px",
  },

  addBtn: {
    padding: "14px 24px",
    border: "none",
    borderRadius: "12px",
    background:
      "linear-gradient(to right,#2563eb,#3b82f6)",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
  },

  emailActions: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
    marginTop: "15px",
  },

  sendAllBtn: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(to right,#dc2626,#ef4444)",
    color: "white",
    cursor: "pointer",
    fontWeight: "700",
  },

  courseEmailBtn: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(to right,#2563eb,#3b82f6)",
    color: "white",
    cursor: "pointer",
    fontWeight: "700",
  },

  title: {
    fontSize: "36px",
    fontWeight: "900",
    marginBottom: "10px",
    color: "white",
  },

  tableCard: {
    background:
      "rgba(255,255,255,0.04)",
    borderRadius: "24px",
    overflowX: "auto",
    border:
      "1px solid rgba(255,255,255,0.08)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    padding: "18px",
    background:
      "rgba(255,255,255,0.03)",
    color: "#94a3b8",
    textTransform: "uppercase",
  },

  td: {
    padding: "18px",
    borderBottom:
      "1px solid rgba(255,255,255,0.05)",
    color: "white",
  },

  profileImg: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #38bdf8",
  },

  actionBox: {
    display: "flex",
    gap: "8px",
    flexWrap: "wrap",
  },

  viewBtn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(to right,#2563eb,#3b82f6)",
    color: "white",
    cursor: "pointer",
  },

  editBtn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(to right,#10b981,#22c55e)",
    color: "white",
    cursor: "pointer",
  },

  blockBtn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(to right,#f59e0b,#f97316)",
    color: "white",
    cursor: "pointer",
  },

  emailBtn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(to right,#7c3aed,#8b5cf6)",
    color: "white",
    cursor: "pointer",
  },

  deleteBtn: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(to right,#dc2626,#ef4444)",
    color: "white",
    cursor: "pointer",
  },

  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background:
      "rgba(0,0,0,0.7)",
    backdropFilter: "blur(6px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  modal: {
    width: "420px",
    background:
      "rgba(15,23,42,0.95)",
    border:
      "1px solid rgba(255,255,255,0.08)",
    padding: "25px",
    borderRadius: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    color: "white",
  },

  modalBtns: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },

  saveBtn: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(to right,#10b981,#22c55e)",
    color: "white",
    cursor: "pointer",
    fontWeight: "700",
  },

  cancelBtn: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "10px",
    background:
      "linear-gradient(to right,#dc2626,#ef4444)",
    color: "white",
    cursor: "pointer",
    fontWeight: "700",
  },

  livePanel: {
    background:
      "rgba(255,255,255,0.05)",
    borderRadius: "24px",
    overflow: "hidden",
    marginBottom: "25px",
    border:
      "1px solid rgba(255,255,255,0.08)",
  },

  livePanelHeader: {
    padding: "20px",
    borderBottom:
      "1px solid rgba(255,255,255,0.08)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  liveDot: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    background: "#ef4444",
    boxShadow: "0 0 10px #ef4444",
    animation: "pulse 1.5s infinite",
  },

  closeLiveBtn: {
    border: "none",
    background: "transparent",
    color: "#94a3b8",
    cursor: "pointer",
    fontSize: "18px",
  },

  liveReportsContainer: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    maxHeight: "500px",
    overflowY: "auto",
  },

  liveReportCard: {
    background:
      "rgba(255,255,255,0.04)",
    borderRadius: "18px",
    padding: "16px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderLeft: "4px solid #ef4444",
  },

  liveReportInfo: {
    flex: 1,
  },

  liveReportTime: {
    fontSize: "12px",
    color: "#94a3b8",
    marginBottom: "6px",
  },

  liveReportName: {
    margin: "0 0 5px 0",
    color: "white",
    fontWeight: "700",
  },

  liveReportExam: {
    margin: "0 0 5px 0",
    color: "#38bdf8",
  },

  liveReportDesc: {
    color: "#f87171",
    fontWeight: "600",
  },

  liveReportImg: {
    width: "120px",
    height: "90px",
    objectFit: "cover",
    borderRadius: "12px",
    border:
      "1px solid rgba(255,255,255,0.08)",
  },

  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "20px",
    marginBottom: "25px",
  },

  statCard: {
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(14px)",
    border: "1px solid rgba(255,255,255,0.08)",
    padding: "20px",
    borderRadius: "20px",
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },

  statIcon: {
    fontSize: "24px",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "12px",
  },

  statTitle: {
    color: "#94a3b8",
    fontSize: "14px",
    margin: "0 0 5px 0",
    fontWeight: "600",
  },

  statValue: {
    color: "white",
    fontSize: "24px",
    margin: 0,
    fontWeight: "800",
  },

  tableControls: {
    display: "flex",
    gap: "15px",
    marginBottom: "15px",
    flexWrap: "wrap",
  },

  select: {
    padding: "14px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.08)",
    background: "rgba(15,23,42,0.95)",
    color: "white",
    outline: "none",
    minWidth: "150px",
    cursor: "pointer",
  },

  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "15px",
    padding: "10px",
  },

  pageBtn: {
    padding: "10px 20px",
    border: "none",
    borderRadius: "10px",
    background: "linear-gradient(to right,#2563eb,#3b82f6)",
    color: "white",
    cursor: "pointer",
    fontWeight: "700",
  },
};

