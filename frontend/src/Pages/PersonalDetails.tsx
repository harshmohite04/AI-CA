import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepperNavbar from '../components/StepperNavbar';

const initialState = {
  firstName: '',
  lastName: '',
  dob: '',
  pan: '',
  aadhaar: '',
  gender: '',
  email: '',
  mobile: '',
  address: '',
  maritalStatus: '',
  residentialStatus: '',
  occupation: '',
};

const fieldLabels = {
  firstName: 'First Name',
  lastName: 'Last Name',
  dob: 'Date of Birth',
  pan: 'PAN Number',
  aadhaar: 'Aadhaar Number',
  gender: 'Gender',
  email: 'Email Address',
  mobile: 'Mobile Number',
  address: 'Address (with City, State, Pincode)',
  maritalStatus: 'Marital Status',
  residentialStatus: 'Residential Status',
  occupation: 'Occupation Type',
};

function PersonalDetails() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<any>({});
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors: any = {};
    Object.entries(form).forEach(([key, value]) => {
      if (!value) newErrors[key] = `${fieldLabels[key as keyof typeof fieldLabels]} is required`;
    });
    // Email validation
    if (form.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) {
      newErrors.email = 'Invalid email address';
    }
    // Mobile validation
    if (form.mobile && !/^\d{10}$/.test(form.mobile)) {
      newErrors.mobile = 'Mobile number must be 10 digits';
    }
    // PAN validation
    if (form.pan && !/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(form.pan)) {
      newErrors.pan = 'Invalid PAN format';
    }
    // Aadhaar validation
    if (form.aadhaar && !/^\d{12}$/.test(form.aadhaar)) {
      newErrors.aadhaar = 'Aadhaar must be 12 digits';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      // You can save form data to context or global state here
      navigate('/form/BankDetails');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-teal-50 py-8">
      <div className="w-full max-w-7xl bg-white/95 rounded-3xl shadow-2xl px-6 py-10 md:px-12 md:py-14 mx-2">
        <StepperNavbar
          currentStep={0}
          labels={["Personal", "Bank", "ITR", "Employment", "Address", "Declarations", "Documents", "Summary"]}
        />
        <h2 className="text-center font-extrabold text-3xl md:text-4xl text-slate-800 mb-2 tracking-tight">Personal Details</h2>
        <div className="text-center text-slate-500 mb-10 text-base">Please fill in your personal information accurately. All fields are required.</div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">First Name*</label>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                autoComplete="given-name"
              />
              <div className="min-h-[18px] text-rose-500 text-sm transition-opacity">{errors.firstName}</div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Last Name*</label>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                autoComplete="family-name"
              />
              <div className="min-h-[18px] text-rose-500 text-sm transition-opacity">{errors.lastName}</div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Date of Birth*</label>
              <input
                type="date"
                name="dob"
                value={form.dob}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                max={new Date().toISOString().split('T')[0]}
              />
              <div className="min-h-[18px] text-rose-500 text-sm transition-opacity">{errors.dob}</div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">PAN Number*</label>
              <input
                name="pan"
                value={form.pan}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition uppercase"
                maxLength={10}
                placeholder="ABCDE1234F"
                style={{ textTransform: 'uppercase' }}
              />
              <div className="min-h-[18px] text-rose-500 text-sm transition-opacity">{errors.pan}</div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Aadhaar Number*</label>
              <input
                name="aadhaar"
                value={form.aadhaar}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                maxLength={12}
                placeholder="123412341234"
              />
              <div className="min-h-[18px] text-rose-500 text-sm transition-opacity">{errors.aadhaar}</div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Gender*</label>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <div className="min-h-[18px] text-rose-500 text-sm transition-opacity">{errors.gender}</div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address*</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                autoComplete="email"
                placeholder="example@email.com"
              />
              <div className="min-h-[18px] text-rose-500 text-sm transition-opacity">{errors.email}</div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mobile Number*</label>
              <input
                name="mobile"
                value={form.mobile}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
                maxLength={10}
                placeholder="9876543210"
              />
              <div className="min-h-[18px] text-rose-500 text-sm transition-opacity">{errors.mobile}</div>
            </div>
            <div className="md:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">Address (with City, State, Pincode)*</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition min-h-[48px] resize-y"
                placeholder="Flat/House, Street, City, State, Pincode"
              />
              <div className="min-h-[18px] text-rose-500 text-sm transition-opacity">{errors.address}</div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Marital Status*</label>
              <select
                name="maritalStatus"
                value={form.maritalStatus}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
              >
                <option value="">Select Marital Status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
              <div className="min-h-[18px] text-rose-500 text-sm transition-opacity">{errors.maritalStatus}</div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Residential Status*</label>
              <select
                name="residentialStatus"
                value={form.residentialStatus}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
              >
                <option value="">Select Residential Status</option>
                <option value="Resident">Resident</option>
                <option value="NRI">NRI</option>
              </select>
              <div className="min-h-[18px] text-rose-500 text-sm transition-opacity">{errors.residentialStatus}</div>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Occupation Type*</label>
              <select
                name="occupation"
                value={form.occupation}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
              >
                <option value="">Select Occupation</option>
                <option value="Salaried">Salaried</option>
                <option value="Business">Business</option>
                <option value="Professional">Professional</option>
                <option value="Others">Others</option>
              </select>
              <div className="min-h-[18px] text-rose-500 text-sm transition-opacity">{errors.occupation}</div>
            </div>
          </div>
          <button
            type="submit"
            className="w-full mt-10 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-400 hover:from-indigo-600 hover:to-sky-500 text-white font-extrabold text-lg shadow-md transition"
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default PersonalDetails; 