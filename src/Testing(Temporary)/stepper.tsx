// filename: stepper.tsx

import React, { useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import FamilyBackground from './FamilyBackground';
import EducationDetails from './EducationDetails';
import PersonalData from '../Pages/Enrollment/Personalform';

const steps = ['Personal Information', 'Family Background', 'Education Details'];

export default function FormStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completed, setCompleted] = useState<{ [k: number]: boolean }>({});
  const validateRef = useRef<() => Promise<boolean>>(async () => true);

  const totalSteps = () => steps.length;
  const completedSteps = () => Object.keys(completed).length;
  const isLastStep = () => activeStep === totalSteps() - 1;
  const allStepsCompleted = () => completedSteps() === totalSteps();

  const handleNext = async () => {
    const isValid = await validateRef.current();
    if (isValid) {
      const newActiveStep =
        isLastStep() && !allStepsCompleted()
          ? steps.findIndex((step, i) => !(i in completed))
          : activeStep + 1;
      setActiveStep(newActiveStep);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    setCompleted({ ...completed, [activeStep]: true });
    handleNext();
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompleted({});
  };

  const handleSubmit = () => {
    alert("Form submitted successfully!");
    // Implement the actual submit logic here
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <PersonalData onValidate={validateRef} />;
      case 1:
        return <FamilyBackground />;
      case 2:
        return <EducationDetails />;
      default:
        return <div>Unknown Step</div>;
    }
  };

  return (
    <Box sx={{ width: '100%', mt: 5, display: 'flex', justifyContent: 'center' }}>
      <Card sx={{ width: 500, padding: 3 }}>
        <CardContent>
          <Stepper nonLinear activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label} completed={completed[index]}>
                <StepButton color="inherit" onClick={handleStep(index)}>
                  {label}
                </StepButton>
              </Step>
            ))}
          </Stepper>
          <div>
            {allStepsCompleted() ? (
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - ready to submit
              </Typography>
            ) : (
              <Box sx={{ mt: 2, mb: 1, py: 1 }}>
                {renderStepContent(activeStep)}
              </Box>
            )}
          </div>
        </CardContent>
        <CardActions>
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {allStepsCompleted() ? (
            <Button onClick={handleSubmit} variant="contained" color="primary">
              Submit
            </Button>
          ) : (
            <>
              <Button onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
            </>
          )}
        </CardActions>
      </Card>
    </Box>
  );
}
