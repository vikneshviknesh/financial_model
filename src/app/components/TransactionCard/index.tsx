"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { TransactionModel } from "@/app/model/transactions";

const TransactionCard = (props: TransactionModel) => {
  const { created_at, customer_id, id, loan_amount, scheme_id, updated_at } =
    props;
  return (
    <Box className="card-container">
      <Box sx={{ display: "flex", flexDirection: "row", my: "8px" }}>
        <Typography fontWeight={"bold"}>Loan Amount:</Typography>
        <Typography ml={"8px"}>{loan_amount}</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", my: "8px" }}>
        <Typography fontWeight={"bold"}>Created On:</Typography>
        <Typography ml={"8px"}>{created_at}</Typography>
      </Box>
    </Box>
  );
};

export default TransactionCard;
