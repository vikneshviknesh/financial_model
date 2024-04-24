"use client";
import React from "react";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Strings } from "@/app/utils/strings";

interface iProps {
  name: string;
  mobileNumber: string;
  address: string;
  id: string;
}

const CustomerCard = (props: iProps) => {
  const router = useRouter();
  const { name, mobileNumber, address, id } = props;
  return (
    <Box
      className="card-container"
      onClick={() => {
        console.log(id);
        router.push(`/pages/admin/CustomerDetails?id=${id}`);
      }}
    >
      <Typography fontSize={"22px"}>{name}</Typography>
      <Box sx={{ display: "flex", flexDirection: "row", my: "8px" }}>
        <Typography fontWeight={"bold"}>{Strings.mobileNo}:</Typography>
        <Typography ml={"8px"}>{mobileNumber}</Typography>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", my: "8px" }}>
        <Typography fontWeight={"bold"}>{Strings.address}:</Typography>
        <Typography ml={"8px"}>{address}</Typography>
      </Box>
    </Box>
  );
};

export default CustomerCard;
