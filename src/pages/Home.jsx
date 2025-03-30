// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCar,
  FaWrench,
  FaUsers,
  FaStar,
  FaArrowRight,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaOilCan,
  FaTachometerAlt,
  FaTools,
  FaCogs,
  FaBolt,
  FaUser,
  FaBlog,
} from "react-icons/fa"; // Modern icons

const Home = () => {
  const services = [
    {
      title: "Engine Diagnostics",
      description: "We use advanced tools to diagnose and fix engine issues.",
      icon: <FaTools />,
    },
    {
      title: "Suspension",
      description: "Ensure a smooth ride with our suspension services.",
      icon: <FaTachometerAlt />,
    },
    {
      title: "Transmission",
      description: "Keep your transmission in top shape with our expert care.",
      icon: <FaCogs />,
    },
    {
      title: "Oil Change",
      description: "Quick and efficient oil changes to keep your engine running.",
      icon: <FaOilCan />,
    },
  ];

  const repairs = [
    {
      image: "https://via.placeholder.com/300x200?text=Service",
      category: "Service",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Electrical+System",
      category: "Electrical System Repair",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Suspension",
      category: "Suspension",
    },
    {
      image: "https://via.placeholder.com/300x200?text=Brake+Repair",
      category: "Brake Repair",
    },
  ];

  const pricing = [
    { title: "Quick Fix", price: "$19", features: ["Oil Change", "Tire Check", "Basic Diagnostics"] },
    { title: "Master Mech", price: "$29", features: ["Full Diagnostics", "Suspension Check", "Transmission Service"] },
  ];

  const testimonials = [
    {
      name: "Brook Simmons",
      review: "The service was exceptional! My car runs like new after their expert repairs.",
      rating: 5,
    },
    {
      name: "Jane Roe",
      review: "Professional and reliable. I trust them with all my vehicle maintenance.",
      rating: 4.8,
    },
  ];

  const benefits = [
    { label: "Wheel Alignment", description: "Ensure your wheels are perfectly aligned." },
    { label: "Filter Replacement", description: "Keep your engine clean with new filters." },
    { label: "System Updates", description: "Stay up-to-date with the latest system updates." },
  ];

  const team = [
    { name: "Darrell Steward", image: "https://via.placeholder.com/150?text=Darrell" },
    { name: "Theresa Webb", image: "https://via.placeholder.com/150?text=Theresa" },
    { name: "Adene McCoy", image: "https://via.placeholder.com/150?text=Adene" },
  ];

  const blogPosts = [
    {
      title: "Electrical & Battery Auto Repair",
      description: "Learn about the latest in electrical and battery repair.",
      image: "https://via.placeholder.com/300x200?text=Blog+1",
    },
    {
      title: "Air Conditioning Maintenance",
      description: "Tips to keep your car's AC running smoothly.",
      image: "https://via.placeholder.com/300x200?text=Blog+2",
    },
    {
      title: "Interior Detailing & Upholstery",
      description: "How to maintain your car's interior like a pro.",
      image: "https://via.placeholder.com/300x200?text=Blog+3",
    },
  ];

  // Animation variants
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

  const testimonialVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, delay: i * 0.2 },
    }),
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex justify-between items-center bg-black text-white p-4 shadow-lg sticky top-0 z-10">
        <div className="flex items-center">
          <FaCar className="text-3xl text-red-500 mr-3" />
          <h1 className="text-2xl font-bold font-poppins">Vehicle Service & Repair</h1>
        </div>
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-sm font-inter hover:text-red-500 transition-all duration-300">Home</Link>
          <Link to="/service-center" className="text-sm font-inter hover:text-red-500 transition-all duration-300">Service Center</Link>
          <Link to="/dashboard" className="text-sm font-inter hover:text-red-500 transition-all duration-300">Dashboard</Link>
          <Link to="/job-list" className="text-sm font-inter hover:text-red-500 transition-all duration-300">Job List</Link>
          <Link
            to="/contact"
            className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 no-underline font-inter font-medium"
          >
            <FaPhone className="mr-2" />
            +1 (555) 123-4567
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
          className="relative bg-cover bg-center rounded-xl shadow-xl mb-12 p-16 text-white flex items-center justify-between"
          style={{
            backgroundImage:
              "url('https://via.placeholder.com/1200x600?text=Technician+Hero')",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            minHeight: "600px",
          }}
        >
          <div className="max-w-lg">
            <h2 className="text-5xl font-bold mb-4 font-poppins leading-tight">
              Mastering the Art of Auto Repair
            </h2>
            <p className="text-lg mb-6 font-inter">
              With over 20 years of experience, we provide top-notch vehicle repair and maintenance services.
            </p>
            <Link
              to="/contact"
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 no-underline font-inter font-medium"
            >
              Contact Us
            </Link>
          </div>
          <div className="hidden lg:block bg-white p-6 rounded-lg shadow-lg">
            <div className="grid grid-cols-2 gap-4 text-black">
              <div className="text-center">
                <h3 className="text-3xl font-bold text-red-500 font-poppins">20K</h3>
                <p className="text-sm font-inter">Services</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-red-500 font-poppins">400+</h3>
                <p className="text-sm font-inter">Team Members</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-red-500 font-poppins">150</h3>
                <p className="text-sm font-inter">Awards</p>
              </div>
              <div className="text-center">
                <h3 className="text-3xl font-bold text-red-500 font-poppins">7K</h3>
                <p className="text-sm font-inter">Client Reviews</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Services Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center font-poppins">
            Where Every Engine Finds Rhythm
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
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="text-red-500 text-4xl mb-4">{service.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 font-poppins">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 font-inter">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Driving Confidence Section */}
        <section className="mb-12 flex flex-col md:flex-row items-center bg-gray-900 text-white p-8 rounded-lg">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <img
              src="https://via.placeholder.com/600x400?text=Car+Service"
              alt="Car Service"
              className="w-full h-80 object-cover rounded-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8">
            <h2 className="text-3xl font-bold mb-4 font-poppins">
              Driving Confidence Repair at a Time
            </h2>
            <p className="text-sm mb-6 font-inter">
              We offer a wide range of services to keep your vehicle in top condition, from routine maintenance to complex repairs.
            </p>
            <ul className="space-y-4 font-inter">
              <li className="flex items-center">
                <FaBolt className="text-red-500 mr-2" />
                Air Conditioning Maintenance
              </li>
              <li className="flex items-center">
                <FaBolt className="text-red-500 mr-2" />
                Oil Change & Filter Replacement
              </li>
              <li className="flex items-center">
                <FaBolt className="text-red-500 mr-2" />
                Engine Diagnostics & Repair
              </li>
            </ul>
          </div>
        </section>

        {/* Repairs Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center font-poppins">
            Your Road to Reliable Repairs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {repairs.map((repair, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="relative"
              >
                <img
                  src={repair.image}
                  alt={repair.category}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
                  <p className="text-sm font-poppins">{repair.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pricing.map((plan, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-black text-white p-6 rounded-lg shadow-lg text-center"
              >
                <h3 className="text-xl font-bold mb-2 font-poppins">{plan.title}</h3>
                <p className="text-3xl font-bold text-red-500 mb-4 font-poppins">{plan.price}</p>
                <ul className="space-y-2 mb-4 font-inter">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="text-sm">{feature}</li>
                  ))}
                </ul>
                <button className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all duration-300 font-inter">
                  Know More
                </button>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center font-poppins">
            Performance That Speaks Volumes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={testimonialVariants}
                initial="hidden"
                animate="visible"
                className="bg-white p-6 rounded-lg shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="text-yellow-500 flex">
                    {[...Array(Math.floor(testimonial.rating))].map((_, i) => (
                      <FaStar key={i} className="mr-1" />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-600 font-inter">
                    {testimonial.rating}/5
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 font-inter">
                  "{testimonial.review}"
                </p>
                <p className="text-sm font-semibold text-gray-800 font-poppins">
                  - {testimonial.name}
                </p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center font-poppins">
            When Quality Counts, Count on Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={statVariants}
                initial="hidden"
                animate="visible"
                className="text-center"
              >
                <div className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  <FaBolt className="text-3xl" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2 font-poppins">
                  {benefit.label}
                </h3>
                <p className="text-sm text-gray-600 font-inter">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="mb-12 flex flex-col md:flex-row items-center bg-gray-900 text-white p-8 rounded-lg">
          <div className="md:w-1/2 mb-6 md:mb-0">
            <h2 className="text-3xl font-bold mb-4 font-poppins">
              Bring Your Drive Back to Life
            </h2>
            <form className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500"
              />
              <textarea
                placeholder="Your Message"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500"
                rows="4"
              ></textarea>
              <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 font-inter">
                Send Now
              </button>
            </form>
          </div>
          <div className="md:w-1/2 md:pl-8">
            <img
              src="https://via.placeholder.com/600x400?text=Contact+Us"
              alt="Contact Us"
              className="w-full h-80 object-cover rounded-lg"
            />
            <div className="bg-red-500 text-white p-4 rounded-lg mt-4 flex items-center">
              <FaPhone className="mr-2" />
              <p className="text-sm font-inter">+201 550-0124 Today</p>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center font-poppins">
            Precision Repairs Every Mile of the Way
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-40 h-40 object-cover rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800 font-poppins">{member.name}</h3>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center font-poppins">
            Unleashing the Power of Precision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.map((post, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className="bg-white p-4 rounded-lg shadow-lg"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h3 className="text-lg font-bold text-gray-800 mb-2 font-poppins">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4 font-inter">{post.description}</p>
                <Link
                  to={`/blog/${index}`}
                  className="flex items-center text-red-500 hover:text-red-600 font-inter"
                >
                  Read More <FaArrowRight className="ml-2" />
                </Link>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black text-white p-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <h3 className="text-lg font-bold mb-4 font-poppins flex items-center">
              <FaCar className="mr-2 text-red-500" />
              Vehicle Service & Repair
            </h3>
            <p className="text-sm font-inter">
              Your trusted partner for all vehicle repair and maintenance needs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 font-poppins">Useful Links</h3>
            <ul className="space-y-2 font-inter">
              <li>
                <Link to="/about" className="text-sm text-gray-300 hover:text-red-500 transition-all duration-300">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="text-sm text-gray-300 hover:text-red-500 transition-all duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-sm text-gray-300 hover:text-red-500 transition-all duration-300">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 font-poppins">Contact Us</h3>
            <ul className="space-y-2 font-inter">
              <li className="flex items-center">
                <FaPhone className="mr-2" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span className="text-sm">support@vehicleservice.com</span>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span className="text-sm">123 Auto Lane, City, Country</span>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4 font-poppins">Get Free Estimate</h3>
            <form className="space-y-4">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:border-red-500"
              />
              <button className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-all duration-300 font-inter">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="text-center mt-6 text-sm font-inter">
          © {new Date().getFullYear()} Vehicle Service & Repair. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;