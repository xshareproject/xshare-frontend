import * as React from "react";
import { StyleSheet, TouchableWithoutFeedback, Keyboard } from "react-native";
import { NavigationProp } from "@react-navigation/native";

import Login from "../components/login/Login";
import { Text, View } from "../components/common/Themed";
import { Credentials } from "../services/register/register.interface";

interface Props {
  navigation: NavigationProp<any>;
  login: (credentials: Credentials) => void;
}

const LoginScreen = ({ navigation, login }: Props) => {
  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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
    </TouchableWithoutFeedback>
  );
};

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

export default LoginScreen;
