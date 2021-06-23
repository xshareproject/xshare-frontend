import { TransactionStatusActionTypes, LOAD_TRANSACTION_STATUS, ADD_TRANSACTION_STATUS, REMOVE_TRANSACTION_STATUS, REMOVE_TRANSACTION_STATUS_BY_TRANSACTION_ID, EDIT_AMOUNT, ADD_MULTIPLE_TRANSACTION_STATUS } from '../types/types.actions';
import { TransactionStatus, PaymentStatus } from '../types/types.TransactionStatus';

const transactionStatus_INITIAL_STATE: TransactionStatus[] = [];
import _ from 'lodash';

export const transactionStatusReducer = 
(state = transactionStatus_INITIAL_STATE, action: TransactionStatusActionTypes)
: TransactionStatus[] => {
    switch(action.type) {
        case LOAD_TRANSACTION_STATUS:
            return [
                {
                    id: "88d9966b-751c-4bb5-af3f-5e5c493d9eae",
                    transactionId: "122a5aa3-e4aa-4a57-a420-818fed3060f0",
                    lenderId: '0wn3r1e-1578-4be5-87eb-e9211fedd90f',
                    borrowerId: "1",
                    paymentStatus: PaymentStatus.Cancelled,
                    amountOwned: 12.20
                },
                {
                    id: "88d9966b-751c-4bb5-af3f-5e5c493d9eab",
                    transactionId: "ef0a0809-e563-49eb-a1ac-303a404d83cc",
                    lenderId: '0wn3r1e-1578-4be5-87eb-e9211fedd90f',
                    borrowerId: "2",
                    paymentStatus: PaymentStatus.Pending,
                    amountOwned: 22.65,
                },
                {
                    id: "88d9966b-751c-4bb5-af3f-5e5c493d9eac",
                    transactionId: "ef0a0809-e563-49eb-a1ac-303a404d83cc",
                    lenderId: '0wn3r1e-1578-4be5-87eb-e9211fedd90f',
                    borrowerId: "3",
                    paymentStatus: PaymentStatus.Pending,
                    amountOwned: 22.65,
                },
                {
                    id: "88d9966b-751c-4bb5-af3f-5e5c493d9eff",
                    transactionId: "8558845a-919f-4487-a5e4-19353ab944b4",
                    lenderId: '0wn3r1e-1578-4be5-87eb-e9211fedd90f',
                    borrowerId: "3",
                    paymentStatus: PaymentStatus.Cancelled,
                    amountOwned: 20.00,
                }
            ];
        case ADD_TRANSACTION_STATUS:
            let transactionId = action.transaction.id;
            let newTransactionStatus : TransactionStatus = {
                id: "",
                transactionId,
                lenderId: '',
                borrowerId: action.contact.id,
                paymentStatus: PaymentStatus.Pending,
                amountOwned: 0
            };    
            return [
                ...state,
                newTransactionStatus
            ];
        case ADD_MULTIPLE_TRANSACTION_STATUS:
            return state.concat(action.contactTransactionPairs);
        case REMOVE_TRANSACTION_STATUS:
            let indexToRemove = state.findIndex((transactionStatus) => {return transactionStatus?.borrowerId === action.contactId});
            state.splice(indexToRemove, 1);
            return state;
        case REMOVE_TRANSACTION_STATUS_BY_TRANSACTION_ID:
            let filteredTransactionStatuses : TransactionStatus[] = state.filter((contactTransactionPair) => {return contactTransactionPair.transactionId !== action.transactionId});
            return filteredTransactionStatuses;
        case EDIT_AMOUNT:
            let amountNum = action.amount;
            let indexToModify = state.findIndex((contactTransactionPair) => {return contactTransactionPair?.borrowerId === action.contactId});
            let transactionStatuses = _.cloneDeep(state);
            transactionStatuses[indexToModify]["amountOwned"] = amountNum;          
            return transactionStatuses;
        
        default:
            return state;

    }
    
}