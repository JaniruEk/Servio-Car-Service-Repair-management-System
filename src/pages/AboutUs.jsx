import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  WrenchScrewdriverIcon,
  UsersIcon,
  StarIcon,
  HeartIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/solid';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { auth } from '../firebase';

function AboutUs({ user }) {
  const navigate = useNavigate();

  const stats = [
    { icon: UsersIcon, value: '50+', label: 'Team Members' },
    { icon: WrenchScrewdriverIcon, value: '100+', label: 'Service Tools' },
    { icon: HeartIcon, value: '1000+', label: 'Satisfied Customers' },
  ];

  const services = [
    { title: 'Service Booking', description: 'Easily book your car maintenance with our intuitive platform.' },
    { title: 'Repair Tracking', description: 'Track your vehicle’s repair progress in real-time.' },
    { title: 'Maintenance Management', description: 'Manage all your car care needs seamlessly.' },
    { title: 'Customer Support', description: 'Get assistance anytime with our dedicated support team.' },
  ];

  const team = [
    { name: 'Janiru', role: 'Founder & CEO', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60' },
    { name: 'Veenath', role: 'Lead Developer', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60' },
    { name: 'Udula', role: 'Customer Support', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60' },
  ];

  const testimonials = [
    {
      quote: 'Servio transformed how I manage my car maintenance. Booking and tracking services has never been easier!',
      author: 'Nimal Perera',
      location: 'Colombo',
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
      rating: 5,
    },
  ];

  // Animation Variants
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
    <div className="flex flex-col min-h-screen bg-gray-900 text-white font-sans">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative min-h-[60vh] flex items-center justify-center bg-cover bg-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40"></div>
        </div>
        <motion.div
          variants={itemVariants}
          className="relative z-10 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-extrabold font-[Poppins] tracking-tight drop-shadow-lg"
          >
            About Servio
          </motion.h1>
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold font-[Raleway] mt-4"
          >
            Who We Are
          </motion.h2>
        </motion.div>
      </motion.section>

      {/* Main Content with Sidebar */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-1"
      >
        {/* Sidebar */}
        {user && (
          <motion.aside
            variants={sectionVariants}
            className="w-64 bg-gray-800 text-white p-6 hidden md:block shadow-lg"
          >
            <motion.ul variants={containerVariants} className="space-y-3">
              {[
                { text: 'Home', path: '/dashboard' },
                { text: 'Book Service', path: '/book-service' },
                { text: 'Service History', path: '/service-history' },
                { text: 'Profile', path: '/profile' },
                { text: 'Contact Us', path: '/contact' },
                { text: 'About Us', path: '/about-us', active: true },
                { text: 'Logout', path: '/logout' },
              ].map((item) => (
                <motion.li
                  key={item.text}
                  variants={itemVariants}
                  className="border-b border-gray-700/50"
                >
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.text === 'Logout') {
                        auth.signOut();
                        navigate('/');
                      } else {
                        navigate(item.path);
                      }
                    }}
                    className={`block py-3 px-4 rounded-md hover:bg-gray-700 hover:text-red-500 transition-all duration-300 font-[Open Sans] text-sm tracking-wide ${
                      item.active ? 'bg-gray-700 font-bold text-red-500 shadow-inner' : ''
                    }`}
                  >
                    {item.text}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.aside>
        )}

        {/* Main Content */}
        <motion.main
          className={`flex-1 max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 ${user ? '' : 'max-w-5xl mx-auto'}`}
        >
          {/* Company Overview */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover="hover"
            className="flex flex-col md:flex-row items-center mb-10 bg-white/10 backdrop-blur-md p-6 rounded-xl"
          >
            <motion.div variants={itemVariants} className="flex-1 pr-0 md:pr-5 mb-5 md:mb-0">
              <motion.h3 variants={itemVariants} className="text-2xl font-bold text-white mb-3 font-[Poppins]">
                Who We Are
              </motion.h3>
              <motion.p variants={itemVariants} className="text-sm text-gray-300 leading-relaxed font-[Open Sans]">
                Servio is a leading car service and repair management system dedicated to simplifying vehicle maintenance for customers worldwide. Founded with a mission to enhance the automotive service experience, we provide a seamless platform for booking, tracking, and managing your car care needs.
              </motion.p>
            </motion.div>
            <motion.img
              variants={itemVariants}
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
              alt="Car Service"
              className="flex-1 w-full md:w-[400px] h-[300px] object-cover rounded-lg"
            />
          </motion.section>

          {/* Mission */}
          <motion.section
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            whileHover="hover"
            className="flex flex-col md:flex-row items-center bg-white/10 backdrop-blur-md p-6 rounded-xl"
          >
            <motion.img
              variants={itemVariants}
              src="https://images.unsplash.com/photo-1517524206122-611ddea5d194?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
              alt="Car Maintenance"
              className="flex-1 w-full md:w-[400px] h-[300px] object-cover rounded-lg mr-0 md:mr-5 mb-5 md:mb-0"
            />
            <motion.div variants={itemVariants} className="flex-1">
              <motion.h3 variants={itemVariants} className="text-2xl font-bold text-white mb-3 font-[Poppins]">
                Our Mission
              </motion.h3>
              <motion.p variants={itemVariants} className="text-sm text-gray-300 leading-relaxed font-[Open Sans]">
                Our goal is to empower vehicle owners with a user-friendly, reliable tool that ensures their cars remain in top condition. We strive to deliver exceptional service management, transparency, and convenience through innovative technology and customer-focused solutions.
              </motion.p>
            </motion.div>
          </motion.section>
        </motion.main>
      </motion.div>

      {/* Stats Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-red-600 py-12"
      >
        <motion.div variants={itemVariants} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={containerVariants} className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="flex flex-col items-center"
              >
                <stat.icon className="h-12 w-12 text-white mb-4" />
                <h3 className="text-4xl font-bold font-[Poppins]">{stat.value}</h3>
                <p className="text-lg font-[Open Sans] text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Enhanced Services Section with Animations */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 relative"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-extrabold font-[Poppins] text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-red-700 tracking-tight"
        >
          Why Choose <span className="text-white">Servio</span>
        </motion.h2>
        <motion.div variants={itemVariants} className="relative flex justify-center items-center">
          {/* Background Image with Overlay */}
          <motion.div variants={itemVariants} className="relative w-full max-w-2xl">
            <img
              src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60"
              alt="Car"
              className="w-full h-[400px] object-cover rounded-xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-black/40 rounded-xl"></div>
          </motion.div>

          {/* Service Cards */}
          <motion.div variants={containerVariants} className="absolute inset-0 grid grid-cols-2 gap-6 p-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover="hover"
                className={`flex flex-col p-5 bg-white/10 backdrop-blur-md rounded-lg shadow-lg border border-gray-700/50 hover:border-red-500 transition-all duration-300 ${
                  index === 0 ? 'self-start justify-self-start' :
                  index === 1 ? 'self-start justify-self-end' :
                  index === 2 ? 'self-end justify-self-start' :
                  'self-end justify-self-end'
                }`}
              >
                <h4 className="text-lg font-bold font-[Poppins] mb-3 text-red-500 drop-shadow-md">
                  {service.title}
                </h4>
                <p className="text-sm font-[Open Sans] text-gray-200 leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        {/* Decorative Element */}
        <motion.div
          variants={itemVariants}
          className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-red-500 to-transparent opacity-50"
        />
      </motion.section>

      {/* Team Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row items-center gap-8">
          <motion.div variants={itemVariants} className="lg:w-1/3">
            <motion.div variants={itemVariants} className="flex items-center mb-4">
              <div className="w-12 h-1 bg-red-500 mr-4"></div>
              <h2 className="text-3xl md:text-4xl font-bold font-[Poppins]">
                Meet Our Team
              </h2>
            </motion.div>
            <motion.p variants={itemVariants} className="text-sm font-[Open Sans] text-gray-300 leading-relaxed">
              Our dedicated team at Servio works tirelessly to ensure your car care experience is seamless and stress-free.
            </motion.p>
          </motion.div>
          <motion.div variants={containerVariants} className="lg:w-2/3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
            {team.map((member, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/50 p-2 text-center">
                  <h4 className="text-sm font-bold font-[Poppins]">{member.name}</h4>
                  <p className="text-xs font-[Open Sans] text-red-500">{member.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8"
      >
        <motion.div variants={itemVariants} className="flex flex-col lg:flex-row items-center gap-8">
          <motion.div variants={itemVariants} className="lg:w-1/3 text-center lg:text-left">
            <motion.div variants={itemVariants} className="flex items-center justify-center lg:justify-start mb-4">
              <div className="w-12 h-1 bg-red-500 mr-4"></div>
              <h2 className="text-3xl md:text-4xl font-bold font-[Poppins]">
                What Our Clients Say About <span className="text-red-500">Servio</span>
              </h2>
            </motion.div>
          </motion.div>
          <motion.div variants={itemVariants} className="lg:w-2/3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white/10 backdrop-blur-md rounded-lg p-6"
              >
                <motion.div variants={itemVariants} className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <StarIcon key={i} className="h-5 w-5 text-red-500" />
                      ))}
                    </div>
                    <p className="text-sm font-[Open Sans] text-gray-300">{testimonial.location}</p>
                  </div>
                </motion.div>
                <motion.p variants={itemVariants} className="text-lg font-[Open Sans] text-gray-300 italic mb-4">
                  "{testimonial.quote}"
                </motion.p>
                <motion.p variants={itemVariants} className="text-sm font-[Poppins] text-white">
                  {testimonial.author}
                </motion.p>
              </motion.div>
            ))}
            <motion.button
              variants={itemVariants}
              className="mt-6 text-red-500 font-[Raleway] hover:underline flex items-center"
            >
              See All Reviews <ArrowRightIcon className="h-5 w-5 ml-2" />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-gray-800 py-12 text-center"
      >
        <motion.div variants={itemVariants}>
          <motion.p variants={itemVariants} className="text-gray-300 mb-4 font-[Open Sans] text-lg">
            Ready to experience hassle-free car maintenance? Join Servio today!
          </motion.p>
          <motion.button
            variants={itemVariants}
            whileHover="hover"
            onClick={() => navigate('/register')}
            className="inline-block bg-red-600 text-white px-8 py-3 rounded-full font-medium text-lg hover:bg-red-700 transition-all duration-300 font-[Raleway]"
          >
            Get Started
          </motion.button>
        </motion.div>
      </motion.section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default AboutUs;