import * as React from "react";
import { StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";

import Login from "../components/login/Login";
import { Text, View } from "../components/common/Themed";

export default function LoginScreen({
  navigation,
}: {
  navigation: NavigationProp<any>;
}) {
  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <Login
        path="/screens/Login.tsx"
        navigateToRegister={navigateToRegister}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
