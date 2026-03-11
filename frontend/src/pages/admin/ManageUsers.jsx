// import React, { useEffect, useState } from "react";
// import API from "../../services/api";

// const ManageUsers = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchPendingUsers();
//   }, []);

//   const fetchPendingUsers = async () => {
//     try {
//       const response = await API.get("/api/admin/pending-users");
//       setRequests(response.data);
//     } catch (error) {
//       console.error("Failed to fetch pending users", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const approveUser = async (id) => {
//     try {
//       await API.put(`/api/admin/approve/${id}`);
//       fetchPendingUsers();
//     } catch (error) {
//       console.error("Approval failed", error);
//     }
//   };

//   const rejectUser = async (id) => {
//     try {
//       await API.delete(`/api/admin/reject/${id}`);
//       fetchPendingUsers();
//     } catch (error) {
//       console.error("Rejection failed", error);
//     }
//   };

//   // ✅ SECURE DOCUMENT DOWNLOAD
//   const viewDocument = async (userId) => {
//   try {
//     const response = await API.get(
//       `/api/admin/document/${userId}`,
//       { responseType: "blob" }
//     );

//     const blob = new Blob([response.data], {
//       type: response.headers["content-type"]
//     });

//     const fileURL = URL.createObjectURL(blob);
//     window.open(fileURL, "_blank");

//   } catch (error) {
//     console.error("Failed to load document", error);
//   }
// };

//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-8">Pending User Approvals</h1>

//       <div className="bg-white rounded-xl shadow-md p-6">
//         {loading ? (
//           <p className="text-gray-500">Loading...</p>
//         ) : requests.length === 0 ? (
//           <p className="text-gray-500">No pending approvals.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-gray-100 text-left text-sm uppercase text-gray-600">
//                   <th className="p-3">Name</th>
//                   <th className="p-3">Email</th>
//                   <th className="p-3">DOB</th>
//                   <th className="p-3">Role</th>
//                   <th className="p-3">Document</th>
//                   <th className="p-3">Status</th>
//                   <th className="p-3 text-center">Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {requests.map((user) => (
//                   <tr key={user.id} className="border-b hover:bg-gray-50">
//                     <td className="p-3">
//                       {user.firstName} {user.lastName}
//                     </td>

//                     <td className="p-3">{user.email}</td>

//                     <td className="p-3">
//                       {user.dob
//                         ? new Date(user.dob).toLocaleDateString()
//                         : "N/A"}
//                     </td>

//                     <td className="p-3">{user.role}</td>

//                     {/* ✅ UPDATED DOCUMENT BUTTON */}
//                     <td className="p-3">
//                       {user.documentPath ? (
//                         <button
//                           onClick={() => viewDocument(user.id)}
//                           className="text-blue-600 underline"
//                         >
//                           View
//                         </button>
//                       ) : (
//                         "N/A"
//                       )}
//                     </td>

//                     <td className="p-3">
//                       <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs">
//                         {user.status}
//                       </span>
//                     </td>

//                     <td className="p-3 text-center space-x-2">
//                       <button
//                         onClick={() => approveUser(user.id)}
//                         className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md text-sm transition"
//                       >
//                         ✅
//                       </button>

//                       <button
//                         onClick={() => rejectUser(user.id)}
//                         className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm transition"
//                       >
//                         ❌
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ManageUsers;

import React, { useEffect, useState } from "react";
import API from "../../services/api";

