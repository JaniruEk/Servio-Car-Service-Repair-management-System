// src/pages/OurTeam.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";
// import Header from "../components/Header";
// import Footer from "../components/Footer";

const OurTeam = () => {
  const navigate = useNavigate();

  const team = [
    {
      name: "David Brandon",
      role: "Chief Mechanic",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "Sarah Mitchell",
      role: "Mechanic",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "Michael Carter",
      role: "Mechanic",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "Emily Davis",
      role: "Mechanic",
      image: "https://images.unsplash.com/photo-1517841903200-7b8d4b9b3c4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "James Wilson",
      role: "Mechanic",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "Laura Brown",
      role: "Mechanic",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "Robert Johnson",
      role: "Mechanic",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
    },
    {
      name: "Anna Lee",
      role: "Mechanic",
      image: "https://images.unsplash.com/photo-1517841903200-7b8d4b9b3c4f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60",
    },
  ];

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
    hover: { scale: 1.02, transition: { duration: 0.3 } },
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white font-sans">
      {/* Header */}
      {/* <Header isLoggedIn={false} /> */}

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center bg-cover bg-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1618843479313-40f8e4b244c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=60')",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40"></div>
        </div>
        <div className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-6xl font-extrabold font-[Poppins] tracking-tight drop-shadow-lg animate-slide-up">
            Our Team
          </h1>
          <nav className="mt-4 text-sm font-[Raleway] text-gray-300 animate-slide-up animate-delay-200">
            <Link to="/" className="hover:text-red-500">Home</Link> / <span>Our Team</span>
          </nav>
        </div>
      </section>

      {/* Back to Dashboard Link */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link
          to="/dashboard"
          className="flex items-center text-red-500 font-[Raleway] hover:underline"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          Back to Dashboard
        </Link>
      </div>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Chief Mechanic (Highlighted) */}
          <motion.div
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            custom={0}
            className="lg:col-span-1 bg-white/10 backdrop-blur-md rounded-lg overflow-hidden"
          >
            <img
              src={team[0].image}
              alt={team[0].name}
              className="w-full h-96 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-bold font-[Poppins] text-red-500">{team[0].role}</h3>
              <p className="text-lg font-[Poppins] text-white">{team[0].name}</p>
            </div>
          </motion.div>

          {/* Other Team Members */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {team.slice(1).map((member, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                custom={index + 1}
                className="bg-white/10 backdrop-blur-md rounded-lg overflow-hidden"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4 text-center">
                  <h4 className="text-sm font-bold font-[Poppins]">{member.name}</h4>
                  <p className="text-xs font-[Open Sans] text-gray-300">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pagination */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-center">
        <div className="flex items-center space-x-2">
          <button className="bg-red-600 text-white px-4 py-2 rounded-full font-[Raleway] hover:bg-red-700 transition-all duration-300">
            1
          </button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-full font-[Raleway] hover:bg-gray-600 transition-all duration-300">
            2
          </button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-full font-[Raleway] hover:bg-gray-600 transition-all duration-300">
            3
          </button>
          <button className="bg-gray-700 text-white px-4 py-2 rounded-full font-[Raleway] hover:bg-gray-600 transition-all duration-300">
            
          </button>
        </div>
      </div>

      {/* Footer */}
      {/* <Footer /> */}
    </div>
  );
};

export default OurTeam;