"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Container,
  Modal,
  Typography,
} from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";

import { useTransactionHooks } from "@/app/hooks/useTransactionHooks";
import Header from "@/app/components/Header";
import UISupportWrapper from "@/app/components/UISupportWrapper";
import { Strings } from "@/app/utils/strings";
import { useSearchParams } from "next/navigation";
import TransactionCard from "@/app/components/TransactionCard";
import { useCustomerHooks } from "@/app/hooks/useCustomerHooks";
import CreateNewLoanForm from "@/app/components/CreateNewLoanForm";

function CustomerDetails() {
  const searchParams = useSearchParams();
  const { listCustomerLoans, loanList, isFetching, loanInfoFetchErrorMsg } =
    useTransactionHooks();

  const { getCustomerInfoByID } = useCustomerHooks();
  const customerID = searchParams.get("id") as string;

  const [open, setOpen] = useState(false);
  const [customerName, setCustomerName] = useState("");

  const [customerFormValues, setCustomerFormValues] = useState({
    customer_id: customerID,
    scheme_id: "",
    amount: "",
    interest_rate: "",
  });

  const handleOpen = () => setOpen(true);

  const handleClose = (state: "refresh" | "" = "") => {
    if (state === "refresh") {
      listCustomerLoans(customerID as string);
    }
    setOpen(false);
  };

  useEffect(() => {
    if (customerID !== "" && customerID !== undefined && customerID !== null) {
      listCustomerLoans(customerID as string);
      getCustomerInfoByID(customerID).then((response: any) => {
        setCustomerName(response?.customerName);
      });
    }
  }, []);

  return (
    <>
      <Header
        title="Customer Loan Details"
        showBackBtn={true}
        showUserCircle={false}
      />

      <Container>
        <Box
          sx={{
            alignSelf: "flex-start",
            display: "inline-block",
            marginLeft: "16px",
            marginTop: "8px",
            padding: "8px",
            paddingRight: "12px",
            backgroundColor: "#bce45c",
            color: "#000",
            borderRadius: "8px",
            borderTopRightRadius: "50px",
            borderBottomRightRadius: "50px",
          }}
        >
          <Typography>{customerName}</Typography>
        </Box>
        {isFetching ? (
          <UISupportWrapper>
            <CircularProgress />
          </UISupportWrapper>
        ) : loanInfoFetchErrorMsg ? (
          <UISupportWrapper>
            <Typography>{loanInfoFetchErrorMsg}</Typography>
          </UISupportWrapper>
        ) : loanList.length === 0 ? (
          <UISupportWrapper>
            <Typography>{Strings.noLoanData}</Typography>
          </UISupportWrapper>
        ) : (
          <Box sx={{ flex: 1 }}>
            {loanList.map((loanInfo) => (
              <TransactionCard
                created_at={loanInfo.created_at}
                customer_id={loanInfo.customer_id}
                id={loanInfo.id}
                loan_amount={loanInfo.loan_amount}
                scheme_id={loanInfo.scheme_id}
                updated_at={loanInfo.updated_at}
              />
            ))}
          </Box>
        )}
      </Container>

      <AddCircle
        sx={{
          fontSize: "48px",
          position: "fixed",
          right: "16px",
          bottom: "10%",
          color: "#24706f",
        }}
        onClick={handleOpen}
      />
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <CreateNewLoanForm
            initialValues={customerFormValues}
            closeForm={handleClose}
          />
        </Box>
      </Modal>
    </>
  );
}

export default CustomerDetails;

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  backgroundColor: "#fff",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  borderRadius: "8px",
};
