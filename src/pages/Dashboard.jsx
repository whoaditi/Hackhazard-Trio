import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, query, where, addDoc,doc, updateDoc , deleteDoc} from 'firebase/firestore';
import HabitCard from '../components/HabitCard';
import Header from '../components/Header';

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [habitInput, setHabitInput] = useState('');
  const [user] = useState({ uid: 'current-user-id' });

  
  useEffect(() => {
    const fetchHabits = async () => {
      const q = query(collection(db, 'habits'), where('uid', '==', user.uid));
      const querySnapshot = await getDocs(q);
      const today = new Date().toISOString().split('T')[0]; // 🆕 today's date
  
      const habitsList = querySnapshot.docs.map(doc => {
        const data = doc.data();
        const today = new Date().toISOString().split('T')[0];
      
        return {
          id: doc.id,
          ...data,
          lastCompletedDate: data.lastCompletedDate ?? "", // add this
          completedToday: (data.lastCompletedDate ?? "") === today, // fix for old docs
        };
      });
      
      setHabits(habitsList);
    };
  
    fetchHabits();
  }, [user]);
  
  
  
  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (!habitInput) return;
  
    const newHabitRef = await addDoc(collection(db, 'habits'), {
      name: habitInput,
      streak: 0,
      uid: user.uid,
      completedToday: false,
    });
  
    // Update local habits
    const newHabit = {
      id: newHabitRef.id,
      name: habitInput,
      streak: 0,
      uid: user.uid,
      completedToday: false,
    };
  
    setHabits(prev => [...prev, newHabit]);  // Add new habit at end
    setHabitInput('');  // Clear the input
  };
  
   // add this to your imports

   const onMarkAsDone = async (habitId, currentStreak) => {
    try {
      const habit = habits.find(h => h.id === habitId);
      if (!habit) return;
  
      const today = new Date().toISOString().split('T')[0];
  
      if (habit.completedToday) {
        alert("You've already marked this habit as done today! ✅");
        return;
      }
      setHabits(prev =>
        prev.map(h =>
          h.id === habitId
            ? { ...h, completedToday: true }  // disable immediately
            : h
        )
      );
      const habitRef = doc(db, 'habits', habitId);
      await updateDoc(habitRef, {
        streak: currentStreak + 1,
        lastCompletedDate: today,
      });
  
      setHabits(prev =>
        prev.map(h =>
          h.id === habitId
            ? { ...h, streak: h.streak + 1}
            : h
        )
      );
    } catch (error) {
      console.error('Error updating streak:', error);
    }
  };
  
  const onDelete = async (id) => {
    console.log('Trying to delete habit with id:', id); // Add this
    try {
      await deleteDoc(doc(db, 'habits', id));
      setHabits(prev => prev.filter(habit => habit.id !== id));
    } catch (error) {
      console.error('Error deleting habit:', error);
    }
  };
  
  return (
    <div>
      <Header title="Welcome to Your Ultimate Habit Builder Destination" />
      
      <p className="quote">“Small steps every day lead to big results.”</p>
  
      <form onSubmit={handleAddHabit}>
        <div className="add-habit-container">
          <div class="box">
          <input
            type="text"
            value={habitInput}
            onChange={(e) => setHabitInput(e.target.value)}
            placeholder="Add a new habit"
          /></div>
          <button type="submit" className="add-habit-button">Add Habit</button>
        </div>
      </form>
  
      <div className="habit-cards-container">
      {habits.map(habit => (
  <div className="card" key={habit.id}>
    <h4>{habit.name}</h4>
    <div className="card-footer">
      <span className="streak">Streak: {habit.streak}</span>
      <div>
        <button 
          className="done" 
          onClick={() => onMarkAsDone(habit.id, habit.streak)}
          disabled={habit.completedToday}
        >
          {habit.completedToday ? "Done ✅" : "Complete"}
        </button>
        <button className="delete" onClick={() => onDelete(habit.id)}>Delete</button>
      </div>
    </div>
  </div>
))}

      </div>
    </div>
  );
  }
  
  export default Dashboard;
  



