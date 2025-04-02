// src/components/ServiceCenter.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CAR4 from "../assets/images/Car4.jpeg";
import CAR7 from "../assets/images/Car7.jpeg";
import CAR6 from "../assets/images/Car6.jpeg";
import CAR8 from "../assets/images/Car8.jpeg";
import CAR9 from "../assets/images/Car9.jpeg";
import {
  ChartBarIcon,
  UsersIcon,
  WrenchScrewdriverIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import AdminSidebar from "../components/ServiceCenterSidebar"; // Assuming you have this component
import Footer from "../components/Footer"; // Assuming you have this component

const ServiceCenterDashboard = () => {
  const [services, setServices] = useState([
    { id: 1, title: "Brake Repair", description: "Expert brake repair services.", image: CAR9, status: "Active", cost: 150 },
    { id: 2, title: "Oil Change", description: "Quick and efficient oil change.", image: CAR8, status: "Active", cost: 50 },
    { id: 3, title: "Tire Rotation", description: "Professional tire rotation service.", image: CAR6, status: "Inactive", cost: 80 },
    { id: 4, title: "Engine Diagnostics", description: "Advanced engine diagnostics.", image: CAR7, status: "Active", cost: 200 },
  ]);
  const [filterStatus, setFilterStatus] = useState("All");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newService, setNewService] = useState({ title: "", description: "", image: "", status: "Active", cost: "" });
  const [editService, setEditService] = useState(null);

  const filteredServices = filterStatus === "All" ? services : services.filter((service) => service.status === filterStatus);

  const handleServiceSubmit = (e) => {
    e.preventDefault();
    setServices([...services, { ...newService, id: services.length + 1, cost: Number(newService.cost), image: newService.image || CAR4 }]);
    setNewService({ title: "", description: "", image: "", status: "Active", cost: "" });
    setShowAddModal(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    setServices(services.map((service) => (service.id === editService.id ? { ...editService, cost: Number(editService.cost) } : service)));
    setEditService(null);
    setShowEditModal(false);
  };

  const handleDelete = (id) => setServices(services.filter((service) => service.id !== id));
  const handleEditClick = (service) => {
    setEditService({ ...service });
    setShowEditModal(true);
  };

  const totalRevenue = services.reduce((sum, service) => sum + (service.status === "Active" ? service.cost : 0), 0);
  const activeServices = services.filter((s) => s.status === "Active").length;

  return (
    <div
      className="flex flex-col min-h-screen bg-gray-900 text-white font-sans bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
        backgroundAttachment: "fixed", // Makes the image static
  backgroundSize: "cover", // Ensures the image covers the container (optional, already implied by bg-cover)
  backgroundPosition: "center", // Centers the image (optional, already implied by bg-center)
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40"></div>

      <div className="flex flex-1 relative z-10">
        {/* Sidebar */}
        <AdminSidebar activePath="/service-center" />

        {/* Main Content */}
        <main className="flex-1 max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <header className="bg-white/10 backdrop-blur-md text-white p-6 rounded-lg mb-6 flex justify-between items-center shadow-lg">
            <div>
              <h1 className="text-3xl font-extrabold font-[Poppins] tracking-tight">Service Center Dashboard</h1>
              <p className="text-sm mt-1 font-[Open Sans] text-gray-300">Manage your service offerings</p>
            </div>
          </header>

          {/* Overview Section */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-6 rounded-lg shadow-lg text-center bg-white/10 backdrop-blur-md border border-gray-700/50 hover:border-red-500 transition-all duration-300">
              <UsersIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2 font-[Raleway]">Total Services</h3>
              <p className="text-gray-300 font-[Open Sans] text-2xl font-bold">{services.length}</p>
            </div>
            <div className="p-6 rounded-lg shadow-lg text-center bg-white/10 backdrop-blur-md border border-gray-700/50 hover:border-red-500 transition-all duration-300">
              <WrenchScrewdriverIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2 font-[Raleway]">Active Services</h3>
              <p className="text-gray-300 font-[Open Sans] text-2xl font-bold">{activeServices}</p>
            </div>
            <div className="p-6 rounded-lg shadow-lg text-center bg-white/10 backdrop-blur-md border border-gray-700/50 hover:border-red-500 transition-all duration-300">
              <ChartBarIcon className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2 font-[Raleway]">Total Revenue</h3>
              <p className="text-gray-300 font-[Open Sans] text-2xl font-bold">${totalRevenue.toFixed(2)}</p>
            </div>
          </section>

          {/* Services Management */}
          <section>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
              <h2 className="text-2xl font-bold text-white font-[Poppins]">Services Management</h2>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="p-2 rounded-md border bg-gray-800 text-white border-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 font-[Open Sans]"
                >
                  <option value="All">All Services</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
                <button
                  onClick={() => setShowAddModal(true)}
                  className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 hover:scale-110 transition-all duration-200 ease-in-out flex items-center gap-1"
                >
                  <PlusIcon className="h-5 w-5" /> Add Service
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg shadow-lg bg-white/10 backdrop-blur-md">
                <thead>
                  <tr className="bg-red-600 text-white">
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Title</th>
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Description</th>
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Image</th>
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Status</th>
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Cost</th>
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-700/50">
                      <td className="border border-gray-700/50 p-3 font-[Open Sans] text-gray-300">{service.title}</td>
                      <td className="border border-gray-700/50 p-3 font-[Open Sans] text-gray-300">{service.description}</td>
                      <td className="border border-gray-700/50 p-3">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="h-12 w-12 object-cover rounded-md"
                          onError={(e) => {
                            e.target.src = "https://via.placeholder.com/50x50?text=Image+Not+Found";
                          }}
                        />
                      </td>
                      <td className="border border-gray-700/50 p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-[Open Sans] ${
                            service.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {service.status}
                        </span>
                      </td>
                      <td className="border border-gray-700/50 p-3 font-[Open Sans] text-gray-300">${service.cost.toFixed(2)}</td>
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

          {/* Add Service Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="p-6 rounded-lg shadow-xl w-full max-w-md bg-gray-800 text-white">
                <h3 className="text-xl font-semibold mb-4 font-[Raleway] text-white">Add New Service</h3>
                <form onSubmit={handleServiceSubmit} className="space-y-4 font-[Open Sans]">
                  <div>
                    <label className="block mb-1 text-gray-300">Service Title</label>
                    <input
                      type="text"
                      value={newService.title}
                      onChange={(e) => setNewService({ ...newService, title: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., Brake Repair"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Description</label>
                    <input
                      type="text"
                      value={newService.description}
                      onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., Expert brake repair services"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Image URL (optional)</label>
                    <input
                      type="text"
                      value={newService.image}
                      onChange={(e) => setNewService({ ...newService, image: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Status</label>
                    <select
                      value={newService.status}
                      onChange={(e) => setNewService({ ...newService, status: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Cost ($)</label>
                    <input
                      type="number"
                      value={newService.cost}
                      onChange={(e) => setNewService({ ...newService, cost: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., 150"
                      min="0"
                      step="0.01"
                      required
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowAddModal(false)}
                      className="px-4 py-2 rounded-md bg-gray-600 text-white hover:bg-gray-500 hover:scale-105 transition-all duration-200 ease-in-out transform"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 hover:scale-105 transition-all duration-200 ease-in-out transform"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit Service Modal */}
          {showEditModal && editService && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="p-6 rounded-lg shadow-xl w-full max-w-md bg-gray-800 text-white">
                <h3 className="text-xl font-semibold mb-4 font-[Raleway] text-white">Edit Service</h3>
                <form onSubmit={handleEditSubmit} className="space-y-4 font-[Open Sans]">
                  <div>
                    <label className="block mb-1 text-gray-300">Service Title</label>
                    <input
                      type="text"
                      value={editService.title}
                      onChange={(e) => setEditService({ ...editService, title: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Description</label>
                    <input
                      type="text"
                      value={editService.description}
                      onChange={(e) => setEditService({ ...editService, description: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Image URL</label>
                    <input
                      type="text"
                      value={editService.image}
                      onChange={(e) => setEditService({ ...editService, image: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Status</label>
                    <select
                      value={editService.status}
                      onChange={(e) => setEditService({ ...editService, status: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
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
                      onClick={() => setShowEditModal(false)}
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

export default ServiceCenterDashboard;