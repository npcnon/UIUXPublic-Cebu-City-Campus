// UserAppbar.tsx

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import { AppBar as MuiAppBar, Toolbar, IconButton, Typography, Box, Drawer, CssBaseline, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Badge, CircularProgress } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DashboardIcon from '@mui/icons-material/Dashboard'; // You can choose appropriate icons
import HowToRegIcon from '@mui/icons-material/HowToReg';
import SchoolIcon from '@mui/icons-material/School';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircle from '@mui/icons-material/AccountCircle';
import apiClient from "../../services/interceptors";
import Dashboard from './Dashboard';
import Registration from './Registration';



const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{ open?: boolean }>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open?: boolean }>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
  backgroundColor: '#03153E', // Set AppBar background color
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const UserAppbar: React.FC = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [profile, setProfile] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get("/user");
        setProfile(response.data);
      } catch (err) {
        setError("Failed to load profile");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleDrawerOpen = () => setOpen(true);
  const handleDrawerClose = () => setOpen(false);
  
  const handleMenuItemClick = (item: string) => {
    setSelectedItem(item);
  };

  const renderContent = () => {
    switch (selectedItem) {
      case 'Dashboard':
        return <Dashboard />; 
      case 'Registration':
        return <Registration/>;
      case 'Enlistment':
        return <Typography variant="h6">Enlistment Content</Typography>;
      case 'Studyload':
        return <Typography variant="h6">Studyload Content</Typography>;
      default:
        return <Typography variant="h6">Select an item from the menu</Typography>;
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              mr: 2,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Student Portal
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {loading ? (
            <CircularProgress color="inherit" size={24} />
          ) : error ? (
            <Typography variant="body1" color="error">
              {error}
            </Typography>
          ) : (
            <Box sx={{ display: 'flex' }}>
              <Typography variant="h6" sx={{ mr: 2 }}>
                Hi, {profile?.profile?.student_info?.applicant_details?.first_name}
              </Typography>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {['Dashboard', 'Registration', 'Enlistment', 'Studyload'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleMenuItemClick(text)}>
                <ListItemIcon>
                  {index === 0 ? <DashboardIcon /> :
                   index === 1 ? <HowToRegIcon /> :
                   index === 2 ? <SchoolIcon /> :
                   <CalendarTodayIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {renderContent()}
      </Main>
    </Box>
  );
}

export default UserAppbar;
