// Filename: Checkout.tsx

import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";
import CircularProgress from "@mui/material/CircularProgress";
import ErrorIcon from "@mui/icons-material/Error";
import CheckCircleIcon from "@mui/icons-material/CheckCircle"; // For success modal
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import PersonalData from "./PersonaData";
import FamilyBackground from "./FamilyBackground";
import AcademicBackground from "./AcademicBg";
import AdditionalDocs from "./AdditionalDocs";
import { useAcademicBackgroundState } from "./States/AcademicBackground/useAcademicBackgroundState";
import { useAcademicBackgroundAPIState } from "./States/AcademicBackground/useAcademicBackgroundAPIState"; // Import the hook

const steps = [
  "Personal Data",
  "Family Background",
  "Academic Background",
  "Academic History",
  "Additional Documents",
];

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const { academicBackground, setAcademicBackground } =
    useAcademicBackgroundState();
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [successModalOpen, setSuccessModalOpen] = React.useState(false);

  const apiData = useAcademicBackgroundAPIState(academicBackground);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    // Transform academicBackground data for API

    console.log("Data to be sent:", apiData);

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/stdntacademicbackground/",
        apiData
      );

      setTimeout(() => {
        setLoading(false);
        setSuccess("Data submitted successfully!");
        setSuccessModalOpen(true);
      }, 2000);
    } catch (error: unknown) {
      setTimeout(() => {
        setLoading(false);
        if (axios.isAxiosError(error)) {
          setError(`Error: ${error.response?.data || "Unknown error"}`);
        } else if (error instanceof Error) {
          setError(`Error: ${error.message}`);
        } else {
          setError("An unknown error occurred");
        }
        setModalOpen(true);
      }, 2000);
    }
  };

  const handleCloseErrorModal = () => {
    setModalOpen(false);
    setError(null);
  };

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    setSuccess(null);
  };

  function getStepContent(step: number) {
    switch (step) {
      case 0:
        return <PersonalData />;
      case 1:
        return <FamilyBackground />;
      case 2:
        return (
          <AcademicBackground
            data={academicBackground}
            setData={setAcademicBackground}
          />
        );
      case 3:
        return <></>;
      case 4:
        return <AdditionalDocs />;
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <>
      <CssBaseline />
      <Grid
        container
        sx={{
          minHeight: { xs: "100dvh", sm: "100dvh" },
          alignItems: "center",
          justifyContent: "center",
          mt: 5,
          px: { xs: 2, sm: 4 },
          py: { xs: 1, sm: 3 },
        }}
      >
        <Grid
          item
          sm={12}
          md={8}
          lg={6}
          sx={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: { xs: "transparent", sm: "background.default" },
            borderRadius: 2,
            boxShadow: { xs: "none", sm: 3 },
            p: { xs: 2, sm: 4 },

            m: { xs: 1, sm: 3 },
            width: "100%",
          }}
        >
          <Stepper
            activeStep={activeStep}
            sx={{
              display: "flex",
              mb: 3,
              flexWrap: "wrap",
            }}
            alternativeLabel
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Box sx={{ mb: 3 }}>{getStepContent(activeStep)}</Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: { xs: "column-reverse", sm: "row" },
              gap: 2,
            }}
          >
            {activeStep !== 0 && (
              <Button
                onClick={handleBack}
                startIcon={<ChevronLeftRoundedIcon />}
                sx={{ mt: { xs: 1, sm: 0 }, width: { xs: "100%", sm: "auto" } }}
              >
                Back
              </Button>
            )}
            <Button
              onClick={
                activeStep === steps.length - 1 ? handleSubmit : handleNext
              }
              endIcon={
                activeStep === steps.length - 1 ? (
                  loading ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    <ChevronRightRoundedIcon />
                  )
                ) : (
                  <ChevronRightRoundedIcon />
                )
              }
              disabled={loading}
              sx={{
                width: { xs: "100%", sm: "auto" },
                mb: 2,
                backgroundColor:
                  activeStep === steps.length - 1 ? "primary.main" : undefined,
                color: activeStep === steps.length - 1 ? "white" : undefined,
                "&:hover":
                  activeStep === steps.length - 1
                    ? {
                        backgroundColor: "primary.dark",
                      }
                    : undefined,
                "&:disabled":
                  activeStep === steps.length - 1
                    ? {
                        backgroundColor: "disabled.main",
                        color: "disabled.contrastText",
                      }
                    : undefined,
              }}
            >
              {loading
                ? "Submitting..."
                : activeStep === steps.length - 1
                ? "Submit"
                : "Proceed"}
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Error Modal */}
      <Dialog open={modalOpen} onClose={handleCloseErrorModal}>
        <DialogTitle>Error</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <ErrorIcon color="error" />
            <span>{error}</span>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={successModalOpen} onClose={handleCloseSuccessModal}>
        <DialogTitle>Success</DialogTitle>
        <DialogContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <CheckCircleIcon color="success" />
            <span>{success}</span>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
