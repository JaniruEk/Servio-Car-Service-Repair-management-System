
// src/components/ContactTechnician.jsx
import React, { useState } from 'react';
import { motion } from "framer-motion"; // For animations
import Footer from '../components/Footer';

function ContactTechnician() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    contactNumber: '',
    address: '',
    vehicleMake: '',
    vehicleModel: '',
    vehicleYear: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission (e.g., API call)
    console.log('Form submitted:', formData);
    alert('Your message has been sent to the technician!');
    setFormData({ name: '', email: '', contactNumber: '', address: '', vehicleMake: '', vehicleModel: '', vehicleYear: '', message: '' });
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

  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-100 text-gray-900">
      <motion.header 
        className="bg-gradient-to-r from-orange-600 to-orange-800 text-white p-4 shadow-lg"
        initial="hidden"
        animate="visible"
        variants={slideUpVariants}
      >
        <h1 className="text-3xl font-extrabold font-[Poppins] tracking-tight text-center">Contact a Technician</h1>
      </motion.header>

      <main className="flex-1 p-5 max-w-4xl mx-auto w-full">
        <motion.h2 
          className="text-2xl font-semibold text-gray-800 mb-4 font-[Raleway] text-center"
          initial="hidden"
          animate="visible"
          variants={slideUpVariants}
        >
          Get in Touch
        </motion.h2>
        <motion.p 
          className="text-gray-600 mb-6 font-[Open Sans] text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
        >
          Fill out the form below with your details and vehicle information to send a message to one of our technicians. We’ll get back to you as soon as possible!
        </motion.p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Two Boxes Side by Side */}
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
                <div>
                  <label htmlFor="address" className="block mb-1 text-gray-800 font-[Open Sans]">Customer Address</label>
                  <textarea
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y"
                    rows="3"
                    placeholder="e.g., 123 Main St, City, State, ZIP"
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
              transition={{ delay: 0.1 }} // Slight delay for staggered effect
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

          {/* Message Box */}
          <motion.section 
            className="bg-white p-6 rounded-lg shadow-lg"
            initial="hidden"
            animate="visible"
            variants={scaleUpVariants}
          >
            <div className="space-y-4">
              <div>
                <label htmlFor="message" className="block mb-1 text-gray-800 font-[Open Sans]">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md bg-white border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 resize-y"
                  rows="4"
                  placeholder="Type your message here..."
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <motion.button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-orange-600 to-orange-800 text-white rounded-md hover:bg-orange-700 hover:scale-105 transition-all duration-200 ease-in-out transform"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send Message
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

export default ContactTechnician;
