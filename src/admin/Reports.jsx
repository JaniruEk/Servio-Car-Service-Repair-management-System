// src/components/AdminReports.jsx
import React, { useState } from 'react';
import { FaChartBar, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import Footer from '../components/Footer';
import AdminSidebar from '../components/AdminSidebar';

function AdminReports() {
  const [expandedReport, setExpandedReport] = useState(null);
  const [reportData] = useState([
    { id: 1, customer: 'John Doe', service: 'Oil Change', date: 'March 10, 2025', status: 'Completed', cost: 50 },
    { id: 2, customer: 'Jane Smith', service: 'Brake Repair', date: 'Feb 20, 2025', status: 'Completed', cost: 150 },
    { id: 3, customer: 'Mike Johnson', service: 'Tire Rotation', date: 'April 15, 2025', status: 'Pending', cost: 80 },
    { id: 4, customer: 'Emily Brown', service: 'Engine Tune-Up', date: 'March 15, 2025', status: 'Completed', cost: 200 },
  ]);

  const toggleReport = (id) => setExpandedReport(expandedReport === id ? null : id);

  const totalServices = reportData.length;
  const totalRevenue = reportData.reduce((sum, item) => sum + item.cost, 0);
  const pendingServices = reportData.filter(item => item.status === 'Pending').length;

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-900 text-white font-sans bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40"></div>

      <div className="flex flex-1 relative z-10">
        {/* Sidebar */}
        <AdminSidebar activePath="/admin-reports" />

        {/* Main Content */}
        <main className="flex-1 max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <header className="bg-white/10 backdrop-blur-md text-white p-6 rounded-lg mb-6 flex items-center gap-3 shadow-lg">
            <FaChartBar className="h-7 w-7 text-red-500" />
            <div>
              <h1 className="text-3xl font-extrabold font-[Poppins] tracking-tight">Admin Reports Dashboard</h1>
              <p className="text-sm mt-1 font-[Open Sans] text-gray-300">Insights into service performance</p>
            </div>
          </header>

          {/* Metrics Cards */}
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-lg shadow-lg bg-white/10 backdrop-blur-md border border-gray-700/50 flex items-center gap-4 hover:border-red-500 transition-all duration-300">
              <div className="p-3 bg-red-100/20 rounded-full">
                <FaChartBar className="text-red-500 h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white font-[Raleway]">Total Services</h3>
                <p className="text-2xl font-bold text-gray-300 font-[Open Sans]">{totalServices}</p>
              </div>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-white/10 backdrop-blur-md border border-gray-700/50 flex items-center gap-4 hover:border-red-500 transition-all duration-300">
              <div className="p-3 bg-red-100/20 rounded-full">
                <FaChartBar className="text-red-500 h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white font-[Raleway]">Total Revenue</h3>
                <p className="text-2xl font-bold text-gray-300 font-[Open Sans]">${totalRevenue.toFixed(2)}</p>
              </div>
            </div>
            <div className="p-6 rounded-lg shadow-lg bg-white/10 backdrop-blur-md border border-gray-700/50 flex items-center gap-4 hover:border-red-500 transition-all duration-300">
              <div className="p-3 bg-red-100/20 rounded-full">
                <FaChartBar className="text-red-500 h-6 w-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white font-[Raleway]">Pending Services</h3>
                <p className="text-2xl font-bold text-gray-300 font-[Open Sans]">{pendingServices}</p>
              </div>
            </div>
          </section>

          {/* Accordion Reports */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 font-[Poppins]">Detailed Service Reports</h2>
            <div className="space-y-4">
              {reportData.map((report) => (
                <div key={report.id} className="rounded-lg shadow-lg bg-white/10 backdrop-blur-md border border-gray-700/50 overflow-hidden">
                  <button 
                    onClick={() => toggleReport(report.id)}
                    className="w-full p-4 flex justify-between items-center bg-red-600 text-white rounded-t-lg hover:bg-red-700 transition-all duration-200 ease-in-out focus:outline-none"
                  >
                    <span className="text-lg font-semibold font-[Raleway]">{report.customer} - {report.service}</span>
                    {expandedReport === report.id ? <FaChevronUp className="h-5 w-5" /> : <FaChevronDown className="h-5 w-5" />}
                  </button>
                  <div 
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      expandedReport === report.id ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="p-4 font-[Open Sans] text-gray-300">
                      <p><strong>Date:</strong> {report.date}</p>
                      <p><strong>Status:</strong> 
                        <span className={`ml-2 px-2 py-1 rounded-full text-xs ${
                          report.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {report.status}
                        </span>
                      </p>
                      <p><strong>Cost:</strong> ${report.cost.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>

      {/* Footer - Full Width */}
      <Footer />
    </div>
  );
}

export default AdminReports;