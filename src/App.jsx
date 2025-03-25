import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CategorySelection from './components/CategorySelection';
import OwnerSignUp from './components/OwnerSignUp';
import TechnicianSignUp from './components/TechnicianSignUp';
import ServiceCenterSignUp from './components/ServiceCentersSignUp';
import GuestHome from './components/GuestHome';

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      if (currentUser) {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDoc = await getDoc(userDocRef);
          if (userDoc.exists()) {
            setUserData(userDoc.data());
            console.log('User data fetched:', userDoc.data());
          } else {
            console.log('No user data found in Firestore');
            setUserData(null);
          }
          setUser(currentUser);
        } catch (err) {
          console.error('Error fetching user data:', err);
        }
      } else {
        setUser(null);
        setUserData(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const AuthLayout = ({ children }) => (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <h1 className="text-4xl font-bold text-blue-900 mb-8 text-center tracking-wide">Servio</h1>
        {children}
      </div>
    </div>
  );

  const UserProfile = () => (
    <div className="flex flex-col items-center gap-6">
      {loading ? (
        <svg className="animate-spin h-8 w-8 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      ) : (
        <>
          <p className="text-lg font-medium text-green-600 bg-green-50 p-3 rounded-md shadow-sm">
            Welcome, {user.email}!
          </p>
          {userData ? (
            <div className="w-full bg-gray-50 p-4 rounded-lg shadow-inner border border-gray-200">
              <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">Your Profile</h3>
              <div className="text-gray-700 space-y-2">
                <p><span className="font-medium">User ID:</span> {userData.userId}</p>
                <p><span className="font-medium">Category:</span> {userData.category}</p>
                <p><span className="font-medium">Name:</span> {userData.name}</p>
                {userData.category === 'owner' && (
                  <>
                    <p><span className="font-medium">Car:</span> {userData.carMake} {userData.carModel}</p>
                    <p><span className="font-medium">Number Plate:</span> {userData.numberPlate}</p>
                    <p><span className="font-medium">VIN:</span> {userData.vinNumber}</p>
                  </>
                )}
                {userData.category === 'technician' && (
                  <>
                    <p><span className="font-medium">Specialization:</span> {userData.specialization}</p>
                    <p><span className="font-medium">Age:</span> {userData.age}</p>
                  </>
                )}
                {userData.category === 'service-center' && (
                  <>
                    <p><span className="font-medium">Certification:</span> {userData.certification}</p>
                    <p><span className="font-medium">Address:</span> {userData.address}</p>
                  </>
                )}
              </div>
            </div>
          ) : (
            <p className="text-red-600">No profile data found.</p>
          )}
          <button
            onClick={() => auth.signOut()}
            className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={user ? <AuthLayout><UserProfile /></AuthLayout> : <GuestHome />}
        />
        <Route path="/login" element={user ? <Navigate to="/" /> : <AuthLayout><Login /></AuthLayout>} />
        <Route path="/signup" element={user ? <Navigate to="/" /> : <AuthLayout><CategorySelection /></AuthLayout>} />
        <Route path="/signup/owner" element={user ? <Navigate to="/" /> : <AuthLayout><OwnerSignUp /></AuthLayout>} />
        <Route path="/signup/technician" element={user ? <Navigate to="/" /> : <AuthLayout><TechnicianSignUp /></AuthLayout>} />
        <Route path="/signup/service-center" element={user ? <Navigate to="/" /> : <AuthLayout><ServiceCenterSignUp /></AuthLayout>} />
        <Route path="/book-service" element={<div>Book Service Page (TBD)</div>} />
        <Route path="/contact" element={<div>Contact Us Page (TBD)</div>} />
      </Routes>
    </Router>
  );
}

export default App;