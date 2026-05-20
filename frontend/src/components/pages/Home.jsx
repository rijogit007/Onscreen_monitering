

// import { Link } from "react-router-dom";
// import { Canvas, useFrame } from "@react-three/fiber";
// import {
//   Float,
//   Stars,
//   Sparkles,
//   Environment,
// } from "@react-three/drei";
// import { motion } from "framer-motion";
// import { useRef } from "react";
// import * as THREE from "three";
// import "../../index.css";

// /* 🔥 FLOATING ORBS */
// function Orb({ position, color, scale }) {
//   const ref = useRef();

//   useFrame((state) => {
//     ref.current.rotation.y += 0.002;

//     ref.current.position.y =
//       position[1] +
//       Math.sin(state.clock.elapsedTime * 1.5) * 0.2;
//   });

//   return (
//     <Float speed={2} rotationIntensity={2}>
//       <mesh ref={ref} position={position} scale={scale}>
//         <sphereGeometry args={[1, 64, 64]} />

//         <meshStandardMaterial
//           color={color}
//           emissive={color}
//           emissiveIntensity={2}
//           metalness={0.7}
//           roughness={0.1}
//         />
//       </mesh>
//     </Float>
//   );
// }

// /* 🔥 SCROLL CAMERA */
// function ScrollCamera() {
//   useFrame(({ camera }) => {
//     const scrollY = window.scrollY;

//     const targetZ = 8 - scrollY * 0.002;
//     const targetY = scrollY * 0.001;

//     camera.position.z = THREE.MathUtils.lerp(
//       camera.position.z,
//       targetZ,
//       0.05
//     );

//     camera.position.y = THREE.MathUtils.lerp(
//       camera.position.y,
//       targetY,
//       0.05
//     );

//     camera.lookAt(0, 0, 0);
//   });

//   return null;
// }

// function Home() {
//   return (
//     <div style={styles.page}>
//       {/* 🔥 3D BACKGROUND */}
//       <div style={styles.canvasContainer}>
//         <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
//           <ambientLight intensity={1} />

//           <directionalLight
//             position={[5, 5, 5]}
//             intensity={2}
//             color="#38bdf8"
//           />

//           <Environment preset="night" />

//           <Stars
//             radius={100}
//             depth={50}
//             count={5000}
//             factor={4}
//             fade
//             speed={1}
//           />

//           <Sparkles
//             count={100}
//             scale={20}
//             size={2}
//             speed={0.4}
//           />

//           <Orb
//             position={[-3, 0, 0]}
//             color="#38bdf8"
//             scale={1.6}
//           />

//           <Orb
//             position={[3, 1, -2]}
//             color="#0ea5e9"
//             scale={1.2}
//           />

//           <Orb
//             position={[0, -2, -1]}
//             color="#14b8a6"
//             scale={1}
//           />

//           <ScrollCamera />
//         </Canvas>
//       </div>

//       {/* 🔥 DARK OVERLAY */}
//       <div style={styles.overlay}></div>

//       {/* 🔥 NAVBAR */}
//       <nav style={styles.navbar}>
//         <h2 style={styles.logo}>
//           INVIGILA 
//           <span style={{ color: "#38bdf8" }}>
//             AI
//           </span>
//         </h2>

//         <div>
//           <Link to="/login">
//             <button style={styles.outlineBtn}>
//               Login
//             </button>
//           </Link>

//           <Link to="/register">
//             <button style={styles.mainBtn}>
//               Register
//             </button>
//           </Link>
//         </div>
//       </nav>

//       {/* 🔥 HERO */}
//       <section style={styles.hero}>
//         <motion.div
//           initial={{ opacity: 0, y: 60 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <div style={styles.badge}>
//             ⚡ AI Powered Examination Monitoring
//           </div>

//           <h1 style={styles.title}>
//             Future Of Smart
//             <br />
//             Online Examination
//             <span style={{ color: "#38bdf8" }}>
//               {" "}Security
//             </span>
//           </h1>

