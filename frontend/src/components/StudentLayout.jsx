

// // import React from "react";
// // import { Link, useLocation, useNavigate } from "react-router-dom";

// // const StudentLayout = ({ children }) => {
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   const menuItems = [
// //     { name: "Dashboard", path: "/student/dashboard" },
// //     { name: "Browse Books", path: "../pages/student/BrowseBooks.jsx" },
// //     { name: "My Books", path: "../pages/student/MyBooks.jsx" },
// //     { name: "Request Book", path: "../pages/student/RequestBook.jsx" },
// //     { name: "My Membership", path: "../pages/student/StudentMembership.jsx" },
// //     { name: "Profile", path: "../pages/student/StudentProfile.jsx" },
// //   ];

// //   const handleLogout = () => {
// //     localStorage.removeItem("token");
// //     navigate("/login");
// //   };

// //   return (
// //     <div className="min-h-screen flex bg-gray-100">

// //       {/* Sidebar */}
// //       <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col justify-between">
// //         <div>
// //           <h2 className="text-2xl font-bold mb-8 text-center">
// //             🎓 Student Panel
// //           </h2>

// //           <nav className="space-y-3">
// //             {menuItems.map((item) => (
// //               <Link
// //                 key={item.name}
// //                 to={item.path}
// //                 className={`block p-3 rounded-lg transition ${
// //                   location.pathname === item.path
// //                     ? "bg-slate-700"
// //                     : "hover:bg-slate-700"
// //                 }`}
// //               >
// //                 {item.name}
// //               </Link>
// //             ))}
// //           </nav>
// //         </div>

// //         <button
// //           onClick={handleLogout}
// //           className="bg-red-600 hover:bg-red-700 p-2 rounded-lg"
// //         >
// //           Logout
// //         </button>
// //       </aside>

// //       <main className="flex-1 p-8">{children}</main>
// //     </div>
// //   );
// // };

// // export default StudentLayout;

// import React from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";

// const StudentLayout = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   const navItemClass =
//     "px-4 py-2 rounded-md transition font-medium";

//   const activeClass =
//     "bg-blue-600 text-white";

//   const inactiveClass =
//     "bg-slate-800 hover:bg-slate-700 text-gray-200";

//   return (
//     <div className="bg-gray-100 min-h-screen">

//       {/* ================= FIXED SIDEBAR ================= */}
//       <aside className="fixed top-0 left-0 w-72 h-screen bg-slate-900 text-white flex flex-col p-6 shadow-xl z-50">
//         <h2 className="text-2xl font-bold mb-8 text-center">
//           🎓 Student Panel
//         </h2>

//         <nav className="flex flex-col space-y-3 flex-1 overflow-y-auto">

//           <NavLink
//             to="/student/dashboard"
//             className={({ isActive }) =>
//               `${navItemClass} ${isActive ? activeClass : inactiveClass}`
//             }
//           >
//             📊 Dashboard
//           </NavLink>

//           <NavLink
//             to="/student/browse-books"
//             className={({ isActive }) =>
//               `${navItemClass} ${isActive ? activeClass : inactiveClass}`
//             }
//           >
//             📚 Browse Books
//           </NavLink>

//           <NavLink
//             to="/student/my-books"
//             className={({ isActive }) =>
//               `${navItemClass} ${isActive ? activeClass : inactiveClass}`
//             }
//           >
//             📖 My Books
//           </NavLink>

//           <NavLink
//             to="/student/book-history"
//             className={({ isActive }) =>
//               `${navItemClass} ${isActive ? activeClass : inactiveClass}`
//             }
//           >
//             � Book History
//           </NavLink>

//           <NavLink
//             to="/student/membership"
//             className={({ isActive }) =>
//               `${navItemClass} ${isActive ? activeClass : inactiveClass}`
//             }
//           >
//             💳 My Membership
//           </NavLink>

//           <NavLink
//             to="/student/profile"
//             className={({ isActive }) =>
//               `${navItemClass} ${isActive ? activeClass : inactiveClass}`
//             }
//           >
//             👤 Profile
//           </NavLink>

//         </nav>

//         <button
//           onClick={handleLogout}
//           className="mt-6 bg-red-600 hover:bg-red-700 transition py-2 rounded-md font-semibold"
//         >
//           Logout
//         </button>
//       </aside>

//       {/* ================= MAIN CONTENT ================= */}
//       <main className="ml-72 p-8">
//         <Outlet />
//       </main>

//     </div>
//   );
// };

// export default StudentLayout;

// import React, { useState } from "react";
// import { NavLink, Outlet, useNavigate } from "react-router-dom";

// const StudentLayout = () => {
//   const navigate = useNavigate();
//   const [collapsed, setCollapsed] = useState(false);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//   };

//   const navItemClass =
//     "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition";

//   const activeClass = "bg-blue-600 text-white";
//   const inactiveClass = "text-gray-300 hover:bg-slate-800";

//   return (
//     <div className="bg-gray-100 min-h-screen">

//       {/* SIDEBAR */}

//       <aside
//         className={`fixed top-0 left-0 h-screen bg-slate-900 text-white flex flex-col shadow-xl transition-all duration-300
//         ${collapsed ? "w-20" : "w-72"}`}
//       >

//         {/* Sidebar Header */}

//         <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-700">

//           <button
//             onClick={() => setCollapsed(!collapsed)}
//             className="text-white text-xl"
//           >
//             ☰
//           </button>

//           {!collapsed && (
//             <h2 className="text-lg font-bold tracking-wide">
//               🎓 Student Panel
//             </h2>
//           )}

//         </div>

//         {/* Navigation */}

//         <nav className="flex flex-col space-y-2 p-4 flex-1 overflow-y-auto">

//           <NavLink
//             to="/student/dashboard"
//             className={({ isActive }) =>
//               `${navItemClass} ${isActive ? activeClass : inactiveClass}`
//             }
//           >
//             📊 {!collapsed && "Dashboard"}
//           </NavLink>

//           <NavLink
//             to="/student/browse-books"
//             className={({ isActive }) =>
//               `${navItemClass} ${isActive ? activeClass : inactiveClass}`
//             }
//           >
//             📚 {!collapsed && "Browse Books"}
//           </NavLink>

//           <NavLink
//             to="/student/my-books"
//             className={({ isActive }) =>
//               `${navItemClass} ${isActive ? activeClass : inactiveClass}`
//             }
//           >
//             📖 {!collapsed && "My Books"}
//           </NavLink>

//           <NavLink
//             to="/student/book-history"
//             className={({ isActive }) =>
//               `${navItemClass} ${isActive ? activeClass : inactiveClass}`
//             }
//           >
//             📘 {!collapsed && "Book History"}
//           </NavLink>

//           <NavLink
//             to="/student/membership"
//             className={({ isActive }) =>
//               `${navItemClass} ${isActive ? activeClass : inactiveClass}`
//             }
//           >
//             💳 {!collapsed && "My Membership"}
//           </NavLink>

//           <NavLink
//             to="/student/profile"
//             className={({ isActive }) =>
//               `${navItemClass} ${isActive ? activeClass : inactiveClass}`
//             }
//           >
//             👤 {!collapsed && "Profile"}
//           </NavLink>

//         </nav>

//       </aside>

//       {/* MAIN AREA */}

//       <div className={`${collapsed ? "ml-20" : "ml-72"} transition-all`}>

//         {/* TOP NAVBAR */}

//         <header className="h-16 bg-white shadow flex items-center justify-between px-6">

//           <h1 className="text-lg font-semibold text-gray-700">
//             Library Management System
//           </h1>

//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
//           >
//             Logout
//           </button>

//         </header>

//         {/* PAGE CONTENT */}

//         <main className="p-8">
//           <Outlet />
//         </main>

//       </div>

//     </div>
//   );
// };

// export default StudentLayout;

import React, { useState, useEffect } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import API from "../services/api";

const StudentLayout = () => {

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
  AUTO REFRESH NOTIFICATIONS
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
        ${collapsed ? "w-20" : "w-72"}`}
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
              🎓 Student Panel
            </h2>
          )}

        </div>

        {/* NAVIGATION */}

        <nav className="flex flex-col space-y-2 p-4 flex-1 overflow-y-auto">

          <NavLink
            to="/student/dashboard"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            📊 {!collapsed && "Dashboard"}
          </NavLink>

          <NavLink
            to="/student/browse-books"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            📚 {!collapsed && "Browse Books"}
          </NavLink>

          <NavLink
            to="/student/my-books"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            📖 {!collapsed && "My Books"}
          </NavLink>

          <NavLink
            to="/student/book-history"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            📘 {!collapsed && "Book History"}
          </NavLink>

          <NavLink
            to="/student/membership"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            💳 {!collapsed && "My Membership"}
          </NavLink>

          <NavLink
            to="/student/profile"
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeClass : inactiveClass}`
            }
          >
            👤 {!collapsed && "Profile"}
          </NavLink>

        </nav>

      </aside>

      {/* MAIN AREA */}

      <div className={`${collapsed ? "ml-20" : "ml-72"} transition-all`}>

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

              {/* DROPDOWN */}

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
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
            >
              Logout
            </button>

          </div>

        </header>

        {/* PAGE CONTENT */}

        <main className="p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default StudentLayout;