"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  addDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "../config/firebase";
import {
  CustomersListInterface,
  CreateCustomerInterface,
} from "../model/customers";
import { currentDateTime } from "../utils/date";
import { loadInterestCalculate } from "../utils/interestCalculator";
import { useTransactionHooks } from "./useTransactionHooks";

export const useCustomerHooks = () => {
  const { addTransactions, updateToLoan } = useTransactionHooks();

  const [customerCreateErrorMsg, setCustomerCreateErrorMsg] = useState("");
  const [customersList, setCustomersList] = useState<CustomersListInterface[]>(
    []
  );
  const [isLoading, setLoading] = useState(false);
  const [isListFetching, setIsListFetching] = useState(true);
  const [listFetchErrorMsg, setListFetchErrorMsg] = useState("");

  const addNewCustomer = (userInfo: CreateCustomerInterface) => {
    return new Promise(async (resolve, reject) => {
      setLoading(true);
      const customerId = uuidv4();
      const payload = {
        customerId,
        customerName: userInfo.customerName,
        mobileNumber: userInfo.mobileNumber,
        address: userInfo.address,
        created_at: currentDateTime,
        updated_at: currentDateTime,
      };
      const userRef = doc(db, "customers", customerId);
      try {
        await setDoc(userRef, payload);
        updateToLoan(
          {
            customer_id: customerId,
            scheme_id: userInfo.scheme_id,
            loan_amount: userInfo.amount,
          },
          (status: boolean, loan_id: string) => {
            if (status) {
              const paymentToAdd = loadInterestCalculate(
                userInfo.interest_rate,
                userInfo.amount
              );
              const updatedPayload = {
                customer_id: customerId,
                scheme_id: userInfo.scheme_id,
                amount_paid: paymentToAdd,
                loan_id,
              };
              addTransactions(updatedPayload, (status: boolean) => {
                if (status) {
                  setCustomerCreateErrorMsg("");
                  setLoading(false);
                  resolve("success");
                }
              });
            }
          }
        );
      } catch (error: any) {
        setLoading(false);
        setCustomerCreateErrorMsg(error?.message as string);
        reject("failure");
      }
    });
  };

  const listAllCustomers = async (schemeList: any[]) => {
    setIsListFetching(true);
    try {
      const loansSnapshot = await getDocs(collection(db, "loan"));
      let customerList: any[] = [];
      // let customerList = querySnapshot.docs.map((doc) => ({
      //   ...doc.data(),
      //   id: doc.id,
      // }));
      loansSnapshot.docs.forEach(async (loanDoc, index) => {
        const loanData = loanDoc.data();
        const customerId = loanData.customer_id;
        const customerRef = await doc(db, "customers", customerId);
        const customerData = await getDoc(customerRef);

        // Update customer document with loan data
        if (customerData.id !== "") {
          // Merge loan data into customer data
          const scheme_data =
            schemeList.length > 0
              ? schemeList.filter(
                  (scheme) => scheme.id === loanData.scheme_id
                )[0]
              : [];
          const updatedCustomerData = {
            ...customerData.data(),
            amount: loanData.loan_amount,
            scheme_id: loanData.scheme_id,
            loan_id: loanDoc.id,
            interest_rate: scheme_data?.interest_rate || "",
          };
          // Update customer document
          customerList.push(updatedCustomerData);
          if (index === loansSnapshot.docs.length - 1) {
            setCustomersList(customerList);
          }
        } else {
          console.log(`Customer ${customerId} not found.`);
        }
      });

      // setCustomersList(newData as CustomersListInterface[]);
      setListFetchErrorMsg("");
      setIsListFetching(false);
    } catch (error: any) {
      setIsListFetching(false);
      setListFetchErrorMsg(error?.message as string);
    }
  };

  return {
    isLoading,
    addNewCustomer,
    customerCreateErrorMsg,
    listAllCustomers,
    customersList,
    isListFetching,
    listFetchErrorMsg,
  };
};
