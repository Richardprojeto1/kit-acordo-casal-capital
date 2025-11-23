// src/storage/pendingQueue.js

import AsyncStorage from "@react-native-async-storage/async-storage";

const PENDING_QUEUE_KEY = "@pending_actions_queue";

/**
 * Salva uma ação pendente (para sincronizar quando voltar online)
 */
export const savePendingAction = async (action) => {
  try {
    const existing = await getPendingActions();
    const updated = [...existing, { ...action, timestamp: Date.now() }];
    await AsyncStorage.setItem(PENDING_QUEUE_KEY, JSON.stringify(updated));
  } catch (error) {
    console.error("Erro ao salvar ação pendente:", error);
  }
};

/**
 * Pega todas as ações pendentes
 */
export const getPendingActions = async () => {
  try {
    const data = await AsyncStorage.getItem(PENDING_QUEUE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Erro ao ler ações pendentes:", error);
    return [];
  }
};

/**
 * Limpa a fila após sincronizar
 */
export const clearPendingActions = async () => {
  try {
    await AsyncStorage.removeItem(PENDING_QUEUE_KEY);
  } catch (error) {
    console.error("Erro ao limpar fila:", error);
  }
};