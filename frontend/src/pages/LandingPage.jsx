import React from "react";
import Navbar from "../components/Navbar";
const LandingPage = () => {
  return (
    <div className="w-full font-sans text-gray-800">
      <Navbar />
      {/* HERO SECTION */}
      <section className="relative h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center text-center">
        <div className="max-w-3xl px-6">
          <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
            📚 Smart Library <br />
            <span className="text-yellow-400">Management System</span>
          </h1>

          <p className="mt-6 text-lg text-gray-300">
            A modern digital library platform designed for students to explore,
            borrow, and manage academic resources effortlessly.
          </p>

          <div className="mt-10 flex justify-center gap-4">
            <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
              Explore Library
            </button>

            <button className="border border-gray-400 text-gray-200 px-6 py-3 rounded-lg hover:bg-gray-700 transition">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 bg-gray-50" id="about">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">📖 About the System</h2>

          <p className="text-gray-600 text-lg leading-relaxed">
            The Library Management System is a web-based application built using
            <span className="font-semibold"> Java Spring Boot</span> to simplify
            library usage for students. It enables quick book discovery,
            transparent borrowing, real-time availability, and automated
            notifications — creating a smooth and modern learning experience.
          </p>
        </div>
      </section>

      {/* STUDENT FEATURES */}
      <section className="py-20 bg-white" id="features">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-14">
            ✨ Student Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              title="🔍 Smart Book Search"
              desc="Search books by title, author, or category with live availability updates."
            />
            <FeatureCard
              title="📅 Borrow & Return Tracking"
              desc="View issued books, due dates, and return history in one dashboard."
            />
            <FeatureCard
              title="🔔 Automated Notifications"
              desc="Get reminders for due dates, reservations, and important updates."
            />
            <FeatureCard
              title="📊 Reading Insights"
              desc="Track your borrowing activity and improve study planning."
            />
          </div>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-10">
            🎯 Outcomes & Benefits
          </h2>

          <ul className="space-y-4 text-lg text-gray-700">
            <li>✔ Easy access to academic resources</li>
            <li>✔ Reduced manual effort and confusion</li>
            <li>✔ Time-efficient borrowing experience</li>
            <li>✔ Transparent book availability</li>
            <li>✔ Digitally modernized library environment</li>
          </ul>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 bg-slate-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">
          🚀 Start Your Digital Library Journey
        </h2>

        <p className="text-gray-300 mb-8 max-w-xl mx-auto">
          Discover a smarter and more organized way to engage with your library
          — designed entirely for students.
        </p>

        <button className="bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
          Get Started
        </button>
      </section>

     {/* FOOTER */}
<footer className="bg-black text-gray-300">
  <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">

    {/* About Section */}
    <div>
      <h2 className="text-white text-lg font-semibold mb-4">
        Library Management System
      </h2>
      <p className="text-gray-400">
        A digital platform for managing books, users, and borrowing records efficiently.
        Designed for academic institutions and libraries.
      </p>
    </div>

    {/* Quick Links */}
    <div>
      <h3 className="text-white font-semibold mb-4">Quick Links</h3>
      <ul className="space-y-2">
        <li><a href="/" className="hover:text-white transition">Home</a></li>
        <li><a href="/books" className="hover:text-white transition">Books</a></li>
        <li><a href="/login" className="hover:text-white transition">Login</a></li>
        <li><a href="/register" className="hover:text-white transition">Register</a></li>
      </ul>
    </div>

    {/* Customer Support */}
    <div>
      <h3 className="text-white font-semibold mb-4">Support</h3>
      <ul className="space-y-2">
        <li><a href="#" className="hover:text-white transition">FAQs</a></li>
        <li><a href="#" className="hover:text-white transition">Help Center</a></li>
        <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
        <li><a href="#" className="hover:text-white transition">Terms & Conditions</a></li>
      </ul>
    </div>

    {/* Contact Section */}
    <div>
      <h3 className="text-white font-semibold mb-4">Contact Us</h3>
      <ul className="space-y-2">
        <li>Email: support@librarysystem.com</li>
        <li>Phone: +1 234 567 890</li>
        <li>Address: 123 Academic Street, City</li>
      </ul>

      {/* Social Icons Placeholder */}
      <div className="flex space-x-4 mt-4">
        <a href="#" className="hover:text-white transition">Facebook</a>
        <a href="#" className="hover:text-white transition">Twitter</a>
        <a href="#" className="hover:text-white transition">LinkedIn</a>
      </div>
    </div>

  </div>

  {/* Bottom Bar */}
  <div className="border-t border-gray-700 text-center py-4 text-gray-500 text-xs">
    © 2026 Library Management System | All Rights Reserved
  </div>
</footer>

    </div>
  );
};

/* Reusable Feature Card */
const FeatureCard = ({ title, desc }) => (
  <div className="bg-gray-50 p-6 rounded-xl shadow hover:shadow-lg transition">
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{desc}</p>
  </div>
);

export default LandingPage;
