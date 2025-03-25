import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logged in successfully!');
      setEmail('');
      setPassword('');
      navigate('/'); // Redirect to home
    } catch (err) {
      setError('Login failed: ' + err.message);
      console.error(err);
    }
  };
  return (
    <div className="flex flex-col items-center w-full">
      <h2 className="text-2xl font-semibold text-blue-700 mb-6 tracking-wide text-center">Login to Servio</h2>
      {error && (
        <p className="text-red-600 text-sm mb-6 p-2 bg-red-50 rounded-md border border-red-200 text-center">
          {error}
        </p>
      )}
      <form onSubmit={handleLogin} className="flex flex-col gap-5 w-full">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="p-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 text-gray-800 bg-gray-50 placeholder-gray-400 transition-all duration-300 ease-in-out"
        />
        <button
          type="submit"
          className="p-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 active:from-blue-800 active:to-blue-900 transition-all duration-200 ease-in-out shadow-md hover:shadow-lg transform hover:-translate-y-1"
        >
          Login
        </button>
      </form>
      <button
        onClick={() => navigate('/signup')}
        className="mt-6 text-blue-600 hover:text-blue-600 text-sm font-medium underline underline-offset-4 transition-colors duration-200 w-full text-center"
      >
        Need an account? Sign Up
      </button>
    </div>
  );
}

export default Login;