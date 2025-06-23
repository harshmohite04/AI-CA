import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepperNavbar from '../components/StepperNavbar';

const initialState = {
  salaryIncome: '',
  businessIncome: '',
  capitalGains: '',
  housePropertyIncome: '',
  otherSourcesIncome: '',
  exemptIncome: '',
  foreignIncome: '',
  deduction80C: '',
  deduction80D: '',
  deduction80G: '',
  deductionOther: '',
  previousTaxPaid: '',
  refundBankAccount: '',
  form26AS: '',
};

function ITRFilling() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors: any = {};
    // You can add required field validation here if needed
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Save form data to context or global state if needed
      navigate('/form/GSTfiling');
    }
  };

  const stepLabels = [
    'Personal', 'Bank', 'ITR', 'GST', 'TDS', 'Payroll', 'Business', 'Documents'
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-teal-50 py-8">
      <div className="w-full max-w-7xl bg-white/95 rounded-3xl shadow-2xl px-6 py-10 md:px-16 md:py-16 mx-2">
        <StepperNavbar currentStep={2} labels={stepLabels} />
        <h2 className="text-center font-extrabold text-3xl md:text-4xl text-slate-800 mb-2 tracking-tight">Income Tax Return (ITR) Filing Details</h2>
        <div className="text-center text-slate-500 mb-10 text-base">Enter your income, deductions, and tax details for ITR filing.</div>
        <form onSubmit={handleSubmit} noValidate>
          {/* Income Section */}
          <div className="mb-10 p-6 rounded-2xl bg-indigo-50/40 border border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-indigo-400 rounded-full mr-2"></span>
              Income Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-7">
              {[
                { label: 'Salary Income (from Form 16)', name: 'salaryIncome', placeholder: 'e.g. 500000' },
                { label: 'Business/Professional Income', name: 'businessIncome', placeholder: 'e.g. 200000' },
                { label: 'Capital Gains', name: 'capitalGains', placeholder: 'e.g. 10000' },
                { label: 'House Property Income', name: 'housePropertyIncome', placeholder: 'e.g. 30000' },
                { label: 'Other Sources Income (interest, dividend, etc.)', name: 'otherSourcesIncome', placeholder: 'e.g. 5000' },
                { label: 'Exempt Income (e.g., agriculture income)', name: 'exemptIncome', placeholder: 'e.g. 10000' },
                { label: 'Foreign Income (if applicable)', name: 'foreignIncome', placeholder: 'e.g. 0' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block font-semibold text-slate-700 mb-1">{field.label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">₹</span>
                    <input
                      type="number"
                      name={field.name}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                      placeholder={field.placeholder}
                      min={0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Deductions Section */}
          <div className="mb-10 p-6 rounded-2xl bg-sky-50/40 border border-sky-100">
            <h3 className="text-xl font-bold text-sky-700 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-sky-400 rounded-full mr-2"></span>
              Deductions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-7">
              {[
                { label: 'Section 80C (e.g., LIC, PPF, ELSS)', name: 'deduction80C', placeholder: 'e.g. 150000' },
                { label: 'Section 80D (medical insurance)', name: 'deduction80D', placeholder: 'e.g. 25000' },
                { label: 'Section 80G (donations)', name: 'deduction80G', placeholder: 'e.g. 5000' },
                { label: 'Section 80E, 80TTA, etc.', name: 'deductionOther', placeholder: 'e.g. 10000' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block font-semibold text-slate-700 mb-1">{field.label}</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">₹</span>
                    <input
                      type="number"
                      name={field.name}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 bg-slate-50 text-base outline-none transition"
                      placeholder={field.placeholder}
                      min={0}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Other Section */}
          <div className="mb-10 p-6 rounded-2xl bg-emerald-50/40 border border-emerald-100">
            <h3 className="text-xl font-bold text-emerald-700 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-emerald-400 rounded-full mr-2"></span>
              Other Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Previous Year's Tax Paid / Refunds</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">₹</span>
                  <input
                    type="number"
                    name="previousTaxPaid"
                    value={form.previousTaxPaid}
                    onChange={handleChange}
                    className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 bg-slate-50 text-base outline-none transition"
                    placeholder="e.g. 20000"
                    min={0}
                  />
                </div>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Bank Account for refund credit</label>
                <input
                  name="refundBankAccount"
                  value={form.refundBankAccount}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 bg-slate-50 text-base outline-none transition"
                  placeholder="Enter bank account number"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">Form 26AS / AIS data (if available)</label>
                <textarea
                  name="form26AS"
                  value={form.form26AS}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-emerald-500 bg-slate-50 text-base outline-none transition min-h-[48px] resize-y"
                  placeholder="Paste your Form 26AS or AIS data here"
                />
              </div>
            </div>
          </div>
          {/* Button Bar */}
          <div className="flex flex-col md:flex-row gap-4 mt-10 sticky bottom-0 bg-white/80 py-4 z-10 rounded-b-2xl">
            <button
              type="button"
              className="w-full md:w-1/2 py-3 rounded-xl bg-slate-300 hover:bg-slate-400 text-slate-700 font-bold text-lg transition"
              onClick={() => navigate('/form/BankDetails')}
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

export default ITRFilling;