//           <p style={styles.subtitle}>
//             AI powered surveillance system for secure
//             examinations with face detection, movement
//             tracking, malpractice alerts, and real-time
//             observation infrastructure.
//           </p>

//           <div style={styles.buttons}>
//             <Link to="/login">
//               <button style={styles.mainBtnBig}>
//                 Launch System
//               </button>
//             </Link>

//             <Link to="/register">
//               <button style={styles.secondaryBtn}>
//                 Create Account
//               </button>
//             </Link>
//           </div>
//         </motion.div>
//       </section>

//       {/* 🔥 FACE DETECTION SECTION */}
//       <section style={styles.scanSection}>
//         <motion.div
//           initial={{ opacity: 0, y: 80 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//           viewport={{ once: false }}
//           style={styles.scanContent}
//         >
//           <div style={styles.scanLeft}>
//             <div style={styles.faceBox}></div>

//             <div style={styles.scanLine}></div>

//             <img
//               src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
//               alt=""
//               style={styles.scanImage}
//             />

//             <div style={styles.aiText}>
//               FACE DETECTED
//             </div>
//           </div>

//           <div style={styles.scanRight}>
//             <h1 style={styles.sectionBigTitle}>
//               AI Face Detection
//             </h1>

//             <p style={styles.sectionDescription}>
//               Detect suspicious activities, identify
//               multiple faces, analyze eye movement,
//               and monitor examination behavior
//               instantly using computer vision.
//             </p>

//             <div style={styles.featureList}>
//               <div>✔ Live Face Recognition</div>
//               <div>✔ Eye Tracking System</div>
//               <div>✔ Multiple Face Alerts</div>
//               <div>✔ AI Smart Detection</div>
//             </div>
//           </div>
//         </motion.div>
//       </section>

//       {/* 🔥 ANALYTICS */}
//       <section style={styles.analyticsSection}>
//         <motion.div
//           initial={{ opacity: 0, scale: 0.8 }}
//           whileInView={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <h1 style={styles.analyticsTitle}>
//             Live AI Analytics
//           </h1>

//           <div style={styles.analyticsGrid}>
//             <div style={styles.analyticsCard}>
//               <h2>99.9%</h2>
//               <p>Detection Accuracy</p>
//             </div>

//             <div style={styles.analyticsCard}>
//               <h2>24/7</h2>
//               <p>Real-Time Monitoring</p>
//             </div>

//             <div style={styles.analyticsCard}>
//               <h2>0.2s</h2>
//               <p>Alert Response Time</p>
//             </div>

//             <div style={styles.analyticsCard}>
//               <h2>AI</h2>
//               <p>Behavior Tracking</p>
//             </div>
//           </div>
//         </motion.div>
//       </section>

//       {/* 🔥 CYBER SECURITY */}
//       <section style={styles.cyberSection}>
//         <motion.div
//           initial={{ opacity: 0, y: 80 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           <h1 style={styles.cyberTitle}>
//             Secure AI Infrastructure
//           </h1>

//           <p style={styles.cyberText}>
//             Enterprise-grade AI security architecture
//             with encrypted monitoring, scalable
//             surveillance systems, automated reporting,
//             and intelligent behavior analysis.
//           </p>
//         </motion.div>
//       </section>
//     </div>
//   );
// }

// export default Home;

// const styles = {
//   page: {
//     minHeight: "100vh",
//     background: "#000",
//     color: "white",
//     overflowX: "hidden",
//     position: "relative",
//   },

//   canvasContainer: {
//     position: "fixed",
//     inset: 0,
//     zIndex: 0,
//   },

//   overlay: {
//     position: "fixed",
//     inset: 0,
//     background:
//       "linear-gradient(to bottom, rgba(0,0,0,0.5), rgba(0,0,0,0.85))",
//     zIndex: 1,
//   },

