// // src/pages/TechnicianDashboard.jsx
// import React from "react";
// import { Link } from "react-router-dom";
// import { motion } from "framer-motion";
// import {
//   ClipboardDocumentListIcon,
//   ChartBarIcon,
//   BoltIcon,
//   CarIcon,
// } from "@heroicons/react/24/outline"; // Heroicons
//  import Footer from "../components/Footer"; // Import the Footer component

// const TechnicianDashboard = () => {
//   const stats = {
//     tasksToday: 4,
//     completed: 1,
//     pending: 3,
//     urgent: 1,
//     assignedJobs: 5,
//     completedJobs: 2,
//     pendingRequests: 3,
//   };

//   const recentJobs = [
//     {
//       vehicle: "Toyota Camry",
//       service: "Brake Repair",
//       priority: "High",
//       due: "2025-03-20 15:00",
//       image: "https://via.placeholder.com/150?text=Toyota+Camry", // Updated to placeholder URL
//     },
//     {
//       vehicle: "Ford Focus",
//       service: "Oil Change",
//       priority: "Medium",
//       due: "2025-03-20 17:00",
//       image: "https://via.placeholder.com/150?text=Ford+Focus", // Updated to placeholder URL
//     },
//     {
//       vehicle: "Honda Civic",
//       service: "Tire Rotation",
//       priority: "Low",
//       due: "2025-03-21 10:00",
//       image: "https://via.placeholder.com/150?text=Honda+Civic", // Updated to placeholder URL
//     },
//   ];

//   // Animation variants for cards (aligned with AboutUs.jsx)
//   const cardVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
//     hover: { scale: 1.02, transition: { duration: 0.3 } },
//   };

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//         delayChildren: 0.3,
//       },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 30 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//     hover: { scale: 1.05, transition: { duration: 0.3 } },
//   };

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-900 text-white font-sans">
//       {/* Main Section */}
//       <main className="max-w-7xl mx-auto py-8 px-4 flex-1">
//         {/* Hero Section */}
//         <motion.div
//           initial={{ opacity: 0, scale: 0.95 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.7 }}
//           className="relative bg-cover bg-center rounded-xl shadow-xl mb-8 p-8 text-white bg-white/10 backdrop-blur-md border border-gray-700/50"
//           style={{
//             backgroundImage:
//               "url('https://via.placeholder.com/1200x300?text=Vehicle+Repair+Shop')",
//             backgroundBlendMode: "overlay",
//             backgroundColor: "rgba(0, 0, 0, 0.5)",
//           }}
//         >
//           <h2 className="text-3xl font-bold mb-2 font-[Poppins] bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
//             Welcome Back, Technician!
//           </h2>
//           <p className="text-lg font-[Open Sans] text-gray-300">
//             Manage your tasks efficiently and keep vehicles running smoothly.
//           </p>
//         </motion.div>

//         {/* Stats and Jobs Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//           {/* Left Column: Stats and Quick Actions */}
//           <div className="space-y-6">
//             {/* Today’s Tasks Card */}
//             <motion.div
//               variants={cardVariants}
//               initial="hidden"
//               animate="visible"
//               whileHover="hover"
//               className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700/50"
//             >
//               <h2 className="text-xl font-bold mb-4 flex items-center font-[Raleway] text-white">
//                 <ClipboardDocumentListIcon className="mr-2 h-6 w-6 text-red-500" />
//                 Today’s Tasks
//               </h2>
//               <div className="space-y-2 font-[Open Sans] text-gray-300">
//                 <p className="text-sm">
//                   Tasks Today: <span className="font-semibold">{stats.tasksToday}</span>
//                 </p>
//                 <p className="text-sm text-green-500">
//                   Completed: <span className="font-semibold">{stats.completed}</span>
//                 </p>
//                 <p className="text-sm text-orange-500">
//                   Pending: <span className="font-semibold">{stats.pending}</span>
//                 </p>
//                 <p className="text-sm text-red-500">
//                   Urgent: <span className="font-semibold">{stats.urgent}</span>
//                 </p>
//               </div>
//             </motion.div>

