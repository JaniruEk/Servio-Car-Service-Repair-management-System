import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  WrenchScrewdriverIcon,
  CalendarIcon,
  UserGroupIcon,
  DocumentTextIcon,
  UsersIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
// import Header from "../components/Header";
import Footer from "../components/Footer";
import TechnicianSidebar from "../components/TechnicianSidebar";

const TechnicianDashboard = ({ user }) => {
  const navigate = useNavigate();

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
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
    },
    {
      vehicle: "Ford Focus",
      service: "Oil Change",
      priority: "Medium",
      due: "2025-03-20 17:00",
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
    },
    {
      vehicle: "Honda Civic",
      service: "Tire Rotation",
      priority: "Low",
      due: "2025-03-21 10:00",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
    },
  ];

  // Animation Variants (same as AboutUs.jsx)
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.02, transition: { duration: 0.3 } },
  };

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

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-900 text-white font-sans bg-cover bg-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')",
        backgroundAttachment: "fixed", // Makes the image static
  backgroundSize: "cover", // Ensures the image covers the container (optional, already implied by bg-cover)
  backgroundPosition: "center", // Centers the image (optional, already implied by bg-center)
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Main Content with Sidebar */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-1 relative z-10"
      >
        {/* Sidebar */}
        <TechnicianSidebar user={user} activePath="/dashboard" />

        {/* Main Content */}
        <motion.main className="flex-1 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <header className="bg-white/10 backdrop-blur-md text-white p-6 rounded-lg mb-6 flex justify-between items-center shadow-lg">
            <div>
              <h1 className="text-3xl font-extrabold font-[Poppins] tracking-tight">
                Servio Technician Dashboard
              </h1>
              <p className="text-sm mt-1 font-[Open Sans] text-gray-300">
                Manage your account with ease
              </p>
            </div>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Stats and Quick Actions */}
            <div className="space-y-8">
              {/* Today’s Tasks Card */}
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover="hover"
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-xl font-bold font-[Poppins] mb-4 flex items-center"
                >
                  <WrenchScrewdriverIcon className="h-6 w-6 text-red-500 mr-2" />
                  Today’s Tasks
                </motion.h2>
                <motion.div
                  variants={itemVariants}
                  className="space-y-2 font-[Open Sans] text-gray-300"
                >
                  <p>
                    Tasks Today: <span className="font-semibold">{stats.tasksToday}</span>
                  </p>
                  <p className="text-green-400">
                    Completed: <span className="font-semibold">{stats.completed}</span>
                  </p>
                  <p className="text-yellow-400">
                    Pending: <span className="font-semibold">{stats.pending}</span>
                  </p>
                  <p className="text-red-400">
                    Urgent: <span className="font-semibold">{stats.urgent}</span>
                  </p>
                </motion.div>
              </motion.div>

              {/* Overview Card */}
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover="hover"
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-xl font-bold font-[Poppins] mb-4 flex items-center"
                >
                  <DocumentTextIcon className="h-6 w-6 text-red-500 mr-2" />
                  Overview
                </motion.h2>
                <motion.div
                  variants={itemVariants}
                  className="space-y-2 font-[Open Sans] text-gray-300"
                >
                  <p>
                    Assigned Jobs: <span className="font-semibold">{stats.assignedJobs}</span>
                  </p>
                  <p className="text-green-400">
                    Completed Jobs: <span className="font-semibold">{stats.completedJobs}</span>
                  </p>
                  <p className="text-yellow-400">
                    Pending Requests: <span className="font-semibold">{stats.pendingRequests}</span>
                  </p>
                </motion.div>
              </motion.div>

              {/* Quick Actions */}
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover="hover"
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-xl font-bold font-[Poppins] mb-4 flex items-center"
                >
                  <CalendarIcon className="h-6 w-6 text-red-500 mr-2" />
                  Quick Actions
                </motion.h2>
                <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
                  <Link
                    to="/job-list"
                    className="flex items-center bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition-all duration-300 no-underline font-[Raleway]"
                  >
                    <WrenchScrewdriverIcon className="h-5 w-5 mr-2" />
                    Job List
                  </Link>
                  <Link
                    to="/update-status"
                    className="flex items-center bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition-all duration-300 no-underline font-[Raleway]"
                  >
                    <WrenchScrewdriverIcon className="h-5 w-5 mr-2" />
                    Update Status
                  </Link>
                  <Link
                    to="/parts-request"
                    className="flex items-center bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition-all duration-300 no-underline font-[Raleway]"
                  >
                    <CalendarIcon className="h-5 w-5 mr-2" />
                    Vehicle Parts Request
                  </Link>
                </motion.div>
              </motion.div>
            </div>

            {/* Right Column: Recent Jobs List */}
            <div className="lg:col-span-2">
              <motion.div
                variants={sectionVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                whileHover="hover"
                className="bg-white/10 backdrop-blur-md p-6 rounded-xl"
              >
                <motion.h2
                  variants={itemVariants}
                  className="text-xl font-bold font-[Poppins] mb-4 flex items-center"
                >
                  <UserGroupIcon className="h-6 w-6 text-red-500 mr-2" />
                  Recent Jobs
                </motion.h2>
                <div className="relative">
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {recentJobs.map((job, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover="hover"
                        className="flex items-center bg-white/5 rounded-lg p-4 hover:bg-white/10 transition-all duration-300"
                      >
                        <img
                          src={job.image}
                          alt={job.vehicle}
                          className="w-16 h-16 object-cover rounded-lg mr-4"
                        />
                        <div className="flex-1 font-[Open Sans] text-gray-300">
                          <p className="text-base font-semibold">
                            {job.vehicle} - {job.service}
                          </p>
                          <p>
                            Priority:{" "}
                            <span
                              className={
                                job.priority === "High"
                                  ? "text-red-400"
                                  : job.priority === "Medium"
                                  ? "text-yellow-400"
                                  : "text-green-400"
                              }
                            >
                              {job.priority}
                            </span>
                          </p>
                          <p>Due: {job.due}</p>
                        </div>
                        <Link
                          to={`/job-details/${index}`}
                          className="flex items-center bg-red-600 text-white px-4 py-2 rounded-full font-medium hover:bg-red-700 transition-all duration-300 no-underline font-[Raleway]"
                        >
                          <WrenchScrewdriverIcon className="h-5 w-5 mr-2" />
                          View Details
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.main>
      </motion.div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TechnicianDashboard;