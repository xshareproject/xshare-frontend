import { combineReducers } from "redux";
import { contactTransactionPairReducer } from "./contactTransactionPair/contactTransactionPair.reducer";
import { transactionReducer } from "./transaction/transaction.reducer";
import { contactReducer } from "./contact/contact.reducer";
import { authReducer } from "./auth/auth.reducer";
import { authErrorReducer } from "./auth/error.reducer";

export const rootReducer = combineReducers({
  contactTransactionPairReducer,
  transactionReducer,
  contactReducer,
  authReducer,
  authErrorReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
