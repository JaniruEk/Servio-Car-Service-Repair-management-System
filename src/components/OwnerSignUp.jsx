import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth ,db} from '../firebase';
import { useNavigate } from 'react-router-dom';

import { doc, setDoc } from 'firebase/firestore';

function OwnerSignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [numberPlate, setNumberPlate] = useState('');
  const [vinNumber, setVinNumber] = useState('');
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
    console.log('Starting registration...');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const userId = user.uid;
    console.log('User created in Auth:', userId);

    const userData = {
      userId,
      category: 'owner',
      email,
      name,
      carMake,
      carModel,
      numberPlate,
      vinNumber,
      createdAt: new Date().toISOString(),
    };
    console.log('Attempting to write to Firestore:', userData);

    await setDoc(doc(db, 'users', userId), userData);
    console.log('Data written to Firestore successfully');

    alert('Registered successfully! Please sign in.');
    navigate('/login');
  } catch (err) {
    setError('Registration failed: ' + err.message);
    console.error('Error during registration:', err);
  }
};

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 tracking-wide text-center">Sign Up as Vehicle Owner</h2>
      {error && <p className="text-red-600 text-sm mb-6 p-2 bg-red-50 rounded-md border border-red-200 text-center">{error}</p>}
      <form onSubmit={handleRegister} className="flex flex-col gap-5 w-full">
        <input
          type="text"
          placeholder="Full Name"
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
          placeholder="Car Make (e.g., Toyota)"
          value={carMake}
          onChange={(e) => setCarMake(e.target.value)}
          required
          className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out"
        />
        <input
          type="text"
          placeholder="Car Model (e.g., Corolla)"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
          required
          className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out"
        />
        <input
          type="text"
          placeholder="Number Plate (e.g., ABC-1234)"
          value={numberPlate}
          onChange={(e) => setNumberPlate(e.target.value)}
          required
          className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out"
        />
        <input
          type="text"
          placeholder="VIN Number (e.g., 1HGCM82633A004352)"
          value={vinNumber}
          onChange={(e) => setVinNumber(e.target.value)}
          required
          className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out"
        />
        <button type="submit" 
        className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1">Sign Up</button>
      </form>
      <button className="mt-6 text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-4 transition-colors duration-200 w-full text-center" onClick={() => navigate('/signup')}>
        Back to Category Selection
      </button>
    </div>
  );
}

export default OwnerSignUp;