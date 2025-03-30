import { auth } from '../firebase';

// function OwnerHome() {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 p-4">
//       <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg border border-gray-100 text-center">
//         <h1 className="text-3xl font-bold text-blue-900 mb-6">Owner Home</h1>
//         <p className="text-gray-700 mb-4">Welcome, Vehicle Owner! (Dummy Screen)</p>
//         <button
//           onClick={() => auth.signOut()}
//           className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
//         >
//           Logout
//         </button>
//       </div>
//     </div>
//   );
// }

// export default OwnerHome;

// src/components/CustomerDashboard.jsx
import React, { useState, useEffect } from 'react';
import { FaBars, FaEdit, FaTrash, FaCalendar, FaWrench } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // For navigation
import { motion } from "framer-motion"; // For animations
import Footer from '../components/Footer';

function OwnerHome() {
  const navigate = useNavigate(); // Hook for navigation
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [services, setServices] = useState(() => {
    // Initialize from local storage if available, otherwise use default data
    const savedServices = localStorage.getItem('services');
    return savedServices
      ? JSON.parse(savedServices)
      : [
          { id: 1, date: 'March 10, 2025', type: 'Oil Change', status: 'Completed', cost: 50 },
          { id: 2, date: 'Feb 20, 2025', type: 'Brake Repair', status: 'Completed', cost: 150 },
          { id: 3, date: 'April 15, 2025', type: 'Tire Rotation', status: 'Pending', cost: 80 },
        ];
  });
  const [filterStatus, setFilterStatus] = useState('All');
  const [showEditModal, setShowEditModal] = useState(false);
  const [editService, setEditService] = useState(null);
  const [showStatusDropdownEdit, setShowStatusDropdownEdit] = useState(false);

  const statuses = ['Pending', 'Completed'];

  // Update local storage whenever services change
  useEffect(() => {
    localStorage.setItem('services', JSON.stringify(services));
  }, [services]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);
  const filteredServices = filterStatus === 'All' ? services : services.filter(service => service.status === filterStatus);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setServices(services.map(service => 
      service.id === editService.id ? { ...editService, cost: Number(editService.cost) } : service
    ));
    setEditService(null);
    setShowEditModal(false);
    setShowStatusDropdownEdit(false);
  };

  const handleDelete = (id) => setServices(services.filter(service => service.id !== id));
  const handleEditClick = (service) => {
    setEditService({ ...service });
    setShowEditModal(true);
  };

  // Framer Motion animation variants
  const slideUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const scaleUpVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeIn" } }
  };

  const pulseVariants = {
    pulse: {
      scale: [1, 1.1, 1],
      transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    }
  };

  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, delay: i * 0.1, ease: "easeOut" }
    })
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100 text-gray-900">
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 w-64 bg-gray-800 text-white p-5 transform 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
          md:static md:translate-x-0 md:w-64 md:min-w-[16rem] transition-transform duration-300 ease-in-out z-20`}>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-center text-2xl font-extrabold flex-1 font-[Poppins] tracking-tight">Servio Dashboard</h2>
            <button className="md:hidden text-2xl hover:text-orange-500 transition-colors duration-200" onClick={toggleSidebar}>
              ×
            </button>
          </div>
          <ul className="space-y-2 font-[Open Sans]">
            {[
              { text: 'Home', path: '/dashboard', active: true },
              { text: 'Profile', path: '/profile' },
              { text: 'Contact Technician', path: '/contact-technician' },
              { text: 'Book Service Center', path: '/book-service-center' },
              { text: 'Contact Us', path: '/contact' },
              { text: 'About Us', path: '/about-us' },
              { text: 'Logout', path: '/logout' },
            ].map((item) => (
              <li key={item.text} className="border-b border-gray-600">
                <a 
                  href={item.path}
                  className={`block py-3 px-4 hover:bg-orange-700 hover:scale-105 transition-all duration-300 ease-in-out transform ${
                    item.active ? 'bg-orange-600 font-bold scale-105' : ''
                  }`}
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Mobile Menu Button */}
        <motion.button 
          className="md:hidden fixed top-4 left-4 z-30 p-2 bg-orange-600 text-white rounded-full hover:bg-orange-700 hover:scale-110 transition-all duration-200 ease-in-out"
          onClick={toggleSidebar}
          variants={pulseVariants}
          animate="pulse"
        >
          <FaBars />
        </motion.button>

        {/* Main Content */}
        <main className="flex-1 p-5 max-w-7xl mx-auto w-full">
          <motion.header 
            className="bg-gradient-to-r from-orange-600 to-orange-800 text-white p-4 rounded-lg mb-6 flex justify-between items-center shadow-lg"
            initial="hidden"
            animate="visible"
            variants={slideUpVariants}
          >
            <h1 className="text-3xl font-extrabold font-[Poppins] tracking-tight">Welcome to Servio</h1>
          </motion.header>

          {/* Overview Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <motion.div 
              className="p-5 rounded-lg shadow-lg text-center bg-white"
              initial="hidden"
              animate="visible"
              variants={scaleUpVariants}
            >
              <FaCalendar className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 font-[Raleway]">Upcoming Service</h3>
              <p className="text-gray-600 font-[Open Sans]">
                {services.find(s => s.status === 'Pending')?.date || 'No upcoming services scheduled.'}
              </p>
              <button 
                onClick={() => navigate('/book-service-center')} // Redirect to BookServiceCenter
                className="mt-2 text-orange-600 hover:text-orange-800 hover:underline hover:scale-105 transition-all duration-300 ease-in-out transform"
              >
                Schedule Now
              </button>
            </motion.div>
            <motion.div 
              className="p-5 rounded-lg shadow-lg text-center bg-white"
              initial="hidden"
              animate="visible"
              variants={scaleUpVariants}
              transition={{ delay: 0.1 }} // Replaces animate-delay-100
            >
              <FaWrench className="h-12 w-12 text-orange-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2 font-[Raleway]">Total Services</h3>
              <p className="text-gray-600 font-[Open Sans]">
                {services.filter(s => s.status === 'Completed').length} Services Completed
              </p>
            </motion.div>
          </section>

          {/* Service History */}
          <section className="mb-8">
            <motion.div 
              className="flex flex-col sm:flex-row justify-between items-center mb-3 gap-3"
              initial="hidden"
              animate="visible"
              variants={slideUpVariants}
            >
              <h2 className="text-2xl font-bold text-gray-800 font-[Poppins]">Your Service History</h2>
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
              </div>
            </motion.div>
            <div className="overflow-x-auto">
              <motion.table 
                className="w-full border-collapse rounded-lg shadow-lg bg-white"
                initial="hidden"
                animate="visible"
                variants={fadeInVariants}
              >
                <thead>
                  <tr className="bg-gradient-to-r from-orange-600 to-orange-800 text-white">
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Date</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Service Type</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Status</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Cost</th>
                    <th className="border border-gray-200 p-3 text-left font-[Raleway]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((service, index) => (
                    <motion.tr 
                      key={service.id} 
                      className="hover:bg-gray-50"
                      custom={index}
                      initial="hidden"
                      animate="visible"
                      variants={rowVariants}
                    >
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
                    </motion.tr>
                  ))}
                </tbody>
              </motion.table>
            </div>
          </section>

          {/* Edit Service Modal */}
          {showEditModal && editService && (
            <motion.div 
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
            >
              <motion.div 
                className="p-6 rounded-lg shadow-xl w-full max-w-md bg-white text-gray-900"
                variants={modalVariants}
              >
                <h3 className="text-xl font-semibold mb-4 font-[Raleway] text-gray-800">Edit Service</h3>
                <form onSubmit={handleEditSubmit} className="space-y-4 font-[Open Sans]">
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
                  <div className="relative">
                    <label className="block mb-1 text-gray-800">Status</label>
                    <button
                      type="button"
                      onClick={() => setShowStatusDropdownEdit(!showStatusDropdownEdit)}
                      className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 text-left focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center"
                    >
                      {editService.status || 'Select a Status'}
                      <span>{showStatusDropdownEdit ? '▲' : '▼'}</span>
                    </button>
                    {showStatusDropdownEdit && (
                      <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                        {statuses.map((status) => (
                          <li
                            key={status}
                            onClick={() => {
                              setEditService({ ...editService, status });
                              setShowStatusDropdownEdit(false);
                            }}
                            className="p-2 hover:bg-orange-100 cursor-pointer"
                          >
                            {status}
                          </li>
                        ))}
                      </ul>
                    )}
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
                      onClick={() => {
                        setShowEditModal(false);
                        setShowStatusDropdownEdit(false);
                      }}
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
              </motion.div>
            </motion.div>
          )}
        </main>
      </div>

      {/* Footer - Full Width */}
      <Footer />
    </div>
  );
}

export default OwnerHome;