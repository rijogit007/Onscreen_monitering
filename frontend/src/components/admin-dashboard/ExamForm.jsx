import { useState, useEffect } from "react";
import API from "../../api/axios";

function ExamForm() {
  const [exam, setExam] = useState(null);
  const [isCreated, setIsCreated] = useState(false);

  const [courses, setCourses] = useState([]);
  const [questions, setQuestions] = useState([]);

  const [examForm, setExamForm] = useState({
    name: "",
    total_marks: "",
    total_questions: "",
    start_time: "",
    end_time: "",
    is_for_all: true,
    course: "",
  });

  const [questionForm, setQuestionForm] = useState({
    question_text: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_answer: "A",
    marks: 1,
  });

  useEffect(() => {
    API.get("courses/")
      .then((res) => setCourses(res.data))
      .catch(console.log);
  }, []);

  const createExam = async () => {
    try {
      const payload = {
        ...examForm,
        total_marks: Number(examForm.total_marks),
        total_questions: Number(examForm.total_questions),
        course: examForm.is_for_all ? null : examForm.course,
      };

      const res = await API.post("create-exam/", payload);

      setExam(res.data.exam);
      setIsCreated(true);
      alert("Exam created successfully");
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Exam creation failed");
    }
  };

  const addQuestionToList = () => {
    if (!questionForm.question_text) return alert("Question required");

    if (questions.length >= Number(examForm.total_questions))
      return alert("Question limit reached");

    const totalMarks = questions.reduce((s, q) => s + Number(q.marks), 0);

    if (totalMarks + Number(questionForm.marks) > Number(examForm.total_marks))
      return alert("Marks exceeded");

    setQuestions([...questions, questionForm]);

    setQuestionForm({
      question_text: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
      correct_answer: "A",
      marks: 1,
    });
  };

  const submitAllQuestions = async () => {
    try {
      for (let q of questions) {
        await API.post("create-question/", {
          exam: exam.id,
          ...q,
          marks: Number(q.marks),
        });
      }

      alert("All questions saved");
      setQuestions([]);
    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Failed to save questions");
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h2 style={styles.title}>📘 Exam Builder</h2>

        {/* ================= CREATE EXAM ================= */}
        {!isCreated && (
          <div style={styles.section}>
            <input
              style={styles.input}
              placeholder="Exam Name"
              onChange={(e) =>
                setExamForm({ ...examForm, name: e.target.value })
              }
            />

            <label style={styles.label}>
              <input
                type="checkbox"
                checked={examForm.is_for_all}
                onChange={(e) =>
                  setExamForm({
                    ...examForm,
                    is_for_all: e.target.checked,
                    course: "",
                  })
                }
              />
              For All Students
            </label>

            {!examForm.is_for_all && (
              <select
                style={styles.input}
                onChange={(e) =>
                  setExamForm({ ...examForm, course: e.target.value })
                }
              >
                <option value="">Select Course</option>
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            )}

            <div style={styles.row}>
              <input
                style={styles.input}
                type="number"
                placeholder="Total Questions"
                onChange={(e) =>
                  setExamForm({
                    ...examForm,
                    total_questions: e.target.value,
                  })
                }
              />

              <input
                style={styles.input}
                type="number"
                placeholder="Total Marks"
                onChange={(e) =>
                  setExamForm({
                    ...examForm,
                    total_marks: e.target.value,
                  })
                }
              />
            </div>

            <div style={styles.row}>
              <input
                style={styles.input}
                type="datetime-local"
                onChange={(e) =>
                  setExamForm({ ...examForm, start_time: e.target.value })
                }
              />

              <input
                style={styles.input}
                type="datetime-local"
                onChange={(e) =>
                  setExamForm({ ...examForm, end_time: e.target.value })
                }
              />
            </div>

            <button style={styles.primaryBtn} onClick={createExam}>
              Create Exam
            </button>
          </div>
        )}

        {/* ================= QUESTIONS ================= */}
        {isCreated && (
          <div style={styles.section}>
            <h3>➕ Add Questions</h3>

            <p style={styles.counter}>
              {questions.length} / {examForm.total_questions} Questions
            </p>

            <textarea
              style={styles.textarea}
              placeholder="Question"
              value={questionForm.question_text}
              onChange={(e) =>
                setQuestionForm({
                  ...questionForm,
                  question_text: e.target.value,
                })
              }
            />

            <div style={styles.grid}>
              <input
                style={styles.input}
                placeholder="Option A"
                value={questionForm.option_a}
                onChange={(e) =>
                  setQuestionForm({
                    ...questionForm,
                    option_a: e.target.value,
                  })
                }
              />
              <input
                style={styles.input}
                placeholder="Option B"
                value={questionForm.option_b}
                onChange={(e) =>
                  setQuestionForm({
                    ...questionForm,
                    option_b: e.target.value,
                  })
                }
              />
              <input
                style={styles.input}
                placeholder="Option C"
                value={questionForm.option_c}
                onChange={(e) =>
                  setQuestionForm({
                    ...questionForm,
                    option_c: e.target.value,
                  })
                }
              />
              <input
                style={styles.input}
                placeholder="Option D"
                value={questionForm.option_d}
                onChange={(e) =>
                  setQuestionForm({
                    ...questionForm,
                    option_d: e.target.value,
                  })
                }
              />
            </div>

            <div style={styles.row}>
              <select
                style={styles.input}
                value={questionForm.correct_answer}
                onChange={(e) =>
                  setQuestionForm({
                    ...questionForm,
                    correct_answer: e.target.value,
                  })
                }
              >
                <option>A</option>
                <option>B</option>
                <option>C</option>
                <option>D</option>
              </select>

              <input
                style={styles.input}
                type="number"
                placeholder="Marks"
                value={questionForm.marks}
                onChange={(e) =>
                  setQuestionForm({
                    ...questionForm,
                    marks: e.target.value,
                  })
                }
              />
            </div>

            <div style={styles.btnRow}>
              <button style={styles.secondaryBtn} onClick={addQuestionToList}>
                + Add
              </button>

              <button style={styles.primaryBtn} onClick={submitAllQuestions}>
                Submit
              </button>
            </div>

            {/* PREVIEW */}
            <h3>Preview</h3>

            {questions.map((q, i) => (
              <div key={i} style={styles.questionCard}>
                <b>
                  {i + 1}. {q.question_text}
                </b>
                <p>A: {q.option_a}</p>
                <p>B: {q.option_b}</p>
                <p>C: {q.option_c}</p>
                <p>D: {q.option_d}</p>
                <p>✔ {q.correct_answer}</p>
                <p>Marks: {q.marks}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    display: "flex",
    justifyContent: "center",
    padding: 20,
    background: "#f5f6fa",
    minHeight: "100vh",
  },
  card: {
    width: "100%",
    maxWidth: 800,
    background: "#fff",
    padding: 20,
    borderRadius: 12,
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  section: {
    marginTop: 20,
  },
  input: {
    width: "100%",
    padding: 10,
    margin: "6px 0",
    borderRadius: 6,
    border: "1px solid #ddd",
  },
  textarea: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ddd",
    minHeight: 80,
  },
  row: {
    display: "flex",
    gap: 10,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 10,
  },
  label: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    marginTop: 10,
  },
  btnRow: {
    display: "flex",
    gap: 10,
    marginTop: 10,
  },
  primaryBtn: {
    padding: 10,
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  secondaryBtn: {
    padding: 10,
    background: "#2196F3",
    color: "#fff",
    border: "none",
    borderRadius: 6,
    cursor: "pointer",
  },
  counter: {
    fontWeight: "bold",
    marginBottom: 10,
  },
  questionCard: {
    border: "1px solid #eee",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    background: "#fafafa",
  },
};

export default ExamForm;




// import { useEffect, useState } from "react";
// import API from "../../api/axios";

// function ExamList() {
//   const [exams, setExams] = useState([]);
//   const [selectedExam, setSelectedExam] = useState(null);
//   const [questions, setQuestions] = useState([]);
//   const [loading, setLoading] = useState(false);

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
//       const res = await API.get(`exam/${exam.id}/questions/`);
//       setQuestions(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.container}>
//         <h2 style={styles.title}>📚 Exam Dashboard</h2>

//         {/* ================= EXAMS ================= */}
//         {loading ? (
//           <p>Loading exams...</p>
//         ) : (
//           <div style={styles.grid}>
//             {exams.map((exam) => (
//               <div key={exam.id} style={styles.card}>
//                 <div style={styles.cardHeader}>
//                   <h3 style={styles.examName}>{exam.name}</h3>

//                   <span
//                     style={{
//                       ...styles.badge,
//                       background: exam.is_for_all ? "#4CAF50" : "#2196F3",
//                     }}
//                   >
//                     {exam.is_for_all ? "All Students" : "Course Wise"}
//                   </span>
//                 </div>

//                 {!exam.is_for_all && (
//                   <p style={styles.courseText}>
//                     📘 Course: {exam.course_name || "N/A"}
//                   </p>
//                 )}

//                 <div style={styles.infoRow}>
//                   <p>🧮 Total Marks: {exam.total_marks}</p>
//                   <p>❓ Questions: {exam.total_questions}</p>
//                 </div>

//                 <div style={styles.infoRow}>
//                   <p>⏰ Start: {exam.start_time}</p>
//                   <p>⏳ End: {exam.end_time}</p>
//                 </div>

//                 <button
//                   style={styles.btn}
//                   onClick={() => viewQuestions(exam)}
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
//               📝 Questions for: <span>{selectedExam.name}</span>
//             </h3>

//             {questions.length === 0 ? (
//               <p>No questions found</p>
//             ) : (
//               questions.map((q, i) => (
//                 <div key={q.id || i} style={styles.qCard}>
//                   <b>
//                     {i + 1}. {q.question_text}
//                   </b>

//                   <div style={styles.options}>
//                     <p>A: {q.option_a}</p>
//                     <p>B: {q.option_b}</p>
//                     <p>C: {q.option_c}</p>
//                     <p>D: {q.option_d}</p>
//                   </div>

//                   <div style={styles.qFooter}>
//                     <span>✔ Correct: {q.correct_answer}</span>
//                     <span>⭐ Marks: {q.marks}</span>
//                   </div>
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
//     maxWidth: 1000,
//     margin: "auto",
//   },

//   title: {
//     textAlign: "center",
//     marginBottom: 20,
//     fontSize: 24,
//     fontWeight: "bold",
//   },

//   grid: {
//     display: "grid",
//     gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
//     gap: 15,
//   },

//   card: {
//     background: "#fff",
//     padding: 15,
//     borderRadius: 12,
//     boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
//   },

//   cardHeader: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   examName: {
//     margin: 0,
//   },

//   badge: {
//     padding: "4px 10px",
//     borderRadius: 20,
//     color: "#fff",
//     fontSize: 12,
//   },

//   courseText: {
//     marginTop: 8,
//     color: "#555",
//   },

//   infoRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     fontSize: 13,
//     marginTop: 5,
//     color: "#333",
//   },

//   btn: {
//     marginTop: 10,
//     width: "100%",
//     padding: 10,
//     border: "none",
//     borderRadius: 8,
//     background: "#111827",
//     color: "#fff",
//     cursor: "pointer",
//   },

//   questionBox: {
//     marginTop: 30,
//     background: "#fff",
//     padding: 20,
//     borderRadius: 12,
//     boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
//   },

//   qCard: {
//     border: "1px solid #eee",
//     padding: 12,
//     marginTop: 10,
//     borderRadius: 10,
//     background: "#fafafa",
//   },

//   options: {
//     marginTop: 8,
//     fontSize: 14,
//   },

//   qFooter: {
//     display: "flex",
//     justifyContent: "space-between",
//     marginTop: 8,
//     fontWeight: "bold",
//   },
// };

// export default ExamList;



































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