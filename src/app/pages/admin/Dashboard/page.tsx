"use client";

import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";

import EMICard from "@/app/components/EMICard";
import Header from "@/app/components/Header";
import { emiData } from "@/app/mockData/emiData";
import { useAuthHooks } from "@/app/hooks/useAuthHooks";
import withAuth from "@/app/components/AuthGuardProvider";

function Dashboard() {
  const { getLoggedInUserInfo, userData } = useAuthHooks();

  const userName = userData.displayName || "User";

  useEffect(() => {
    getLoggedInUserInfo();
  }, []);

  return (
    <Container disableGutters sx={{ height: "100vh" }}>
      <Header title={`Welcome ${userName}`} showBackBtn={false} />
      <Box sx={{ paddingBottom: "50px" }}>
        {emiData.map((emi) => (
          <EMICard
            dueAmount={emi.dueAmount}
            mobileNumber={emi.mobileNumber}
            name={emi.name}
            nextDueDate={emi.nextDueDate}
            totalAmount={emi.totalAmount}
            key={emi.id}
          />
        ))}
      </Box>
    </Container>
  );
}

export default withAuth(Dashboard);
