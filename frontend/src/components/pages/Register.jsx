


    // import { useState } from "react";
    // // import API from "/api/axios";
    // import API from "../../api/axios";
    // import { useNavigate, Link } from "react-router-dom";

    // function Register() {

    //   const navigate = useNavigate();

    //   const [form, setForm] = useState({
    //     first_name: "",
    //     last_name: "",
    //     email: "",
    //     password: "",
    //     uucms_no: "",
    //     reg_no: "",
    //     course: "",
    //     profile: null,
    //   });

    //   const [preview, setPreview] = useState(null);

    //   const [error, setError] = useState("");

    //   // 🔥 loading + cooldown
    //   const [loading, setLoading] = useState(false);

    //   const [cooldown, setCooldown] = useState(0);

    //   const handleChange = (e) => {

    //     setForm({
    //       ...form,
    //       [e.target.name]: e.target.value
    //     });
    //   };

    //   const handleFile = (e) => {

    //     const file = e.target.files[0];

    //     setForm({
    //       ...form,
    //       profile: file
    //     });

    //     if (file) {
    //       setPreview(URL.createObjectURL(file));
    //     }
    //   };

    //   const handleRegister = async () => {

    //     // 🔥 stop multiple clicks
    //     if (loading || cooldown > 0) return;

    //     setError("");

    //     setLoading(true);

    //     const formData = new FormData();

    //     for (let key in form) {
    //       formData.append(key, form[key]);
    //     }

    //     try {

    //       await API.post("register/", formData, {
    //         headers: {
    //           "Content-Type": "multipart/form-data",
    //         },
    //       });

    //       // 🔥 cooldown timer
    //       setCooldown(6);

    //       const timer = setInterval(() => {

    //         setCooldown((prev) => {

    //           if (prev <= 1) {

    //             clearInterval(timer);

    //             return 0;
    //           }

    //           return prev - 1;
    //         });

    //       }, 1000);

    //       alert("OTP sent to email");

    //       navigate("/verify");

    //     } catch (err) {

    //       console.log(err);

    //       if (err.response?.data) {

    //         const data = err.response.data;

    //         if (data.email) {
    //           setError(data.email[0]);
    //         }

    //         else if (data.uucms_no) {
    //           setError(data.uucms_no[0]);
    //         }

    //         else if (data.reg_no) {
    //           setError(data.reg_no[0]);
    //         }

    //         else {
    //           setError("Registration failed");
    //         }

    //       } else {

    //         setError("Server error");
    //       }

    //     } finally {

    //       setLoading(false);
    //     }
    //   };

    //   return (

    //     <div style={styles.page}>

    //       <div style={styles.card}>

    //         <h2 style={styles.title}>
    //           Create Account
    //         </h2>

    //         {/* NAME */}
    //         <div style={styles.row}>

    //           <input
    //             style={styles.input}
    //             name="first_name"
    //             placeholder="First Name"
    //             onChange={handleChange}
    //           />

    //           <input
    //             style={styles.input}
    //             name="last_name"
    //             placeholder="Last Name"
    //             onChange={handleChange}
    //           />

    //         </div>

    //         {/* EMAIL */}
    //         <input
    //           style={styles.input}
    //           name="email"
    //           placeholder="Email"
    //           onChange={handleChange}
    //         />

    //         {/* PASSWORD */}
    //         <input
    //           style={styles.input}
    //           type="password"
    //           name="password"
    //           placeholder="Password"
    //           onChange={handleChange}
    //         />

    //         {/* UUCMS */}
    //         <input
    //           style={styles.input}
    //           name="uucms_no"
    //           placeholder="UUCMS No"
    //           onChange={handleChange}
    //         />

    //         {/* REG */}
    //         <input
    //           style={styles.input}
    //           name="reg_no"
    //           placeholder="Register No"
    //           onChange={handleChange}
    //         />

    //         {/* COURSE */}
    //         <input
    //           style={styles.input}
    //           name="course"
    //           placeholder="Course"
    //           onChange={handleChange}
    //         />

    //         {/* PROFILE */}
    //         <label style={styles.label}>
    //           Upload Profile
    //         </label>

    //         <input
    //           type="file"
    //           style={styles.file}
    //           onChange={handleFile}
    //         />

    //         {/* PREVIEW */}
    //         {preview && (
    //           <img
    //             src={preview}
    //             alt="preview"
    //             style={styles.preview}
    //           />
    //         )}

    //         {/* ERROR */}
    //         {error && (
    //           <p style={styles.error}>
    //             {error}
    //           </p>
    //         )}

    //         {/* BUTTON */}
    //         <button

    //           onClick={handleRegister}

    //           disabled={loading || cooldown > 0}

    //           style={{
    //             ...styles.button,

    //             opacity:
    //               loading || cooldown > 0
    //                 ? 0.7
    //                 : 1,

    //             cursor:
    //               loading || cooldown > 0
    //                 ? "not-allowed"
    //                 : "pointer",

    //             transform:
    //               loading
    //                 ? "scale(0.97)"
    //                 : "scale(1)",
    //           }}
    //         >

    //           {
    //             loading
    //               ? "Sending OTP..."

    //               : cooldown > 0
    //               ? `Wait ${cooldown}s`

    //               : "Register"
    //           }

    //         </button>

    //         {/* LOGIN */}
    //         <p style={styles.text}>

    //           Already have an account?{" "}

    //           <Link
    //             to="/login"
    //             style={styles.link}
    //           >
    //             Login
    //           </Link>

    //         </p>

    //       </div>

    //     </div>
    //   );
    // }

    // export default Register;

    // const styles = {

    //   page: {
    //     minHeight: "100vh",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     background: "linear-gradient(to right, #1e3c72, #2a5298)",
    //     padding: "20px",
    //   },

    //   card: {
    //     background: "white",
    //     padding: "25px",
    //     borderRadius: "10px",
    //     width: "400px",
    //     maxHeight: "90vh",
    //     overflowY: "auto",
    //     display: "flex",
    //     flexDirection: "column",
    //     gap: "12px",
    //     boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
    //   },

    //   title: {
    //     textAlign: "center",
    //     marginBottom: "10px",
    //     position: "sticky",
    //     top: 0,
    //     background: "white",
    //     paddingBottom: "5px",
    //   },

    //   row: {
    //     display: "flex",
    //     gap: "10px",
    //   },

    //   input: {
    //     flex: 1,
    //     padding: "10px",
    //     borderRadius: "5px",
    //     border: "1px solid #ccc",
    //     fontSize: "14px",
    //   },

    //   label: {
    //     fontSize: "14px",
    //     fontWeight: "bold",
    //   },

    //   file: {
    //     fontSize: "14px",
    //   },

    //   preview: {
    //     width: "80px",
    //     height: "80px",
    //     borderRadius: "50%",
    //     objectFit: "cover",
    //     alignSelf: "center",
    //     marginTop: "5px",
    //   },

    //   error: {
    //     color: "red",
    //     textAlign: "center",
    //     fontSize: "14px",
    //   },

    //   button: {
    //     padding: "12px",
    //     border: "none",
    //     borderRadius: "5px",
    //     background: "#2a5298",
    //     color: "white",
    //     fontSize: "16px",
    //     transition: "0.2s",
    //   },

    //   text: {
    //     textAlign: "center",
    //     fontSize: "14px",
    //   },

    //   link: {
    //     color: "#2a5298",
    //     textDecoration: "none",
    //     fontWeight: "bold",
    //   },
    // };


