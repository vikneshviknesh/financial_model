"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  doc,
  setDoc,
  getDocs,
  collection,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "../config/firebase";
import {
  CustomersListInterface,
  CreateCustomerInterface,
} from "../model/customers";
import { currentDateTime } from "../utils/date";
import { loadInterestCalculate } from "../utils/interestCalculator";
import { useTransactionHooks } from "./useTransactionHooks";
import { AddNewLoanModel } from "../model/transactions";
import { useLoanHooks } from "./useLoanHooks";

export const useCustomerHooks = () => {
  const { addTransactions } = useTransactionHooks();
  const { addNewLoan, checkAndSettleUpLoan } = useLoanHooks();

  const [customerCreateErrorMsg, setCustomerCreateErrorMsg] = useState("");
  const [customersList, setCustomersList] = useState<CustomersListInterface[]>(
    []
  );
  const [isLoading, setLoading] = useState(false);
  const [isListFetching, setIsListFetching] = useState(true);
  const [listFetchErrorMsg, setListFetchErrorMsg] = useState("");

  // Add New Loan State
  const [newLoadAdding, setNewLoadAdding] = useState(false);
  const [newLoadnAddErrorMsg, setNewLoadnAddErrorMsg] = useState("");

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
      await setDoc(userRef, payload);
      const loadPayload = {
        customer_id: customerId,
        scheme_id: userInfo.scheme_id,
        amount: userInfo.amount,
        interest_rate: userInfo.interest_rate,
      };
      addNewLoanToCustomer(loadPayload)
        .then(() => {
          setCustomerCreateErrorMsg("");
          setLoading(false);
          resolve("success");
        })
        .catch((error) => {
          setLoading(false);
          setCustomerCreateErrorMsg(error?.message as string);
          reject("failure");
        });
    });
  };

  const listAllCustomers = async (schemeList: any[]) => {
    setIsListFetching(true);
    try {
      const customersSnapshot = await getDocs(collection(db, "customers"));
      let customerList: any[] = [];

      customersSnapshot.docs.forEach(async (customerDoc, index) => {
        const customerData = customerDoc.data();
        const customer_id = customerData.customerId;
        const loanRef = await getDocs(collection(db, "loan"));
        const loanData: any = loanRef.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .filter((item: any) => item?.customer_id === customer_id);

        if (loanData.length > 0) {
          // Merge loan data into customer data
          const scheme_data =
            schemeList.length > 0
              ? schemeList.filter(
                  (scheme) => scheme.id === loanData[0].scheme_id
                )[0]
              : [];
          const updatedCustomerData = {
            ...customerData,
            amount: loanData[0].loan_amount,
            scheme_id: loanData[0].scheme_id,
            loan_id: loanData[0].id,
            interest_rate: scheme_data?.interest_rate || "",
          };
          // Update customer document
          customerList.push(updatedCustomerData);
          if (index === customersSnapshot.docs.length - 1) {
            setCustomersList(customerList);
          }
        }
      });

      setListFetchErrorMsg("");
      setIsListFetching(false);
    } catch (error: any) {
      setIsListFetching(false);
      setListFetchErrorMsg(error?.message as string);
    }
  };

  const getCustomerInfoByID = async (customerID: string) => {
    return new Promise(async (resolve, reject) => {
      try {
        const ref = await getDocs(collection(db, "customers"));
        const newData = ref.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .filter((item: any) => item?.customerId === customerID);
        resolve(newData[0] as CustomersListInterface);
      } catch (error: any) {
        console.log("listCustomerLoans error", error);
        reject(error?.toString());
      }
    });
  };

  const addNewLoanToCustomer = (newLoan: AddNewLoanModel) => {
    return new Promise(async (resolve, reject) => {
      setNewLoadAdding(true);
      try {
        addNewLoan(
          {
            customer_id: newLoan.customer_id,
            scheme_id: newLoan.scheme_id,
            loan_amount: newLoan.amount,
          },
          (status: boolean, loan_id: string) => {
            if (status) {
              const paymentToAdd = loadInterestCalculate(
                newLoan.interest_rate,
                newLoan.amount
              );
              const updatedPayload = {
                customer_id: newLoan.customer_id,
                scheme_id: newLoan.scheme_id,
                amount_paid: paymentToAdd,
                loan_id,
              };
              addTransactions(
                updatedPayload,
                newLoan.amount,
                (status: boolean) => {
                  if (status) {
                    setNewLoadnAddErrorMsg("");
                    setNewLoadAdding(false);
                    resolve("success");
                  }
                }
              );
            }
          }
        );
      } catch (error: any) {
        setNewLoadAdding(false);
        setNewLoadnAddErrorMsg(error?.message as string);
        reject("failure");
      }
    });
  };

  const getCustomersList = () => {
    return new Promise(async (resolve, reject) => {
      try {
        const customerCollection = collection(db, "customers");
        const querySnapshot = await getDocs(
          query(customerCollection, orderBy("created_at", "asc"))
        );
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        resolve(newData);
      } catch (error: any) {
        reject(error);
      }
    });
  };

  return {
    isLoading,
    addNewCustomer,
    customerCreateErrorMsg,
    listAllCustomers,
    customersList,
    isListFetching,
    listFetchErrorMsg,
    getCustomerInfoByID,
    addNewLoanToCustomer,
    newLoadAdding,
    newLoadnAddErrorMsg,
    getCustomersList,
  };
};
