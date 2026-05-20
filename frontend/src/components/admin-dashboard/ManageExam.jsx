

// import { useEffect, useState } from "react";
// import API from "../../api/axios";

// function ExamList() {
//   const [exams, setExams] = useState([]);
//   const [selectedExam, setSelectedExam] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [editingQuestion, setEditingQuestion] = useState(null);

//   // ================= LOAD EXAMS =================
//   useEffect(() => {
//     loadExams();
//   }, []);

//   const loadExams = async () => {
//     try {
//       setLoading(true);

//       const res = await API.get("exams/");

//       setExams(res.data);
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ================= LOAD QUESTIONS =================
//   const viewQuestions = async (exam) => {
//     try {
//       setSelectedExam(exam);

//       const res = await API.get(
//         `exam/${exam.id}/questions/`
//       );

//       setQuestions(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   // ================= DELETE QUESTION =================
//   const deleteQuestion = async (id) => {
//     try {
//       await API.delete(`delete-question/${id}/`);

//       setQuestions(
//         questions.filter((q) => q.id !== id)
//       );

//       alert("Question deleted");
//     } catch (err) {
//       console.log(err);
//       alert("Delete failed");
//     }
//   };

//   // ================= UPDATE QUESTION =================
//   const updateQuestion = async () => {
//     try {
//       const res = await API.put(
//         `update-question/${editingQuestion.id}/`,
//         editingQuestion
//       );

//       setQuestions(
//         questions.map((q) =>
//           q.id === editingQuestion.id
//             ? res.data
//             : q
//         )
//       );

//       setEditingQuestion(null);

//       alert("Question updated");
//     } catch (err) {
//       console.log(err);
//       alert("Update failed");
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.container}>
//         <h2 style={styles.title}>
//           Exam Dashboard
//         </h2>

//         {/* ================= EXAMS ================= */}
//         {loading ? (
//           <p>Loading exams...</p>
//         ) : (
//           <div style={styles.grid}>
//             {exams.map((exam) => (
//               <div
//                 key={exam.id}
//                 style={styles.card}
//               >
//                 <div style={styles.cardHeader}>
//                   <h3 style={styles.examName}>
//                     {exam.name}
//                   </h3>

//                   <span
//                     style={{
//                       ...styles.badge,
//                       background:
//                         exam.is_for_all
//                           ? "#4CAF50"
//                           : "#2196F3",
//                     }}
//                   >
//                     {exam.is_for_all
//                       ? "All Students"
//                       : "Course Wise"}
//                   </span>
//                 </div>

//                 {!exam.is_for_all && (
//                   <p style={styles.courseText}>
//                     Course:{" "}
//                     {exam.course_name || "N/A"}
//                   </p>
//                 )}

//                 <div style={styles.infoRow}>
//                   <p>
//                     Total Marks:{" "}
//                     {exam.total_marks}
//                   </p>

//                   <p>
//                     Questions:{" "}
//                     {exam.total_questions}
//                   </p>
//                 </div>

//                 <div style={styles.infoRow}>
//                   <p>
//                     Start: {exam.start_time}
//                   </p>

//                   <p>
//                     End: {exam.end_time}
//                   </p>
//                 </div>

//                 <button
//                   style={styles.btn}
//                   onClick={() =>
//                     viewQuestions(exam)
//                   }
//                 >
//                   View Questions
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         {/* ================= QUESTIONS ================= */}
//         {selectedExam && (
//           <div style={styles.questionBox}>
//             <h3>
//               Questions for:{" "}
//               {selectedExam.name}
//             </h3>

//             {questions.length === 0 ? (
//               <p>No questions found</p>
//             ) : (
//               questions.map((q, i) => (
//                 <div
//                   key={q.id}
//                   style={styles.qCard}
//                 >
//                   {editingQuestion?.id ===
//                   q.id ? (
//                     <>
//                       <textarea
//                         style={styles.textarea}
//                         value={
//                           editingQuestion.question_text
//                         }
//                         onChange={(e) =>
//                           setEditingQuestion({
//                             ...editingQuestion,
//                             question_text:
//                               e.target.value,
//                           })
//                         }
//                       />

//                       <input
//                         style={styles.input}
//                         value={
//                           editingQuestion.option_a
//                         }
//                         onChange={(e) =>
//                           setEditingQuestion({
//                             ...editingQuestion,
//                             option_a:
//                               e.target.value,
//                           })
//                         }
//                       />

