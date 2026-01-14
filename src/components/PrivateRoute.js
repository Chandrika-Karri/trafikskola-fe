import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  const userRole = jwtDecode(token).role;

  // ADMIN routes allow ADMIN + SUPER_ADMIN
  if (role === "ADMIN" && !["ADMIN", "SUPER_ADMIN"].includes(userRole)) {
    return <Navigate to="/" />;
  }

  // SUPER_ADMIN routes allow only SUPER_ADMIN
  if (role === "SUPER_ADMIN" && userRole !== "SUPER_ADMIN") {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
