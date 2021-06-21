import { AppActions, ADD_TRANSACTION_STATUS, REMOVE_TRANSACTION_STATUS, EDIT_AMOUNT, REMOVE_TRANSACTION_STATUS_BY_TRANSACTION_ID, ADD_MULTIPLE_TRANSACTION_STATUS} from "../types/types.actions"
import { Contact } from "../types/types.Contact";
import {Transaction} from '../types/types.Transaction';
import { TransactionStatus } from "../types/types.TransactionStatus";

export const addNewTransactionStatus = (contact: Contact, transaction: Transaction): AppActions => ({
    type: ADD_TRANSACTION_STATUS,
    contact,
    transaction
})

export const addMultipleTransactionStatus = (contactTransactionPairs: TransactionStatus[]): AppActions => ({
    type: ADD_MULTIPLE_TRANSACTION_STATUS,
    contactTransactionPairs
})

export const removeTransactionStatus = (contactId: string) : AppActions => ({
    type: REMOVE_TRANSACTION_STATUS,
    contactId
})

export const removeTransactionStatusByTransactionId = (transactionId: string) : AppActions => ({
    type: REMOVE_TRANSACTION_STATUS_BY_TRANSACTION_ID,
    transactionId
})

export const editTransactionStatusAmount = (contactId: string, amount: number) : AppActions => ({
    type: EDIT_AMOUNT,
    contactId,
    amount
})