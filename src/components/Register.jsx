// import { useState } from 'react';
// import { createUserWithEmailAndPassword } from 'firebase/auth';
// import { auth } from '../firebase';
// import { useNavigate, useParams } from 'react-router-dom';

// function Register() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const { category } = useParams(); // Get category from URL

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert('Registered successfully! Please sign in.');
//       navigate('/login'); // Redirect to login after sign-up
//     } catch (err) {
//       setError('Registration failed: ' + err.message);
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <h2>Sign Up as {category.charAt(0).toUpperCase() + category.slice(1)}</h2>
//       {error && <p className="error">{error}</p>}
//       <form onSubmit={handleRegister}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//       <button className="link-button" onClick={() => navigate('/signup')}>
//         Back to Category Selection
//       </button>
//     </div>
//   );
// }

// export default Register;