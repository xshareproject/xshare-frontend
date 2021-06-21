import { combineReducers } from 'redux';
//import {persistReducer} from 'redux-persist';
//import userReducer from './user/user.reducer';
//import navigationReducer from './navigation/navigation.reducer';
//import storage from 'redux-persist/lib/storage';
import {transactionStatusReducer} from './transactionStatus/transactionStatus.reducer';
import {transactionReducer} from './transaction/transaction.reducer';
import {contactReducer} from './contact/contact.reducer';

export const rootReducer = combineReducers({
    transactionStatusReducer,
    transactionReducer,
    contactReducer
});

export type AppState = ReturnType<typeof rootReducer>