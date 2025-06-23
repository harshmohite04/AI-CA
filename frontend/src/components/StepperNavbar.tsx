import React from 'react';

interface StepperNavbarProps {
  currentStep: number; // 0-based
  labels: string[];
}

const StepperNavbar: React.FC<StepperNavbarProps> = ({ currentStep, labels }) => {
  return (
    <div className="flex items-center justify-center gap-2 mb-10">
      {labels.map((label, idx) => (
        <div key={label} className="flex items-center">
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg border-2 transition-all
              ${idx === currentStep ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-indigo-200 text-indigo-500 border-indigo-200'}
            `}
          >
            {idx + 1}
          </div>
          <span
            className={`mt-1 text-xs block text-center min-w-max px-3 whitespace-nowrap
              ${idx === currentStep ? 'text-indigo-700 font-bold' : 'text-indigo-400 font-semibold'}`}
          >
            {label}
          </span>
          {idx < labels.length - 1 && (
            <div className="h-1 w-6 md:w-10 bg-indigo-100 rounded-full mx-1 " />
          )}
        </div>
      ))}
    </div>
  );
};

export default StepperNavbar; 