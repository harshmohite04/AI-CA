import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepperNavbar from '../components/StepperNavbar';

const initialState = {
  accountNumber: '',
  ifsc: '',
  bankName: '',
  branch: '',
  consent: false,
  transactions: '',
};

const fieldLabels = {
  accountNumber: 'Bank Account Number',
  ifsc: 'IFSC Code',
  bankName: 'Bank Name',
  branch: 'Branch',
  consent: 'Consent to access transactions via AA',
  transactions: 'List of bank transactions',
};

function BankDetails() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setForm({ ...form, [name]: (e.target as HTMLInputElement).checked });
    } else {
      setForm({ ...form, [name]: value });
    }
    setErrors({ ...errors, [name]: '' });
  };

  const validate = () => {
    const newErrors: any = {};
    if (!form.accountNumber) newErrors.accountNumber = 'Bank Account Number is required';
    if (!form.ifsc) newErrors.ifsc = 'IFSC Code is required';
    if (!form.bankName) newErrors.bankName = 'Bank Name is required';
    if (!form.branch) newErrors.branch = 'Branch is required';
    // IFSC validation
    if (form.ifsc && !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(form.ifsc.toUpperCase())) {
      newErrors.ifsc = 'Invalid IFSC code';
    }
    // Account number validation (basic)
    if (form.accountNumber && !/^\d{9,18}$/.test(form.accountNumber)) {
      newErrors.accountNumber = 'Account number must be 9-18 digits';
    }
    // If consent is not given, transactions are required
    if (!form.consent && !form.transactions) {
      newErrors.transactions = 'Please provide your bank transactions';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // Save form data to context or global state if needed
      navigate('/form/ITRFilling');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-teal-50 py-8">
      <div className="w-full max-w-7xl bg-white/95 rounded-3xl shadow-2xl px-6 py-10 md:px-12 md:py-14 mx-2">
        <StepperNavbar
          currentStep={1}
          labels={["Personal", "Bank", "ITR", "Employment", "Address", "Declarations", "Documents", "Summary"]}
        />
        <h2 className="text-center font-extrabold text-3xl md:text-4xl text-slate-800 mb-2 tracking-tight">Bank Details</h2>
        <div className="text-center text-slate-500 mb-10 text-base">Enter your bank account details and consent for transaction access.</div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Bank Account Number*</label>
              <input
                name="accountNumber"
                value={form.accountNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                maxLength={18}
                placeholder="Enter your account number"
              />
              <div className="min-h-[18px] text-rose-500 text-sm transition-opacity">{errors.accountNumber}</div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">IFSC Code*</label>
              <input
                name="ifsc"
                value={form.ifsc}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition uppercase"
                maxLength={11}
                placeholder="e.g. SBIN0001234"
                style={{ textTransform: 'uppercase' }}
              />
              <div className="min-h-[18px] text-rose-500 text-sm transition-opacity">{errors.ifsc}</div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Bank Name*</label>
              <input
                name="bankName"
                value={form.bankName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                placeholder="e.g. State Bank of India"
              />
              <div className="min-h-[18px] text-rose-500 text-sm transition-opacity">{errors.bankName}</div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Branch*</label>
              <input
                name="branch"
                value={form.branch}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                placeholder="e.g. Andheri West"
              />
              <div className="min-h-[18px] text-rose-500 text-sm transition-opacity">{errors.branch}</div>
            </div>
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mt-1">
                <input
                  type="checkbox"
                  name="consent"
                  checked={form.consent}
                  onChange={handleChange}
                  className="w-5 h-5 accent-indigo-600 rounded border border-slate-300 focus:ring-2 focus:ring-indigo-400"
                  id="consentAA"
                />
                <label htmlFor="consentAA" className="font-medium text-slate-700 cursor-pointer select-none">
                  I consent to access my transactions via Account Aggregator (AA)
                </label>
              </div>
              <div className="min-h-[18px] text-rose-500 text-sm transition-opacity">{errors.consent}</div>
            </div>
            {!form.consent && (
              <div className="md:col-span-2">
                <label className="block font-semibold text-slate-700 mb-1">List of bank transactions*</label>
                <textarea
                  name="transactions"
                  value={form.transactions}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition min-h-[48px] resize-y"
                  placeholder="Paste your bank transactions here if not fetched automatically"
                />
                <div className="min-h-[18px] text-rose-500 text-sm transition-opacity">{errors.transactions}</div>
              </div>
            )}
          </div>
          <div className="flex flex-col md:flex-row gap-4 mt-10">
            <button
              type="button"
              className="w-full md:w-1/2 py-3 rounded-xl bg-slate-300 hover:bg-slate-400 text-slate-700 font-bold text-lg transition"
              onClick={() => navigate('/form/PersonalDetails')}
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

export default BankDetails; 