//   navbar: {
//     position: "fixed",
//     width: "100%",
//     top: 0,
//     zIndex: 30,
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     padding: "25px 60px",
//     backdropFilter: "blur(14px)",
//   },

//   logo: {
//     fontSize: "28px",
//     fontWeight: "900",
//     letterSpacing: "-1px",
//   },

//   hero: {
//     minHeight: "100vh",
//     position: "relative",
//     zIndex: 20,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//     padding: "20px",
//   },

//   badge: {
//     display: "inline-block",
//     padding: "10px 20px",
//     borderRadius: "999px",
//     background: "rgba(56,189,248,0.1)",
//     border: "1px solid rgba(56,189,248,0.4)",
//     color: "#7dd3fc",
//     marginBottom: "25px",
//     fontWeight: "600",
//   },

//   title: {
//     fontSize: "78px",
//     fontWeight: "900",
//     lineHeight: "1.1",
//     marginBottom: "25px",
//   },

//   subtitle: {
//     fontSize: "20px",
//     color: "#cbd5e1",
//     lineHeight: "1.8",
//     maxWidth: "850px",
//     margin: "0 auto 40px",
//   },

//   buttons: {
//     display: "flex",
//     justifyContent: "center",
//     gap: "20px",
//     flexWrap: "wrap",
//   },

//   mainBtn: {
//     background: "#38bdf8",
//     border: "none",
//     padding: "12px 24px",
//     borderRadius: "12px",
//     color: "white",
//     fontWeight: "700",
//     cursor: "pointer",
//   },

//   outlineBtn: {
//     background: "transparent",
//     border: "1px solid rgba(255,255,255,0.2)",
//     padding: "12px 24px",
//     borderRadius: "12px",
//     color: "white",
//     marginRight: "15px",
//     cursor: "pointer",
//   },

//   mainBtnBig: {
//     background:
//       "linear-gradient(to right, #38bdf8, #0ea5e9)",
//     border: "none",
//     padding: "16px 38px",
//     borderRadius: "14px",
//     color: "white",
//     fontWeight: "800",
//     fontSize: "16px",
//     cursor: "pointer",
//     boxShadow:
//       "0 10px 40px rgba(56,189,248,0.35)",
//   },

//   secondaryBtn: {
//     background: "rgba(255,255,255,0.05)",
//     border: "1px solid rgba(255,255,255,0.15)",
//     padding: "16px 38px",
//     borderRadius: "14px",
//     color: "white",
//     fontWeight: "700",
//     fontSize: "16px",
//     cursor: "pointer",
//   },

//   scanSection: {
//     minHeight: "100vh",
//     padding: "120px 10%",
//     position: "relative",
//     zIndex: 20,
//     display: "flex",
//     alignItems: "center",
//   },

//   scanContent: {
//     display: "grid",
//     gridTemplateColumns: "1fr 1fr",
//     gap: "60px",
//     alignItems: "center",
//   },

//   scanLeft: {
//     position: "relative",
//   },

//   scanImage: {
//     width: "100%",
//     borderRadius: "24px",
//     border: "1px solid rgba(56,189,248,0.2)",
//   },

//   faceBox: {
//     position: "absolute",
//     top: "20%",
//     left: "35%",
//     width: "120px",
//     height: "120px",
//     border: "3px solid #38bdf8",
//     borderRadius: "12px",
//     boxShadow: "0 0 30px #38bdf8",
//     animation: "pulse 2s infinite",
//   },

//   scanLine: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     width: "100%",
//     height: "4px",
//     background: "#38bdf8",
//     boxShadow: "0 0 20px #38bdf8",
//     animation: "scanMove 3s linear infinite",
//   },

//   aiText: {
//     position: "absolute",
//     bottom: "20px",
//     left: "20px",
//     background: "rgba(0,0,0,0.7)",
//     padding: "12px 20px",
//     borderRadius: "12px",
//     border: "1px solid rgba(56,189,248,0.4)",
//     color: "#38bdf8",
//     fontWeight: "700",
//   },

