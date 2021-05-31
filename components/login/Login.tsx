import * as WebBrowser from "expo-web-browser";
import React, { useState, useCallback } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Input, Icon, Button } from "react-native-elements";

import Colors from "../../constants/Colors";
import { MonoText } from "../StyledText";
import { Text, View } from "../Themed";

export default function Login({ path }: { path: string }) {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [isSending, setIsSending] = useState(false);

  const validateLogin = useCallback(() => {
    if (isSending) return;
    setIsSending(true);
    setIsSending(false);
  }, [isSending]); // update the callback if the state changes

  return (
    <View style={styles.container}>
      <View>
        <Text>User Name/Email Address</Text>
        <Input
          placeholder="Email"
          containerStyle={styles.input}
          onChange={(value) => setUserName(value.nativeEvent.text)}
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
          disabled={isSending}
          onPress={() => {
            validateLogin();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    left: "-20%",
  },
  input: {
    borderWidth: 1,
    width: "200%",
  },
});
