// src/firebase/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração oficial do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCjR7hHilzlvCMmMM8awzTbIoEwF0j7OCY",
  authDomain: "kit-acordo-de-casal-e-capital.firebaseapp.com",
  projectId: "kit-acordo-de-casal-e-capital",
  storageBucket: "kit-acordo-de-casal-e-capital.firebasestorage.app",
  messagingSenderId: "249989183663",
  appId: "1:249989183663:web:f8b4167316fe935df37c5a",
};

// Inicializa o Firebase (só uma vez!)
const app = initializeApp(firebaseConfig);

// Configura persistência de login (usuário continua logado após fechar o app)
const auth = getAuth(app);
setPersistence(auth, browserLocalPersistence).catch((err) => {
  console.warn("Erro ao configurar persistência do auth:", err);
});

// Exporta os serviços que você usa em todo o app
export { auth, app };
export const db = getFirestore(app);

export default app;