//             {/* Overview Card */}
//             <motion.div
//               variants={cardVariants}
//               initial="hidden"
//               animate="visible"
//               whileHover="hover"
//               className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700/50"
//             >
//               <h2 className="text-xl font-bold mb-4 flex items-center font-[Raleway] text-white">
//                 <ChartBarIcon className="mr-2 h-6 w-6 text-red-500" />
//                 Overview
//               </h2>
//               <div className="space-y-2 font-[Open Sans] text-gray-300">
//                 <p className="text-sm">
//                   Assigned Jobs: <span className="font-semibold">{stats.assignedJobs}</span>
//                 </p>
//                 <p className="text-sm text-green-500">
//                   Completed Jobs: <span className="font-semibold">{stats.completedJobs}</span>
//                 </p>
//                 <p className="text-sm text-orange-500">
//                   Pending Requests: <span className="font-semibold">{stats.pendingRequests}</span>
//                 </p>
//               </div>
//             </motion.div>

//             {/* Quick Actions */}
//             <motion.div
//               variants={cardVariants}
//               initial="hidden"
//               animate="visible"
//               whileHover="hover"
//               className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700/50"
//             >
//               <h2 className="text-xl font-bold mb-4 flex items-center font-[Raleway] text-white">
//                 <BoltIcon className="mr-2 h-6 w-6 text-red-500" />
//                 Quick Actions
//               </h2>
//               <div className="flex flex-wrap gap-3">
//                 <Link
//                   to="/job-list"
//                   className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 no-underline font-[Open Sans]"
//                 >
//                   <BoltIcon className="mr-2 h-5 w-5" />
//                   Job List
//                 </Link>
//                 <button className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 font-[Open Sans]">
//                   <BoltIcon className="mr-2 h-5 w-5" />
//                   Update Status
//                 </button>
//                 <Link
//                   to="/parts-request"
//                   className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 no-underline font-[Open Sans]"
//                 >
//                   <BoltIcon className="mr-2 h-5 w-5" />
//                   Vehicle Parts Request
//                 </Link>
//               </div>
//             </motion.div>
//           </div>

//           {/* Right Column: Recent Jobs List */}
//           <div className="lg:col-span-2">
//             <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-lg border border-gray-700/50">
//               <h2 className="text-xl font-bold mb-4 flex items-center font-[Raleway] text-white">
//                 <CarIcon className="mr-2 h-6 w-6 text-red-500" />
//                 Recent Jobs
//               </h2>
//               <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
//                 {recentJobs.map((job, index) => (
//                   <motion.div
//                     key={index}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     transition={{ duration: 0.5, delay: index * 0.1 }}
//                     className="flex items-center bg-gray-800 rounded-lg p-4 hover:bg-gray-700 transition-all duration-300 shadow-sm border border-gray-700/50"
//                   >
//                     <img
//                       src={job.image}
//                       alt={job.service}
//                       className="w-24 h-16 object-cover rounded-lg mr-4"
//                     />
//                     <div className="flex-1">
//                       <p className="text-base font-semibold text-white font-[Open Sans]">
//                         {job.vehicle} - {job.service}
//                       </p>
//                       <p className="text-sm text-gray-300 font-[Open Sans]">
//                         Priority:{" "}
//                         <span
//                           className={
//                             job.priority === "High"
//                               ? "text-red-500"
//                               : job.priority === "Medium"
//                               ? "text-orange-500"
//                               : "text-green-500"
//                           }
//                         >
//                           {job.priority}
//                         </span>
//                       </p>
//                       <p className="text-sm text-gray-300 font-[Open Sans]">
//                         Due: {job.due}
//                       </p>
//                     </div>
//                     <Link
//                       to={`/job-details/${index}`}
//                       className="flex items-center bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 no-underline font-[Open Sans]"
//                     >
//                       <CarIcon className="mr-2 h-5 w-5" />
//                       View Details
//                     </Link>
//                   </motion.div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Footer */}
//       <Footer />
//     </div>
//   );
// };

// export default TechnicianDashboard;

// // 2.0
// src/pages/TechnicianDashboard.jsx
// import React from "react";

