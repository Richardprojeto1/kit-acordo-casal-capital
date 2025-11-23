// src/services/dataService.js
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  serverTimestamp,
} from "firebase/firestore";

import { db } from "./firebaseConfig";

// Caminho base: /users/{userId}/agreements
const getUserAgreementsCollection = (userId) =>
  collection(db, `users/${userId}/agreements`);

/* -------------------------------
   Criar um novo acordo
--------------------------------*/
export async function createAgreement(userId, agreement) {
  try {
    const colRef = getUserAgreementsCollection(userId);
    const docRef = doc(colRef); // cria ID automático
    await setDoc(docRef, {
      ...agreement,
      id: docRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });

    return docRef.id;
  } catch (err) {
    console.error("Erro ao criar acordo:", err);
    throw err;
  }
}

/* -------------------------------
   Atualizar acordo
--------------------------------*/
export async function updateAgreement(userId, agreementId, newData) {
  try {
    const docRef = doc(db, `users/${userId}/agreements/${agreementId}`);

    await updateDoc(docRef, {
      ...newData,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    console.error("Erro ao atualizar acordo:", err);
    throw err;
  }
}

/* -------------------------------
   Deletar acordo
--------------------------------*/
export async function deleteAgreement(userId, agreementId) {
  try {
    const docRef = doc(db, `users/${userId}/agreements/${agreementId}`);
    await deleteDoc(docRef);
  } catch (err) {
    console.error("Erro ao deletar acordo:", err);
    throw err;
  }
}

/* -------------------------------
   Ouvir acordos em tempo real + offline
--------------------------------*/
export function listenUserAgreements(userId, callback) {
  try {
    const colRef = getUserAgreementsCollection(userId);

    const unsubscribe = onSnapshot(
      colRef,
      (snapshot) => {
        const list = [];
        snapshot.forEach((d) => list.push(d.data()));
        callback(list);
      },
      (err) => console.error("Erro no listener:", err)
    );

    return unsubscribe;
  } catch (err) {
    console.error("Erro ao ouvir acordos:", err);
    return () => {};
  }
}

/* -------------------------------
   Ler todos os dados uma vez
--------------------------------*/
export async function getAllAgreements(userId) {
  try {
    const colRef = getUserAgreementsCollection(userId);
    const snapshot = await getDocs(colRef);

    const list = [];
    snapshot.forEach((doc) => list.push(doc.data()));

    return list;
  } catch (err) {
    console.error("Erro ao obter acordos:", err);
    throw err;
  }
}
