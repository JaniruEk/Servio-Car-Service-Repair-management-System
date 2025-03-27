// src/components/Login.jsx
import { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

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
      setError('Please enter both email and password');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setEmail('');
      setPassword('');
      navigate(data.redirect);
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
      const response = await fetch(`http://localhost:5000/api/user/${user.uid}`);
      const data = await response.json();
      if (!response.ok) {
        await signOut(auth);
        throw new Error(data.error);
      }
      navigate(
        data.category === 'owner' ? '/owner-home' :
        data.category === 'technician' ? '/technician-home' :
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
    <div className="flex flex-col items-center w-full animate-fade-in py-6">
      <h2 className="text-4xl font-bold text-gray-800 mb-8 font-[Poppins] tracking-wide text-center animate-slide-up bg-clip-text text-transparent bg-gradient-to-r from-orange-600 to-orange-800">
        Login to Servio
      </h2>

      {error && (
        <p className="text-red-600 text-sm mb-6 p-3 bg-red-50 rounded-md border border-red-200 text-center font-[Open Sans] animate-slide-up animate-delay-100">
          {error}
        </p>
      )}

      <div className="bg-white p-8 rounded-lg shadow-xl w-full animate-slide-up animate-delay-200 border border-gray-100">
        <form onSubmit={handleLogin} className="flex flex-col gap-6 w-full">
          {/* Email Input with Icon */}
          <div className="relative">
            <EnvelopeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              name="email"
              autoComplete="email"
              placeholder="Email"
              value={email}
              onChange={handleEmailChange}
              className={`pl-10 p-3 border ${emailError ? 'border-red-500' : 'border-gray-300'} rounded-md text-base font-[Open Sans] focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all duration-300 w-full hover:border-orange-400`}
              disabled={loading}
              autoFocus
            />
            {emailError && <p className="text-red-500 text-xs mt-1 font-[Open Sans]">{emailError}</p>}
          </div>

          {/* Password Input with Icon */}
          <div className="relative">
            <LockClosedIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="current-password"
              autoComplete="current-password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 p-3 border border-gray-300 rounded-md text-base font-[Open Sans] focus:outline-none focus:ring-2 focus:ring-orange-600 transition-all duration-300 w-full hover:border-orange-400 pr-12"
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

          {/* Login Button */}
          <button
            type="submit"
            className={`p-3 bg-gradient-to-r from-orange-600 to-orange-800 text-white rounded-full font-medium text-lg font-[Raleway] transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-xl hover:from-orange-700 hover:to-orange-900 animate-pulse-slow'}`}
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
          <button
            onClick={handleForgotPassword}
            className="text-orange-600 hover:text-orange-800 text-sm font-medium font-[Open Sans] underline underline-offset-4 transition-colors duration-300"
            disabled={loading}
          >
            Forgot Password?
          </button>
          <button
            onClick={() => navigate('/signup')}
            className="text-orange-600 hover:text-orange-800 text-sm font-medium font-[Open Sans] underline underline-offset-4 transition-colors duration-300"
            disabled={loading}
          >
            Need an account? Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500 font-[Open Sans]">OR</span>
          </div>
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          className={`p-3 bg-white border border-gray-300 text-gray-700 rounded-full font-medium text-lg font-[Raleway] flex items-center justify-center gap-2 transition-all duration-300 w-full ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 hover:shadow-xl hover:bg-gray-50'}`}
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

        {/* Links */}
        <div className="mt-6 flex flex-col items-center gap-3 w-full">
          
          <button
            onClick={() => navigate('/')}
            className="text-orange-600 hover:text-orange-800 text-sm font-medium font-[Open Sans] underline underline-offset-4 transition-colors duration-300 animate-slide-up animate-delay-300"
            disabled={loading}
          >
            Back to Guest Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;