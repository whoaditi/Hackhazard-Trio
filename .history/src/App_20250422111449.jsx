// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/signUpp';
import Dashboard from './pages/Dashboard';
import './styles/app.css'; // Import the styles

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* Route for the Login page */}
          <Route path="/" element={<Login />} />
          
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
