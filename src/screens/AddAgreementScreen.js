// src/screens/AddAgreementScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useAgreements } from "../hooks/useAgreements";
import { useNavigation } from "@react-navigation/native";

export default function AddAgreementScreen() {
  const navigation = useNavigation();
  const { createAgreement } = useAgreements();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert("Erro", "O título é obrigatório.");
      return;
    }

    const newAgreement = {
      title,
      description,
      createdAt: Date.now(),
    };

    try {
      await createAgreement(newAgreement);
      Alert.alert("Sucesso", "Acordo criado!");
      navigation.goBack();
    } catch (error) {
      console.log(error);
      Alert.alert("Erro", "Não foi possível criar o acordo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Acordo</Text>

      <Text style={styles.label}>Título</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Gastos acima de R$200 precisam ser combinados"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Descrição (opcional)</Text>
      <TextInput
        style={[styles.input, styles.textarea]}
        placeholder="Ex: Este acordo serve como regra para evitar conflitos…"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Salvar Acordo</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cancelBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.cancelText}>Cancelar</Text>
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
    fontSize: 26,
    fontWeight: "bold",
    color: "#4F46E5",
    marginBottom: 25,
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 5,
    color: "#374151",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    marginBottom: 15,
  },
  textarea: {
    height: 120,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#4F46E5",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelBtn: {
    marginTop: 15,
    alignItems: "center",
  },
  cancelText: {
    color: "#6B7280",
    fontSize: 14,
  },
});
