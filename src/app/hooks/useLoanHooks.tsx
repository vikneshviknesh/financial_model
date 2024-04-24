"use client";
import { useState } from "react";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../config/firebase";
import { LoanListModel } from "../model/loan";
import { currentDateTime } from "../utils/date";

export const useLoanHooks = () => {
  const [loanList, setLoanList] = useState<LoanListModel[]>([]);

  const [isLoanListFetching, setLoanListFetching] = useState(true);
  const [loanListFetchErrorMsg, setLoanListFetchErrorMsg] = useState("");

  // loan details
  const [loanDetails, setLoanDetails] = useState<LoanListModel>(
    {} as LoanListModel
  );
  const [loanDetailsFetching, setLoanDetailsFetching] = useState(false);
  const [loanDetailsFetchErrorMsg, setLoanDetailsFetchErrorMsg] = useState("");

  const addNewLoan = async (
    payload: { customer_id: string; scheme_id: string; loan_amount: string },
    cb: (status: boolean, loan_id: string) => void
  ) => {
    const loanRef = collection(db, "loan");
    const updatedPayload = {
      ...payload,
      is_completed: false,
      created_at: currentDateTime,
      updated_at: currentDateTime,
    };

    try {
      const response = await addDoc(loanRef, updatedPayload);
      cb(true, response.id);
    } catch (error: any) {
      console.log("error", error);
      cb(false, "");
    }
  };

  const listAllLoans = async ({ is_completed }: { is_completed: boolean }) => {
    setLoanListFetching(true);
    try {
      const querySnapshot = await getDocs(collection(db, "loan"));
      const newData = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((item: any) => item?.is_completed === is_completed);
      setLoanList(newData as LoanListModel[]);
      setLoanListFetchErrorMsg("");
      setLoanListFetching(false);
    } catch (error: any) {
      setLoanListFetching(false);
      setLoanListFetchErrorMsg(error?.message as string);
    }
  };

  const updateLoanById = async (
    payload: { loan_id: string; loan_status: boolean },
    cb: (status: boolean) => void
  ) => {
    const loanRef = doc(db, "loan", payload.loan_id);
    const updatedPayload = {
      is_completed: payload.loan_status,
      updated_at: currentDateTime,
    };
    try {
      await await updateDoc(loanRef, updatedPayload);
      cb(true);
    } catch (error: any) {
      cb(false);
    }
  };

  const checkAndSettleUpLoan = async (loan_id: string, loan_amount: string) => {
    // update is_completed in loan table if loan_amount = transaction table addition of amount of selected loan
    // get amount_paid from transaction table against given loan_id
    try {
      const ref = await getDocs(collection(db, "transactions"));
      const totalAmountPaid = ref.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((item: any) => item?.loan_id === loan_id)
        .reduce((acc, cur: any) => acc + parseInt(cur?.amount_paid), 0);
      const isDebtCompleted = totalAmountPaid === parseInt(loan_amount);
      if (isDebtCompleted) {
        updateLoanById({ loan_id, loan_status: true }, (status) => {
          console.log("status", status);
        });
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const getLoanDetailsById = async (loan_id: string) => {
    setLoanDetailsFetching(true);
    try {
      const querySnapshot = await getDocs(collection(db, "loan"));
      const loanData = querySnapshot.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter((item: any) => item?.id === loan_id)[0];
      setLoanDetails(loanData as LoanListModel);
      setLoanDetailsFetching(false);
      setLoanDetailsFetchErrorMsg("");
    } catch (error: any) {
      setLoanDetailsFetching(false);
      setLoanDetailsFetchErrorMsg(error?.message);
    }
  };

  return {
    listAllLoans,
    loanList,
    isLoanListFetching,
    loanListFetchErrorMsg,
    addNewLoan,
    updateLoanById,
    checkAndSettleUpLoan,
    getLoanDetailsById,
    loanDetails,
    loanDetailsFetching,
    loanDetailsFetchErrorMsg,
  };
};
