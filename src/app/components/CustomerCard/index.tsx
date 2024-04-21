import React from "react";
import { Box, Typography } from "@mui/material";

interface iProps {
  name: string;
  mobileNumber: string;
  address: string;
}

const CustomerCard = (props: iProps) => {
  const { name, mobileNumber, address } = props;
  return (
    <Box className="card-container">
      <Typography fontSize={"22px"}>{name}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", my: "8px" }}>
        <Typography fontWeight={"bold"}>Mobile Number:</Typography>
        <Typography ml={"8px"}>{mobileNumber}</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", my: "8px" }}>
        <Typography fontWeight={"bold"}>Address:</Typography>
        <Typography ml={"8px"}>{address}</Typography>
      </Box>
    </Box>
  );
};

export default CustomerCard;
