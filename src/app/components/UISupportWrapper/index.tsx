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
        height: "90%",
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
