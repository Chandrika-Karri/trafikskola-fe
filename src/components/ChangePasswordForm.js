import { useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance";

function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [canSubmit, setCanSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Password rules
  const [rules, setRules] = useState({
    length: false,
    uppercase: false,
    number: false,
    specialChar: false,
    match: false,
  });

  // Validate password on change
  useEffect(() => {
    const length = newPassword.length >= 8;
    const uppercase = /[A-Z]/.test(newPassword);
    const number = /[0-9]/.test(newPassword);
    const specialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);
    const match = newPassword === confirmPassword;

    setRules({ length, uppercase, number, specialChar, match });

    setCanSubmit(
      length &&
      uppercase &&
      number &&
      specialChar &&
      match &&
      oldPassword.length > 0
    );

    // Clear error when user edits input
    setError("");
  }, [oldPassword, newPassword, confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!canSubmit) {
    alert(
      "Password must be at least 8 characters and include an uppercase letter, a number, and a special character."
    );
    return;
  }

    try {
      await axiosInstance.post("/auth/change-password", {
        oldPassword,
        newPassword,
        confirmPassword,
      });

      setMessage("Password changed successfully");
      setError("");
      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(err.response?.data || "Failed to change password");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "400px" }}>
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Old password */}
      <div style={{ marginBottom: "10px" }}>
        <label>Old Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          required
        />
      </div>

      {/* New password */}
      <div style={{ marginBottom: "10px" }}>
        <label>New Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
      </div>

      {/* Confirm password */}
      <div style={{ marginBottom: "10px" }}>
        <label>Confirm New Password</label>
        <input
          type={showPassword ? "text" : "password"}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </div>

      {/* Password mismatch warning */}
      {confirmPassword && !rules.match && (
        <p style={{ color: "red", fontSize: "13px" }}>
          Passwords do not match
        </p>
      )}

      {/* Show password toggle */}
      <div style={{ marginBottom: "10px" }}>
        <input
          type="checkbox"
          checked={showPassword}
          onChange={() => setShowPassword(!showPassword)}
        />{" "}
        Show Password
      </div>

      {/* Simple validation hint */}
      <p style={{ fontSize: "13px", color: "#666" }}>
        Password must be at least 8 characters and include an uppercase letter,
        a number, and a special character.
      </p>

      <button type="submit">
        Change Password
      </button>
    </form>
  );
}

export default ChangePasswordForm;
