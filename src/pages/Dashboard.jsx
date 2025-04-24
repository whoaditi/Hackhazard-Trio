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
      const habitsList = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          completedToday: data.completedToday ?? false, // ensure default value
        };
      });
      setHabits(habitsList);
    };

    fetchHabits();
  }, [user]);
  
  
  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (!habitInput) return;

    await addDoc(collection(db, 'habits'), {
      name: habitInput,
      streak: 0,
      uid: user.uid,
      completedToday: false,
    });
   
    setHabitInput('');
  };
   // add this to your imports

   const onMarkAsDone = async (habitId, currentStreak) => {
    try {
      // Get the habit from local state
      const habit = habits.find(h => h.id === habitId);
      if (!habit) return;
  
      // Prevent multiple streaks in one day
      if (habit.completedToday) {
        alert("You've already marked this habit as done today! ✅");
        return;
      }
  
      // Firestore update
      const habitRef = doc(db, 'habits', habitId);
      await updateDoc(habitRef, {
        streak: currentStreak + 1,
        completedToday: true,
      });
  
      // Local state update
      setHabits(prev =>
        prev.map(h =>
          h.id === habitId
            ? { ...h, streak: h.streak + 1, completedToday: true }
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
      <p class="quote">“Small steps every day lead to big results.”</p><br></br><br></br>
      <form onSubmit={handleAddHabit}>
        <div class="add-habit-container">
        <input
          type="text"
          value={habitInput}
          onChange={(e) => setHabitInput(e.target.value)}
          placeholder="Add a new habit"
        />
        <button type="submit">Add Habit</button></div>
      </form>

      <div>
        {habits.map(habit => (
          <HabitCard
            key={habit.id}
            habit={habit}
            onMarkAsDone={onMarkAsDone}
            onDelete={onDelete}
          />))}
      </div>
    </div>
  );
}

export default Dashboard;



