// import { useEffect, useState } from "react";
// import API from "../../services/api";

// import {
//   FaSearch,
//   FaPlus,
//   FaEdit,
//   FaTrash,
//   FaEye,
//   FaBook,
//   FaChevronLeft,
//   FaChevronRight
// } from "react-icons/fa";

// const ManageBooks = () => {

//   const [books, setBooks] = useState([]);
//   const [page, setPage] = useState(0);
//   const [totalPages, setTotalPages] = useState(1);

//   const [search, setSearch] = useState({
//     title: "",
//     author: ""
//   });

//   const [loading, setLoading] = useState(false);

//   const [showDetails, setShowDetails] = useState(false);
//   const [selectedBook, setSelectedBook] = useState(null);

//   useEffect(() => {
//     fetchBooks();
//   }, [page, search]);

//   const fetchBooks = async () => {

//     try {

//       setLoading(true);

//       const res = await API.get("/api/books/search", {
//         params: {
//           ...search,
//           page,
//           size: 6,
//           sortBy: "title",
//           direction: "asc"
//         }
//       });

//       setBooks(res.data.content || []);
//       setTotalPages(res.data.totalPages || 1);

//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }

//   };

//   const deleteBook = async (id) => {

//     if (!window.confirm("Delete this book?")) return;

//     await API.delete(`/api/books/${id}`);
//     fetchBooks();

//   };

//   const openDetails = (book) => {
//     setSelectedBook(book);
//     setShowDetails(true);
//   };

//   return (

//     <div className="p-8 bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen">

//       {/* HEADER */}

//       <div className="flex justify-between items-center mb-8">

//         <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-800">
//           <FaBook className="text-indigo-600" />
//           Manage Books
//         </h2>

//         <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow">
//           <FaPlus /> Add Book
//         </button>

//       </div>

//       {/* SEARCH BAR */}

//       <div className="flex gap-4 mb-8 flex-wrap">

//         <div className="relative">

//           <FaSearch className="absolute left-3 top-3 text-gray-400" />

//           <input
//             placeholder="Search by title..."
//             className="pl-10 p-3 border rounded-lg w-64 shadow-sm focus:ring-2 focus:ring-indigo-400"
//             onChange={(e) =>
//               setSearch({ ...search, title: e.target.value })
//             }
//           />

//         </div>

//         <div className="relative">

//           <FaSearch className="absolute left-3 top-3 text-gray-400" />

//           <input
//             placeholder="Search by author..."
//             className="pl-10 p-3 border rounded-lg w-64 shadow-sm focus:ring-2 focus:ring-indigo-400"
//             onChange={(e) =>
//               setSearch({ ...search, author: e.target.value })
//             }
//           />

//         </div>

//       </div>

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

//         {!loading && books.map((b) => (

//           <div
//             key={b.id}
//             className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-md p-5 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
//           >

//             {/* BOOK COVER */}

//             <div className="flex justify-center">

//               <div className="bg-slate-100 p-2 rounded-lg">

//                 <img
//                   src={b.coverImage || "https://via.placeholder.com/120x180?text=Book"}
//                   alt={b.title}
//                   className="w-28 h-40 object-cover rounded cursor-pointer"
//                   onClick={() => openDetails(b)}
//                 />

//               </div>

//             </div>

//             {/* BOOK INFO */}

//             <h3 className="font-semibold text-center mt-4 text-slate-800">
//               {b.title}
//             </h3>

//             <p className="text-sm text-gray-600 text-center">
//               {b.author}
//             </p>

//             {/* AVAILABILITY */}

//             <div className="mt-3">

//               <p className="text-xs text-gray-500 text-center mb-1">
//                 Available: {b.availableCopies}/{b.totalCopies}
//               </p>

//               <div className="w-full bg-gray-200 h-2 rounded">

//                 <div
//                   className="bg-green-500 h-2 rounded"
//                   style={{
//                     width: `${(b.availableCopies / b.totalCopies) * 100}%`
//                   }}
//                 />

//               </div>

//             </div>

//             {/* ACTION BUTTONS */}

//             <div className="flex justify-center gap-3 mt-5">

//               <button
//                 onClick={() => openDetails(b)}
//                 className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
//               >
//                 <FaEye />
//               </button>

//               <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg">
//                 <FaEdit />
//               </button>

//               <button
//                 onClick={() => deleteBook(b.id)}
//                 className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
//               >
//                 <FaTrash />
//               </button>

//             </div>

//           </div>

//         ))}

//       </div>

//       {/* PAGINATION */}

//       <div className="flex justify-center items-center mt-12 gap-2 flex-wrap">

