import { Link } from "react-router-dom";

const Header = ({ title }) => {
  return (
    <header className="flex justify-between items-center bg-white p-4 shadow-md">
      <div className="flex items-center">
        <img
          src="https://via.placeholder.com/40"
          alt="Logo"
          className="w-10 h-10 mr-3"
        />
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      </div>
      <nav className="flex items-center space-x-6">
        <Link to="/dashboard" className="text-blue-500 text-sm hover:underline">
          Dashboard
        </Link>
        <Link to="/about-us" className="text-blue-500 text-sm hover:underline">
          About Us
        </Link>
        <Link to="/contact" className="text-blue-500 text-sm hover:underline">
          Contact
        </Link>
        <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 text-sm">
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;