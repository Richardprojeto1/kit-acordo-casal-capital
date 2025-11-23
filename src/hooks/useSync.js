// src/hooks/useSync.js

import { useState, useEffect } from "react";
import { getPendingActions, savePendingAction, clearPendingActions } from "../storage/pendingQueue";
import { applyActionOnline } from "../services/syncService";
import NetInfo from "@react-native-community/netinfo";

export default function useSync() {
  const [isSyncing, setIsSyncing] = useState(false);

  const syncPendingActions = async (userId) => {
    if (!userId) return;

    const pending = await getPendingActions();
    if (pending.length === 0) return;

    setIsSyncing(true);

    const netInfo = await NetInfo.fetch();
    if (!netInfo.isConnected) {
      setIsSyncing(false);
      return;
    }

    try {
      for (const action of pending) {
        await applyActionOnline(userId, action);
      }
      await clearPendingActions();
    } catch (error) {
      console.error("Erro na sincronização:", error);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        // Tenta sincronizar quando volta online
        // (você pode disparar aqui ou deixar pro contexto)
      }
    });

    return () => unsubscribe();
  }, []);

  return { syncPendingActions, isSyncing };
}