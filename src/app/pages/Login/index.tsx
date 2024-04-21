"use client";

import { useEffect, useState } from "react";

import { useAuthHooks } from "../../hooks/useAuthHooks";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import { Strings } from "@/app/utils/strings";
import CustomeLoader from "@/app/components/CustomeLoader";

export default function Login() {
  const { isLoading, isLoggedIn, loginUser, userLoginErrorMsg } =
    useAuthHooks();

  const router = useRouter();

  const [userInfo, setUserInfo] = useState({
    email: "star.v.vigneshwaran@gmail.com",
    password: "Test@123",
  });

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/pages/admin");
    }
  }, [isLoggedIn]);

  return (
    <Container
      sx={{
        flex: 1,
        display: "flex",
        height: "100vh",
        backgroundColor: "#000",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Card sx={{ minHeight: "45%" }}>
        <Box sx={{ mt: "16px" }}>
          <Typography
            sx={{
              fontSize: "24px",
              color: "#000",
              textAlign: "center",
            }}
          >
            {Strings.login}
          </Typography>
        </Box>
        <CardContent>
          <>
            <FormControl fullWidth margin="dense">
              <Typography>{Strings.email}</Typography>
              <TextField
                type="email"
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    email: e.target.value,
                  })
                }
                sx={{ mt: "8px" }}
                placeholder="Email ID"
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <Typography>{Strings.password}</Typography>
              <TextField
                type="password"
                value={userInfo.password}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    password: e.target.value,
                  })
                }
                sx={{ mt: "8px" }}
                placeholder="Password"
              />
            </FormControl>

            {isLoading ? (
              <Typography style={{ color: "#000" }}>
                {Strings.loading}
              </Typography>
            ) : null}
            {userLoginErrorMsg !== "" ? (
              <Typography style={{ color: "#000" }}>
                {userLoginErrorMsg}
              </Typography>
            ) : null}
          </>

          <Box sx={{ mt: "24px", textAlign: "center" }}>
            <Button
              onClick={() => {
                loginUser(userInfo);
              }}
              variant="outlined"
              sx={{ textTransform: "capitalize" }}
              disabled={isLoading}
            >
              {isLoading ? Strings.pleaseWait : Strings.login}
            </Button>
          </Box>
        </CardContent>
      </Card>
      <CustomeLoader isLoading={isLoading} />
    </Container>
  );
}
