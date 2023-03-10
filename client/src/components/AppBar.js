import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import { red } from "@mui/material/colors";
import Cookies from "js-cookie";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/auth";

export default function ButtonAppBar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();

  function _logout() {
    Cookies.remove("token");
    dispatch(logout());
    navigate("/login");
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" className="text-white">
              MoneyEx
            </Link>
          </Typography>
          <Button color="inherit" onClick={_logout}>
            Logout
          </Button>
          <Link to="/login" className="text-white">
            <Button color="inherit">Login</Button>
          </Link>
          <Link to="/register" className="text-white">
            <Button color="inherit">Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
