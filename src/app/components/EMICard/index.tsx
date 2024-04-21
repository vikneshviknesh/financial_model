import React from "react";
import { Box, Typography } from "@mui/material";
import { Constants } from "@/app/utils/constants";

interface iProps {
  name: string;
  totalAmount: number;
  dueAmount: number;
  nextDueDate: string;
  mobileNumber: number;
}

const EMICard = (props: iProps) => {
  const { name, totalAmount, dueAmount, nextDueDate } = props;
  return (
    <Box className="card-container">
      <Typography fontSize={"18px"}>{name}</Typography>
      <Typography my={"8px"} fontSize={"14px"}>
        Total Amount: {`${Constants.currencySymbol} ${totalAmount}`}
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Typography fontSize={"14px"}>
          Due: {`${Constants.currencySymbol} ${dueAmount}`}
        </Typography>
        <Typography fontSize={"14px"}>Date: {nextDueDate}</Typography>
      </Box>
    </Box>
  );
};

export default EMICard;
