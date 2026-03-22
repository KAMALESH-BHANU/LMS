

// // import React, { useEffect, useState } from "react";
// // import API from "../../services/api";

// // const StudentDashboard = () => {

// //   const [studentName, setStudentName] = useState("");

// //   const [booksIssued, setBooksIssued] = useState(0);
// //   const [pendingReturns, setPendingReturns] = useState(0);
// //   const [fineAmount, setFineAmount] = useState(0);

// //   const [overdueBooks, setOverdueBooks] = useState([]);

// //   const [membershipPlan, setMembershipPlan] = useState("");
// //   const [borrowLimit, setBorrowLimit] = useState(0);
// //   const [remainingBooks, setRemainingBooks] = useState(0);

// //   const [showQR, setShowQR] = useState(false);

// //   useEffect(() => {
// //     loadDashboard();
// //   }, []);

// //   const loadDashboard = async () => {

// //     try {

// //       const memberId = localStorage.getItem("memberId");
// //       if (!memberId) return;

// //       /* MEMBER INFO */

// //       const memberRes = await API.get(`/api/members/${memberId}`);
// //       const member = memberRes.data;

// //       setStudentName(
// //         `${member?.user?.firstName || ""} ${member?.user?.lastName || ""}`
// //       );

// //       const plan = member?.plan?.name || "Basic";
// //       const limit = member?.plan?.borrowLimit || 2;

// //       setMembershipPlan(plan);
// //       setBorrowLimit(limit);

// //       /* ISSUES */

// //       const res = await API.get("/api/issues", {
// //         params: { memberId }
// //       });

// //       const issues = res.data || [];
// //       // console.log("Issues:", issues);
// //       const issued = issues.filter(i => i.status === "ISSUED");

// //       setBooksIssued(issues.length);
// //       setPendingReturns(issued.length);
// //       setRemainingBooks(limit - issued.length);

// //       /* FINE + OVERDUE */

// //       let totalFine = 0;
// //       const overdue = [];

// //       issues.forEach(issue => {

// //         if (issue.penalty) {
// //           totalFine += issue.penalty;
// //         }

// //         if (issue.status === "ISSUED") {

// //           const today = new Date();
// //           const dueDate = new Date(issue.dueDate);

// //           if (today > dueDate) {

// //             const diff = today - dueDate;
// //             const daysLate = Math.floor(diff / (1000 * 60 * 60 * 24));

// //             const fine = daysLate * 10;
// //             totalFine += fine;

// //             overdue.push({
// //               book: issue.book?.title || issue.bookTitle || "Book",
// //               dueDate: new Date(issue.dueDate).toLocaleDateString(),
// //               daysLate,
// //               fine
// //             });

// //           }

// //         }

// //       });

// //       setFineAmount(totalFine);
// //       setOverdueBooks(overdue);

// //     } catch (err) {
// //       console.error("Dashboard error:", err);
// //     }

// //   };

// //   /* CONFIRM PAYMENT */

// //   const confirmPayment = async () => {

// //     try {

// //       const memberId = localStorage.getItem("memberId");

// //       await API.post("/api/payments/pay", {
// //         memberId,
// //         amount: fineAmount
// //       });

// //       alert("Payment Successful ✅");

// //       setShowQR(false);

// //       loadDashboard();

// //     } catch (err) {

// //       console.error(err);
// //       alert("Payment Failed");

// //     }

// //   };

// //   return (

// //     <div className="p-6">

// //       <h1 className="text-3xl font-bold mb-8">
// //         Welcome {studentName} 👋
// //       </h1>

// //       {/* DASHBOARD CARDS */}

// //       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

// //         <div className="bg-slate-900 text-white p-6 rounded-xl shadow">
// //           <p>Total Books Issued</p>
// //           <h2 className="text-3xl text-blue-400">{booksIssued}</h2>
// //         </div>

// //         <div className="bg-slate-900 text-white p-6 rounded-xl shadow">
// //           <p>Pending Returns</p>
// //           <h2 className="text-3xl text-red-400">{pendingReturns}</h2>
// //         </div>

// //         <div className="bg-slate-900 text-white p-6 rounded-xl shadow">

// //           <p>Fine Amount</p>

// //           <h2 className="text-3xl text-yellow-400">
// //             ₹{fineAmount}
// //           </h2>

// //           {fineAmount > 0 && (

