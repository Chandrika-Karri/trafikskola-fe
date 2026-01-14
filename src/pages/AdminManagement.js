import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

function AdminManagement() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [editingAdminId, setEditingAdminId] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Load admins
  const fetchAdmins = async () => {
    try {
      const res = await axiosInstance.get("/admins");
      setAdmins(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data || "Failed to load admins");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create or Update admin
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      if (editingAdminId) {
        // Build update payload (avoid empty password)
        const payload = {
          name: formData.name,
          email: formData.email,
        };

        if (formData.password) {
          payload.password = formData.password;
        }

        await axiosInstance.put(`/admins/${editingAdminId}`, payload);
        setMessage("Admin updated successfully");
      } else {
        await axiosInstance.post("/admins", formData);
        setMessage("Admin created successfully");
      }

      setFormData({ name: "", email: "", password: "" });
      setEditingAdminId(null);
      fetchAdmins();
    } catch (err) {
      setError(err.response?.data || "Action failed");
    }
  };

  // Edit admin
  const handleEdit = (admin) => {
    setFormData({
      name: admin.name,
      email: admin.email,
      password: "",
    });
    setEditingAdminId(admin.id);
  };

  // Delete admin
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;
    try {
      await axiosInstance.delete(`/admins/${id}`);
      fetchAdmins();
    } catch (err) {
      setError(err.response?.data || "Delete failed");
    }
  };

  return (
    <div className="container">
      <h2>Admin Management (Super Admin)</h2>

      {loading && <p>Loading admins...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {/* Admin List */}
      {!loading && !error && (
        <table border="1" cellPadding="8" style={{ marginBottom: "20px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>
                  <button onClick={() => handleEdit(admin)}>Edit</button>{" "}
                  <button onClick={() => handleDelete(admin.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Form */}
      <h3>{editingAdminId ? "Edit Admin" : "Create Admin"}</h3>

      <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
        <div>
          <label>Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>
            {editingAdminId ? "New Password (optional)" : "Password"}
          </label>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            required={!editingAdminId}
          />
        </div>

        <div style={{ margin: "10px 0" }}>
          <input
            type="checkbox"
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />{" "}
          Show Password
        </div>

        <button type="submit">
          {editingAdminId ? "Update Admin" : "Create Admin"}
        </button>
      </form>
    </div>
  );
}

export default AdminManagement;
