export type EmiStatus = "COMPLETED" | "PAID" | "PENDING" | "UPCOMING" | "OVERDUE" | "PARTIAL";

export interface Emi {
    id: number;
    amount: number;
    date: string;
    installmentId: string;
    status: EmiStatus;
    loanId: string;
    lateFee?: number;
    customerMobileNumber?: string;
    imei?: string;
}