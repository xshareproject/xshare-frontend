import React, { useState, useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { connect, useSelector } from "react-redux";
import { Dispatch } from "redux";

import { Text, View } from "../common/Themed";
import AuthActionService from "../../redux/auth/auth.actions";
import { Credentials } from "../../services/register/register.interface";
import { AuthModel, AuthState } from "../../redux/types/types.auth";

interface Props {
  navigateToRegister: () => void;
  path: string;
  login: (credentials: Credentials) => void;
}

const Login = (props: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateLogin = () => {};

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
      <View style={{ marginTop: "5%" }}>
        <Button
          title="Login"
          onPress={() => {
            validateLogin();
          }}
        />
        <Button
          containerStyle={{ marginTop: "10%" }}
          title="To Register"
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

const mapDispatchToProps = (dispatch) => {
  return {
    login: (credentials: Credentials) => {
      dispatch(AuthActionService.login(credentials));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
