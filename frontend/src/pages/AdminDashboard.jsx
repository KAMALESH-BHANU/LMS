// import React, { useState } from "react";
// import AdminNavbar from "../components/AdminNavbar";
// import API from "../services/api";
// import {
//   Chart as ChartJS,
//   BarElement,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// } from "chart.js";
// import { Bar, Pie } from "react-chartjs-2";

// ChartJS.register(
//   BarElement,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend
// );

// function AdminDashboard() {

// //   //=========================

// //    // Dummy KPI Data //
// //   //  ========================= 
// //   const stats = 
// //   { totalMembers: 120, 
// //     totalBooks: 850, 
// //     issuedBooks: 230, 
// //     pendingApprovals: 4, 
// //     overdueBooks: 18 
// //   };

// // const [stats, setStats] = useState({
// //   totalMembers: 0,
// //   totalBooks: 0,
// //   issuedBooks: 0,
// //   pendingApprovals: 0,
// //   overdueBooks: 0
// // });

// //const [requests, setRequests] = useState([]);


//   // =========================
//   // Dummy Chart Data
//   // =========================
//   // const barData = {
//   //   labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
//   //   datasets: [
//   //     {
//   //       label: "Books Issued",
//   //       data: [40, 65, 55, 80, 70, 90],
//   //       backgroundColor: "#3498db"
//   //     }
//   //   ]
//   // };

//   // const pieData = {
//   //   labels: ["Fiction", "Science", "Technology", "History", "Others"],
//   //   datasets: [
//   //     {
//   //       data: [300, 150, 200, 100, 100],
//   //       backgroundColor: [
//   //         "#FF6384",
//   //         "#36A2EB",
//   //         "#FFCE56",
//   //         "#4CAF50",
//   //         "#9C27B0"
//   //       ]
//   //     }
//   //   ]
//   // };

//   // =========================
//   // Dummy Admin Approval Requests
//   // =========================
//   const [requests, setRequests] = useState([
//     { id: 1, member: "Rahul Sharma", type: "New Member Registration", status: "Pending" },
//     { id: 2, member: "Priya Verma", type: "Book Issue Request", status: "Pending" },
//     { id: 3, member: "Amit Kumar", type: "Membership Renewal", status: "Pending" },
//     { id: 4, member: "Sneha Reddy", type: "Book Reservation", status: "Pending" }
//   ]);

//   const handleAction = (id, action) => {
//     setRequests(prev =>
//       prev.map(req =>
//         req.id === id ? { ...req, status: action } : req
//       )
//     );
//   };

//   return (
//      <div>   <AdminNavbar />
//     <div style={{ padding: "30px", background: "#f4f6f9", minHeight: "100vh" }}>
//       <h2 style={{ marginBottom: "30px" }}>Library Admin Dashboard</h2>

//       {/* KPI CARDS */}
//       {/* <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
//         <Card title="Total Members" value={stats.totalMembers} gradient="linear-gradient(45deg,#3498db,#6dd5fa)" />
//         <Card title="Total Books" value={stats.totalBooks} gradient="linear-gradient(45deg,#2ecc71,#a8e063)" />
//         <Card title="Issued Books" value={stats.issuedBooks} gradient="linear-gradient(45deg,#f39c12,#f7b733)" />
//         <Card title="Pending Approvals" value={stats.pendingApprovals} gradient="linear-gradient(45deg,#e74c3c,#ff6a6a)" />
//         <Card title="Overdue Books" value={stats.overdueBooks} gradient="linear-gradient(45deg,#9b59b6,#c471ed)" />
//       </div> */}

//       CHART SECTION
//       <div style={{ display: "flex", marginTop: "40px", gap: "40px", flexWrap: "wrap" }}>
//         <div style={chartContainerStyle}>
//           <h4>Monthly Book Issue Trend</h4>
//           <Bar data={barData} />
//         </div>

//         <div style={chartContainerStyle}>
//           <h4>Book Category Distribution</h4>
//           <Pie data={pieData} />
//         </div>
//       </div>

//       {/* ADMIN APPROVAL TABLE */}
//       <div style={{ marginTop: "50px", background: "#fff", padding: "20px", borderRadius: "12px", boxShadow: "0 3px 15px rgba(0,0,0,0.08)" }}>
//         <h3>Admin Approval Requests</h3>
//         <table style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
//           <thead>
//             <tr style={{ background: "#f1f1f1" }}>
//               <th style={thStyle}>Member</th>
//               <th style={thStyle}>Request Type</th>
//               <th style={thStyle}>Status</th>
//               <th style={thStyle}>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests.map(req => (
//               <tr key={req.id}>
//                 <td style={tdStyle}>{req.member}</td>
//                 <td style={tdStyle}>{req.type}</td>
//                 <td style={tdStyle}>
//                   <span style={{
//                     padding: "6px 12px",
//                     borderRadius: "20px",
//                     background:
//                       req.status === "Pending" ? "#f39c12" :
//                       req.status === "Approved" ? "#2ecc71" :
//                       "#e74c3c",
//                     color: "#fff"
//                   }}>
//                     {req.status}
//                   </span>
//                 </td>
//                 <td style={tdStyle}>
//                   {req.status === "Pending" && (
//                     <>
//                       <button style={approveBtn} onClick={() => handleAction(req.id, "Approved")}>Approve</button>
//                       <button style={rejectBtn} onClick={() => handleAction(req.id, "Rejected")}>Reject</button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>  
//     </div>
     
//   );


// }

// export default AdminDashboard;


import { useEffect, useState } from "react";
import AdminNavbar from "../components/AdminNavbar";
import API from "../services/api";

function AdminDashboard() {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingUsers();
  }, []);

  const fetchPendingUsers = async () => {
    try {
      const response = await API.get("/api/admin/pending-users");
      setRequests(response.data);
    } catch (error) {
      console.error("Failed to fetch pending users", error);
    } finally {
      setLoading(false);
    }
  };

  const approveUser = async (id) => {
    try {
      await API.put(`/api/admin/approve/${id}`);
      fetchPendingUsers(); // refresh table
    } catch (error) {
      console.error("Approval failed", error);
    }
  };

  const rejectUser = async (id) => {
    try {
      await API.put(`/api/admin/reject/${id}`);
      fetchPendingUsers();
    } catch (error) {
      console.error("Rejection failed", error);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <h2 className="text-2xl font-semibold mb-6">
          Admin Approval Requests
        </h2>

        <div className="bg-white rounded-xl shadow-md p-6">
          {loading ? (
            <p>Loading...</p>
          ) : requests.length === 0 ? (
            <p className="text-gray-500">No pending approvals.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {requests.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="p-3">{user.name}</td>
                      <td className="p-3">{user.email}</td>
                      <td className="p-3">
                        <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-sm">
                          {user.status}
                        </span>
                      </td>
                      <td className="p-3 space-x-2">
                        <button
                          onClick={() => approveUser(user.id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Approve
                        </button>

                        <button
                          onClick={() => rejectUser(user.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Reject
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
