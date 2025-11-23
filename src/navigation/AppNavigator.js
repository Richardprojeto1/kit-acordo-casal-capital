// src/navigation/AppNavigator.js
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Contextos
import { useAuth } from "../context/AuthContext";

// Telas
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import AddAgreementScreen from "../screens/AddAgreementScreen";
import AgreementDetailScreen from "../screens/AgreementDetailScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user, loading } = useAuth();

  // Enquanto verifica auth, não navega
  if (loading) {
    return null; // você pode colocar um splash depois
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: "fade",
        }}
      >

        {user ? (
          // ==========================
          //  Usuário autenticado
          // ==========================
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="AddAgreement" component={AddAgreementScreen} />
            <Stack.Screen name="AgreementDetail" component={AgreementDetailScreen} />
          </>
        ) : (
          // ==========================
          //  Usuário NÃO autenticado
          // ==========================
          <Stack.Screen name="Login" component={LoginScreen} />
        )}

      </Stack.Navigator>
    </NavigationContainer>
  );
}
