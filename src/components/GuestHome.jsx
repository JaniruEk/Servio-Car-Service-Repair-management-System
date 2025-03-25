import React from 'react';
import { useNavigate } from 'react-router-dom'; // Add this for programmatic navigation

function GuestHome() {
  const navigate = useNavigate(); // For button navigation

  return (
    <div className="flex min-h-screen font-sans bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-5">
        <ul className="space-y-2">
          {[
            { text: 'Home', path: '/' },
            { text: 'Book Service', path: '/book-service' },
            { text: 'Contact Us', path: '/contact' },
            { text: 'Login/Register', path: '/login' },
          ].map((item) => (
            <li key={item.text} className="border-b border-gray-600">
              <a
                href={item.path}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(item.path); // Use navigate instead of href for SPA behavior
                }}
                className="block py-3 px-4 hover:bg-gray-700 transition-colors"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-5">
        <header className="bg-blue-600 text-white p-4 text-center rounded-lg mb-6">
          <h1 className="text-2xl font-bold">Welcome to Servio</h1>
        </header>

        <section className="space-y-5">
          {/* Welcome Message */}
          <div className="bg-white p-5 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">Hello!</h2>
            <p className="text-gray-700 mb-2">
              Servio is your comprehensive car service and repair management system, designed to streamline vehicle maintenance with easy booking, tracking, and support.
            </p>
            <p className="text-gray-700">
              As a guest, you can book services and contact us. Create an account to access your service history and manage your profile.
            </p>
            <button
              onClick={() => navigate('/signup')}
              className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-700 transition-colors"
            >
              Register Now
            </button>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-white p-5 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold mb-2">Book a Service</h3>
              <p className="text-gray-600 mb-4">Schedule your next vehicle maintenance</p>
              <button
                onClick={() => navigate('/book-service')}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Book Now
              </button>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-md text-center">
              <h3 className="text-lg font-semibold mb-2">Contact Support</h3>
              <p className="text-gray-600 mb-4">Need help? Reach out to our team</p>
              <button
                onClick={() => navigate('/contact')}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Contact Us
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default GuestHome;