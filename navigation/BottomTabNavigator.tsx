import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import Tabs from "../constants/Tabs";

import ProfileTabNavigation from "./stacks/ProfileTabNavigation";
import TransactionTabNavigation from "./stacks/TranscationTabNavigation";
import ContactTabNavigation from "./stacks/ContactTabNavigation";
import HomeTabNavigation from "./stacks/HomeTabNavigation";

import {
  HomeIcon,
  ContactIcon,
  TransactionIcon,
  ProfileIcon,
} from "../components/common/TabIcons";

const BottomTab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName={Tabs.Home}
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      <BottomTab.Screen
        name={Tabs.Home}
        component={HomeTabNavigation}
        options={{ tabBarIcon: ({ color }) => <HomeIcon color={color} /> }}
      />
      <BottomTab.Screen
        name={Tabs.Contacts}
        component={ContactTabNavigation}
        options={{ tabBarIcon: ({ color }) => <ContactIcon color={color} /> }}
      />
      <BottomTab.Screen
        name={Tabs.Transactions}
        component={TransactionTabNavigation}
        options={({ route }) => ({
          tabBarIcon: ({ color }) => <TransactionIcon color={color} />,
        })}
      />
      <BottomTab.Screen
        name={Tabs.Profile}
        component={ProfileTabNavigation}
        options={{ tabBarIcon: ({ color }) => <ProfileIcon color={color} /> }}
      />
    </BottomTab.Navigator>
  );
};

const getTabBarVisibility = (route: any) => {
  if (route.state) {
    const routeName = route.state.routes[route.state.index].name;
    if (routeName === "Details") return false;
  }
  return true;
};

export default BottomTabNavigator;
