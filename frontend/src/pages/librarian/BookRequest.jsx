// // import { useEffect, useState } from "react";
// // import API from "../../services/api";

// // const BookRequests = () => {
// //   const [requests, setRequests] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetchRequests();
// //   }, []);

// //   const fetchRequests = async () => {
// //     try {
// //       const res = await API.get("/api/book-requests");
// //       setRequests(res.data);
// //     } catch (error) {
// //       console.error("Error fetching book requests:", error);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const approve = async (id) => {
// //     try {
// //       const res = await API.patch(`/api/book-requests/${id}?status=APPROVED`);
// //       setRequests((prev) => prev.map((r) => (r.id === id ? res.data : r)));
// //     } catch (error) {
// //       console.error("Error approving request:", error);
// //     }
// //   };

// //   const reject = async (id) => {
// //     try {
// //       const res = await API.patch(`/api/book-requests/${id}?status=REJECTED`);
// //       setRequests((prev) => prev.map((r) => (r.id === id ? res.data : r)));
// //     } catch (error) {
// //       console.error("Error rejecting request:", error);
// //     }
// //   };

// //   if (loading) {
// //     return <p>Loading book requests...</p>;
// //   }

// //   return (
// //     <div>
// //       <h2 className="text-2xl font-bold mb-4">Book Requests</h2>

// //       <table className="w-full bg-white shadow rounded">
// //         <thead className="bg-gray-200">
// //           <tr>
// //             <th className="p-2 text-left">Title</th>
// //             <th className="p-2 text-left">Author</th>
// //             <th className="p-2 text-left">Member</th>
// //             <th className="p-2 text-left">Status</th>
// //             <th className="p-2 text-left">Action</th>
// //           </tr>
// //         </thead>
// //         <tbody>
// //           {requests.map((r) => (
// //             <tr key={r.id} className="border-t">
// //               <td className="p-2">{r.requestedTitle}</td>
// //               <td className="p-2">{r.requestedAuthor}</td>
// //               <td className="p-2">
// //                 {r.member?.user
// //                   ? `${r.member.user.firstName} ${r.member.user.lastName}`
// //                   : ""}
// //               </td>
// //               <td className="p-2 font-semibold">{r.status}</td>
// //               <td className="p-2 space-x-2">
// //                 {r.status === "PENDING" && (
// //                   <>
// //                     <button
// //                       onClick={() => approve(r.id)}
// //                       className="bg-green-600 text-white px-3 py-1 rounded"
// //                     >
// //                       ✅
// //                     </button>
// //                     <button
// //                       onClick={() => reject(r.id)}
// //                       className="bg-red-600 text-white px-3 py-1 rounded"
// //                     >
// //                       ❌
// //                     </button>
// //                   </>
// //                 )}
// //               </td>
// //             </tr>
// //           ))}
// //         </tbody>
// //       </table>
// //     </div>
// //   );
// // };

// // export default BookRequests;

// import { useEffect, useState } from "react";
// import API from "../../services/api";

// const BookRequests = () => {
//   const [requests, setRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchRequests();
//   }, []);

//   const fetchRequests = async () => {
//     try {
//       const res = await API.get("/api/book-requests");

