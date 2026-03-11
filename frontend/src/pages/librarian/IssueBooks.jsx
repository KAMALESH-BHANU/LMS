import { useState } from "react";
import API from "../../services/api";

const IssueBooks = () => {

  const [bookQuery, setBookQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const [memberQuery, setMemberQuery] = useState("");
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);

  const [showIssue, setShowIssue] = useState(false);

  const [issueDate, setIssueDate] = useState(
    new Date().toISOString().slice(0, 10)
  );

  const [dueDate, setDueDate] = useState("");

  const [status, setStatus] = useState(null);

  /* ---------------- AUTO DUE DATE ---------------- */

  const setDefaultDueDate = (date) => {
    const d = new Date(date);
    d.setDate(d.getDate() + 14);
    setDueDate(d.toISOString().slice(0, 10));
  };

  /* ---------------- BOOK SEARCH ---------------- */

  const searchBooks = async (value) => {

    setBookQuery(value);

    if (value.length < 2) {
      setBooks([]);
      return;
    }

    try {

      const res = await API.get("/api/books/search", {
        params: { title: value, page: 0, size: 10 },
      });

      const data = res.data.content || res.data || [];
      setBooks(data);

    } catch (error) {

      console.error("Book search error:", error);
      setBooks([]);

    }
  };

  /* ---------------- MEMBER SEARCH ---------------- */

  const searchMembers = async (value) => {

    setMemberQuery(value);

    if (value.length < 2) {
      setMembers([]);
      return;
    }

    try {

      const res = await API.get("/api/members/search", {
        params: { keyword: value },
      });

      const data = Array.isArray(res.data) ? res.data : [];
      setMembers(data);

    } catch (error) {

      console.error("Member search error:", error);
      setMembers([]);

    }
  };

  /* ---------------- CHECK ISSUE STATUS ---------------- */

  const checkStatus = async (book, member) => {

    if (!book || !member) return;

    try {

      const res = await API.get("/api/issues/status", {
        params: {
          bookId: book.id,
          memberId: member.id,
        },
      });

      setStatus(res.data);

    } catch {

      setStatus(null);

    }
  };

  /* ---------------- ISSUE BOOK ---------------- */

  const issueBook = async () => {

    if (!selectedBook || !selectedMember) {
      alert("Please select book and member");
      return;
    }

    try {

      await API.post("/api/issues", null, {
        params: {
          bookId: selectedBook.id,
          memberId: selectedMember.id,
          issueDate,
          dueDate,
        },
      });

      alert("Book Issued Successfully");

      setShowIssue(false);

      checkStatus(selectedBook, selectedMember);

    } catch (error) {

      alert("Issue failed");
      console.error(error);

    }
  };

  /* ---------------- RETURN BOOK ---------------- */

  const returnBook = async () => {

    if (!status?.id) {
      alert("Issue record not found");
      return;
    }

    try {

      await API.post("/api/returns", null, {
        params: {
          issueId: status.id
        }
      });

      alert("Book Returned Successfully");

      setStatus(null);

    } catch (error) {

      alert("Return failed");
      console.error(error);

    }
  };

  return (

    <div className="max-w-xl bg-white shadow-lg rounded-lg p-6">

      <h2 className="text-2xl font-bold mb-6">Issue / Return Book</h2>

      {/* ------------ BOOK SEARCH ------------ */}

      <div className="relative mb-5">

        <input
          value={bookQuery}
          onChange={(e) => searchBooks(e.target.value)}
          placeholder="Search Book"
          className="border p-2 w-full rounded"
        />

        {books.length > 0 && (
          <div className="absolute z-20 bg-white border w-full rounded shadow max-h-40 overflow-y-auto">

            {books.map((b) => (
              <div
                key={b.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setSelectedBook(b);
                  setBookQuery("");
                  setBooks([]);

                  checkStatus(b, selectedMember);
                }}
              >
                {b.title}
              </div>
            ))}

          </div>
        )}

        {selectedBook && (
          <div className="mt-2 bg-blue-100 text-blue-800 px-3 py-1 rounded inline-flex items-center">

            {selectedBook.title}

            <button
              className="ml-2 text-red-600"
              onClick={() => {
                setSelectedBook(null);
                setStatus(null);
              }}
            >
              ✕
            </button>

          </div>
        )}

      </div>

      {/* ------------ MEMBER SEARCH ------------ */}

      <div className="relative mb-5">

        <input
          value={memberQuery}
          onChange={(e) => searchMembers(e.target.value)}
          placeholder="Search Member"
          className="border p-2 w-full rounded"
        />

        {members.length > 0 && (
          <div className="absolute z-20 bg-white border w-full rounded shadow max-h-40 overflow-y-auto">

            {members.map((m) => (
              <div
                key={m.id}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  setSelectedMember(m);
                  setMemberQuery("");
                  setMembers([]);

                  checkStatus(selectedBook, m);
                }}
              >
                {m.firstName} {m.lastName} ({m.email})
              </div>
            ))}

          </div>
        )}

        {selectedMember && (
          <div className="mt-2 bg-green-100 text-green-800 px-3 py-1 rounded inline-flex items-center">

            {selectedMember.firstName} {selectedMember.lastName}

            <button
              className="ml-2 text-red-600"
              onClick={() => {
                setSelectedMember(null);
                setStatus(null);
              }}
            >
              ✕
            </button>

          </div>
        )}

      </div>

      {/* ------------ ACTION BUTTON ------------ */}

      <div className="flex gap-3 mb-6">

        <button
          onClick={() => {

            if (!selectedBook || !selectedMember) {
              alert("Please select book and member");
              return;
            }

            setDefaultDueDate(issueDate);
            setShowIssue(true);

          }}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Issue Book
        </button>

      </div>

      {/* ------------ CURRENT ISSUE STATUS ------------ */}

      {status && (

        <div className="border rounded p-4 bg-gray-50 mb-6">

          <h3 className="font-bold mb-3">Current Status</h3>

          <div className="mb-2">
            <b>Issued On :</b> {status.issueDate}
          </div>

          <div className="mb-2">
            <b>Due Date :</b> {status.dueDate}
          </div>

          <div className="mb-4">
            <b>Penalty :</b> ₹{status.penalty || 10}
          </div>

          <button
            onClick={returnBook}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Return Book
          </button>

        </div>

      )}

      {/* ------------ ISSUE MODAL ------------ */}

      {showIssue && (

        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-40">

          <div className="bg-white p-6 rounded shadow w-96">

            <h3 className="text-lg font-bold mb-4">Issue Details</h3>

            <label>Issue Date</label>

            <input
              type="date"
              value={issueDate}
              onChange={(e) => {
                setIssueDate(e.target.value);
                setDefaultDueDate(e.target.value);
              }}
              className="border p-2 w-full mb-3 rounded"
            />

            <label>Due Date</label>

            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="border p-2 w-full mb-4 rounded"
            />

            <div className="flex justify-end gap-2">

              <button
                onClick={() => setShowIssue(false)}
                className="bg-gray-400 text-white px-3 py-2 rounded"
              >
                Cancel
              </button>

              <button
                onClick={issueBook}
                className="bg-green-600 text-white px-3 py-2 rounded"
              >
                Confirm
              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );
};

export default IssueBooks;