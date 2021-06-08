import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/common/Themed";
import { TextInput } from "react-native-gesture-handler";
import { Button } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { AuthModel, AuthState } from "../redux/types/types.auth";
import { Credentials } from "../services/register/register.interface";
import { register } from "../redux/auth/auth.actions";

const RegistrationScreen = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector<AuthState, AuthModel["isAuthenticated"]>(
    (state) => state.auth.isAuthenticated
  );

  const [isLoading, setLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const registerUser = () => {
    const credentials: Credentials = {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    };

    dispatch(register(credentials));
  };

  return (
    <View style={styles.container} pointerEvents={isLoading ? "none" : "auto"}>
      <Text>Welcome to Share</Text>
      <Text>Create an Account</Text>
      <TextInput
        placeholder="First Name"
        onChange={(event) => setFirstName(event.nativeEvent.text)}
      />
      <TextInput
        placeholder="Last Name"
        onChange={(event) => setLastName(event.nativeEvent.text)}
      />
      <TextInput
        placeholder="Email"
        onChange={(event) => setEmail(event.nativeEvent.text)}
      />
      <TextInput
        placeholder="Password"
        onChange={(event) => setPassword(event.nativeEvent.text)}
      />
      <TextInput
        placeholder="Phone Number"
        onChange={(event) => setPhoneNumber(event.nativeEvent.text)}
      />
      <Button title="Register" disabled={isLoading} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default RegistrationScreen;
