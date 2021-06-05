import React, { useState, useCallback, useEffect, Dispatch } from "react";
import { StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { login, setLoading } from "../../redux/auth/auth.actions";
import { AuthModel, AuthState } from "../../redux/types/types.auth";

import { Text, View } from "../common/Themed";

const Login = ({ path }: { path: string }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector<AuthState, AuthModel["isLoading"]>(
    (state) => state.auth.isLoading
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    return () => {};
  }, []);

  const validateLogin = () => {
    dispatch(setLoading);
    // dispatch(login(email, password));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>User Name/Email Address</Text>
        <Input
          placeholder="Email"
          containerStyle={styles.input}
          style={styles.inputText}
          onChange={(value) => setEmail(value.nativeEvent.text)}
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
          onChange={(value) => setPassword(value.nativeEvent.text)}
          leftIcon={<Icon name="locked" type="fontisto" size={15} />}
        />
      </View>
      <View style={{ marginTop: "5%" }}>
        <Button
          title="Login"
          disabled={isLoading}
          onPress={() => {
            validateLogin();
          }}
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
