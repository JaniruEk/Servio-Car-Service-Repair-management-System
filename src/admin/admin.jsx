// src/admin/AdminDashboard.jsx
import React, { useState } from 'react';
import { FaChartBar, FaUsers, FaCar, FaPlus, FaEdit, FaTrash, FaBars } from 'react-icons/fa';
import { InView } from 'react-intersection-observer'; // Import InView for scroll detection
import Footer from '../components/Footer'; // Updated path

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [services, setServices] = useState([
    { id: 1, customer: 'John Doe', date: 'March 10, 2025', type: 'Oil Change', status: 'Completed', cost: 50 },
    { id: 2, customer: 'Jane Smith', date: 'Feb 20, 2025', type: 'Brake Repair', status: 'Completed', cost: 150 },
    { id: 3, customer: 'Mike Johnson', date: 'April 15, 2025', type: 'Tire Rotation', status: 'Pending', cost: 80 },
  ]);
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newService, setNewService] = useState({ customer: '', date: '', type: '', status: 'Pending', cost: '' });
  const [editService, setEditService] = useState(null);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const filteredServices = filterStatus === 'All' ? services : services.filter(service => service.status === filterStatus);

  // Function to handle the animation when a section enters the viewport
  const handleInView = (inView, entry) => {
    console.log('InView triggered:', inView, entry.target); // Debug log
    if (inView) {
      entry.target.classList.add('animate-pop-up');
      console.log('Applied animate-pop-up to:', entry.target); // Debug log
    }
  };

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    setServices([...services, { ...newService, id: services.length + 1, cost: Number(newService.cost) }]);
    setNewService({ customer: '', date: '', type: '', status: 'Pending', cost: '' });
    setShowAddModal(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setServices(services.map(service => 
      service.id === editService.id ? { ...editService, cost: Number(editService.cost) } : service
    ));
    setEditService(null);
    setShowEditModal(false);
  };

  const handleDelete = (id) => setServices(services.filter(service => service.id !== id));
  const handleEditClick = (service) => {
    setEditService({ ...service });
    setShowEditModal(true);
  };

  const totalRevenue = services.reduce((sum, service) => sum + (service.status === 'Completed' ? service.cost : 0), 0);
  const totalUsers = new Set(services.map(s => s.customer)).size;

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100 text-gray-900">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-5 transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:static md:translate-x-0 md:w-64 md:min-w-[16rem] transition-transform duration-300 ease-in-out z-20`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-center text-2xl font-extrabold flex-1 font-[Poppins] tracking-tight">Admin Dashboard</h2>
            <button className="md:hidden text-2xl hover:text-orange-500 transition-colors duration-200" onClick={toggleSidebar}>
              ×
            </button>
          </div>
          <ul className="space-y-2 font-[Open Sans]">
            {[
              { text: 'Dashboard', path: '/admin-dashboard', icon: <FaChartBar />, active: true },
              { text: 'Manage Users', path: '/manage-users', icon: <FaUsers /> },
              { text: 'All Services', path: '/all-services', icon: <FaCar /> },
              { text: 'Reports', path: '/reports', icon: <FaChartBar /> },
              { text: 'Logout', path: '/logout', icon: null },
            ].map((item) => (
              <li key={item.text} className="border-b border-gray-600">
                <a 
                  href={item.path}
                  className={`flex items-center gap-2 py-3 px-4 hover:bg-orange-700 hover:scale-105 transition-all duration-300 ease-in-out transform ${
                    item.active ? 'bg-orange-600 font-bold scale-105' : ''
                  }`}
                >
                  {item.icon}
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden fixed top-4 left-4 z-30 p-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 hover:scale-110 transition-all duration-200 ease-in-out animate-pulse"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        {/* Main Content */}
        <main className="flex-1 p-5 max-w-7xl mx-auto w-full">
          <header className="bg-gradient-to-r from-orange-600 to-orange-800 text-white p-4 rounded-lg mb-6 flex justify-between items-center shadow-lg animate-slide-up">
            <div>
              <h1 className="text-3xl font-extrabold font-[Poppins] tracking-tight">Servio Admin Dashboard</h1>
              <p className="text-sm mt-1 font-[Open Sans]">Oversee operations and manage customer services</p>
            </div>
          </header>

          {/* Overview Section */}
          <InView as="section" onChange={handleInView} triggerOnce={true} threshold={0.2} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 opacity-0">
            <div className="p-6 rounded-lg shadow-lg text-center bg-white animate-scale-up">
              <FaUsers className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 font-[Raleway]">Total Users</h3>
              <p className="text-gray-600 font-[Open Sans] text-2xl font-bold">{totalUsers}</p>
            </div>
            <div className="p-6 rounded-lg shadow-lg text-center bg-white animate-scale-up animate-delay-100">
              <FaCar className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 font-[Raleway]">Pending Services</h3>
              <p className="text-gray-600 font-[Open Sans] text-2xl font-bold">{services.filter(s => s.status === 'Pending').length}</p>
            </div>
            <div className="p-6 rounded-lg shadow-lg text-center bg-white animate-scale-up animate-delay-200">
              <FaChartBar className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 font-[Raleway]">Total Revenue</h3>
              <p className="text-gray-600 font-[Open Sans] text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
            </div>
          </InView>

          {/* Service Management */}
          <InView as="section" onChange={handleInView} triggerOnce={true} threshold={0.2} className="opacity-0">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3 animate-slide-up">
              <h2 className="text-2xl font-bold text-gray-800 font-[Poppins]">Service Management</h2>
              <div className="flex gap-2">
                <select 
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="p-2 rounded-md border bg-white text-gray-900 border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 font-[Open Sans]"
                >
                  <option value="All">All Services</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
                <button 
                  onClick={() => setShowAddModal(true)}
                  className="bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 hover:scale-110 transition-all duration-200 ease-in-out flex items-center gap-1"
                >
                  <FaPlus /> Add Service
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg shadow-lg bg-white animate-fade-in">
                <thead>
                  <tr className="bg-gradient-to-r from-orange-600 to-orange-800 text-white">
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Customer</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Date</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Service Type</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Status</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Cost</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td className="border border-gray-200 p-3 font-[Open Sans]">{service.customer}</td>
                      <td className="border border-gray-200 p-3 font-[Open Sans]">{service.date}</td>
                      <td className="border border-gray-200 p-3 font-[Open Sans]">{service.type}</td>
                      <td className="border border-gray-200 p-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-[Open Sans] ${
                          service.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {service.status}
                        </span>
                      </td>
                      <td className="border border-gray-200 p-3 font-[Open Sans]">${service.cost.toFixed(2)}</td>
                      <td className="border border-gray-200 p-3 flex gap-2">
                        <button 
                          onClick={() => handleEditClick(service)}
                          className="text-orange-600 hover:text-orange-800 hover:scale-125 transition-all duration-200 ease-in-out"
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          onClick={() => handleDelete(service.id)}
                          className="text-red-500 hover:text-red-700 hover:scale-125 transition-all duration-200 ease-in-out"
                          title="Delete"
                        >
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </InView>

          {/* Add Service Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="p-6 rounded-lg shadow-xl w-full max-w-md bg-white text-gray-900 animate-scale-up">
                <h3 className="text-xl font-semibold mb-4 font-[Raleway] text-gray-800">Add New Service</h3>
                <form onSubmit={handleServiceSubmit} className="space-y-4 font-[Open Sans]">
                  <div>
                    <label className="block mb-1 text-gray-800">Customer Name</label>
                    <input
                      type="text"
                      value={newService.customer}
                      onChange={(e) => setNewService({ ...newService, customer: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-800">Date</label>
                    <input
                      type="date"
                      value={newService.date}
                      onChange={(e) => setNewService({ ...newService, date: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-800">Service Type</label>
                    <input
                      type="text"
                      value={newService.type}
                      onChange={(e) => setNewService({ ...newService, type: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., Oil Change"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-800">Status</label>
                    <select
                      value={newService.status}
                      onChange={(e) => setNewService({ ...newService, status: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-800">Cost ($)</label>
                    <input
                      type="number"
                      value={newService.cost}
                      onChange={(e) => setNewService({ ...newService, cost: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      placeholder="e.g., 50"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 hover:scale-105 transition-all duration-200 ease-in-out transform"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-800 text-white rounded-md hover:bg-orange-700 hover:scale-105 transition-all duration-200 ease-in-out transform"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Service Modal */}
          {showEditModal && editService && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="p-6 rounded-lg shadow-xl w-full max-w-md bg-white text-gray-900 animate-scale-up">
                <h3 className="text-xl font-semibold mb-4 font-[Raleway] text-gray-800">Edit Service</h3>
                <form onSubmit={handleEditSubmit} className="space-y-4 font-[Open Sans]">
                  <div>
                    <label className="block mb-1 text-gray-800">Customer Name</label>
                    <input
                      type="text"
                      value={editService.customer}
                      onChange={(e) => setEditService({ ...editService, customer: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-800">Date</label>
                    <input
                      type="date"
                      value={editService.date}
                      onChange={(e) => setEditService({ ...editService, date: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-800">Service Type</label>
                    <input
                      type="text"
                      value={editService.type}
                      onChange={(e) => setEditService({ ...editService, type: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-800">Status</label>
                    <select
                      value={editService.status}
                      onChange={(e) => setEditService({ ...editService, status: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-800">Cost ($)</label>
                    <input
                      type="number"
                      value={editService.cost}
                      onChange={(e) => setEditService({ ...editService, cost: e.target.value })}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="px-4 py-2 rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 hover:scale-105 transition-all duration-200 ease-in-out transform"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-800 text-white rounded-md hover:bg-orange-700 hover:scale-105 transition-all duration-200 ease-in-out transform"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer - Full Width */}
      <Footer />
    </div>
  );
}

export default AdminDashboard;