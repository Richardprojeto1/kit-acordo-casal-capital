// app/login.tsx

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import { useAuth } from "@/src/context/AuthContext"; // Caminho absoluto
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const { login, register, loading, error } = useAuth();
  const router = useRouter();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [coupleName, setCoupleName] = useState("");

  const handleSubmit = async () => {
    // Validações
    if (!email.includes("@") || !email.includes(".")) {
      Alert.alert("Email inválido", "Por favor, digite um email válido.");
      return;
    }
    if (password.length < 6) {
      Alert.alert("Senha fraca", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }
    if (isRegister && !coupleName.trim()) {
      Alert.alert("Nome do casal", "Digite o nome do casal para continuar.");
      return;
    }

    try {
      if (isRegister) {
        await register(email.trim(), password, coupleName.trim());
      } else {
        await login(email.trim(), password);
      }
      // Sucesso → o _layout redireciona automaticamente
    } catch (err: any) {
      // Erro já tratado no AuthContext
      console.log("Erro no login/registro:", err.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Logo/Título */}
        <Text style={styles.title}>Kit Acordo de Casal</Text>
        <Text style={styles.subtitle}>
          Sua vida financeira de casal organizada no mesmo lugar.
        </Text>

        {/* Card Principal */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            {isRegister ? "Criar Conta" : "Bem-vindo de volta!"}
          </Text>

          {/* Email */}
          <TextInput
            placeholder="seu@email.com"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            value={email}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setEmail}
          />

          {/* Senha */}
          <TextInput
            placeholder="Senha (mínimo 6 caracteres)"
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Nome do Casal (apenas no registro) */}
          {isRegister && (
            <TextInput
              placeholder="Nome do Casal (ex: Ricardo & Bianca)"
              placeholderTextColor="#9CA3AF"
              style={styles.input}
              value={coupleName}
              onChangeText={setCoupleName}
            />
          )}

          {/* Mensagem de erro */}
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          {/* Botão Principal */}
          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" size="small" />
            ) : (
              <Text style={styles.buttonText}>
                {isRegister ? "Criar Conta" : "Entrar"}
              </Text>
            )}
          </TouchableOpacity>

          {/* Alternar entre Login/Registro */}
          <TouchableOpacity
            style={styles.switch}
            onPress={() => setIsRegister(!isRegister)}
          >
            <Text style={styles.switchText}>
              {isRegister
                ? "Já tem conta? Entre aqui"
                : "Novo por aqui? Crie sua conta"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Rodapé */}
        <Text style={styles.footer}>
          Feito com amor para casais que sonham juntos
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 28,
    backgroundColor: "#F9FAFB",
    justifyContent: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
    color: "#4F46E5",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 22,
  },
  card: {
    backgroundColor: "#FFFFFF",
    padding: 28,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 20,
    elevation: 12,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    color: "#1F2937",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  button: {
    backgroundColor: "#4F46E5",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
  errorContainer: {
    backgroundColor: "#FEE2E2",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#FCA5A5",
  },
  errorText: {
    color: "#DC2626",
    textAlign: "center",
    fontWeight: "600",
  },
  switch: {
    marginTop: 20,
    alignItems: "center",
  },
  switchText: {
    color: "#4F46E5",
    fontSize: 15,
    fontWeight: "600",
  },
  footer: {
    marginTop: 40,
    textAlign: "center",
    color: "#9CA3AF",
    fontSize: 13,
    fontStyle: "italic",
  },
});