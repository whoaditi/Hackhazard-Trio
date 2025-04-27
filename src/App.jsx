// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/signUp';
import Dashboard from './pages/Dashboard';
import Landing from './pages/Landing'; // <-- ADD THIS
import './styles/app.css'; // Import the styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Route for the Landing page */}
          <Route path="/" element={<Landing />} />
          
          {/* Route for the Login page */}
          <Route path="/login" element={<Login />} />
          
          {/* Route for the Signup page */}
          <Route path="/signup" element={<Signup />} />
          
          {/* Route for the Dashboard page */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
