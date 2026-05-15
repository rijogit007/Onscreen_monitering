// import { useState } from "react";
// import API from "../api/axios";
// import { useNavigate, Link } from "react-router-dom";

// function VerifyOTP() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [otp, setOtp] = useState("");

//   const verify = async () => {
//     try {
//       await API.post("verify-otp/", { email, otp });
//       alert("Account Verified ✅");
//       navigate("/login");
//     } catch (err) {
//       console.log(err.response?.data);
//       alert("Invalid OTP");
//     }
//   };

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Verify OTP</h2>

//         <input
//           style={styles.input}
//           placeholder="Enter Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           style={styles.input}
//           placeholder="Enter OTP"
//           onChange={(e) => setOtp(e.target.value)}
//         />

//         <button style={styles.button} onClick={verify}>
//           Verify
//         </button>

//         <p style={styles.text}>
//           Back to{" "}
//           <Link to="/login" style={styles.link}>
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }

// export default VerifyOTP;

// const styles = {
//   page: {
//     height: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "linear-gradient(to right, #1e3c72, #2a5298)",
//   },

//   card: {
//     background: "white",
//     padding: "30px",
//     borderRadius: "10px",
//     width: "320px",
//     display: "flex",
//     flexDirection: "column",
//     gap: "15px",
//     boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//   },

//   title: {
//     textAlign: "center",
//   },

//   input: {
//     padding: "10px",
//     borderRadius: "5px",
//     border: "1px solid #ccc",
//   },

//   button: {
//     padding: "10px",
//     border: "none",
//     borderRadius: "5px",
//     background: "#2a5298",
//     color: "white",
//     cursor: "pointer",
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


import { useState } from "react";
// import API from "../api/axios";
import API from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";

function VerifyOTP() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [otp, setOtp] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  const [cooldown, setCooldown] = useState(0);

  const verify = async () => {

    // prevent spam clicks
    if (loading || cooldown > 0) return;

    setError("");

    setLoading(true);

    try {

      await API.post("verify-otp/", {
        email,
        otp
      });

      // cooldown
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

      alert("Account Verified ✅");

      navigate("/login");

    } catch (err) {

      console.log(err.response?.data);

      setError("Invalid OTP");

    } finally {

      setLoading(false);
    }
  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h2 style={styles.title}>
          Verify OTP
        </h2>

        <input
          style={styles.input}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
        />

        {/* ERROR */}
        {error && (
          <p style={styles.error}>
            {error}
          </p>
        )}

        {/* BUTTON */}
        <button

          onClick={verify}

          disabled={loading || cooldown > 0}

          style={{
            ...styles.button,

            opacity:
              loading || cooldown > 0
                ? 0.7
                : 1,

            cursor:
              loading || cooldown > 0
                ? "not-allowed"
                : "pointer",

            transform:
              loading
                ? "scale(0.97)"
                : "scale(1)",
          }}
        >

          {
            loading
              ? "Verifying..."

              : cooldown > 0
              ? `Wait ${cooldown}s`

              : "Verify"
          }

        </button>

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

export default VerifyOTP;

const styles = {

  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background:
      "linear-gradient(to right, #1e3c72, #2a5298)",
  },

  card: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "320px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.2)",
  },

  title: {
    textAlign: "center",
  },

  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },

  error: {
    color: "red",
    textAlign: "center",
    fontSize: "14px",
  },

  button: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    background: "#2a5298",
    color: "white",
    transition: "0.2s",
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