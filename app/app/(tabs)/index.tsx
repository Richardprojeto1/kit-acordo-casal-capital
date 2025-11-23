import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useAuth } from "@/src/context/AuthContext"; // ← Caminho absoluto com @
import { auth } from "@/firebase/firebaseConfig"; // ← Também com @ (se estiver na raiz)

export default function HomeScreen() {
const { signOutUser } = useAuth(); // ← Usa o método do seu contexto (mais seguro)

return (
<View style={styles.container}>
<Text style={styles.text}>Bem-vindo ao Kit Acordo Casal!</Text>
<Button title="Sair" onPress={signOutUser} color="#EF4444" />
</View>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
backgroundColor: "#fff",
},
text: {
fontSize: 24,
fontWeight: "bold",
marginBottom: 30,
color: "#1F2937",
},
});