//         <button
//           disabled={page === 0}
//           onClick={() => setPage(page - 1)}
//           className={`flex items-center gap-1 px-4 py-2 rounded-lg border
//           ${page === 0
//             ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//             : "bg-white hover:bg-slate-200"
//           }`}
//         >
//           <FaChevronLeft /> Prev
//         </button>

//         {[...Array(totalPages).keys()].map((i) => (

//           <button
//             key={i}
//             onClick={() => setPage(i)}
//             className={`px-4 py-2 rounded-lg border font-medium
//             ${page === i
//               ? "bg-indigo-600 text-white"
//               : "bg-white hover:bg-slate-200"
//             }`}
//           >
//             {i + 1}
//           </button>

//         ))}

//         <button
//           disabled={page === totalPages - 1}
//           onClick={() => setPage(page + 1)}
//           className={`flex items-center gap-1 px-4 py-2 rounded-lg border
//           ${page === totalPages - 1
//             ? "bg-gray-200 text-gray-400 cursor-not-allowed"
//             : "bg-white hover:bg-slate-200"
//           }`}
//         >
//           Next <FaChevronRight />
//         </button>

//       </div>

//       {/* BOOK DETAILS MODAL */}

//       {showDetails && selectedBook && (

//         <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

//           <div className="bg-white p-6 rounded-xl w-96 shadow-xl">

//             <img
//               src={selectedBook.coverImage || "https://via.placeholder.com/150x220?text=Book"}
//               alt={selectedBook.title}
//               className="w-40 mx-auto mb-4 rounded"
//             />

//             <h3 className="text-xl font-bold text-center">
//               {selectedBook.title}
//             </h3>

//             <div className="mt-4 text-sm space-y-1">

//               <p><b>Author:</b> {selectedBook.author}</p>
//               <p><b>Genre:</b> {selectedBook.genre}</p>
//               <p><b>Publisher:</b> {selectedBook.publisher}</p>
//               <p><b>ISBN:</b> {selectedBook.isbn}</p>
//               <p><b>MRP:</b> ₹{selectedBook.mrp}</p>

//             </div>

//             <div className="text-center mt-5">

//               <button
//                 onClick={() => setShowDetails(false)}
//                 className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
//               >
//                 Close
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>
//   );
// };

// export default ManageBooks;

import { useEffect, useState } from "react";
import API from "../../services/api";