//   scanRight: {},

//   sectionBigTitle: {
//     fontSize: "64px",
//     fontWeight: "900",
//     marginBottom: "25px",
//   },

//   sectionDescription: {
//     fontSize: "20px",
//     lineHeight: "1.8",
//     color: "#cbd5e1",
//     marginBottom: "30px",
//   },

//   featureList: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "18px",
//     color: "#7dd3fc",
//     fontSize: "18px",
//   },

//   analyticsSection: {
//     minHeight: "100vh",
//     padding: "120px 10%",
//     position: "relative",
//     zIndex: 20,
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//   },

//   analyticsTitle: {
//     fontSize: "72px",
//     marginBottom: "60px",
//     fontWeight: "900",
//   },

//   analyticsGrid: {
//     display: "grid",
//     gridTemplateColumns:
//       "repeat(auto-fit,minmax(240px,1fr))",
//     gap: "30px",
//   },

//   analyticsCard: {
//     background: "rgba(255,255,255,0.05)",
//     padding: "40px",
//     borderRadius: "28px",
//     border: "1px solid rgba(255,255,255,0.08)",
//     backdropFilter: "blur(20px)",
//     boxShadow:
//       "0 0 40px rgba(56,189,248,0.08)",
//   },

//   cyberSection: {
//     minHeight: "100vh",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     textAlign: "center",
//     padding: "100px 10%",
//     position: "relative",
//     zIndex: 20,
//   },

//   cyberTitle: {
//     fontSize: "72px",
//     fontWeight: "900",
//     marginBottom: "30px",
//   },

//   cyberText: {
//     fontSize: "22px",
//     lineHeight: "1.9",
//     maxWidth: "900px",
//     color: "#cbd5e1",
//   },
// };



import { Link } from "react-router-dom";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Stars,
  Sparkles,
  Environment,
  Float,
} from "@react-three/drei";
import { motion } from "framer-motion";
import { useRef } from "react";
import * as THREE from "three";
import "../../index.css";

/* 🔥 AI CORE OBJECT */
function AICore() {
  const coreRef = useRef();
  const ring1 = useRef();
  const ring2 = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    coreRef.current.rotation.y += 0.003;
    coreRef.current.rotation.x += 0.001;

    ring1.current.rotation.x = t * 0.3;
    ring1.current.rotation.y = t * 0.4;

    ring2.current.rotation.y = -t * 0.5;
    ring2.current.rotation.z = t * 0.2;
  });

  return (
    <Float speed={2} rotationIntensity={1}>
      <group position={[0, 0, 0]}>
        {/* 🔥 CENTER CORE */}
        <mesh ref={coreRef}>
          <icosahedronGeometry args={[1.2, 1]} />

          <meshStandardMaterial
            color="#38bdf8"
            emissive="#38bdf8"
            emissiveIntensity={2}
            metalness={1}
            roughness={0.1}
            wireframe
          />
        </mesh>

        {/* 🔥 OUTER RING */}
        <mesh ref={ring1}>
          <torusGeometry args={[2.5, 0.03, 12, 48]} />

          <meshStandardMaterial
            color="#0ea5e9"
            emissive="#0ea5e9"
            emissiveIntensity={3}
          />
        </mesh>

        {/* 🔥 SECOND RING */}
        <mesh
          ref={ring2}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <torusGeometry args={[3.2, 0.02, 12, 48]} />

          <meshStandardMaterial
            color="#14b8a6"
            emissive="#14b8a6"
            emissiveIntensity={2}
          />
        </mesh>

        {/* 🔥 GLOW CENTER */}
        <mesh scale={0.4}>
          <sphereGeometry args={[1, 16, 16]} />

          <meshStandardMaterial
            color="#ffffff"
            emissive="#38bdf8"
            emissiveIntensity={5}
          />
        </mesh>
      </group>
    </Float>
  );
}