// //             <button
// //               onClick={() => setShowQR(true)}
// //               className="mt-3 bg-green-500 hover:bg-green-600 px-4 py-2 rounded w-full"
// //             >
// //               Pay Fine
// //             </button>

// //           )}

// //         </div>

// //         <div className="bg-slate-900 text-white p-6 rounded-xl shadow">
// //           <p>Overdue Books</p>
// //           <h2 className="text-3xl text-orange-400">
// //             {overdueBooks.length}
// //           </h2>
// //         </div>

// //       </div>

// //       {/* MEMBERSHIP */}

// //       <div className="mt-10 bg-white p-6 rounded-xl shadow">

// //         <h2 className="text-xl font-semibold mb-3">
// //           Membership Info
// //         </h2>

// //         <p>Plan: <b>{membershipPlan}</b></p>
// //         <p>Borrow Limit: <b>{borrowLimit}</b></p>
// //         <p>Remaining Books: <b>{remainingBooks}</b></p>

// //       </div>

// //       {/* OVERDUE BOOKS */}

// //       {overdueBooks.length > 0 && (

// //         <div className="mt-10 bg-white p-6 rounded-xl shadow">

// //           <h2 className="text-xl font-semibold mb-4">
// //             Overdue Books
// //           </h2>

// //           <table className="w-full border">

// //             <thead className="bg-gray-100">

// // //               <tr>
// // //                 <th className="p-2">Book</th>
// // //                 <th className="p-2">Due Date</th>
// // //                 <th className="p-2">Days Late</th>
// // //                 <th className="p-2">Fine</th>
// // //               </tr>

// // //             </thead>

// // //             <tbody>

// // //               {overdueBooks.map((b, i) => (

// // //                 <tr key={i} className="text-center border-t">

// // //                   <td className="p-2">{b.book}</td>
// // //                   <td className="p-2">{b.dueDate}</td>
// // //                   <td className="p-2">{b.daysLate}</td>
// // //                   <td className="p-2 text-red-500">₹{b.fine}</td>

// // //                 </tr>

// // //               ))}

// // //             </tbody>

// // //           </table>

// // //         </div>

// // //       )}

// // //       {/* QR PAYMENT POPUP */}

// // //       {showQR && (

// // //         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">

// // //           <div className="bg-slate-900 text-white p-6 rounded-xl shadow-lg w-80 text-center">

// // //             <h2 className="text-xl font-semibold mb-4">
// // //               Scan to Pay ₹{fineAmount}
// // //             </h2>

// // //             <img
// // //               src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=LibraryFinePayment"
// // //               alt="QR Code"
// // //               className="mx-auto mb-4"
// // //             />

// // //             <p className="text-gray-300 text-sm mb-4">
// // //               Scan using any UPI app
// // //             </p>

// // //             <button
// // //               onClick={confirmPayment}
// // //               className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded w-full"
// // //             >
// // //               I Have Paid
// // //             </button>

// // //             <button
// // //               onClick={() => setShowQR(false)}
// // //               className="mt-3 text-gray-300 text-sm"
// // //             >
// // //               Cancel
// // //             </button>

// // //           </div>

// // //         </div>

// // //       )}

// // //     </div>

// // //   );

// // // };

// // // export default StudentDashboard;

// import React, { useEffect, useState } from "react";
// import API from "../../services/api";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(process.env.VITE_STRIPE_PUBLISHABLE_KEY); // 🔴 replace

// const StudentDashboard = () => {

//   const [studentName, setStudentName] = useState("");

//   const [booksIssued, setBooksIssued] = useState(0);
//   const [pendingReturns, setPendingReturns] = useState(0);
//   const [fineAmount, setFineAmount] = useState(0);

//   const [overdueBooks, setOverdueBooks] = useState([]);

//   const [membershipPlan, setMembershipPlan] = useState("");
//   const [borrowLimit, setBorrowLimit] = useState(0);
//   const [remainingBooks, setRemainingBooks] = useState(0);

