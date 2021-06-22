import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TransactionsOverviewScreen from "../../screens/TransactionsOverviewScreen";
import TransactionDetailsScreen from "../../screens/TransactionDetailsScreen";

const TransactionsStackNavigator = createStackNavigator();

const TransactionTabNavigation = () => {
  return (
    <TransactionsStackNavigator.Navigator>
      <TransactionsStackNavigator.Screen
        name="Overview"
        component={TransactionsOverviewScreen}
        options={{ headerShown: false }}
      />
      <TransactionsStackNavigator.Screen
        name="Details"
        component={TransactionDetailsScreen}
        options={{ headerShown: false }}
      />
    </TransactionsStackNavigator.Navigator>
  );
};

export default TransactionTabNavigation;
