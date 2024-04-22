"use client";

import { collection, addDoc, getDocs } from "firebase/firestore";

import { db } from "../config/firebase";
import { currentDateTime } from "../utils/date";
import { useState } from "react";
import { TransactionModel } from "../model/transactions";

export const useTransactionHooks = () => {
  const [loanList, setLoanList] = useState<TransactionModel[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  const [loanInfoFetchErrorMsg, setLoanInfoFetchErrorMsg] = useState("");

  const updateToLoan = async (
    payload: { customer_id: string; scheme_id: string; loan_amount: string },
    cb: (status: boolean, loan_id: string) => void
  ) => {
    const userRef = collection(db, "loan");
    const updatedPayload = {
      ...payload,
      created_at: currentDateTime,
      updated_at: currentDateTime,
    };
    try {
      await addDoc(userRef, updatedPayload);
      cb(true, userRef.id);
    } catch (error: any) {
      cb(false, "");
    }
  };

  const addTransactions = async (
    payload: {
      customer_id: string;
      scheme_id: string;
      amount_paid: string;
      loan_id: string;
    },
    cb: (status: boolean) => void
  ) => {
    const userRef = collection(db, "transactions");
    const updatedPayload = {
      ...payload,
      created_at: currentDateTime,
      updated_at: currentDateTime,
    };
    try {
      await addDoc(userRef, updatedPayload);
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
      setLoanList(newData as TransactionModel[]);
      setLoanInfoFetchErrorMsg("");
    } catch (error: any) {
      setIsFetching(false);
      setLoanInfoFetchErrorMsg(error?.toString());
      console.log("listCustomerLoans error", error);
    }
  };

  return {
    updateToLoan,
    addTransactions,
    listCustomerLoans,
    loanList,
    isFetching,
    loanInfoFetchErrorMsg,
  };
};
