
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaCar, FaWrench } from "react-icons/fa"; // Modern icons

const JobList = () => {
  const jobs = [
    {
      id: "J1234",
      vehicle: "Toyota Camry",
      customer: "Chanuka Herath",
      service: "Brake Repair",
      status: "In Progress",
      image: "./images/toyota.jpg",
    },
    {
      id: "J1235",
      vehicle: "Ford Focus",
      customer: "Suneth Herath",
      service: "Oil Change",
      status: "Pending",
      image: "./images/ford.jpg",
    },
    {
      id: "J1236",
      vehicle: "Honda Civic",
      customer: "Lakshan Ekanayaka",
      service: "Tire Rotation",
      status: "In Progress",
      image: "./images/hondacivic.jpg",
    },
  ];

  // Animation variants for rows
  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
    hover: { backgroundColor: "#f3f4f6", transition: { duration: 0.3 } },
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('./images/profile.jpg')",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 shadow-lg sticky top-0 z-10 mb-8">
        <div className="flex items-center">
          <FaWrench className="text-3xl text-indigo-500 mr-3" />
          <h1 className="text-2xl font-bold text-gray-800 font-poppins">
            Job List
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/dashboard"
            className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 no-underline font-inter font-medium"
          >
            Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        <div className="bg-white p-6 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center font-poppins">
            <FaCar className="mr-2 text-indigo-500" />
            All Jobs
          </h2>
          {/* Table for Larger Screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left font-inter">
              <thead>
                <tr className="bg-gray-100">
                  <th className="p-4 text-sm text-gray-600 font-poppins font-semibold">
                    <input type="checkbox" className="mr-2" />
                  </th>
                  <th className="p-4 text-sm text-gray-600 font-poppins font-semibold">
                    Job ID
                  </th>
                  <th className="p-4 text-sm text-gray-600 font-poppins font-semibold">
                    Vehicle
                  </th>
                  <th className="p-4 text-sm text-gray-600 font-poppins font-semibold">
                    Customer
                  </th>
                  <th className="p-4 text-sm text-gray-600 font-poppins font-semibold">
                    Service
                  </th>
                  <th className="p-4 text-sm text-gray-600 font-poppins font-semibold">
                    Status
                  </th>
                  <th className="p-4 text-sm text-gray-600 font-poppins font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job, index) => (
                  <motion.tr
                    key={job.id}
                    custom={index}
                    variants={rowVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    className="border-b"
                  >
                    <td className="p-4">
                      <input type="checkbox" className="mr-2" />
                    </td>
                    <td className="p-4 text-sm text-gray-800 font-medium">
                      {job.id}
                    </td>
                    <td className="p-4 text-sm text-gray-800 font-medium flex items-center">
                      <img
                        src={job.image}
                        alt={job.vehicle}
                        className="w-12 h-8 object-cover rounded-lg mr-3"
                      />
                      {job.vehicle}
                    </td>
                    <td className="p-4 text-sm text-gray-800 font-medium">
                      {job.customer}
                    </td>
                    <td className="p-4 text-sm text-gray-800 font-medium">
                      {job.service}
                    </td>
                    <td className="p-4 text-sm text-gray-800 font-medium">
                      <span className="flex items-center">
                        <span
                          className={`w-3 h-3 rounded-full mr-2 ${
                            job.status === "In Progress"
                              ? "bg-green-500"
                              : "bg-red-500"
                          }`}
                        ></span>
                        {job.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Link
                        to={`/job-details/${job.id}`}
                        className="flex items-center bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-indigo-800 transition-all duration-300 no-underline font-inter font-medium"
                      >
                        <FaCar className="mr-2" />
                        View Details
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Card Layout for Mobile Screens */}
          <div className="md:hidden space-y-4">
            {jobs.map((job, index) => (
              <motion.div
                key={job.id}
                custom={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                className="bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <div className="flex items-center mb-3">
                  <input type="checkbox" className="mr-3" />
                  <img
                    src={job.image}
                    alt={job.vehicle}
                    className="w-16 h-12 object-cover rounded-lg mr-3"
                  />
                  <div>
                    <p className="text-base font-semibold text-gray-800 font-poppins">
                      {job.vehicle}
                    </p>
                    <p className="text-sm text-gray-600 font-inter">
                      Job ID: {job.id}
                    </p>
                  </div>
                </div>
                <div className="space-y-2 font-inter">
                  <p className="text-sm text-gray-600">
                    Customer: <span className="font-medium">{job.customer}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Service: <span className="font-medium">{job.service}</span>
                  </p>
                  <p className="text-sm text-gray-600">
                    Status:{" "}
                    <span className="flex items-center">
                      <span
                        className={`w-3 h-3 rounded-full mr-2 ${
                          job.status === "In Progress"
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      ></span>
                      <span className="font-medium">{job.status}</span>
                    </span>
                  </p>
                </div>
                <Link
                  to={`/job-details/${job.id}`}
                  className="flex items-center mt-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-indigo-800 transition-all duration-300 no-underline font-inter font-medium"
                >
                  <FaCar className="mr-2" />
                  View Details
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobList;