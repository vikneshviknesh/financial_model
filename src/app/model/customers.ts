export interface CreateCustomerInterface {
  customerName: string;
  mobileNumber: string;
  address: string;
  // transactions
  interest_rate: string;
  amount: string;
  scheme_id: string;
  loan_id?: string;
}

export interface CustomersListInterface extends CreateCustomerInterface {
  customerId: string;
  id: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerListInterface {
  address: string;
  created_at: string;
  customerId: string;
  customerName: string;
  mobileNumber: string;
  updated_at: string;
}
