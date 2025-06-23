import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepperNavbar from '../components/StepperNavbar';

const initialState = {
  tdsApplicable: '',
  tanNumber: '',
  paymentTypes: '',
  deducteeDetails: '',
  sectionWiseData: '',
  totalTdsDeducted: '',
  tdsPaid: '',
  challanDetails: '',
};

const stepLabels = [
  'Personal', 'Bank', 'ITR', 'GST', 'TDS', 'Payroll', 'Business', 'Documents'
];

function TDSfiling() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation if needed
    navigate('/form/PayrollProcessing');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-teal-50 py-8">
      <div className="w-full max-w-7xl bg-white/95 rounded-3xl shadow-2xl px-6 py-10 md:px-16 md:py-16 mx-2">
        <StepperNavbar currentStep={4} labels={stepLabels} />
        <h2 className="text-center font-extrabold text-3xl md:text-4xl text-slate-800 mb-2 tracking-tight">TDS Details</h2>
        <div className="text-center text-slate-500 mb-10 text-base">Enter your TDS applicability, deduction, and payment details.</div>
        <form onSubmit={handleSubmit} noValidate>
          {/* Applicability Section */}
          <div className="mb-10 p-6 rounded-2xl bg-indigo-50/40 border border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-indigo-400 rounded-full mr-2"></span>
              Applicability & Registration
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">TDS Applicability</label>
                <select
                  name="tdsApplicable"
                  value={form.tdsApplicable}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">TAN Number</label>
                <input
                  name="tanNumber"
                  value={form.tanNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition uppercase"
                  placeholder="Enter TAN Number"
                  maxLength={10}
                  style={{ textTransform: 'uppercase' }}
                />
              </div>
            </div>
          </div>
          {/* Payment Types Section */}
          <div className="mb-10 p-6 rounded-2xl bg-sky-50/40 border border-sky-100">
            <h3 className="text-xl font-bold text-sky-700 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-sky-400 rounded-full mr-2"></span>
              Payment & Deductee Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Types of Payments (e.g., salary, contractor, rent)</label>
                <input
                  name="paymentTypes"
                  value={form.paymentTypes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 bg-slate-50 text-base outline-none transition"
                  placeholder="e.g. Salary, Contractor, Rent"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deductee details</label>
                <textarea
                  name="deducteeDetails"
                  value={form.deducteeDetails}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 bg-slate-50 text-base outline-none transition min-h-[48px] resize-y"
                  placeholder="Enter deductee details (name, PAN, amount, etc.)"
                />
              </div>
            </div>
          </div>
          {/* Section-wise Deduction Section */}
          <div className="mb-10 p-6 rounded-2xl bg-emerald-50/40 border border-emerald-100">
            <h3 className="text-xl font-bold text-emerald-700 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-emerald-400 rounded-full mr-2"></span>
              Section-wise Deduction
            </h3>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Section-wise deduction data (e.g., 194C, 194J)</label>
              <textarea
                name="sectionWiseData"
                value={form.sectionWiseData}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 bg-slate-50 text-base outline-none transition min-h-[48px] resize-y"
                placeholder="Enter section-wise deduction data"
              />
            </div>
          </div>
          {/* TDS Payment Section */}
          <div className="mb-10 p-6 rounded-2xl bg-yellow-50/40 border border-yellow-100">
            <h3 className="text-xl font-bold text-yellow-700 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-yellow-400 rounded-full mr-2"></span>
              TDS Payment Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Total TDS deducted</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">₹</span>
                  <input
                    type="number"
                    name="totalTdsDeducted"
                    value={form.totalTdsDeducted}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-yellow-500 bg-slate-50 text-base outline-none transition"
                    placeholder="e.g. 10000"
                    min={0}
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">TDS paid to government</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">₹</span>
                  <input
                    type="number"
                    name="tdsPaid"
                    value={form.tdsPaid}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-yellow-500 bg-slate-50 text-base outline-none transition"
                    placeholder="e.g. 9500"
                    min={0}
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Challan details (if available)</label>
                <textarea
                  name="challanDetails"
                  value={form.challanDetails}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-yellow-500 bg-slate-50 text-base outline-none transition min-h-[48px] resize-y"
                  placeholder="Enter challan details or upload file"
                />
                {/* File upload placeholder */}
                <input type="file" className="mt-2" disabled />
              </div>
            </div>
          </div>
          {/* Button Bar */}
          <div className="flex flex-col md:flex-row gap-4 mt-10 sticky bottom-0 bg-white/80 py-4 z-10 rounded-b-2xl">
            <button
              type="button"
              className="w-full md:w-1/2 py-3 rounded-xl bg-slate-300 hover:bg-slate-400 text-slate-700 font-bold text-lg transition"
              onClick={() => navigate('/form/GSTfiling')}
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full md:w-1/2 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-400 hover:from-indigo-600 hover:to-sky-500 text-white font-extrabold text-lg shadow-md transition"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default TDSfiling; 