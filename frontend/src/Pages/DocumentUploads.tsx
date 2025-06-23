import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StepperNavbar from '../components/StepperNavbar';

const stepLabels = [
  'Personal', 'Bank', 'ITR', 'GST', 'TDS', 'Payroll', 'Business', 'Documents'
];

const documentFields = [
  { label: 'PAN Card', name: 'panCard' },
  { label: 'Aadhaar Card', name: 'aadhaarCard' },
  { label: 'Form 16 / Salary Slips', name: 'form16' },
  { label: 'Bank Statements (PDF or synced)', name: 'bankStatements' },
  { label: 'Investment Proofs (LIC, PPF, ELSS)', name: 'investmentProofs' },
  { label: 'Medical Insurance Receipts', name: 'medicalInsurance' },
  { label: 'Donation Receipts', name: 'donationReceipts' },
  { label: 'GSTR filings', name: 'gstrFilings' },
  { label: 'Purchase/Sales invoices', name: 'purchaseSalesInvoices' },
  { label: 'TDS Challans', name: 'tdsChallans' },
  { label: 'Previous Year ITR Acknowledgements', name: 'previousItr' },
];

const initialState = documentFields.reduce((acc, field) => {
  acc[field.name] = null;
  return acc;
}, {} as Record<string, File | null>);

function DocumentUploads() {
  const [files, setFiles] = useState(initialState);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: fileList } = e.target;
    setFiles({ ...files, [name]: fileList && fileList[0] ? fileList[0] : null });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add upload logic or validation if needed
    navigate('/Home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-teal-50 py-8">
      <div className="w-full max-w-7xl bg-white/95 rounded-3xl shadow-2xl px-6 py-10 md:px-12 md:py-14 mx-2">
        <StepperNavbar currentStep={7} labels={stepLabels} />
        <h2 className="text-center font-extrabold text-3xl md:text-4xl text-slate-800 mb-2 tracking-tight">Document Uploads <span className="text-base font-medium text-slate-500">(Optional but helpful)</span></h2>
        <div className="text-center text-slate-500 mb-10 text-base">Upload supporting documents to speed up and simplify your filing process. All uploads are optional.</div>
        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-10 p-6 rounded-2xl bg-indigo-50/40 border border-indigo-100">
            <h3 className="text-xl font-bold text-indigo-700 mb-6 flex items-center gap-2">
              <span className="inline-block w-1.5 h-6 bg-indigo-400 rounded-full mr-2"></span>
              Upload Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-7">
              {documentFields.map((field) => (
                <div key={field.name}>
                  <label className="block font-semibold text-slate-700 mb-1">{field.label}</label>
                  <input
                    type="file"
                    name={field.name}
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className="w-full px-4 py-2 rounded-xl border border-slate-300 focus:border-indigo-500 bg-slate-50 text-base outline-none transition file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-indigo-100 file:text-indigo-700 hover:file:bg-indigo-200"
                  />
                  {files[field.name] && (
                    <div className="text-xs text-green-600 mt-1">{(files[field.name] as File).name} selected</div>
                  )}
                </div>
              ))}
            </div>
          </div>
          {/* Button Bar */}
          <div className="flex flex-col md:flex-row gap-4 mt-10 sticky bottom-0 bg-white/80 py-4 z-10 rounded-b-2xl">
            <button
              type="button"
              className="w-full md:w-1/2 py-3 rounded-xl bg-slate-300 hover:bg-slate-400 text-slate-700 font-bold text-lg transition"
              onClick={() => navigate('/form/BusinessDetails')}
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full md:w-1/2 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-sky-400 hover:from-indigo-600 hover:to-sky-500 text-white font-extrabold text-lg shadow-md transition"
            >
              Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DocumentUploads;