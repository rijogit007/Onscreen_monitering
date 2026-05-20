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
    if (!questionForm.question_text)
      return alert("Question required");

    if (
      questions.length >=
      Number(examForm.total_questions)
    )
      return alert("Question limit reached");

    const totalMarks = questions.reduce(
      (s, q) => s + Number(q.marks),
      0
    );

    if (
      totalMarks +
      Number(questionForm.marks) >
      Number(examForm.total_marks)
    )
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
    if (
      questions.length <
      Number(examForm.total_questions)
    ) {
      return alert(
        `Please add all ${examForm.total_questions} questions`
      );
    }

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
      console.log(
        err.response?.data || err.message
      );
      alert("Failed to save questions");
    }
  };

  return (
    <>
      <style>{`
      
      *{
        box-sizing:border-box;
      }

      body{
        margin:0;
        padding:0;
        overflow-x:hidden;
      }

      @keyframes float {
        0%{
          transform:translateY(0px);
        }
        50%{
          transform:translateY(-20px);
        }
        100%{
          transform:translateY(0px);
        }
      }

      @keyframes glow {
        0%{
          box-shadow:0 0 10px rgba(99,102,241,.4);
        }
        50%{
          box-shadow:0 0 30px rgba(99,102,241,.9);
        }
        100%{
          box-shadow:0 0 10px rgba(99,102,241,.4);
        }
      }

      @keyframes pulse {
        0%{
          transform:scale(1);
        }
        50%{
          transform:scale(1.08);
        }
        100%{
          transform:scale(1);
        }
      }

      @keyframes gradientMove{
        0%{
          background-position:0% 50%;
        }
        50%{
          background-position:100% 50%;
        }
        100%{
          background-position:0% 50%;
        }
      }

      .floating-circle{
        position:absolute;
        border-radius:50%;
        filter:blur(20px);
        animation:float 6s ease-in-out infinite;
      }

      .floating-circle2{
        animation-delay:2s;
      }

      .floating-circle3{
        animation-delay:4s;
      }

      .question-card:hover{
        transform:translateY(-8px) scale(1.01);
        transition:.4s;
      }

      .glass-input:focus{
        border:1px solid #6366f1;
        box-shadow:0 0 15px rgba(99,102,241,.5);
      }

      .main-btn:hover{
        transform:translateY(-4px);
        transition:.3s;
      }

      .preview-scroll::-webkit-scrollbar{
        width:8px;
      }

      .preview-scroll::-webkit-scrollbar-thumb{
        background:#6366f1;
        border-radius:10px;
      }

      `}</style>

      <div style={styles.page}>

        {/* BACKGROUND EFFECTS */}

        <div
          className="floating-circle"
          style={{
            width: 260,
            height: 260,
            background:
              "rgba(99,102,241,.25)",
            top: 40,
            left: 40,
          }}
        />

        <div
          className="floating-circle floating-circle2"
          style={{
            width: 200,
            height: 200,
            background:
              "rgba(236,72,153,.25)",
            bottom: 80,
            right: 100,
          }}
        />

        <div
          className="floating-circle floating-circle3"
          style={{
            width: 180,
            height: 180,
            background:
              "rgba(16,185,129,.25)",
            top: 300,
            right: 250,
          }}
        />

        <div style={styles.container}>

          {/* HEADER */}

          <div style={styles.heroCard}>
            <div>
              <h1 style={styles.heroTitle}>
                AI Smart Exam Builder
              </h1>

              <p style={styles.heroSub}>
                Create premium exams with
                futuristic UI, live animated
                dashboard and intelligent
                question management.
              </p>
            </div>

            <div style={styles.heroBadge}>
              <div style={styles.liveDot}></div>
              ACTIVE SYSTEM
            </div>
          </div>

          {/* MAIN CARD */}

          <div style={styles.card}>

            {!isCreated && (
              <div>

                <div style={styles.topBar}>
                  <h2 style={styles.sectionTitle}>
                    Create New Exam
                  </h2>

                  <div style={styles.counterBox}>
                    Premium Panel
                  </div>
                </div>

                <div style={styles.grid2}>

                  <div>
                    <label style={styles.label}>
                      Exam Name
                    </label>

                    <input
                      className="glass-input"
                      style={styles.input}
                      placeholder="Enter exam name"
                      onChange={(e) =>
                        setExamForm({
                          ...examForm,
                          name:
                            e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label style={styles.label}>
                      Select Type
                    </label>

                    <select
                      className="glass-input"
                      style={styles.input}
                      value={
                        examForm.is_for_all
                          ? "all"
                          : "course"
                      }
                      onChange={(e) =>
                        setExamForm({
                          ...examForm,
                          is_for_all:
                            e.target.value ===
                            "all",
                        })
                      }
                    >
                      <option value="all">
                        All Students
                      </option>

                      <option value="course">
                        Course Wise
                      </option>
                    </select>
                  </div>

                </div>

                {!examForm.is_for_all && (
                  <select
                    className="glass-input"
                    style={styles.input}
                    onChange={(e) =>
                      setExamForm({
                        ...examForm,
                        course:
                          e.target.value,
                      })
                    }
                  >
                    <option value="">
                      Select Course
                    </option>

                    {courses.map((c) => (
                      <option
                        key={c.id}
                        value={c.id}
                      >
                        {c.name}
                      </option>
                    ))}
                  </select>
                )}

                <div style={styles.grid2}>

                  <input
                    className="glass-input"
                    style={styles.input}
                    type="number"
                    placeholder="Total Questions"
                    onChange={(e) =>
                      setExamForm({
                        ...examForm,
                        total_questions:
                          e.target.value,
                      })
                    }
                  />

                  <input
                    className="glass-input"
                    style={styles.input}
                    type="number"
                    placeholder="Total Marks"
                    onChange={(e) =>
                      setExamForm({
                        ...examForm,
                        total_marks:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div style={styles.grid2}>

                  <input
                    className="glass-input"
                    style={styles.input}
                    type="datetime-local"
                    onChange={(e) =>
                      setExamForm({
                        ...examForm,
                        start_time:
                          e.target.value,
                      })
                    }
                  />

                  <input
                    className="glass-input"
                    style={styles.input}
                    type="datetime-local"
                    onChange={(e) =>
                      setExamForm({
                        ...examForm,
                        end_time:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <button
                  className="main-btn"
                  style={styles.primaryBtn}
                  onClick={createExam}
                >
                  Launch Exam System
                </button>

              </div>
            )}

            {/* QUESTIONS */}

            {isCreated && (
              <div>

                <div style={styles.questionTop}>

                  <div>
                    <h2
                      style={
                        styles.sectionTitle
                      }
                    >
                      Add Questions
                    </h2>

                    <p
                      style={
                        styles.smallText
                      }
                    >
                      AI Monitoring Enabled
                    </p>
                  </div>

                  <div
                    style={
                      styles.progressBox
                    }
                  >
                    <h3>
                      {questions.length}/
                      {
                        examForm.total_questions
                      }
                    </h3>

                    <span>
                      Questions Added
                    </span>
                  </div>

                </div>

                <textarea
                  className="glass-input"
                  style={styles.textarea}
                  placeholder="Write your smart question..."
                  value={
                    questionForm.question_text
                  }
                  onChange={(e) =>
                    setQuestionForm({
                      ...questionForm,
                      question_text:
                        e.target.value,
                    })
                  }
                />

                <div style={styles.grid2}>

                  <input
                    className="glass-input"
                    style={styles.input}
                    placeholder="Option A"
                    value={
                      questionForm.option_a
                    }
                    onChange={(e) =>
                      setQuestionForm({
                        ...questionForm,
                        option_a:
                          e.target.value,
                      })
                    }
                  />

                  <input
                    className="glass-input"
                    style={styles.input}
                    placeholder="Option B"
                    value={
                      questionForm.option_b
                    }
                    onChange={(e) =>
                      setQuestionForm({
                        ...questionForm,
                        option_b:
                          e.target.value,
                      })
                    }
                  />

                  <input
                    className="glass-input"
                    style={styles.input}
                    placeholder="Option C"
                    value={
                      questionForm.option_c
                    }
                    onChange={(e) =>
                      setQuestionForm({
                        ...questionForm,
                        option_c:
                          e.target.value,
                      })
                    }
                  />

                  <input
                    className="glass-input"
                    style={styles.input}
                    placeholder="Option D"
                    value={
                      questionForm.option_d
                    }
                    onChange={(e) =>
                      setQuestionForm({
                        ...questionForm,
                        option_d:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div style={styles.grid2}>

                  <select
                    className="glass-input"
                    style={styles.input}
                    value={
                      questionForm.correct_answer
                    }
                    onChange={(e) =>
                      setQuestionForm({
                        ...questionForm,
                        correct_answer:
                          e.target.value,
                      })
                    }
                  >
                    <option>A</option>
                    <option>B</option>
                    <option>C</option>
                    <option>D</option>
                  </select>

                  <input
                    className="glass-input"
                    style={styles.input}
                    type="number"
                    placeholder="Marks"
                    value={
                      questionForm.marks
                    }
                    onChange={(e) =>
                      setQuestionForm({
                        ...questionForm,
                        marks:
                          e.target.value,
                      })
                    }
                  />

                </div>

                <div style={styles.btnRow}>

                  <button
                    className="main-btn"
                    style={
                      styles.secondaryBtn
                    }
                    onClick={
                      addQuestionToList
                    }
                  >
                    + Add Question
                  </button>

                  <button
                    className="main-btn"
                    style={styles.primaryBtn}
                    onClick={
                      submitAllQuestions
                    }
                  >
                    Submit All
                  </button>

                </div>

                {/* PREVIEW */}

                <div style={styles.previewHeader}>
                  <h2 style={{ margin: 0 }}>
                    Live Preview
                  </h2>

                  <div
                    style={
                      styles.previewBadge
                    }
                  >
                    Animated Feed
                  </div>
                </div>

                <div
                  className="preview-scroll"
                  style={styles.previewContainer}
                >
                  {questions.map((q, i) => (
                    <div
                      key={i}
                      className="question-card"
                      style={
                        styles.questionCard
                      }
                    >

                      <div
                        style={
                          styles.questionNo
                        }
                      >
                        {i + 1}
                      </div>

                      <div
                        style={{
                          flex: 1,
                        }}
                      >
                        <h3
                          style={
                            styles.questionText
                          }
                        >
                          {
                            q.question_text
                          }
                        </h3>

                        <div
                          style={
                            styles.optionGrid
                          }
                        >

                          <div
                            style={
                              styles.option
                            }
                          >
                            A.{" "}
                            {q.option_a}
                          </div>

                          <div
                            style={
                              styles.option
                            }
                          >
                            B.{" "}
                            {q.option_b}
                          </div>

                          <div
                            style={
                              styles.option
                            }
                          >
                            C.{" "}
                            {q.option_c}
                          </div>

                          <div
                            style={
                              styles.option
                            }
                          >
                            D.{" "}
                            {q.option_d}
                          </div>

                        </div>

                        <div
                          style={
                            styles.footer
                          }
                        >
                          <span
                            style={
                              styles.correct
                            }
                          >
                            ✔ Correct:{" "}
                            {
                              q.correct_answer
                            }
                          </span>

                          <span
                            style={
                              styles.markBadge
                            }
                          >
                            ⭐ {q.marks} Marks
                          </span>
                        </div>

                      </div>

                    </div>
                  ))}
                </div>

              </div>
            )}

          </div>

        </div>

      </div>
    </>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#000",
    position: "relative",
    overflow: "hidden",
    padding: "40px 20px",
    fontFamily: "'Inter', sans-serif",
    color: "#fff",
  },

  container: {
    maxWidth: "1400px",
    margin: "auto",
    position: "relative",
    zIndex: 2,
  },

  heroCard: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px",
    marginBottom: "30px",
    padding: "32px",
    borderRadius: "28px",
    background: "#0a0a0a",
    border: "1px solid #1f1f1f",
    boxShadow: "0 0 0 1px rgba(255,255,255,0.03)",
    flexWrap: "wrap",
  },

  heroTitle: {
    fontSize: "42px",
    color: "#fff",
    marginBottom: "10px",
    fontWeight: "800",
    letterSpacing: "-1px",
  },

  heroSub: {
    color: "#8b8b8b",
    maxWidth: "700px",
    lineHeight: 1.7,
    fontSize: "15px",
  },

  heroBadge: {
    padding: "14px 22px",
    borderRadius: "50px",
    background: "#111",
    border: "1px solid #222",
    color: "#fff",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "13px",
  },

  liveDot: {
    width: "10px",
    height: "10px",
    background: "#fff",
    borderRadius: "50%",
  },

  card: {
    background: "#0a0a0a",
    borderRadius: "30px",
    padding: "35px",
    border: "1px solid #1a1a1a",
    boxShadow: "0 10px 50px rgba(255,255,255,0.03)",
  },

  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    flexWrap: "wrap",
    gap: "15px",
  },

  counterBox: {
    padding: "10px 18px",
    borderRadius: "14px",
    background: "#111",
    border: "1px solid #222",
    color: "#fff",
    fontWeight: "600",
    fontSize: "14px",
  },

  sectionTitle: {
    color: "#fff",
    fontSize: "30px",
    marginBottom: "5px",
    fontWeight: "700",
    letterSpacing: "-0.5px",
  },

  smallText: {
    color: "#777",
    fontSize: "14px",
  },

  label: {
    color: "#999",
    display: "block",
    marginBottom: "8px",
    fontSize: "14px",
  },

  grid2: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(260px,1fr))",
    gap: "20px",
    marginBottom: "20px",
  },

  input: {
    width: "100%",
    padding: "16px",
    borderRadius: "16px",
    border: "1px solid #1f1f1f",
    background: "#050505",
    color: "#fff",
    outline: "none",
    fontSize: "15px",
    transition: ".3s",
  },

  textarea: {
    width: "100%",
    minHeight: "140px",
    padding: "20px",
    borderRadius: "18px",
    border: "1px solid #1f1f1f",
    background: "#050505",
    color: "#fff",
    outline: "none",
    marginBottom: "20px",
    fontSize: "15px",
    resize: "vertical",
  },

  primaryBtn: {
    padding: "16px 26px",
    border: "1px solid #2a2a2a",
    borderRadius: "16px",
    background: "#fff",
    color: "#000",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
    transition: ".3s",
  },

  secondaryBtn: {
    padding: "16px 26px",
    border: "1px solid #222",
    borderRadius: "16px",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "15px",
    transition: ".3s",
  },

  questionTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
    flexWrap: "wrap",
    gap: "20px",
  },

  progressBox: {
    padding: "20px",
    borderRadius: "22px",
    background: "#111",
    border: "1px solid #222",
    color: "#fff",
    textAlign: "center",
    minWidth: "160px",
  },

  btnRow: {
    display: "flex",
    gap: "15px",
    marginBottom: "35px",
    flexWrap: "wrap",
  },

  previewHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    color: "#fff",
    flexWrap: "wrap",
    gap: "15px",
  },

  previewBadge: {
    padding: "10px 18px",
    borderRadius: "50px",
    background: "#111",
    border: "1px solid #222",
    color: "#fff",
    fontWeight: "600",
    fontSize: "13px",
  },

  previewContainer: {
    maxHeight: "700px",
    overflowY: "auto",
    paddingRight: "8px",
  },

  questionCard: {
    background: "#050505",
    border: "1px solid #1a1a1a",
    borderRadius: "26px",
    padding: "24px",
    marginBottom: "20px",
    display: "flex",
    gap: "20px",
    transition: ".3s",
  },

  questionNo: {
    width: "70px",
    height: "70px",
    borderRadius: "22px",
    background: "#111",
    border: "1px solid #222",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "800",
    fontSize: "24px",
    flexShrink: 0,
  },

  questionText: {
    color: "#fff",
    marginBottom: "18px",
    fontSize: "20px",
    lineHeight: 1.5,
  },

  optionGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
  },

  option: {
    background: "#0d0d0d",
    padding: "15px",
    borderRadius: "16px",
    color: "#cfcfcf",
    border: "1px solid #1f1f1f",
    fontSize: "14px",
  },

  footer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px",
    flexWrap: "wrap",
    gap: "10px",
  },

  correct: {
    color: "#fff",
    fontWeight: "700",
    fontSize: "14px",
  },

  markBadge: {
    padding: "10px 16px",
    borderRadius: "30px",
    background: "#111",
    border: "1px solid #222",
    color: "#fff",
    fontWeight: "700",
    fontSize: "13px",
  },
};

export default ExamForm;