// const TechnicianDashboard = () => {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <h1 className="text-3xl font-bold text-center pt-8">Technician Dashboard</h1>
//       <p className="text-center mt-4">This is a test to see if the dashboard renders.</p>
//     </div>
//   );
// };

// export default TechnicianDashboard;

// //3.0
// src/pages/TechnicianDashboard.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For animations
import {
  FaClipboardList,
  FaChartBar,
  FaBolt,
  FaCar,
  FaUser,
  FaSignOutAlt,
} from "react-icons/fa"; // Modern icons
import Footer from "../components/Footer"; // Import your existing Footer component
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Import Firebase auth for logout

const TechnicianDashboard = () => {
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

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Header */}
      <header className="flex justify-between items-center bg-white p-4 shadow-lg sticky top-0 z-10">
        <div className="flex items-center">
          <img
            src="https://via.placeholder.com/40?text=Logo"
            alt="Logo"
            className="w-12 h-12 mr-3 rounded-full"
          />
          <h1 className="text-2xl font-bold text-gray-800 font-[Poppins]">
            Technician Dashboard
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            to="/profile"
            className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 no-underline font-[Open Sans]"
          >
            <FaUser className="mr-2" />
            Technician Profile
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center bg-gradient-to-r from-red-500 to-red-700 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-800 transition-all duration-300 font-[Open Sans]"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Section */}
      <main className="max-w-7xl mx-auto py-8 px-4 flex-1">
        {/* Hero Section with Background Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative bg-cover bg-center rounded-xl shadow-xl mb-8 p-8 text-white bg-white/10 backdrop-blur-md border border-gray-700/50"
          style={{
            backgroundImage:
              "url('https://via.placeholder.com/1200x300?text=Vehicle+Repair+Shop')",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <h2 className="text-3xl font-bold mb-2 font-[Poppins] bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700">
            Welcome Back, Technician!
          </h2>
          <p className="text-lg font-[Open Sans] text-gray-300">
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
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center font-[Raleway]">
                <FaClipboardList className="mr-2 text-blue-500" />
                Today’s Tasks
              </h2>
              <div className="space-y-2 font-[Open Sans]">
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
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center font-[Raleway]">
                <FaChartBar className="mr-2 text-green-500" />
                Overview
              </h2>
              <div className="space-y-2 font-[Open Sans]">
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
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center font-[Raleway]">
                <FaBolt className="mr-2 text-yellow-500" />
                Quick Actions
              </h2>
              <div className="flex flex-wrap gap-3">
                <Link
                  to="/job-list"
                  className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-blue-800 transition-all duration-300 no-underline font-[Open Sans]"
                >
                  <FaBolt className="mr-2" />
                  Job List
                </Link>
                <button className="flex items-center bg-gradient-to-r from-purple-500 to-purple-700 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-purple-800 transition-all duration-300 font-[Open Sans]">
                  <FaBolt className="mr-2" />
                  Update Status
                </button>
                <Link
                  to="/parts-request"
                  className="flex items-center bg-gradient-to-r from-zinc-600 to-zinc-800 text-white px-4 py-2 rounded-lg hover:from-zinc-700 hover:to-zinc-900 transition-all duration-300 no-underline font-[Open Sans]"
                >
                  <FaBolt className="mr-2" />
                  Vehicle Parts Request
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Recent Jobs List */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center font-[Raleway]">
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
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/150?text=Image+Not+Found";
                      }}
                    />
                    <div className="flex-1">
                      <p className="text-base font-semibold text-gray-800 font-[Open Sans]">
                        {job.vehicle} - {job.service}
                      </p>
                      <p className="text-sm text-gray-600 font-[Open Sans]">
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
                      <p className="text-sm text-gray-600 font-[Open Sans]">
                        Due: {job.due}
                      </p>
                    </div>
                    <Link
                      to={`/job-details/${index}`}
                      className="flex items-center bg-gradient-to-r from-indigo-500 to-indigo-700 text-white px-4 py-2 rounded-lg hover:from-indigo-600 hover:to-indigo-800 transition-all duration-300 no-underline font-[Open Sans]"
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

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default TechnicianDashboard;
