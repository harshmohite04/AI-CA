import React from 'react';
import { FaBell, FaUserCircle, FaFileAlt, FaUpload, FaDownload, FaCalculator, FaFileInvoice, FaHome, FaSignOutAlt, FaChartPie, FaBook, FaFile, FaCog } from 'react-icons/fa';

const quickActions = [
  { icon: <FaFileAlt />, label: 'File New Return' },
  { icon: <FaUpload />, label: 'Upload Form 16' },
  { icon: <FaDownload />, label: 'Download Form 26AS' },
  { icon: <FaCalculator />, label: 'Calculate Tax' },
  { icon: <FaFileInvoice />, label: 'Start GST Filing' },
  { icon: <FaHome />, label: 'Add Home Loan' },
];

const sidebarLinks = [
  { icon: <FaChartPie />, label: 'Dashboard' },
  { icon: <FaFileAlt />, label: 'Tax Filing' },
  { icon: <FaBook />, label: 'Reports' },
  { icon: <FaFile />, label: 'Tax Guide' },
  { icon: <FaFile />, label: 'Documents' },
  { icon: <FaCog />, label: 'Settings' },
];

const MainPage: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col justify-between py-6 px-4">
        <div>
          <div className="mb-8">
            <div className="flex items-center text-2xl font-bold text-blue-700"><span className="bg-blue-600 text-white rounded px-2 py-1 mr-2">AI</span>-CA</div>
            <div className="text-xs text-gray-400 ml-2 mt-1">Tax Assistant</div>
          </div>
          <div className="flex items-center space-x-3 mb-8">
            <FaUserCircle size={36} className="text-gray-400" />
            <div>
              <div className="font-semibold text-gray-800">Jayesh Patel</div>
              <div className="text-xs text-gray-400">Personal Account</div>
            </div>
          </div>
          <nav className="flex flex-col gap-2">
            {sidebarLinks.map((link, idx) => (
              <div key={idx} className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition ${idx === 0 ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-100'}`}>{link.icon}<span>{link.label}</span></div>
            ))}
          </nav>
        </div>
        <div className="flex items-center gap-2 text-gray-500 hover:text-red-500 cursor-pointer px-3 py-2 rounded-lg transition">
          <FaSignOutAlt /> <span>Logout</span>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <header className="flex items-center justify-between px-8 py-6 border-b border-gray-200 bg-white">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <div className="flex items-center gap-6">
            <FaBell className="text-gray-400 text-xl cursor-pointer" />
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
              <FaUserCircle size={24} className="text-gray-400" />
              <span className="text-gray-700 text-sm font-medium">Jayesh P.</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-8 space-y-8 bg-gray-50">
          {/* Welcome Banner */}
          <section className="flex items-center justify-between bg-blue-600 rounded-xl px-8 py-6 text-white shadow">
            <div>
              <h3 className="text-2xl font-bold mb-1">Welcome back, Jayesh!</h3>
              <p className="mb-4">Your ITR filing deadline is in 15 days. Complete it now to avoid last-minute rush.</p>
              <button className="bg-white text-blue-600 font-semibold px-5 py-2 rounded-lg shadow hover:bg-blue-50 transition">Continue Filing</button>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 bg-blue-700 rounded-full flex items-center justify-center text-3xl font-bold mb-1">15</div>
              <div className="text-sm">days left</div>
            </div>
          </section>

          {/* Quick Actions */}
          <section>
            <h4 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {quickActions.map((action, idx) => (
                <div key={idx} className="flex flex-col items-center bg-white rounded-lg shadow p-4 cursor-pointer hover:bg-blue-50 transition">
                  <div className="text-blue-600 text-2xl mb-2">{action.icon}</div>
                  <div className="text-sm text-gray-700 text-center font-medium">{action.label}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Summary Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Tax Summary */}
            <div className="col-span-2 bg-white rounded-xl shadow p-6 flex flex-col justify-between">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Tax Summary</h4>
              <div className="flex justify-between mb-2">
                <div>
                  <div className="text-xs text-gray-400">Tax Due</div>
                  <div className="text-xl font-bold text-gray-800">₹12,450</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Estimated Refund</div>
                  <div className="text-xl font-bold text-green-600">₹3,200</div>
                </div>
              </div>
              <div className="flex justify-between mb-4">
                <div>
                  <div className="text-xs text-gray-400">TDS Deducted</div>
                  <div className="text-lg font-semibold text-gray-800">₹8,500</div>
                </div>
                <div>
                  <div className="text-xs text-gray-400">Advance Tax Paid</div>
                  <div className="text-lg font-semibold text-gray-800">₹3,950</div>
                </div>
              </div>
              <div className="mb-2">
                <span className="text-xs text-gray-500">Filing Progress</span>
                <div className="w-full h-2 bg-gray-200 rounded mt-1 mb-1">
                  <div className="h-2 bg-blue-600 rounded" style={{ width: '45%' }}></div>
                </div>
                <span className="text-xs text-blue-600 font-semibold">45% completed</span>
              </div>
              <div className="flex gap-4 mt-2">
                <span className="text-blue-600 text-sm font-medium cursor-pointer hover:underline">Details</span>
                <span className="text-gray-400 text-sm font-medium cursor-pointer hover:underline">History</span>
              </div>
            </div>

            {/* Tax Health Score */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-between">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Tax Health Score</h4>
              <div className="relative flex items-center justify-center mb-2">
                <svg width="80" height="80">
                  <circle cx="40" cy="40" r="35" stroke="#e0e7ff" strokeWidth="8" fill="none" />
                  <circle cx="40" cy="40" r="35" stroke="#2563eb" strokeWidth="8" fill="none" strokeDasharray="220" strokeDashoffset="55" strokeLinecap="round" />
                </svg>
                <div className="absolute text-2xl font-bold text-blue-700">75</div>
              </div>
              <div className="text-gray-600 text-center mb-3">Good! Complete your filing to improve your score.</div>
              <button className="bg-blue-50 text-blue-700 font-semibold px-4 py-2 rounded-lg hover:bg-blue-100 transition">Improve Score</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainPage; 