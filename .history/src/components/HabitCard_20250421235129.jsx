// src/components/HabitCard.jsx
import React from 'react';

const HabitCard = ({ habit, onMarkAsDone }) => {
  return (
    <div className="card">
      <h4>{habit.name}</h4>
      <p>Streak: {habit.streak}</p>
      <button onClick={() => onMarkAsDone(habit.id, habit.streak)}>Mark as Done</button>
    </div>
  );
};

export default HabitCard;
