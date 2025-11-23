// app/profile.tsx

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/src/context/AuthContext";

// Helper robusto para iniciais
const getInitials = (name = "") => {
  const cleanName = name.trim();
  if (!cleanName) return "??";

  const parts = cleanName.split(/\s+/).filter((p) => p.length > 0);
  if (parts.length === 0) return "??";
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();

  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useAuth();

  // Dados reais do usuário logado
  const displayName = user?.displayName || "Ricardo F.";
  const email = user?.email || "richard@exemplo.com";
  const photoURL = user?.photoURL || null;
  const joinedAt = user?.metadata?.creationTime
    ? new Date(user.metadata.creationTime).toLocaleDateString("pt-BR", {
        month: "long",
        year: "numeric",
      })
    : "Novembro 2025";

  // Dados do parceiro (mock até implementar vínculo real)
  const partner = { name: "Bianca", status: "Conectada", photo: null };
  const coupleStats = { daysTogether: 120, savingsGoal: "Viagem à Europa" };

  const handleEditProfile = () => {
    Alert.alert(
      "Editar Perfil",
      "Em breve você poderá alterar nome, foto e mais!",
      [{ text: "OK" }]
    );
  };

  const handleChangePassword = () => {
    Alert.alert("Alterar Senha", "Funcionalidade em desenvolvimento...");
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 1. CABEÇALHO VISUAL */}
      <View style={styles.headerContainer}>
        <View style={styles.coverPhoto} />
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            {photoURL ? (
              <Image source={{ uri: photoURL }} style={styles.avatarImage} />
            ) : (
              <Text style={styles.avatarText}>{getInitials(displayName)}</Text>
            )}
            <TouchableOpacity
              style={styles.editAvatarButton}
              onPress={handleEditProfile}
            >
              <Text style={styles.editAvatarIcon}>Camera</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>{displayName}</Text>
          <Text style={styles.userRole}>Gestor Financeiro do Casal</Text>
        </View>
      </View>

      {/* 2. CARTÃO DE STATUS DO CASAL */}
      <View style={styles.statusCard}>
        <View style={styles.statusRow}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Parceiro(a)</Text>
            <View style={styles.partnerBadge}>
              <Text style={styles.partnerName}>Heart {partner.name}</Text>
            </View>
          </View>
          <View style={styles.verticalLine} />
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Jornada Juntos</Text>
            <Text style={styles.statusValue}>
              {coupleStats.daysTogether} dias
            </Text>
          </View>
        </View>
      </View>

      {/* 3. INFORMAÇÕES DETALHADAS */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dados da Conta</Text>
        <View style={styles.infoCard}>
          {/* Email */}
          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Text>Email</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{email}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Membro desde */}
          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Text>Calendar</Text>
            </View>
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Membro desde</Text>
              <Text style={styles.infoValue}>{joinedAt}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Segurança */}
          <TouchableOpacity
            style={styles.infoRow}
            onPress={handleChangePassword}
          >
            <View style={styles.flexRow}>
              <View style={styles.iconCircle}>
                <Text>Shield</Text>
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Segurança</Text>
                <Text style={styles.infoValue}>Alterar Senha</Text>
              </View>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* 4. BOTÃO PRINCIPAL */}
      <View style={styles.actionContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleEditProfile}
        >
          <Text style={styles.primaryButtonText}>Editar Informações</Text>
        </TouchableOpacity>
      </View>

      {/* Botão Fechar (opcional) */}
      <TouchableOpacity
        style={styles.closeButton}
        onPress={() => router.back()}
      >
        <Text style={styles.closeText}>Fechar Perfil</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F9FAFB" },
  headerContainer: { marginBottom: 60 },
  coverPhoto: {
    height: 160,
    backgroundColor: "#4F46E5",
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  profileHeader: {
    position: "absolute",
    top: 90,
    left: 0,
    right: 0,
    alignItems: "center",
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    marginBottom: 12,
    position: "relative",
  },
  avatarImage: { width: 110, height: 110, borderRadius: 55 },
  avatarText: { fontSize: 44, fontWeight: "bold", color: "#4F46E5" },
  editAvatarButton: {
    position: "absolute",
    bottom: 4,
    right: 4,
    backgroundColor: "#4F46E5",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },
  editAvatarIcon: { fontSize: 16, color: "#FFFFFF" },
  userName: { fontSize: 26, fontWeight: "bold", color: "#1F2937" },
  userRole: { fontSize: 15, color: "#6B7280", fontStyle: "italic", marginTop: 4 },

  // Status Card
  statusCard: {
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 22,
    marginBottom: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  statusRow: { flexDirection: "row", justifyContent: "space-around" },
  statusItem: { alignItems: "center", flex: 1 },
  verticalLine: { width: 1, height: 50, backgroundColor: "#E5E7EB" },
  statusLabel: {
    fontSize: 12,
    color: "#9CA3AF",
    marginBottom: 8,
    textTransform: "uppercase",
    fontWeight: "600",
    letterSpacing: 0.5,
  },
  partnerBadge: {
    backgroundColor: "#FEE2E2",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 24,
  },
  partnerName: { color: "#DC2626", fontWeight: "bold", fontSize: 15 },
  statusValue: { fontSize: 18, fontWeight: "bold", color: "#1F2937" },

  // Info Section
  section: { paddingHorizontal: 20, marginBottom: 28 },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "bold",
    color: "#111827",
    marginBottom: 14,
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 4,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    justifyContent: "space-between",
  },
  flexRow: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  infoTextContainer: { flex: 1 },
  infoLabel: { fontSize: 13, color: "#6B7280" },
  infoValue: { fontSize: 16, color: "#1F2937", fontWeight: "600", marginTop: 2 },
  arrow: { fontSize: 22, color: "#9CA3AF" },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginLeft: 68,
    marginVertical: 2,
  },

  // Actions
  actionContainer: { paddingHorizontal: 20, marginBottom: 30 },
  primaryButton: {
    backgroundColor: "#4F46E5",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },
  closeButton: {
    marginHorizontal: 20,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    marginBottom: 40,
  },
  closeText: { color: "#6B7280", fontWeight: "600", fontSize: 16 },
});