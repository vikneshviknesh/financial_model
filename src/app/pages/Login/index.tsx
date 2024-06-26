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
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import { Strings } from "@/app/utils/strings";
import CustomeLoader from "@/app/components/CustomeLoader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

export default function Login() {
  const { isLoading, isLoggedIn, loginUser, userLoginErrorMsg } =
    useAuthHooks();

  const [showPassword, setShowPassword] = useState(false);

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

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const isValidForm =
    userInfo.email !== "" &&
    userInfo.password !== "" &&
    userInfo.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);

  return (
    <Container
      sx={{
        flex: 1,
        display: "flex",
        height: "100vh",
        backgroundColor: "#b9d893",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "16px",
      }}
      disableGutters
    >
      <Card
        sx={{
          minHeight: "45%",
          backgroundColor: "#e0e5cf",
          maxWidth: "500px !important",
          borderRadius: "12px",
        }}
      >
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
              <TextField
                type="email"
                variant="outlined"
                label={Strings.email}
                value={userInfo.email}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    email: e.target.value,
                  })
                }
                sx={{ mt: "8px" }}
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <TextField
                variant="outlined"
                label={Strings.password}
                type={showPassword ? "text" : "password"}
                value={userInfo.password}
                onChange={(e) =>
                  setUserInfo({
                    ...userInfo,
                    password: e.target.value,
                  })
                }
                sx={{ mt: "8px" }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      {showPassword ? (
                        <VisibilityOffIcon onClick={togglePassword} />
                      ) : (
                        <VisibilityIcon onClick={togglePassword} />
                      )}
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>

            {isLoading ? (
              <Typography style={{ color: "#000" }}>
                {Strings.loading}
              </Typography>
            ) : null}
            {userLoginErrorMsg !== "" ? (
              <Typography style={{ color: "#d92324", marginTop: "12px" }}>
                {userLoginErrorMsg}
              </Typography>
            ) : null}
          </>

          <Box sx={{ mt: "24px", textAlign: "center" }}>
            <Button
              onClick={() => {
                if (isValidForm) {
                  loginUser(userInfo);
                } else {
                  alert("Fix the issues and try again");
                }
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
