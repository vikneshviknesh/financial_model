"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { TransactionModel } from "@/app/model/transactions";
import { Strings } from "@/app/utils/strings";

const LoanCard = (props: TransactionModel) => {
  const { created_at, customer_id, amount_paid, scheme_id, updated_at } = props;
  return (
    <Box className="card-container">
      <Box sx={{ display: "flex", flexDirection: "row", my: "8px" }}>
        <Typography fontWeight={"bold"}>{Strings.amountPaid}:</Typography>
        <Typography ml={"8px"}>{amount_paid}</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", my: "8px" }}>
        <Typography fontWeight={"bold"}>{Strings.createdOn}:</Typography>
        <Typography ml={"8px"}>{created_at}</Typography>
      </Box>
    </Box>
  );
};

export default LoanCard;
