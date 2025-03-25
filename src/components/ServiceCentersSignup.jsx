import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth ,db } from '../firebase';
import { useNavigate } from 'react-router-dom';

import { doc, setDoc } from 'firebase/firestore';

function ServiceCenterSignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [certification, setCertification] = useState('');
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
  //   try {
  //     await createUserWithEmailAndPassword(auth, email, password);
  //     alert('Registered successfully! Please sign in.');
  //     navigate('/login');
  //   } catch (err) {
  //     setError('Registration failed: ' + err.message);
  //     console.error(err);
  //   }
  // };
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userId = user.uid;
    const userData = {
      userId,
      category: 'service-center',
      email,
      name,
      certification,
      address,
      createdAt: new Date().toISOString(),
    };
    await setDoc(doc(db, 'users', userId), userData);
    alert('Registered successfully! Please sign in.');
    navigate('/login');
  } catch (err) {
    setError('Registration failed: ' + err.message);
    console.error('Error during registration:', err);
  }
};
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 tracking-wide text-center">Sign Up as Service Center</h2>
      {error && (
        <p className="text-red-600 text-sm mb-6 p-2 bg-red-50 rounded-md border border-red-200 text-center">
          {error}
        </p>
      )}
      <form onSubmit={handleRegister} className="flex flex-col gap-5 w-full">
        <input
          type="text"
          placeholder="Service Center Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out"
        />
        <input
          type="text"
          placeholder="Certification Number"
          value={certification}
          onChange={(e) => setCertification(e.target.value)}
          required
          className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out"
        />
        <button
          type="submit"
          className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          Sign Up
        </button>
      </form>
      <button
        className="mt-6 text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-4 transition-colors duration-200 w-full text-center"
        onClick={() => navigate('/signup')}
      >
        Back to Category Selection
      </button>
    </div>
  );
}

export default ServiceCenterSignUp;