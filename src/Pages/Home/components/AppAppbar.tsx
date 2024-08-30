import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Slide from "@mui/material/Slide";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Container from "@mui/material/Container";
// icons
import HomeIcon from "@mui/icons-material/Home";
import SchoolIcon from "@mui/icons-material/School";
import RoomPreferencesIcon from "@mui/icons-material/RoomPreferences";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";

const navItems = [
  { label: "Home", icon: <HomeIcon /> },
  { label: "Course", icon: <SchoolIcon /> },
  { label: "Facilities", icon: <RoomPreferencesIcon /> },
  { label: "Location", icon: <LocationOnIcon /> },
  { label: "Faq", icon: <QuestionAnswerIcon /> },
];

function HideOnScroll(props: any) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

export default function AppAppBar(props: any) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="subtitle1" sx={{ my: 2 }}>
        Benedicto College
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} sx={{ justifyContent: "center" }}>
            {item.icon && (
              <ListItemIcon sx={{ minWidth: "auto", mr: 1 }}>
                {item.icon}
              </ListItemIcon>
            )}
            <ListItemText primary={item.label} sx={{ textAlign: "center" }} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <React.Fragment>
      <CssBaseline />
      <HideOnScroll {...props}>
        <AppBar
          sx={{
            backgroundColor: "#03153e", // Custom color
            padding: { xs: "8px 16px", sm: "8px 32px" }, // Responsive padding
          }}
        >
          <Container maxWidth="lg">
            <Toolbar disableGutters>
              {isMobile ? (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
              ) : null}

              {/* Image Logo */}
              <img
                src="/src/StaticFiles/Logo.jpg"
                alt="BC Logo"
                style={{
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #fff",
                  marginRight: "8px",
                }}
              />

              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, display: { xs: "block", sm: "block" } }}
              >
                Benedicto College
              </Typography>

              {!isMobile ? (
                <Box sx={{ display: "flex", gap: 2 }}>
                  {navItems.map((item) => (
                    <Button key={item.label} sx={{ color: "#fff" }}>
                      {item.icon && (
                        <ListItemIcon
                          sx={{ minWidth: 36, color: "#fff", mr: 1 }}
                        >
                          {item.icon}
                        </ListItemIcon>
                      )}
                      {item.label}
                    </Button>
                  ))}
                </Box>
              ) : null}
            </Toolbar>
          </Container>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </React.Fragment>
  );
}
