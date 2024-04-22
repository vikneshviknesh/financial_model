"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Snackbar,
  Typography,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuthHooks } from "@/app/hooks/useAuthHooks";
import CustomeLoader from "../CustomeLoader";
import { useRouter } from "next/navigation";
import CasinoIcon from "@mui/icons-material/Casino";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

interface iProps {
  title: string;
  showBackBtn?: boolean;
  showMenu?: boolean;
}

const Header = (props: iProps) => {
  const { title, showBackBtn = true, showMenu = true } = props;
  const {
    logoutUser,
    isLoading: logoutLoading,
    userLoginErrorMsg: logoutErrorMsg,
  } = useAuthHooks();

  const router = useRouter();

  const [snackBarState, setSnackBarState] = useState({
    message: "",
    open: false,
  });
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const onPressLogout = () => {
    logoutUser();
  };

  const onPressContest = () => {
    router.push("/pages/luckyDrawContest");
  };

  const ProfileMenu = () => {
    return (
      <>
        <MenuItem onClick={onPressContest}>
          <ListItemIcon>
            <CasinoIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Lucky Draw</ListItemText>
        </MenuItem>

        <MenuItem onClick={onPressLogout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </>
    );
  };

  useEffect(() => {
    if (logoutErrorMsg !== "") {
      setSnackBarState({
        open: true,
        message: logoutErrorMsg,
      });
    }
  }, [logoutErrorMsg]);

  const handleBackClick = () => {
    router.back();
  };

  return (
    <Card
      sx={{
        padding: "12px",
        position: "sticky",
        top: 0,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#19a189",
      }}
    >
      {showBackBtn ? <ArrowBackIosIcon onClick={handleBackClick} /> : null}
      <Box
        sx={{
          display: "flex",
          flex: 1,
          alignItems: "center",
        }}
      >
        <AccountCircleIcon fontSize="large" />
        <Box sx={{ flex: 1, ml: "16px" }}>
          <Typography
            sx={{
              fontWeight: "500",
              fontSize: "18px",
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
      {!showBackBtn ? (
        <>
          <Button
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <MoreHorizIcon fontSize="small" />
          </Button>
        </>
      ) : null}
      {showMenu ? (
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <ProfileMenu />
        </Menu>
      ) : null}
      <CustomeLoader isLoading={logoutLoading} />
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        open={snackBarState.open}
        onClose={() => {
          setSnackBarState({ open: false, message: "" });
        }}
        message={snackBarState.message}
      />
    </Card>
  );
};

export default Header;
