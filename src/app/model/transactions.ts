export interface LoanModel {
  created_at: string;
  customer_id: string;
  id: string;
  loan_amount: string;
  scheme_id: string;
  updated_at: string;
}

export interface AddNewLoanModel {
  customer_id: string;
  scheme_id: string;
  amount: string;
  interest_rate: string;
}

export interface TransactionModel {
  amount_paid: string;
  created_at: string;
  customer_id: string;
  loan_id: string;
  scheme_id: string;
  updated_at: string;
}
