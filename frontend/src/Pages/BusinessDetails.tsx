import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepperNavbar from '../components/StepperNavbar';

const stepLabels = [
  'Personal', 'Bank', 'ITR', 'GST', 'TDS', 'Payroll', 'Business', 'Documents'
];

const initialState = {
  businessName: '',
  businessType: '',
  incorporationDate: '',
  natureOfGoods: '',
  booksMaintained: '',
  msmeDetails: '',
};

function BusinessDetails() {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation if needed
    navigate('/form/DocumentUploads');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-teal-50 py-8">
      <div className="w-full max-w-7xl bg-white/95 rounded-3xl shadow-2xl px-6 py-10 md:px-12 md:py-14 mx-2">
        <StepperNavbar currentStep={6} labels={stepLabels} />
        <h2 className="text-center font-extrabold text-3xl md:text-4xl text-slate-800 mb-2 tracking-tight">Business Details</h2>
        <div className="text-center text-slate-500 mb-10 text-base">Enter your business details if you are self-employed or an MSME.</div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-10 p-6 rounded-2xl bg-indigo-50/40 border border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-indigo-400 rounded-full mr-2"></span>
              Business Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Business Name</label>
                <input
                  name="businessName"
                  value={form.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                  placeholder="Enter business name"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Type of Business</label>
                <input
                  name="businessType"
                  value={form.businessType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                  placeholder="e.g. Sole Proprietorship, Pvt Ltd, etc."
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Date of Incorporation</label>
                <input
                  type="date"
                  name="incorporationDate"
                  value={form.incorporationDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nature of Goods/Services</label>
                <input
                  name="natureOfGoods"
                  value={form.natureOfGoods}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                  placeholder="e.g. Electronics, Consulting, etc."
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Books of Accounts maintained?</label>
                <select
                  name="booksMaintained"
                  value={form.booksMaintained}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">MSME Registration Details (if any)</label>
                <textarea
                  name="msmeDetails"
                  value={form.msmeDetails}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition min-h-[48px] resize-y"
                  placeholder="Enter MSME registration details"
                />
              </div>
            </div>
          </div>
          {/* Button Bar */}
          <div className="flex flex-col md:flex-row gap-4 mt-10 sticky bottom-0 bg-white/80 py-4 z-10 rounded-b-2xl">
            <button
              type="button"
              className="w-full md:w-1/2 py-3 rounded-xl bg-slate-300 hover:bg-slate-400 text-slate-700 font-bold text-lg transition"
              onClick={() => navigate('/form/PayrollProcessing')}
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

export default BusinessDetails;
