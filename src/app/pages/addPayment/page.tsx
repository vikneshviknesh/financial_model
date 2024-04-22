"use client";

import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
// import { customerPaymentList } from "@/app/mockData/customers";
import Header from "@/app/components/Header";
import { useCustomerHooks } from "@/app/hooks/useCustomerHooks";
import { useSchemeHooks } from "@/app/hooks/useSchemeHooks";
import { loadInterestCalculate } from "@/app/utils/interestCalculator";
import UISupportWrapper from "@/app/components/UISupportWrapper";
import { useTransactionHooks } from "@/app/hooks/useTransactionHooks";

const initialValues = {
  customer_name: "",
  amount: "",
  customer_id: "",
  scheme_id: "",
  loan_id: "",
};

const validationSchema = Yup.object().shape({
  customer_name: Yup.string().required(),
  amount: Yup.string().required(),
});

const AddPayment = () => {
  const { customersList, listAllCustomers, isListFetching, listFetchErrorMsg } =
    useCustomerHooks();
  const { addTransactions } = useTransactionHooks();

  const { listAllScheme, schemeList } = useSchemeHooks();
  const [customerPaymentList, setCustomerPaymentList] = useState<
    {
      label: string;
      value: string;
      amount: string;
      customer_id: string;
      scheme_id: string;
      loan_id: string;
    }[]
  >([]);

  useEffect(() => {
    schemeList.length === 0 ? listAllScheme() : null;
    if (customersList.length > 0) {
      const formattedCustomerList = customersList.map((customer) => ({
        label: `${customer.customerName} - ${customer.mobileNumber}`,
        value: `${customer.customerName} - ${customer.mobileNumber}`,
        amount:
          loadInterestCalculate(customer?.interest_rate, customer?.amount) ||
          "0",
        customer_id: customer.customerId,
        scheme_id: customer.scheme_id,
        loan_id: customer.loan_id as string,
      }));
      setCustomerPaymentList(formattedCustomerList);
    } else if (schemeList.length > 0) {
      listAllCustomers(schemeList);
    }
  }, [customersList, schemeList]);

  const addPaymentForm = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (value: typeof initialValues) => {
      const updatedPayload = {
        customer_id: value.customer_id,
        scheme_id: value.scheme_id,
        amount_paid: value.amount,
        loan_id: value.loan_id,
      };
      updateTransactionInfo(updatedPayload);
    },
  });

  const updateTransactionInfo = (updatedPayload: {
    customer_id: string;
    scheme_id: string;
    amount_paid: string;
    loan_id: string;
  }) => {
    addTransactions(updatedPayload, (status: boolean) => {
      if (status) {
        alert("Success");
      } else {
        alert("Failure");
      }
    });
  };

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        // backgroundColor: "#d8c4ad",
      }}
    >
      <Header title=" Register a Payment" showBackBtn={false} />
      {isListFetching ? (
        <UISupportWrapper>
          <CircularProgress />
        </UISupportWrapper>
      ) : listFetchErrorMsg ? (
        <UISupportWrapper>
          <Typography>{listFetchErrorMsg}</Typography>
        </UISupportWrapper>
      ) : (
        <Container>
          <Box
            sx={{
              flex: 2,
              margin: "8px",
              borderRadius: "8px",
              padding: "12px",
              justifyContent: "center",
            }}
          >
            <FormControl fullWidth margin="dense">
              <Typography id="demo-simple-select-label">
                Customer Name
              </Typography>

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={customerPaymentList}
                fullWidth
                onChange={(e, value) => {
                  addPaymentForm.setValues({
                    ...addPaymentForm.values,
                    customer_name: value?.value as string,
                    amount: value?.amount as string,
                    customer_id: value?.customer_id as string,
                    scheme_id: value?.scheme_id as string,
                    loan_id: value?.loan_id as string,
                  });
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    value={addPaymentForm.values.customer_name}
                    placeholder="Select Customer"
                    sx={{
                      border: "1px solid #fff",
                      borderRadius: "8px",
                      mt: "8px",
                    }}
                  />
                )}
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <Typography id="demo-simple-amount-label">Amount</Typography>
              <TextField
                sx={{
                  border: "1px solid #fff",
                  color: "#fff",
                  borderRadius: "8px",
                  mt: "8px",
                }}
                type="number"
                value={addPaymentForm.values.amount}
                onChange={(e) =>
                  addPaymentForm.setFieldValue("amount", e.target.value)
                }
                placeholder="Amount"
                disabled
              />
            </FormControl>
            <Box sx={{ mt: "16px", textAlign: "center" }}>
              <Button
                onClick={addPaymentForm.submitForm}
                variant="outlined"
                sx={{ textTransform: "capitalize" }}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </Box>
  );
};

export default AddPayment;
