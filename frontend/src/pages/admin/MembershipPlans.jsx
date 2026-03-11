// import { useEffect, useState } from "react";
// import API from "../../services/api";

// const MembershipPlans = () => {
//   const [plans, setPlans] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     name: "",
//     durationInMonths: "",
//     price: "",
//   });

//   useEffect(() => {
//     fetchPlans();
//   }, []);

//   const fetchPlans = async () => {
//     try {
//       setLoading(true);
//       const res = await API.get("/api/plans");
//       setPlans(res.data);
//     } catch (error) {
//       console.error("Error fetching plans:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const addPlan = async (e) => {
//     e.preventDefault();

//     if (!form.name || !form.durationInMonths || !form.price) {
//       alert("All fields are required");
//       return;
//     }

//     try {
//       setLoading(true);

//       await API.post("/api/plans", {
//         name: form.name,
//         durationInMonths: Number(form.durationInMonths),
//         price: Number(form.price),
//       });

//       alert("Plan Added Successfully");

//       setForm({
//         name: "",
//         durationInMonths: "",
//         price: "",
//       });

//       fetchPlans();
//     } catch (error) {
//       console.error("Error adding plan:", error);
//       alert("Failed to add plan");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deletePlan = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this plan?"))
//       return;

//     try {
//       setLoading(true);
//       await API.delete(`/plans/${id}`);
//       fetchPlans();
//     } catch (error) {
//       console.error("Error deleting plan:", error);
//       alert("Delete failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Membership Plans</h2>

//       {/* Add Plan Form */}
//       <form
//         onSubmit={addPlan}
//         className="grid grid-cols-3 gap-4 bg-white p-4 rounded shadow mb-6"
//       >
//         <input
//           placeholder="Plan Name"
//           value={form.name}
//           onChange={(e) =>
//             setForm({ ...form, name: e.target.value })
//           }
//           className="border p-2 rounded"
//         />

//         <input
//           type="number"
//           placeholder="Duration (Months)"
//           value={form.durationInMonths}
//           onChange={(e) =>
//             setForm({ ...form, durationInMonths: e.target.value })
//           }
//           className="border p-2 rounded"
//         />

//         <input
//           type="number"
//           placeholder="Price"
//           value={form.price}
//           onChange={(e) =>
//             setForm({ ...form, price: e.target.value })
//           }
//           className="border p-2 rounded"
//         />

//         <button
//           disabled={loading}
//           className="col-span-3 bg-green-600 text-white py-2 rounded disabled:opacity-50"
//         >
//           {loading ? "Processing..." : "Add Plan"}
//         </button>
//       </form>

//       {/* Plans Table */}
//       {loading ? (
//         <p>Loading plans...</p>
//       ) : (
//         <table className="w-full bg-white shadow rounded">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-2">Name</th>
//               <th>Duration</th>
//               <th>Price</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {plans.map((p) => (
//               <tr key={p.id} className="border-t">
//                 <td className="p-2">{p.name}</td>
//                 <td>{p.durationInMonths} months</td>
//                 <td className="font-semibold text-green-600">
//                   ₹{p.price}
//                 </td>
//                 <td>
//                   <button
//                     onClick={() => deletePlan(p.id)}
//                     className="bg-red-500 text-white px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default MembershipPlans;

import { useEffect, useState } from "react";
import API from "../../services/api";

const MembershipPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    durationInMonths: "",
    price: "",
  });

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await API.get("/api/plans");
      setPlans(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name) {
      alert("Plan name required");
      return;
    }

    try {
      setLoading(true);

      if (editingId) {
        await API.put(`/api/plans/${editingId}`, {
          name: form.name,
          durationInMonths: Number(form.durationInMonths),
          price: Number(form.price),
        });
        alert("Plan Updated Successfully");
      } else {
        await API.post("/api/plans", {
          name: form.name,
          durationInMonths: Number(form.durationInMonths),
          price: Number(form.price),
        });
        alert("Plan Added Successfully");
      }

      resetForm();
      fetchPlans();
    } catch (error) {
      console.error(error);
      alert("Operation Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (plan) => {
    setForm({
      name: plan.name,
      durationInMonths: plan.durationInMonths,
      price: plan.price,
    });
    setEditingId(plan.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) return;

    try {
      await API.delete(`/api/plans/${id}`);
      fetchPlans();
    } catch (error) {
      console.error(error);
      alert("Delete failed");
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      durationInMonths: "",
      price: "",
    });
    setEditingId(null);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        Membership Plans
      </h2>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-lg p-6 mb-6 grid grid-cols-3 gap-4"
      >
        <input
          placeholder="Plan Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Duration (Months)"
          value={form.durationInMonths}
          onChange={(e) =>
            setForm({ ...form, durationInMonths: e.target.value })
          }
          className="border p-2 rounded"
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) =>
            setForm({ ...form, price: e.target.value })
          }
          className="border p-2 rounded"
        />

        <button
          className={`col-span-3 py-2 rounded text-white ${
            editingId
              ? "bg-blue-600"
              : "bg-green-600"
          }`}
        >
          {editingId ? "Update Plan" : "Add Plan"}
        </button>
      </form>

      {/* TABLE */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {plans.map((p) => (
              <tr key={p.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-semibold">{p.name}</td>
                <td>
                  {p.durationInMonths === 0
                    ? "Unlimited"
                    : `${p.durationInMonths} Months`}
                </td>
                <td className="text-green-600 font-bold">
                  ₹{p.price}
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  {p.name !== "Basic" && (
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembershipPlans;