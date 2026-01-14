import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


function AdminPanel() {

  const token = localStorage.getItem("token");
  const role = token ? jwtDecode(token).role : null;

  if(!["ADMIN", "SUPER_ADMIN"].includes(role)) return null;
  
  const isSuperAdmin = role === "SUPER_ADMIN";

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      <p>Manage the system from here</p>

      <ul style={{ marginTop: "20px" }}>
        <li>
          <Link to="/courses">Manage Courses</Link>
        </li>
        <li>
          <Link to="/admin/slots">Manage Time Slots</Link>
        </li>
        <li>
          <Link to="/bookings">View All Bookings</Link>
        </li>
        <li>
          <Link to="/admin/change-password">Change Password</Link>
        </li>

        {isSuperAdmin && (

        <li>
          <Link to="/admin/manage-admins">Manage Admins</Link>
        </li>
        )}
      </ul>
      
    </div>
  );
}

export default AdminPanel;
