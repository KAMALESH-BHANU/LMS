import { useEffect, useState } from "react";
import API from "../../services/api";
import { FaCheckCircle, FaSearch, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const ReturnRequests = () => {

  const [requests, setRequests] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    fetchRequests();
  }, []);

  useEffect(() => {
    handleSearch();
  }, [search, requests]);

  const fetchRequests = async () => {

    try {

      setLoading(true);

      const res = await API.get("/api/admin/return-requests");

      setRequests(res.data || []);
      setFiltered(res.data || []);

    } catch (err) {

      console.error(err);

    } finally {

      setLoading(false);

    }

  };

  const approveReturn = async (issueId) => {

    try {

      await API.post(`/api/admin/approve-return?issueId=${issueId}`);

      alert("Return approved");

      fetchRequests();

    } catch (err) {

      console.error(err);

      alert("Failed to approve return");

    }

  };

  const handleSearch = () => {

    const term = search.toLowerCase();

    const filteredData = requests.filter((r) =>
      r.bookTitle.toLowerCase().includes(term) ||
      r.studentName.toLowerCase().includes(term)
    );

    setFiltered(filteredData);
    setPage(1);

  };

  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  const start = (page - 1) * itemsPerPage;
  const paginated = filtered.slice(start, start + itemsPerPage);

  return (

    <div className="p-8 bg-gradient-to-br from-slate-100 to-slate-200 min-h-screen">

      <h2 className="text-3xl font-bold text-slate-800 mb-6">
        Return Requests
      </h2>

      {/* SEARCH BAR */}

      <div className="flex items-center gap-3 bg-white p-3 rounded-lg shadow mb-6 w-full md:w-96">

        <FaSearch className="text-gray-500" />

        <input
          type="text"
          placeholder="Search by book title or student..."
          className="outline-none w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

      </div>

      {/* CONTENT */}

      {loading && (
        <p className="text-center text-gray-500">Loading...</p>
      )}

      {!loading && paginated.length === 0 && (
        <p className="text-center text-gray-500">No return requests</p>
      )}

      {/* CARD GRID */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

        {paginated.map((req) => (

          <div
            key={req.issueId}
            className="bg-white shadow-md rounded-xl p-5 flex flex-col justify-between"
          >

            <div className="flex gap-4">

              <img
                src={req.coverImage}
                alt="book"
                className="w-20 h-28 object-cover rounded"
              />

              <div>

                <h3 className="font-semibold text-lg">
                  {req.bookTitle}
                </h3>

                <p className="text-gray-600 text-sm">
                  Student: {req.studentName}
                </p>

                <p className="text-sm text-gray-500 mt-2">
                  Issue: {req.issueDate}
                </p>

                <p className="text-sm text-gray-500">
                  Due: {req.dueDate}
                </p>

              </div>

            </div>

            <button
              onClick={() => approveReturn(req.issueId)}
              className="mt-5 flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
            >

              <FaCheckCircle />

              Approve Return

            </button>

          </div>

        ))}

      </div>

      {/* PAGINATION */}

      {totalPages > 1 && (

        <div className="flex justify-center items-center gap-4 mt-8">

          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className="p-2 bg-white shadow rounded disabled:opacity-50"
          >
            <FaChevronLeft />
          </button>

          <span className="font-medium">
            Page {page} of {totalPages}
          </span>

          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className="p-2 bg-white shadow rounded disabled:opacity-50"
          >
            <FaChevronRight />
          </button>

        </div>

      )}

    </div>

  );

};

export default ReturnRequests;