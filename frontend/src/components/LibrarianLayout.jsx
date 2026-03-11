

import React, { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const LibrarianLayout = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const navItemClass =
    "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition";

  const activeClass = "bg-blue-600 text-white";
  const inactiveClass = "text-gray-300 hover:bg-slate-800";

  return (
    <div className="bg-gray-100 min-h-screen">

      {/* SIDEBAR */}

      <aside
        className={`fixed top-0 left-0 h-screen bg-slate-900 text-white flex flex-col shadow-xl transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}`}
      >

        {/* Sidebar Header */}

        <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-700">

          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-white text-xl"
          >
            ☰
          </button>

          {!collapsed && (
            <h2 className="text-lg font-bold tracking-wide">
              Librarian
            </h2>
          )}

        </div>

        {/* Navigation */}

        <nav className="flex flex-col space-y-2 p-4 flex-1">

          <NavLink
            to="/librarian/dashboard"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            📊 {!collapsed && "Dashboard"}
          </NavLink>

          

          <NavLink
            to="/librarian/books"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            📚 {!collapsed && "Manage Books"}
          </NavLink>

          <NavLink
            to="/librarian/issues"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            🔄 {!collapsed && "Issue / Return"}
          </NavLink>

          <NavLink
            to="/librarian/members"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            👥 {!collapsed && "Members"}
          </NavLink>

          <NavLink
            to="/librarian/plans"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            💳 {!collapsed && "Plans"}
          </NavLink>

          <NavLink
            to="/librarian/book-requests"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            📩 {!collapsed && "Book Requests"}
          </NavLink>
          <NavLink
            to="/librarian/return-requests"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            📩 {!collapsed && "Return Requests"}
          </NavLink>

          <NavLink
            to="/librarian/profile"
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

          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md text-sm"
          >
            Logout
          </button>

        </header>

        <main className="p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default LibrarianLayout;