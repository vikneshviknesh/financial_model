import React, { useEffect } from "react";
import {
  Box,
  Button,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useCustomerHooks } from "@/app/hooks/useCustomerHooks";
import { useSchemeHooks } from "@/app/hooks/useSchemeHooks";
import { Strings } from "@/app/utils/strings";

const initialValues = {
  customerName: "",
  mobileNumber: "",
  address: "",
  interest_rate: "",
  amount: "",
  scheme_id: "",
};

const addCustomerScheme = Yup.object().shape({
  customerName: Yup.string().required(),
  mobileNumber: Yup.string().required(),
  address: Yup.string().required(),
});

interface iProps {
  closeForm: (state: "refresh" | "") => void;
}

function CreateCustomerForm({ closeForm }: iProps) {
  const { listAllScheme, schemeList } = useSchemeHooks();

  const { isLoading, addNewCustomer, customerCreateErrorMsg } =
    useCustomerHooks();

  useEffect(() => {
    if (schemeList.length === 0) {
      listAllScheme();
    }
  }, [schemeList]);

  const customerForm = useFormik({
    initialValues,
    validationSchema: addCustomerScheme,
    onSubmit: (values: typeof initialValues) => {
      addNewCustomer(values)
        .then((response) => {
          closeForm("refresh");
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  });

  return (
    <Box sx={{ color: "#000" }}>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography
          sx={{
            flex: 1,
            textAlign: "center",
            fontSize: "20px",
            fontWeight: "bold",
          }}
        >
          Add Customer
        </Typography>
        <HighlightOffIcon onClick={() => closeForm("")} />
      </Box>
      <Divider sx={{ my: "8px" }} />
      <>
        <FormControl fullWidth margin="dense">
          <TextField
            label={Strings.customerName}
            sx={{
              border: "1px solid #fff",
              color: "#fff",
              borderRadius: "8px",
              mt: "8px",
            }}
            variant="outlined"
            type="text"
            value={customerForm.values.customerName}
            onChange={(e) =>
              customerForm.setFieldValue("customerName", e.target.value)
            }
          />
        </FormControl>

        <FormControl fullWidth margin="dense">
          <TextField
            label={Strings.mobileNo}
            sx={{
              border: "1px solid #fff",
              color: "#fff",
              borderRadius: "8px",
              mt: "8px",
            }}
            variant="outlined"
            type="number"
            value={customerForm.values.mobileNumber}
            onChange={(e) =>
              customerForm.setFieldValue("mobileNumber", e.target.value)
            }
            inputProps={{ maxLength: 10 }}
          />
        </FormControl>

        <FormControl fullWidth margin="dense">
          <TextField
            label={Strings.address}
            sx={{
              border: "1px solid #fff",
              color: "#fff",
              borderRadius: "8px",
              mt: "8px",
            }}
            variant="outlined"
            type="text"
            value={customerForm.values.address}
            onChange={(e) =>
              customerForm.setFieldValue("address", e.target.value)
            }
          />
        </FormControl>

        <FormControl fullWidth sx={{ mt: "8px" }}>
          <InputLabel id="demo-simple-select-label">
            {Strings.interestRate}
          </InputLabel>
          <Select
            variant="outlined"
            label={Strings.interestRate}
            value={customerForm.values.interest_rate}
            onChange={(e) => {
              const schemeSelected =
                schemeList.filter(
                  (scheme) => scheme.interest_rate === e.target.value
                )[0] || {};
              if (Object.keys(schemeSelected).length > 0) {
                customerForm.setValues({
                  ...customerForm.values,
                  scheme_id: schemeSelected?.id,
                  interest_rate: schemeSelected?.interest_rate,
                });
              }
            }}
          >
            {schemeList.map((scheme) => (
              <MenuItem value={scheme.interest_rate} key={scheme.id}>
                {scheme.interest_rate}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth margin="dense">
          <TextField
            sx={{
              border: "1px solid #fff",
              color: "#fff",
              borderRadius: "8px",
              mt: "8px",
            }}
            label={Strings.amount}
            variant="outlined"
            type="number"
            value={customerForm.values.amount}
            onChange={(e) =>
              customerForm.setFieldValue("amount", e.target.value)
            }
          />
        </FormControl>

        <Box
          sx={{ mt: "16px", textAlign: "center" }}
          onClick={customerForm.submitForm}
        >
          <Button variant="outlined" sx={{ textTransform: "capitalize" }}>
            Submit
          </Button>
        </Box>
      </>
      {isLoading ? <p style={{ color: "#000" }}>{Strings.loading}</p> : null}
      {customerCreateErrorMsg !== "" ? (
        <p style={{ color: "#000" }}>{customerCreateErrorMsg}</p>
      ) : null}
    </Box>
  );
}

export default CreateCustomerForm;
