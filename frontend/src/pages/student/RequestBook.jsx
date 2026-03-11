// src/pages/student/RequestBook.jsx

import { useState } from "react";
import API from "../../services/api";

const RequestBook = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    reason: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.author) {
      alert("Title and Author required");
      return;
    }

    try {
      await API.post("/api/purchase-request", form);
      alert("Book request submitted successfully");

      setForm({
        title: "",
        author: "",
        reason: "",
      });
    } catch (err) {
      console.error(err);
      alert("Request failed");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">
        Request New Book Purchase
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow rounded p-6 max-w-lg"
      >
        <input
          placeholder="Book Title"
          className="border p-2 w-full mb-4 rounded"
          value={form.title}
          onChange={(e) =>
            setForm({ ...form, title: e.target.value })
          }
        />

        <input
          placeholder="Author"
          className="border p-2 w-full mb-4 rounded"
          value={form.author}
          onChange={(e) =>
            setForm({ ...form, author: e.target.value })
          }
        />

        <textarea
          placeholder="Reason (optional)"
          className="border p-2 w-full mb-4 rounded"
          value={form.reason}
          onChange={(e) =>
            setForm({ ...form, reason: e.target.value })
          }
        />

        <button className="bg-green-600 text-white px-4 py-2 rounded">
          Submit Request
        </button>
      </form>
    </div>
  );
};

export default RequestBook;