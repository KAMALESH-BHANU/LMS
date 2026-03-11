
import { useEffect, useState } from "react";
import API from "../../services/api";

import {
  FaSearch,
  FaBook,
  FaEye,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

const BrowseBooks = () => {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState({
    title: "",
    author: "",
    genre: ""
  });

  const [selectedBook, setSelectedBook] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    loadBooks(page, search);
  }, [page]);

  /* -------- REMOVE EMPTY SEARCH PARAMS -------- */

  const cleanParams = (params) => {

    const cleaned = {};

    Object.keys(params).forEach((key) => {

      if (params[key] && params[key].trim() !== "") {
        cleaned[key] = params[key];
      }

    });

    return cleaned;

  };

  /* -------- LOAD BOOKS -------- */

  const loadBooks = async (pageNumber, searchParams = {}) => {

    try {

      setLoading(true);

      const res = await API.get("/api/books/search", {

        params: {
          ...cleanParams(searchParams),
          page: pageNumber,
          size: 6,
          sortBy: "title",
          direction: "asc"
        }

      });

      setBooks(res.data.content || []);
      setTotalPages(res.data.totalPages || 1);
      setPage(res.data.pageNumber || 0);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  /* -------- SEARCH -------- */

  const handleSearch = (e) => {

    e.preventDefault();
    setPage(0);
    loadBooks(0, search);

  };

  /* -------- REQUEST BORROW -------- */

  const requestBorrow = async (bookId) => {

    try {

      await API.post(`/api/book-requests/${bookId}`);

      alert("Borrow request sent");

      loadBooks(page, search);

    } catch {

      alert("Request failed");

    }

  };

  const openDetails = (book) => {

    setSelectedBook(book);
    setShowDetails(true);

  };

  return (

    <div className="p-8 bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen">

      {/* HEADER */}

      <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-800 mb-8">
        <FaBook className="text-indigo-600" />
        Browse Books
      </h2>

      {/* SEARCH BAR */}

      <form
        onSubmit={handleSearch}
        className="flex gap-4 mb-8 flex-wrap"
      >

        <div className="relative">

          <FaSearch className="absolute left-3 top-3 text-gray-400" />

          <input
            placeholder="Search by title..."
            className="pl-10 p-3 border rounded-lg w-64 shadow-sm focus:ring-2 focus:ring-indigo-400"
            value={search.title}
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
            value={search.author}
            onChange={(e) =>
              setSearch({ ...search, author: e.target.value })
            }
          />

        </div>

        <div className="relative">

          <FaSearch className="absolute left-3 top-3 text-gray-400" />

          <input
            placeholder="Search by genre..."
            className="pl-10 p-3 border rounded-lg w-64 shadow-sm focus:ring-2 focus:ring-indigo-400"
            value={search.genre}
            onChange={(e) =>
              setSearch({ ...search, genre: e.target.value })
            }
          />

        </div>

        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg shadow">
          Search
        </button>

      </form>

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

            {/* COVER */}

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

            <p className="text-xs text-gray-500 text-center mt-1">
              {b.genre || "-"}
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

            {/* ACTION BUTTON */}

            <div className="flex justify-center gap-3 mt-5">

              <button
                onClick={() => openDetails(b)}
                className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-lg"
              >
                <FaEye />
              </button>

              <button
                disabled={b.status !== "AVAILABLE"}
                onClick={() => requestBorrow(b.id)}
                className={`px-3 py-2 rounded-lg text-white ${
                  b.status === "AVAILABLE"
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Request
              </button>

            </div>

          </div>

        ))}

      </div>

      {/* PAGINATION */}

      <div className="flex justify-center items-center mt-12 gap-2 flex-wrap">

        <button
          disabled={page === 0}
          onClick={() => loadBooks(page - 1, search)}
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
            onClick={() => loadBooks(i, search)}
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
          disabled={page + 1 === totalPages}
          onClick={() => loadBooks(page + 1, search)}
          className={`flex items-center gap-1 px-4 py-2 rounded-lg border
          ${page + 1 === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-white hover:bg-slate-200"
          }`}
        >
          Next <FaChevronRight />
        </button>

      </div>

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

export default BrowseBooks;
