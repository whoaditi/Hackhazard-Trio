// src/services/authService.js
// import { auth } from './firebase';
// import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';

// Sign up function
export const signUp = async (email, password) => {
//   try {
//     await createUserWithEmailAndPassword(auth, email, password);
//     console.log('User signed up successfully');
//   } catch (error) {
//     console.error('Error during sign up:', error.message);
//     throw new Error(error.message);
//   }
// };

// Login function
export const logIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    console.log('User logged in successfully');
  } catch (error) {
    console.error('Error during login:', error.message);
    throw new Error(error.message);
  }
};

// Logout function
export const logOut = async () => {
  try {
    await signOut(auth);
    console.log('User logged out successfully');
  } catch (error) {
    console.error('Error during logout:', error.message);
    throw new Error(error.message);
  }
};
