import { Link } from "react-router-dom";

function AdminPanel() {
  return (
    <div style={{ padding: "20px" }}>
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
      </ul>
    </div>
  );
}

export default AdminPanel;