/* 🔥 CAMERA SCROLL */
function ScrollCamera() {
  useFrame(({ camera }) => {
    const scrollY = window.scrollY;

    const targetZ = 8 - scrollY * 0.002;
    const targetY = scrollY * 0.001;

    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      targetZ,
      0.05
    );

    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      targetY,
      0.05
    );

    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Home() {
  return (
    <div style={styles.page}>
      {/* 🔥 3D BACKGROUND */}
      <div style={styles.canvasContainer}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 60 }}
          dpr={[1, 1.5]}
        >
          <ambientLight intensity={1} />

          <directionalLight
            position={[5, 5, 5]}
            intensity={3}
            color="#38bdf8"
          />

          <Environment preset="night" />

          {/* 🔥 STARS */}
          <Stars
            radius={100}
            depth={50}
            count={2000}
            factor={4}
            fade
            speed={1}
          />

          {/* 🔥 PARTICLES */}
          <Sparkles
            count={60}
            scale={20}
            size={2}
            speed={0.4}
          />

          {/* 🔥 AI CORE */}
          <AICore />

          <ScrollCamera />
        </Canvas>
      </div>

      {/* 🔥 OVERLAY */}
      <div style={styles.overlay}></div>

      {/* 🔥 NAVBAR */}
      <nav style={styles.navbar}>
        <h2 style={styles.logo}>
          Onscreen
          <span style={{ color: "#38bdf8" }}>
            Monitor
          </span>
        </h2>

        <div>
          <Link to="/login">
            <button style={styles.outlineBtn}>
              Login
            </button>
          </Link>

          <Link to="/register">
            <button style={styles.mainBtn}>
              Register
            </button>
          </Link>
        </div>
      </nav>

      {/* 🔥 HERO SECTION */}
      <section style={styles.hero}>
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div style={styles.badge}>
            ⚡ AI Powered Examination Security
          </div>

          <h1 style={styles.title}>
            Intelligent AI
            <br />
            Examination Monitoring
          </h1>

          <p style={styles.subtitle}>
            Futuristic AI-powered proctoring system
            with live surveillance, face detection,
            eye tracking, behavior analysis,
            and malpractice prevention.
          </p>

          <div style={styles.buttons}>
            <Link to="/login">
              <button style={styles.mainBtnBig}>
                Launch System
              </button>
            </Link>

            <Link to="/register">
              <button style={styles.secondaryBtn}>
                Create Account
              </button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* 🔥 AI DETECTION SECTION */}
      <section style={styles.section}>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false }}
          style={styles.grid}
        >
          <div style={styles.imageBox}>
            <div style={styles.scanLine}></div>

            <div style={styles.faceBox}></div>

            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
              alt=""
              style={styles.image}
            />
          </div>

          <div>
            <h1 style={styles.sectionTitle}>
              AI Face Detection
            </h1>

            <p style={styles.sectionText}>
              Real-time facial recognition with
              intelligent AI monitoring for
              suspicious movement, multiple face
              detection, and examination security.
            </p>

            <div style={styles.featureList}>
              <div>✔ Live Monitoring</div>
              <div>✔ Eye Tracking</div>
              <div>✔ AI Alerts</div>
              <div>✔ Smart Detection</div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 🔥 ANALYTICS */}
      <section style={styles.analytics}>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 style={styles.analyticsTitle}>
            Real-Time Analytics
          </h1>

          <div style={styles.analyticsGrid}>
            <div style={styles.card}>
              <h2>99.9%</h2>
              <p>Detection Accuracy</p>
            </div>

            <div style={styles.card}>
              <h2>24/7</h2>
              <p>Monitoring</p>
            </div>

            <div style={styles.card}>
              <h2>0.2s</h2>
              <p>Alert Response</p>
            </div>

            <div style={styles.card}>
              <h2>AI</h2>
              <p>Behavior Analysis</p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Home;

