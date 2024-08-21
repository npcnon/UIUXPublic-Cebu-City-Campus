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
//icon
import HomeIcon from "@mui/icons-material/Home";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ForwardIcon from "@mui/icons-material/Forward";
//grid imports
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
//card
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, CardActions } from "@mui/material";
//sample pic imports
import bcCebu from "../../../StaticFiles/benedicto_background.jpg";
import bcmain from "../../../StaticFiles/bcmain.jpg";

const navItems = [
  { label: "home", icon: <HomeIcon /> }, //home icon
];

interface Props {
  window?: () => Window;
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
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

export default function EnrollmentPage(props: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        BC LOGO
      </Typography>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            {item.icon && (
              <ListItemIcon sx={{ minWidth: 36 }}>{item.icon}</ListItemIcon>
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
            backgroundColor: "#0236ae", // Custom color
          }}
        >
          <Toolbar>
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

            {/*image logo*/}
            <img
              src="/src/StaticFiles/Logo.jpg" // Replace with the actual path to your logo
              alt="BC Logo"
              style={{
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #fff",
                marginRight: "8px", // Adjust the margin as needed
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
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {navItems.map((item) => (
                  <Button key={item.label} sx={{ color: "#fff" }}>
                    {item.icon && (
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        {item.icon}
                      </ListItemIcon>
                    )}
                    {item.label}
                  </Button>
                ))}
              </Box>
            ) : null}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": { boxSizing: "border-box", width: 240 },
          }}
        >
          {drawer}
        </Drawer>
      </nav>

      <Grid>
        <Typography
          variant="h4"
          textAlign="center"
          sx={{
            flexGrow: 1,
            mt: 5,
            color: "#FF5c00",
            fontWeight: "bold",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
            display: { xs: "block", sm: "block" },
          }}
        >
          Admission Requirements
        </Typography>
        <Typography
          variant="body2"
          textAlign="center"
          color="text.secondary"
          sx={{ flexGrow: 1, mb: 2, display: { xs: "block", sm: "block" } }}
        >
          We’ll run through a checklist of items you’ll need to complete in
          order to <br /> apply at the University. Let’s get started!
        </Typography>
      </Grid>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ mt: 1, mb: 3, backgroundColor: "#ffff" }}
      >
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link to="/Enrollment" style={{ textDecoration: "none" }}>
            <Card sx={{ maxWidth: 345, boxShadow: 8 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100"
                  image={bcmain}
                  alt="school"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    New Student
                  </Typography>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    Requirements:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    1. Certificate of Good Moral Conduct. <br />
                    2. Senior High School Report Card (Form 138). <br />
                    3. Original Copy of PSA (NSO) Birth Certificate. <br />
                    4. Php 500.00 Enrollment fee.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  sx={{
                    backgroundColor: "#FF5c00", // Custom background color
                    color: "#FFFFFF", // Custom text color
                    "&:hover": {
                      backgroundColor: "#FFA500", // Custom hover color
                    },
                    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Enroll Now
                </Button>
              </CardActions>
            </Card>
          </Link>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Link to="/Sign-in" style={{ textDecoration: "none" }}>
            <Card sx={{ maxWidth: 345, boxShadow: 8 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="100"
                  image={bcCebu}
                  alt="school"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontWeight: "bold",
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
                    }}
                  >
                    Old Student
                  </Typography>
                  <Typography gutterBottom variant="subtitle1" component="div">
                    Requirements:
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Continuing students are those who were enrolled in the
                    previous semester or had a valid leave of absence and are
                    now re-enrolling in the same course, and Php 500.00
                    Enrollment fee.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                <Button
                  variant="contained"
                  startIcon={<PersonAddIcon />}
                  sx={{
                    backgroundColor: "#FF5c00", // Custom background color
                    color: "#FFFFFF", // Custom text color
                    "&:hover": {
                      backgroundColor: "#FFA500", // Custom hover color
                    },
                    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Enroll Now
                </Button>
              </CardActions>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
