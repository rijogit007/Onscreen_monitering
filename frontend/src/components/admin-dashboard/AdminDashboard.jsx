
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







  // ======================
  // LOAD DATA
  // ======================

  useEffect(() => {

    fetchCourses();

    fetchStudents();

  }, []);

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


        {/* TITLE */}

        <h3 style={styles.title}>

          {selectedCourse
            ? `${selectedCourse} Students`
            : "All Students"}

        </h3>
        

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

              {students.map(
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
    background: "#f1f5f9",
    fontFamily: "Segoe UI",
  },

  sidebar: {
    width: "260px",
    background:
      "linear-gradient(180deg,#0f172a,#1e3c72)",
    color: "white",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },

  logo: {
    marginBottom: "10px",
  },

  menuBtn: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#1e293b",
    color: "white",
    cursor: "pointer",
    textAlign: "left",
    fontWeight: "600",
  },

  main: {
    flex: 1,
    padding: "20px",
  },

  card: {
    background: "white",
    padding: "20px",
    borderRadius: "14px",
    marginBottom: "20px",
    boxShadow:
      "0 6px 20px rgba(0,0,0,0.06)",
  },

  row: {
    display: "flex",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "12px",
    border:
      "1px solid #d1d5db",
    borderRadius: "8px",
    marginBottom: "10px",
    outline: "none",
  },

  textarea: {
    width: "100%",
    minHeight: "130px",
    padding: "12px",
    borderRadius: "8px",
    border:
      "1px solid #d1d5db",
    resize: "none",
    outline: "none",
  },

  addBtn: {
    padding: "12px 20px",
    border: "none",
    borderRadius: "8px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
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
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    transition: "0.3s",
    fontWeight: "600",
  },

  courseEmailBtn: {
    padding: "10px 16px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    transition: "0.3s",
    fontWeight: "600",
  },

  title: {
    marginBottom: "10px",
    color: "#0f172a",
  },

  tableCard: {
    background: "white",
    padding: "15px",
    borderRadius: "14px",
    overflowX: "auto",
    boxShadow:
      "0 6px 20px rgba(0,0,0,0.06)",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
  },

  th: {
    border:
      "1px solid #e5e7eb",
    padding: "14px",
    background: "#f8fafc",
    fontWeight: "700",
  },

  td: {
    border:
      "1px solid #e5e7eb",
    padding: "12px",
  },

  profileImg: {
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    objectFit: "cover",
    border:
      "2px solid #2563eb",
  },

  actionBox: {
    display: "flex",
    gap: "6px",
    flexWrap: "wrap",
  },

  viewBtn: {
    padding: "7px 12px",
    border: "none",
    borderRadius: "6px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer",
  },

  editBtn: {
    padding: "7px 12px",
    border: "none",
    borderRadius: "6px",
    background: "#16a34a",
    color: "white",
    cursor: "pointer",
  },

  blockBtn: {
    padding: "7px 12px",
    border: "none",
    borderRadius: "6px",
    background: "#f59e0b",
    color: "white",
    cursor: "pointer",
  },

  emailBtn: {
    padding: "7px 12px",
    border: "none",
    borderRadius: "6px",
    color: "white",
    cursor: "pointer",
    transition: "0.3s",
  },

  deleteBtn: {
    padding: "7px 12px",
    border: "none",
    borderRadius: "6px",
    background: "#dc2626",
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
      "rgba(0,0,0,0.45)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },

  modal: {
    width: "420px",
    background: "white",
    padding: "25px",
    borderRadius: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
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
    borderRadius: "8px",
    background: "#16a34a",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },

  cancelBtn: {
    flex: 1,
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#dc2626",
    color: "white",
    cursor: "pointer",
    fontWeight: "600",
  },
};