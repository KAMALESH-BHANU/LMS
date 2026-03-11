// // src/pages/student/StudentDashboard.jsx

// import React from "react";

// const StudentDashboard = () => {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-8">
//         Student Dashboard
//       </h1>

//       {/* Stat Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//         <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
//           <p className="text-gray-300">Books Issued</p>
//           <h2 className="text-3xl font-bold mt-2 text-blue-400">3</h2>
//         </div>

//         <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
//           <p className="text-gray-300">Pending Returns</p>
//           <h2 className="text-3xl font-bold mt-2 text-red-400">1</h2>
//         </div>

//         <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
//           <p className="text-gray-300">Fine Amount</p>
//           <h2 className="text-3xl font-bold mt-2 text-yellow-400">₹120</h2>
//         </div>

//       </div>

//       {/* Extra Section */}
//       <div className="mt-10 bg-white rounded-xl shadow-md p-6">
//         <h2 className="text-xl font-semibold mb-4">
//           Quick Info
//         </h2>

//         <ul className="space-y-2 text-gray-600">
//           <li>• Membership: Basic</li>
//           <li>• Borrow Limit: 2 Books</li>
//           <li>• Books Remaining: 1</li>
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default StudentDashboard;

// src/pages/student/StudentDashboard.jsx

import React, { useEffect, useState } from "react";
import API from "../../services/api";

const StudentDashboard = () => {
  const [studentName, setStudentName] = useState("");
  const [booksIssued, setBooksIssued] = useState(0);
  const [pendingReturns, setPendingReturns] = useState(0);
  const [fineAmount, setFineAmount] = useState(0);

  const [membershipPlan, setMembershipPlan] = useState("");
  const [borrowLimit, setBorrowLimit] = useState(0);
  const [remainingBooks, setRemainingBooks] = useState(0);

  useEffect(() => {
    loadStudentData();
  }, []);

  const loadStudentData = async () => {
    try {
      /* -------- Get memberId from localStorage -------- */

      const memberId = localStorage.getItem("memberId");

      if (!memberId) return;

      /* -------- Fetch member info -------- */

      const memberRes = await API.get(`/api/members/${memberId}`);
      const member = memberRes.data;

      setStudentName(`${member.user.firstName} ${member.user.lastName}`);
      console.log("Member API response:", member);

      const plan = member.plan?.name || "Basic";
      const limit = member.plan?.borrowLimit || 2;

      setMembershipPlan(plan);
      setBorrowLimit(limit);

      /* -------- Fetch issued books -------- */

      const res = await API.get("/api/issues", {
        params: { memberId },
      });

      const issues = res.data || [];

      const issued = issues.filter((i) => i.status === "ISSUED");
      const returned = issues.filter((i) => i.status === "RETURNED");

      setBooksIssued(issues.length);
      setPendingReturns(issued.length);

      setRemainingBooks(limit - issued.length);

      /* -------- Calculate total fine -------- */

      let totalFine = 0;

      issues.forEach((issue) => {
        if (issue.penalty) {
          totalFine += issue.penalty;
        }
      });

      setFineAmount(totalFine);
    } catch (error) {
      console.error("Dashboard load error:", error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Student Dashboard</h1>

      {/* Welcome */}

      <h1 className="text-3xl font-bold mb-8">Welcome {studentName} 👋</h1>

      {/* Stat Cards */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
          <p className="text-gray-300">Books Issued</p>
          <h2 className="text-3xl font-bold mt-2 text-blue-400">
            {booksIssued}
          </h2>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
          <p className="text-gray-300">Pending Returns</p>
          <h2 className="text-3xl font-bold mt-2 text-red-400">
            {pendingReturns}
          </h2>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg hover:scale-105 transition">
          <p className="text-gray-300">Fine Amount</p>
          <h2 className="text-3xl font-bold mt-2 text-yellow-400">
            ₹{fineAmount}
          </h2>
        </div>
      </div>

      {/* Extra Section */}

      <div className="mt-10 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Quick Info</h2>

        <ul className="space-y-2 text-gray-600">
          <li>• Membership: {membershipPlan}</li>

          <li>• Borrow Limit: {borrowLimit} Books</li>

          <li>• Books Remaining: {remainingBooks}</li>
        </ul>
      </div>
    </div>
  );
};

export default StudentDashboard;
