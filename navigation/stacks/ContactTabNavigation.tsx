import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ContactScreen from "../../screens/ContactScreen";

const ContactsStackNavigator = createStackNavigator();

const ContactTabNavigation = () => {
  return (
    <ContactsStackNavigator.Navigator>
      <ContactsStackNavigator.Screen
        name="Contact"
        component={ContactScreen}
        options={{ headerShown: false }}
      />
    </ContactsStackNavigator.Navigator>
  );
};

export default ContactTabNavigation;
