// app/(tabs)/configuracoes.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import * as Clipboard from "expo-clipboard";
import { useAuth } from "@/src/context/AuthContext";
import { useRouter } from "expo-router";

export default function ConfiguracoesScreen() {
  const { user, signOutUser } = useAuth();
  const router = useRouter();

  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const coupleName = "Ricardo & Bianca";
  const coupleId = "CASAL_123_AB";

  const handleLogout = () => {
    Alert.alert("Sair da Conta", "Tem certeza que deseja sair?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Sair",
        style: "destructive",
        onPress: async () => {
          await signOutUser();
          router.replace("/login");
        },
      },
    ]);
  };

  const handleCopyCoupleId = async () => {
    await Clipboard.setStringAsync(coupleId);
    Alert.alert("Copiado!", `ID do casal ${coupleId} copiado para a área de transferência.`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Cabeçalho do Perfil */}
      <TouchableOpacity style={styles.profileHeader} onPress={() => router.push("/profile")}>
        <View style={styles.avatarContainer}>
          <Text style={styles.avatarText}>
            {user?.displayName?.charAt(0) || user?.email?.charAt(0) || "R"}
          </Text>
        </View>
        <Text style={styles.userName}>{user?.displayName || "Ricardo"}</Text>
        <Text style={styles.userEmail}>{user?.email || "richard@exemplo.com"}</Text>
        <View style={styles.premiumBadge}>
          <Text style={styles.premiumText}>Membro Premium</Text>
        </View>
      </TouchableOpacity>

      {/* Meu Casal */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meu Casal</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Nome do Casal</Text>
            <Text style={styles.value}>{coupleName}</Text>
          </View>
          <View style={[styles.row, styles.separator]}>
            <Text style={styles.label}>ID de Vínculo</Text>
            <TouchableOpacity onPress={handleCopyCoupleId}>
              <Text style={styles.valueCopy}>{coupleId} Copy</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.helperText}>
            Compartilhe este ID com seu parceiro(a) para sincronizar.
          </Text>
        </View>
      </View>

      {/* Preferências */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferências</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Notificações</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#4F46E5" }}
              thumbColor={notificationsEnabled ? "#FFFFFF" : "#f4f3f4"}
              onValueChange={setNotificationsEnabled}
              value={notificationsEnabled}
            />
          </View>
          <View style={[styles.row, styles.separator]}>
            <Text style={styles.label}>Tema Escuro</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#4F46E5" }}
              thumbColor={isDarkTheme ? "#FFFFFF" : "#f4f3f4"}
              onValueChange={setIsDarkTheme}
              value={isDarkTheme}
            />
          </View>
        </View>
      </View>

      {/* Sobre o App */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sobre o App</Text>
        <View style={styles.card}>
          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkLabel}>Termos de Uso</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkLabel}>Política de Privacidade</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
          <TouchableOpacity style={styles.linkRow}>
            <Text style={styles.linkLabel}>Ajuda & Suporte</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Sair */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Sair da Conta</Text>
      </TouchableOpacity>

      <Text style={styles.versionText}>Versão 1.0.0 • Kit Acordo de Casal Capital</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F3F4F6" },
  profileHeader: {
    backgroundColor: "#FFFFFF",
    padding: 24,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 20,
  },
  avatarContainer: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#E0E7FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    shadowColor: "#4F46E5",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
  avatarText: { fontSize: 36, fontWeight: "bold", color: "#4F46E5" },
  userName: { fontSize: 22, fontWeight: "bold", color: "#1F2937" },
  userEmail: { fontSize: 14, color: "#6B7280", marginBottom: 8 },
  premiumBadge: {
    backgroundColor: "#FEF3C7",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    marginTop: 6,
  },
  premiumText: { color: "#D97706", fontWeight: "bold", fontSize: 13 },
  section: { marginBottom: 24, paddingHorizontal: 16 },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 8,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  separator: {
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    marginVertical: 8,
  },
  label: { fontSize: 16, color: "#374151" },
  value: { fontSize: 16, color: "#6B7280", fontWeight: "500" },
  valueCopy: { fontSize: 16, color: "#4F46E5", fontWeight: "600" },
  helperText: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 8,
    fontStyle: "italic",
  },
  linkRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 14,
  },
  linkLabel: { fontSize: 16, color: "#374151" },
  arrow: { fontSize: 20, color: "#9CA3AF" },
  logoutButton: {
    marginHorizontal: 16,
    backgroundColor: "#FEE2E2",
    padding: 18,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 20,
  },
  logoutText: { color: "#EF4444", fontWeight: "bold", fontSize: 17 },
  versionText: {
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 12,
    paddingBottom: 40,
  },
});
