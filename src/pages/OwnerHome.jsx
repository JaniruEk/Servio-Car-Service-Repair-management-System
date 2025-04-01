// src/pages/OwnerHome.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  CalendarIcon,
  WrenchScrewdriverIcon,
  PencilIcon,
  TrashIcon,
  UsersIcon,
  InformationCircleIcon
} from "@heroicons/react/24/solid";
import Footer from "../components/Footer";
import OwnerSidebar from "../components/OwnerSidebar"; // Import the new OwnerSidebar component

const OwnerHome = ({ user }) => {
  const navigate = useNavigate();
  const [services, setServices] = useState(() => {
    const savedServices = localStorage.getItem("services");
    return savedServices
      ? JSON.parse(savedServices)
      : [
          { id: 1, date: "2025-03-10", type: "Oil Change", status: "Completed", cost: 50 },
          { id: 2, date: "2025-02-20", type: "Brake Repair", status: "Completed", cost: 150 },
          { id: 3, date: "2025-04-15", type: "Tire Rotation", status: "Pending", cost: 80 },
        ];
  });
  const [filterStatus, setFilterStatus] = useState("All");
  const [showEditModal, setShowEditModal] = useState(false);
  const [editService, setEditService] = useState(null);
  const [showStatusDropdownEdit, setShowStatusDropdownEdit] = useState(false);

  const statuses = ["Pending", "Completed"];

  useEffect(() => {
    localStorage.setItem("services", JSON.stringify(services));
  }, [services]);

  const filteredServices = filterStatus === "All" ? services : services.filter((service) => service.status === filterStatus);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setServices(
      services.map((service) =>
        service.id === editService.id ? { ...editService, cost: Number(editService.cost) } : service
      )
    );
    setEditService(null);
    setShowEditModal(false);
    setShowStatusDropdownEdit(false);
  };

  const handleDelete = (id) => setServices(services.filter((service) => service.id !== id));
  const handleEditClick = (service) => {
    setEditService({ ...service });
    setShowEditModal(true);
  };

  const totalServices = services.filter((s) => s.status === "Completed").length;

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
        <OwnerSidebar activePath="/owner-home" />

        {/* Main Content */}
        <main className="flex-1 max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <header className="bg-white/10 backdrop-blur-md text-white p-6 rounded-lg mb-6 flex justify-between items-center shadow-lg">
            <div>
              <h1 className="text-3xl font-extrabold font-[Poppins] tracking-tight">
                Servio Customer Dashboard
              </h1>
              <p className="text-sm mt-1 font-[Open Sans] text-gray-300">
                Manage your vehicle services with ease
              </p>
            </div>
          </header>

          {/* Overview Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <div className="p-6 rounded-lg shadow-lg text-center bg-white/10 backdrop-blur-md border border-gray-700/50 hover:border-red-500 transition-all duration-300">
              <CalendarIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2 font-[Raleway]">
                Upcoming Service
              </h3>
              <p className="text-gray-300 font-[Open Sans]">
                {services.find((s) => s.status === "Pending")?.date || "No upcoming services scheduled."}
              </p>
              <button
                onClick={() => navigate("/book-service-center")}
                className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 ease-in-out"
              >
                Schedule Now
              </button>
            </div>
            <div className="p-6 rounded-lg shadow-lg text-center bg-white/10 backdrop-blur-md border border-gray-700/50 hover:border-red-500 transition-all duration-300">
              <WrenchScrewdriverIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2 font-[Raleway]">
                Total Services
              </h3>
              <p className="text-gray-300 font-[Open Sans] text-2xl font-bold">{totalServices}</p>
            </div>
          </section>

          {/* Service History */}
          <section>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
              <h2 className="text-2xl font-bold text-white font-[Poppins]">Your Service History</h2>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="p-2 rounded-md border bg-gray-800 text-white border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 font-[Open Sans]"
                >
                  <option value="All">All Services</option>
                  <option value="Completed">Completed</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg shadow-lg bg-white/10 backdrop-blur-md">
                <thead>
                  <tr className="bg-red-600 text-white">
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Date</th>
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">
                      Service Type
                    </th>
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Status</th>
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Cost</th>
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-700/50">
                      <td className="border border-gray-700/50 p-3 font-[Open Sans] text-gray-300">
                        {service.date}
                      </td>
                      <td className="border border-gray-700/50 p-3 font-[Open Sans] text-gray-300">
                        {service.type}
                      </td>
                      <td className="border border-gray-700/50 p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-[Open Sans] ${
                            service.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {service.status}
                        </span>
                      </td>
                      <td className="border border-gray-700/50 p-3 font-[Open Sans] text-gray-300">
                        ${service.cost.toFixed(2)}
                      </td>
                      <td className="border border-gray-700/50 p-3 flex gap-2">
                        <button
                          onClick={() => handleEditClick(service)}
                          className="text-red-500 hover:text-red-400 hover:scale-125 transition-all duration-200 ease-in-out"
                          title="Edit"
                        >
                          <PencilIcon className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(service.id)}
                          className="text-red-500 hover:text-red-400 hover:scale-125 transition-all duration-200 ease-in-out"
                          title="Delete"
                        >
                          <TrashIcon className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Edit Service Modal */}
          {showEditModal && editService && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="p-6 rounded-lg shadow-xl w-full max-w-md bg-gray-800 text-white">
                <h3 className="text-xl font-semibold mb-4 font-[Raleway] text-white">
                  Edit Service
                </h3>
                <form onSubmit={handleEditSubmit} className="space-y-4 font-[Open Sans]">
                  <div>
                    <label className="block mb-1 text-gray-300">Date</label>
                    <input
                      type="date"
                      value={editService.date}
                      onChange={(e) => setEditService({ ...editService, date: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Service Type</label>
                    <input
                      type="text"
                      value={editService.type}
                      onChange={(e) => setEditService({ ...editService, type: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Status</label>
                    <select
                      value={editService.status}
                      onChange={(e) => setEditService({ ...editService, status: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Cost ($)</label>
                    <input
                      type="number"
                      value={editService.cost}
                      onChange={(e) => setEditService({ ...editService, cost: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowEditModal(false);
                        setShowStatusDropdownEdit(false);
                      }}
                      className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-500 hover:scale-105 transition-all duration-200 ease-in-out transform"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 hover:scale-105 transition-all duration-200 ease-in-out transform"
                    >
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default OwnerHome;