


// import { BrowserRouter, Routes, Route } from "react-router-dom";

// import Home from "./components/pages/Home";
// import Login from "./components/pages/Login";
// import Register from "./components/pages/Register";
// import VerifyOTP from "./components/pages/VerifyOTP";

// import Dashboard from "./components/dashboard/Dashboard";
// import AdminDashboard from "./components/admin-dashboard/AdminDashboard";

// import ProtectedRoute from "./components/ProtectedRoute";
// import ForgotPassword from "./components/pages/ForgotPassword";

// import ResetPassword from "./components/pages/ResetPassword";

// function App() {

//   return (

//     <BrowserRouter>

//       <Routes>

//         <Route path="/" element={<Home />} />

//         <Route path="/login" element={<Login />} />

//         <Route path="/register" element={<Register />} />

//         <Route path="/verify" element={<VerifyOTP />} />

//          <Route path="/forgot-password"element={<ForgotPassword />}/>

//          <Route path="/reset-password"element={<ResetPassword />}/>

//         <Route
//           path="/dashboard"
//           element={
//             <ProtectedRoute>
//               <Dashboard />
//             </ProtectedRoute>
//           }
//         />

//         <Route
//           path="/admin-dashboard"
//           element={
//             <ProtectedRoute>
//               <AdminDashboard />
//             </ProtectedRoute>
//           }
//         />

//       </Routes>

//     </BrowserRouter>
//   );
// }

// export default App;



import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import VerifyOTP from "./components/pages/VerifyOTP";

import Dashboard from "./components/dashboard/Dashboard";
import ExamPage from "./components/dashboard/ExamPage";
import TermsAndConditions from "./components/dashboard/TermsAndConditions";
import ExamForm from "./components/admin-dashboard/ExamForm";
import ManageExam from "./components/admin-dashboard/ManageExam";


import AdminDashboard from "./components/admin-dashboard/AdminDashboard";

import ProtectedRoute from "./components/ProtectedRoute";

import ForgotPassword from "./components/pages/ForgotPassword";

import ResetPassword from "./components/pages/ResetPassword";

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* PUBLIC ROUTES */}

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/verify"
          element={<VerifyOTP />}
        />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password"
          element={<ResetPassword />}
        />


        <Route
          path="admin/manage-exam"
          element={<ManageExam />}
        />
      <Route path="/admin/create-exam" element={<ExamForm />} />

      <Route path="/exam-terms/:id" element={<TermsAndConditions />} />
      <Route path="/start-exam/:id" element={<ExamPage />} />
      

        {/* STUDENT ROUTE */}

        <Route
          path="/dashboard"
          element={

            <ProtectedRoute
              studentOnly={true}
            >

              <Dashboard />

            </ProtectedRoute>
          }
        />


        {/* ADMIN ROUTE */}

        <Route
          path="/admin-dashboard"
          element={

            <ProtectedRoute
              adminOnly={true}
            >

              <AdminDashboard />

            </ProtectedRoute>
          }
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;