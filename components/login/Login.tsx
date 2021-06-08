import React, { useState, useCallback, useEffect, Dispatch } from "react";
import { StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { useDispatch } from "react-redux";

import { Text, View } from "../common/Themed";

const Login = ({
  path,
  navigateToRegister,
}: {
  path: string;
  navigateToRegister: Function;
}) => {
  const dispatch = useDispatch();

  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateLogin = () => {
    setLoading(true);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>User Name/Email Address</Text>
        <Input
          placeholder="Email"
          containerStyle={styles.input}
          style={styles.inputText}
          onChange={(event) => setEmail(event.nativeEvent.text)}
          leftIcon={<Icon name="person" type="ionicons" size={15} />}
        />
      </View>
      <View>
        <Text>Password</Text>
        <Input
          placeholder="Password"
          containerStyle={styles.input}
          secureTextEntry={true}
          style={styles.inputText}
          onChange={(event) => setPassword(event.nativeEvent.text)}
          leftIcon={<Icon name="locked" type="fontisto" size={15} />}
        />
      </View>
      <View
        style={{
          marginTop: "5%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          title="Login"
          disabled={isLoading}
          onPress={() => {
            validateLogin();
          }}
        />
        <Button
          title="Register"
          onPress={() => navigateToRegister()}
          style={{ backgroundColor: "red" }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    left: "-20%",
  },
  input: {
    borderWidth: 1,
    width: "200%",
  },
  inputText: {
    color: "white",
  },
});

export default Login;
