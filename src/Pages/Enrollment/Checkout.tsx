// Filename: Checkout.tsx

import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import ErrorIcon from '@mui/icons-material/Error';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import axios from 'axios';
import library from '../../StaticFiles/lib.jpg';
import { useAcademicStore } from '../../stores/useAcademicStore';
import { usePersonalStore } from '../../stores/usePersonalStore';
import { useFamilyStore } from '../../stores/useFamilyStore';
import { useAcHistStore } from '../../stores/useAcHistStore';
import { useRef } from 'react';
import PersonalData from './Personalform';
import FamilyBackground from './FamilyBackground';
import AcademicBackground from './AcademicBackgroundForm';
import AcademicHist from './AcademicHist';
import AdditionalDocs from './AdditionalDocs';
import { Typography, Fade } from '@mui/material';
import { useState } from 'react';
const steps = [
  "Personal Data",
  "Family Background",
  "Academic Background",
  "Academic History",
  "Additional Documents",
];




export default function Checkout() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [modalOpen, setModalOpen] = React.useState(false);
  const [successModalOpen, setSuccessModalOpen] = React.useState(false);
  const validateRef = useRef<() => Promise<boolean>>(async () => true);
  const contentRef = useRef<HTMLDivElement>(null);
  const [fadeIn, setFadeIn] = useState(true);

  const { updateAcademicBackgroundAPI } = useAcademicStore(state => ({
    updateAcademicBackgroundAPI: state.updateAcademicBackgroundAPI
  }));

  const { updatePersonalAPI, updateAddPersonalAPI } = usePersonalStore(state => ({
    updatePersonalAPI: state.updatePersonalAPI,
    updateAddPersonalAPI: state.updateAddPersonalAPI
  }));

  const { updateFamilyBackgroundAPI } = useFamilyStore(state => ({
    updateFamilyBackgroundAPI: state.updateFamilyBackgroundAPI
  }));

  const { updateAcHistAPI } = useAcHistStore(state => ({
    updateAcHistAPI: state.updateAcHistAPI
  }));

  const handleNext = async () => {
    const isValid = await validateRef.current();
    if (isValid) {
      setFadeIn(false);
      setTimeout(() => {
        setActiveStep(prevActiveStep => Math.min(prevActiveStep + 1, steps.length - 1));
        setFadeIn(true);
      }, 300);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Scroll to the first error
      const firstError = document.querySelector('.Mui-error');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const handleBack = () => {
    setFadeIn(false);
    setTimeout(() => {
      setActiveStep(prevActiveStep => Math.max(prevActiveStep - 1, 0));
      setFadeIn(true);
    }, 300);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      updateAcademicBackgroundAPI();
      const updatedAcademicBackgroundAPI = useAcademicStore.getState().academicBackgroundAPI;

      updatePersonalAPI();
      const updatedPersonalAPI = usePersonalStore.getState().personalAPI;

      updateAddPersonalAPI();
      const updatedAddPersonalAPI = usePersonalStore.getState().addPersonalAPI;

      updateFamilyBackgroundAPI();
      const updatedamilyBackgroundAPI = useFamilyStore.getState().familyBackgroundAPI;

      updateAcHistAPI();
      const updatedAcHistAPI = useAcHistStore.getState().acHistAPI;

      const formattedPersonalData = {
        ...updatedPersonalAPI,
        birth_date: updatedPersonalAPI.birth_date ? updatedPersonalAPI.birth_date.toISOString().split('T')[0] : null,
      };

      await axios.post('http://127.0.0.1:8000/api/stdntpersonal/', formattedPersonalData);
      await axios.post('http://127.0.0.1:8000/api/addstdntpersonal/', updatedAddPersonalAPI);
      await axios.post('http://127.0.0.1:8000/api/stdntfamily/', updatedamilyBackgroundAPI);
      await axios.post('http://127.0.0.1:8000/api/stdntacademicbackground/', updatedAcademicBackgroundAPI);
      await axios.post('http://127.0.0.1:8000/api/stdntacademichistory/', updatedAcHistAPI);

      setSuccess("Data submitted successfully!");
      setSuccessModalOpen(true);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setError(`Error: ${error.response?.data || "Unknown error"}`);
      } else if (error instanceof Error) {
        setError(`Error: ${error.message}`);
      } else {
        setError("An unknown error occurred");
      }
      setModalOpen(true);
    } finally {
      setLoading(false);
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
        return <PersonalData onValidate={validateRef} />;
      case 1:
        return <FamilyBackground onValidate={validateRef}/>;
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

  return (
    <>
      <CssBaseline />
      <Grid
        container
        sx={{
          minHeight: "100vh",
          alignItems: "center",
          justifyContent: "center",
          px: { xs: 2, sm: 4 },
          py: { xs: 1, sm: 3 },
          backgroundImage: `url(${library})`,
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed', // Keeps the background fixed during scroll
        }}
      >
        <Grid
          item
          sm={12}
          md={10}
          lg={8}
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
          <Box sx={{ mb: 3, position: 'relative' }}>
            {/* Step indicator */}
            <Typography
              variant="h6"
              sx={{
                position: 'absolute',
                top: -15,
                right: 0,
                margin: 2,
                fontWeight: 'bold',
                color: "#909090", 
              }}
            >
              {`${activeStep + 1}/${steps.length}`}
            </Typography>

            {/* Current step title */}
            {/* <Fade in={fadeIn} timeout={300}>
              <Typography
                variant="h4"
                align="center"
                sx={{ 
                  mt: 4, 
                  mb: 6,
                  fontWeight: 'bold',
                  color: "#898989", 

                }}
                
              >
                {steps[activeStep]}
              </Typography>
            </Fade> */}

            {/* Step content */}
            <Fade in={fadeIn} timeout={300}>
              <Box sx={{ mt: 6 }} ref={contentRef}>
                {getStepContent(activeStep)}
              </Box>
            </Fade>
          </Box>
          
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
                
                startIcon={<KeyboardArrowLeft />}
                sx={{ mt: { xs: 1, sm: 0 }, width: { xs: "100%", sm: "auto" } }}
              >
                Back
              </Button>
            )}

            {activeStep === steps.length - 1 ? (
              <Button
                onClick={handleSubmit}
                disabled={loading}
                endIcon={
                  loading ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <CheckCircleIcon />
                  )
                }
                sx={{ mt: { xs: 1, sm: 0 }, width: { xs: "100%", sm: "auto" } }}
              >
                Submit
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                endIcon={<KeyboardArrowRight />}
                sx={{ mt: { xs: 1, sm: 0 }, width: { xs: "100%", sm: "auto" } }}
              >
                Proceed
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>

      {/* Error Dialog */}
      <Dialog open={modalOpen} onClose={handleCloseErrorModal}>
        <DialogTitle>
          <ErrorIcon color="error" /> Submission Error
        </DialogTitle>
        <DialogContent>
          <Typography>{error}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseErrorModal}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={successModalOpen} onClose={handleCloseSuccessModal}>
        <DialogTitle>
          <CheckCircleIcon color="success" /> Submission Success
        </DialogTitle>
        <DialogContent>
          <Typography>{success}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSuccessModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
