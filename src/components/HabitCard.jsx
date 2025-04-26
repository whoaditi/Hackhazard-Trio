import React from 'react';

const HabitCard = ({ habit, onMarkAsDone }) => {
  return (
    <div className="card">
      <h4>{habit.name}</h4>
      <p>Streak: {habit.streak}</p>
      <div className="card-buttons">
        <button 
        disabled={habit.completedToday}
        onClick={() => onMarkAsDone(habit.id, habit.streak) } >
        {habit.completedToday ? 'Done for Today' : 'Mark as Done'}
        </button>
        <button onClick={() => onDelete(habit.id)} style={{margin:'5px'}}>
          Delete
          </button>
      </div>
    </div>
  );
};
export default HabitCard;