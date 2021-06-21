export enum PaymentStatus {
    Pending,
    Cancelled,
    Completed,
    Accepted, 
    Declined, 
    Delayed
}

export interface TransactionStatus {
    id: string,
    transactionId: string,
    lenderId: string,
    borrowerId: string,
    paymentStatus: PaymentStatus,
    amountOwned: number
}