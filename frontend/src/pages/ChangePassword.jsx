import React, { useState } from "react";
import axios from "axios";

function ChangePassword() {

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.newPassword !== form.confirmPassword) {
      setMessage("New passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:8080/api/users/change-password",
        form
      );
      setMessage(res.data);
    } catch (err) {
      setMessage(err.response?.data || "Error updating password");
    }
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2>Change Password</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={form.oldPassword}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            style={inputStyle}
          />

          <button type="submit" style={buttonStyle}>
            Update Password
          </button>
        </form>

        {message && <p style={{ marginTop: "15px" }}>{message}</p>}
      </div>
    </div>
  );
}

// Styles
const containerStyle = {
  height: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "#f4f6f9"
};

const cardStyle = {
  background: "#fff",
  padding: "40px",
  borderRadius: "12px",
  width: "350px",
  boxShadow: "0 4px 20px rgba(0,0,0,0.1)"
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "15px",
  borderRadius: "6px",
  border: "1px solid #ccc"
};

const buttonStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "20px",
  borderRadius: "6px",
  border: "none",
  background: "#3498db",
  color: "#fff",
  cursor: "pointer"
};

export default ChangePassword;
