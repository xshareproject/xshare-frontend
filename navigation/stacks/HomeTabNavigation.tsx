import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../../screens/HomeScreen";

const HomeStackNavigator = createStackNavigator();

const HomeTabNavigation = () => {
  return (
    <HomeStackNavigator.Navigator>
      <HomeStackNavigator.Screen
        name="Home"
        component={Home}
        options={{ headerShown: false }}
      />
    </HomeStackNavigator.Navigator>
  );
};

export default HomeTabNavigation;
