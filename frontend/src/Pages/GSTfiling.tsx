import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepperNavbar from '../components/StepperNavbar';

const initialState = {
  gstin: '',
  registrationType: '',
  businessNature: '',
  turnover: '',
  salesIntrastate: '',
  salesInterstate: '',
  salesB2B: '',
  salesB2C: '',
  purchasesIntrastate: '',
  purchasesInterstate: '',
  inputGST: '',
  itcEligibility: '',
  gstrData: '',
  hsnSacCodes: '',
  reverseCharge: '',
  lateFees: '',
};

const stepLabels = [
  'Personal', 'Bank', 'ITR', 'GST', 'TDS', 'Payroll', 'Business', 'Documents'
];

function GSTfiling() {
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
    navigate('/form/TDSfiling');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-teal-50 py-8">
      <div className="w-full max-w-7xl bg-white/95 rounded-3xl shadow-2xl px-6 py-10 md:px-16 md:py-16 mx-2">
        <StepperNavbar currentStep={3} labels={stepLabels} />
        <h2 className="text-center font-extrabold text-3xl md:text-4xl text-slate-800 mb-2 tracking-tight">GST Filing Details</h2>
        <div className="text-center text-slate-500 mb-10 text-base">Enter your GST registration, sales, purchases, and other details.</div>
        <form onSubmit={handleSubmit} noValidate>
          {/* Registration Section */}
          <div className="mb-10 p-6 rounded-2xl bg-indigo-50/40 border border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-indigo-400 rounded-full mr-2"></span>
              Registration Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-7">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">GSTIN</label>
                <input
                  name="gstin"
                  value={form.gstin}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition uppercase"
                  placeholder="Enter GSTIN"
                  maxLength={15}
                  style={{ textTransform: 'uppercase' }}
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Type of Registration</label>
                <select
                  name="registrationType"
                  value={form.registrationType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                >
                  <option value="">Select Type</option>
                  <option value="Regular">Regular</option>
                  <option value="Composition">Composition</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Business Nature</label>
                <select
                  name="businessNature"
                  value={form.businessNature}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                >
                  <option value="">Select Nature</option>
                  <option value="Goods">Goods</option>
                  <option value="Service">Service</option>
                  <option value="Both">Both</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Turnover</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">₹</span>
                  <input
                    type="number"
                    name="turnover"
                    value={form.turnover}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                    placeholder="e.g. 1000000"
                    min={0}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Sales Section */}
          <div className="mb-10 p-6 rounded-2xl bg-sky-50/40 border border-sky-100">
            <h3 className="text-xl font-bold text-sky-700 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-sky-400 rounded-full mr-2"></span>
              Sales Breakup
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-7">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Intrastate Sales</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">₹</span>
                  <input
                    type="number"
                    name="salesIntrastate"
                    value={form.salesIntrastate}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 bg-slate-50 text-base outline-none transition"
                    placeholder="e.g. 500000"
                    min={0}
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Interstate Sales</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">₹</span>
                  <input
                    type="number"
                    name="salesInterstate"
                    value={form.salesInterstate}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 bg-slate-50 text-base outline-none transition"
                    placeholder="e.g. 200000"
                    min={0}
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">B2B Sales</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">₹</span>
                  <input
                    type="number"
                    name="salesB2B"
                    value={form.salesB2B}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 bg-slate-50 text-base outline-none transition"
                    placeholder="e.g. 100000"
                    min={0}
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">B2C Sales</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">₹</span>
                  <input
                    type="number"
                    name="salesB2C"
                    value={form.salesB2C}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 bg-slate-50 text-base outline-none transition"
                    placeholder="e.g. 150000"
                    min={0}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Purchases Section */}
          <div className="mb-10 p-6 rounded-2xl bg-emerald-50/40 border border-emerald-100">
            <h3 className="text-xl font-bold text-emerald-700 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-emerald-400 rounded-full mr-2"></span>
              Purchases & Input GST
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-7">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Intrastate Purchases</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">₹</span>
                  <input
                    type="number"
                    name="purchasesIntrastate"
                    value={form.purchasesIntrastate}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 bg-slate-50 text-base outline-none transition"
                    placeholder="e.g. 300000"
                    min={0}
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Interstate Purchases</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">₹</span>
                  <input
                    type="number"
                    name="purchasesInterstate"
                    value={form.purchasesInterstate}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 bg-slate-50 text-base outline-none transition"
                    placeholder="e.g. 100000"
                    min={0}
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Input GST</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">₹</span>
                  <input
                    type="number"
                    name="inputGST"
                    value={form.inputGST}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 bg-slate-50 text-base outline-none transition"
                    placeholder="e.g. 18000"
                    min={0}
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Input Tax Credit (ITC) eligibility</label>
                <select
                  name="itcEligibility"
                  value={form.itcEligibility}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 bg-slate-50 text-base outline-none transition"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>
          </div>
          {/* GSTR/HSN Section */}
          <div className="mb-10 p-6 rounded-2xl bg-yellow-50/40 border border-yellow-100">
            <h3 className="text-xl font-bold text-yellow-700 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-yellow-400 rounded-full mr-2"></span>
              GSTR & HSN/SAC
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">GSTR-1 and GSTR-3B data</label>
                <textarea
                  name="gstrData"
                  value={form.gstrData}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-yellow-500 bg-slate-50 text-base outline-none transition min-h-[48px] resize-y"
                  placeholder="Paste or upload your GSTR-1/3B data here"
                />
                {/* File upload placeholder */}
                <input type="file" className="mt-2" disabled />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">HSN/SAC codes for products/services</label>
                <textarea
                  name="hsnSacCodes"
                  value={form.hsnSacCodes}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-yellow-500 bg-slate-50 text-base outline-none transition min-h-[48px] resize-y"
                  placeholder="List HSN/SAC codes here"
                />
              </div>
            </div>
          </div>
          {/* Other Section */}
          <div className="mb-10 p-6 rounded-2xl bg-pink-50/40 border border-pink-100">
            <h3 className="text-xl font-bold text-pink-700 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-pink-400 rounded-full mr-2"></span>
              Other Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Reverse Charge applicability</label>
                <select
                  name="reverseCharge"
                  value={form.reverseCharge}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-pink-500 bg-slate-50 text-base outline-none transition"
                >
                  <option value="">Select</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Late Fees / Interest if any</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">₹</span>
                  <input
                    type="number"
                    name="lateFees"
                    value={form.lateFees}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-pink-500 bg-slate-50 text-base outline-none transition"
                    placeholder="e.g. 500"
                    min={0}
                  />
                </div>
              </div>
            </div>
          </div>
          {/* Button Bar */}
          <div className="flex flex-col md:flex-row gap-4 mt-10 sticky bottom-0 bg-white/80 py-4 z-10 rounded-b-2xl">
            <button
              type="button"
              className="w-full md:w-1/2 py-3 rounded-xl bg-slate-300 hover:bg-slate-400 text-slate-700 font-bold text-lg transition"
              onClick={() => navigate('/form/ITRFilling')}
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

export default GSTfiling;