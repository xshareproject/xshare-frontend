import * as React from "react";
import { Keyboard, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Text, View } from "../components/common/Themed";
import { Button, Input } from "react-native-elements";
import { connect } from "react-redux";
import { NavigationProp } from "@react-navigation/core";

import AuthActionService from "../redux/auth/auth.actions";
import { RegisterCredentials } from "../services/register/register.interface";

interface Props {
  navigation: NavigationProp<any>;
  register: (credentials: RegisterCredentials) => void;
}

const RegistrationScreen = ({ navigation, register }: Props) => {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const registerUser = () => {
    register({
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
    });
  };

  const toLoginScreen = () => {
    navigation.navigate("Login");
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome to Share</Text>
        <Text style={styles.title}>Create an Account</Text>
        <View
          style={styles.separator}
          lightColor="#eee"
          darkColor="rgba(255,255,255,0.1)"
        />
        <Input
          placeholder="First Name"
          containerStyle={styles.input}
          onChange={(event) => setFirstName(event.nativeEvent.text)}
        />
        <Input
          placeholder="Last Name"
          containerStyle={styles.input}
          onChange={(event) => setLastName(event.nativeEvent.text)}
        />
        <Input
          placeholder="Email"
          containerStyle={styles.input}
          onChange={(event) => setEmail(event.nativeEvent.text)}
        />
        <Input
          placeholder="Password"
          containerStyle={styles.input}
          onChange={(event) => setPassword(event.nativeEvent.text)}
        />
        <Input
          placeholder="Phone Number"
          containerStyle={styles.input}
          onChange={(event) => setPhoneNumber(event.nativeEvent.text)}
        />
        <View>
          <Button title="Register" onPress={registerUser} />
          <Button
            containerStyle={{ marginTop: "10%" }}
            title="To Login"
            onPress={toLoginScreen}
          />
        </View>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    width: "80%",
  },
});

const mapDispatchToProps = (dispatch: Function) => {
  return {
    register: (credentials: RegisterCredentials) => {
      dispatch(AuthActionService.register(credentials));
    },
  };
};

export default connect(null, mapDispatchToProps)(RegistrationScreen);
