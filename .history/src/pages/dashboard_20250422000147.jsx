import { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, getDocs, query, where, addDoc } from 'firebase/firestore';
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
      const habitsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHabits(habitsList);
    };

    fetchHabits();
  }, [user]);

  // Add habit to Firestore
  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (!habitInput) return;

    await addDoc(collection(db, 'habits'), {
      name: habitInput,
      streak: 0,
      uid: user.uid,
    });
    setHabitInput('');
  };

  return (
    <div>
      <Header title="Your Dashboard" />
      <form onSubmit={handleAddHabit}>
        <input
          type="text"
          value={habitInput}
          onChange={(e) => setHabitInput(e.target.value)}
          placeholder="Add a new habit"
        />
        <button type="submit">Add Habit</button>
      </form>

      <div>
        {habits.map(habit => (
          <HabitCard key={habit.id} habit={habit} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;



