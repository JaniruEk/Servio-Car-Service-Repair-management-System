import React from 'react';
import { useNavigate } from 'react-router-dom';
import { WrenchScrewdriverIcon, PhoneIcon, CalendarIcon, UserGroupIcon, ChevronLeftIcon, ChevronRightIcon, DocumentTextIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import Header from './Header';
import Footer from './Footer';

import HeroBg from '../assets/images/hero-bg.jpg';
import OfferNetwork from '../assets/images/offer-network.jpg';
import Gallery3 from '../assets/images/gallery-3.jpg';

function GuestHome() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-white font-sans">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="pt-20">
        {/* Hero Section */}
        <section
          className="relative h-[700px] bg-cover bg-center flex items-center justify-center overflow-hidden"
          style={{
            backgroundImage: `url(${HeroBg})`,
            backgroundAttachment: 'fixed', // Parallax effect
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-transparent"></div>

          {/* Main Content */}
          <div className="relative z-10 text-center text-white px-4">
            {/* Decorative Line */}
            <div className="flex justify-center mb-4">
              <div className="w-24 h-1 bg-orange-600 rounded-full animate-fade-in"></div>
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 animate-slide-up font-[Poppins] tracking-tight drop-shadow-lg">
              SERVIO
            </h1>
            {/* Subtitle */}
            <h2 className="text-3xl md:text-5xl font-light mb-6 animate-slide-up animate-delay-100 font-[Raleway] drop-shadow-md">
              Mastering the Art of Auto Repair
            </h2>
            {/* Description */}
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto animate-slide-up animate-delay-200 font-[Open Sans] leading-relaxed">
              Servio revolutionizes car service and repair management by connecting vehicle owners, technicians, and service centers in one seamless platform. Whether you need to schedule a tune-up, find a skilled mechanic, or manage your repair shop’s bookings, Servio has you covered.
            </p>
            {/* Contact Us Button */}
            <button
              onClick={() => navigate('/contact')}
              className="bg-gradient-to-r from-orange-600 to-orange-800 text-white px-10 py-4 rounded-full font-medium text-lg hover:scale-105 hover:shadow-xl transition-all duration-300 animate-pulse-slow animate-delay-300"
            >
              Contact Us
            </button>
          </div>

          {/* Stats Section */}
          <div className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-2xl border border-white/20 animate-fade-in animate-delay-400">
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '20K', label: 'Satisfied Clients', icon: <UserGroupIcon className="h-6 w-6 text-orange-400" /> },
                { value: '500+', label: 'Team Members', icon: <UserGroupIcon className="h-6 w-6 text-orange-400" /> },
                { value: '150', label: 'Winning Awards', icon: <WrenchScrewdriverIcon className="h-6 w-6 text-orange-400" /> },
                { value: '7K', label: 'Charity Causes', icon: <CalendarIcon className="h-6 w-6 text-orange-400" /> },
              ].map((stat, index) => (
                <div key={index} className="flex items-center space-x-3 group">
                  {stat.icon}
                  <div>
                    <p className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors duration-300">{stat.value}</p>
                    <p className="text-sm text-gray-200">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <ChevronDownIcon className="h-10 w-10 text-white opacity-70 hover:opacity-100 transition-opacity duration-300" />
          </div>
        </section>

        

        {/* What We Offer Section */}
<section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 animate-slide-up">
    What We Offer
  </h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      {
        icon: <CalendarIcon className="h-12 w-12 text-orange-600 mx-auto mb-4" />,
        title: 'Easy Scheduling',
        desc: 'Book appointments instantly with real-time availability from top service centers and technicians.',
        img: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', // Kept the same image
      },
      {
        icon: <DocumentTextIcon className="h-12 w-12 text-orange-600 mx-auto mb-4" />,
        title: 'Service History',
        desc: 'Keep a detailed log of all repairs and maintenance for your vehicle, accessible anytime.',
        img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60', // New image: A laptop showing data/documents
      },
      {
        icon: <UserGroupIcon className="h-12 w-12 text-orange-600 mx-auto mb-4" />,
        title: 'Expert Network',
        desc: 'Connect with verified technicians and service centers tailored to your car’s needs.',
        img: OfferNetwork, // New image: Mechanics working together
      },
    ].map((item, index) => (
      <div
        key={item.title}
        className="bg-white shadow-lg rounded-lg overflow-hidden animate-scale-up"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <img src={item.img} alt={item.title} className="w-full h-48 object-cover" />
        <div className="p-6 text-center">
          {item.icon}
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
          <p className="text-gray-600">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
</section>

        {/* Driving Confidence Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 animate-slide-left">
              <img
                src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=60"
                alt="Car Repair"
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-10 mt-8 md:mt-0 animate-slide-right">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Driving Confidence, One Repair at a Time</h2>
              <p className="text-gray-600 mb-6">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <WrenchScrewdriverIcon className="h-6 w-6 text-orange-600 mr-2" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Air Conditioning Maintenance</h3>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CalendarIcon className="h-6 w-6 text-orange-600 mr-2" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">Oil Change & Filter Replacement</h3>
                    <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 animate-slide-up">
            Your Road to Reliable Repairs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
              'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
               Gallery3,
              'https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
            ].map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg animate-scale-up"
                style={{ animationDelay: `${index * 100}ms` }}
              />
            ))}
          </div>
          <div className="flex justify-center mt-8 space-x-4">
            {['All', 'Project', 'Car', 'Carbon', 'Break'].map((filter) => (
              <button
                key={filter}
                className="px-4 py-2 rounded-full border border-gray-300 hover:bg-orange-600 hover:text-white transition-all duration-300 animate-fade-in"
              >
                {filter}
              </button>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-8 mb-12">
              <div className="text-orange-600 text-2xl font-bold animate-slide-up">Service</div>
              <div className="text-orange-600 text-2xl font-bold animate-slide-up animate-delay-100">Electrical System Repair</div>
              <div className="text-orange-600 text-2xl font-bold animate-slide-up animate-delay-200">Suspension</div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white shadow-lg rounded-lg p-6 animate-slide-up">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Precision in Every Engine Piston</h3>
                <p className="text-gray-600 mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
              </div>
              <div className="bg-orange-600 text-white rounded-lg p-6 text-center animate-slide-up animate-delay-100">
                <h3 className="text-2xl font-bold mb-4">Quick Fix</h3>
                <p className="text-4xl font-bold mb-4">$19</p>
                <ul className="space-y-2 mb-6">
                  <li>Engine Tune-up</li>
                  <li>Oil Change</li>
                  <li>Brake Inspection</li>
                  <li>Tire Rotation</li>
                </ul>
                <button className="bg-white text-orange-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100">
                  Know More
                </button>
              </div>
              <div className="bg-orange-600 text-white rounded-lg p-6 text-center animate-slide-up animate-delay-200">
                <h3 className="text-2xl font-bold mb-4">Master Mech</h3>
                <p className="text-4xl font-bold mb-4">$29</p>
                <ul className="space-y-2 mb-6">
                  <li>Engine Tune-up</li>
                  <li>Oil Change</li>
                  <li>Brake Inspection</li>
                  <li>Tire Rotation</li>
                </ul>
                <button className="bg-white text-orange-600 px-6 py-2 rounded-full font-medium hover:bg-gray-100">
                  Know More
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 animate-slide-up">
            Performance That Speaks Volumes
          </h2>
          <div className="relative">
            <div className="flex space-x-8">
              {[
                {
                  name: 'Brook Simmons',
                  quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                  img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=60',
                },
                {
                  name: 'Jane Doe',
                  quote: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                  img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=60',
                },
              ].map((testimonial, index) => (
                <div
                  key={testimonial.name}
                  className="bg-white shadow-lg rounded-lg p-6 flex items-center space-x-4 animate-slide-right"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <img src={testimonial.img} alt={testimonial.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <p className="text-gray-600 mb-2">{testimonial.quote}</p>
                    <p className="text-orange-600 font-semibold">{testimonial.name}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-orange-600 text-white p-2 rounded-full animate-fade-in">
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-orange-600 text-white p-2 rounded-full animate-fade-in">
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </div>
        </section>

        {/* Quality Counts Section */}
        <section className="py-16 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 animate-slide-up">
              When Quality Counts, Count on Us
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <WrenchScrewdriverIcon className="h-12 w-12 text-orange-600 mx-auto mb-4" />,
                  title: 'Wheel Alignment',
                  desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
                {
                  icon: <CalendarIcon className="h-12 w-12 text-orange-600 mx-auto mb-4" />,
                  title: 'Filter Replacement',
                  desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
                {
                  icon: <UserGroupIcon className="h-12 w-12 text-orange-600 mx-auto mb-4" />,
                  title: 'System Upgrades',
                  desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                },
              ].map((item, index) => (
                <div
                  key={item.title}
                  className="text-center animate-scale-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {item.icon}
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                  <button className="text-orange-600 mt-2 hover:underline">Know More</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bring Your Drive Back Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 animate-slide-left">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Bring Your Drive Back to Life</h2>
            <p className="text-gray-600 mb-6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <button
              onClick={() => navigate('/contact')}
              className="bg-orange-600 text-white px-8 py-3 rounded-full font-medium hover:bg-orange-700 transition-all duration-300"
            >
              Contact Us
            </button>
          </div>
          <div className="md:w-1/2 md:pl-10 mt-8 md:mt-0 animate-slide-right">
            <div className="bg-orange-600 text-white p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">How Often Should I Get My Car Serviced?</h3>
              <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <h3 className="text-xl font-semibold mb-4">What Do I Do If the Check Engine Light Comes On?</h3>
              <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
              <h3 className="text-xl font-semibold mb-4">How Long Does a Typical Car Repair Take?</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12 animate-slide-up">
            Unleashing the Power of Precision
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Electrical System Repair',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
              },
              {
                title: 'Air Conditioning Maintenance',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                img: 'https://images.unsplash.com/photo-1618761714954-0b8cd0026356?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
              },
              {
                title: 'Interior Detailing & Upholstery',
                desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
                img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=60',
              },
            ].map((post, index) => (
              <div
                key={post.title}
                className="bg-white shadow-lg rounded-lg overflow-hidden animate-scale-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img src={post.img} alt={post.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.desc}</p>
                  <button className="text-orange-600 hover:underline">Read More</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="py-16 bg-orange-600 text-white text-center">
          <div className="flex justify-center animate-slide-up animate-delay-200">
            {/* Removed the empty div as per the original file */}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default GuestHome;