import {
  FaSearch,
  FaPlus,
  FaEdit,
  FaTrash,
  FaEye,
  FaBook,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

const ManageBooks = () => {

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState({
    title: "",
    author: ""
  });

  const [loading, setLoading] = useState(false);

  const [showDetails, setShowDetails] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  /* ---------------- ADD BOOK STATES ---------------- */

  const [showAddModal, setShowAddModal] = useState(false);

  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: "",
    totalCopies: 1
  });

  useEffect(() => {
    fetchBooks();
  }, [page, search]);

  const fetchBooks = async () => {

    try {

      setLoading(true);

      const res = await API.get("/api/books/search", {
        params: {
          ...search,
          page,
          size: 6,
          sortBy: "title",
          direction: "asc"
        }
      });

      setBooks(res.data.content || []);
      setTotalPages(res.data.totalPages || 1);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }

  };

  /* ---------------- ADD BOOK FUNCTION ---------------- */

  const addBook = async () => {

    try {

      await API.post("/api/books", newBook);

      setShowAddModal(false);

      setNewBook({
        title: "",
        author: "",
        genre: "",
        totalCopies: 1
      });

      fetchBooks();

    } catch (error) {

      console.error(error);
      alert("Failed to add book");

    }

  };

  const deleteBook = async (id) => {

    if (!window.confirm("Delete this book?")) return;

    await API.delete(`/api/books/${id}`);
    fetchBooks();

  };

  const openDetails = (book) => {
    setSelectedBook(book);
    setShowDetails(true);
  };

  return (

    <div className="p-8 bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen">

      {/* HEADER */}

      <div className="flex justify-between items-center mb-8">

        <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-800">
          <FaBook className="text-indigo-600" />
          Manage Books
        </h2>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow"
        >
          <FaPlus /> Add Book
        </button>

      </div>

      {/* SEARCH BAR */}

      <div className="flex gap-4 mb-8 flex-wrap">

        <div className="relative">

          <FaSearch className="absolute left-3 top-3 text-gray-400" />

          <input
            placeholder="Search by title..."
            className="pl-10 p-3 border rounded-lg w-64 shadow-sm focus:ring-2 focus:ring-indigo-400"
            onChange={(e) =>
              setSearch({ ...search, title: e.target.value })
            }
          />

        </div>

        <div className="relative">

          <FaSearch className="absolute left-3 top-3 text-gray-400" />

          <input
            placeholder="Search by author..."
            className="pl-10 p-3 border rounded-lg w-64 shadow-sm focus:ring-2 focus:ring-indigo-400"
            onChange={(e) =>
              setSearch({ ...search, author: e.target.value })
            }
          />

        </div>

      </div>

      {/* BOOK GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">

        {loading && (

          [...Array(6)].map((_, i) => (

            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow animate-pulse h-72"
            />

          ))

        )}

        {!loading && books.map((b) => (

          <div
            key={b.id}
            className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-md p-5 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
          >

            {/* BOOK COVER */}

            <div className="flex justify-center">

              <div className="bg-slate-100 p-2 rounded-lg">

                <img
                  src={b.coverImage || "https://via.placeholder.com/120x180?text=Book"}
                  alt={b.title}
                  className="w-28 h-40 object-cover rounded cursor-pointer"
                  onClick={() => openDetails(b)}
                />

              </div>

            </div>

            {/* BOOK INFO */}

            <h3 className="font-semibold text-center mt-4 text-slate-800">
              {b.title}
            </h3>

            <p className="text-sm text-gray-600 text-center">
              {b.author}
            </p>

            {/* AVAILABILITY */}

            <div className="mt-3">

              <p className="text-xs text-gray-500 text-center mb-1">
                Available: {b.availableCopies}/{b.totalCopies}
              </p>

              <div className="w-full bg-gray-200 h-2 rounded">

                <div
                  className="bg-green-500 h-2 rounded"
                  style={{
                    width: `${(b.availableCopies / b.totalCopies) * 100}%`
                  }}
                />

              </div>

            </div>

            {/* ACTION BUTTONS */}

            <div className="flex justify-center gap-3 mt-5">

              <button
                onClick={() => openDetails(b)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
              >
                <FaEye />
              </button>

              <button className="bg-yellow-500 hover:bg-yellow-600 text-white p-2 rounded-lg">
                <FaEdit />
              </button>

              <button
                onClick={() => deleteBook(b.id)}
                className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg"
              >
                <FaTrash />
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* PAGINATION */}

      <div className="flex justify-center items-center mt-12 gap-2 flex-wrap">

        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg border
          ${page === 0
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-slate-200"
          }`}
        >
          <FaChevronLeft /> Prev
        </button>

        {[...Array(totalPages).keys()].map((i) => (

          <button
            key={i}
            onClick={() => setPage(i)}
            className={`px-4 py-2 rounded-lg border font-medium
            ${page === i
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
          className={`flex items-center gap-1 px-4 py-2 rounded-lg border
          ${page === totalPages - 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-slate-200"
          }`}
        >
          Next <FaChevronRight />
        </button>

      </div>

      {/* ADD BOOK MODAL */}

      {showAddModal && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-lg w-96 shadow-xl">

            <h3 className="text-lg font-semibold mb-4">Add Book</h3>

            <input
              placeholder="Title"
              className="border p-2 w-full mb-3 rounded"
              value={newBook.title}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
            />

            <input
              placeholder="Author"
              className="border p-2 w-full mb-3 rounded"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
            />

            <input
              placeholder="Genre"
              className="border p-2 w-full mb-3 rounded"
              value={newBook.genre}
              onChange={(e) =>
                setNewBook({ ...newBook, genre: e.target.value })
              }
            />

            <input
              type="number"
              placeholder="Total Copies"
              className="border p-2 w-full mb-3 rounded"
              value={newBook.totalCopies}
              onChange={(e) =>
                setNewBook({ ...newBook, totalCopies: e.target.value })
              }
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={addBook}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>

            </div>

          </div>

        </div>

      )}

      {/* BOOK DETAILS MODAL */}

      {showDetails && selectedBook && (

        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">

          <div className="bg-white p-6 rounded-xl w-96 shadow-xl">

            <img
              src={selectedBook.coverImage || "https://via.placeholder.com/150x220?text=Book"}
              alt={selectedBook.title}
              className="w-40 mx-auto mb-4 rounded"
            />

            <h3 className="text-xl font-bold text-center">
              {selectedBook.title}
            </h3>

            <div className="mt-4 text-sm space-y-1">

              <p><b>Author:</b> {selectedBook.author}</p>
              <p><b>Genre:</b> {selectedBook.genre}</p>
              <p><b>Publisher:</b> {selectedBook.publisher}</p>
              <p><b>ISBN:</b> {selectedBook.isbn}</p>
              <p><b>MRP:</b> ₹{selectedBook.mrp}</p>

            </div>

            <div className="text-center mt-5">

              <button
                onClick={() => setShowDetails(false)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default ManageBooks;