import * as React from "react";
import { RootStackParamList } from "../types/types";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./BottomTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { useSelector } from "react-redux";
import { AuthModel, AuthState } from "../redux/types/types.auth";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  const isAuthenticated = useSelector<AuthState, AuthModel["isAuthenticated"]>(
    (state) => state.auth.isAuthenticated
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "Oops!" }}
          />
        </>
      ) : (
        <Stack.Screen name="Login" component={LoginScreen} />
      )}
    </Stack.Navigator>
  );
};

export default RootNavigator;
