

// // import { useEffect, useState } from "react";
// // import API from "../../services/api";
// // import {
// //   BarChart,
// //   Bar,
// //   PieChart,
// //   Pie,
// //   Cell,
// //   Tooltip,
// //   XAxis,
// //   YAxis,
// //   CartesianGrid,
// //   ResponsiveContainer,
// //   Legend,
// // } from "recharts";

// // const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"];

// // const Dashboard = () => {
// //   const [stats, setStats] = useState(null);
// //   const [analytics, setAnalytics] = useState(null);

// //   useEffect(() => {
// //     fetchAllData();
// //   }, []);

// //   const fetchAllData = async () => {
// //     try {
// //       const [statsRes, analyticsRes] = await Promise.all([
// //         API.get("/api/admin/dashboard"),
// //         API.get("/api/admin/analytics"),
// //       ]);

// //       setStats(statsRes.data);
// //       setAnalytics(analyticsRes.data);
// //     } catch (error) {
// //       console.error("Dashboard error:", error);
// //     }
// //   };

// //   if (!stats || !analytics)
// //     return (
// //       <div className="p-8 bg-slate-900 min-h-screen text-white">
// //         Loading dashboard...
// //       </div>
// //     );

// //   /* ---------------- Chart Data ---------------- */

// //   const memberData = [
// //     { name: "Students", value: analytics.members.students },
// //     { name: "Librarians", value: analytics.members.librarians },
// //   ];

// //   const genreData = Object.keys(analytics.genres).map((key) => ({
// //     name: key,
// //     value: analytics.genres[key],
// //   }));

// //   const priceData = [
// //     { name: "< 200", value: analytics.priceRanges.below200 },
// //     { name: "200 - 500", value: analytics.priceRanges["200to500"] },
// //     { name: "500 - 1000", value: analytics.priceRanges["500to1000"] },
// //     { name: "> 1000", value: analytics.priceRanges.above1000 },
// //   ];

// //   const issueData = [
// //     { name: "Issued", value: analytics.issues.issued },
// //     { name: "Returned", value: analytics.issues.returned },
// //     { name: "Lost", value: analytics.issues.lost },
// //   ];

// //   return (
// //     <div className="p-8 bg-white min-h-screen space-y-12">

// //       {/* ================= HEADER ================= */}
// //       <div>
// //         <h2 className="text-3xl font-bold text-black">
// //           Library Analytics Dashboard
// //         </h2>
// //         <p className="text-black-400 mt-2">
// //           Overview of books, members and library activities
// //         </p>
// //       </div>

// //       {/* ================= STAT CARDS ================= */}
// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
// //         <StatCard title="Total Books" value={stats.books} color="from-blue-500 to-blue-700" />
// //         <StatCard title="Total Members" value={stats.members} color="from-green-500 to-green-700" />
// //         <StatCard title="Active Issues" value={stats.issues} color="from-yellow-500 to-yellow-600" />
// //         <StatCard title="Available Books" value={stats.available} color="from-purple-500 to-purple-700" />
// //       </div>

// //       {/* ================= CHARTS ================= */}
// //       <div className="grid md:grid-cols-2 gap-8">

// //         {/* Members Pie */}
// //         <ChartCard title="Members Distribution">
// //           <ResponsiveContainer width="100%" height={300}>
// //             <PieChart>
// //               <Pie data={memberData} dataKey="value" outerRadius={100}>
// //                 {memberData.map((entry, index) => (
// //                   <Cell key={index} fill={COLORS[index % COLORS.length]} />
// //                 ))}
// //               </Pie>
// //               <Tooltip />
// //               <Legend />
// //             </PieChart>
// //           </ResponsiveContainer>
// //         </ChartCard>

