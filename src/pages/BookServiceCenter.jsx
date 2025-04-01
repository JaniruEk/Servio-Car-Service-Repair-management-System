import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  WrenchScrewdriverIcon,
  UsersIcon,
  CalendarIcon,
} from '@heroicons/react/24/solid';
import Footer from '../components/Footer';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function BookServiceCenter({ user }) {
  const navigate = useNavigate();
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
    message: '',
  });
  const [showServiceCenterDropdown, setShowServiceCenterDropdown] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile sidebar toggle
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false); // For desktop sidebar collapse

  // Predefined list of service centers
  const serviceCenters = [
    'Downtown Auto Care - 123 Main St, City',
    'Northside Service Hub - 456 North Ave, City',
    'East End Garage - 789 East Rd, City',
    'Westside Mechanics - 321 West Blvd, City',
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
      message: '',
    });
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    if (!isSidebarOpen) {
      setIsSidebarCollapsed(false);
    }
  };

  const toggleSidebarCollapse = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
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
    <div
      className="flex flex-col min-h-screen bg-gray-900 text-white font-sans bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40"></div>

      <div className="flex flex-1 relative z-10">
        {/* Sidebar */}
        <aside
          className={`fixed inset-y-0 left-0 bg-gray-800 text-white transform transition-all duration-300 ease-in-out z-20
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:static md:translate-x-0
            ${isSidebarCollapsed ? 'w-16' : 'w-64 md:min-w-[16rem]'}`}
        >
          <div className={`flex ${isSidebarCollapsed ? 'justify-center' : 'justify-between'} items-center mb-6 p-2`}>
            <h2
              className={`text-center text-xl font-extrabold font-[Poppins] tracking-tight transition-opacity duration-300 ${
                isSidebarCollapsed ? 'hidden' : 'block flex-1'
              }`}
            >
              Servio Dashboard
            </h2>
            {/* Mobile Close Button */}
            <button
              className="md:hidden text-2xl hover:text-red-500 transition-colors duration-200"
              onClick={toggleSidebar}
              aria-label="Close sidebar"
            >
              ×
            </button>
            {/* Desktop Collapse Button */}
            <button
              className="hidden md:flex items-center justify-center w-8 h-8 bg-red-600 text-white rounded-full hover:bg-red-700 transition-all duration-200"
              onClick={toggleSidebarCollapse}
              aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isSidebarCollapsed ? <ChevronRightIcon className="h-5 w-5" /> : <ChevronLeftIcon className="h-5 w-5" />}
            </button>
          </div>
          <ul className="space-y-3">
            {[
              { text: 'Home', path: '/owner-home', icon: <WrenchScrewdriverIcon className="h-6 w-6" /> },
              { text: 'Profile', path: '/profile', icon: <UsersIcon className="h-6 w-6" /> },
              { text: 'Contact Technician', path: '/contact-technician', icon: <WrenchScrewdriverIcon className="h-6 w-6" /> },
              { text: 'Book Service Center', path: '/book-service-center', icon: <CalendarIcon className="h-6 w-6" />, active: true },
              { text: 'Contact Us', path: '/contact', icon: <UsersIcon className="h-6 w-6" /> },
              { text: 'About Us', path: '/about-us', icon: <UsersIcon className="h-6 w-6" /> },
              { text: 'Logout', path: '/logout', icon: <UsersIcon className="h-6 w-6" /> },
            ].map((item) => (
              <li key={item.text} className="relative group">
                <a
                  href={item.path}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.text === "Logout") {
                      handleLogout();
                    } else {
                      navigate(item.path);
                    }
                  }}
                  className={`flex items-center gap-2 py-3 px-4 hover:bg-gray-700 hover:text-red-500 transition-all duration-300 font-[Open Sans] text-sm tracking-wide ${
                    isSidebarCollapsed ? 'justify-center' : ''
                  } ${item.active ? 'bg-gray-700 font-bold text-red-500 shadow-inner' : ''}`}
                >
                  {item.icon}
                  <span
                    className={`transition-opacity duration-300 ${
                      isSidebarCollapsed ? 'hidden' : 'block'
                    }`}
                  >
                    {item.text}
                  </span>
                </a>
                {isSidebarCollapsed && (
                  <span className="absolute left-full ml-2 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {item.text}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </aside>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-30 p-2 bg-red-600 text-white rounded-full hover:bg-red-700 hover:scale-110 transition-all duration-200 ease-in-out"
          onClick={toggleSidebar}
          aria-label="Open sidebar"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        {/* Main Content */}
        <main className="flex-1 max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <header className="bg-white/10 backdrop-blur-md text-white p-6 rounded-lg mb-6 flex justify-between items-center shadow-lg">
            <div>
              <h1 className="text-3xl font-extrabold font-[Poppins] tracking-tight">Book a Service Center</h1>
            </div>
          </header>

          <h2 className="text-2xl font-semibold text-white mb-4 font-[Raleway] text-center">
            Schedule Your Service
          </h2>
          <p className="text-gray-300 mb-6 font-[Open Sans] text-center">
            Select a service center and fill out the form below to book your appointment. We’ll confirm your booking soon!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Service Center Selection */}
            <section className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4 font-[Raleway] border-b border-gray-500 pb-2">Select Service Center</h3>
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setShowServiceCenterDropdown(!showServiceCenterDropdown)}
                  className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white text-left focus:outline-none focus:ring-2 focus:ring-red-500 flex justify-between items-center"
                >
                  {formData.serviceCenter || 'Choose a Service Center'}
                  <span>{showServiceCenterDropdown ? '▲' : '▼'}</span>
                </button>
                {showServiceCenterDropdown && (
                  <ul className="absolute z-10 w-full bg-gray-700 border border-gray-600 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                    {serviceCenters.map((center) => (
                      <li
                        key={center}
                        onClick={() => handleServiceCenterSelect(center)}
                        className="p-2 hover:bg-gray-600 cursor-pointer font-[Open Sans] text-white"
                      >
                        {center}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            {/* Customer and Vehicle Details Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Customer Details Box */}
              <section className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-gray-700/50">
                <h3 className="text-xl font-semibold text-white mb-4 font-[Raleway] border-b border-gray-500 pb-2">Customer Details</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block mb-1 text-gray-300 font-[Open Sans]">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block mb-1 text-gray-300 font-[Open Sans]">Your Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., john.doe@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contactNumber" className="block mb-1 text-gray-300 font-[Open Sans]">Contact Number</label>
                    <input
                      type="tel"
                      id="contactNumber"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., +1 123-456-7890"
                      required
                    />
                  </div>
                </div>
              </section>

              {/* Vehicle Details Box */}
              <section className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-gray-700/50">
                <h3 className="text-xl font-semibold text-white mb-4 font-[Raleway] border-b border-gray-500 pb-2">Vehicle Details</h3>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="vehicleMake" className="block mb-1 text-gray-300 font-[Open Sans]">Vehicle Make</label>
                    <input
                      type="text"
                      id="vehicleMake"
                      name="vehicleMake"
                      value={formData.vehicleMake}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., Toyota"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="vehicleModel" className="block mb-1 text-gray-300 font-[Open Sans]">Vehicle Model</label>
                    <input
                      type="text"
                      id="vehicleModel"
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., Camry"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="vehicleYear" className="block mb-1 text-gray-300 font-[Open Sans]">Vehicle Year</label>
                    <input
                      type="number"
                      id="vehicleYear"
                      name="vehicleYear"
                      value={formData.vehicleYear}
                      onChange={handleChange}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., 2020"
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      required
                    />
                  </div>
                </div>
              </section>
            </div>

            {/* Service Details Box */}
            <section className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-gray-700/50">
              <h3 className="text-xl font-semibold text-white mb-4 font-[Raleway] border-b border-gray-500 pb-2">Service Details</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="serviceType" className="block mb-1 text-gray-300 font-[Open Sans]">Service Type</label>
                  <input
                    type="text"
                    id="serviceType"
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    placeholder="e.g., Oil Change"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="serviceDate" className="block mb-1 text-gray-300 font-[Open Sans]">Service Date</label>
                  <input
                    type="date"
                    id="serviceDate"
                    name="serviceDate"
                    value={formData.serviceDate}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    min={new Date().toISOString().split('T')[0]} // Prevents past dates
                    required
                  />
                </div>
                <div>
                  <label htmlFor="serviceTime" className="block mb-1 text-gray-300 font-[Open Sans]">Service Time</label>
                  <input
                    type="time"
                    id="serviceTime"
                    name="serviceTime"
                    value={formData.serviceTime}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
              </div>
            </section>

            {/* Message Box */}
            <section className="bg-white/10 backdrop-blur-md p-6 rounded-lg shadow-lg border border-gray-700/50">
              <div className="space-y-4">
                <div>
                  <label htmlFor="message" className="block mb-1 text-gray-300 font-[Open Sans]">Additional Notes</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500 resize-y"
                    rows="4"
                    placeholder="Any additional notes or requests..."
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 hover:scale-105 transition-all duration-200 ease-in-out transform"
                  >
                    Book Service
                  </button>
                </div>
              </div>
            </section>
          </form>
        </main>
      </div>

      {/* Footer - Full Width */}
      <Footer />
    </div>
  );
}

export default BookServiceCenter;