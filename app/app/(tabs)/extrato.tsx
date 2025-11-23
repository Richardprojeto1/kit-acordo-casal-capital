// app/(tabs)/extrato.tsx

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useAgreementsContext } from "@/src/context/AgreementsContext";

export default function ExtratoScreen() {
  const { agreements, loading } = useAgreementsContext();
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    if (!agreements) return;

    const allTransactions = agreements
      .flatMap((agreement) =>
        (agreement.transactions || []).map((t: any) => ({
          ...t,
          agreementTitle: agreement.title,
        }))
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    setTransactions(allTransactions);
  }, [agreements]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.item}>
      <View>
        <Text style={styles.title}>{item.title}</Text>
        {item.agreementTitle && (
          <Text style={styles.agreement}>de: {item.agreementTitle}</Text>
        )}
        <Text style={styles.date}>
          {new Date(item.date).toLocaleDateString("pt-BR")}
        </Text>
      </View>
      <Text
        style={[
          styles.amount,
          item.amount >= 0 ? styles.credit : styles.debit,
        ]}
      >
        {item.amount >= 0 ? "+ " : "- "}R$ {Math.abs(item.amount).toFixed(2)}
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Carregando transações...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Extrato Completo</Text>

      <FlatList
        data={transactions}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id || index.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.empty}>Nenhuma transação registrada ainda.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 20,
    color: "#1F2937",
  },
  listContent: {
    padding: 16,
    paddingBottom: 100,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 4, // ← A VÍRGULA ESTAVA FALTANDO AQUI!!!
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  agreement: {
    fontSize: 13,
    color: "#6B7280",
    fontStyle: "italic",
    marginTop: 2,
  },
  date: {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 6,
  },
  amount: {
    fontSize: 18,
    fontWeight: "700",
  },
  credit: {
    color: "#10B981",
  },
  debit: {
    color: "#EF4444",
  },
  empty: {
    textAlign: "center",
    paddingTop: 60,
    fontSize: 16,
    color: "#6B7280",
  },
});