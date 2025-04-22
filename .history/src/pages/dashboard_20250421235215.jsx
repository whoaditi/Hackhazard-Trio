import { useEffect, useState } from 'react';
import { auth, db } from '../services/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import Header from '../components/Header';
import HabitCard from '../components/HabitCard';
import '../styles/app.css';

function Dashboard() {
  const [habits, setHabits] = useState([]);
  const [habitInput, setHabitInput] = useState('');
  const navigate = useNavigate();
  const user = auth.currentUser;

  // Get all habits for this user
  const fetchHabits = async () => {
    const q = query(collection(db, 'habits'), where('uid', '==', user.uid));
    const snapshot = await getDocs(q);
    const habitsList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setHabits(habitsList);
  };

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else {
      fetchHabits();
    }
  }, [user]);

  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (!habitInput.trim()) return;

    await addDoc(collection(db, 'habits'), {
      name: habitInput,
      uid: user.uid,
      streak: 0,
    });

    setHabitInput('');
    fetchHabits();
  };

  const handleMarkAsDone = async (habitId, currentStreak) => {
    const habitRef = doc(db, 'habits', habitId);
    await updateDoc(habitRef, {
      streak: currentStreak + 1,
    });
    fetchHabits(); // Refresh the list
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div className="container">
      <Header title={`Welcome, ${user?.email}`} />

      <form onSubmit={handleAddHabit}>
        <input
          type="text"
          value={habitInput}
          onChange={(e) => setHabitInput(e.target.value)}
          placeholder="Enter a new habit"
        />
        <button type="submit">Add Habit</button>
      </form>

      <div style={{ marginTop: '2rem' }}>
        <h3>Your Habits</h3>
        {habits.length === 0 ? (
          <p>No habits yet.</p>
        ) : (
          habits.map((habit) => (
            <HabitCard key={habit.id} habit={habit} onMarkAsDone={handleMarkAsDone} />
          ))
        )}
      </div>

      <button className="logout" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

export default Dashboard;


