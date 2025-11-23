// src/services/syncService.js

import { db } from "../firebase/firebaseConfig";
import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export const applyActionOnline = async (userId, action) => {
  try {
    const agreementsRef = collection(db, "users", userId, "agreements");

    switch (action.type) {
      case "CREATE_AGREEMENT":
        await addDoc(agreementsRef, action.payload);
        break;
      case "UPDATE_AGREEMENT":
        await updateDoc(doc(agreementsRef, action.payload.id), action.payload.data);
        break;
      case "DELETE_AGREEMENT":
        await deleteDoc(doc(agreementsRef, action.payload.id));
        break;
      default:
        console.log("Ação desconhecida:", action.type);
    }
  } catch (error) {
    console.error("Erro ao aplicar ação online:", error);
    throw error;
  }
};