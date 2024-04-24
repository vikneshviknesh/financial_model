"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { LoanModel } from "@/app/model/transactions";
import { useRouter } from "next/navigation";

const LoanCard = (props: LoanModel) => {
  const router = useRouter();

  const {
    created_at,
    customer_id,
    id: loan_id,
    loan_amount,
    scheme_id,
    updated_at,
  } = props;
  return (
    <Box
      className="card-container"
      onClick={() => {
        router.push(`/pages/admin/CustomerDetails/LoanDetails?id=${loan_id}`);
      }}
    >
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

export default LoanCard;
