import * as React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import UserAvatar from './UserAvatar'; // Import your UserAvatar component here
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GroupIcon from '@mui/icons-material/Group';
import Chart from './Chart';
import Deposits from './Deposits';
import Orders from './Orders';
import axios from 'axios'; // Import Axios
import Subjects from './Subjects';



function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Benedicto College
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth: number = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Dashboard() {
  const [open, setOpen] = React.useState(true);
  const [showSubItems, setShowSubItems] = React.useState(false); // State for sub-items visibility
  const [currentUser, setCurrentUser] = useState<boolean>(false); // State for current user authentication
  const [studentMode, setStudentMode] = useState<boolean>(false); // State for student mode
  const [showChartAndDeposits, setShowChartAndDeposits] = useState(true); // State for showing Chart and Deposits

  const history = useNavigate(); // Get history object from useHistory

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('/api/user', { withCredentials: true }); // Adjust URL as needed
        if (response.status === 200) {
          setCurrentUser(true);
        } else {
          setCurrentUser(false);
          history('/Sign-in'); // Redirect to login if not authenticated
        }
      } catch (error) {
        setCurrentUser(false);
        history('/Sign-in'); // Redirect to login if an error occurs
      }
    };

    checkAuth();
  }, [history]);

  const toggleDrawer = () => {
    setOpen(!open);
    setShowSubItems(false); // Close sub-items when drawer is toggled
    setShowChartAndDeposits(true); // Reset to show Chart and Deposits
  };

  const toggleSubItems = () => {
    setShowSubItems(!showSubItems);
    setShowChartAndDeposits(true); // Reset to show Chart and Deposits
  };

  const toggleStudentMode = () => {
    setStudentMode(!studentMode);
    if (!studentMode) {
      setShowChartAndDeposits(false); // Hide Chart and Deposits in student mode
    } else {
      setShowChartAndDeposits(true); // Show Chart and Deposits when student mode is off
    }
  };

  const handleDepartmentClick = () => {
    setShowChartAndDeposits(false);
  };

  // Example user image URL (replace with your actual URL)
  const userImageUrl = 'https://example.com/user-avatar.jpg';

  // Render dashboard if user is authenticated
  return currentUser ? (
    <ThemeProvider theme={defaultTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
              onClick={toggleSubItems} // Toggle sub-items visibility on clicking "Dashboard"
            >
              Dashboard
            </Typography>
            {/* Replace IconButton with UserAvatar */}
            <UserAvatar imageUrl={userImageUrl} />
            {/* Toggle button for student mode */}
            <IconButton
              color="inherit"
              onClick={toggleStudentMode}
            >
              {studentMode ? 'Student Mode Off' : 'Student Mode On'}
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {/* Render main list items */}
            <ListItemButton onClick={toggleSubItems}>
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary="Dashboard" />
            </ListItemButton>
            <ListItemButton onClick={toggleSubItems}>
              <ListItemIcon>
                <GroupIcon/>
              </ListItemIcon>
              <ListItemText primary="Enrollee List" />
            </ListItemButton>
            {/* Conditional rendering of sub-items */}
            {showSubItems && (
              <React.Fragment>
                <ListSubheader inset>Departments</ListSubheader>
                <ListItemButton onClick={handleDepartmentClick}>
                  <ListItemText primary="Bachelor of Arts in Mass Communication" />
                </ListItemButton>
                <ListItemButton onClick={handleDepartmentClick}>
                  <ListItemText primary="Bachelor of Science in Accountancy (BSA)" />
                </ListItemButton>
                <ListItemButton onClick={handleDepartmentClick}>
                  <ListItemText primary="Bachelor of Science in Business Administration (BSBA)" />
                </ListItemButton>
                <ListItemButton onClick={handleDepartmentClick}>
                  <ListItemText primary="Bachelor of Science in Information Technology (BSIT)" />
                </ListItemButton>
                <ListItemButton onClick={handleDepartmentClick}>
                  <ListItemText primary="Associate in Computer Technology (ACT)" />
                </ListItemButton>
                <ListItemButton onClick={handleDepartmentClick}>
                  <ListItemText primary="Bachelor of Science in Elementary Education" />
                </ListItemButton>
                <ListItemButton onClick={handleDepartmentClick}>
                  <ListItemText primary="Bachelor of Science in Secondary Education" />
                </ListItemButton>
                <ListItemButton onClick={handleDepartmentClick}>
                  <ListItemText primary="Bachelor of Science in Industrial Engineering (BSIE)" />
                </ListItemButton>
                <ListItemButton onClick={handleDepartmentClick}>
                  <ListItemText primary="Bachelor of Science in Electronics and Communications Engineering (BSECE)" />
                </ListItemButton>
                <ListItemButton onClick={handleDepartmentClick}>
                  <ListItemText primary="Bachelor of Science in Electrical Engineering (BSEE)" />
                </ListItemButton>
                <ListItemButton onClick={handleDepartmentClick}>
                  <ListItemText primary="Bachelor of Science in Mechanical Engineering (BSME)" />
                </ListItemButton>
                <ListItemButton onClick={handleDepartmentClick}>
                  <ListItemText primary="Bachelor of Science in Civil Engineering (BSCE)" />
                </ListItemButton>
                <ListItemButton onClick={handleDepartmentClick}>
                  <ListItemText primary="Bachelor of Science in Industrial Technology (BSIT)" />
                </ListItemButton>
              </React.Fragment>
            )}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {showChartAndDeposits && (
                <>
                  {/* Chart */}
                  <Grid item xs={12} md={8} lg={9}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                      }}
                    >
                      <Chart />
                    </Paper>
                  </Grid>
                  {/* Recent Deposits */}
                  <Grid item xs={12} md={4} lg={3}>
                    <Paper
                      sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        height: 240,
                      }}
                    >
                      <Deposits />
                    </Paper>
                  </Grid>
                  <Grid item xs={12}>
                    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                      <Orders />
                    </Paper>
                  </Grid>
                </>
              )}
              {/* Conditional rendering of Subjects */}
              {studentMode && (
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Subjects />
                  </Paper>
                </Grid>
              )}
            </Grid>
            <Copyright sx={{ pt: 4 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  ) : null;
}
