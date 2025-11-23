// src/context/AgreementsContext.js

import React, { createContext, useContext, useEffect } from "react";
import useAgreements from "../hooks/useAgreements";
import useSync from "../hooks/useSync";
import { useAuth } from "./AuthContext"; // ← Import correto do contexto de autenticação

// Criação do contexto
export const AgreementsContext = createContext();

// Provider principal dos acordos
export const AgreementsProvider = ({ children }) => {
  const { user } = useAuth(); // Pega o usuário logado

  // Hooks personalizados
  const {
    agreements,
    loading,
    error,
    createAgreement,
    updateAgreement,
    deleteAgreement,
    loadAgreementsFromFirestore,
    loadAgreementsFromCache,
  } = useAgreements();

  const { syncPendingActions, isSyncing } = useSync();

  // Efeito: carregar e sincronizar dados quando o usuário logar
  useEffect(() => {
    if (!user?.uid) return;

    // 1. Carrega do cache (rápido)
    loadAgreementsFromCache(user.uid);

    // 2. Carrega do Firestore (atualiza com dados reais)
    loadAgreementsFromFirestore(user.uid);

    // 3. Sincroniza ações pendentes (offline → online)
    syncPendingActions(user.uid);
  }, [user?.uid]); // Dependência segura (só executa quando muda o UID)

  return (
    <AgreementsContext.Provider
      value={{
        agreements,
        loading,
        error,
        createAgreement,
        updateAgreement,
        deleteAgreement,
        isSyncing,
      }}
    >
      {children}
    </AgreementsContext.Provider>
  );
};

// Hook para usar o contexto em qualquer componente
export const useAgreementsContext = () => {
  const context = useContext(AgreementsContext);
  if (!context) {
    throw new Error("useAgreementsContext must be used within AgreementsProvider");
  }
  return context;
};