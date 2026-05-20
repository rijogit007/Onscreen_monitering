import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as faceapi from "@vladmandic/face-api";
import API from "../../api/axios";

function ExamPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  
  const [cameraGranted, setCameraGranted] = useState(false);
  const [warningVisible, setWarningVisible] = useState(false);
  const [violationMsg, setViolationMsg] = useState("");
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [mediaStream, setMediaStream] = useState(null);
  const cooldownRef = useRef(false);

  const [attempt, setAttempt] = useState(null);
  const [answers, setAnswers] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [canExit, setCanExit] = useState(false);

  useEffect(() => {
    initFaceAPI();
  }, []);

  const initFaceAPI = async () => {
    try {
      await faceapi.nets.ssdMobilenetv1.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/');
      await faceapi.nets.faceLandmark68Net.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model/');
      setModelsLoaded(true);
    } catch (err) {
      console.log("Failed to load face-api models", err);
      setModelsLoaded(true); // Proceed to avoid locking the exam
    }
    initCamera();
  };

  const initCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setMediaStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(e => console.log("Video play error:", e));
      }
      setCameraGranted(true);
      startExam(); // Only start exam after camera is granted
    } catch (err) {
      alert("Camera access is required to take this exam. Please enable it and refresh.");
      navigate("/dashboard", { replace: true });
    }
  };

  const stopCamera = () => {
    if (mediaStream) {
      mediaStream.getTracks().forEach(track => track.stop());
    } else if (videoRef.current && videoRef.current.srcObject) {
      videoRef.current.srcObject.getTracks().forEach(track => track.stop());
    }
    
    // Also exit fullscreen if active
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(e => console.log(e));
    }
  };

  // Cleanup camera on unmount
  useEffect(() => {
    return () => stopCamera();
  }, []);

  // Ensure camera feed attaches after loading finishes and video element is mounted
  useEffect(() => {
    if (mediaStream && videoRef.current && !loading) {
      videoRef.current.srcObject = mediaStream;
      videoRef.current.play().catch(e => console.log("Video play error:", e));
    }
  }, [mediaStream, loading]);

  const startExam = async () => {
    // Attempt to lock screen into Fullscreen Mode
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(e => console.log("Fullscreen request denied", e));
    }

    try {
      const res = await API.post(`start-exam/${id}/`);
      setAttempt(res.data);
      
      if (res.data.saved_answers) {
        setAnswers(res.data.saved_answers);
        
        // Find the first unanswered question
        const savedKeys = Object.keys(res.data.saved_answers);
        const firstUnansweredIndex = res.data.questions.findIndex(
          q => !savedKeys.includes(q.id.toString())
        );
        if (firstUnansweredIndex !== -1) {
          setCurrentIndex(firstUnansweredIndex);
        }
      }
    } catch (err) {
      alert("Error loading exam");
      navigate("/dashboard", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!attempt || !attempt.end_time || !attempt.start_time) return;

    const start = new Date(attempt.start_time).getTime();
    const end = new Date(attempt.end_time).getTime();
    const halfTime = start + (end - start) / 2;
    
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = end - now;
      
      if (now >= halfTime && !canExit) {
        setCanExit(true);
      }
      
      if (diff <= 0) {
        clearInterval(timer);
        setTimeLeft("00:00");
        autoSubmitExam();
      } else {
        const minutes = Math.floor(diff / 60000);
        const seconds = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [attempt]);

  // ================= PROCTORING EVENTS =================
  useEffect(() => {
    if (!attempt || !cameraGranted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        handleMalpractice("Tab Switched or Minimized");
      } else if (videoRef.current) {
        // Try to wake the camera back up if suspended by the browser
        videoRef.current.play().catch(e => console.log("Resume play failed", e));
      }
    };

    const handleBlur = () => {
      handleMalpractice("Window lost focus");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, [attempt, cameraGranted]);

  // ================= FACE DETECTION =================
  useEffect(() => {
    if (!modelsLoaded || !cameraGranted || !videoRef.current || !attempt) return;

    const interval = setInterval(async () => {
      if (cooldownRef.current) return;
      
      try {
        const detections = await faceapi.detectAllFaces(
          videoRef.current,
          new faceapi.SsdMobilenetv1Options({ minConfidence: 0.5 })
        ).withFaceLandmarks();

        if (detections.length === 0) {
          triggerFaceAlert("No Face Detected in Webcam");
        } else if (detections.length > 1) {
          triggerFaceAlert("Multiple Faces Detected in Webcam");
        } else {
          // Eye/Gaze tracking via head pose estimation
          const landmarks = detections[0].landmarks;
          const leftEye = landmarks.getLeftEye()[0]; // Outer left eye
          const rightEye = landmarks.getRightEye()[3]; // Outer right eye
          const nose = landmarks.getNose()[3]; // Tip of nose

          if (leftEye && rightEye && nose) {
            const faceWidth = rightEye.x - leftEye.x;
            if (faceWidth > 0) {
              const noseToLeft = nose.x - leftEye.x;
              const ratio = noseToLeft / faceWidth;
              // If ratio is extremely skewed, head is turned left or right
              if (ratio < 0.25 || ratio > 0.75) {
                triggerFaceAlert("Looking Away From Screen");
              }
            }
          }
        }
      } catch (err) {
        // ignore errors if video not ready
      }
    }, 1500); // Check every 1.5 seconds

    return () => clearInterval(interval);
  }, [modelsLoaded, cameraGranted, attempt]);

  const triggerFaceAlert = (description) => {
    handleMalpractice(description);
    cooldownRef.current = true;
    setTimeout(() => {
      cooldownRef.current = false;
    }, 10000); // 10 second cooldown
  };

  const handleMalpractice = async (description) => {
    setViolationMsg(description);
    setWarningVisible(true);

    let screenshotBase64 = "";
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth || 320;
      canvas.height = video.videoHeight || 240;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      // Compress to low quality JPEG
      screenshotBase64 = canvas.toDataURL("image/jpeg", 0.5);
    }

    try {
      await API.post(`log-malpractice/${attempt.attempt_id}/`, {
        description: description,
        screenshot: screenshotBase64
      });
    } catch (err) {
      console.log("Failed to log malpractice", err);
    }
  };

  const autoSubmitExam = async () => {
    try {
      await API.post(`submit-exam/${attempt.attempt_id}/`);
      alert("Time is up! Your exam has been auto-submitted.");
      stopCamera();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      alert("Exam time ended. Redirecting...");
      stopCamera();
      navigate("/dashboard", { replace: true });
    }
  };

  const selectAnswer = async (qid, option) => {
    setAnswers({ ...answers, [qid]: option });
    setSaving(true);
    try {
      await API.post(`save-answer/${attempt.attempt_id}/`, {
        question_id: qid,
        selected: option
      });
    } catch (err) {
      console.error("Failed to save answer", err);
    } finally {
      setSaving(false);
    }
  };

  const handleNext = () => {
    if (currentIndex < attempt.questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const submitExam = async () => {
    // Set a flag to ignore blur during submission so it doesn't trigger malpractice
    cooldownRef.current = true; 
    
    try {
      const res = await API.post(`submit-exam/${attempt.attempt_id}/`);
      alert(res.data.message || "Exam submitted successfully");
      stopCamera();
      navigate("/dashboard", { replace: true });
    } catch (err) {
      alert("Failed to submit exam");
      cooldownRef.current = false;
    }
  };

  if (loading) return <div style={styles.center}><h3>Loading exam...</h3></div>;
  if (!attempt || !attempt.questions || attempt.questions.length === 0) {
    return <div style={styles.center}><h3>No questions found for this exam.</h3></div>;
  }

  const currentQuestion = attempt.questions[currentIndex];

  return (
    <div style={styles.layout}>
      <video ref={videoRef} autoPlay muted playsInline style={styles.cameraFeed} />
      <canvas ref={canvasRef} style={{ display: "none" }} />

      {warningVisible && (
        <div style={styles.warningOverlay}>
          <div style={styles.warningBox}>
            <h2 style={{color: "red", marginTop: 0}}>⚠️ WARNING: MALPRACTICE DETECTED</h2>
            <p><strong>Violation:</strong> {violationMsg}</p>
            <p>You have navigated away from the exam tab. This action has been recorded and an alert has been sent to the administrator, along with a webcam snapshot.</p>
            <p>Repeated violations may result in exam cancellation.</p>
            <button style={styles.warningBtn} onClick={() => {
              setWarningVisible(false);
              if (document.documentElement.requestFullscreen) {
                document.documentElement.requestFullscreen().catch(e => console.log("Fullscreen request denied", e));
              }
            }}>
              I Understand, Return to Exam
            </button>
          </div>
        </div>
      )}

      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>{attempt.exam}</h2>
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <div style={styles.timerBox}>
              ⏱ {timeLeft || "--:--"}
            </div>
            <div style={styles.progress}>
              Question {currentIndex + 1} of {attempt.questions.length}
              {saving && <span style={styles.savingText}>Saving...</span>}
            </div>
          </div>
        </div>

        <div style={styles.questionContainer}>
          <h4 style={styles.questionText}>{currentQuestion.text}</h4>

          <div style={styles.optionsGrid}>
            {["A", "B", "C", "D"].map(opt => (
              <label 
                key={opt} 
                style={{
                  ...styles.optionLabel,
                  borderColor: answers[currentQuestion.id] === opt ? "#3b82f6" : "#e2e8f0",
                  backgroundColor: answers[currentQuestion.id] === opt ? "#eff6ff" : "#ffffff",
                }}
              >
                <input
                  type="radio"
                  name={`question-${currentQuestion.id}`}
                  checked={answers[currentQuestion.id] === opt}
                  onChange={() => selectAnswer(currentQuestion.id, opt)}
                  style={styles.radioInput}
                />
                <span style={styles.optionLetter}>{opt}</span>
                <span style={styles.optionText}>{currentQuestion[opt.toLowerCase()]}</span>
              </label>
            ))}
          </div>
        </div>

        <div style={styles.footer}>
          <button 
            onClick={handlePrev} 
            disabled={currentIndex === 0}
            style={{
              ...styles.navBtn,
              opacity: currentIndex === 0 ? 0.5 : 1,
              cursor: currentIndex === 0 ? "not-allowed" : "pointer"
            }}
          >
            ← Previous
          </button>

          <div>
            <button
              style={{
                ...styles.navBtn,
                background: canExit ? "#ef4444" : "#fca5a5",
                color: "#fff",
                border: "none",
                marginRight: "15px",
                cursor: canExit ? "pointer" : "not-allowed"
              }}
              onClick={async () => {
                if(canExit) {
                  cooldownRef.current = true;
                  try {
                    await API.post(`submit-exam/${attempt.attempt_id}/`);
                  } catch (err) {
                    console.log("Submit on exit failed", err);
                  }
                  stopCamera();
                  navigate("/dashboard", { replace: true });
                }
              }}
              disabled={!canExit}
            >
              Exit Exam {canExit ? "" : "(Available at half time)"}
            </button>
            {currentIndex === attempt.questions.length - 1 ? (
              <button onClick={submitExam} style={styles.submitBtn}>
                Submit Exam
              </button>
            ) : (
              <button onClick={handleNext} style={{...styles.navBtn, background: "#1e293b", color: "#fff"}}>
                Next →
              </button>
            )}
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
    background: "linear-gradient(135deg, #f1f5f9, #e2e8f0)",
    fontFamily: "'Inter', 'Segoe UI', sans-serif",
    padding: "20px",
  },
  center: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    background: "#ffffff",
    width: "100%",
    maxWidth: "800px",
    borderRadius: "16px",
    boxShadow: "0 10px 25px rgba(0, 0, 0, 0.05)",
    overflow: "hidden",
  },
  header: {
    padding: "24px 32px",
    borderBottom: "1px solid #f1f5f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    margin: 0,
    fontSize: "20px",
    color: "#0f172a",
  },
  progress: {
    fontSize: "14px",
    color: "#64748b",
    fontWeight: "500",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  savingText: {
    color: "#10b981",
    fontSize: "12px",
    fontStyle: "italic"
  },
  timerBox: {
    background: "#ef4444",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "8px",
    fontWeight: "bold",
    fontSize: "14px",
    boxShadow: "0 2px 5px rgba(239, 68, 68, 0.3)"
  },
  questionContainer: {
    padding: "32px",
    minHeight: "300px",
  },
  questionText: {
    fontSize: "18px",
    color: "#1e293b",
    marginBottom: "24px",
    lineHeight: "1.5",
  },
  optionsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  optionLabel: {
    display: "flex",
    alignItems: "center",
    padding: "16px",
    border: "2px solid",
    borderRadius: "12px",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  radioInput: {
    display: "none",
  },
  optionLetter: {
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: "#e2e8f0",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginRight: "16px",
    color: "#475569",
    fontSize: "14px",
  },
  optionText: {
    fontSize: "16px",
    color: "#334155",
  },
  footer: {
    padding: "24px 32px",
    background: "#f8fafc",
    borderTop: "1px solid #f1f5f9",
    display: "flex",
    justifyContent: "space-between",
  },
  navBtn: {
    padding: "12px 24px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
    background: "#ffffff",
    color: "#475569",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.2s",
  },
  submitBtn: {
    padding: "12px 28px",
    borderRadius: "8px",
    border: "none",
    background: "#10b981",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.2s",
    boxShadow: "0 4px 12px rgba(16, 185, 129, 0.2)",
  },
  warningOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(0,0,0,0.85)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 9999
  },
  warningBox: {
    background: "#fff",
    padding: "30px",
    borderRadius: "12px",
    maxWidth: "500px",
    textAlign: "center",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    border: "4px solid red"
  },
  warningBtn: {
    marginTop: "20px",
    background: "#ef4444",
    color: "#fff",
    padding: "12px 24px",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer"
  },
  cameraFeed: {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    border: "4px solid #10b981",
    objectFit: "cover",
    zIndex: 1000,
    boxShadow: "0 4px 15px rgba(0,0,0,0.3)",
    transform: "scaleX(-1)", // Mirror the video so it feels natural
    backgroundColor: "#000" // Fallback color while loading
  }
};

export default ExamPage;