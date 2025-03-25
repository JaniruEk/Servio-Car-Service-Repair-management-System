
import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './firebase';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CategorySelection from './components/CategorySelection';
import OwnerSignUp from './components/OwnerSignUp';
import TechnicianSignUp from './components/TechnicianSignUp';
import ServiceCenterSignUp from './components/ServiceCentersSignup';
import GuestHome from './components/GuestHome';

function App() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      console.log('Auth state changed:', currentUser ? currentUser.uid : 'No user');
      setUser(currentUser);
      if (currentUser) {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        }
      } else {
        setUserData(null);
      }
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

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            user ? (
              <AuthLayout>
                <div className="flex flex-col items-center gap-6">
                  <p className="text-lg font-medium text-green-600 bg-green-50 p-3 rounded-md shadow-sm">
                    Welcome, {user.email}!
                  </p>
                  {userData && (
                    <div className="text-gray-700 text-center">
                      <p>User ID: {userData.userId}</p>
                      <p>Category: {userData.category}</p>
                      <p>Name: {userData.name}</p>
                      {userData.category === 'owner' && (
                        <>
                          <p>Car: {userData.carMake} {userData.carModel}</p>
                          <p>Number Plate: {userData.numberPlate}</p>
                          <p>VIN: {userData.vinNumber}</p>
                        </>
                      )}
                      {userData.category === 'technician' && (
                        <>
                          <p>Specialization: {userData.specialization}</p>
                          <p>Age: {userData.age}</p>
                        </>
                      )}
                      {userData.category === 'service-center' && (
                        <>
                          <p>Certification: {userData.certification}</p>
                          <p>Address: {userData.address}</p>
                        </>
                      )}
                    </div>
                  )}
                  <button
                    onClick={() => auth.signOut()}
                    className="p-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-1"
                  >
                    Logout
                  </button>
                </div>
              </AuthLayout>
            ) : (
              <GuestHome />
            )
          }
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