import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import API from "../services/api";

const AdminLayout = () => {

  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navItemClass =
    "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition";

  const activeClass = "bg-blue-600 text-white";
  const inactiveClass = "text-gray-300 hover:bg-slate-800";

  /*
  FETCH NOTIFICATIONS
  */

  const fetchNotifications = async () => {
    try {

      const res = await API.get("/notifications/unread");
      setNotifications(res.data);

    } catch (error) {

      console.error("Notification fetch failed");

    }
  };

  /*
  AUTO REFRESH EVERY 30s
  */

  useEffect(() => {

    fetchNotifications();

    const interval = setInterval(fetchNotifications, 30000);

    return () => clearInterval(interval);

  }, []);

  /*
  MARK AS SEEN
  */

  const markAsSeen = async (id) => {

    try {

      await API.put(`/notifications/seen/${id}`);

      setNotifications((prev) =>
        prev.filter((n) => n.id !== id)
      );

    } catch (error) {

      console.error("Notification update failed");

    }

  };

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* SIDEBAR */}

      <aside
        className={`fixed top-0 left-0 h-screen bg-slate-900 text-white flex flex-col shadow-xl transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}`}
      >

        <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-700">

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white text-xl"
          >
            ☰
          </button>

          {!collapsed && (
            <h2 className="text-lg font-bold tracking-wide">
              Library Admin
            </h2>
          )}

        </div>

        {/* NAVIGATION */}

        <nav className="flex flex-col space-y-2 p-4 flex-1">

          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            📊 {!collapsed && "Dashboard"}
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            👥 {!collapsed && "Manage Users"}
          </NavLink>

          <NavLink
            to="/admin/books"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            📚 {!collapsed && "Manage Books"}
          </NavLink>

          <NavLink
            to="/admin/issues"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            🔄 {!collapsed && "Issue / Return"}
          </NavLink>

          <NavLink
            to="/admin/members"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            👥 {!collapsed && "Members"}
          </NavLink>

          <NavLink
            to="/admin/plans"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            💳 {!collapsed && "Plans"}
          </NavLink>

          <NavLink
            to="/admin/book-requests"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            📩 {!collapsed && "Book Requests"}
          </NavLink>

          <NavLink
            to="/admin/return-requests"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            📦 {!collapsed && "Return Requests"}
          </NavLink>

          <NavLink
            to="/admin/profile"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            👤 {!collapsed && "Profile"}
          </NavLink>

        </nav>

      </aside>

      {/* MAIN AREA */}

      <div className={`${collapsed ? "ml-20" : "ml-64"} transition-all`}>

        {/* TOP NAVBAR */}

        <header className="h-16 bg-white shadow flex items-center justify-between px-6">

          <h1 className="text-lg font-semibold text-gray-700">
            Library Management System
          </h1>

          <div className="flex items-center gap-6 relative">

            {/* NOTIFICATION BELL */}

            <div className="relative">

              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="text-2xl"
              >
                🔔
              </button>

              {notifications.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs px-2 rounded-full">
                  {notifications.length}
                </span>
              )}

              {showNotifications && (

                <div className="absolute right-0 mt-3 w-80 bg-white shadow-lg rounded-lg border z-50">

                  <div className="p-3 border-b font-semibold">
                    Notifications
                  </div>

                  {notifications.length === 0 ? (

                    <div className="p-4 text-sm text-gray-500">
                      No new notifications
                    </div>

                  ) : (

                    notifications.map((n) => (

                      <div
                        key={n.id}
                        onClick={() => markAsSeen(n.id)}
                        className="p-3 border-b hover:bg-gray-100 cursor-pointer"
                      >

                        <p className="text-sm font-medium">
                          {n.title}
                        </p>

                        <p className="text-xs text-gray-500">
                          {n.message}
                        </p>

                      </div>

                    ))

                  )}

                </div>

              )}

            </div>

            {/* LOGOUT */}

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md text-sm"
            >
              Logout
            </button>

          </div>

        </header>

        <main className="p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;