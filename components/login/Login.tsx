import * as React from "react";
import { StyleSheet } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { connect } from "react-redux";

import { Text, View } from "../common/Themed";
import AuthActionService from "../../redux/auth/auth.actions";
import { Credentials } from "../../services/register/register.interface";

interface Props {
  navigateToRegister: () => void;
  path: string;
  login: (credentials: Credentials) => void;
}

const Login = ({ login, navigateToRegister, path }: Props) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const loginUser = () => {
    login({ email, password });
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>User Name/Email Address</Text>
        <Input
          placeholder="Email"
          containerStyle={styles.input}
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
          onChange={(event) => setPassword(event.nativeEvent.text)}
          leftIcon={<Icon name="locked" type="fontisto" size={15} />}
        />
      </View>
      <View style={{ marginTop: "5%" }}>
        <Button title="Login" onPress={loginUser} />
        <Button
          containerStyle={{ marginTop: "10%" }}
          title="To Register"
          style={{ backgroundColor: "red" }}
          onPress={() => navigateToRegister()}
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
    login: (credentials: Credentials) => {
      dispatch(AuthActionService.login(credentials));
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);
