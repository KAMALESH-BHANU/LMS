import React, { useEffect, useState } from "react";
import API from "../../services/api";

const StudentProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    role: "",
  });

  const [stats, setStats] = useState({
    activeBooks: 0,
    borrowLimit: 0,
    totalBorrowed: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    fetchStats();
  }, []);

  // ✅ PROFILE
  const fetchProfile = async () => {
    try {
      const res = await API.get("/profile");

      setProfile({
        name: res.data.name,
        email: res.data.email,
        role: res.data.role,
      });
    } catch (err) {
      console.error(err);
      alert("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  // ✅ STATS (ACTIVE + OVERDUE ONLY)
  const fetchStats = async () => {
    try {
      const res = await API.get("/student/stats");

      setStats({
        activeBooks: res.data.borrowedBooks, // now correctly filtered
        // borrowLimit: res.data.borrowLimit,
        borrowLimit: 2,
        totalBorrowed: res.data.totalBorrowed,
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8">Student Profile</h2>

      {/* PROFILE CARD */}
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-lg mb-8">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-3xl font-bold">
            {profile.name?.charAt(0)}
          </div>

          <div>
            <h3 className="text-2xl font-semibold">{profile.name}</h3>
            <p className="text-gray-300">{profile.email}</p>

            <span className="mt-2 inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm capitalize">
              {profile.role}
            </span>
          </div>
        </div>
      </div>

      {/* BORROW STATS */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border">
          <h4 className="text-gray-500">Active / Overdue Books</h4>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {stats.activeBooks}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border">
          <h4 className="text-gray-500">Borrow Limit</h4>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {stats.borrowLimit}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border">
          <h4 className="text-gray-500">Total Books Borrowed</h4>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {stats.totalBorrowed}
          </p>
        </div>
      </div>

      {/* ACCOUNT INFO */}
      <div className="bg-white rounded-xl shadow-md p-6 border mb-8">
        <h3 className="text-xl font-semibold mb-4">Account Information</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500">Full Name</p>
            <p className="font-medium">{profile.name}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{profile.email}</p>
          </div>

          <div>
            <p className="text-gray-500">Role</p>
            <p className="font-medium capitalize">{profile.role}</p>
          </div>
        </div>
      </div>

      {/* SECURITY */}
      <div className="bg-white rounded-xl shadow-md p-6 border">
        <h3 className="text-xl font-semibold mb-4">Security Settings</h3>

        <div className="flex flex-col md:flex-row gap-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
            Change Password
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;