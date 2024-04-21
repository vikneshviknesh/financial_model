import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Modal,
} from "@mui/material";
import React from "react";

const CustomeLoader = ({
  isLoading,
  loaderStyle,
}: {
  isLoading: boolean;
  loaderStyle?: CircularProgressProps;
}) => {
  return (
    <Modal
      open={isLoading}
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box>
        <CircularProgress {...loaderStyle} />
      </Box>
    </Modal>
  );
};

export default CustomeLoader;
