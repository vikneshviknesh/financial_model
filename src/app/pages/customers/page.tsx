"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Modal,
  TableContainer,
  Typography,
} from "@mui/material";
import AddCircle from "@mui/icons-material/AddCircle";

import Header from "@/app/components/Header";
import CustomerCard from "@/app/components/CustomerCard";
import CreateCustomerForm from "@/app/components/CreateCustomerForm";
import { useCustomerHooks } from "@/app/hooks/useCustomerHooks";
import { Strings } from "@/app/utils/strings";
import UISupportWrapper from "@/app/components/UISupportWrapper";

const CustomersList = () => {
  const { listAllCustomers, customersList, isListFetching, listFetchErrorMsg } =
    useCustomerHooks();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (state: "refresh" | "" = "") => {
    if (state === "refresh") {
      listAllCustomers([]);
    }
    setOpen(false);
  };

  useEffect(() => {
    listAllCustomers([]);
  }, []);

  return (
    <>
      <Header title="Customers" showBackBtn={false} />
      <TableContainer sx={{ maxHeight: "725px" }}>
        {isListFetching ? (
          <UISupportWrapper>
            <CircularProgress />
          </UISupportWrapper>
        ) : listFetchErrorMsg ? (
          <UISupportWrapper>
            <Typography>{listFetchErrorMsg}</Typography>
          </UISupportWrapper>
        ) : customersList.length === 0 ? (
          <UISupportWrapper>
            <Typography>{Strings.noCustomerData}</Typography>
          </UISupportWrapper>
        ) : (
          <Box sx={{ flex: 1 }}>
            {customersList.map((customer) => (
              <CustomerCard
                name={customer.customerName}
                mobileNumber={customer.mobileNumber}
                address={customer.address}
                key={customer.mobileNumber}
              />
            ))}
          </Box>
        )}
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
          // onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CreateCustomerForm closeForm={handleClose} />
          </Box>
        </Modal>
      </TableContainer>
    </>
  );
};

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

export default CustomersList;
