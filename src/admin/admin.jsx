// src/components/AdminDashboard.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid';
import Footer from '../components/Footer';

function AdminDashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar toggle
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // For desktop sidebar collapse
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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      setIsSidebarCollapsed(false);
    }
  };

  const toggleSidebarCollapse = () => {
    console.log('Toggling sidebar collapse, current state:', isSidebarCollapsed);
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  const filteredServices = filterStatus === 'All' ? services : services.filter(service => service.status === filterStatus);

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

  // Animation Variants (from AboutUs)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.02, transition: { duration: 0.3 } },
  };

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
        <motion.aside
          variants={sectionVariants}
          className={`fixed inset-y-0 left-0 bg-gray-800 text-white transform transition-all duration-300 ease-in-out z-20
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:static md:translate-x-0
            ${isSidebarCollapsed ? 'w-16' : 'w-64 md:min-w-[16rem]'}`}
        >
          <div className={`flex ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} items-center mb-6 p-2`}>
            <h2
              className={`text-center text-xl font-extrabold font-[Poppins] tracking-tight transition-opacity duration-300 ${
                isSidebarCollapsed ? 'hidden' : 'block flex-1'
              }`}
            >
              Admin Dashboard
            </h2>
            {/* Mobile Close Button */}
            <button
              className="md:hidden text-2xl hover:text-red-500 transition-colors duration-200"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            >
              ×
            </button>
            {/* Desktop Collapse Button */}
            <button
              className="hidden md:flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-200"
              onClick={toggleSidebarCollapse}
              aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isSidebarCollapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5" />}
            </button>
          </div>
          <motion.ul variants={containerVariants} className="space-y-3">
            {[
              { text: 'Dashboard', path: '/admin-dashboard', icon: <ChartBarIcon className="h-6 w-6" />, active: true },
              { text: 'Manage Users', path: '/manage-users', icon: <UsersIcon className="h-6 w-6" /> },
              { text: 'All Services', path: '/all-services', icon: <WrenchScrewdriverIcon className="h-6 w-6" /> },
              { text: 'Reports', path: '/reports', icon: <ChartBarIcon className="h-6 w-6" /> },
              { text: 'Logout', path: '/', icon: <ChartBarIcon className="h-6 w-6" /> },
            ].map((item) => (
              <motion.li
                key={item.text}
                variants={itemVariants}
                className="relative group"
              >
                <a
                  href={item.path}
                  className={`flex items-center gap-2 py-3 px-4 hover:bg-gray-700 hover:text-red-500 transition-all duration-300 font-[Open Sans] text-sm tracking-wide ${
                    isSidebarCollapsed ? 'justify-center' : ''
                  } ${item.active ? 'bg-gray-700 font-bold text-red-500 shadow-inner' : ''}`}
                >
                  {item.icon}
                  <span
                    className={`transition-opacity duration-300 ${
                      isSidebarCollapsed ? 'hidden' : 'block'
                    }`}
                  >
                    {item.text}
                  </span>
                </a>
                {isSidebarCollapsed && (
                  <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {item.text}
                  </span>
                )}
              </motion.li>
            ))}
          </motion.ul>
        </motion.aside>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-30 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 hover:scale-110 transition-all duration-200 ease-in-out"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        {/* Main Content */}
        <motion.main
          variants={sectionVariants}
          className="flex-1 max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
        >
          <motion.header
            variants={itemVariants}
            className="bg-white/10 backdrop-blur-md text-white p-6 rounded-lg mb-6 flex justify-between items-center shadow-lg"
          >
            <div>
              <h1 className="text-3xl font-extrabold font-[Poppins] tracking-tight">Servio Admin Dashboard</h1>
              <p className="text-sm mt-1 font-[Open Sans] text-gray-300">Oversee operations and manage customer services</p>
            </div>
          </motion.header>

          {/* Overview Section */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              className="p-6 rounded-lg shadow-lg text-center bg-white/10 backdrop-blur-md border border-gray-700/50 hover:border-red-500 transition-all duration-300"
            >
              <UsersIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2 font-[Raleway]">Total Users</h3>
              <p className="text-gray-300 font-[Open Sans] text-2xl font-bold">{totalUsers}</p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              className="p-6 rounded-lg shadow-lg text-center bg-white/10 backdrop-blur-md border border-gray-700/50 hover:border-red-500 transition-all duration-300"
            >
              <WrenchScrewdriverIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2 font-[Raleway]">Pending Services</h3>
              <p className="text-gray-300 font-[Open Sans] text-2xl font-bold">{services.filter(s => s.status === 'Pending').length}</p>
            </motion.div>
            <motion.div
              variants={itemVariants}
              whileHover="hover"
              className="p-6 rounded-lg shadow-lg text-center bg-white/10 backdrop-blur-md border border-gray-700/50 hover:border-red-500 transition-all duration-300"
            >
              <ChartBarIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2 font-[Raleway]">Total Revenue</h3>
              <p className="text-gray-300 font-[Open Sans] text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
            </motion.div>
          </motion.section>

          {/* Service Management */}
          <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3"
            >
              <h2 className="text-2xl font-bold text-white font-[Poppins]">Service Management</h2>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="p-2 rounded-md border bg-gray-800 text-white border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 font-[Open Sans]"
                >
                  <option value="All">All Services</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 hover:scale-110 transition-all duration-200 ease-in-out flex items-center gap-1"
                >
                  <PlusIcon className="h-5 w-5" /> Add Service
                </button>
              </div>
            </motion.div>
            <motion.div variants={itemVariants} className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg shadow-lg bg-white/10 backdrop-blur-md">
                <thead>
                  <tr className="bg-red-600 text-white">
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Customer</th>
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Date</th>
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Service Type</th>
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Status</th>
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Cost</th>
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-700/50">
                      <td className="border border-gray-700/50 p-3 font-[Open Sans] text-gray-300">{service.customer}</td>
                      <td className="border border-gray-700/50 p-3 font-[Open Sans] text-gray-300">{service.date}</td>
                      <td className="border border-gray-700/50 p-3 font-[Open Sans] text-gray-300">{service.type}</td>
                      <td className="border border-gray-700/50 p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-[Open Sans] ${
                            service.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {service.status}
                        </span>
                      </td>
                      <td className="border border-gray-700/50 p-3 font-[Open Sans] text-gray-300">${service.cost.toFixed(2)}</td>
                      <td className="border border-gray-700/50 p-3 flex gap-2">
                        <button
                          onClick={() => handleEditClick(service)}
                          className="text-red-500 hover:text-red-400 hover:scale-125 transition-all duration-200 ease-in-out"
                          title="Edit"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="text-red-500 hover:text-red-400 hover:scale-125 transition-all duration-200 ease-in-out"
                          title="Delete"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </motion.section>

          {/* Add Service Modal */}
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="p-6 rounded-lg shadow-xl w-full max-w-md bg-gray-800 text-white"
              >
                <h3 className="text-xl font-semibold mb-4 font-[Raleway] text-white">Add New Service</h3>
                <form onSubmit={handleServiceSubmit} className="space-y-4 font-[Open Sans]">
                  <div>
                    <label className="block mb-1 text-gray-300">Customer Name</label>
                    <input
                      type="text"
                      value={newService.customer}
                      onChange={(e) => setNewService({ ...newService, customer: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Date</label>
                    <input
                      type="date"
                      value={newService.date}
                      onChange={(e) => setNewService({ ...newService, date: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Service Type</label>
                    <input
                      type="text"
                      value={newService.type}
                      onChange={(e) => setNewService({ ...newService, type: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., Oil Change"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Status</label>
                    <select
                      value={newService.status}
                      onChange={(e) => setNewService({ ...newService, status: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Cost ($)</label>
                    <input
                      type="number"
                      value={newService.cost}
                      onChange={(e) => setNewService({ ...newService, cost: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
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
                      className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-500 hover:scale-105 transition-all duration-200 ease-in-out transform"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 hover:scale-105 transition-all duration-200 ease-in-out transform"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}

          {/* Edit Service Modal */}
          {showEditModal && editService && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className="p-6 rounded-lg shadow-xl w-full max-w-md bg-gray-800 text-white"
              >
                <h3 className="text-xl font-semibold mb-4 font-[Raleway] text-white">Edit Service</h3>
                <form onSubmit={handleEditSubmit} className="space-y-4 font-[Open Sans]">
                  <div>
                    <label className="block mb-1 text-gray-300">Customer Name</label>
                    <input
                      type="text"
                      value={editService.customer}
                      onChange={(e) => setEditService({ ...editService, customer: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Date</label>
                    <input
                      type="date"
                      value={editService.date}
                      onChange={(e) => setEditService({ ...editService, date: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Service Type</label>
                    <input
                      type="text"
                      value={editService.type}
                      onChange={(e) => setEditService({ ...editService, type: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Status</label>
                    <select
                      value={editService.status}
                      onChange={(e) => setEditService({ ...editService, status: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Cost ($)</label>
                    <input
                      type="number"
                      value={editService.cost}
                      onChange={(e) => setEditService({ ...editService, cost: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowEditModal(false)}
                      className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-500 hover:scale-105 transition-all duration-200 ease-in-out transform"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 hover:scale-105 transition-all duration-200 ease-in-out transform"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </motion.main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AdminDashboard;