const styles = {
  page: {
    minHeight: "100vh",
    background: "#000",
    color: "white",
    overflowX: "hidden",
    position: "relative",
  },

  canvasContainer: {
    position: "fixed",
    inset: 0,
    zIndex: 0,
  },

  overlay: {
    position: "fixed",
    inset: 0,
    background:
      "linear-gradient(to bottom, rgba(0,0,0,0.55), rgba(0,0,0,0.9))",
    zIndex: 1,
  },

  navbar: {
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 30,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "25px 60px",
    backdropFilter: "blur(14px)",
  },

  logo: {
    fontSize: "28px",
    fontWeight: "900",
  },

  hero: {
    minHeight: "100vh",
    position: "relative",
    zIndex: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "20px",
  },

  badge: {
    display: "inline-block",
    padding: "10px 20px",
    borderRadius: "999px",
    background: "rgba(56,189,248,0.1)",
    border: "1px solid rgba(56,189,248,0.4)",
    color: "#7dd3fc",
    marginBottom: "25px",
  },

  title: {
    fontSize: "80px",
    fontWeight: "900",
    lineHeight: "1.1",
    marginBottom: "25px",
  },

  subtitle: {
    fontSize: "20px",
    color: "#cbd5e1",
    lineHeight: "1.8",
    maxWidth: "850px",
    margin: "0 auto 40px",
  },

  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },

  mainBtn: {
    background: "#38bdf8",
    border: "none",
    padding: "12px 24px",
    borderRadius: "12px",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
  },

  outlineBtn: {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.2)",
    padding: "12px 24px",
    borderRadius: "12px",
    color: "white",
    marginRight: "15px",
    cursor: "pointer",
  },

  mainBtnBig: {
    background:
      "linear-gradient(to right, #38bdf8, #0ea5e9)",
    border: "none",
    padding: "16px 38px",
    borderRadius: "14px",
    color: "white",
    fontWeight: "800",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow:
      "0 10px 40px rgba(56,189,248,0.35)",
  },

  secondaryBtn: {
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.15)",
    padding: "16px 38px",
    borderRadius: "14px",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
  },

  section: {
    minHeight: "100vh",
    position: "relative",
    zIndex: 20,
    padding: "120px 10%",
    display: "flex",
    alignItems: "center",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "60px",
    alignItems: "center",
  },

  imageBox: {
    position: "relative",
  },

  image: {
    width: "100%",
    borderRadius: "24px",
  },

  faceBox: {
    position: "absolute",
    top: "20%",
    left: "35%",
    width: "120px",
    height: "120px",
    border: "3px solid #38bdf8",
    borderRadius: "12px",
    boxShadow: "0 0 30px #38bdf8",
    animation: "pulse 2s infinite",
  },

  scanLine: {
    position: "absolute",
    width: "100%",
    height: "4px",
    background: "#38bdf8",
    boxShadow: "0 0 20px #38bdf8",
    animation: "scanMove 3s linear infinite",
  },

  sectionTitle: {
    fontSize: "64px",
    fontWeight: "900",
    marginBottom: "25px",
  },

  sectionText: {
    fontSize: "20px",
    lineHeight: "1.8",
    color: "#cbd5e1",
    marginBottom: "30px",
  },

  featureList: {
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    color: "#7dd3fc",
    fontSize: "18px",
  },

  analytics: {
    minHeight: "100vh",
    position: "relative",
    zIndex: 20,
    padding: "120px 10%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },

  analyticsTitle: {
    fontSize: "72px",
    fontWeight: "900",
    marginBottom: "60px",
  },

  analyticsGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(240px,1fr))",
    gap: "30px",
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    padding: "40px",
    borderRadius: "28px",
    border: "1px solid rgba(255,255,255,0.08)",
    backdropFilter: "blur(20px)",
    boxShadow:
      "0 0 40px rgba(56,189,248,0.08)",
  },
};