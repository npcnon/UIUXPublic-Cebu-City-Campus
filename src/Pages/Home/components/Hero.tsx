import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import bcCebu from "../../../StaticFiles/benedicto_background.jpg";
//modal imports
import { useState } from "react";
import Modal from "@mui/material/Modal";
//grid imports
import Grid from "@mui/material/Grid";
//
import Divider from "@mui/material/Divider";
import SendIcon from "@mui/icons-material/Send";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useStudentBasicStore } from "../../../stores/useStudentBasicStore";
import { Link } from "react-router-dom";

export default function Hero() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { setStudentBasicAPI } = useStudentBasicStore((state) => ({
    setStudentBasicAPI: state.setStudentBasicAPI,
  }));

  const handleCampusSelection = (campus: string) => () => {
    setStudentBasicAPI((prev) => ({
      ...prev,
      campus: campus
    }));
  };
  return (
    <Box
      id="hero"
      sx={() => ({
        width: "100%",
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(26,50,129,255)), url(${bcCebu})`,
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
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
          color: "#fff", // Set text color to white or light color for better contrast
        }}
      >
        <Stack spacing={1} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            textAlign="center"
            color="#faf9f6"
            variant="h2"
            mb={2}
            sx={{
              lineHeight: 1.3,
              alignSelf: "center",
              fontWeight: "bold",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
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
              variant="contained"
              startIcon={<AddCircleIcon />}
              sx={{
                backgroundColor: "#f15800", // Custom background color
                color: "#FFFFFF", // Custom text color
                "&:hover": {
                  backgroundColor: "#FFA500", // Custom hover color
                },
                textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
              }}
              onClick={handleOpen}
            >
              Enroll Now
            </Button>
            <Link to="/Sign-in">
            <Button
              endIcon={<SendIcon />}
              sx={{
                color: "#FFFFFF", // Custom text color
                "&:hover": {
                  backgroundColor: "#f15800", // Custom hover color
                },
                textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
              }}
            >
              Student Portal
            </Button>
            </Link>
          </Stack>
        </Stack>

        <Typography
          textAlign="center"
          color="#faf9f6"
          variant="h6"
          sx={{
            alignSelf: "center",
            lineHeight: 2,
            width: { sm: "100%", md: "80%" },
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
        >
          Basic Education | Senior High | College{" "}
        </Typography>

        <Typography
          textAlign="center"
          color="#faf9f6"
          variant="subtitle2"
          sx={{
            lineHeight: 2,
            alignSelf: "center",
            fontWeight: "medium",
            width: { sm: "100%", md: "80%" },
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
          }}
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
            bgcolor: "#faf9f6",
            borderRadius: "16px",
            boxShadow: 24,
            p: { xs: 2, sm: 4 },
          }}
        >
          <Typography
            id="enroll-modal-title"
            variant="h6"
            textAlign="center"
            sx={{
              color: "#1E201E", // Custom text color
              fontWeight: "medium",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            Select School Campus
          </Typography>
          <Divider sx={{ mt: 2, mb: 3 }} />

          <Grid
            container
            spacing={0.5}
            justifyContent="center"
            sx={{ mt: 1, mb: 3 }}
          >
            <Grid
              justifyContent="center"
              alignItems="center"
              sx={{
                mt: 1,
                mb: 1,
              }}
            >
              <Link to="/EnrollmentPage">
              <Button
                onClick={handleCampusSelection("Mandaue")}
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#f15800", // Custom background color
                  color: "#FFFFFF", // Custom text color
                  "&:hover": {
                    backgroundColor: "#FFA500", // Custom hover color
                  },
                  boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
                }}
              >
                Mandaue Campus
              </Button>
                </Link>
            </Grid>

            <Divider
              orientation="vertical"
              variant="middle"
              flexItem
              sx={{
                mr: 3,
                ml: 3,
              }}
            />
            <Grid
              justifyContent="center"
              alignItems="center"
              sx={{
                mt: 1,
                mb: 1,
              }}
            >
              <Link to="/EnrollmentPage">
              <Button
                onClick={handleCampusSelection("Cebu")}
                variant="contained"
                size="small"
                sx={{
                  backgroundColor: "#f15800", // Custom background color
                  color: "#FFFFFF", // Custom text color
                  "&:hover": {
                    backgroundColor: "#FFA500", // Custom hover color
                  },
                  boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
                }}
              >
                Cebu Campus
              </Button>
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
