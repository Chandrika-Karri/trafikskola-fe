import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function PrivateRoute({ children, role }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

  const userRole = jwtDecode(token).role;

  if (role && userRole !== role) return <Navigate to="/" />;

  return children;
}

export default PrivateRoute;
