import * as React from "react";
import { StyleSheet } from "react-native";
import { Button } from "react-native-elements";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import { NavigationProp } from "@react-navigation/native";

interface ProfileProps {
  navigation: NavigationProp<any>;
}

export default function ProfileScreen(props: ProfileProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="/screens/Profile.tsx" />
      <Button
        title="Login"
        onPress={() => {
          props.navigation.navigate("Login");
        }}
      />
    </View>
  );
}

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
