import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import * as React from "react";
import { ColorSchemeName } from "react-native";
import LinkingConfiguration from "./LinkingConfiguration";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import {
  LOAD_TRANSACTIONS,
  LOAD_CONTACTS,
  LOAD_CONTACT_TRANSACTION_PAIRS,
} from "../redux/types/types.actions";
import RootNavigator from "./RootNavigator";

function Navigation({
  colorScheme,
  loadTransactions,
  loadContacts,
  loadContactTransactionPairs,
}: {
  colorScheme: ColorSchemeName;
  loadTransactions: Function;
  loadContacts: Function;
  loadContactTransactionPairs: Function;
}) {
  loadTransactions();
  loadContacts();
  loadContactTransactionPairs();
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

interface DispatchProps {
  loadTransactions: Function;
  loadContacts: Function;
  loadContactTransactionPairs: Function;
}

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => {
  return {
    loadTransactions: () => dispatch({ type: LOAD_TRANSACTIONS }),
    loadContacts: () => dispatch({ type: LOAD_CONTACTS }),
    loadContactTransactionPairs: () =>
      dispatch({ type: LOAD_CONTACT_TRANSACTION_PAIRS }),
  };
};

export default connect(null, mapDispatchToProps)(Navigation);
