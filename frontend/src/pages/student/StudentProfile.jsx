import React from "react";

const StudentProfile = () => {
  // Static data (later you can fetch from backend)
  const student = {
    name: "Kamalesh Bhanu D K",
    email: "kamaleshbhanudk2006@gmail.com",
    studentId: "STU1023",
    department: "Computer Science",
    membership: "Basic",
    borrowedBooks: 1,
    borrowLimit: 2,
    totalBorrowed: 12,
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-8">Student Profile</h2>

      {/* Profile Card */}
      <div className="bg-slate-900 text-white rounded-xl p-6 shadow-lg mb-8">
        <div className="flex items-center space-x-6">
          <div className="w-20 h-20 rounded-full bg-blue-500 flex items-center justify-center text-3xl font-bold">
            {student.name.charAt(0)}
          </div>

          <div>
            <h3 className="text-2xl font-semibold">{student.name}</h3>
            <p className="text-gray-300">{student.email}</p>
            <span className="mt-2 inline-block bg-green-500 text-white px-3 py-1 rounded-full text-sm">
              {student.membership} Membership
            </span>
          </div>
        </div>
      </div>

      {/* Borrow Statistics */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border">
          <h4 className="text-gray-500">Currently Borrowed</h4>
          <p className="text-3xl font-bold text-blue-600 mt-2">
            {student.borrowedBooks}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border">
          <h4 className="text-gray-500">Borrow Limit</h4>
          <p className="text-3xl font-bold text-green-600 mt-2">
            {student.borrowLimit}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border">
          <h4 className="text-gray-500">Total Books Borrowed</h4>
          <p className="text-3xl font-bold text-purple-600 mt-2">
            {student.totalBorrowed}
          </p>
        </div>
      </div>

      {/* Account Details */}
      <div className="bg-white rounded-xl shadow-md p-6 border mb-8">
        <h3 className="text-xl font-semibold mb-4">Account Information</h3>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-gray-500">Student ID</p>
            <p className="font-medium">{student.studentId}</p>
          </div>

          <div>
            <p className="text-gray-500">Department</p>
            <p className="font-medium">{student.department}</p>
          </div>

          <div>
            <p className="text-gray-500">Email</p>
            <p className="font-medium">{student.email}</p>
          </div>

          <div>
            <p className="text-gray-500">Membership Type</p>
            <p className="font-medium">{student.membership}</p>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <div className="bg-white rounded-xl shadow-md p-6 border">
        <h3 className="text-xl font-semibold mb-4">Security Settings</h3>

        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Change Password
          </button>

          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;