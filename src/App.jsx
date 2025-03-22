import { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CategorySelection from './components/CategorySelection';
import OwnerSignUp from './components/OwnerSignUp';
import TechnicianSignUp from './components/TechnicianSignUp';
import ServiceCenterSignUp from './components/ServiceCentersSignup';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      console.log('User:', currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <div className="App">
        <h1>Servio</h1>
        <Routes>
          <Route
            path="/login"
            element={user ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/signup"
            element={user ? <Navigate to="/" /> : <CategorySelection />}
          />
          <Route
            path="/signup/owner"
            element={user ? <Navigate to="/" /> : <OwnerSignUp />}
          />
          <Route
            path="/signup/technician"
            element={user ? <Navigate to="/" /> : <TechnicianSignUp />}
          />
          <Route
            path="/signup/service-center"
            element={user ? <Navigate to="/" /> : <ServiceCenterSignUp />}
          />
          <Route
            path="/"
            element={
              user ? (
                <div>
                  <p className="welcome">Welcome, {user.email}!</p>
                  <button onClick={() => auth.signOut()}>Logout</button>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;