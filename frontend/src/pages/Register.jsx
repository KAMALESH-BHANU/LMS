import { useState } from "react";
import API from "../services/api";

/* ---------- INPUT ---------- */
const Input = ({ label, required, type = "text", value, onChange }) => (
  <div>
    <label className="block text-sm text-gray-200 mb-1">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded bg-slate-700 text-white border border-slate-600"
    />
  </div>
);

/* ---------- SELECT ---------- */
const Select = ({ label, required, value, options, onChange }) => (
  <div>
    <label className="block text-sm text-gray-200 mb-1">
      {label} {required && <span className="text-red-400">*</span>}
    </label>
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 rounded bg-slate-700 text-white border border-slate-600"
    >
      <option value="">Select</option>
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  </div>
);

export default function Register() {
  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dob: "",
    role: "",
    gender: "",
    maritalStatus: "",
    password: "12345678", // Default password for all users

    address: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },

    academic: {
      institution: "",
      degree: "",
      year: "",
      grade: "",
      percentage: "",
    },

    works: [
      {
        companyName: "",
        designation: "",
        currentlyWorking: false,
        startDate: "",
        endDate: "",
        ctc: "",
        reasonForLeaving: "",
      },
    ],
  });

  /* ================= WORK HANDLERS ================= */

  const addWork = () => {
    setForm((prev) => ({
      ...prev,
      works: [
        ...prev.works,
        {
          companyName: "",
          designation: "",
          currentlyWorking: false,
          startDate: "",
          endDate: "",
          ctc: "",
          reasonForLeaving: "",
        },
      ],
    }));
  };

  const removeWork = (index) => {
    setForm((prev) => ({
      ...prev,
      works: prev.works.filter((_, i) => i !== index),
    }));
  };

  const updateWork = (index, field, value) => {
    const updated = [...form.works];
    updated[index][field] = value;

    if (field === "currentlyWorking" && value === true) {
      updated[index].endDate = "";
    }

    setForm((prev) => ({
      ...prev,
      works: updated,
    }));
  };

  /* ================= SUBMIT ================= */
  
  const submitForm = async () => {
    console.log(form);
    const a = form.address;
    const ac = form.academic;

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.dob ||
      !form.role ||
      !form.gender ||
      !form.maritalStatus ||
      !form.password ||
      !a.street ||
      !a.city ||
      !a.state ||
      !a.pincode ||
      !ac.institution ||
      !ac.degree ||
      !ac.year ||
      !ac.percentage
    ) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    try {
      const response = await API.post("/api/auth/register", form);
      alert("Registration successful. Wait for admin approval.");
      console.log(response.data);
    } catch (error) {
      console.error(error.response?.data || error.message);
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="w-full max-w-4xl bg-slate-800 p-8 rounded-xl shadow-xl">

        <h2 className="text-2xl text-center mb-6">User Registration</h2>

        {/* ================= STEP 1 ================= */}
        {step === 1 && (
          <>
            <h3 className="mb-4">Personal Details</h3>

            <div className="grid grid-cols-2 gap-4">
              <Input label="First Name" required value={form.firstName}
                onChange={(v) => setForm({ ...form, firstName: v })} />

              <Input label="Last Name" required value={form.lastName}
                onChange={(v) => setForm({ ...form, lastName: v })} />

              <Input label="Email" required value={form.email}
                onChange={(v) => setForm({ ...form, email: v })} />

              <Input label="Phone" required value={form.phone}
                onChange={(v) => setForm({ ...form, phone: v })} />

              <Input label="DOB" type="date" required value={form.dob}
                onChange={(v) => setForm({ ...form, dob: v })} />


              <Select label="Role" required value={form.role}
                options={["STUDENT", "LIBRARIAN"]}
                onChange={(v) => setForm({ ...form, role: v })} />

              <Select label="Gender" required value={form.gender}
                options={["MALE", "FEMALE", "OTHER"]}
                onChange={(v) => setForm({ ...form, gender: v })} />

              <Select label="Marital Status" required value={form.maritalStatus}
                options={["SINGLE", "MARRIED"]}
                onChange={(v) => setForm({ ...form, maritalStatus: v })} />
            </div>

            <div className="mt-6 text-right">
              <button onClick={() => setStep(2)}
                className="bg-blue-600 px-6 py-2 rounded">
                Next →
              </button>
            </div>
          </>
        )}

        {/* ================= STEP 2 ================= */}
        {step === 2 && (
          <>
            <h3 className="mb-4">Address</h3>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Street" required value={form.address.street}
                onChange={(v) =>
                  setForm({ ...form, address: { ...form.address, street: v } })} />

              <Input label="City" required value={form.address.city}
                onChange={(v) =>
                  setForm({ ...form, address: { ...form.address, city: v } })} />

              <Input label="State" required value={form.address.state}
                onChange={(v) =>
                  setForm({ ...form, address: { ...form.address, state: v } })} />

              <Input label="Pincode" required value={form.address.pincode}
                onChange={(v) =>
                  setForm({ ...form, address: { ...form.address, pincode: v } })} />
            </div>

            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep(1)}
                className="bg-slate-600 px-6 py-2 rounded">
                Back
              </button>
              <button onClick={() => setStep(3)}
                className="bg-blue-600 px-6 py-2 rounded">
                Next →
              </button>
            </div>
          </>
        )}

        {/* ================= STEP 3 ================= */}
        {step === 3 && (
          <>
            <h3 className="mb-4">Academic</h3>

            <div className="grid grid-cols-2 gap-4">
              <Input label="Institution" required value={form.academic.institution}
                onChange={(v) =>
                  setForm({ ...form, academic: { ...form.academic, institution: v } })} />

              <Input label="Degree" required value={form.academic.degree}
                onChange={(v) =>
                  setForm({ ...form, academic: { ...form.academic, degree: v } })} />

              <Input label="Year" required value={form.academic.year}
                onChange={(v) =>
                  setForm({ ...form, academic: { ...form.academic, year: v } })} />

              <Input label="Grade" value={form.academic.grade}
                onChange={(v) =>
                  setForm({ ...form, academic: { ...form.academic, grade: v } })} />

              <Input label="Percentage" required value={form.academic.percentage}
                onChange={(v) =>
                  setForm({ ...form, academic: { ...form.academic, percentage: v } })} />
            </div>

            <div className="mt-6 flex justify-between">
              <button onClick={() => setStep(2)}
                className="bg-slate-600 px-6 py-2 rounded">
                Back
              </button>
              <button onClick={() => setStep(4)}
                className="bg-blue-600 px-6 py-2 rounded">
                Next →
              </button>
            </div>
          </>
        )}

        {/* ================= STEP 4 ================= */}
        {step === 4 && (
          <>
            <h3 className="mb-4">Work Experience (Optional)</h3>

            {form.works.map((work, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">

                <Input label="Company"
                  value={work.companyName}
                  onChange={(v) => updateWork(index, "companyName", v)} />

                <Input label="Designation"
                  value={work.designation}
                  onChange={(v) => updateWork(index, "designation", v)} />

                <Select label="Currently Working"
                  value={work.currentlyWorking ? "YES" : "NO"}
                  options={["YES", "NO"]}
                  onChange={(v) =>
                    updateWork(index, "currentlyWorking", v === "YES")} />

                <Input label="Start Date" type="date"
                  value={work.startDate}
                  onChange={(v) => updateWork(index, "startDate", v)} />

                {!work.currentlyWorking && (
                  <Input label="End Date" type="date"
                    value={work.endDate}
                    onChange={(v) => updateWork(index, "endDate", v)} />
                )}

                <Input label="CTC"
                  value={work.ctc}
                  onChange={(v) => updateWork(index, "ctc", v)} />

                <Input label="Reason"
                  value={work.reasonForLeaving}
                  onChange={(v) => updateWork(index, "reasonForLeaving", v)} />

                {form.works.length > 1 && (
                  <button onClick={() => removeWork(index)}
                    className="text-red-400 mt-2">
                    Remove
                  </button>
                  
                )}

              </div>
            ))}
            <br></br>
            <button onClick={addWork}
              className="bg-blue-600 px-4 py-2 rounded mb-4">
              Add Work
            </button>

            <div className="flex justify-between">
              <button onClick={() => setStep(3)}
                className="bg-slate-600 px-6 py-2 rounded">
                Back
              </button>

              <button onClick={submitForm}
                className="bg-green-600 px-6 py-2 rounded">
                Submit
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
