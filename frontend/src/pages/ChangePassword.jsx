import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../services/api";

function ChangePassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (form.newPassword !== form.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    try {
    const res = await API.put("/api/auth/change-password", 
        {
          oldPassword: form.oldPassword,
          newPassword: form.newPassword,
        }
      );
      
      setMessage(res.data);

      // ✅ Mark first login completed
      localStorage.setItem("firstLogin", "false");

      const role = localStorage.getItem("role");

      // ✅ Redirect after 1.5 seconds
      setTimeout(() => {
        if (role === "STUDENT") {
          navigate("/student/dashboard");
        } else if (role === "LIBRARIAN") {
          navigate("/librarian/dashboard");
        } else if (role === "ADMIN") {
          navigate("/admin/dashboard");
        }
      }, 1500);

    } catch (err) {
      console.log(err);
      setError(err.response?.data || "Error updating password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e6f0fa]">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

        <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">
          Change Password
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            value={form.oldPassword}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            value={form.newPassword}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm New Password"
            value={form.confirmPassword}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-300 font-semibold"
          >
            Update Password
          </button>
        </form>

        {error && (
          <p className="text-red-600 text-sm mt-4 text-center">{error}</p>
        )}

        {message && (
          <p className="text-green-600 text-sm mt-4 text-center">{message}</p>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;