import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepperNavbar from '../components/StepperNavbar';

const stepLabels = [
  'Personal', 'Bank', 'ITR', 'GST', 'TDS', 'Payroll', 'Business', 'Documents'
];

const emptyEmployee = {
  name: '',
  pan: '',
  designation: '',
  basicSalary: '',
  hra: '',
  allowances: '',
  deductions: '',
  dateOfJoining: '',
  salaryPaymentDates: '',
  compliance: '',
};

function PayrollProcessing() {
  const [numEmployees, setNumEmployees] = useState(1);
  const [employees, setEmployees] = useState([{ ...emptyEmployee }]);
  const navigate = useNavigate();

  const handleNumEmployeesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(1, parseInt(e.target.value) || 1);
    setNumEmployees(value);
    setEmployees((prev) => {
      if (value > prev.length) {
        return [...prev, ...Array(value - prev.length).fill({ ...emptyEmployee })];
      } else {
        return prev.slice(0, value);
      }
    });
  };

  const handleEmployeeChange = (idx: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEmployees((prev) => prev.map((emp, i) => i === idx ? { ...emp, [name]: value } : emp));
  };

  const addEmployee = () => {
    setNumEmployees((n) => n + 1);
    setEmployees((prev) => [...prev, { ...emptyEmployee }]);
  };

  const removeEmployee = (idx: number) => {
    if (employees.length > 1) {
      setNumEmployees((n) => n - 1);
      setEmployees((prev) => prev.filter((_, i) => i !== idx));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add validation if needed
    navigate('/form/BusinessDetails');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-teal-50 py-8">
      <div className="w-full max-w-7xl bg-white/95 rounded-3xl shadow-2xl px-6 py-10 md:px-16 md:py-16 mx-2">
        <StepperNavbar currentStep={5} labels={stepLabels} />
        <h2 className="text-center font-extrabold text-3xl md:text-4xl text-slate-800 mb-2 tracking-tight">Payroll Processing</h2>
        <div className="text-center text-slate-500 mb-10 text-base">Enter payroll details for all employees.</div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-10 p-6 rounded-2xl bg-indigo-50/40 border border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-indigo-400 rounded-full mr-2"></span>
              Number of Employees
            </h3>
            <input
              type="number"
              min={1}
              value={numEmployees}
              onChange={handleNumEmployeesChange}
              className="w-32 px-4 py-3 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition"
            />
          </div>
          <div className="mb-10 p-6 rounded-2xl bg-sky-50/40 border border-sky-100">
            <h3 className="text-xl font-bold text-sky-700 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-sky-400 rounded-full mr-2"></span>
              Employee Details
            </h3>
            {employees.map((emp, idx) => (
              <div key={idx} className="mb-8 p-4 rounded-xl border border-sky-200 bg-white/80 relative">
                <div className="absolute top-2 right-2">
                  {employees.length > 1 && (
                    <button
                      type="button"
                      className="text-rose-500 hover:text-rose-700 font-bold text-lg px-2"
                      onClick={() => removeEmployee(idx)}
                      aria-label="Remove employee"
                    >
                      ×
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-7">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Name</label>
                    <input
                      name="name"
                      value={emp.name}
                      onChange={(e) => handleEmployeeChange(idx, e)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 bg-slate-50 text-base outline-none transition"
                      placeholder="Employee Name"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">PAN</label>
                    <input
                      name="pan"
                      value={emp.pan}
                      onChange={(e) => handleEmployeeChange(idx, e)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 bg-slate-50 text-base outline-none transition uppercase"
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      style={{ textTransform: 'uppercase' }}
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Designation</label>
                    <input
                      name="designation"
                      value={emp.designation}
                      onChange={(e) => handleEmployeeChange(idx, e)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 bg-slate-50 text-base outline-none transition"
                      placeholder="e.g. Manager"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Basic Salary</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">₹</span>
                      <input
                        type="number"
                        name="basicSalary"
                        value={emp.basicSalary}
                        onChange={(e) => handleEmployeeChange(idx, e)}
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 bg-slate-50 text-base outline-none transition"
                        placeholder="e.g. 30000"
                        min={0}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">HRA</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">₹</span>
                      <input
                        type="number"
                        name="hra"
                        value={emp.hra}
                        onChange={(e) => handleEmployeeChange(idx, e)}
                        className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 bg-slate-50 text-base outline-none transition"
                        placeholder="e.g. 12000"
                        min={0}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Allowances</label>
                    <input
                      name="allowances"
                      value={emp.allowances}
                      onChange={(e) => handleEmployeeChange(idx, e)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 bg-slate-50 text-base outline-none transition"
                      placeholder="e.g. 5000"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Deductions (PF, ESI, loans)</label>
                    <input
                      name="deductions"
                      value={emp.deductions}
                      onChange={(e) => handleEmployeeChange(idx, e)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 bg-slate-50 text-base outline-none transition"
                      placeholder="e.g. 2000"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Date of Joining</label>
                    <input
                      type="date"
                      name="dateOfJoining"
                      value={emp.dateOfJoining}
                      onChange={(e) => handleEmployeeChange(idx, e)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 bg-slate-50 text-base outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Salary Payment Dates</label>
                    <input
                      name="salaryPaymentDates"
                      value={emp.salaryPaymentDates}
                      onChange={(e) => handleEmployeeChange(idx, e)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 bg-slate-50 text-base outline-none transition"
                      placeholder="e.g. 1st of every month"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Compliance details (PF/ESI/TDS applicability)</label>
                    <input
                      name="compliance"
                      value={emp.compliance}
                      onChange={(e) => handleEmployeeChange(idx, e)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-sky-500 bg-slate-50 text-base outline-none transition"
                      placeholder="e.g. PF, ESI, TDS applicable"
                    />
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end mt-4">
              <button
                type="button"
                className="px-6 py-2 rounded-xl bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-bold text-base transition"
                onClick={addEmployee}
              >
                + Add Employee
              </button>
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

export default PayrollProcessing;