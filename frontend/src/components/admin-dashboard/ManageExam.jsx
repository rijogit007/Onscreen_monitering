

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
    padding: 20,
    background: "#f4f6f8",
    minHeight: "100vh",
  },

  container: {
    maxWidth: 1100,
    margin: "auto",
  },

  title: {
    textAlign: "center",
    marginBottom: 25,
    fontSize: 28,
    fontWeight: "bold",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: 20,
  },

  card: {
    background: "#fff",
    padding: 18,
    borderRadius: 12,
    boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
  },

  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
  },

  examName: {
    margin: 0,
    fontSize: 20,
  },

  badge: {
    padding: "5px 12px",
    borderRadius: 20,
    color: "#fff",
    fontSize: 12,
  },

  courseText: {
    marginTop: 10,
    color: "#555",
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 8,
    fontSize: 14,
  },

  btn: {
    marginTop: 15,
    width: "100%",
    padding: 10,
    border: "none",
    borderRadius: 8,
    background: "#111827",
    color: "#fff",
    cursor: "pointer",
  },

  actionRow: {
    display: "flex",
    gap: 10,
    marginTop: 10,
  },

  editBtn: {
    flex: 1,
    padding: 8,
    background: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: 6,
  },

  deleteBtn: {
    flex: 1,
    padding: 8,
    background: "#f44336",
    color: "#fff",
    border: "none",
    borderRadius: 6,
  },

  publishBtn: {
    width: "100%",
    marginTop: 10,
    padding: 10,
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 8,
  },

  saveBtn: {
    width: "100%",
    padding: 10,
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    marginTop: 10,
  },

  input: {
    width: "100%",
    padding: 10,
    marginBottom: 8,
    border: "1px solid #ddd",
    borderRadius: 6,
  },

  textarea: {
    width: "100%",
    minHeight: 80,
    padding: 10,
    marginBottom: 8,
  },

  questionBox: {
    marginTop: 30,
    background: "#fff",
    padding: 20,
    borderRadius: 12,
  },

  qCard: {
    border: "1px solid #eee",
    padding: 12,
    marginTop: 10,
    borderRadius: 8,
  },

  options: {
    marginTop: 8,
  },

  qFooter: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: 8,
  },
};