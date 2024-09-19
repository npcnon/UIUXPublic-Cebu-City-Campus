//filename: SignInSide.tsx

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
import bcCebu from "../../StaticFiles/benedicto_background.jpg";
import { Alert, Container, CircularProgress } from "@mui/material"; // Added CircularProgress for the spinner
import { useState } from "react";

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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading status

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true); // Set loading to true when submission starts
    const data = new FormData(event.currentTarget);

    const loginData = {
      student_id: data.get('student_id') as string,
      password: data.get('password') as string,
    };

    try {
      const response = await apiClient.post('/login', loginData);
      localStorage.setItem('access_token', response.data.access_token);
      localStorage.setItem('refresh_token', response.data.refresh_token);
      window.location.href = '/Profile';
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.detail || 'An error occurred during login.');
      } else if (error.request) {
        setErrorMessage('No response from server. Please check your internet connection.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    } finally {
      setLoading(false); // Reset loading to false once request is complete
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
          maxWidth={false}
          sx={{
            ml: "auto",
            py: { xs: 2, sm: 3 },
            px: { xs: 2, sm: 3 },
            height: "100vh",
          }}
        >
          <Grid
            container
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <Grid item xs={12} sm={8} md={5}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: "#fff",
                  width: { xs: "90%", sm: "400px" },
                  p: { xs: 2, sm: 3 },
                  borderRadius: "8px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  boxSizing: "border-box",
                  mx: 2,
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
                <Typography variant="h5" sx={{ fontWeight: "bold", lineHeight: 3 }}>
                  LOGIN
                </Typography>
                {/* Error message display */}
                {errorMessage && (
                  <Alert severity="error" sx={{ width: "100%" }}>
                    {errorMessage}
                  </Alert>
                )}
                <Box
                  component="form"
                  noValidate
                  onSubmit={handleSubmit}
                  sx={{
                    lineHeight: 2,
                    width: "100%",
                  }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="student_id"
                    label="Student ID"
                    name="student_id"
                    autoComplete="student_id"
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
                    disabled={loading} // Disable button when loading
                    sx={{
                      mt: 1,
                      mb: 2,
                      backgroundColor: "#f15800",
                      color: "#FFFFFF",
                      "&:hover": {
                        backgroundColor: "#FFA500",
                      },
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
                    {/* Show spinner if loading */}
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