import { useEffect, useState } from "react";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

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

  // ======================================
  // GET COURSES
  // ======================================

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

  // ======================================
  // HANDLE INPUT
  // ======================================

  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ======================================
  // HANDLE FILE
  // ======================================

  const handleFile = (e) => {

    const file = e.target.files[0];

    setForm({
      ...form,
      profile: file,
    });

    if (file) {

      setPreview(
        URL.createObjectURL(file)
      );
    }
  };

  // ======================================
  // REGISTER
  // ======================================

  const handleRegister = async () => {

    if (loading || cooldown > 0) return;

    setError("");

    setLoading(true);

    const formData = new FormData();

    for (let key in form) {

      formData.append(
        key,
        form[key]
      );
    }

    try {

      await API.post(
        "register/",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

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

        if (data.email) {

          setError(data.email[0]);

        } else if (data.uucms_no) {

          setError(data.uucms_no[0]);

        } else if (data.reg_no) {

          setError(data.reg_no[0]);

        } else {

          setError(
            "Registration failed"
          );
        }

      } else {

        setError("Server error");
      }

    } finally {

      setLoading(false);
    }
  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h2 style={styles.title}>
          Create Account
        </h2>

        {/* NAME */}
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

        {/* EMAIL */}
        <input
          style={styles.input}
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        {/* PASSWORD */}
        <input
          style={styles.input}
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        {/* UUCMS */}
        <input
          style={styles.input}
          name="uucms_no"
          placeholder="UUCMS No"
          onChange={handleChange}
        />

        {/* REG */}
        <input
          style={styles.input}
          name="reg_no"
          placeholder="Register No"
          onChange={handleChange}
        />

        {/* COURSE */}
        <select
          style={styles.input}
          name="course"
          onChange={handleChange}
        >

          <option value="">
            Select Course
          </option>

          {courses.map((course) => (

            <option
              key={course.id}
              value={course.id}
            >
              {course.name}
            </option>

          ))}

        </select>

        {/* PROFILE */}
        <label style={styles.label}>
          Upload Profile
        </label>

        <input
          type="file"
          style={styles.file}
          onChange={handleFile}
        />

        {/* PREVIEW */}
        {preview && (

          <img
            src={preview}
            alt="preview"
            style={styles.preview}
          />

        )}

        {/* ERROR */}
        {error && (

          <p style={styles.error}>
            {error}
          </p>

        )}

        {/* BUTTON */}
        <button

          onClick={handleRegister}

          disabled={
            loading ||
            cooldown > 0
          }

          style={{
            ...styles.button,

            opacity:
              loading ||
              cooldown > 0
                ? 0.7
                : 1,

            cursor:
              loading ||
              cooldown > 0
                ? "not-allowed"
                : "pointer",
          }}
        >

          {
            loading
              ? "Registering..."

              : cooldown > 0
              ? `Wait ${cooldown}s`

              : "Register"
          }

        </button>

        {/* LOGIN */}
        <p style={styles.text}>

          Already have an account?{" "}

          <Link
            to="/login"
            style={styles.link}
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Register;

const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(to right, #1e3c72, #2a5298)",
    padding: "20px",
  },

  card: {
    background: "white",
    padding: "25px",
    borderRadius: "10px",
    width: "400px",
    maxHeight: "90vh",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.2)",
  },

  title: {
    textAlign: "center",
    marginBottom: "10px",
  },

  row: {
    display: "flex",
    gap: "10px",
  },

  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },

  label: {
    fontSize: "14px",
    fontWeight: "bold",
  },

  file: {
    fontSize: "14px",
  },

  preview: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    alignSelf: "center",
    marginTop: "5px",
  },

  error: {
    color: "red",
    textAlign: "center",
    fontSize: "14px",
  },

  button: {
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    background: "#2a5298",
    color: "white",
    fontSize: "16px",
  },

  text: {
    textAlign: "center",
    fontSize: "14px",
  },

  link: {
    color: "#2a5298",
    textDecoration: "none",
    fontWeight: "bold",
  },
};