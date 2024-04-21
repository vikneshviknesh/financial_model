"use client";

import { collection, addDoc } from "firebase/firestore";

import { db } from "../config/firebase";
import { currentDateTime } from "../utils/date";

export const useTransactionHooks = () => {
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

  return {
    updateToLoan,
    addTransactions,
  };
};
