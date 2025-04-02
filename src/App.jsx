// src/App.jsx
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { motion } from "framer-motion";

// Login
import Login from "./pages/Login";
import CategorySelection from "./pages/CategorySelection";
import OwnerSignUp from "./pages/OwnerSignUp";
import TechnicianSignUp from "./pages/TechnicianSignUp";
import ServiceCenterSignUp from "./pages/ServiceCenterSignUp";

// Guest
import GuestHome from "./pages/GuestHome";
import AboutUs from "./pages/AboutUs";
import Contact from "./pages/Contact";

// Admin
import AdminDashboard from "./admin/AdminDashboard";
import ManageUsers from "./admin/manageUsers";
import AllServices from "./admin/AllServices";
import AdminReports from "./admin/Reports";
import AdminLogin from "./admin/AdminLogin";

// Owner
import OwnerHome from "./pages/OwnerHome";
import ContactTechnician from "./pages/contactTechnician";
import BookServiceCenter from "./pages/BookServiceCenter";

// Technician
import TechnicianDashboard from "./Technician/TechnicianDashboard";
import UpdateStatus from "./Technician/UpdateStatus";
import VehiclePartsRequest from "./Technician/VehiclePartsRequest";
import ViewDetails from "./Technician/ViewDetails";

// Service Center
import ServiceCenterDashboard from "./ServiceCenetrs/ServiceCenterDashbooard";
import JobList from "./ServiceCenetrs/JobList";
import PendingJob from "./ServiceCenetrs/PendingJob";
import SparePartsInventory from "./ServiceCenetrs/SparePartsInventory";
import ReportAndAnalyse from "./ServiceCenetrs/Report&Analyse";

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        try {
          const userDocRef = doc(db, "users", currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            console.log("User data fetched:", userDoc.data());
          } else {
            console.log("No user data found in Firestore");
            setUserData(null);
          }
          setUser(currentUser);
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Animation Variants (from AboutUs/AdminDashboard)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  const AuthLayout = ({ children }) => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen flex items-center justify-center bg-gray-900 p-4 bg-cover bg-center relative"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/40"></div>
      <motion.div
        variants={itemVariants}
        className="relative w-full max-w-md p-6 bg-white/10 backdrop-blur-md rounded-xl shadow-2xl border border-gray-700/50"
      >
        {children}
      </motion.div>
    </motion.div>
  );

  const UserProfile = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center gap-6"
    >
      {loading ? (
        <svg
          className="animate-spin h-8 w-8 text-red-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      ) : (
        <>
          <motion.p
            variants={itemVariants}
            className="text-lg font-medium text-red-500 bg-red-100/20 p-3 rounded-md shadow-sm font-[Open Sans]"
          >
            Welcome, {user.email}!
          </motion.p>
          {userData ? (
            <motion.div
              variants={itemVariants}
              className="w-full bg-gray-800 p-4 rounded-lg shadow-inner border border-gray-700/50"
            >
              <h3 className="text-xl font-semibold text-white mb-4 text-center font-[Poppins]">
                Your Profile
              </h3>
              <div className="text-gray-300 space-y-2 font-[Open Sans]">
                <p>
                  <span className="font-medium text-white">User ID:</span> {userData.userId}
                </p>
                <p>
                  <span className="font-medium text-white">Category:</span> {userData.category}
                </p>
                <p>
                  <span className="font-medium text-white">Name:</span> {userData.name}
                </p>
                {userData.category === "owner" && (
                  <>
                    <p>
                      <span className="font-medium text-white">Car:</span> {userData.carMake}{" "}
                      {userData.carModel}
                    </p>
                    <p>
                      <span className="font-medium text-white">Number Plate:</span>{" "}
                      {userData.numberPlate}
                    </p>
                    <p>
                      <span className="font-medium text-white">VIN:</span> {userData.vinNumber}
                    </p>
                  </>
                )}
                {userData.category === "technician" && (
                  <>
                    <p>
                      <span className="font-medium text-white">Specialization:</span>{" "}
                      {userData.specialization}
                    </p>
                    <p>
                      <span className="font-medium text-white">Age:</span> {userData.age}
                    </p>
                  </>
                )}
                {userData.category === "service-center" && (
                  <>
                    <p>
                      <span className="font-medium text-white">Certification:</span>{" "}
                      {userData.certification}
                    </p>
                    <p>
                      <span className="font-medium text-white">Address:</span> {userData.address}
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.p variants={itemVariants} className="text-red-400 font-[Open Sans]">
              No profile data found.
            </motion.p>
          )}
          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => auth.signOut()}
            className="p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 shadow-md hover:shadow-lg transform"
          >
            Logout
          </motion.button>
        </>
      )}
    </motion.div>
  );

  // Protected Route Component to restrict access based on user category
  const ProtectedRoute = ({ children, allowedCategories }) => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <svg
            className="animate-spin h-8 w-8 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      );
    }

    if (!user) {
      return <Navigate to="/login" />;
    }

    if (!userData || !allowedCategories.includes(userData.category)) {
      return <Navigate to="/" />;
    }

    return children;
  };

  // Redirect to the appropriate dashboard based on user category
  const DashboardRedirect = () => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <svg
            className="animate-spin h-8 w-8 text-red-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      );
    }

    if (!user) {
      return <GuestHome user={user} />;
    }

    if (!userData) {
      return <AuthLayout><UserProfile /></AuthLayout>;
    }

    switch (userData.category) {
      case "owner":
        return <Navigate to="/owner-home" />;
      case "technician":
        return <Navigate to="/technician-home" />;
      case "service-center":
        return <Navigate to="/service-center-home" />;
      case "admin":
        return <Navigate to="/admin-dashboard" />;
      default:
        return <AuthLayout><UserProfile /></AuthLayout>;
    }
  };

  return (
    <Router>
      <Routes>
        {/* Root Route: Redirect to appropriate dashboard or show GuestHome */}
        <Route path="/" element={<DashboardRedirect />} />

        {/* Login and Signup Routes */}
        <Route path="/login" element={user ? <Navigate to="/" /> : <AuthLayout><Login /></AuthLayout>} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <AuthLayout><CategorySelection /></AuthLayout>} />
        <Route path="/signup/owner" element={user ? <Navigate to="/" /> : <AuthLayout><OwnerSignUp /></AuthLayout>} />
        <Route path="/signup/technician" element={user ? <Navigate to="/" /> : <AuthLayout><TechnicianSignUp /></AuthLayout>} />
        <Route path="/signup/service-center" element={user ? <Navigate to="/" /> : <AuthLayout><ServiceCenterSignUp /></AuthLayout>} />

        {/* Guest Routes */}
        <Route path="/book-service" element={<div>Book Service Page (TBD)</div>} />
        <Route path="/contact" element={<Contact user={user} />} />
        <Route path="/about-us" element={<AboutUs user={user} />} />
        <Route path="/profile" element={user ? <AuthLayout><UserProfile /></AuthLayout> : <Navigate to="/login" />} />

        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedCategories={["admin"]}>
              <AdminDashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/all-services"
          element={
            <ProtectedRoute allowedCategories={["admin"]}>
              <AllServices />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-reports"
          element={
            <ProtectedRoute allowedCategories={["admin"]}>
              <AdminReports />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manage-users"
          element={
            <ProtectedRoute allowedCategories={["admin"]}>
              <ManageUsers />
            </ProtectedRoute>
          }
        />

        {/* Technician Routes */}
        <Route
          path="/technician-home"
          element={
            <ProtectedRoute allowedCategories={["technician"]}>
              <TechnicianDashboard user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/update-status"
          element={
            <ProtectedRoute allowedCategories={["technician"]}>
              <UpdateStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/parts-request"
          element={
            <ProtectedRoute allowedCategories={["technician"]}>
              <VehiclePartsRequest />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job-details"
          element={
            <ProtectedRoute allowedCategories={["technician"]}>
              <div>Job Details Page (TBD)</div>
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-details"
          element={
            <ProtectedRoute allowedCategories={["technician"]}>
              <ViewDetails />
            </ProtectedRoute>
          }
        />

        {/* Owner Routes */}
        <Route
          path="/owner-home"
          element={
            <ProtectedRoute allowedCategories={["owner"]}>
              <OwnerHome user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/contact-technician"
          element={
            <ProtectedRoute allowedCategories={["owner"]}>
              <ContactTechnician />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book-service-center"
          element={
            <ProtectedRoute allowedCategories={["owner"]}>
              <BookServiceCenter />
            </ProtectedRoute>
          }
        />

        {/* Service Center Routes */}
        <Route
          path="/service-center-home"
          element={
            <ProtectedRoute allowedCategories={["service-center"]}>
              <ServiceCenterDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/pending-jobs"
          element={
            <ProtectedRoute allowedCategories={["service-center"]}>
              <PendingJob />
            </ProtectedRoute>
          }
        />
        <Route
          path="/job-list"
          element={
            <ProtectedRoute allowedCategories={["service-center"]}>
              <JobList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/spare-parts-inventory"
          element={
            <ProtectedRoute allowedCategories={["service-center"]}>
              <SparePartsInventory />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-and-analyse"
          element={
            <ProtectedRoute allowedCategories={["service-center"]}>
              <ReportAndAnalyse />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;