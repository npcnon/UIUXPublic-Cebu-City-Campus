import { alpha } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import background from "../../StaticFiles/benedicto_background.jpg";
//modal imports
import { useState } from "react";
import Modal from "@mui/material/Modal";
//grid imports
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

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
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack spacing={1} useFlexGap sx={{ width: { xs: "100%", sm: "70%" } }}>
          <Typography
            textAlign="center"
            color="text.secondary"
            variant="h2"
            mb={2}
            sx={{ alignSelf: "center", width: { sm: "100%", md: "80%" } }}
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
            width: 400,
            bgcolor: "background.paper",
            border: "8px",
            borderRadius: "16px",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography
            id="enroll-modal-title"
            variant="subtitle1"
            component="h2"
            textAlign="center"
          >
            Select School Campus
          </Typography>

          <Grid
            container
            spacing={3}
            sx={{
              mt: 1,
              mb: 3,
            }}
          >
            {/* Mandaue City */}
            <FormGrid item xs={12} md={6} lg={6}>
              <Typography
                textAlign="center"
                color="text.secondary"
                variant="subtitle2"
                mb={2}
              >
                MANDAUE CITY
              </Typography>

              <Button
                sx={{
                  mb: 2,
                  minWidth: 120,
                }}
                component="label"
                variant="contained"
              >
                NEW STUDENT
              </Button>

              <Button component="label" variant="contained">
                OLD STUDENT
              </Button>
            </FormGrid>

            {/* Cebu City */}
            <FormGrid item xs={12} md={6} lg={6}>
              <Typography
                textAlign="center"
                color="text.secondary"
                variant="subtitle2"
                mb={2}
              >
                CEBU CITY
              </Typography>

              <Button
                sx={{
                  mb: 2,
                  minWidth: 120,
                }}
                component="label"
                variant="contained"
              >
                NEW STUDENT
              </Button>

              <Button component="label" variant="contained">
                OLD STUDENT
              </Button>
            </FormGrid>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
