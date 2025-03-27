// src/components/Contact.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { auth } from '../firebase'; // Import auth for logout
import { UserIcon, EnvelopeIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/outline';

function Contact({ user }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  return (
    <div className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70')]">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0"></div>

      {/* Header */}
      <Header user={user} />

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 pt-20 relative z-10">
        {/* Sidebar - Only show if user is logged in */}
        {user && (
          <aside className="w-64 bg-gray-900 text-white p-5 hidden md:block">
            <ul className="space-y-2">
              {[
                { text: 'Home', path: '/dashboard' },
                { text: 'Book Service', path: '/book-service' },
                { text: 'Service History', path: '/service-history' },
                { text: 'Profile', path: '/profile' },
                { text: 'Contact Us', path: '/contact', active: true },
                { text: 'About Us', path: '/about-us' },
                { text: 'Logout', path: '/logout' },
              ].map((item) => (
                <li key={item.text} className="border-b border-gray-700">
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
                    className={`block py-3 px-4 hover:bg-gray-800 hover:text-orange-600 transition-colors duration-300 font-[Open Sans] ${
                      item.active ? 'bg-gray-800 font-bold text-orange-600' : ''
                    }`}
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Main Content */}
        <main className={`flex-1 p-5 md:p-8 ${user ? '' : 'max-w-5xl mx-auto'}`}>
          <header className="bg-white p-4 text-center rounded-lg mb-6 animate-slide-up shadow-xl border border-gray-100">
            <h1 className="text-3xl md:text-4xl font-bold font-[Poppins] bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-800">
              Contact Us
            </h1>
          </header>

          <section className="space-y-6">
            {/* Success Message */}
            {isSubmitted && (
              <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow-md text-center animate-slide-up font-[Open Sans] max-w-5xl mx-auto">
                Your message has been sent successfully!
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto">
              {/* Contact Form */}
              <div className="bg-white p-6 rounded-lg shadow-xl flex-2 animate-slide-up border border-gray-100">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 font-[Raleway] bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-800">
                  Get in Touch
                </h2>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                  <div className="relative">
                    <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 p-3 border border-gray-300 rounded-md text-base font-[Open Sans] focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all duration-300 w-full hover:border-orange-400"
                      required
                    />
                  </div>
                  <div className="relative">
                    <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10 p-3 border border-gray-300 rounded-md text-base font-[Open Sans] focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all duration-300 w-full hover:border-orange-400"
                      required
                    />
                  </div>
                  <div className="relative">
                    <ChatBubbleLeftIcon className="absolute left-3 top-4 h-5 w-5 text-gray-400" />
                    <textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      className="pl-10 p-3 border border-gray-300 rounded-md text-base font-[Open Sans] h-32 resize-y focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all duration-300 w-full hover:border-orange-400"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-orange-600 to-orange-800 text-white p-3 rounded-full font-medium text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 font-[Raleway] animate-pulse-slow"
                  >
                    Send Message
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="bg-white p-6 rounded-lg shadow-xl flex-1 animate-slide-up animate-delay-100 border border-gray-100">
                <h3 className="text-2xl font-semibold mb-4 text-gray-800 font-[Raleway] bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-800">
                  Contact Information
                </h3>
                <div className="text-gray-600 font-[Open Sans] space-y-2">
                  <p>
                    <strong className="font-medium">Phone:</strong> +94 70 123 4567
                  </p>
                  <p>
                    <strong className="font-medium">Email:</strong> support@servio.com
                  </p>
                  <p>
                    <strong className="font-medium">Address:</strong> 123, Kengolla, Kundasale, Kandy, Sri Lanka
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Contact;