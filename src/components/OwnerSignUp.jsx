import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function OwnerSignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [numberPlate, setNumberPlate] = useState('');
  const [vinNumber, setVinNumber] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) setEmailError('Email is required');
    else if (!emailRegex.test(value)) setEmailError('Invalid email format');
    else setEmailError('');
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (emailError || !email || !password || !name || !carMake || !carModel || !numberPlate || !vinNumber) {
      setError('Please fill all fields correctly');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userId = user.uid;
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
      await setDoc(doc(db, 'users', userId), userData);
      alert('Registered successfully!');
      navigate('/owner-home'); // Redirect to dummy owner home
    } catch (err) {
      setError('Registration failed: ' + err.message);
      console.error('Error during registration:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 tracking-wide text-center">Sign Up as Vehicle Owner</h2>
      {error && (
        <p className="text-red-600 text-sm mb-6 p-2 bg-red-50 rounded-md border border-red-200 text-center">
          {error}
        </p>
      )}
      <form onSubmit={handleRegister} className="flex flex-col gap-5 w-full">
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required disabled={loading} className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out" />
        <div className="relative">
          <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} required disabled={loading} className={`p-4 border ${emailError ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out w-full`} />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        <div className="relative">
          <input type={showPassword ? 'text' : 'password'} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={loading} className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out w-full pr-12" />
          <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute inset-y-0 right-0 flex items-center pr-3" disabled={loading}>
            {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
          </button>
        </div>
        <input type="text" placeholder="Car Make (e.g., Toyota)" value={carMake} onChange={(e) => setCarMake(e.target.value)} required disabled={loading} className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out" />
        <input type="text" placeholder="Car Model (e.g., Corolla)" value={carModel} onChange={(e) => setCarModel(e.target.value)} required disabled={loading} className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out" />
        <input type="text" placeholder="Number Plate (e.g., ABC-1234)" value={numberPlate} onChange={(e) => setNumberPlate(e.target.value)} required disabled={loading} className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out" />
        <input type="text" placeholder="VIN Number (e.g., 1HGCM82633A004352)" value={vinNumber} onChange={(e) => setVinNumber(e.target.value)} required disabled={loading} className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out" />
        <button type="submit" className={`p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-blue-800'}`} disabled={loading}>
          {loading ? <svg className="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : 'Sign Up'}
        </button>
      </form>
      <button onClick={() => navigate('/signup')} className="mt-6 text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-4 transition-colors duration-200 w-full text-center" disabled={loading}>
        Back to Category Selection
      </button>
    </div>
  );
}

export default OwnerSignUp;