//                       <input
//                         style={styles.input}
//                         value={
//                           editingQuestion.option_b
//                         }
//                         onChange={(e) =>
//                           setEditingQuestion({
//                             ...editingQuestion,
//                             option_b:
//                               e.target.value,
//                           })
//                         }
//                       />

//                       <input
//                         style={styles.input}
//                         value={
//                           editingQuestion.option_c
//                         }
//                         onChange={(e) =>
//                           setEditingQuestion({
//                             ...editingQuestion,
//                             option_c:
//                               e.target.value,
//                           })
//                         }
//                       />

//                       <input
//                         style={styles.input}
//                         value={
//                           editingQuestion.option_d
//                         }
//                         onChange={(e) =>
//                           setEditingQuestion({
//                             ...editingQuestion,
//                             option_d:
//                               e.target.value,
//                           })
//                         }
//                       />

//                       <select
//                         style={styles.input}
//                         value={
//                           editingQuestion.correct_answer
//                         }
//                         onChange={(e) =>
//                           setEditingQuestion({
//                             ...editingQuestion,
//                             correct_answer:
//                               e.target.value,
//                           })
//                         }
//                       >
//                         <option value="A">
//                           A
//                         </option>
//                         <option value="B">
//                           B
//                         </option>
//                         <option value="C">
//                           C
//                         </option>
//                         <option value="D">
//                           D
//                         </option>
//                       </select>

//                       <input
//                         style={styles.input}
//                         type="number"
//                         value={
//                           editingQuestion.marks
//                         }
//                         onChange={(e) =>
//                           setEditingQuestion({
//                             ...editingQuestion,
//                             marks:
//                               e.target.value,
//                           })
//                         }
//                       />

//                       <button
//                         style={styles.saveBtn}
//                         onClick={
//                           updateQuestion
//                         }
//                       >
//                         Save
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <b>
//                         {i + 1}.{" "}
//                         {q.question_text}
//                       </b>

//                       <div
//                         style={styles.options}
//                       >
//                         <p>
//                           A: {q.option_a}
//                         </p>

//                         <p>
//                           B: {q.option_b}
//                         </p>

//                         <p>
//                           C: {q.option_c}
//                         </p>

//                         <p>
//                           D: {q.option_d}
//                         </p>
//                       </div>

//                       <div
//                         style={styles.qFooter}
//                       >
//                         <span>
//                           Correct:{" "}
//                           {
//                             q.correct_answer
//                           }
//                         </span>

//                         <span>
//                           Marks: {q.marks}
//                         </span>
//                       </div>

//                       <div
//                         style={
//                           styles.actionRow
//                         }
//                       >
//                         <button
//                           style={
//                             styles.editBtn
//                           }
//                           onClick={() =>
//                             setEditingQuestion(
//                               q
//                             )
//                           }
//                         >
//                           Edit
//                         </button>

//                         <button
//                           style={
//                             styles.deleteBtn
//                           }
//                           onClick={() =>
//                             deleteQuestion(
//                               q.id
//                             )
//                           }
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ))
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// const styles = {
//   page: {
//     padding: 20,
//     background: "#f4f6f8",
//     minHeight: "100vh",
//   },

//   container: {
//     maxWidth: 1100,
//     margin: "auto",
//   },

//   title: {
//     textAlign: "center",
//     marginBottom: 25,
//     fontSize: 28,
//     fontWeight: "bold",
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns:
//       "repeat(auto-fit, minmax(300px, 1fr))",
//     gap: 20,
//   },

//   card: {
//     background: "#fff",
//     padding: 18,
//     borderRadius: 12,
//     boxShadow:
//       "0 4px 15px rgba(0,0,0,0.08)",
//   },

//   cardHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   examName: {
//     margin: 0,
//     fontSize: 20,
//   },

//   badge: {
//     padding: "5px 12px",
//     borderRadius: 20,
//     color: "#fff",
//     fontSize: 12,
//   },

//   courseText: {
//     marginTop: 10,
//     color: "#555",
//   },

//   infoRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: 8,
//     fontSize: 14,
//   },

//   btn: {
//     marginTop: 15,
//     width: "100%",
//     padding: 10,
//     border: "none",
//     borderRadius: 8,
//     background: "#111827",
//     color: "#fff",
//     cursor: "pointer",
//   },

