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
import PersonalData from "./PersonaData"; //personal data component
import FamilyBackground from "./FamilyBackground";
import AcademicBackground from "./AcademicBg";
import AcademicHist from "./AcademicHist";
import AdditionalDocs from "./AdditionalDocs";

const steps = [
  "Personal Data",
  "Family Background",
  "Academic Background",
  "Academic History",
  "Additional Documents",
];

function getStepContent(step: number) {
  switch (step) {
    case 0:
      return <PersonalData />; //personal data component
    case 1:
      return <FamilyBackground />;
    case 2:
      return <AcademicBackground />;
    case 3:
      return <AcademicHist />;
    case 4:
      return <AdditionalDocs />;
    default:
      throw new Error("Unknown step");
  }
}

export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

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
          py: { xs: 1, sm: 3 }, // Add padding to ensure spacing around the card
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
            m: { xs: 1, sm: 3 }, // Add margin to ensure spacing around the card
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
              onClick={handleNext}
              endIcon={<ChevronRightRoundedIcon />}
              sx={{ width: { xs: "100%", sm: "auto" } }}
            >
              {activeStep === steps.length - 1 ? "Submit" : "Proceed"}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
