import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { logIn } from '../services/authService';
import FormInput from '../components/FormInput';
import '../styles/app.css';

// function Login() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await logIn(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Error: ' + err.message);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <FormInput type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <FormInput type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  );
}

export default Login;
