// src/hooks/useAgreements.js

import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import {
  savePendingAction,
  getPendingActions,
  clearPendingActions,
} from "../storage/pendingQueue"; // ← CORRETO: storage!
import { storage } from "../storage/localStorage";

const AGREEMENTS_CACHE_KEY = "@agreements_cache";

export default function useAgreements() {
  const [agreements, setAgreements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // === CARREGA DO CACHE LOCAL (instantâneo) ===
  const loadAgreementsFromCache = async (userId) => {
    if (!userId) return;
    try {
      const cached = await storage.getItem(`${AGREEMENTS_CACHE_KEY}_${userId}`);
      if (cached) {
        setAgreements(cached);
      }
    } catch (err) {
      console.error("Erro ao carregar cache:", err);
    }
  };

  // === CARREGA DO FIRESTORE (online) ===
  const loadAgreementsFromFirestore = async (userId) => {
    if (!userId) return;

    const agreementsRef = collection(db, "users", userId, "agreements");
    const q = query(agreementsRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAgreements(list);
        setLoading(false);
        // Salva no cache local
        storage.setItem(`${AGREEMENTS_CACHE_KEY}_${userId}`, list);
      },
      (err) => {
        console.error("Erro no Firestore:", err);
        setError("Erro ao carregar acordos.");
        setLoading(false);
      }
    );

    return unsubscribe;
  };

  // === CRIAR ACORDO (offline-first) ===
  const createAgreement = async (userId, agreementData) => {
    const newAgreement = {
      ...agreementData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      offline: true,
    };

    // Salva localmente primeiro
    const updatedList = [newAgreement, ...agreements];
    setAgreements(updatedList);
    await storage.setItem(`${AGREEMENTS_CACHE_KEY}_${userId}`, updatedList);

    // Enfileira para sincronizar depois
    await savePendingAction({
      type: "CREATE_AGREEMENT",
      payload: newAgreement,
    });
  };

  // === ATUALIZAR ACORDO ===
  const updateAgreement = async (userId, agreementId, updates) => {
    const updatedList = agreements.map((a) =>
      a.id === agreementId
        ? { ...a, ...updates, updatedAt: new Date().toISOString() }
        : a
    );
    setAgreements(updatedList);
    await storage.setItem(`${AGREEMENTS_CACHE_KEY}_${userId}`, updatedList);

    await savePendingAction({
      type: "UPDATE_AGREEMENT",
      payload: { id: agreementId, data: updates },
    });
  };

  // === DELETAR ACORDO ===
  const deleteAgreement = async (userId, agreementId) => {
    const updatedList = agreements.filter((a) => a.id !== agreementId);
    setAgreements(updatedList);
    await storage.setItem(`${AGREEMENTS_CACHE_KEY}_${userId}`, updatedList);

    await savePendingAction({
      type: "DELETE_AGREEMENT",
      payload: { id: agreementId },
    });
  };

  return {
    agreements,
    loading,
    error,
    createAgreement,
    updateAgreement,
    deleteAgreement,
    loadAgreementsFromCache,
    loadAgreementsFromFirestore,
  };
}