import {
  FaUserCheck,
  FaUserTimes,
  FaFileAlt,
  FaSearch,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

const ManageUsers = () => {

  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const size = 5;

  useEffect(() => {
    fetchPendingUsers();
  }, [page]);

  const fetchPendingUsers = async () => {

    try {

      setLoading(true);

      const response = await API.get(
        `/api/admin/pending-users?page=${page}&size=${size}`
      );

      setRequests(response.data.content);
      setTotalPages(response.data.totalPages);

    } catch (error) {

      console.error("Failed to fetch pending users", error);

    } finally {

      setLoading(false);

    }

  };

  const approveUser = async (id) => {

    try {

      await API.put(`/api/admin/approve/${id}`);
      fetchPendingUsers();

    } catch (error) {

      console.error("Approval failed", error);

    }

  };

  const rejectUser = async (id) => {

    try {

      await API.delete(`/api/admin/reject/${id}`);
      fetchPendingUsers();

    } catch (error) {

      console.error("Rejection failed", error);

    }

  };

  const viewDocument = async (userId) => {

    try {

      const response = await API.get(
        `/api/admin/document/${userId}`,
        { responseType: "blob" }
      );

      const blob = new Blob([response.data], {
        type: response.headers["content-type"]
      });

      const fileURL = URL.createObjectURL(blob);
      window.open(fileURL, "_blank");

    } catch (error) {

      console.error("Failed to load document", error);

    }

  };

  const filteredUsers = requests.filter((user) =>
    `${user.firstName} ${user.lastName} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="p-8 bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <h1 className="text-3xl font-bold text-slate-800">
          Pending User Approvals
        </h1>

        <span className="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm shadow">
          {requests.length} Pending
        </span>

      </div>

      {/* SEARCH */}

      <div className="relative mb-6 w-72">

        <FaSearch className="absolute left-3 top-3 text-gray-400" />

        <input
          placeholder="Search users..."
          className="pl-10 p-3 border rounded-lg w-full shadow-sm focus:ring-2 focus:ring-indigo-400"
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* CARD */}

      <div className="bg-white rounded-xl shadow-lg p-6">

        {loading ? (

          <div className="animate-pulse space-y-4">

            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}

          </div>

        ) : filteredUsers.length === 0 ? (

          <p className="text-gray-500 text-center">
            No pending approvals
          </p>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>

                <tr className="bg-slate-100 text-sm uppercase text-slate-600">

                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3">DOB</th>
                  <th className="p-3">Role</th>
                  <th className="p-3">Document</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-center">Action</th>

                </tr>

              </thead>

              <tbody>

                {filteredUsers.map((user) => (

                  <tr
                    key={user.id}
                    className="border-b hover:bg-indigo-50 transition"
                  >

                    <td className="p-3 font-medium">
                      {user.firstName} {user.lastName}
                    </td>

                    <td className="p-3 text-gray-600">
                      {user.email}
                    </td>

                    <td className="p-3 text-center">
                      {user.dob
                        ? new Date(user.dob).toLocaleDateString()
                        : "N/A"}
                    </td>

                    <td className="p-3 text-center">

                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                        {user.role}
                      </span>

                    </td>

                    <td className="p-3 text-center">

                      {user.documentPath ? (

                        <button
                          onClick={() => viewDocument(user.id)}
                          className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded text-xs mx-auto"
                        >
                          <FaFileAlt /> View
                        </button>

                      ) : (
                        "N/A"
                      )}

                    </td>

                    <td className="p-3 text-center">

                      <span className="bg-yellow-500 text-white px-3 py-1 rounded-full text-xs shadow">
                        {user.status}
                      </span>

                    </td>

                    <td className="p-3 text-center space-x-2">

                      <button
                        onClick={() => approveUser(user.id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        <FaUserCheck />
                      </button>

                      <button
                        onClick={() => rejectUser(user.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                      >
                        <FaUserTimes />
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      {/* PAGINATION */}

      {totalPages >= 1 && (

        <div className="flex justify-center items-center gap-2 mt-8">

          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-white border rounded hover:bg-slate-200 flex items-center gap-1"
          >
            <FaChevronLeft /> Prev
          </button>

          {[...Array(totalPages)].map((_, i) => (

            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-4 py-2 rounded border ${
                page === i
                  ? "bg-indigo-600 text-white"
                  : "bg-white hover:bg-slate-200"
              }`}
            >
              {i + 1}
            </button>

          ))}

          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-white border rounded hover:bg-slate-200 flex items-center gap-1"
          >
            Next <FaChevronRight />
          </button>

        </div>

      )}

    </div>

  );

};

export default ManageUsers;