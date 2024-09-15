  import * as React from "react";
  import Button from "@mui/material/Button";
  import TextField from "@mui/material/TextField";
  import FormControlLabel from "@mui/material/FormControlLabel";
  import Checkbox from "@mui/material/Checkbox";
  import Link from "@mui/material/Link";
  import Box from "@mui/material/Box";
  import Grid from "@mui/material/Grid";
  import Typography from "@mui/material/Typography";
  import apiClient from "../../services/interceptors";
  import axios from 'axios';
  import bcCebu from "../../StaticFiles/benedicto_background.jpg";
  import { Container } from "@mui/material";

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
        email: data.get('email') as string,
        password: data.get('password') as string,
      };
    
      try {
        const response = await apiClient.post('/login', loginData);
        localStorage.setItem('access_token', response.data.access_token);
        localStorage.setItem('refresh_token', response.data.refresh_token);
        window.location.href = '/Dashboard';
      } catch (error) {
        console.error('Login failed:', error);
      }
    };
    

    return (
      <Grid>
        <Box
          id="hero"
          sx={() => ({
            width: "100%",
            minHeight: "100vh",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0,0,0,1)), url(${bcCebu})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          })}
        >
          <Container
            maxWidth={false} // Disable the default maxWidth
            sx={{
              ml: "auto",
              py: { xs: 2, sm: 3 },
              px: { xs: 2, sm: 3 },
              height: "100vh", // Make container take full height
            }}
          >
            <Grid
              container
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "flex-end", // Align content to the right
                alignItems: "center", // Center vertically
              }}
            >
              <Grid item xs={12} sm={8} md={5}>
                {" "}
                {/* Adjust the width as needed */}
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    bgcolor: "#fff",
                    width: { xs: "90%", sm: "400px" }, // Responsive width
                    p: { xs: 2, sm: 3 }, // Adjust padding for different screen sizes
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    boxSizing: "border-box", // Ensure padding is included in width
                    mx: 2, // Add horizontal margin
                    ml: "auto",
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
                    sx={{
                      lineHeight: 2,
                      width: "100%", // Ensure form takes up full width of parent container
                    }}
                  >
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Student ID"
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
                      size="large"
                      sx={{
                        mt: 1,
                        mb: 2,
                        backgroundColor: "#f15800", // background color
                        color: "#FFFFFF", // text color
                        "&:hover": {
                          backgroundColor: "#FFA500", // hover color
                        },
                        textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                        boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
                      }}
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
            </Grid>
          </Container>
        </Box>
      </Grid>
    );
  }
