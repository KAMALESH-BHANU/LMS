// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import LandingPage from "./pages/LandingPAge";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import StudentDashboard from "./pages/student/StudentDashboard";
// import LibrarianDashboard from "./pages/librarian/LibrarianDashboard";
// import Profile from "./pages/Profile";
// import ProtectedRoute from "./components/ProtectedRoute";
// import ChangePassword from "./pages/ChangePassword";
// const App = () => {
//   return (
//     <Router>
//       <div className="min-h-screen flex flex-col">
//         <main className="flex-grow">
//           <Routes>
//             <Route path="/" element={<LandingPage />} />
//             {/* Future routes */}
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />

//             <Route path="/profile" element={<Profile />} />
//             {/* ADMIN ROUTES */}
//       <Route
//         path="/admin"
//         element={
//           <ProtectedRoute allowedRoles={["ADMIN"]}>
//             <AdminLayout />
//           </ProtectedRoute>
//         }
//       >
//         <Route path="dashboard" element={<AdminDashboard />} />

//             <Route
//               path="/student/dashboard"
//               element={
//                 <ProtectedRoute allowedRole="STUDENT">
//                   <StudentDashboard />
//                 </ProtectedRoute>
//               }
//             />

//             <Route
//               path="/librarian/dashboard"
//               element={
//                 <ProtectedRoute allowedRole="LIBRARIAN">
//                   <LibrarianDashboard />
//                 </ProtectedRoute>
//               }
//             />
//              {/* Change Password */}
//           <Route
//             path="/change-password"
//             element={
//               <ProtectedRoute allowedRoles={["STUDENT", "LIBRARIAN"]}>
//                 <ChangePassword />
//               </ProtectedRoute>
//             }
//           />

//           </Routes>
//         </main>
//       </div>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/admin/AdminDashboard";
import StudentDashboard from "./pages/student/StudentDashboard";
import LibrarianDashboard from "./pages/librarian/LibrarianDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ChangePassword from "./pages/ChangePassword";
import AdminLayout from "./components/AdminLayout";
import ManageUsers from "./pages/admin/ManageUsers";
import Profile from "./pages/admin/Profile";
import ManageBooks from "./pages/admin/ManageBooks";
import IssueBooks from "./pages/admin/IssueBooks";
import MembershipPlans from "./pages/admin/MembershipPlans";
import BookRequests from "./pages/admin/BookRequests";
import ReturnRequests from "./pages/admin/ReturnRequest";
import ManageMembers from "./pages/admin/ManageMembers";
import BrowseBooks from "./pages/student/BrowseBooks";
import MyBooks from "./pages/student/MyBooks";
import RequestBook from "./pages/student/RequestBook";

import StudentMembership from "./pages/student/StudentMembership";
import StudentProfile from "./pages/student/StudentProfile";
import StudentLayout from "./components/StudentLayout";
import ManageBook from "./pages/librarian/ManageBooks";
import ManageMember from "./pages/librarian/ManageMembers"; 
import BookRequest from "./pages/librarian/BookRequest";
import ReturnRequest from "./pages/librarian/ReturnRequest";
import IssueBook from "./pages/librarian/IssueBooks";
import MembershipPlan from "./pages/librarian/MembershipPlan";
import LibProfile from "./pages/librarian/Profile";
import LibrarianLayout from "./components/LibrarianLayout";
import BookHistory from "./pages/student/BookHistory";
//import Reports from "./pages/admin/Reports";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* ADMIN */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={["ADMIN"]}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="users" element={<ManageUsers />} />
              <Route path="profile" element={<Profile />} />
              <Route path="books" element={<ManageBooks />} />
               <Route path="members" element={<ManageMembers />} />
              <Route path="issues" element={<IssueBooks />} />
              <Route path="plans" element={<MembershipPlans />} />
              <Route path="book-requests" element={<BookRequests />} />
              <Route path="return-requests" element={<ReturnRequests />} />
              {/* <Route path="reports" element={<Reports />} /> */}
            </Route>

            {/* STUDENT */}
            <Route
              path="/student"
              element={
                <ProtectedRoute allowedRoles={["STUDENT"]}>
                  <StudentLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<StudentDashboard />} />
              <Route path="browse-books" element={<BrowseBooks />} />
              <Route path="my-books" element={<MyBooks />} />
              <Route path="book-history" element={<BookHistory />} />
              <Route path="membership" element={<StudentMembership />} />
              <Route path="profile" element={<StudentProfile />} />
            </Route>

            {/* LIBRARIAN */}
            <Route
              path="/librarian"
              element={
                <ProtectedRoute allowedRoles={["LIBRARIAN"]}>
                  <LibrarianLayout />
                </ProtectedRoute>
              }
            >
              <Route path="dashboard" element={<LibrarianDashboard />} />
              <Route path="profile" element={<LibProfile />} />
              <Route path="books" element={<ManageBook />} />
               <Route path="members" element={<ManageMember />} />
              <Route path="issues" element={<IssueBook />} />
              <Route path="plans" element={<MembershipPlan />} />
              <Route path="book-requests" element={<BookRequest />} />
              <Route path="return-requests" element={<ReturnRequest />} />
              {/* <Route path="reports" element={<Reports />} /> */}
            </Route>

            {/* CHANGE PASSWORD */}
            <Route
              path="/change-password"
              element={
                <ProtectedRoute allowedRoles={["STUDENT", "LIBRARIAN"]}>
                  <ChangePassword />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
