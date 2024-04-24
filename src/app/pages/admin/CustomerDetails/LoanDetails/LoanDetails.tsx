"use client";

import React, { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";

import { useTransactionHooks } from "@/app/hooks/useTransactionHooks";
import Header from "@/app/components/Header";
import UISupportWrapper from "@/app/components/UISupportWrapper";
import { Strings } from "@/app/utils/strings";
import { useSearchParams } from "next/navigation";
import withAuth from "@/app/components/AuthGuardProvider";
import { isValidString } from "@/app/utils";
import TransactionCard from "@/app/components/LoanCard";
import { useLoanHooks } from "@/app/hooks/useLoanHooks";
import CustomeLoader from "@/app/components/CustomeLoader";

function LoanDetails() {
  const searchParams = useSearchParams();
  const {
    listTransactionsByLoanId,
    transactionsList,
    isTransactionsFetching,
    transactionsListFetchErrorMsg,
  } = useTransactionHooks();
  const { getLoanDetailsById, loanDetails, loanDetailsFetching } =
    useLoanHooks();

  const loanId = searchParams.get("id") as string;

  useEffect(() => {
    if (isValidString(loanId)) {
      listTransactionsByLoanId(loanId as string);
      getLoanDetailsById(loanId as string);
    }
  }, [loanId]);

  return (
    <>
      <Header
        title="Transaction Details"
        showBackBtn={true}
        showUserCircle={false}
      />

      <Container
        sx={{
          minHeight: "calc(100vh -  56px)",
          maxHeight: "calc(100vh -  56px)",
          overflow: "auto",
        }}
      >
        {Object.keys(loanDetails).length > 0 ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                alignSelf: "center",
                display: "inline-block",
                marginLeft: "16px",
                marginTop: "16px",
                padding: "16px",
                backgroundColor: "#74b4ac",
                borderRadius: "8px",
                color: "#000",
              }}
            >
              <Typography>Total Amount: {loanDetails.loan_amount}</Typography>
              <Typography>
                Loan Status:{" "}
                {loanDetails.is_completed ? "Completed" : "On going"}
              </Typography>
            </Box>
          </Box>
        ) : null}

        {isTransactionsFetching || loanDetailsFetching ? (
          <CustomeLoader
            isLoading={isTransactionsFetching || loanDetailsFetching}
          />
        ) : transactionsListFetchErrorMsg ? (
          <UISupportWrapper>
            <Typography>{transactionsListFetchErrorMsg}</Typography>
          </UISupportWrapper>
        ) : transactionsList.length === 0 ? (
          <UISupportWrapper>
            <Typography>{Strings.noLoanData}</Typography>
          </UISupportWrapper>
        ) : (
          <Box sx={{ flex: 1 }}>
            {transactionsList.map((transaction) => (
              <TransactionCard
                created_at={transaction.created_at}
                customer_id={transaction.customer_id}
                amount_paid={transaction.amount_paid}
                scheme_id={transaction.scheme_id}
                updated_at={transaction.updated_at}
                loan_id={transaction.loan_id}
                key={transaction.loan_id}
              />
            ))}
          </Box>
        )}
      </Container>
    </>
  );
}

export default withAuth(LoanDetails);
