import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  adminOnly = false,
  studentOnly = false,
}) {

  const token = localStorage.getItem("access");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // =========================
  // NOT LOGGED IN
  // =========================
  if (!token) {

    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  // =========================
  // ADMIN ONLY
  // =========================
  if (
    adminOnly &&
    !user?.is_admin
  ) {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }

  // =========================
  // STUDENT ONLY
  // =========================
  if (
    studentOnly &&
    user?.is_admin
  ) {

    return (
      <Navigate
        to="/admin-dashboard"
        replace
      />
    );
  }

  return children;
}

export default ProtectedRoute;