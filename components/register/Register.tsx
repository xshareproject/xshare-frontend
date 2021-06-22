import * as React from "react";
import { StyleSheet } from "react-native";
import { Input, Button } from "react-native-elements";
import { connect } from "react-redux";

import { Text, View } from "../common/Themed";
import AuthActionService from "../../redux/auth/auth.actions";
import { RegisterCredentials } from "../../services/register/register.interface";

interface Props {
  navigateToLogin: () => void;
  register: (credentials: RegisterCredentials) => void;
}

const Register = ({ navigateToLogin, register }: Props) => {
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

  return (
    <View style={styles.container}>
      <View>
        <Text>First Name</Text>
        <Input
          placeholder="First Name"
          containerStyle={styles.input}
          onChange={(event) => setFirstName(event.nativeEvent.text)}
        />
      </View>
      <View>
        <Text>Last Name</Text>
        <Input
          placeholder="Last Name"
          containerStyle={styles.input}
          onChange={(event) => setLastName(event.nativeEvent.text)}
        />
      </View>
      <View>
        <Text>Email</Text>
        <Input
          placeholder="Email"
          containerStyle={styles.input}
          onChange={(event) => setEmail(event.nativeEvent.text)}
        />
      </View>
      <View>
        <Text>Password</Text>
        <Input
          placeholder="Password"
          containerStyle={styles.input}
          onChange={(event) => setPassword(event.nativeEvent.text)}
        />
      </View>
      <View>
        <Text>Phone Number</Text>
        <Input
          placeholder="Phone Number"
          containerStyle={styles.input}
          onChange={(event) => setPhoneNumber(event.nativeEvent.text)}
        />
      </View>
      <View>
        <Button title="Register" onPress={registerUser} />
        <Button
          containerStyle={{ marginTop: "10%" }}
          title="To Login"
          onPress={() => navigateToLogin()}
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

const mapDispatchToProps = (dispatch: Function) => {
  return {
    register: (credentials: RegisterCredentials) => {
      dispatch(AuthActionService.register(credentials));
    },
  };
};

export default connect(null, mapDispatchToProps)(Register);