//   questionBox: {
//     marginTop: 35,
//     background: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     boxShadow:
//       "0 4px 15px rgba(0,0,0,0.08)",
//   },

//   qCard: {
//     border: "1px solid #eee",
//     padding: 15,
//     marginTop: 15,
//     borderRadius: 10,
//     background: "#fafafa",
//   },

//   options: {
//     marginTop: 10,
//     lineHeight: 1.8,
//   },

//   qFooter: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: 10,
//     fontWeight: "bold",
//   },

//   actionRow: {
//     display: "flex",
//     gap: 10,
//     marginTop: 15,
//   },

//   editBtn: {
//     flex: 1,
//     padding: 10,
//     border: "none",
//     borderRadius: 8,
//     background: "#2196F3",
//     color: "#fff",
//     cursor: "pointer",
//   },

//   deleteBtn: {
//     flex: 1,
//     padding: 10,
//     border: "none",
//     borderRadius: 8,
//     background: "#f44336",
//     color: "#fff",
//     cursor: "pointer",
//   },

//   saveBtn: {
//     width: "100%",
//     padding: 12,
//     border: "none",
//     borderRadius: 8,
//     background: "#4CAF50",
//     color: "#fff",
//     marginTop: 10,
//     cursor: "pointer",
//   },

//   textarea: {
//     width: "100%",
//     minHeight: 80,
//     padding: 10,
//     borderRadius: 8,
//     border: "1px solid #ddd",
//     marginBottom: 10,
//   },

//   input: {
//     width: "100%",
//     padding: 10,
//     borderRadius: 8,
//     border: "1px solid #ddd",
//     marginBottom: 10,
//   },
// };

// export default ExamList;



import { useEffect, useState } from "react";
import API from "../../api/axios";

