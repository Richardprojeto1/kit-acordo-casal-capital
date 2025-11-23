import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth } from "../services/firebaseConfig";

export function useAuth() {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    let unsubscribe;

    const loadStoredUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("@user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.log("Erro ao carregar usuário do armazenamento offline:", err);
      }
    };

    const listenFirebaseAuth = () => {
      unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
        if (firebaseUser) {
          const formattedUser = {
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          };

          setUser(formattedUser);

          // Armazena no modo offline
          await AsyncStorage.setItem("@user", JSON.stringify(formattedUser));
        } else {
          setUser(null);
          await AsyncStorage.removeItem("@user");
        }

        setAuthLoading(false);
      });
    };

    loadStoredUser().then(() => {
      listenFirebaseAuth();
    });

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  return { user, authLoading };
}
