"use client";

import React, { SyntheticEvent, useState } from "react";
import {
  Box,
  Container,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HomeIcon from "@mui/icons-material/Home";
import PersonPinIcon from "@mui/icons-material/PersonPin";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import Dashboard from "./Dashboard/page";
import AddPayment from "../addPayment/page";
import CustomersList from "../customers/page";
import LuckyDrawContest from "../luckyDrawContest/page";
import withAuth from "@/app/components/AuthGuardProvider";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
      // style={{ maxHeight: "250px" }}
    >
      {value === index && children ? children : null}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function Admin() {
  const [value, setValue] = useState(0);

  const handleChange = (_event: SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Container disableGutters sx={{ maxWidth: "500px !important" }}>
      <CustomTabPanel value={value} index={0}>
        <LuckyDrawContest />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <AddPayment />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <CustomersList />
      </CustomTabPanel>

      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        className="tab-container"
        sx={{ maxWidth: "500px !important", height: "7vh" }}
      >
        <Tab
          icon={<HomeIcon sx={{ fontSize: "42px" }} />}
          aria-label="home"
          {...a11yProps(0)}
        />
        <Tab
          icon={<AddCircleOutlineIcon sx={{ fontSize: "42px" }} />}
          aria-label="add-payment"
          {...a11yProps(1)}
        />
        <Tab
          icon={<PersonPinIcon sx={{ fontSize: "42px" }} />}
          aria-label="person"
          {...a11yProps(2)}
        />
      </Tabs>
    </Container>
  );
}

export default withAuth(Admin);
