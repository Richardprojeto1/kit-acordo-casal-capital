// src/screens/EditAgreementScreen.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useAgreements } from "../hooks/useAgreements";

export default function EditAgreementScreen() {
  const route = useRoute();
  const navigation = useNavigation();

  const { agreement } = route.params; // Recebido da Home ou Details
  const { updateAgreement } = useAgreements();

  const [title, setTitle] = useState(agreement.title);
  const [description, setDescription] = useState(agreement.description || "");
  const [amount, setAmount] = useState(String(agreement.amount));
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Erro", "O título não pode estar vazio.");
      return;
    }

    if (!amount || isNaN(parseFloat(amount))) {
      Alert.alert("Erro", "Digite um valor válido.");
      return;
    }

    setLoading(true);

    try {
      await updateAgreement(agreement.id, {
        title,
        description,
        amount: parseFloat(amount),
        updatedAt: Date.now(),
      });

      Alert.alert("Sucesso!", "Acordo atualizado.");
      navigation.goBack();
    } catch (err) {
      Alert.alert("Erro", "Não foi possível salvar as alterações.");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Acordo</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Ex: Economia para viagem"
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, { height: 80 }]}
        multiline
        value={description}
        onChangeText={setDescription}
        placeholder="Descrição do acordo"
      />

      <Text style={styles.label}>Valor (R$)</Text>
      <TextInput
        style={styles.input}
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSave}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Salvando..." : "Salvar Alterações"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#111827",
  },
  label: {
    fontSize: 14,
    color: "#374151",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#4F46E5",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
});
