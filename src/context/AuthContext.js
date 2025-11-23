// src/context/AuthContext.js

import React, { createContext, useContext, useEffect, useState } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

import { auth } from "../firebase/firebaseConfig"; // ← CORRIGIDO: caminho certo!

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [error, setError] = useState(null);

  // Configura persistência (usuário continua logado mesmo fechando o app)
  useEffect(() => {
    setPersistence(auth, browserLocalPersistence)
      .then(() => {
        console.log("Persistência de login ativada");
      })
      .catch((err) => {
        console.warn("Erro ao ativar persistência:", err);
      });
  }, []);

  // Observa estado de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoadingAuth(false);
      setError(null);
    });

    return () => unsubscribe();
  }, []);

  // === FUNÇÕES DE AUTH ===
  const login = async (email, password) => {
    try {
      setError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (err) {
      const message = handleAuthError(err);
      setError(message);
      throw err;
    }
  };

  const register = async (email, password, coupleName) => {
    try {
      setError(null);
      const result = await createUserWithEmailAndPassword(auth, email, password);
      // Aqui você pode salvar o coupleName no Firestore depois
      return result;
    } catch (err) {
      const message = handleAuthError(err);
      setError(message);
      throw err;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  // === TRATAMENTO DE ERROS BONITINHO ===
  const handleAuthError = (err) => {
    switch (err.code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
        return "Email ou senha incorretos.";
      case "auth/email-already-in-use":
        return "Este email já está sendo usado.";
      case "auth/weak-password":
        return "A senha deve ter pelo menos 6 caracteres.";
      case "auth/invalid-email":
        return "Email inválido.";
      case "auth/too-many-requests":
        return "Muitas tentativas. Tente novamente mais tarde.";
      default:
        return "Erro ao conectar. Tente novamente.";
    }
  };

  const value = {
    user,
    loadingAuth,
    error,
    login,
    register,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }
  return context;
};