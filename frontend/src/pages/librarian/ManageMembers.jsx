
import { useEffect, useState } from "react";
import API from "../../services/api";

const ManageMembers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, [page, search, roleFilter]);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/lib", {
        params: { page, size: 5, search, role: roleFilter },
      });
      setUsers(res.data.content);
      setTotalPages(res.data.totalPages);
    } finally {
      setLoading(false);
    }
  };

  const toggleActive = async (id) => {
    await API.patch(`/api/lib/${id}/toggle`);
    fetchUsers();
  };

  const updateRole = async (id, role) => {
    await API.patch(`/api/lib/${id}/role`, { role });
    fetchUsers();
  };

  

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    await API.delete(`/api/lib/${id}`);
    fetchUsers();
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-semibold mb-6 text-gray-800">
        Manage Users
      </h2>

      {/* Search & Filter */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          placeholder="Search by name or email..."
          className="border px-4 py-2 rounded-lg w-64 shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-4 py-2 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none"
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="STUDENT">Student</option>
          <option value="LIBRARIAN">Librarian</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow-lg">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Active</th>
              <th className="px-6 py-3">Approval</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-500">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((u) => (
                <tr
                  key={u.id}
                  className="hover:bg-gray-50 transition duration-150"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {u.fullName}
                  </td>

                  <td className="px-6 py-4 text-gray-600">
                    {u.email}
                  </td>

                  <td className="px-6 py-4">
                    <select
                      value={u.role}
                      onChange={(e) =>
                        updateRole(u.id, e.target.value)
                      }
                      className="border rounded-md px-2 py-1 text-sm"
                    >
                      <option value="STUDENT">Student</option>
                      <option value="LIBRARIAN">Librarian</option>
                    </select>
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        u.active
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {u.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    {u.approvalStatus === "PENDING" ? (
                      <button
                        onClick={() => approveUser(u.id)}
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-xs"
                      >
                        ✅
                      </button>
                    ) : (
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          u.approvalStatus === "APPROVED"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {u.approvalStatus}
                      </span>
                    )}
                  </td>

                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => toggleActive(u.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-xs"
                    >
                      Toggle
                    </button>

                    <button
                      onClick={() => deleteUser(u.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-xs"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Prev
        </button>

        <span className="text-gray-600">
          Page {page + 1} of {totalPages}
        </span>

        <button
          onClick={() => setPage(page + 1)}
          disabled={page + 1 >= totalPages}
          className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageMembers;