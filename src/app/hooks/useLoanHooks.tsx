"use client";
import { useState } from "react";
import { getDocs, collection } from "firebase/firestore";

import { db } from "../config/firebase";
import { LoanListModel } from "../model/loan";

export const useLoanHooks = () => {
  const [loanList, setLoanList] = useState<LoanListModel[]>([]);

  const [isLoanListFetching, setLoanListFetching] = useState(true);
  const [loanListFetchErrorMsg, setLoanListFetchErrorMsg] = useState("");

  const listAllLoans = async () => {
    setLoanListFetching(true);
    try {
      const querySnapshot = await getDocs(collection(db, "loan"));
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setLoanList(newData as LoanListModel[]);
      setLoanListFetchErrorMsg("");
      setLoanListFetching(false);
    } catch (error: any) {
      setLoanListFetching(false);
      setLoanListFetchErrorMsg(error?.message as string);
    }
  };

  return {
    listAllLoans,
    loanList,
    isLoanListFetching,
    loanListFetchErrorMsg,
  };
};
