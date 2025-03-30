const Footer = () => {
    return (
      <footer className="bg-gray-800 text-white py-6">
        <div className="max-w-6xl mx-auto px-5 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Vehicle Service & Repair
            Management System. All rights reserved.
          </p>
          <div className="mt-3 flex justify-center space-x-4">
            <a href="/about-us" className="text-gray-400 hover:text-white text-sm">
              About Us
            </a>
            <a href="/contact" className="text-gray-400 hover:text-white text-sm">
              Contact
            </a>
            <a href="/privacy" className="text-gray-400 hover:text-white text-sm">
              Privacy Policy
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;