//       // Defensive safety: ensure array
//       const data = Array.isArray(res.data) ? res.data : [];
//       setRequests(data);
//     } catch (error) {
//       console.error("Error fetching book requests:", error);
//       setRequests([]); // prevent map crash
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateStatus = async (id, status) => {
//     try {
//       const res = await API.patch(`/api/book-requests/${id}?status=${status}`);

//       setRequests((prev) => prev.map((r) => (r.id === id ? res.data : r)));
//     } catch (error) {
//       console.error(`Error updating request ${id}:`, error);
//     }
//   };

//   if (loading) {
//     return <p>Loading book requests...</p>;
//   }

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Book Requests</h2>

//       {requests.length === 0 ? (
//         <p>No book requests found.</p>
//       ) : (
//         <table className="w-full bg-white shadow rounded">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-2 text-left">Title</th>
//               <th className="p-2 text-left">Author</th>
//               <th className="p-2 text-left">Member</th>
//               <th className="p-2 text-left">Status</th>
//               <th className="p-2 text-left">Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {requests
//               .filter((r) => r.status !== "REJECTED")
//               .map((r) => (
//                 <tr key={r.id} className="border-t">
//                   <td className="p-2">{r.requestedTitle || "-"}</td>
//                   <td className="p-2">{r.requestedAuthor || "-"}</td>
//                   <td className="p-2">{r.memberName || "-"}</td>
//                   <td className="p-2 font-semibold">{r.status}</td>
//                   <td className="p-2 space-x-2">
//                     {r.status === "PENDING" && (
//                       <>
//                         <button
//                           onClick={() => updateStatus(r.id, "APPROVED")}
//                           className="bg-green-600 text-white px-3 py-1 rounded"
//                         >
//                           ✅
//                         </button>
//                         <button
//                           onClick={() => updateStatus(r.id, "REJECTED")}
//                           className="bg-red-600 text-white px-3 py-1 rounded"
//                         >
//                           ❌
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default BookRequests;


import { useEffect, useState } from "react";
import API from "../../services/api";

import {
  FaCheck,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
  FaBook
} from "react-icons/fa";

const BookRequests = () => {

  const [requests, setRequests] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRequests();
  }, [page]);

  const fetchRequests = async () => {

    try {

      setLoading(true);

      const res = await API.get("/api/book-requests", {
        params: {
          status: "PENDING",
          page: page,
          size: 6
        }
      });

      setRequests(res.data.content || []);
      setTotalPages(res.data.totalPages || 1);

    } catch (err) {
      console.error("Error loading requests", err);
    } finally {
      setLoading(false);
    }

  };

  const updateStatus = async (id, status) => {

    try {

      await API.patch(`/api/book-requests/${id}?status=${status}`);

      setRequests((prev) => prev.filter((r) => r.id !== id));

    } catch (error) {
      console.error(error);
    }

  };

  return (

    <div className="p-8 bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen">

      {/* PAGE TITLE */}

      <h2 className="text-3xl font-bold flex items-center gap-3 mb-10 text-slate-800">
        <FaBook className="text-indigo-600 text-2xl" />
        Book Requests
      </h2>

      {/* LOADING SKELETON */}

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow animate-pulse h-72"
            />
          ))}

        </div>
      )}

      {/* EMPTY STATE */}

      {!loading && requests.length === 0 && (

        <div className="text-center text-gray-500 mt-20">

          <FaBook className="text-5xl mx-auto mb-4 opacity-40" />

          <p className="text-lg">
            No pending book requests
          </p>

        </div>

      )}

      {/* BOOK REQUEST GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-7">

        {!loading && requests.map((r) => (

          <div
            key={r.id}
            className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-md p-5 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >

            {/* COVER IMAGE */}

            <div className="flex justify-center">

              <div className="bg-slate-100 p-2 rounded-lg">

                <img
                  src={r.coverImage || "https://via.placeholder.com/120x180?text=Book"}
                  alt={r.requestedTitle}
                  className="w-28 h-40 object-cover rounded-lg"
                  referrerPolicy="no-referrer"
                />

              </div>

            </div>

            {/* BOOK DETAILS */}

            <div className="mt-4 text-center">

              <h3 className="font-semibold text-lg text-slate-800">
                {r.requestedTitle}
              </h3>

              <p className="text-gray-600 text-sm">
                {r.requestedAuthor}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                Requested by: {r.memberName}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Email: {r.memberEmail}
              </p>

              {/* STATUS BADGE */}

              <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-700 animate-pulse">
                PENDING
              </span>

            </div>

            {/* ACTION BUTTONS */}

            <div className="flex justify-center gap-4 mt-6">

              <button
                onClick={() => updateStatus(r.id, "APPROVED")}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow"
              >
                <FaCheck /> Approve
              </button>

              <button
                onClick={() => updateStatus(r.id, "REJECTED")}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition shadow"
              >
                <FaTimes /> Reject
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* PAGINATION */}

      {requests.length > 0 && (

        <div className="flex justify-center items-center mt-12 gap-2 flex-wrap">

          {/* PREVIOUS */}

          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg border font-medium
            ${page === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-slate-200"
              }`}
          >
            <FaChevronLeft /> Prev
          </button>

          {/* PAGE NUMBERS */}

          {[...Array(totalPages).keys()].map((i) => (

            <button
              key={i}
              onClick={() => setPage(i)}
              className={`px-4 py-2 rounded-lg border font-medium transition
              ${page === i
                  ? "bg-indigo-600 text-white shadow"
                  : "bg-white hover:bg-slate-200"
                }`}
            >
              {i + 1}
            </button>

          ))}

          {/* NEXT */}

          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage(page + 1)}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg border font-medium
            ${page === totalPages - 1
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-slate-200"
              }`}
          >
            Next <FaChevronRight />
          </button>

        </div>

      )}

    </div>

  );

};

export default BookRequests;