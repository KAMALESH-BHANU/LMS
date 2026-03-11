// src/pages/student/StudentMembership.jsx

import React from "react";

const StudentMembership = () => {
  const currentPlan = "Basic"; // static for now

  const plans = [
    {
      name: "Basic",
      price: "₹0",
      duration: "Unlimited",
      borrowLimit: 2,
      priority: "Normal",
      features: [
        "Borrow up to 2 books at a time",
        "If 1 book is borrowed, only 1 more can be borrowed",
        "Standard book request approval",
        "Access to all available library books",
      ],
    },
    {
      name: "Pro",
      price: "₹99",
      duration: "1 Month",
      borrowLimit: 5,
      priority: "Higher than Basic",
      features: [
        "Borrow up to 5 books at a time",
        "Book requests prioritized over Basic members",
        "Faster approval process",
        "Early access to newly added books",
        "Email reminders for due dates",
      ],
    },
    {
      name: "Premium",
      price: "₹199",
      duration: "1 Month",
      borrowLimit: 15,
      priority: "Highest Priority",
      features: [
        "Borrow up to 15 books at a time",
        "Highest book request priority",
        "Instant borrow approval (if available)",
        "Access to exclusive books collection",
        "Extended due dates",
        "Priority customer support",
        "Special discounts on late fines",
      ],
    },
  ];

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8">My Membership</h2>

      {/* Current Membership */}
      <div className="bg-slate-900 text-white rounded-xl p-6 mb-10 shadow-lg">
        <h3 className="text-xl font-semibold mb-2">
          Current Membership
        </h3>
        <p className="text-lg">
          You are currently on:{" "}
          <span className="font-bold text-green-400">
            {currentPlan}
          </span>
        </p>
      </div>

      {/* Membership Cards */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`rounded-xl shadow-lg p-6 border-2 transition ${
              currentPlan === plan.name
                ? "border-green-500 bg-green-50"
                : "border-gray-200 bg-white"
            }`}
          >
            <h3 className="text-2xl font-bold mb-2">
              {plan.name}
            </h3>

            <p className="text-3xl font-semibold text-blue-600 mb-1">
              {plan.price}
            </p>

            <p className="text-gray-500 mb-4">
              Duration: {plan.duration}
            </p>

            <div className="mb-4">
              <p className="font-semibold">
                Borrow Limit: {plan.borrowLimit} books
              </p>
              <p className="text-sm text-gray-600">
                Request Priority: {plan.priority}
              </p>
            </div>

            <ul className="space-y-2 mb-6 text-sm">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-green-600 mr-2">✔</span>
                  {feature}
                </li>
              ))}
            </ul>

            {currentPlan !== plan.name && (
              <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                Upgrade to {plan.name}
              </button>
            )}

            {currentPlan === plan.name && (
              <div className="text-center text-green-600 font-semibold">
                Current Plan
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentMembership;