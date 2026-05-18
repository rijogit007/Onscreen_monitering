import { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";

function TermsAndConditions() {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const exam = location.state?.exam;
  const [isChecked, setIsChecked] = useState(false);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    if (exam && exam.is_submitted) {
      navigate("/dashboard", { replace: true });
    }
  }, [exam, navigate]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(Date.now()), 1000);
    return () => clearInterval(timer);
  }, []);

  const canActuallyStart = () => {
    if (!exam) return true; // Fallback if no state passed
    const start = new Date(exam.start_time).getTime();
    return currentTime >= start;
  };

  const getCountdownText = () => {
    if (!exam) return "Start Exam 🚀";
    const start = new Date(exam.start_time).getTime();
    const diff = start - currentTime;

    if (diff > 0) {
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      return `Starts in ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    }
    return "Start Exam 🚀";
  };

  const startExam = () => {
    if (isChecked && canActuallyStart()) {
      navigate(`/start-exam/${id}`, { replace: true });
    }
  };

  const goBack = () => {
    navigate("/dashboard");
  };

  return (
    <div style={styles.layout}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.title}>📋 Exam Terms & Conditions</h1>
          <p style={styles.subtitle}>
            Please read the following instructions carefully before starting the exam.
          </p>
        </div>

        <div style={styles.content}>
          <div style={styles.ruleBox}>
            <h3 style={styles.ruleTitle}>1. Technical Requirements</h3>
            <p style={styles.ruleText}>
              Ensure you have a stable internet connection. Do not refresh or close
              the browser window once the exam has started, as this may result in
              automatic submission or termination of your session.
            </p>
          </div>

          <div style={styles.ruleBox}>
            <h3 style={styles.ruleTitle}>2. Academic Integrity</h3>
            <p style={styles.ruleText}>
              Any form of malpractice, including navigating away from the exam tab,
              using unauthorized materials, or communicating with others, is strictly
              prohibited. Your activity will be monitored.
            </p>
          </div>

          <div style={styles.ruleBox}>
            <h3 style={styles.ruleTitle}>3. Time Management</h3>
            <p style={styles.ruleText}>
              Keep an eye on the timer. The exam will automatically submit when the
              allotted time expires. Ensure all answers are selected before time
              runs out.
            </p>
          </div>

          <div style={styles.ruleBox}>
            <h3 style={styles.ruleTitle}>4. Submission</h3>
            <p style={styles.ruleText}>
              You can only submit the exam once. Review your answers carefully before
              clicking the final submit button. No changes can be made post-submission.
            </p>
          </div>
        </div>

        <div style={styles.footer}>
          <label style={styles.checkboxLabel}>
            <input
              type="checkbox"
              style={styles.checkbox}
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
            />
            I have read and agree to the Terms and Conditions
          </label>

          <div style={styles.btnRow}>
            <button style={styles.cancelBtn} onClick={goBack}>
              Cancel
            </button>
            <button
              style={{
                ...styles.startBtn,
                background: (isChecked && canActuallyStart()) ? "#10b981" : "#9ca3af",
                cursor: (isChecked && canActuallyStart()) ? "pointer" : "not-allowed",
              }}
              disabled={!(isChecked && canActuallyStart())}
              onClick={startExam}
            >
              {getCountdownText()}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  layout: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #eef2f7, #dbeafe)",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    padding: "20px",
  },
  card: {
    background: "#ffffff",
    width: "100%",
    maxWidth: "800px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.08)",
    overflow: "hidden",
    animation: "fadeIn 0.5s ease-out",
  },
  header: {
    background: "linear-gradient(135deg, #1e3c72, #2a5298)",
    padding: "30px",
    color: "#ffffff",
    textAlign: "center",
  },
  title: {
    margin: "0 0 10px 0",
    fontSize: "28px",
    fontWeight: "700",
    letterSpacing: "0.5px",
  },
  subtitle: {
    margin: 0,
    fontSize: "15px",
    opacity: 0.9,
  },
  content: {
    padding: "30px",
    maxHeight: "50vh",
    overflowY: "auto",
    background: "#fafbfc",
  },
  ruleBox: {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "15px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.02)",
    border: "1px solid #edf2f7",
    borderLeft: "4px solid #3b82f6",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
  },
  ruleTitle: {
    margin: "0 0 8px 0",
    fontSize: "18px",
    color: "#1e293b",
  },
  ruleText: {
    margin: 0,
    color: "#64748b",
    fontSize: "15px",
    lineHeight: "1.6",
  },
  footer: {
    padding: "25px 30px",
    background: "#ffffff",
    borderTop: "1px solid #edf2f7",
  },
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    fontSize: "16px",
    fontWeight: "600",
    color: "#334155",
    cursor: "pointer",
    marginBottom: "20px",
  },
  checkbox: {
    width: "20px",
    height: "20px",
    marginRight: "12px",
    cursor: "pointer",
    accentColor: "#3b82f6",
  },
  btnRow: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "15px",
  },
  cancelBtn: {
    padding: "12px 24px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    color: "#64748b",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  startBtn: {
    padding: "12px 30px",
    borderRadius: "10px",
    border: "none",
    color: "#ffffff",
    fontSize: "16px",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.3)",
  },
};

export default TermsAndConditions;
