// src/services/authService.js

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import "../services/firebaseConfig"; // garante que o Firebase está inicializado

const auth = getAuth();

// Criar usuário
export const registerUser = async (email, password) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

// Login
export const loginUser = async (email, password) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

// Logout
export const logoutUser = async () => {
  return await signOut(auth);
};

// Listener do estado de autenticação
export const listenAuth = (callback) => {
  return onAuthStateChanged(auth, callback);
};
