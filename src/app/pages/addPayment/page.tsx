"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
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
import { useLoanHooks } from "@/app/hooks/useLoanHooks";
import { CustomersListInterface } from "@/app/model/customers";

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
  const { getCustomersList } = useCustomerHooks();
  const { addTransactions } = useTransactionHooks();
  const { listAllScheme, schemeList } = useSchemeHooks();
  const { listAllLoans, loanList, isLoanListFetching, loanListFetchErrorMsg } =
    useLoanHooks();

  const autoC = useRef<any>(null);

  const [customersList, setCustomersList] = useState<CustomersListInterface[]>(
    []
  );

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
  [];
  const [snackbarData, setSnackbarData] = useState({
    visible: false,
    message: "",
  });

  useEffect(() => {
    schemeList.length === 0 ? listAllScheme() : null;
    loanList.length === 0 ? listAllLoans() : null;

    if (customersList.length > 0) {
      const formattedCustomerList = customersList.map((customer) => ({
        label: `${customer.customerName} - ${customer.mobileNumber}`,
        value: `${customer.customerName} - ${customer.mobileNumber}`,
        amount: "0",
        customer_id: customer.customerId,
        scheme_id: "",
        loan_id: "",
      }));
      setCustomerPaymentList(formattedCustomerList);
    } else {
      getCustomersList().then((response) => {
        setCustomersList(response as CustomersListInterface[]);
      });
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
        setSnackbarData({ visible: true, message: "Success" });
      } else {
        setSnackbarData({ visible: true, message: "Failure" });
      }
    });
  };

  const handleClose = () => {
    if (snackbarData.message === "Success") {
      addPaymentForm.resetForm();
      setTimeout(() => {
        const ele = autoC?.current?.getElementsByClassName(
          "MuiAutocomplete-clearIndicator"
        )[0];
        if (ele) ele.click();
      }, 50);
    }
    setSnackbarData({ visible: false, message: "" });
  };

  const updatedLoanList =
    loanList.filter(
      (item) => item.customer_id === addPaymentForm.values.customer_id
    ) || [];

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        height: "100vh",
      }}
    >
      <Header title=" Register a Payment" showBackBtn={false} />
      {isLoanListFetching ? (
        <UISupportWrapper>
          <CircularProgress />
        </UISupportWrapper>
      ) : loanListFetchErrorMsg ? (
        <UISupportWrapper>
          <Typography>{loanListFetchErrorMsg}</Typography>
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
                ref={autoC}
                id="combo-box-demo"
                options={customerPaymentList}
                fullWidth
                onChange={(e, value) => {
                  addPaymentForm.setValues({
                    ...addPaymentForm.values,
                    customer_name: value?.value as string,
                    customer_id: value?.customer_id as string,
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

            <FormControl fullWidth sx={{ mt: "8px" }}>
              <InputLabel id="demo-simple-select-label">Loan</InputLabel>
              <Select
                variant="outlined"
                label={"Loan"}
                value={addPaymentForm.values.loan_id}
                onChange={(e) => {
                  if (e.target.value !== "Select") {
                    const loanSelected =
                      updatedLoanList.filter(
                        (loan) => loan.id === e.target.value
                      )[0] || {};
                    if (Object.keys(loanSelected).length > 0) {
                      const interestRate =
                        schemeList.filter(
                          (item) => item.id === loanSelected.scheme_id
                        )[0]?.interest_rate || "0";
                      const amount =
                        loadInterestCalculate(
                          interestRate,
                          loanSelected?.loan_amount
                        ) || "0";
                      addPaymentForm.setValues({
                        ...addPaymentForm.values,
                        scheme_id: loanSelected?.scheme_id,
                        loan_id: loanSelected?.id,
                        amount,
                      });
                    }
                  }
                }}
              >
                {updatedLoanList.length > 0 ? (
                  updatedLoanList.map((loan) => (
                    <MenuItem value={loan.id} key={loan.id}>
                      {loan.loan_amount}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value={"Select"}>Select</MenuItem>
                )}
              </Select>
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
      <Snackbar
        open={snackbarData.visible}
        autoHideDuration={1000}
        onClose={handleClose}
        message={snackbarData.message}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Box>
  );
};

export default AddPayment;
