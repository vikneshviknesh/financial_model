"use client";

import { collection, addDoc, getDocs } from "firebase/firestore";

import { db } from "../config/firebase";
import { currentDateTime } from "../utils/date";
import { useState } from "react";
import { LoanModel, TransactionModel } from "../model/transactions";
import { useLoanHooks } from "./useLoanHooks";

export const useTransactionHooks = () => {
  const { checkAndSettleUpLoan } = useLoanHooks();

  const [loanList, setLoanList] = useState<LoanModel[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [loanInfoFetchErrorMsg, setLoanInfoFetchErrorMsg] = useState("");

  const [transactionsList, setTransactionsList] = useState<TransactionModel[]>(
    []
  );
  const [isTransactionsFetching, setTransactionsFetching] = useState(false);
  const [transactionsListFetchErrorMsg, setTransactionsListFetchErrorMsg] =
    useState("");

  const addTransactions = async (
    payload: {
      customer_id: string;
      scheme_id: string;
      amount_paid: string;
      loan_id: string;
    },
    loan_amount: string,
    cb: (status: boolean) => void
  ) => {
    const transactionRef = collection(db, "transactions");
    const updatedPayload = {
      ...payload,
      created_at: currentDateTime,
      updated_at: currentDateTime,
    };
    try {
      await addDoc(transactionRef, updatedPayload);
      checkAndSettleUpLoan(payload.loan_id, loan_amount);
      cb(true);
    } catch (error: any) {
      console.log("addTransactions error", error);
      cb(false);
    }
  };

  const listCustomerLoans = async (customerID: string) => {
    setIsFetching(true);
    try {
      const ref = await getDocs(collection(db, "loan"));
      const newData = ref.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((item: any) => item?.customer_id === customerID);
      setIsFetching(false);
      setLoanList(newData as LoanModel[]);
      setLoanInfoFetchErrorMsg("");
    } catch (error: any) {
      setIsFetching(false);
      setLoanInfoFetchErrorMsg(error?.toString());
      console.log("listCustomerLoans error", error);
    }
  };

  const listTransactionsByLoanId = async (loanId: string) => {
    setTransactionsFetching(true);
    try {
      const ref = await getDocs(collection(db, "transactions"));
      const newData = ref.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((item: any) => item?.loan_id === loanId);
      setTransactionsFetching(false);
      setTransactionsList(newData as any);
      setTransactionsListFetchErrorMsg("");
    } catch (error: any) {
      setTransactionsFetching(false);
      setTransactionsListFetchErrorMsg(error?.toString());
      console.log("listCustomerLoans error", error);
    }
  };

  return {
    addTransactions,
    listCustomerLoans,
    loanList,
    isFetching,
    loanInfoFetchErrorMsg,
    listTransactionsByLoanId,
    transactionsList,
    isTransactionsFetching,
    transactionsListFetchErrorMsg,
  };
};
