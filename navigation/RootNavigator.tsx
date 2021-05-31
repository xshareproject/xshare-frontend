import * as React from "react";
import { GlobalContextType, RootStackParamList } from "../types/types";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./BottomTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import { GlobalProvider } from "./GlobalProvider";

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <GlobalProvider>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {false ? (
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
    </GlobalProvider>
  );
};

export default RootNavigator;
