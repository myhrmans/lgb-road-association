import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Logo } from "./Logo";
import { PopupModal } from "./Modal";
import { LoginForm } from "./LoginForm";
import { RegisterForm } from "./RegisterForm";
import { logOut } from "../http-client";
import { MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const nav = useNavigate();

  const navigate = (route: string) => {
    nav(route);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar sx={{ borderBottom: 0.5, padding: 0 }}>
        <div onClick={() => navigate("/")} style={{ cursor: "pointer" }}>
          <Logo />
        </div>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Lassagårdsbergs Vägförening
        </Typography>
        <Button color="primary">
          <PopupModal content={<LoginForm />} buttonText="Logga in" />
        </Button>
        <Button onClick={logOut}>Logga ut</Button>
        <Button color="primary">
          <PopupModal content={<RegisterForm />} buttonText="Registrera" />
        </Button>
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto", padding: 0 }}
      >
        <MenuItem>
          <Typography textAlign="center">Aktuellt</Typography>
        </MenuItem>
        <MenuItem>
          <Typography textAlign="center">Kalender</Typography>
        </MenuItem>
        <MenuItem>
          <Typography textAlign="center">Bildarkiv</Typography>
        </MenuItem>
        <MenuItem onClick={() => navigate("/protokoll")}>
          <Typography textAlign="center">Protokoll</Typography>
        </MenuItem>
      </Toolbar>
    </Box>
  );
}
