

// import { useEffect, useState } from "react";
// import API from "../../services/api";
// import { FaBook, FaUndo } from "react-icons/fa";

// const MyBooks = () => {
//   const [borrowed, setBorrowed] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetchBorrowedBooks();
//   }, []);

//   const fetchBorrowedBooks = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/api/borrow/my-books");
//       console.log("Borrowed books:", res.data);
//        // Show only active books
//     const activeBooks = (res.data || []).filter(
//       (book) => book.status === "ISSUED"
//     );

//     setBorrowed(activeBooks);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const returnBook = async (issueId) => {
//     try {
//       await API.post(`/api/returns?issueId=${issueId}`);
//       fetchBorrowedBooks();
//     } catch (err) {
//       console.error("Return failed", err);
//     }
//   };

//   return (
//     <div className="p-8 bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen">

//       {/* HEADER */}

//       <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-800 mb-8">
//         <FaBook className="text-indigo-600" />
//         My Borrowed Books
//       </h2>

//       {/* BOOK GRID */}

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">

//         {loading && (
//           [...Array(6)].map((_, i) => (
//             <div
//               key={i}
//               className="bg-white p-6 rounded-xl shadow animate-pulse h-72"
//             />
//           ))
//         )}

//         {!loading && borrowed.length === 0 && (
//           <p className="text-gray-500 col-span-full text-center">
//             No borrowed books
//           </p>
//         )}

//         {!loading && borrowed.map((item) => (

//           <div
//             key={item.id}
//             className={`bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-md p-5 hover:shadow-2xl hover:-translate-y-1 transition duration-300
//             ${item.overdue ? "border-2 border-red-400" : ""}`}
//           >

//             {/* COVER */}

//             <div className="flex justify-center">

//               <div className="bg-slate-100 p-2 rounded-lg">

//                 <img
//                   src={item.coverImage || "https://via.placeholder.com/120x180?text=Book"}
//                   alt="book"
//                   className="w-28 h-40 object-cover rounded"
//                 />

//               </div>

//             </div>

//             {/* BOOK TITLE */}

//             <h3 className="font-semibold text-center mt-4 text-slate-800">
//               {item.bookTitle || "Unknown Book"}
//             </h3>

//             {/* DATES */}

//             <div className="mt-3 text-sm text-gray-600 space-y-1">

//               <p>
//                 <b>Borrowed:</b> {item.issueDate}
//               </p>

//               <p>
//                 <b>Due:</b> {item.dueDate}
//               </p>

//             </div>

//             {/* STATUS */}

//             <div className="mt-3 text-center">

//               {item.overdue ? (
//                 <span className="text-red-600 font-semibold">
//                   Overdue
//                 </span>
//               ) : item.status === "ISSUED" ? (
//                 <span className="text-green-600 font-semibold">
//                   Active
//                 </span>
//               ) : (
//                 <span className="text-gray-600">
//                   {item.status}
//                 </span>
//               )}

//             </div>

//             {/* FINE */}

//             <p className="text-center mt-2 text-sm text-gray-700">
//               Fine: <b>{item.penalty ? `₹${item.penalty}` : "₹0"}</b>
//             </p>

//             {/* RETURN BUTTON */}

//             <div className="flex justify-center mt-5">

//               {item.status === "ISSUED" && (

//                 <button
//                   onClick={() => returnBook(item.id)}
//                   className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
//                 >
//                   <FaUndo />
//                   Return
//                 </button>

//               )}

//             </div>

//           </div>

//         ))}

//       </div>

//     </div>
//   );
// };

// export default MyBooks;

import { useEffect, useState } from "react";
import API from "../../services/api";
import { FaBook, FaUndo } from "react-icons/fa";

const MyBooks = () => {

  const [borrowed, setBorrowed] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBorrowedBooks();
  }, []);

  const fetchBorrowedBooks = async () => {
    try {

      setLoading(true);

      const res = await API.get("/api/borrow/my-books");

      const activeBooks = (res.data || []).filter(
        (book) => book.status === "ISSUED"
      );

      setBorrowed(activeBooks);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // SEND RETURN REQUEST

  const requestReturn = async (issueId) => {

    try {

      await API.post(`/api/returns/request?issueId=${issueId}`);

      alert("Return request sent");

      fetchBorrowedBooks();

    } catch (err) {

      console.error("Request failed", err);

      alert("Failed to send return request");

    }

  };

  return (
    <div className="p-8 bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen">

      {/* HEADER */}

      <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-800 mb-8">
        <FaBook className="text-indigo-600" />
        My Borrowed Books
      </h2>

      {/* BOOK GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">

        {loading &&
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow animate-pulse h-72"
            />
          ))}

        {!loading && borrowed.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No borrowed books
          </p>
        )}

        {!loading &&
          borrowed.map((item) => (

            <div
              key={item.id}
              className={`bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-md p-5 hover:shadow-2xl hover:-translate-y-1 transition duration-300
              ${item.overdue ? "border-2 border-red-400" : ""}`}
            >

              {/* COVER */}

              <div className="flex justify-center">

                <div className="bg-slate-100 p-2 rounded-lg">

                  <img
                    src={
                      item.coverImage ||
                      "https://via.placeholder.com/120x180?text=Book"
                    }
                    alt="book"
                    className="w-28 h-40 object-cover rounded"
                  />

                </div>

              </div>

              {/* TITLE */}

              <h3 className="font-semibold text-center mt-4 text-slate-800">
                {item.bookTitle}
              </h3>

              {/* DATES */}

              <div className="mt-3 text-sm text-gray-600 space-y-1">

                <p>
                  <b>Borrowed:</b> {item.issueDate}
                </p>

                <p>
                  <b>Due:</b> {item.dueDate}
                </p>

              </div>

              {/* STATUS */}

              <div className="mt-3 text-center">

                {item.overdue ? (
                  <span className="text-red-600 font-semibold">
                    Overdue
                  </span>
                ) : (
                  <span className="text-green-600 font-semibold">
                    Active
                  </span>
                )}

              </div>

              {/* FINE */}

              <p className="text-center mt-2 text-sm text-gray-700">
                Fine: <b>{item.penalty ? `₹${item.penalty}` : "₹0"}</b>
              </p>

              {/* RETURN REQUEST BUTTON */}

              <div className="flex justify-center mt-5">

                {item.returnRequested ? (

                  <span className="text-yellow-600 font-semibold">
                    Request Sent
                  </span>

                ) : (

                  <button
                    onClick={() => requestReturn(item.id)}
                    className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg"
                  >
                    <FaUndo />
                    Return Request
                  </button>

                )}

              </div>

            </div>

          ))}

      </div>

    </div>
  );
};

export default MyBooks;