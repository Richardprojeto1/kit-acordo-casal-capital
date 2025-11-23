// app/_layout.tsx

import React from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@react-navigation/native";
import { DarkTheme, DefaultTheme } from "@react-navigation/native";
import { useColorScheme } from "react-native";

// Contextos
import { AuthProvider, useAuth } from "@/src/context/AuthContext";
import { AgreementsProvider } from "@/src/context/AgreementsContext";

// Navegação protegida
function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { user, loading } = useAuth();

  // Enquanto verifica login → tela branca (sem flash)
  if (loading) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            {/* Usuário logado → mostra as tabs */}
            <Stack.Screen name="(tabs)" />

            {/* Perfil como modal lindo */}
            <Stack.Screen
              name="profile"
              options={{
                presentation: "modal",
                headerShown: true,
                title: "Meu Perfil",
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: "#4F46E5" },
                headerTintColor: "#FFFFFF",
                headerTitleStyle: { fontWeight: "bold", fontSize: 18 },
                headerLeft: () => null, // remove seta de voltar
              }}
            />
          </>
        ) : (
          /* Usuário não logado → vai pro login */
          <Stack.Screen name="login" />
        )}
      </Stack>

      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </ThemeProvider>
  );
}

// Layout principal
export default function RootLayout() {
  return (
    <AuthProvider>
      <AgreementsProvider>
        <RootLayoutNav />
      </AgreementsProvider>
    </AuthProvider>
  );
}