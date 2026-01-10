import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  let userRole = null;

  if (token) {
    try {
      userRole = jwtDecode(token).role;
    } catch (err) {
      console.error("Invalid token", err);
      localStorage.removeItem("token");
    }
  }

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
      <Link to="/courses" style={{ marginRight: "10px" }}>Courses</Link>

      {!token && (
        <>
          <Link to="/login" style={{ marginRight: "10px" }}>Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {token && (
        <>
          {userRole === "STUDENT" && (
            <Link to="/my-bookings" style={{ marginRight: "10px" }}>
              My Bookings
            </Link>
          )}

          {userRole === "ADMIN" && (
            <>
              <Link to="/admin" style={{ marginRight: "10px" }}>Admin Panel</Link>
              <Link to="/bookings" style={{ marginRight: "10px" }}>All Bookings</Link>
              <Link to="/admin/slots" style={{ marginRight: "10px" }}>Manage Slots</Link>
            </>
          )}

    


          <button onClick={logout} style={{ marginLeft: "15px" }}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}

export default Navbar;