// //         {/* Genre Bar */}
// //         <ChartCard title="Books by Genre">
// //           <ResponsiveContainer width="100%" height={300}>
// //             <BarChart data={genreData}>
// //               <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
// //               <XAxis dataKey="name" stroke="#CBD5E1" />
// //               <YAxis stroke="#CBD5E1" />
// //               <Tooltip />
// //               <Legend />
// //               <Bar dataKey="value" fill="#3B82F6" />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </ChartCard>

// //         {/* Price Range */}
// //         <ChartCard title="Books by Price Range">
// //           <ResponsiveContainer width="100%" height={300}>
// //             <BarChart data={priceData}>
// //               <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
// //               <XAxis dataKey="name" stroke="#CBD5E1" />
// //               <YAxis stroke="#CBD5E1" />
// //               <Tooltip />
// //               <Bar dataKey="value" fill="#10B981" />
// //             </BarChart>
// //           </ResponsiveContainer>
// //         </ChartCard>

// //         {/* Issue Pie */}
// //         <ChartCard title="Issue Status Overview">
// //           <ResponsiveContainer width="100%" height={300}>
// //             <PieChart>
// //               <Pie data={issueData} dataKey="value" outerRadius={100}>
// //                 {issueData.map((entry, index) => (
// //                   <Cell key={index} fill={COLORS[index % COLORS.length]} />
// //                 ))}
// //               </Pie>
// //               <Tooltip />
// //               <Legend />
// //             </PieChart>
// //           </ResponsiveContainer>
// //         </ChartCard>

// //       </div>
// //     </div>
// //   );
// // };

// // /* ================= COMPONENTS ================= */

// // const StatCard = ({ title, value, color }) => (
// //   <div className={`bg-gradient-to-r ${color} p-6 rounded-xl shadow-xl hover:scale-105 transition transform`}>
// //     <h3 className="text-sm text-white/80 uppercase tracking-wide">
// //       {title}
// //     </h3>
// //     <p className="text-4xl font-bold text-white mt-3">
// //       {value ?? 0}
// //     </p>
// //   </div>
// // );

// // const ChartCard = ({ title, children }) => (
// //   <div className="bg-slate-800 rounded-xl shadow-xl p-6">
// //     <h3 className="text-lg font-semibold mb-4 text-white">
// //       {title}
// //     </h3>
// //     {children}
// //   </div>
// // );

// // export default Dashboard;

// import { useEffect, useState } from "react";
// import API from "../../services/api";
// import {
//   BarChart,
//   Bar,
//   PieChart,
//   Pie,
//   Cell,
//   Tooltip,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   ResponsiveContainer,
//   Legend,
// } from "recharts";

// /* ================= PREMIUM COLOR PALETTE ================= */
// const PIE_COLORS = ["#6366F1", "#F43F5E", "#06B6D4", "#F59E0B", "#8B5CF6"];

