import { useNavigate, Link, useLocation } from "react-router-dom";

function AdminNavbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const linkClasses = (path) =>
    `px-3 py-2 rounded-md text-sm font-medium transition ${
      location.pathname === path
        ? "bg-white text-slate-800"
        : "text-white hover:bg-slate-700"
    }`;

  return (
    <nav className="bg-slate-800 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <div className="text-xl font-bold text-white tracking-wide">
            Library Admin
          </div>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            <Link
              to="/admin/dashboard"
              className={linkClasses("/admin/dashboard")}
            >
              Home
            </Link>

            <Link
              to="/admin/profile"
              className={linkClasses("/admin/profile")}
            >
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition"
            >
              Logout
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default AdminNavbar;
