// src/storage/localStorage.js

import AsyncStorage from "@react-native-async-storage/async-storage";

export const storage = {
  async setItem(key, value) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error("Erro ao salvar:", key, e);
    }
  },

  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key);
      return value != null ? JSON.parse(value) : null;
    } catch (e) {
      console.error("Erro ao ler:", key, e);
      return null;
    }
  },

  async removeItem(key) {
    try {
      await AsyncStorage.removeItem(key);
    } catch (e) {
      console.error("Erro ao remover:", key, e);
    }
  },
};