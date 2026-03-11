
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
        API.get("/api/lib/dashboard"),
        API.get("/api/lib/analytics"),
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