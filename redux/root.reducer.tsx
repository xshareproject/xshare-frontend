import { combineReducers } from "redux";
import { contactTransactionPairReducer } from "./contactTransactionPair/contactTransactionPair.reducer";
import { transactionReducer } from "./transaction/transaction.reducer";
import { contactReducer } from "./contact/contact.reducer";

export const rootReducer = combineReducers({
  contactTransactionPairReducer,
  transactionReducer,
  contactReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
