import { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (emailError || !email || !password) {
      setError('Please fix the form errors');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (userDoc.exists()) {
        const category = userDoc.data().category;
        setEmail('');
        setPassword('');
        navigate(
          category === 'owner' ? '/owner-home' :
          category === 'technician' ? '/technician-home' :
          '/service-center-home'
        );
      } else {
        setError('User data not found in Firestore.');
        await signOut(auth); // Sign out if no Firestore data
      }
    } catch (err) {
      setError('Login failed: ' + err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        await signOut(auth);
        setError('No account found. Please sign up first.');
        console.log('User not found in Firestore, signed out');
        return;
      }
      const category = userDoc.data().category;
      navigate(
        category === 'owner' ? '/owner-home' :
        category === 'technician' ? '/technician-home' :
        '/service-center-home'
      );
    } catch (err) {
      setError('Google login failed: ' + err.message);
      console.error('Google login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email first');
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Password reset email sent! Check your inbox.');
    } catch (err) {
      setError('Failed to send reset email: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 tracking-wide text-center">Login to Servio</h2>
      {error && (
        <p className="text-red-600 text-sm mb-6 p-2 bg-red-50 rounded-md border border-red-200 text-center">{error}</p>
      )}
      <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full">
        <div className="relative">
          <input
            type="email"
            name="email"
            autoComplete="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className={`p-4 border ${emailError ? 'border-red-500' : 'border-gray-200'} rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out w-full`}
            disabled={loading}
            autoFocus
          />
          {emailError && <p className="text-red-500 text-xs mt-1">{emailError}</p>}
        </div>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            name="current-password"
            autoComplete="current-password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out w-full pr-12"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 flex items-center pr-3"
            disabled={loading}
          >
            {showPassword ? <EyeSlashIcon className="h-5 w-5 text-gray-500" /> : <EyeIcon className="h-5 w-5 text-gray-500" />}
          </button>
        </div>
        <button
          type="submit"
          className={`p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:from-blue-700 hover:to-blue-800'}`}
          disabled={loading}
        >
          {loading ? (
            <svg className="animate-spin h-5 w-5 mx-auto text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          ) : (
            'Login'
          )}
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className={`mt-4 p-4 bg-white border border-gray-300 text-gray-700 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 transition-all duration-200 ease-in-out w-full ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={loading}
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-1.02.68-2.31 1.08-3.71 1.08-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C4.01 20.36 7.77 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.77 1 4.01 3.64 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        Login with Google
      </button>
      <div className="mt-4 flex flex-col items-center gap-2 w-full">
        <button
          onClick={handleForgotPassword}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-4 transition-colors duration-200"
          disabled={loading}
        >
          Forgot Password?
        </button>
        <button
          onClick={() => navigate('/signup')}
          className="text-blue-600 hover:text-blue-800 text-sm font-medium underline underline-offset-4 transition-colors duration-200"
          disabled={loading}
        >
          Need an account? Sign Up
        </button>
      </div>
    </div>
  );
}

export default Login;