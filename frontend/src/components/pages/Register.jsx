import { useEffect, useState, useRef } from "react";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import "../../index.css";

function Register() {
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    uucms_no: "",
    reg_no: "",
    course: "",
    profile: null,
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  
  const registerLock = useRef(false);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await API.get("courses/");
      setCourses(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    setForm({ ...form, profile: file });
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleRegister = async () => {
    if (loading || cooldown > 0 || registerLock.current) return;
    registerLock.current = true;
    setError("");
    setLoading(true);

    const formData = new FormData();
    for (let key in form) {
      formData.append(key, form[key]);
    }

    try {
      await API.post("register/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setCooldown(6);
      const timer = setInterval(() => {
        setCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      alert("OTP sent to email");
      navigate("/verify");
    } catch (err) {
      console.log(err);
      if (err.response?.data) {
        const data = err.response.data;
        if (data.email) setError(data.email[0]);
        else if (data.uucms_no) setError(data.uucms_no[0]);
        else if (data.reg_no) setError(data.reg_no[0]);
        else setError("Registration failed");
      } else {
        setError("Server error");
      }
    } finally {
      setLoading(false);
      registerLock.current = false;
    }
  };

  return (
    <div style={styles.page}>
      
      {/* Background elements */}
      <div style={styles.orb1}></div>
      <div style={styles.orb2}></div>

      <div className="glass animate-fade-up delay-100" style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join the secure monitoring system</p>
        </div>

        <div style={styles.form}>
          <div style={styles.row}>
            <input
              style={styles.input}
              name="first_name"
              placeholder="First Name"
              onChange={handleChange}
            />
            <input
              style={styles.input}
              name="last_name"
              placeholder="Last Name"
              onChange={handleChange}
            />
          </div>

          <input
            style={styles.input}
            name="email"
            placeholder="Email Address"
            onChange={handleChange}
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <div style={styles.row}>
            <input
              style={styles.input}
              name="uucms_no"
              placeholder="UUCMS No"
              onChange={handleChange}
            />
            <input
              style={styles.input}
              name="reg_no"
              placeholder="Register No"
              onChange={handleChange}
            />
          </div>

          <select style={styles.input} name="course" onChange={handleChange}>
            <option value="" style={{color: "#000"}}>Select Course</option>
            {courses.map((course) => (
              <option key={course.id} value={course.id} style={{color: "#000"}}>
                {course.name}
              </option>
            ))}
          </select>

          <div style={styles.fileUploadContainer}>
            <label style={styles.label}>Profile Picture</label>
            <div style={styles.fileRow}>
              <input type="file" style={styles.file} onChange={handleFile} />
              {preview && <img src={preview} alt="preview" style={styles.preview} />}
            </div>
          </div>

          {error && <p style={styles.error}>{error}</p>}

          <button
            className="hover-lift"
            onClick={handleRegister}
            disabled={loading || cooldown > 0}
            style={{
              ...styles.button,
              opacity: loading || cooldown > 0 ? 0.7 : 1,
              cursor: loading || cooldown > 0 ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Registering..." : cooldown > 0 ? `Wait ${cooldown}s` : "Create Account"}
          </button>
        </div>

        <div style={styles.footer}>
          <p style={styles.text}>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;

const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(-45deg, #0f172a, #1e293b, #0f172a, #020617)",
    backgroundSize: "400% 400%",
    animation: "gradientShift 15s ease infinite",
    position: "relative",
    padding: "40px 20px"
  },
  
  orb1: {
    position: "absolute",
    top: "5%",
    left: "10%",
    width: "300px",
    height: "300px",
    background: "radial-gradient(circle, rgba(56,189,248,0.15) 0%, rgba(0,0,0,0) 70%)",
    borderRadius: "50%",
    animation: "float 6s ease-in-out infinite"
  },
  
  orb2: {
    position: "absolute",
    bottom: "5%",
    right: "10%",
    width: "400px",
    height: "400px",
    background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(0,0,0,0) 70%)",
    borderRadius: "50%",
    animation: "floatReverse 8s ease-in-out infinite"
  },

  card: {
    padding: "40px",
    borderRadius: "24px",
    width: "100%",
    maxWidth: "500px",
    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
    zIndex: 10,
    color: "white",
  },

  header: {
    textAlign: "center",
    marginBottom: "25px",
  },

  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "8px",
    letterSpacing: "-0.5px"
  },

  subtitle: {
    fontSize: "15px",
    color: "#94a3b8",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  row: {
    display: "flex",
    gap: "15px",
  },

  input: {
    flex: 1,
    padding: "14px 16px",
    borderRadius: "12px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    background: "rgba(15, 23, 42, 0.6)",
    color: "white",
    fontSize: "15px",
    outline: "none",
    transition: "all 0.2s ease",
  },

  fileUploadContainer: {
    marginTop: "10px",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  label: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#e2e8f0",
  },

  fileRow: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },

  file: {
    color: "#cbd5e1",
    fontSize: "14px",
  },

  preview: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #38bdf8"
  },

  error: {
    color: "#ef4444",
    fontSize: "14px",
    background: "rgba(239, 68, 68, 0.1)",
    padding: "10px",
    borderRadius: "8px",
    textAlign: "center",
    border: "1px solid rgba(239, 68, 68, 0.2)"
  },

  button: {
    padding: "14px",
    background: "linear-gradient(to right, #38bdf8, #0ea5e9)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "16px",
    fontWeight: "600",
    marginTop: "10px",
    boxShadow: "0 4px 14px rgba(56, 189, 248, 0.4)",
  },

  footer: {
    marginTop: "25px",
    textAlign: "center",
  },

  text: {
    color: "#94a3b8",
    fontSize: "14px",
  },

  link: {
    color: "#38bdf8",
    textDecoration: "none",
    fontWeight: "500",
    transition: "color 0.2s ease"
  },
};