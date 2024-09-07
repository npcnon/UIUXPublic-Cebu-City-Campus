
import {
  Container,
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import bcCebu from "../../../StaticFiles/benedicto_background.jpg";
import Select from "@mui/material/Select";
import AddCircleIcon from "@mui/icons-material/AddCircle";

export default function StudentRegistration() {
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
            width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" }, // Responsive width
            maxWidth: "none", // Ensure container doesn't get restricted by the default maxWidth prop
            py: { xs: 2, sm: 3 },
            px: { xs: 2, sm: 3 },
            height: "100vh", // Full height
          }}
        >
          <Grid
            container
            sx={{
              height: "100%",
              display: "flex",
              justifyContent: "center", // Align content to the right
              alignItems: "center", // Center vertically
            }}
          >
            <Grid item xs={12} sm={8} md={5}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: "#fbfcf8", //pearl color
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
                  Student Registration
                </Typography>
                <Box
                  component="form"
                  noValidate
                  sx={{
                    lineHeight: 2,
                    width: "100%", // Ensure form takes up full width of parent container
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="fname"
                        label="First Name"
                        variant="outlined"
                      />
                    </Grid>

                    <Grid item xs={6}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="lname"
                        label="Last Name"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <FormControl
                        fullWidth
                        variant="outlined"
                        margin="normal"
                        sx={{ mt: 3 }}
                      >
                        <InputLabel id="gender-label">Sex</InputLabel>
                        <Select labelId="gender-label" label="Sex">
                          <MenuItem value="Male">Male</MenuItem>
                          <MenuItem value="Female">Female</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item xs={8}>
                      <FormControl variant="outlined" margin="normal">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer components={["DatePicker"]}>
                            <DatePicker label="Birthdate" />
                          </DemoContainer>
                        </LocalizationProvider>
                      </FormControl>
                    </Grid>
                    <Grid item xs={7}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="Email"
                        label="Email"
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={5}>
                      <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="contactno"
                        label="Contact No."
                        variant="outlined"
                      />
                    </Grid>
                  </Grid>

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    size="large"
                    startIcon={<AddCircleIcon />}
                    sx={{
                      mt: 3,
                      mb: 1,
                      backgroundColor: "#f15800", // background color
                      color: "#FFFFFF", // text color
                      "&:hover": {
                        backgroundColor: "#FFA500", // hover color
                      },
                      textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                      boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Grid>
  );
}