function ExamList() {
  const [exams, setExams] = useState([]);
  const [selectedExam, setSelectedExam] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const [editingQuestion, setEditingQuestion] = useState(null);
  const [editingExam, setEditingExam] = useState(null);
  const [publishingResults, setPublishingResults] = useState(null);

  // ================= LOAD EXAMS =================
  useEffect(() => {
    loadExams();
  }, []);

  const loadExams = async () => {
    try {
      setLoading(true);
      const res = await API.get("exams/");
      setExams(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // ================= LOAD QUESTIONS =================
  const viewQuestions = async (exam) => {
    try {
      setSelectedExam(exam);
      const res = await API.get(`exam/${exam.id}/questions/`);
      setQuestions(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // ================= DELETE QUESTION =================
  const deleteQuestion = async (id) => {
    try {
      await API.delete(`delete-question/${id}/`);
      setQuestions(questions.filter((q) => q.id !== id));
      alert("Question deleted");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // ================= UPDATE QUESTION =================
  const updateQuestion = async () => {
    try {
      const res = await API.put(
        `update-question/${editingQuestion.id}/`,
        editingQuestion
      );

      setQuestions(
        questions.map((q) =>
          q.id === editingQuestion.id ? res.data : q
        )
      );

      setEditingQuestion(null);
      alert("Question updated");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  // ================= DELETE EXAM =================
  const deleteExam = async (id) => {
    try {
      await API.delete(`delete-exam/${id}/`);

      setExams(exams.filter((e) => e.id !== id));
      alert("Exam deleted");
    } catch (err) {
      console.log(err);
      alert("Delete failed");
    }
  };

  // ================= PUBLISH EXAM =================
  const publishExam = async (id) => {
    try {
      await API.put(`publish-exam/${id}/`);

      setExams(
        exams.map((e) =>
          e.id === id ? { ...e, is_published: true } : e
        )
      );

      alert("Exam published");
    } catch (err) {
      console.log(err);
      alert("Publish failed");
    }
  };

  // ================= PUBLISH RESULTS =================
  const publishResults = async (id) => {
    if (!window.confirm("Are you sure you want to publish the results for this exam? This will send emails to all students who submitted it.")) {
      return;
    }
    
    try {
      setPublishingResults(id);
      await API.post(`publish-results/${id}/`);
      alert("Results published successfully via email!");
    } catch (err) {
      console.log(err);
      alert("Publishing results failed");
    } finally {
      setPublishingResults(null);
    }
  };

  // ================= UPDATE EXAM =================
  const updateExam = async () => {
    try {
      const res = await API.put(
        `update-exam/${editingExam.id}/`,
        editingExam
      );

      setExams(
        exams.map((e) =>
          e.id === editingExam.id ? res.data : e
        )
      );

      setEditingExam(null);
      alert("Exam updated");
    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h2 style={styles.title}>Exam Dashboard</h2>

        {/* ================= EXAMS ================= */}
        {loading ? (
          <p>Loading exams...</p>
        ) : (
          <div style={styles.grid}>
            {exams.map((exam) => (
              <div key={exam.id} style={styles.card}>

                {/* ================= EDIT EXAM ================= */}
                {editingExam?.id === exam.id ? (
                  <>
                    <input
                      style={styles.input}
                      value={editingExam.name}
                      onChange={(e) =>
                        setEditingExam({
                          ...editingExam,
                          name: e.target.value,
                        })
                      }
                    />

                    <input
                      style={styles.input}
                      type="number"
                      value={editingExam.total_marks}
                      onChange={(e) =>
                        setEditingExam({
                          ...editingExam,
                          total_marks: e.target.value,
                        })
                      }
                    />

                    <input
                      style={styles.input}
                      type="number"
                      value={editingExam.total_questions}
                      onChange={(e) =>
                        setEditingExam({
                          ...editingExam,
                          total_questions: e.target.value,
                        })
                      }
                    />

                    <button style={styles.saveBtn} onClick={updateExam}>
                      Save Exam
                    </button>
                  </>
                ) : (
                  <>
                    <div style={styles.cardHeader}>
                      <h3 style={styles.examName}>{exam.name}</h3>

                      <span
                        style={{
                          ...styles.badge,
                          background: exam.is_for_all ? "#4CAF50" : "#2196F3",
                        }}
                      >
                        {exam.is_for_all ? "All Students" : "Course Wise"}
                      </span>
                    </div>

                    <p
                      style={{
                        color: exam.is_published ? "green" : "orange",
                        fontWeight: "bold",
                      }}
                    >
                      {exam.is_published ? "Published" : "Draft"}
                    </p>

                    {!exam.is_for_all && (
                      <p style={styles.courseText}>
                        Course: {exam.course_name || "N/A"}
                      </p>
                    )}

                    <div style={styles.infoRow}>
                      <p>Total Marks: {exam.total_marks}</p>
                      <p>Questions: {exam.total_questions}</p>
                    </div>

                    <div style={styles.infoRow}>
                      <p>Start: {exam.start_time}</p>
                      <p>End: {exam.end_time}</p>
                    </div>

                    <button
                      style={styles.btn}
                      onClick={() => viewQuestions(exam)}
                    >
                      View Questions
                    </button>
                    
                    {/* ================= PUBLISH RESULTS ================= */}
                    <button
                      style={{
                        ...styles.publishBtn,
                        background: publishingResults === exam.id ? "#9ca3af" : "#0ea5e9",
                        cursor: publishingResults === exam.id ? "not-allowed" : "pointer"
                      }}
                      disabled={publishingResults === exam.id}
                      onClick={() => publishResults(exam.id)}
                    >
                      {publishingResults === exam.id ? "Sending Emails..." : "Publish Results"}
                    </button>

                    {/* ================= ACTIONS ================= */}
                    <div style={styles.actionRow}>
                      <button
                        style={styles.editBtn}
                        onClick={() => setEditingExam(exam)}
                      >
                        Edit
                      </button>

                      <button
                        style={styles.deleteBtn}
                        onClick={() => deleteExam(exam.id)}
                      >
                        Delete
                      </button>
                    </div>

                    {!exam.is_published && (
                      <button
                        style={styles.publishBtn}
                        onClick={() => publishExam(exam.id)}
                      >
                        Publish Exam
                      </button>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ================= QUESTIONS ================= */}
        {selectedExam && (
          <div style={styles.questionBox}>
            <h3>Questions for: {selectedExam.name}</h3>

            {questions.length === 0 ? (
              <p>No questions found</p>
            ) : (
              questions.map((q, i) => (
                <div key={q.id} style={styles.qCard}>

                  {editingQuestion?.id === q.id ? (
                    <>
                      <textarea
                        style={styles.textarea}
                        value={editingQuestion.question_text}
                        onChange={(e) =>
                          setEditingQuestion({
                            ...editingQuestion,
                            question_text: e.target.value,
                          })
                        }
                      />

                      <input
                        style={styles.input}
                        value={editingQuestion.option_a}
                        onChange={(e) =>
                          setEditingQuestion({
                            ...editingQuestion,
                            option_a: e.target.value,
                          })
                        }
                      />

                      <input
                        style={styles.input}
                        value={editingQuestion.option_b}
                        onChange={(e) =>
                          setEditingQuestion({
                            ...editingQuestion,
                            option_b: e.target.value,
                          })
                        }
                      />

                      <input
                        style={styles.input}
                        value={editingQuestion.option_c}
                        onChange={(e) =>
                          setEditingQuestion({
                            ...editingQuestion,
                            option_c: e.target.value,
                          })
                        }
                      />

                      <input
                        style={styles.input}
                        value={editingQuestion.option_d}
                        onChange={(e) =>
                          setEditingQuestion({
                            ...editingQuestion,
                            option_d: e.target.value,
                          })
                        }
                      />

                      <select
                        style={styles.input}
                        value={editingQuestion.correct_answer}
                        onChange={(e) =>
                          setEditingQuestion({
                            ...editingQuestion,
                            correct_answer: e.target.value,
                          })
                        }
                      >
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                      </select>

                      <input
                        style={styles.input}
                        type="number"
                        value={editingQuestion.marks}
                        onChange={(e) =>
                          setEditingQuestion({
                            ...editingQuestion,
                            marks: e.target.value,
                          })
                        }
                      />

                      <button style={styles.saveBtn} onClick={updateQuestion}>
                        Save
                      </button>
                    </>
                  ) : (
                    <>
                      <b>
                        {i + 1}. {q.question_text}
                      </b>

                      <div style={styles.options}>
                        <p>A: {q.option_a}</p>
                        <p>B: {q.option_b}</p>
                        <p>C: {q.option_c}</p>
                        <p>D: {q.option_d}</p>
                      </div>

                      <div style={styles.qFooter}>
                        <span>Correct: {q.correct_answer}</span>
                        <span>Marks: {q.marks}</span>
                      </div>

                      <div style={styles.actionRow}>
                        <button
                          style={styles.editBtn}
                          onClick={() => setEditingQuestion(q)}
                        >
                          Edit
                        </button>

                        <button
                          style={styles.deleteBtn}
                          onClick={() => deleteQuestion(q.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default ExamList;


const styles = {
  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(180deg, #000000 0%, #050505 40%, #0b0b0b 100%)",
    padding: "35px",
    fontFamily: "'Poppins', sans-serif",
    color: "#ffffff",
  },

  container: {
    maxWidth: "1450px",
    margin: "0 auto",
  },

  // ================= HEADER =================

  title: {
    fontSize: "42px",
    fontWeight: "800",
    marginBottom: "35px",
    letterSpacing: "1px",
    color: "#ffffff",
  },

  // ================= GRID =================

  grid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(340px,1fr))",
    gap: "25px",
  },

  // ================= CARD =================

  card: {
    background: "#0f0f0f",
    borderRadius: "28px",
    padding: "24px",
    border: "1px solid rgba(255,255,255,0.06)",
    boxShadow:
      "0 10px 35px rgba(0,0,0,0.45)",
    transition: "0.35s ease",
    position: "relative",
    overflow: "hidden",
  },

  cardHover: {
    transform: "translateY(-6px)",
  },

  // ================= CARD TOP =================

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "16px",
    gap: "12px",
  },

  examName: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: "0.5px",
  },

  // ================= BADGE =================

  badge: {
    padding: "8px 14px",
    borderRadius: "999px",
    fontSize: "12px",
    fontWeight: "700",
    background: "#1b1b1b",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.08)",
  },

  // ================= STATUS =================

  statusPublished: {
    marginTop: "8px",
    color: "#d1d5db",
    fontWeight: "600",
    background: "#171717",
    padding: "10px 14px",
    borderRadius: "12px",
    width: "fit-content",
    border: "1px solid rgba(255,255,255,0.06)",
  },

  statusDraft: {
    marginTop: "8px",
    color: "#a1a1aa",
    fontWeight: "600",
    background: "#141414",
    padding: "10px 14px",
    borderRadius: "12px",
    width: "fit-content",
    border: "1px solid rgba(255,255,255,0.04)",
  },

  // ================= TEXT =================

  courseText: {
    marginTop: "18px",
    color: "#9ca3af",
    fontSize: "15px",
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "18px",
    color: "#d1d5db",
    fontSize: "14px",
    gap: "14px",
    flexWrap: "wrap",
  },

  infoBox: {
    flex: 1,
    background: "#141414",
    padding: "14px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.04)",
  },

  infoLabel: {
    fontSize: "12px",
    color: "#71717a",
    marginBottom: "6px",
    letterSpacing: "1px",
  },

  infoValue: {
    fontSize: "15px",
    color: "#ffffff",
    fontWeight: "600",
  },

  // ================= BUTTONS =================

  btn: {
    width: "100%",
    marginTop: "18px",
    padding: "15px",
    border: "none",
    borderRadius: "16px",
    background: "#ffffff",
    color: "#000000",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    transition: "0.3s",
  },

  publishBtn: {
    width: "100%",
    marginTop: "14px",
    padding: "15px",
    borderRadius: "16px",
    background: "#181818",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.08)",
    fontWeight: "700",
    cursor: "pointer",
    transition: "0.3s",
  },

  actionRow: {
    display: "flex",
    gap: "12px",
    marginTop: "16px",
  },

  editBtn: {
    flex: 1,
    padding: "14px",
    background: "#1a1a1a",
    color: "#ffffff",
    border: "1px solid rgba(255,255,255,0.06)",
    borderRadius: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },

  deleteBtn: {
    flex: 1,
    padding: "14px",
    background: "#101010",
    color: "#d70c0cff",
    border: "1px solid rgba(255,255,255,0.04)",
    borderRadius: "14px",
    fontWeight: "600",
    cursor: "pointer",
  },

  saveBtn: {
    width: "100%",
    padding: "15px",
    borderRadius: "16px",
    border: "none",
    background: "#ffffff",
    color: "#000000",
    fontWeight: "700",
    cursor: "pointer",
    marginTop: "14px",
  },

  // ================= INPUTS =================

  input: {
    width: "100%",
    padding: "16px",
    marginBottom: "12px",
    background: "#141414",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: "16px",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
    boxSizing: "border-box",
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "16px",
    background: "#141414",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: "18px",
    color: "#ffffff",
    outline: "none",
    resize: "none",
    marginBottom: "12px",
    fontSize: "14px",
    boxSizing: "border-box",
  },

  // ================= QUESTIONS SECTION =================

  questionBox: {
    marginTop: "40px",
    background: "#0f0f0f",
    padding: "30px",
    borderRadius: "30px",
    border: "1px solid rgba(255,255,255,0.06)",
    boxShadow:
      "0 10px 35px rgba(0,0,0,0.45)",
  },

  questionTitle: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "20px",
  },

  // ================= QUESTION CARD =================

  qCard: {
    background: "#141414",
    borderRadius: "24px",
    padding: "22px",
    marginTop: "18px",
    border: "1px solid rgba(255,255,255,0.05)",
    transition: "0.3s",
  },

  qTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },

  qNumber: {
    width: "45px",
    height: "45px",
    borderRadius: "14px",
    background: "#ffffff",
    color: "#000000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "800",
  },

  qMarks: {
    padding: "8px 14px",
    borderRadius: "999px",
    background: "#1b1b1b",
    color: "#ffffff",
    fontSize: "12px",
    border: "1px solid rgba(255,255,255,0.06)",
  },

  questionText: {
    fontSize: "18px",
    fontWeight: "600",
    lineHeight: "1.7",
    color: "#ffffff",
    marginBottom: "20px",
  },

  // ================= OPTIONS =================

  options: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "14px",
  },

  optionCard: {
    background: "#1a1a1a",
    padding: "16px",
    borderRadius: "16px",
    border: "1px solid rgba(255,255,255,0.04)",
  },

  optionCorrect: {
    background: "#ffffff",
    color: "#000000",
  },

  optionLabel: {
    fontWeight: "700",
    marginBottom: "8px",
    fontSize: "13px",
  },

  optionText: {
    fontSize: "14px",
    lineHeight: "1.5",
  },

  // ================= FOOTER =================

  qFooter: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    color: "#9ca3af",
    fontWeight: "600",
    flexWrap: "wrap",
    gap: "12px",
  },

  // ================= LOADING =================

  loadingText: {
    color: "#9ca3af",
    textAlign: "center",
    fontSize: "18px",
    marginTop: "80px",
  },

  // ================= SCROLL =================

  scrollArea: {
    maxHeight: "700px",
    overflowY: "auto",
    paddingRight: "6px",
  },
};