import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Logo } from "./Logo";
import { Tab, Tabs } from "@mui/material";
import { Outlet, useNavigate } from "react-router-dom";
import { UserAuth } from "../common/contexts/AuthContext";
import { useState } from "react";
import logo from "../logo.jpeg";

export default function Header() {
  const navigate = useNavigate();

  const { user, logout } = UserAuth();
  async function handleLogout() {
    await logout()
      .then(() => {
        navigate("/");
      })
      .catch();
  }

  const [value, setValue] = useState<string>("Hem");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar sx={{ borderBottom: 0.5, padding: 0 }}>
          <div
            onClick={() => {
              navigate("/");
            }}
            style={{ cursor: "pointer" }}
          ></div>
          <a onClick={() => navigate("/")}>
            <Logo />
          </a>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Lassagårdsbergs Vägförening
          </Typography>
          {!user ? (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => {
                navigate("/login");
              }}
            >
              Logga in
            </Button>
          ) : (
            <Button
              color="secondary"
              variant="contained"
              onClick={() => handleLogout()}
            >
              Logga ut
            </Button>
          )}
        </Toolbar>
        <Toolbar
          component="nav"
          variant="dense"
          sx={{
            justifyContent: "left",
            overflowX: "auto",
            marginY: 1,
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
            centered
          >
            <Tab
              value="Hem"
              label="Hem"
              onClick={() => {
                navigate("/");
              }}
            />
            <Tab
              value="Aktuellt"
              label="Aktuellt"
              onClick={() => {
                navigate("/aktuellt");
              }}
            />
            <Tab
              value="Kalender"
              label="Kalender"
              onClick={() => {
                navigate("/kalender");
              }}
            />
            <Tab
              value="Bildarkiv"
              label="Bildarkiv"
              onClick={() => {
                navigate("/bildarkiv");
              }}
            />
            <Tab
              value="Blaha"
              label="Blaha"
              onClick={() => {
                navigate("/blaha");
              }}
            />
            <Tab
              value="Protokoll"
              label="Protokoll"
              onClick={() => {
                navigate("/protokoll");
              }}
            />
          </Tabs>
          {/* <MenuItem
          onClick={() => {
            navigate("/");
          }}
        >
          <Typography textAlign="center">Hem</Typography>
        </MenuItem>
        <MenuItem>
          <Typography textAlign="center">Aktuellt</Typography>
        </MenuItem>
        <MenuItem>
          <Typography textAlign="center">Kalender</Typography>
        </MenuItem>
        <MenuItem>
          <Typography textAlign="center">Bildarkiv</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate("/blaha");
          }}
        >
          <Typography textAlign="center">Blaha</Typography>
        </MenuItem>
        <MenuItem
          onClick={() =>
            navigate("/protokoll");
          }}
        >
          <Typography textAlign="center">Protokoll</Typography>
        </MenuItem> */}
        </Toolbar>
      </Box>
      <Outlet />
    </>
  );
}
