import * as React from "react";
import { GlobalContextType } from "../types/types";

const GlobalContext = React.createContext<GlobalContextType | null>(null);

export const useGlobalContext = () => {
  const context = React.useContext(GlobalContext) as GlobalContextType;

  if (context === undefined) {
    throw new Error(`useContext must be used within a Provider`);
  }

  return context;
};

const login = () => {
  console.log("login");
};

export const GlobalProvider: React.FC = (props) => {
  const value = { authToken: undefined, login: () => login() };

  return <GlobalContext.Provider value={value} {...props} />;
};
