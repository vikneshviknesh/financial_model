import React, { useEffect } from "react";
import { Container, Typography } from "@mui/material";

import { useAuthHooks } from "@/app/hooks/useAuthHooks";
import UISupportWrapper from "../UISupportWrapper";
import Link from "next/link";

const withAuth = (Component: any) => {
  const AuthenticatedComponent = () => {
    const { checkIsLoggedIn, isLoggedIn, checkingLogin } = useAuthHooks();

    useEffect(() => {
      checkIsLoggedIn();
    }, []);

    if (checkingLogin) {
      return (
        <UISupportWrapper
          style={{ height: "100vh", backgroundColor: "#e0e5cf" }}
        >
          <Typography>Loading...</Typography>
        </UISupportWrapper>
      );
    }

    if (isLoggedIn) {
      return <Component />;
    }
    return (
      <Container
        disableGutters
        sx={{
          display: "flex",
          height: "100vh",
          backgroundColor: "#e0e5cf",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Link
          style={{
            textDecorationLine: "underline",
            textDecorationColor: "#289aee",
            fontSize: "24px",
            color: "#094a7a",
          }}
          href="/"
        >
          Click to Login
        </Link>
      </Container>
    );
  };
  return AuthenticatedComponent;
};

export default withAuth;
