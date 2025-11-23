import React, { useContext } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from "react-native";
import { AgreementsContext } from "../context/AgreementsContext";

const AgreementDetailScreen = ({ route, navigation }) => {
  const { id } = route.params;
  const { agreements, deleteAgreement } = useContext(AgreementsContext);

  const agreement = agreements.find(a => a.id === id);

  if (!agreement) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Acordo não encontrado.</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      "Excluir Acordo",
      "Tem certeza que deseja excluir este acordo?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            await deleteAgreement(id);
            navigation.goBack();
          }
        }
      ]
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{agreement.title}</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Categoria:</Text>
        <Text style={styles.value}>{agreement.category || "Sem categoria"}</Text>

        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.value}>{agreement.description || "Sem descrição"}</Text>

        <Text style={styles.label}>Valor:</Text>
        <Text style={styles.value}>R$ {agreement.amount?.toFixed(2) || "0,00"}</Text>

        <Text style={styles.label}>Criado por:</Text>
        <Text style={styles.value}>{agreement.author || "Desconhecido"}</Text>

        <Text style={styles.label}>Criado em:</Text>
        <Text style={styles.value}>
          {agreement.createdAt
            ? new Date(agreement.createdAt).toLocaleString("pt-BR")
            : "Data não disponível"}
        </Text>

        {agreement.updatedAt && (
          <>
            <Text style={styles.label}>Última atualização:</Text>
            <Text style={styles.value}>
              {new Date(agreement.updatedAt).toLocaleString("pt-BR")}
            </Text>
          </>
        )}
      </View>

      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, styles.editButton]}
          onPress={() =>
            navigation.navigate("AddAgreement", { edit: true, agreement })
          }
        >
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Excluir</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AgreementDetailScreen;

const styles = StyleSheet.create({
  container: {
    padding: 25,
    backgroundColor: "#F9FAFB",
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  error: {
    fontSize: 18,
    color: "red",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#111827",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 25,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    color: "#4B5563",
  },
  value: {
    fontSize: 16,
    marginTop: 3,
    color: "#1F2937",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: "#2563EB",
  },
  deleteButton: {
    backgroundColor: "#DC2626",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
