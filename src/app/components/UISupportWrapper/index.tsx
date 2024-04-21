import React from "react";
import { Box } from "@mui/material";

const UISupportWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box
      sx={{
        flex: 1,
        height: "90%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      {children}
    </Box>
  );
};

export default UISupportWrapper;
