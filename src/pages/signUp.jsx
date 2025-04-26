import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp,googleProvider,signupwithGoogle } from '../services/authService';
import FormInput from '../components/FormInput';
import '../styles/app.css';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signUp(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
        <FormInput type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <FormInput type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Create Account</button>
      </form>
      <h3>OR</h3>
      <button className= "google-button" onClick={signupwithGoogle}>signup With Google</button>
      <p>Already have an account? <a href="/">Login</a></p>
    </div>
  );
}

export default Signup;


