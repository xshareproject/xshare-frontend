import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";
import { enable, login } from "../../redux/auth/auth.actions";
import { AuthModel, AuthState } from "../../redux/types/types.auth";

import { Text, View } from "../common/Themed";

const Login = () => {
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
    dispatch(login(email, password));
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>User Name/Email Address</Text>
        <Input
          placeholder="Email"
          containerStyle={styles.input}
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
          onChange={(value) => setPassword(value.nativeEvent.text)}
          leftIcon={<Icon name="locked" type="fontisto" size={15} />}
        />
      </View>
      <View style={{ marginTop: "5%" }}>
        <Button
          title="Login"
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
});

export default Login;
