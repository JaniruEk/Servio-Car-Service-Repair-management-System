import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // For animations
import {
  FaClipboardList,
  FaChartBar,
  FaBolt,
  FaCar,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa"; // Modern icons

const Dashboard = () => {
  const stats = {
    tasksToday: 4,
    completed: 1,
    pending: 3,
    urgent: 1,
    assignedJobs: 5,
    completedJobs: 2,
    pendingRequests: 3,
  };

  const recentJobs = [
    {
      vehicle: "Toyota Camry",
      service: "Brake Repair",
      priority: "High",
      due: "2025-03-20 15:00",
      image: "./images/toyota.jpg",
    },
    {
      vehicle: "Ford Focus",
      service: "Oil Change",
      priority: "Medium",
      due: "2025-03-20 17:00",
      image: "./images/ford.jpg",
    },
    {
      vehicle: "Honda Civic",
      service: "Tire Rotation",
      priority: "Low",
      due: "2025-03-21 10:00",
      image: "./images/hondacivic.jpg",
    },
  ];

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.02, transition: { duration: 0.3 } },
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: "url('./images/tpr.jpg')",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        backgroundBlendMode: "overlay",
      }}
    >
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 shadow-lg sticky top-0 z-10">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40?text=Logo"
            alt="Logo"
            className="w-12 h-12 mr-3 rounded-full"
          />
          <h1 className="text-2xl font-bold text-gray-800">
            Technician Dashboard
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/profile"
            className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 no-underline"
          >
            <FaUser className="mr-2" />
            Technician Profile
          </Link>
          <button className="flex items-center bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-800 transition-all duration-300">
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="max-w-7xl mx-auto py-8 px-4">
        {/* Hero Section with Background Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative bg-cover bg-center rounded-xl shadow-xl mb-8 p-8 text-white"
          style={{
            backgroundImage:
              "url('https://via.placeholder.com/1200x300?text=Vehicle+Repair+Shop')",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <h2 className="text-3xl font-bold mb-2">
            Welcome Back, Technician!
          </h2>
          <p className="text-lg">
            Manage your tasks efficiently and keep vehicles running smoothly.
          </p>
        </motion.div>

        {/* Stats and Jobs Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Stats and Quick Actions */}
          <div className="space-y-6">
            {/* Today’s Tasks Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white p-6 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaClipboardList className="mr-2 text-blue-500" />
                Today’s Tasks
              </h2>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Tasks Today: <span className="font-semibold">{stats.tasksToday}</span>
                </p>
                <p className="text-sm text-green-600">
                  Completed: <span className="font-semibold">{stats.completed}</span>
                </p>
                <p className="text-sm text-orange-600">
                  Pending: <span className="font-semibold">{stats.pending}</span>
                </p>
                <p className="text-sm text-red-600">
                  Urgent: <span className="font-semibold">{stats.urgent}</span>
                </p>
              </div>
            </motion.div>

            {/* Overview Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white p-6 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaChartBar className="mr-2 text-green-500" />
                Overview
              </h2>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">
                  Assigned Jobs: <span className="font-semibold">{stats.assignedJobs}</span>
                </p>
                <p className="text-sm text-green-600">
                  Completed Jobs: <span className="font-semibold">{stats.completedJobs}</span>
                </p>
                <p className="text-sm text-orange-600">
                  Pending Requests: <span className="font-semibold">{stats.pendingRequests}</span>
                </p>
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              className="bg-white p-6 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90"
            >
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaBolt className="mr-2 text-yellow-500" />
                Quick Actions
              </h2>
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300">
                  <Link
                    to="/job-list"
                    className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 no-underline">  
                  <FaBolt className="mr-2" />
                  Job List
                  </Link>
                </button>
                <button className="flex items-center bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-300">
                  <FaBolt className="mr-2" />
                  Update Status
                </button>
                <button className="flex items-center bg-gradient-to-r from-zinc-600 to-zinc-800 text-white px-4 py-2 rounded-lg hover:from-zinc-700 hover:to-zinc-900 transition-all duration-300">
                  <Link
                    to="/parts-request"
                    className="flex items-center bg-gradient-to-r from-zinc-600 to-zinc-800 text-white px-4 py-2 rounded-lg hover:from-zinc-700 hover:to-zinc-900 transition-all duration-300 no-underline">  
                  <FaBolt className="mr-2" />
                  VehiclePartsRequest
                  </Link>
                </button>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Recent Jobs List */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <FaCar className="mr-2 text-indigo-500" />
                Recent Jobs
              </h2>
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {recentJobs.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-all duration-300 shadow-sm"
                  >
                    <img
                      src={job.image}
                      alt={job.service}
                      className="w-24 h-16 object-cover rounded-lg mr-4"
                    />
                    <div className="flex-1">
                      <p className="text-base font-semibold text-gray-800">
                        {job.vehicle} - {job.service}
                      </p>
                      <p className="text-sm text-gray-600">
                        Priority:{" "}
                        <span
                          className={
                            job.priority === "High"
                              ? "text-red-500"
                              : job.priority === "Medium"
                              ? "text-orange-500"
                              : "text-green-500"
                          }
                        >
                          {job.priority}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">Due: {job.due}</p>
                    </div>
                    <Link
                      to={`/job-details/${index}`}
                      className="flex items-center bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-indigo-800 transition-all duration-300 no-underline"
                    >
                      <FaCar className="mr-2" />
                      View Details
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;