// src/components/ServiceCenter.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCar,
  FaWrench,
  FaUsers,
  FaStar,
  FaArrowRight,
} from "react-icons/fa"; // Modern icons

const ServiceCenter = () => {
  const services = [
    {
      title: "Brake Repair",
      description: "Ensure your vehicle's safety with our expert brake repair services.",
      image: "https://via.placeholder.com/300x200?text=Brake+Repair",
    },
    {
      title: "Oil Change",
      description: "Keep your engine running smoothly with a quick and efficient oil change.",
      image: "https://via.placeholder.com/300x200?text=Oil+Change",
    },
    {
      title: "Tire Rotation",
      description: "Extend the life of your tires with our professional tire rotation service.",
      image: "https://via.placeholder.com/300x200?text=Tire+Rotation",
    },
    {
      title: "Engine Diagnostics",
      description: "Diagnose and fix engine issues with our advanced diagnostic tools.",
      image: "https://via.placeholder.com/300x200?text=Engine+Diagnostics",
    },
  ];

  const stats = [
    { label: "Total Services", value: "1,250+", icon: <FaWrench /> },
    { label: "Happy Customers", value: "950+", icon: <FaUsers /> },
    { label: "Customer Rating", value: "4.8/5", icon: <FaStar /> },
  ];

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.2 },
    }),
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const statVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: (i) => ({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, delay: i * 0.2 },
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 shadow-lg sticky top-0 z-10">
        <div className="flex items-center">
          <FaWrench className="text-3xl text-indigo-500 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800 font-poppins">
            Service Center
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/dashboard"
            className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 no-underline font-inter font-medium"
          >
            <FaCar className="mr-2" />
            Dashboard
          </Link>
          <Link
            to="/job-list"
            className="flex items-center bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-indigo-800 transition-all duration-300 no-underline font-inter font-medium"
          >
            <FaCar className="mr-2" />
            Job List
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative bg-cover bg-center rounded-xl shadow-xl mb-8 p-8 text-white"
          style={{
            backgroundImage:
              "url('https://via.placeholder.com/1200x300?text=Service+Center')",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <h2 className="text-3xl font-bold mb-2 font-poppins">
            Welcome to Our Service Center
          </h2>
          <p className="text-lg font-inter">
            We provide top-notch vehicle repair and maintenance services to keep
            you on the road.
          </p>
        </motion.div>

        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center font-poppins">
            <FaCar className="mr-2 text-indigo-500" />
            Our Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-white p-4 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800 mb-2 font-poppins">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 font-inter">
                  {service.description}
                </p>
                <Link
                  to={`/service-details/${index}`}
                  className="flex items-center text-indigo-500 hover:text-indigo-700 font-inter font-medium"
                >
                  Learn More <FaArrowRight className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Stats Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center font-poppins">
            <FaStar className="mr-2 text-yellow-500" />
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={statVariants}
                initial="hidden"
                animate="visible"
                className="bg-white p-6 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90 text-center"
              >
                <div className="text-3xl text-indigo-500 mb-4">
                  {stat.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2 font-poppins">
                  {stat.value}
                </h3>
                <p className="text-sm text-gray-600 font-inter">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ServiceCenter;