//   const [loadingPayment, setLoadingPayment] = useState(false);

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   const loadDashboard = async () => {
//     try {

//       const memberId = localStorage.getItem("memberId");
//       if (!memberId) return;

//       /* MEMBER INFO */
//       const memberRes = await API.get(`/api/members/${memberId}`);
//       const member = memberRes.data;

//       setStudentName(
//         `${member?.user?.firstName || ""} ${member?.user?.lastName || ""}`
//       );

//       const plan = member?.plan?.name || "Basic";
//       const limit = member?.plan?.borrowLimit || 2;

//       setMembershipPlan(plan);
//       setBorrowLimit(limit);

//       /* ISSUES */
//       const res = await API.get("/api/issues", {
//         params: { memberId }
//       });

//       const issues = res.data || [];
//       const issued = issues.filter(i => i.status === "ISSUED");

//       setBooksIssued(issues.length);
//       setPendingReturns(issued.length);
//       setRemainingBooks(limit - issued.length);

//       /* FINE + OVERDUE */
//       let totalFine = 0;
//       const overdue = [];

//       issues.forEach(issue => {

//         if (issue.penalty) {
//           totalFine += issue.penalty;
//         }

//         if (issue.status === "ISSUED") {

//           const today = new Date();
//           const dueDate = new Date(issue.dueDate);

//           if (today > dueDate) {

//             const diff = today - dueDate;
//             const daysLate = Math.floor(diff / (1000 * 60 * 60 * 24));

//             const fine = daysLate * 10;
//             totalFine += fine;

//             overdue.push({
//               book: issue.book?.title || issue.bookTitle || "Book",
//               dueDate: new Date(issue.dueDate).toLocaleDateString(),
//               daysLate,
//               fine
//             });

//           }

//         }

//       });

//       setFineAmount(totalFine);
//       setOverdueBooks(overdue);

//     } catch (err) {
//       console.error("Dashboard error:", err);
//     }
//   };

//   /* ✅ STRIPE PAYMENT FLOW */

//   const handlePayment = async () => {

//     try {

//       setLoadingPayment(true);

//       const memberId = localStorage.getItem("memberId");

//       // 1️⃣ Create Payment Intent
//       const res = await API.post("/api/payments/create-intent", {
//         memberId
//       });

//       const { clientSecret } = res.data;

//       const stripe = await stripePromise;

//       // 2️⃣ Open Stripe Payment UI (Card)
//       const result = await stripe.confirmCardPayment(clientSecret, {
//         payment_method: {
//           card: {
//             // Stripe auto UI fallback (basic)
//           },
//         },
//       });

//       if (result.error) {
//         alert(result.error.message);
//         setLoadingPayment(false);
//         return;
//       }

//       // 3️⃣ Confirm in backend
//       await API.post("/api/payments/confirm", {
//         paymentIntentId: result.paymentIntent.id,
//         memberId
//       });

//       alert("Payment Successful ✅");

//       loadDashboard();

//     } catch (err) {

//       console.error(err);
//       alert("Payment Failed");

//     } finally {
//       setLoadingPayment(false);
//     }
//   };

//   return (

//     <div className="p-6">

//       <h1 className="text-3xl font-bold mb-8">
//         Welcome {studentName} 👋
//       </h1>

//       {/* DASHBOARD CARDS */}

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

//         <div className="bg-slate-900 text-white p-6 rounded-xl shadow">
//           <p>Total Books Issued</p>
//           <h2 className="text-3xl text-blue-400">{booksIssued}</h2>
//         </div>

//         <div className="bg-slate-900 text-white p-6 rounded-xl shadow">
//           <p>Pending Returns</p>
//           <h2 className="text-3xl text-red-400">{pendingReturns}</h2>
//         </div>

//         <div className="bg-slate-900 text-white p-6 rounded-xl shadow">

//           <p>Fine Amount</p>

//           <h2 className="text-3xl text-yellow-400">
//             ₹{fineAmount}
//           </h2>

//           {fineAmount > 0 && (

//             <button
//               onClick={handlePayment}
//               disabled={loadingPayment}
//               className="mt-3 bg-green-500 hover:bg-green-600 px-4 py-2 rounded w-full"
//             >
//               {loadingPayment ? "Processing..." : "Pay Fine"}
//             </button>

//           )}

//         </div>

//         <div className="bg-slate-900 text-white p-6 rounded-xl shadow">
//           <p>Overdue Books</p>
//           <h2 className="text-3xl text-orange-400">
//             {overdueBooks.length}
//           </h2>
//         </div>

//       </div>

//       {/* MEMBERSHIP */}

//       <div className="mt-10 bg-white p-6 rounded-xl shadow">

//         <h2 className="text-xl font-semibold mb-3">
//           Membership Info
//         </h2>

//         <p>Plan: <b>{membershipPlan}</b></p>
//         <p>Borrow Limit: <b>{borrowLimit}</b></p>
//         <p>Remaining Books: <b>{remainingBooks}</b></p>

//       </div>

//       {/* OVERDUE BOOKS */}

//       {overdueBooks.length > 0 && (

//         <div className="mt-10 bg-white p-6 rounded-xl shadow">

//           <h2 className="text-xl font-semibold mb-4">
//             Overdue Books
//           </h2>

//           <table className="w-full border">

//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2">Book</th>
//                 <th className="p-2">Due Date</th>
//                 <th className="p-2">Days Late</th>
//                 <th className="p-2">Fine</th>
//               </tr>
//             </thead>

//             <tbody>

//               {overdueBooks.map((b, i) => (
//                 <tr key={i} className="text-center border-t">
//                   <td className="p-2">{b.book}</td>
//                   <td className="p-2">{b.dueDate}</td>
//                   <td className="p-2">{b.daysLate}</td>
//                   <td className="p-2 text-red-500">₹{b.fine}</td>
//                 </tr>
//               ))}

//             </tbody>

//           </table>

//         </div>

//       )}

//     </div>
//   );

// };

// export default StudentDashboard;

// import React, { useEffect, useState } from "react";
// import API from "../../services/api";
// import { loadStripe } from "@stripe/stripe-js";

// const stripePromise = loadStripe(
//   import.meta.env.VITE_STRIPE_PUBLIC_KEY
// );

// const StudentDashboard = () => {

//   const [studentName, setStudentName] = useState("");

//   const [booksIssued, setBooksIssued] = useState(0);
//   const [pendingReturns, setPendingReturns] = useState(0);
//   const [fineAmount, setFineAmount] = useState(0);

//   const [overdueBooks, setOverdueBooks] = useState([]);

//   const [membershipPlan, setMembershipPlan] = useState("");
//   const [borrowLimit, setBorrowLimit] = useState(0);
//   const [remainingBooks, setRemainingBooks] = useState(0);

//   const [paymentHistory, setPaymentHistory] = useState([]);

//   const [loadingPayment, setLoadingPayment] = useState(false);

//   useEffect(() => {
//     loadDashboard();
//   }, []);

//   const loadDashboard = async () => {
//     try {

//       const memberId = localStorage.getItem("memberId");
//       if (!memberId) return;

//       /* MEMBER INFO */
//       const memberRes = await API.get(`/api/members/${memberId}`);
//       const member = memberRes.data;

//       setStudentName(
//         `${member?.user?.firstName || ""} ${member?.user?.lastName || ""}`
//       );

//       const plan = member?.plan?.name || "Basic";
//       const limit = member?.plan?.borrowLimit || 2;

//       setMembershipPlan(plan);
//       setBorrowLimit(limit);

//       /* ISSUES */
//       const res = await API.get("/api/issues", {
//         params: { memberId }
//       });

//       const issues = res.data || [];
//       const issued = issues.filter(i => i.status === "ISSUED");

//       setBooksIssued(issues.length);
//       setPendingReturns(issued.length);
//       setRemainingBooks(limit - issued.length);

//       /* FINE + OVERDUE */
//       let totalFine = 0;
//       const overdue = [];

//       issues.forEach(issue => {

//         if (issue.penalty) {
//           totalFine += issue.penalty;
//         }

//         if (issue.status === "ISSUED") {

//           const today = new Date();
//           const dueDate = new Date(issue.dueDate);

//           if (today > dueDate) {

//             const diff = today - dueDate;
//             const daysLate = Math.floor(diff / (1000 * 60 * 60 * 24));

//             const fine = daysLate * 10;
//             totalFine += fine;

//             overdue.push({
//               book: issue.book?.title || "Book",
//               dueDate: new Date(issue.dueDate).toLocaleDateString(),
//               daysLate,
//               fine
//             });

//           }

//         }

//       });

//       setFineAmount(totalFine);
//       setOverdueBooks(overdue);

//       /* ✅ PAYMENT HISTORY */
//       const payRes = await API.get(`/api/payments/member/${memberId}`);
//       setPaymentHistory(payRes.data || []);

//     } catch (err) {
//       console.error("Dashboard error:", err);
//     }
//   };

//   /* ✅ STRIPE PAYMENT */

//   const handlePayment = async () => {

//   if (fineAmount <= 0) {
//     alert("No fine to pay");
//     return;
//   }

//   try {
//     setLoadingPayment(true);

//     const memberId = localStorage.getItem("memberId");

//     const res = await API.post("/api/payments/create-intent", {
//       memberId
//     });

//     // ✅ HANDLE BACKEND ERROR
//     if (res.data.error) {
//       alert(res.data.error);
//       return;
//     }

//     const { clientSecret } = res.data;

//     const stripe = await stripePromise;

//     const result = await stripe.confirmCardPayment(clientSecret, {
//       payment_method: {
//         card: { token: "tok_visa" }
//       }
//     });

//     if (result.error) {
//       alert(result.error.message);
//       return;
//     }

//     await API.post("/api/payments/confirm", {
//       paymentIntentId: result.paymentIntent.id,
//       memberId
//     });

//     alert("Payment Successful ✅");
//     loadDashboard();

//   } catch (err) {
//     console.error(err);
//     alert("Payment Failed");
//   } finally {
//     setLoadingPayment(false);
//   }
// };
//   return (

//     <div className="p-6">

//       <h1 className="text-3xl font-bold mb-8">
//         Welcome {studentName} 👋
//       </h1>

//       {/* DASHBOARD */}

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

//         <div className="bg-slate-900 text-white p-6 rounded-xl">
//           <p>Total Books</p>
//           <h2 className="text-3xl text-blue-400">{booksIssued}</h2>
//         </div>

//         <div className="bg-slate-900 text-white p-6 rounded-xl">
//           <p>Pending</p>
//           <h2 className="text-3xl text-red-400">{pendingReturns}</h2>
//         </div>

//         <div className="bg-slate-900 text-white p-6 rounded-xl">

//           <p>Fine</p>
//           <h2 className="text-3xl text-yellow-400">₹{fineAmount}</h2>

//           {fineAmount > 0 && (
//             <button
//               onClick={handlePayment}
//               className="mt-3 bg-green-500 px-4 py-2 rounded w-full"
//             >
//               {loadingPayment ? "Processing..." : "Pay Fine"}
//             </button>
//           )}

//         </div>

//         <div className="bg-slate-900 text-white p-6 rounded-xl">
//           <p>Overdue</p>
//           <h2 className="text-3xl text-orange-400">
//             {overdueBooks.length}
//           </h2>
//         </div>

//       </div>

//       {/* PAYMENT HISTORY */}

//       <div className="mt-10 bg-white p-6 rounded-xl shadow">

//         <h2 className="text-xl font-semibold mb-4">
//           Payment History
//         </h2>

//         {paymentHistory.length === 0 ? (
//           <p>No payments yet</p>
//         ) : (

//           <table className="w-full border">

//             <thead className="bg-gray-100">
//               <tr>
//                 <th className="p-2">Amount</th>
//                 <th className="p-2">Status</th>
//                 <th className="p-2">Date</th>
//               </tr>
//             </thead>

//             <tbody>

//               {paymentHistory.map((p, i) => (
//                 <tr key={i} className="text-center border-t">
//                   <td className="p-2">₹{p.amount}</td>
//                   <td className="p-2 text-green-600">{p.status}</td>
//                   <td className="p-2">
//                     {new Date(p.date).toLocaleString()}
//                   </td>
//                 </tr>
//               ))}

//             </tbody>

//           </table>

//         )}

//       </div>

//     </div>
//   );
// };

// export default StudentDashboard;

import React, { useEffect, useState } from "react";
import API from "../../services/api";

const StudentDashboard = () => {

  const [studentName, setStudentName] = useState("");

  const [booksIssued, setBooksIssued] = useState(0);
  const [pendingReturns, setPendingReturns] = useState(0);
  const [fineAmount, setFineAmount] = useState(0);

  const [overdueBooks, setOverdueBooks] = useState([]);

  const [membershipPlan, setMembershipPlan] = useState("");
  const [borrowLimit, setBorrowLimit] = useState(0);
  const [remainingBooks, setRemainingBooks] = useState(0);

  const [paymentHistory, setPaymentHistory] = useState([]);

  const [loadingPayment, setLoadingPayment] = useState(false);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {

      const memberId = localStorage.getItem("memberId");
      if (!memberId) return;

      /* MEMBER INFO */
      const memberRes = await API.get(`/api/members/${memberId}`);
      const member = memberRes.data;

      setStudentName(
        `${member?.user?.firstName || ""} ${member?.user?.lastName || ""}`
      );

      const plan = member?.plan?.name || "Basic";
      const limit = member?.plan?.borrowLimit || 2;

      setMembershipPlan(plan);
      setBorrowLimit(limit);

      /* ISSUES */
      const res = await API.get("/api/issues", {
        params: { memberId }
      });

      const issues = res.data || [];
      const issued = issues.filter(i => i.status === "ISSUED");

      setBooksIssued(issues.length);
      setPendingReturns(issued.length);
      setRemainingBooks(limit - issued.length);

      /* FINE + OVERDUE */
      let totalFine = 0;
      const overdue = [];

      issues.forEach(issue => {

        if (issue.penalty) {
          totalFine += issue.penalty;
        }

        if (issue.status === "ISSUED") {

          const today = new Date();
          const dueDate = new Date(issue.dueDate);

          if (today > dueDate) {

            const diff = today - dueDate;
            const daysLate = Math.floor(diff / (1000 * 60 * 60 * 24));

            const fine = daysLate * 10;
            totalFine += fine;

            overdue.push({
              book: issue.book?.title || "Book",
              dueDate: new Date(issue.dueDate).toLocaleDateString(),
              daysLate,
              fine
            });

          }
        }
      });

      setFineAmount(totalFine);
      setOverdueBooks(overdue);

      /* PAYMENT HISTORY */
      const payRes = await API.get(`/api/payments/member/${memberId}`);
      setPaymentHistory(payRes.data || []);

    } catch (err) {
      console.error("Dashboard error:", err);
    }
  };

  /* ✅ UPDATED STRIPE CHECKOUT FLOW */

  const handlePayment = async () => {

    if (fineAmount <= 0) {
      alert("No fine to pay");
      return;
    }

    try {
      setLoadingPayment(true);

      const memberId = localStorage.getItem("memberId");

      const res = await API.post(
        `/api/payments/create-checkout-session/${memberId}`
      );

      // ✅ Redirect to Stripe hosted page
      window.location.href = res.data;

    } catch (err) {
  console.error("FULL ERROR:", err);
  console.log("BACKEND MESSAGE:", err.response?.data);
  alert(err.response?.data || "Payment initiation failed");
} finally {
      setLoadingPayment(false);
    }
  };

  return (

    <div className="p-6">

      <h1 className="text-3xl font-bold mb-8">
        Welcome {studentName} 👋
      </h1>

      {/* DASHBOARD */}

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

        <div className="bg-slate-900 text-white p-6 rounded-xl">
          <p>Overall Borrowed Books</p>
          <h2 className="text-3xl text-blue-400">{booksIssued}</h2>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl">
          <p>Pending</p>
          <h2 className="text-3xl text-red-400">{pendingReturns}</h2>
        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl">

          <p>Fine</p>
          <h2 className="text-3xl text-yellow-400">₹{fineAmount}</h2>

          {fineAmount > 0 && (
            <button
              onClick={handlePayment}
              className="mt-3 bg-green-500 px-4 py-2 rounded w-full"
            >
              {loadingPayment ? "Redirecting..." : "Pay Fine"}
            </button>
          )}

        </div>

        <div className="bg-slate-900 text-white p-6 rounded-xl">
          <p>Overdue</p>
          <h2 className="text-3xl text-orange-400">
            {overdueBooks.length}
          </h2>
        </div>

      </div>

      {/* PAYMENT HISTORY */}

      <div className="mt-10 bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Payment History
        </h2>

        {paymentHistory.length === 0 ? (
          <p>No payments yet</p>
        ) : (

          <table className="w-full border">

            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Amount</th>
                <th className="p-2">Status</th>
                <th className="p-2">Date</th>
              </tr>
            </thead>

            <tbody>

              {paymentHistory.map((p, i) => (
                <tr key={i} className="text-center border-t">
                  <td className="p-2">₹{p.amount}</td>
                  <td className="p-2 text-green-600">{p.status}</td>
                  <td className="p-2">
                    {new Date(p.date).toLocaleString()}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>

        )}

      </div>

    </div>
  );
};

export default StudentDashboard;