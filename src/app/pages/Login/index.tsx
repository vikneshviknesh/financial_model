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
  TextField,
  Typography,
} from "@mui/material";
import { Strings } from "@/app/utils/strings";
import CustomeLoader from "@/app/components/CustomeLoader";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import * as Yup from "yup";
import { useFormik } from "formik";
import { isValidString } from "@/app/utils";

const initialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Enter valid Email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const { isLoggedIn, loginUser, userLoginErrorMsg } = useAuthHooks();

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const loginForm = useFormik({
    initialValues,
    validateOnChange: true,
    validationSchema,
    onSubmit: (values: typeof initialValues) => {
      setLoading(true);
      loginUser(values);
    },
  });

  useEffect(() => {
    if (isValidString(userLoginErrorMsg)) {
      setLoading(false);
    }
  }, [userLoginErrorMsg]);

  useEffect(() => {
    if (isLoggedIn) {
      setLoading(false);
      router.push("/pages/admin");
    }
  }, [isLoggedIn]);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

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
                value={loginForm.values.email}
                onChange={(e) =>
                  loginForm.setFieldValue("email", e.target.value)
                }
                sx={{ mt: "8px" }}
                error={
                  isValidString(loginForm.errors.email) &&
                  loginForm.touched.email
                }
                helperText={
                  isValidString(loginForm.errors.email) &&
                  loginForm.touched.email
                    ? loginForm.errors.email
                    : ""
                }
              />
            </FormControl>
            <FormControl fullWidth margin="dense">
              <TextField
                variant="outlined"
                label={Strings.password}
                type={showPassword ? "text" : "password"}
                value={loginForm.values.password}
                onChange={(e) =>
                  loginForm.setFieldValue("password", e.target.value)
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
                error={
                  isValidString(loginForm.errors.password) &&
                  loginForm.touched.password
                }
                helperText={
                  isValidString(loginForm.errors.password) &&
                  loginForm.touched.password
                    ? loginForm.errors.password
                    : ""
                }
              />
            </FormControl>
            {userLoginErrorMsg !== "" ? (
              <Typography style={{ color: "#d92324", marginTop: "12px" }}>
                {userLoginErrorMsg}
              </Typography>
            ) : null}
          </>

          <Box sx={{ mt: "24px", textAlign: "center" }}>
            <Button
              onClick={() => {
                loginForm.handleSubmit();
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
