// src/components/ManageUsers.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUsers, FaEdit, FaTrash } from 'react-icons/fa';
import Footer from '../components/Footer';
import AdminSidebar from '../components/AdminSidebar';

function ManageUsers({ user }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', role: 'Customer' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '+0987654321', role: 'Customer' },
    { id: 3, name: 'Admin User', email: 'admin@example.com', phone: '+1122334455', role: 'Admin' },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', phone: '', role: 'Customer' });
  const [editUser, setEditUser] = useState(null);

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ name: '', email: '', phone: '', role: 'Customer' });
    setShowAddModal(false);
  };

  const handleEditUserSubmit = (e) => {
    e.preventDefault();
    setUsers(users.map(user => 
      user.id === editUser.id ? editUser : user
    ));
    setEditUser(null);
    setShowEditModal(false);
  };

  const handleDelete = (id) => setUsers(users.filter(user => user.id !== id));
  const handleEditClick = (user) => {
    setEditUser({ ...user });
    setShowEditModal(true);
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
        <AdminSidebar activePath="/manage-users" />

        {/* Main Content */}
        <main className="flex-1 max-w-5xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <header className="bg-white/10 backdrop-blur-md text-white p-6 rounded-lg mb-6 flex justify-between items-center shadow-lg">
            <div>
              <h1 className="text-3xl font-extrabold font-[Poppins] tracking-tight">Manage Users</h1>
              <p className="text-sm mt-1 font-[Open Sans] text-gray-300">Administer user accounts for Servio</p>
            </div>
          </header>

          {/* User Management */}
          <section>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-3">
              <h2 className="text-2xl font-bold text-white font-[Poppins]">User List</h2>
              <button
                onClick={() => setShowAddModal(true)}
                className="bg-red-600 text-white p-2 rounded-full hover:bg-red-700 hover:scale-110 transition-all duration-200 ease-in-out flex items-center gap-1"
              >
                <FaUsers className="h-5 w-5" /> Add User
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse rounded-lg shadow-lg bg-white/10 backdrop-blur-md">
                <thead>
                  <tr className="bg-red-600 text-white">
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Name</th>
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Email</th>
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Phone</th>
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Role</th>
                    <th className="border border-gray-700/50 p-3 text-left font-[Raleway]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-700/50">
                      <td className="border border-gray-700/50 p-3 font-[Open Sans] text-gray-300">{user.name}</td>
                      <td className="border border-gray-700/50 p-3 font-[Open Sans] text-gray-300">{user.email}</td>
                      <td className="border border-gray-700/50 p-3 font-[Open Sans] text-gray-300">{user.phone}</td>
                      <td className="border border-gray-700/50 p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-[Open Sans] ${
                            user.role === 'Admin' ? 'bg-purple-100 text-purple-800' : 'bg-orange-100 text-orange-800'
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="border border-gray-700/50 p-3 flex gap-2">
                        <button
                          onClick={() => handleEditClick(user)}
                          className="text-red-500 hover:text-red-400 hover:scale-125 transition-all duration-200 ease-in-out"
                          title="Edit"
                        >
                          <FaEdit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDelete(user.id)}
                          className="text-red-500 hover:text-red-400 hover:scale-125 transition-all duration-200 ease-in-out"
                          title="Delete"
                        >
                          <FaTrash className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Add User Modal */}
          {showAddModal && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="p-6 rounded-lg shadow-xl w-full max-w-md bg-gray-800 text-white">
                <h3 className="text-xl font-semibold mb-4 font-[Raleway] text-white">Add New User</h3>
                <form onSubmit={handleAddUserSubmit} className="space-y-4 font-[Open Sans]">
                  <div>
                    <label className="block mb-1 text-gray-300">Name</label>
                    <input
                      type="text"
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Email</label>
                    <input
                      type="email"
                      value={newUser.email}
                      onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., john@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Phone</label>
                    <input
                      type="tel"
                      value={newUser.phone}
                      onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      placeholder="e.g., +1234567890"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Role</label>
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="Customer">Customer</option>
                      <option value="Admin">Admin</option>
                    </select>
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

          {/* Edit User Modal */}
          {showEditModal && editUser && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="p-6 rounded-lg shadow-xl w-full max-w-md bg-gray-800 text-white">
                <h3 className="text-xl font-semibold mb-4 font-[Raleway] text-white">Edit User</h3>
                <form onSubmit={handleEditUserSubmit} className="space-y-4 font-[Open Sans]">
                  <div>
                    <label className="block mb-1 text-gray-300">Name</label>
                    <input
                      type="text"
                      value={editUser.name}
                      onChange={(e) => setEditUser({ ...editUser, name: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Email</label>
                    <input
                      type="email"
                      value={editUser.email}
                      onChange={(e) => setEditUser({ ...editUser, email: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Phone</label>
                    <input
                      type="tel"
                      value={editUser.phone}
                      onChange={(e) => setEditUser({ ...editUser, phone: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block mb-1 text-gray-300">Role</label>
                    <select
                      value={editUser.role}
                      onChange={(e) => setEditUser({ ...editUser, role: e.target.value })}
                      className="w-full p-2 border rounded-md bg-gray-700 border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      <option value="Customer">Customer</option>
                      <option value="Admin">Admin</option>
                    </select>
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

      {/* Footer - Full Width */}
      <Footer />
    </div>
  );
}

export default ManageUsers;