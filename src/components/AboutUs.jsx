// src/components/AboutUs.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

function AboutUs({ user }) { // Added user prop
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Header */}
      <Header />

      {/* Main Content with Sidebar */}
      <div className="flex flex-1 pt-20">
        {/* Sidebar - Only show if user is logged in */}
        {user && (
          <aside className="w-64 bg-gray-800 text-white p-5 hidden md:block">
            <ul className="space-y-2">
              {[
                { text: 'Home', path: '/dashboard' },
                { text: 'Book Service', path: '/book-service' },
                { text: 'Service History', path: '/service-history' },
                { text: 'Profile', path: '/profile' },
                { text: 'Contact Us', path: '/contact' },
                { text: 'About Us', path: '/about-us', active: true },
                { text: 'Logout', path: '/logout' },
              ].map((item) => (
                <li key={item.text} className="border-b border-gray-600">
                  <a
                    href={item.path}
                    onClick={(e) => {
                      e.preventDefault();
                      if (item.text === 'Logout') {
                        // Handle logout
                        auth.signOut();
                        navigate('/');
                      } else {
                        navigate(item.path);
                      }
                    }}
                    className={`block py-3 px-4 hover:bg-gray-700 hover:text-orange-600 transition-colors duration-300 ${
                      item.active ? 'bg-gray-700 font-bold text-orange-600' : ''
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
          <header className="bg-gradient-to-r from-gray-900 to-gray-800 text-white p-4 text-center rounded-lg mb-6 animate-slide-up">
            <h1 className="text-3xl md:text-4xl font-bold font-[Poppins]">About Servio</h1>
          </header>

          <section className="space-y-6">
            {/* Company Overview */}
            <div className="bg-white p-6 rounded-lg shadow-lg animate-slide-up">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800 font-[Raleway]">Who We Are</h2>
              <p className="text-gray-600 font-[Open Sans] leading-relaxed">
                Servio is a leading car service and repair management system dedicated to simplifying vehicle maintenance for customers worldwide. Founded with a mission to enhance the automotive service experience, we provide a seamless platform for booking, tracking, and managing your car care needs.
              </p>
            </div>

            {/* Our Mission */}
            <div className="bg-white p-6 rounded-lg shadow-lg animate-slide-up animate-delay-100">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800 font-[Raleway]">Our Mission</h2>
              <p className="text-gray-600 font-[Open Sans] leading-relaxed">
                Our goal is to empower vehicle owners with a user-friendly, reliable tool that ensures their cars remain in top condition. We strive to deliver exceptional service management, transparency, and convenience through innovative technology and customer-focused solutions.
              </p>
            </div>

            {/* Team Section */}
            <div className="bg-white p-6 rounded-lg shadow-lg animate-slide-up animate-delay-200">
              <h2 className="text-2xl font-semibold mb-3 text-gray-800 font-[Raleway]">Meet Our Team</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Janiru',
                    role: 'Founder & CEO',
                    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=60',
                  },
                  {
                    name: 'Veenath',
                    role: 'Lead Developer',
                    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=60',
                  },
                  {
                    name: 'Udula',
                    role: 'Customer Support',
                    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=60',
                  },
                ].map((member, index) => (
                  <div
                    key={member.name}
                    className="text-center animate-scale-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <img
                      src={member.img}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-2 object-cover shadow-md"
                    />
                    <h3 className="text-lg font-medium text-gray-800 font-[Raleway]">{member.name}</h3>
                    <p className="text-gray-500 font-[Open Sans]">{member.role}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center animate-slide-up animate-delay-300">
              <p className="text-gray-700 mb-4 font-[Open Sans] text-lg">
                Ready to experience hassle-free car maintenance? Join Servio today!
              </p>
              <button
                onClick={() => navigate('/register')}
                className="inline-block bg-gradient-to-r from-orange-600 to-orange-800 text-white px-8 py-3 rounded-full font-medium text-lg hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                Get Started
              </button>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
}

export default AboutUs;