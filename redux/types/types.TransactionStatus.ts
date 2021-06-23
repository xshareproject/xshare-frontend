export enum PaymentStatus {
    Pending = "Pending",
    Cancelled = "Cancelled",
    Completed = "Completed",
    Accepted = "Accepted", 
    Declined = "Declined", 
    Delayed = "Delayed"
}

export interface TransactionStatus {
    id: string,
    transactionId: string,
    lenderId: string,
    borrowerId: string,
    paymentStatus: PaymentStatus,
    amountOwned: number
}