import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import bcCebu from "../../../StaticFiles/benedicto_background.jpg";
import bcmain from "../../../StaticFiles/bcmain.jpg";
//modal imports
import { useState } from "react";
import Modal from "@mui/material/Modal";
//grid imports
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
//card
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea } from "@mui/material";

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function Hero() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: "100%",
        /* height: "607px",
         backgroundImage: `url(${background})`, // Add background image
        backgroundSize: "cover", // Cover the entire box
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent repeating
        backgroundAttachment: "fixed", // Optional: fixed background for parallax effect 
        backgroundColor:
          theme.palette.mode === "light"
            ? "rgba(206, 229, 253, 0.9)"
            : `rgba(9, 14, 16, 0.9)`, */
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
          color: "#fff", // Set text color to white or light color for better contrast
        }}
      >
        <Stack spacing={1} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            textAlign="center"
            color="text.secondary"
            variant="h2"
            mb={2}
            sx={{
              alignSelf: "center",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
              width: { sm: "100%", md: "80%" },
            }}
          >
            ONLINE ENROLLMENT IS NOW OPEN!
          </Typography>

          <Stack
            direction={{ xs: "column", sm: "row" }}
            alignSelf="center"
            spacing={1}
            mb={5}
            useFlexGap
            sx={{ pt: 2, width: { xs: "100%", sm: "auto" } }}
          >
            <Button
              color="primary"
              variant="contained"
              size="large"
              sx={{
                backgroundColor: "#FF5F15", // Custom background color
                color: "#FFFFFF", // Custom text color
                "&:hover": {
                  backgroundColor: "#FFA500", // Custom hover color
                },
                boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
              }}
              onClick={handleOpen}
            >
              Enroll Now
            </Button>
          </Stack>
        </Stack>

        <Typography
          textAlign="center"
          color="text.secondary"
          variant="h6"
          sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
        >
          BASIC EDUCATION | SENIOR HIGH | COLLEGE
        </Typography>

        <Typography
          textAlign="center"
          color="text.secondary"
          variant="subtitle2"
          sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
        >
          MANDAUE CITY CAMPUS | CEBU CITY CAMPUS
        </Typography>
      </Container>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="enroll-modal-title"
        aria-describedby="enroll-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: 400 },
            bgcolor: "#F3F7EC",
            borderRadius: "16px",
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
          }}
        >
          <Typography
            id="enroll-modal-title"
            variant="subtitle1"
            component="h2"
            textAlign="center"
            sx={{
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
            }}
          >
            Select School Campus
          </Typography>

          <Grid
            container
            spacing={2}
            justifyContent="center"
            sx={{ mt: 1, mb: 3 }}
          >
            {/* Mandaue City */}
            <FormGrid
              item
              xs={12}
              md={6}
              lg={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Link to="/EnrollmentPage" style={{ textDecoration: "none" }}>
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
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: "bold" }}
                      >
                        Benedicto College Mandaue Campus
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </FormGrid>

            {/* Cebu City */}
            <FormGrid
              item
              xs={12}
              md={6}
              lg={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Link to="/EnrollmentPage" style={{ textDecoration: "none" }}>
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
                        variant="body2"
                        color="text.secondary"
                        sx={{ fontWeight: "bold" }}
                      >
                        Benedicto College Cebu Campus
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Link>
            </FormGrid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
