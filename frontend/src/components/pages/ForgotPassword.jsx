// // src/pages/ForgotPassword.jsx

// import { useState } from "react";

// import API from "../../api/axios";

// function ForgotPassword() {

//     const [email, setEmail] = useState("");

//     const [message, setMessage] = useState("");

//     const [error, setError] = useState("");

//     const handleSendOTP = async () => {

//         try {

//             setError("");

//             setMessage("");

//             const res = await API.post(
//                 "/forgot-password/",
//                 {
//                     email
//                 }
//             );

//             setMessage(
//                 res.data.message
//             );

//         } catch (err) {

//             setError(
//                 err.response?.data?.error ||
//                 "Something went wrong"
//             );
//         }
//     };

//     return (

//         <div className="min-h-screen flex items-center justify-center bg-gray-100">

//             <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

//                 <h2 className="text-2xl font-bold mb-6 text-center">
//                     Forgot Password
//                 </h2>

//                 <input
//                     type="email"
//                     placeholder="Enter Email"
//                     value={email}
//                     onChange={(e) =>
//                         setEmail(e.target.value)
//                     }
//                     className="w-full border p-3 rounded-lg mb-4"
//                 />

//                 <button
//                     onClick={handleSendOTP}
//                     className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
//                 >
//                     Send OTP
//                 </button>

//                 {
//                     message &&
//                     <p className="text-green-600 mt-4 text-center">
//                         {message}
//                     </p>
//                 }

//                 {
//                     error &&
//                     <p className="text-red-600 mt-4 text-center">
//                         {error}
//                     </p>
//                 }

//             </div>

//         </div>
//     );
// }

// export default ForgotPassword;



import { useState } from "react";

import API from "../../api/axios";

import {
  Link,
  useNavigate
} from "react-router-dom";

function ForgotPassword() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [message, setMessage] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSendOTP = async () => {

    try {

      setLoading(true);

      setError("");

      setMessage("");

      const res = await API.post(
        "/forgot-password/",
        {
          email
        }
      );

      setMessage(
        res.data.message
      );

      // redirect after success
      setTimeout(() => {

        navigate(
          "/reset-password",
          {
            state: { email }
          }
        );

      }, 1500);

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
          🔐
        </div>

        {/* TITLE */}
        <h2 style={styles.title}>
          Forgot Password
        </h2>

        <p style={styles.subtitle}>
          Enter your email address to receive OTP
        </p>

        {/* EMAIL INPUT */}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
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
          onClick={handleSendOTP}
          disabled={loading}
          style={{
            ...styles.button,
            opacity: loading ? 0.7 : 1,
            cursor: loading
              ? "not-allowed"
              : "pointer"
          }}
        >

          {
            loading
              ? "Sending OTP..."
              : "Send OTP"
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

export default ForgotPassword;

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