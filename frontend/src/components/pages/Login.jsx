// import { useState } from "react";
// import API from "../api/axios";
// import { Link, useNavigate } from "react-router-dom";

// function Login() {  
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const login = async () => {
//   try {
//     const res = await API.post("login/", { email, password });

//     // 🔥 STORE CONSISTENTLY
//     localStorage.setItem("access", res.data.access);
//     localStorage.setItem("refresh", res.data.refresh);
//     localStorage.setItem("user", JSON.stringify(res.data.user));

//     alert("Login successful");

//     navigate("/dashboard");

//   } catch (err) {
//     alert(err.response?.data?.error || "Login failed");
//   }
// };

//   return (
//     <div style={styles.page}>
//       <div style={styles.card}>
//         <h2 style={styles.title}>Login</h2>

//         <input
//           style={styles.input}
//           type="email"
//           placeholder="Enter Email"
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           style={styles.input}
//           type="password"
//           placeholder="Enter Password"
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button style={styles.button} onClick={login}>
//           Login
//         </button>

//         <p style={styles.text}>
//           Don't have an account?{" "}
//           <Link to="/register" style={styles.link}>
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }



//   export default Login;

//   const styles = {
//     page: {
//       height: "100vh",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       background: "linear-gradient(to right, #1e3c72, #2a5298)",
//     },

//     card: {
//       background: "white",
//       padding: "30px",
//       borderRadius: "10px",
//       width: "300px",
//       display: "flex",
//       flexDirection: "column",
//       gap: "15px",
//       boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
//     },

//     title: {
//       textAlign: "center",
//       marginBottom: "10px",
//     },

//     input: {
//       padding: "10px",
//       borderRadius: "5px",
//       border: "1px solid #ccc",
//       fontSize: "14px",
//     },

//     button: {
//       padding: "10px",
//       border: "none",
//       borderRadius: "5px",
//       background: "#2a5298",
//       color: "white",
//       fontSize: "16px",
//       cursor: "pointer",
//     },

//     text: {
//       fontSize: "14px",
//       textAlign: "center",
//     },

//     link: {
//       color: "#2a5298",
//       textDecoration: "none",
//       fontWeight: "bold",
//     },
//   };


import { useState } from "react";
import API from "../../api/axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  // 🔥 loading + cooldown
  const [loading, setLoading] = useState(false);

  const [cooldown, setCooldown] = useState(0);

  const login = async () => {

    // stop spam clicks
    if (loading || cooldown > 0) return;

    setError("");

    setLoading(true);

    try {

      const res = await API.post(
        "login/",
        {
          email,
          password
        }
      );

      // store auth
      localStorage.setItem(
        "access",
        res.data.access
      );

      localStorage.setItem(
        "refresh",
        res.data.refresh
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

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

      alert("Login successful");

      // navigate("/dashboard");
      if (res.data.user.is_admin) {

  navigate("/admin-dashboard");

} else {

  navigate("/dashboard");
}

    } catch (err) {

      setError(
        err.response?.data?.error
        || "Login failed"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div style={styles.page}>

      <div style={styles.card}>

        <h2 style={styles.title}>
          Login
        </h2>

        {/* EMAIL */}
        <input
          style={styles.input}
          type="email"
          placeholder="Enter Email"
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        {/* PASSWORD */}
        <input
          style={styles.input}
          type="password"
          placeholder="Enter Password"
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        {/* ERROR */}
        {error && (
          <p style={styles.error}>
            {error}
          </p>
        )}

        {/* BUTTON */}
        <button

          onClick={login}

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
              ? "Logging in..."

              : cooldown > 0
              ? `Wait ${cooldown}s`

              : "Login"
          }

        </button>

        {/* REGISTER */}
        <p style={styles.text}>

          Don't have an account?{" "}

          <Link
            to="/register"
            style={styles.link}
          >
            Register
          </Link>

        </p>
        <p style={styles.text}>

          Forgot your password?{" "}

          <Link
            to="/forgot-password"
            style={styles.link}
          >
            Forgot
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;

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
    width: "300px",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    boxShadow:
      "0 4px 10px rgba(0,0,0,0.2)",
  },

  title: {
    textAlign: "center",
    marginBottom: "10px",
  },

  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
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
    fontSize: "16px",
    transition: "0.2s",
  },

  text: {
    fontSize: "14px",
    textAlign: "center",
  },

  link: {
    color: "#2a5298",
    textDecoration: "none",
    fontWeight: "bold",
  },
};