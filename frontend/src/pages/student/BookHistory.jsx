import { useEffect, useState } from "react";
import API from "../../services/api";
import { FaBook } from "react-icons/fa";

const BookHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHistory();
  }, [page, search]);

  const fetchHistory = async () => {
    try {
      setLoading(true);

      const res = await API.get(
        `/api/issues/history?page=${page}&size=6&keyword=${search}`
      );

      setHistory(res.data.content);
      setTotalPages(res.data.totalPages);

    } catch (err) {
      console.error(err);
      alert("Failed to load history");
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    if (status === "ISSUED") return "text-green-600 font-semibold";
    if (status === "RETURNED") return "text-blue-600 font-semibold";
    if (status === "OVERDUE") return "text-red-600 font-semibold";
    return "text-gray-600";
  };

  return (
    <div className="p-8 bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen">

      {/* HEADER */}

      <h2 className="text-3xl font-bold flex items-center gap-3 text-slate-800 mb-8">
        <FaBook className="text-indigo-600" />
        My Book History
      </h2>

      {/* SEARCH */}

      <div className="mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Search by book title..."
          className="border p-2 rounded w-full"
          value={search}
          onChange={(e) => {
            setPage(0);
            setSearch(e.target.value);
          }}
        />
      </div>

      {/* GRID */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-7">

        {loading &&
          [...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-xl shadow animate-pulse h-72"
            />
          ))}

        {!loading && history.length === 0 && (
          <p className="text-gray-500 col-span-full text-center">
            No history found
          </p>
        )}

        {!loading &&
          history.map((book) => (

            <div
              key={book.id}
              className="bg-gradient-to-br from-white to-slate-50 rounded-xl shadow-md p-5 hover:shadow-2xl hover:-translate-y-1 transition duration-300"
            >

              {/* COVER */}

              <div className="flex justify-center">

                <div className="bg-slate-100 p-2 rounded-lg">

                  <img
                    src={
                      book.coverImage ||
                      "https://via.placeholder.com/120x180?text=Book"
                    }
                    alt={book.bookTitle}
                    className="w-28 h-40 object-cover rounded"
                  />

                </div>

              </div>

              {/* TITLE */}

              <h3 className="font-semibold text-center mt-4 text-slate-800">
                {book.bookTitle}
              </h3>

              {/* DATES */}

              <div className="mt-3 text-sm text-gray-600 space-y-1">

                <p>
                  <b>Borrowed:</b> {book.issueDate}
                </p>

                <p>
                  <b>Due:</b> {book.dueDate}
                </p>

                <p>
                  <b>Returned:</b> {book.returnDate || "Not returned"}
                </p>

              </div>

              {/* STATUS */}

              <div className="mt-3 text-center">

                <span className={getStatusColor(book.status)}>
                  {book.status}
                </span>

              </div>

              {/* PENALTY */}

              <p className="text-center mt-2 text-sm text-gray-700">
                Fine: <b>{book.penalty ? `₹${book.penalty}` : "₹0"}</b>
              </p>

            </div>

          ))}
      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-10">

          <button
            disabled={page === 0}
            onClick={() => setPage(page - 1)}
            className="px-4 py-2 bg-white shadow rounded disabled:opacity-50"
          >
            Prev
          </button>

          <span className="font-medium text-slate-700">
            Page {page + 1} of {totalPages}
          </span>

          <button
            disabled={page === totalPages - 1}
            onClick={() => setPage(page + 1)}
            className="px-4 py-2 bg-white shadow rounded disabled:opacity-50"
          >
            Next
          </button>

        </div>
      )}

    </div>
  );
};

export default BookHistory;