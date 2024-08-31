// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import library_gif from '../../StaticFiles/library.gif';
// import logo from '../../StaticFiles/logo.png'

// const logoStyle = {
//   width: '60px',
//   height: 'auto',
//   cursor: 'pointer',
// };

// function Copyright(props: any) {
//   return (
//     <Typography variant="body2" color="text.secondary" align="center" {...props}>
//       {'Copyright © '}
//       <Link color="inherit" href="http://localhost:5173/">
//         Benedicto College
//       </Link>{' '}
//       {new Date().getFullYear()}
//       {'.'}
//     </Typography>
//   );
// }

// // TODO remove, this demo shouldn't need to reset the theme.
// const defaultTheme = createTheme();

// export default function SignInSide() {
//   const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     console.log({
//       email: data.get('email'),
//       password: data.get('password'),
//     });
//   };

//   return (
//     <ThemeProvider theme={defaultTheme}>
//       <Grid container component="main" sx={{ height: '100vh' }}>
//         <CssBaseline />
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             backgroundImage: `url(${library_gif})`,
//             backgroundColor:(t) =>
//               t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//             backgroundSize: 'cover',
//             backgroundPosition: 'left',
//           }}
//         />
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Avatar sx={{ m: 1 }}>
//             <img
//                 src={logo}
//                 style={logoStyle}
//                 alt="logo of sitemark"
//               />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign in
//             </Typography>
//             <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="stdnt_id"
//                 label="Student ID"
//                 name="student_id"
//                 autoComplete="student_id"
//                 autoFocus
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//               />
//               <FormControlLabel
//                 control={<Checkbox value="remember" color="primary" />}
//                 label="Remember me"
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 href="/Dashboard"
//                 target="_self"
//                 sx={{ mt: 3, mb: 2 }}
//               >
//                 Sign In
//               </Button>
//               <Grid container>
//                 <Grid item xs>
//                   <Link href="#" variant="body2">
//                     Forgot password?
//                   </Link>
//                 </Grid>
//                 <Grid item>
//                   <Link href="#" variant="body2">
//                     {"Don't have an account? Sign Up and Enroll now!"}
//                   </Link>
//                 </Grid>
//               </Grid>
//               <Copyright sx={{ mt: 5 }} />
//             </Box>
//           </Box>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   );
// }

import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import library_gif from "../../StaticFiles/benedicto_background.jpg";
import logo from "../../StaticFiles/logo.png";
import axios from "axios"; // Import Axios
import bcCebu from "../../StaticFiles/benedicto_background.jpg";
import { Container } from "@mui/material";

const logoStyle = {
  width: "60px",
  height: "auto",
  cursor: "pointer",
};

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:5173/">
        Benedicto College
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignInSide() {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const loginData = {
      email: data.get("email"),
      password: data.get("password"),
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/login",
        loginData,
        {
          withCredentials: true, // Allow credentials to be sent with the request
        }
      );

      if (response.status === 200) {
        // Handle successful login
        window.location.href = "/Dashboard";
      } else {
        // Handle login failure
        console.error("Login failed", response.data);
      }
    } catch (error) {
      // Handle error
      console.error("An error occurred:", error);
    }
  };

  return (
    <Grid>
      <Box
        id="hero"
        sx={() => ({
          width: "100%",
          height: "607px",
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0,0,0,1)), url(${bcCebu})`,
          backgroundSize: "cover", // Cover the entire box
          backgroundPosition: "center", // Center the image
          backgroundRepeat: "no-repeat", // Prevent repeating
          backgroundAttachment: "fixed", // Optional: fixed background for parallax effect
        })}
      >
        <Container
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: { xs: "100%", sm: "auto" }, // Responsive width adjustment
            py: 3,
          }}
        >
          <Grid>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                bgcolor: "#fff",
                width: { xs: "90%", sm: "400px" }, // Responsive width
                p: 3, // Padding
                borderRadius: "8px", // Rounded corners
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
              }}
            >
              <img
                src="/src/StaticFiles/Logo.jpg"
                alt="BC Logo"
                style={{
                  width: "70px",
                  height: "70px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #fff",
                }}
              />
              <Typography
                variant="h5"
                sx={{ fontWeight: "bold", lineHeight: 3 }}
              >
                LOGIN
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ lineHeight: 2 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 1, mb: 1 }}
                >
                  Sign In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up and Enroll now!"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 2 }} />
              </Box>
            </Box>
          </Grid>
        </Container>
      </Box>
    </Grid>
  );
}
