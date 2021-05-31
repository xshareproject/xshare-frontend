import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../../screens/ProfileScreen";

const ProfileStackNavigator = createStackNavigator();

const ProfileTabNavigation = () => {
  return (
    <ProfileStackNavigator.Navigator>
      <ProfileStackNavigator.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ headerShown: false }}
      />
    </ProfileStackNavigator.Navigator>
  );
};

export default ProfileTabNavigation;
