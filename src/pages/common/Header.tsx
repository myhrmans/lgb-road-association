import LoginIcon from "@mui/icons-material/Login";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { getDownloadURL, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../common/contexts/AuthContext";
import { firebaseStorage } from "../../config/firebase";
import logo from "../../highland-cow_logo.png";

export default function Header() {
  const navigate = useNavigate();
  const [url, setUrl] = useState<string>("");
  const imageRef = ref(firebaseStorage, "images/lsgb1.jpg");

  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (page: string) => {
    setAnchorElNav(null);
    navigate(page);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    handleCloseUserMenu();
    await logout()
      .then(() => {
        navigate("/");
      })
      .catch();
  };

  const handleLogin = () => {
    handleCloseUserMenu();
    navigate("/login");
  };

  useEffect(() => {
    const func = async () => {
      await getDownloadURL(imageRef)
        .then((x) => {
          setUrl(x);
        })
        .catch((error) => {});
    };
    func();
  }, []);

  return (
    <Grid container>
      <Grid
        xs={12}
        item
        sx={{
          backgroundImage: `url(${url})`,
          height: "300px",
          backgroundSize: "cover",
          backgroundPosition: "50% 50%",
          backgroundRepeat: "no-repeat",
        }}
      ></Grid>

      <Grid item width="100%" xs={12}>
        <AppBar position="static">
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              <img
                style={{ width: "80px", cursor: "pointer" }}
                src={logo}
                alt="logo"
                onClick={() => navigate("/")}
              />

              <Typography
                variant="h6"
                noWrap
                component="a"
                sx={{
                  mr: 2,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "helvetica",
                  fontWeight: 900,
                  letterSpacing: ".1rem",
                  color: "secondary.main",
                  textDecoration: "none",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              >
                Lassagårdsbergs Vägförening
              </Typography>

              <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  <MenuItem
                    key="handelser"
                    onClick={() => handleCloseNavMenu("/handelser")}
                  >
                    <Typography textAlign="center">Händelser</Typography>
                  </MenuItem>
                  {/* <MenuItem key="Kalender" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Kalender</Typography>
                  </MenuItem>
                  <MenuItem key="Bildarkiv" onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">Bildarkiv</Typography>
                  </MenuItem> */}
                  <MenuItem
                    key="protocol"
                    onClick={() => handleCloseNavMenu("/protokoll")}
                  >
                    <Typography textAlign="center">Protokoll</Typography>
                  </MenuItem>
                  <MenuItem
                    key="contact"
                    onClick={() => handleCloseNavMenu("/kontakt")}
                  >
                    <Typography textAlign="center">Kontakta oss</Typography>
                  </MenuItem>
                </Menu>
              </Box>
              <Typography
                variant="h5"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: { xs: "flex", md: "none" },
                  flexGrow: 1,
                  fontFamily: "helvetica",
                  fontWeight: 700,
                  letterSpacing: ".1rem",
                  color: "secondary.main",
                  textDecoration: "none",
                }}
              >
                Lassagårdsbergs Vägförening
              </Typography>
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                <Button
                  key="handelser"
                  onClick={() => handleCloseNavMenu("/handelser")}
                  sx={{ my: 2, color: "secondary.main", display: "block" }}
                >
                  Händelser
                </Button>
                <Button
                  key="protocol"
                  onClick={() => handleCloseNavMenu("/protokoll")}
                  sx={{ my: 2, color: "secondary.main", display: "block" }}
                >
                  Protokoll
                </Button>
                <Button
                  key="contact"
                  onClick={() => handleCloseNavMenu("/kontakt")}
                  sx={{ my: 2, color: "secondary.main", display: "block" }}
                >
                  Kontakta oss
                </Button>
              </Box>

              <Box sx={{ flexGrow: 0 }}>
                {user ? (
                  <>
                    <Tooltip title="Open settings">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt={
                            user.email ? user.email.toLocaleUpperCase() : "U"
                          }
                          src="fnkjdnkjde/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                    </Tooltip>
                    <Menu
                      sx={{ mt: "45px" }}
                      id="menu-appbar"
                      anchorEl={anchorElUser}
                      anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      keepMounted
                      transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                      }}
                      open={Boolean(anchorElUser)}
                      onClose={handleCloseUserMenu}
                    >
                      <MenuItem key="logout" onClick={handleLogout}>
                        <Typography textAlign="center">Logga ut</Typography>
                      </MenuItem>
                    </Menu>
                  </>
                ) : (
                  <MenuItem key="login" onClick={handleLogin}>
                    <Typography
                      sx={{ mr: 1, color: "secondary.main" }}
                      textAlign="center"
                    >
                      Logga in
                    </Typography>
                    <LoginIcon
                      fontSize="large"
                      sx={{ color: "secondary.main" }}
                    />
                  </MenuItem>
                )}

                {/* {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))} */}
                {/* <MenuItem key="login" onClick={handleLogin}>
                      <Typography textAlign="center">Logga in</Typography>
                    </MenuItem> */}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Grid>
    </Grid>
  );
}