// const Dashboard = () => {
//   const [stats, setStats] = useState(null);
//   const [analytics, setAnalytics] = useState(null);

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const fetchAllData = async () => {
//     try {
//       const [statsRes, analyticsRes] = await Promise.all([
//         API.get("/api/admin/dashboard"),
//         API.get("/api/admin/analytics"),
//       ]);

//       setStats(statsRes.data);
//       setAnalytics(analyticsRes.data);
//     } catch (error) {
//       console.error("Dashboard error:", error);
//     }
//   };

//   if (!stats || !analytics)
//     return (
//       <div className="p-8 bg-white min-h-screen">
//         Loading dashboard...
//       </div>
//     );

//   /* ---------------- Chart Data ---------------- */

//   const memberData = [
//     { name: "Students", value: analytics.members.students },
//     { name: "Librarians", value: analytics.members.librarians },
//   ];

//   const genreData = Object.keys(analytics.genres).map((key) => ({
//     name: key,
//     value: analytics.genres[key],
//   }));

//   const priceData = [
//     { name: "< 200", value: analytics.priceRanges.below200 },
//     { name: "200 - 500", value: analytics.priceRanges["200to500"] },
//     { name: "500 - 1000", value: analytics.priceRanges["500to1000"] },
//     { name: "> 1000", value: analytics.priceRanges.above1000 },
//   ];

//   const issueData = [
//     { name: "Issued", value: analytics.issues.issued },
//     { name: "Returned", value: analytics.issues.returned },
//     { name: "Lost", value: analytics.issues.lost },
//   ];

//   return (
//     <div className="p-10 bg-gray-50 min-h-screen space-y-14">

//       {/* ================= HEADER ================= */}
//       <div>
//         <h2 className="text-3xl font-bold text-gray-800">
//           Library Analytics Dashboard
//         </h2>
//         <p className="text-gray-500 mt-2">
//           Overview of books, members and library activities
//         </p>
//       </div>

//       {/* ================= STAT CARDS ================= */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
//         <StatCard title="Total Books" value={stats.books} color="from-indigo-500 to-indigo-700" />
//         <StatCard title="Total Members" value={stats.members} color="from-emerald-500 to-teal-600" />
//         <StatCard title="Active Issues" value={stats.issues} color="from-amber-400 to-orange-500" />
//         <StatCard title="Available Books" value={stats.available} color="from-rose-500 to-pink-600" />
//       </div>

//       {/* ================= CHARTS ================= */}
//       <div className="grid md:grid-cols-2 gap-8">

//         {/* Members Pie */}
//         <ChartCard title="Members Distribution">
//           <ResponsiveContainer width="100%" height={320}>
//             <PieChart>
//               <Pie data={memberData} dataKey="value" outerRadius={110}>
//                 {memberData.map((entry, index) => (
//                   <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         {/* Genre Bar */}
//         <ChartCard title="Books by Genre">
//           <ResponsiveContainer width="100%" height={320}>
//             <BarChart data={genreData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
//               <XAxis dataKey="name" stroke="#64748B" />
//               <YAxis stroke="#64748B" />
//               <Tooltip />
//               <Legend />
//               <Bar
//                 dataKey="value"
//                 fill="#6366F1"
//                 radius={[6, 6, 0, 0]}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         {/* Price Range */}
//         <ChartCard title="Books by Price Range">
//           <ResponsiveContainer width="100%" height={320}>
//             <BarChart data={priceData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
//               <XAxis dataKey="name" stroke="#64748B" />
//               <YAxis stroke="#64748B" />
//               <Tooltip />
//               <Bar
//                 dataKey="value"
//                 fill="#F59E0B"
//                 radius={[6, 6, 0, 0]}
//               />
//             </BarChart>
//           </ResponsiveContainer>
//         </ChartCard>

//         {/* Issue Pie */}
//         <ChartCard title="Issue Status Overview">
//           <ResponsiveContainer width="100%" height={320}>
//             <PieChart>
//               <Pie data={issueData} dataKey="value" outerRadius={110}>
//                 {issueData.map((entry, index) => (
//                   <Cell key={index} fill={PIE_COLORS[index % PIE_COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip />
//               <Legend />
//             </PieChart>
//           </ResponsiveContainer>
//         </ChartCard>

//       </div>
//     </div>
//   );
// };

// /* ================= COMPONENTS ================= */

// const StatCard = ({ title, value, color }) => (
//   <div className={`bg-gradient-to-r ${color} p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform duration-300`}>
//     <h3 className="text-sm text-white/80 uppercase tracking-wide">
//       {title}
//     </h3>
//     <p className="text-4xl font-bold text-white mt-3">
//       {value ?? 0}
//     </p>
//   </div>
// );

// const ChartCard = ({ title, children }) => (
//   <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100">
//     <h3 className="text-lg font-semibold mb-5 text-gray-700">
//       {title}
//     </h3>
//     {children}
//   </div>
// );

// export default Dashboard;

import { useEffect, useState } from "react";
import API from "../../services/api";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

/* ================= MODERN COLOR PALETTE ================= */

const COLORS = [
  "#6366F1", // Indigo
  "#14B8A6", // Teal
  "#F97316", // Orange
  "#EC4899", // Pink
  "#FACC15", // Amber
];

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      const [statsRes, analyticsRes] = await Promise.all([
        API.get("/api/admin/dashboard"),
        API.get("/api/admin/analytics"),
      ]);

      setStats(statsRes.data);
      setAnalytics(analyticsRes.data);
    } catch (error) {
      console.error("Dashboard error:", error);
    }
  };

  if (!stats || !analytics)
    return (
      <div className="p-8 bg-gray-50 min-h-screen text-gray-800">
        Loading dashboard...
      </div>
    );

  /* ================= CHART DATA ================= */

  const memberData = [
    { name: "Students", value: analytics.members.students },
    { name: "Librarians", value: analytics.members.librarians },
  ];

  const genreData = Object.keys(analytics.genres).map((key) => ({
    name: key,
    value: analytics.genres[key],
  }));

  const priceData = [
    { name: "< 200", value: analytics.priceRanges.below200 },
    { name: "200 - 500", value: analytics.priceRanges["200to500"] },
    { name: "500 - 1000", value: analytics.priceRanges["500to1000"] },
    { name: "> 1000", value: analytics.priceRanges.above1000 },
  ];

  const issueData = [
    { name: "Issued", value: analytics.issues.issued },
    { name: "Returned", value: analytics.issues.returned },
    { name: "Lost", value: analytics.issues.lost },
  ];

  return (
    <div className="p-10 bg-gray-50 min-h-screen space-y-12">

      {/* ================= HEADER ================= */}
      <div>
        <h2 className="text-4xl font-bold text-gray-800">
          Library Analytics Dashboard
        </h2>
        <p className="text-gray-500 mt-2 text-lg">
          Overview of books, members, and library activities
        </p>
      </div>

      {/* ================= STAT CARDS ================= */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <StatCard
          title="Total Books"
          value={stats.books}
          color="from-indigo-500 via-indigo-600 to-indigo-700"
        />
        <StatCard
          title="Total Members"
          value={stats.members}
          color="from-teal-400 via-teal-500 to-teal-600"
        />
        <StatCard
          title="Active Issues"
          value={stats.issues}
          color="from-amber-400 via-amber-500 to-amber-600"
        />
        <StatCard
          title="Available Books"
          value={stats.available}
          color="from-pink-500 via-rose-500 to-red-500"
        />
      </div>

      {/* ================= CHARTS ================= */}
      <div className="grid md:grid-cols-2 gap-10">

        {/* Members Pie */}
        <ChartCard title="Members Distribution">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={memberData} dataKey="value" outerRadius={110}>
                {memberData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Genre Bar */}
        <ChartCard title="Books by Genre">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={genreData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="value"
                fill="#6366F1"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Price Range */}
        <ChartCard title="Books by Price Range">
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="name" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip />
              <Bar
                dataKey="value"
                fill="#F97316"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Issue Pie */}
        <ChartCard title="Issue Status Overview">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie data={issueData} dataKey="value" outerRadius={110}>
                {issueData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

      </div>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const StatCard = ({ title, value, color }) => (
  <div
    className={`bg-gradient-to-r ${color} p-8 rounded-2xl shadow-xl hover:scale-105 transition duration-300`}
  >
    <h3 className="text-sm text-white/80 uppercase tracking-wider">
      {title}
    </h3>
    <p className="text-5xl font-bold text-white mt-4">
      {value ?? 0}
    </p>
  </div>
);

const ChartCard = ({ title, children }) => (
  <div className="bg-white border border-gray-200 rounded-2xl shadow-lg p-8">
    <h3 className="text-xl font-semibold mb-6 text-gray-800">
      {title}
    </h3>
    {children}
  </div>
);

export default Dashboard;