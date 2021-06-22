import * as React from "react";
import { RootStackParamList } from "../types/types";
import { createStackNavigator } from "@react-navigation/stack";

import BottomTabNavigator from "./BottomTabNavigator";
import LoginScreen from "../screens/LoginScreen";
import NotFoundScreen from "../screens/NotFoundScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import { connect } from "react-redux";
import { AppState } from "../redux/root.reducer";

interface Props {
  isAuthenticated: boolean;
  isLoading: boolean;
}

const Stack = createStackNavigator<RootStackParamList>();

const RootNavigator = ({ isAuthenticated, isLoading }: Props) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated && !isLoading ? (
        <>
          <Stack.Screen name="Root" component={BottomTabNavigator} />
          <Stack.Screen
            name="NotFound"
            component={NotFoundScreen}
            options={{ title: "Oops!" }}
          />
        </>
      ) : (
        <>
          <Stack.Screen name="Register" component={RegistrationScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const mapStateToProps = (state: AppState) => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  isLoading: state.authReducer.isLoading,
});

export default connect(mapStateToProps, null)(RootNavigator);
