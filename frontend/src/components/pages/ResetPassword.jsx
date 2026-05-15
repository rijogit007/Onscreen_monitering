// // src/pages/ResetPassword.jsx

// import { useState } from "react";

// import {
//     useLocation,
//     useNavigate
// } from "react-router-dom";

// import API from "../../api/axios";

// function ResetPassword() {

//     const location = useLocation();

//     const navigate = useNavigate();

//     const [form, setForm] = useState({

//         email:
//             location.state?.email || "",

//         otp: "",

//         password: ""
//     });

//     const [message, setMessage] = useState("");

//     const [error, setError] = useState("");

//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {

//         setForm({

//             ...form,

//             [e.target.name]:
//                 e.target.value
//         });
//     };

//     const handleResetPassword = async () => {

//         try {

//             setLoading(true);

//             setError("");

//             setMessage("");

//             const res = await API.post(
//                 "/reset-password/",
//                 form
//             );

//             setMessage(
//                 res.data.message
//             );

//             setTimeout(() => {

//                 navigate("/login");

//             }, 2000);

//         } catch (err) {

//             setError(
//                 err.response?.data?.error ||
//                 "Something went wrong"
//             );

//         } finally {

//             setLoading(false);
//         }
//     };

//     return (

//         <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200 p-4">

//             <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-8">

//                 <div className="text-center mb-8">

//                     <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">

//                         <span className="text-4xl">
//                             🔑
//                         </span>

//                     </div>

//                     <h2 className="text-3xl font-bold text-gray-800">
//                         Reset Password
//                     </h2>

//                     <p className="text-gray-500 mt-2">
//                         Enter OTP and new password
//                     </p>

//                 </div>

//                 <div>

//                     <label className="block text-gray-700 mb-2 font-medium">
//                         Email
//                     </label>

//                     <input
//                         type="email"
//                         name="email"
//                         placeholder="Enter Email"
//                         value={form.email}
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
//                     />

//                     <label className="block text-gray-700 mb-2 font-medium">
//                         OTP
//                     </label>

//                     <input
//                         type="text"
//                         name="otp"
//                         placeholder="Enter OTP"
//                         value={form.otp}
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mb-4"
//                     />

//                     <label className="block text-gray-700 mb-2 font-medium">
//                         New Password
//                     </label>

//                     <input
//                         type="password"
//                         name="password"
//                         placeholder="Enter New Password"
//                         value={form.password}
//                         onChange={handleChange}
//                         className="w-full border border-gray-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 mb-5"
//                     />

//                     <button
//                         onClick={handleResetPassword}
//                         disabled={loading}
//                         className={`w-full p-4 rounded-xl text-white font-semibold transition duration-300 ${
//                             loading
//                                 ? "bg-gray-400"
//                                 : "bg-green-600 hover:bg-green-700"
//                         }`}
//                     >
//                         {
//                             loading
//                                 ? "Resetting..."
//                                 : "Reset Password"
//                         }
//                     </button>

//                     {
//                         message &&
//                         <div className="bg-green-100 text-green-700 p-3 rounded-lg mt-5 text-center">
//                             {message}
//                         </div>
//                     }

//                     {
//                         error &&
//                         <div className="bg-red-100 text-red-700 p-3 rounded-lg mt-5 text-center">
//                             {error}
//                         </div>
//                     }

//                 </div>

//             </div>

//         </div>
//     );
// }

// export default ResetPassword;


import { useState } from "react";

import {
  useLocation,
  useNavigate,
  Link
} from "react-router-dom";

import API from "../../api/axios";

function ResetPassword() {

  const location = useLocation();

  const navigate = useNavigate();

  const [form, setForm] = useState({

    email:
      location.state?.email || "",

    otp: "",

    password: ""
  });

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value
    });
  };

  const handleResetPassword = async () => {

    try {

      setLoading(true);

      setError("");

      setMessage("");

      const res = await API.post(
        "/reset-password/",
        form
      );

      setMessage(
        res.data.message
      );

      // redirect to login
      setTimeout(() => {

        navigate("/login");

      }, 2000);

    } catch (err) {

      setError(
        err.response?.data?.error
        || "Something went wrong"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        {/* ICON */}
        <div style={styles.iconBox}>
          🔑
        </div>

        {/* TITLE */}
        <h2 style={styles.title}>
          Reset Password
        </h2>

        <p style={styles.subtitle}>
          Enter OTP and new password
        </p>

        {/* EMAIL */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          style={styles.input}
        />

        {/* OTP */}
        <input
          type="text"
          name="otp"
          placeholder="Enter OTP"
          value={form.otp}
          onChange={handleChange}
          style={styles.input}
        />

        {/* PASSWORD */}
        <input
          type="password"
          name="password"
          placeholder="Enter New Password"
          value={form.password}
          onChange={handleChange}
          style={styles.input}
        />

        {/* SUCCESS */}
        {
          message && (
            <div style={styles.success}>
              {message}
            </div>
          )
        }

        {/* ERROR */}
        {
          error && (
            <div style={styles.error}>
              {error}
            </div>
          )
        }

        {/* BUTTON */}
        <button
          onClick={handleResetPassword}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor:
              loading
                ? "not-allowed"
                : "pointer"
          }}
        >

          {
            loading
              ? "Resetting..."
              : "Reset Password"
          }

        </button>

        {/* LOGIN */}
        <p style={styles.text}>

          Back to{" "}

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

export default ResetPassword;

const styles = {

  page: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(to right, #1e3c72, #2a5298)",
    padding: "20px"
  },

  card: {
    width: "100%",
    maxWidth: "400px",
    background: "#fff",
    padding: "35px",
    borderRadius: "18px",
    boxShadow:
      "0 8px 25px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "18px"
  },

  iconBox: {
    width: "80px",
    height: "80px",
    margin: "0 auto",
    borderRadius: "50%",
    background: "#e8f0ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "40px"
  },

  title: {
    textAlign: "center",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#222",
    margin: 0
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginTop: "-8px",
    fontSize: "14px"
  },

  input: {
    padding: "14px",
    borderRadius: "10px",
    border: "1px solid #ccc",
    fontSize: "15px",
    outline: "none"
  },

  button: {
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#2a5298",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    transition: "0.3s"
  },

  success: {
    background: "#d4edda",
    color: "#155724",
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "14px"
  },

  error: {
    background: "#f8d7da",
    color: "#721c24",
    padding: "12px",
    borderRadius: "8px",
    textAlign: "center",
    fontSize: "14px"
  },

  text: {
    textAlign: "center",
    fontSize: "14px",
    color: "#555"
  },

  link: {
    color: "#2a5298",
    fontWeight: "bold",
    textDecoration: "none"
  }
};