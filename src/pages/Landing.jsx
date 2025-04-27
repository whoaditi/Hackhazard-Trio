// src/pages/Landing.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/app.css";

function Landing() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="landing-container">
      <div className="overlay">
        <h1 className="landing-title">Welcome to Habit Builder!</h1>
        <p className="landing-quote">"The journey of a thousand miles begins with one step." — Lao Tzu</p>
        <button className="get-started-button" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Landing;

