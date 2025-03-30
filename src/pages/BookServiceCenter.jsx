import React, { useState } from 'react';
import { motion } from "framer-motion"; // For animations
import Footer from '../components/Footer';

function BookServiceCenter() {
  const [formData, setFormData] = useState({
    serviceCenter: '',
    name: '',
    email: '',
    contactNumber: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    serviceType: '',
    serviceDate: '',
    serviceTime: '',
    message: ''
  });

  const [showServiceCenterDropdown, setShowServiceCenterDropdown] = useState(false);

  // Predefined list of service centers
  const serviceCenters = [
    'Downtown Auto Care - 123 Main St, City',
    'Northside Service Hub - 456 North Ave, City',
    'East End Garage - 789 East Rd, City',
    'Westside Mechanics - 321 West Blvd, City'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleServiceCenterSelect = (center) => {
    setFormData({ ...formData, serviceCenter: center });
    setShowServiceCenterDropdown(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.serviceCenter) {
      alert('Please select a service center before booking.');
      return;
    }
    // Simulate form submission (e.g., API call)
    console.log('Booking submitted:', formData);
    alert('Your service center booking has been submitted!');
    setFormData({
      serviceCenter: '',
      name: '',
      email: '',
      contactNumber: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      serviceType: '',
      serviceDate: '',
      serviceTime: '',
      message: ''
    });
  };

  // Framer Motion animation variants (same as CustomerDashboard)
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

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2, ease: "easeIn" } }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100 text-gray-900">
      <motion.header 
        className="bg-gradient-to-r from-orange-600 to-orange-800 text-white p-4 shadow-lg"
        initial="hidden"
        animate="visible"
        variants={slideUpVariants}
      >
        <h1 className="text-3xl font-extrabold font-[Poppins] tracking-tight text-center">Book a Service Center</h1>
      </motion.header>

      <main className="flex-1 p-5 max-w-4xl mx-auto w-full">
        <motion.h2 
          className="text-2xl font-semibold text-gray-800 mb-4 font-[Raleway] text-center"
          initial="hidden"
          animate="visible"
          variants={slideUpVariants}
        >
          Schedule Your Service
        </motion.h2>
        <motion.p 
          className="text-gray-600 mb-6 font-[Open Sans] text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          Select a service center and fill out the form below to book your appointment. We’ll confirm your booking soon!
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Service Center Selection */}
          <motion.section 
            className="bg-white p-6 rounded-lg shadow-lg"
            initial="hidden"
            animate="visible"
            variants={scaleUpVariants}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 font-[Raleway] border-b border-gray-300 pb-2">Select Service Center</h3>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowServiceCenterDropdown(!showServiceCenterDropdown)}
                className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 text-left focus:outline-none focus:ring-2 focus:ring-orange-500 flex justify-between items-center"
              >
                {formData.serviceCenter || 'Choose a Service Center'}
                <span>{showServiceCenterDropdown ? '▲' : '▼'}</span>
              </button>
              {showServiceCenterDropdown && (
                <motion.ul 
                  className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg"
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={modalVariants}
                >
                  {serviceCenters.map((center) => (
                    <li
                      key={center}
                      onClick={() => handleServiceCenterSelect(center)}
                      className="p-2 hover:bg-orange-100 cursor-pointer font-[Open Sans]"
                    >
                      {center}
                    </li>
                  ))}
                </motion.ul>
              )}
            </div>
          </motion.section>

          {/* Customer and Vehicle Details Side by Side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Customer Details Box */}
            <motion.section 
              className="bg-white p-6 rounded-lg shadow-lg"
              initial="hidden"
              animate="visible"
              variants={scaleUpVariants}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4 font-[Raleway] border-b border-gray-300 pb-2">Customer Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block mb-1 text-gray-800 font-[Open Sans]">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., John Doe"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block mb-1 text-gray-800 font-[Open Sans]">Your Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., john.doe@example.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="contactNumber" className="block mb-1 text-gray-800 font-[Open Sans]">Contact Number</label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., +1 123-456-7890"
                    required
                  />
                </div>
              </div>
            </motion.section>

            {/* Vehicle Details Box */}
            <motion.section 
              className="bg-white p-6 rounded-lg shadow-lg"
              initial="hidden"
              animate="visible"
              variants={scaleUpVariants}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-xl font-semibold text-gray-800 mb-4 font-[Raleway] border-b border-gray-300 pb-2">Vehicle Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="vehicleMake" className="block mb-1 text-gray-800 font-[Open Sans]">Vehicle Make</label>
                  <input
                    type="text"
                    id="vehicleMake"
                    name="vehicleMake"
                    value={formData.vehicleMake}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Toyota"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="vehicleModel" className="block mb-1 text-gray-800 font-[Open Sans]">Vehicle Model</label>
                  <input
                    type="text"
                    id="vehicleModel"
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., Camry"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="vehicleYear" className="block mb-1 text-gray-800 font-[Open Sans]">Vehicle Year</label>
                  <input
                    type="number"
                    id="vehicleYear"
                    name="vehicleYear"
                    value={formData.vehicleYear}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="e.g., 2020"
                    min="1900"
                    max={new Date().getFullYear() + 1}
                    required
                  />
                </div>
              </div>
            </motion.section>
          </div>

          {/* Service Details Box */}
          <motion.section 
            className="bg-white p-6 rounded-lg shadow-lg"
            initial="hidden"
            animate="visible"
            variants={scaleUpVariants}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4 font-[Raleway] border-b border-gray-300 pb-2">Service Details</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="serviceType" className="block mb-1 text-gray-800 font-[Open Sans]">Service Type</label>
                <input
                  type="text"
                  id="serviceType"
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="e.g., Oil Change"
                  required
                />
              </div>
              <div>
                <label htmlFor="serviceDate" className="block mb-1 text-gray-800 font-[Open Sans]">Service Date</label>
                <input
                  type="date"
                  id="serviceDate"
                  name="serviceDate"
                  value={formData.serviceDate}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  min={new Date().toISOString().split('T')[0]} // Prevents past dates
                  required
                />
              </div>
              <div>
                <label htmlFor="serviceTime" className="block mb-1 text-gray-800 font-[Open Sans]">Service Time</label>
                <input
                  type="time"
                  id="serviceTime"
                  name="serviceTime"
                  value={formData.serviceTime}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  required
                />
              </div>
            </div>
          </motion.section>

          {/* Message Box */}
          <motion.section 
            className="bg-white p-6 rounded-lg shadow-lg"
            initial="hidden"
            animate="visible"
            variants={scaleUpVariants}
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="message" className="block mb-1 text-gray-800 font-[Open Sans]">Additional Notes</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y"
                  rows="4"
                  placeholder="Any additional notes or requests..."
                />
              </div>
              <div className="flex justify-end gap-2">
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-800 text-white rounded-md hover:bg-orange-700 hover:scale-105 transition-all duration-200 ease-in-out transform"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Service
                </motion.button>
              </div>
            </div>
          </motion.section>
        </form>
      </main>

      {/* Footer - Full Width */}
      <Footer />
    </div>
  );
}

export default BookServiceCenter;

