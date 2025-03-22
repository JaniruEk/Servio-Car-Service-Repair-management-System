import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

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
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Registered successfully! Please sign in.');
      navigate('/login');
    } catch (err) {
      setError('Registration failed: ' + err.message);
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Sign Up as Vehicle Owner</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Car Make (e.g., Toyota)"
          value={carMake}
          onChange={(e) => setCarMake(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Car Model (e.g., Corolla)"
          value={carModel}
          onChange={(e) => setCarModel(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Number Plate (e.g., ABC-1234)"
          value={numberPlate}
          onChange={(e) => setNumberPlate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="VIN Number (e.g., 1HGCM82633A004352)"
          value={vinNumber}
          onChange={(e) => setVinNumber(e.target.value)}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <button className="link-button" onClick={() => navigate('/signup')}>
        Back to Category Selection
      </button>
    </div>
  );
}

export default OwnerSignUp;