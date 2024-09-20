import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../assets/images/removal.ai_c197b374-cfae-4464-aa0c-9d7d5eb3a11f-screenshot-from-2024-09-20-14-28-18.png";

const Navbar: React.FC = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
          <img src={logo} alt="Logo" style={{ height: 40, marginRight: 16 }} />{" "}
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Home
          </Typography>
        </Box>
        <Button color="inherit" component={Link} to="/services">
          Services
        </Button>
        <Button color="inherit" component={Link} to="/contact">
          Contact Us
        </Button>
        <Button color="inherit" component={Link} to="/help">
          Help
        </Button>
        <Button color="inherit" component={Link} to="/blogs">
          Blogs
        </Button>
        <Button color="inherit" component={Link} to="/register">
          Register
        </Button>
        <Button color="inherit" component={Link} to="/login">
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
