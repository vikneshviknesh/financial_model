import React from "react";
import { Box } from "@mui/material";

const UISupportWrapper = ({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: any;
}) => {
  return (
    <Box
      sx={{
        flex: 1,
        minHeight: "calc(100vh - 64px - 56px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
        ...style,
      }}
    >
      {children}
    </Box>
  );
};

export default UISupportWrapper;
