import * as React from "react";
import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
/*
interface Enrollee {
  id: number;
  name: string;
  department: string;
  status: string;
}
*/
const steps = ["Registration", "Enlistment", "Study Load"];

export default function AddingSubjects() {
  /* const [enrollees, setEnrollees] = useState<Enrollee[]>([
    {
      id: 1,
      name: "John Doe",
      department: "Bachelor of Science in Computer Science",
      status: "Pending",
    },
    {
      id: 2,
      name: "Jane Smith",
      department: "Bachelor of Arts in English Literature",
      status: "Pending",
    },
    {
      id: 3,
      name: "Alice Johnson",
      department: "Bachelor of Science in Mechanical Engineering",
      status: "Pending",
    },
    {
      id: 4,
      name: "Bob Brown",
      department: "Bachelor of Business Administration",
      status: "Pending",
    },
  ]);
  */

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set<number>());

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  /* Adding subject
  const handleAccept = (id: number) => {
    // Simulate acceptance by updating status locally
    const updatedEnrollees = enrollees.map((enrollee) =>
      enrollee.id === id ? { ...enrollee, status: "Accepted" } : enrollee
    );
    setEnrollees(updatedEnrollees);

    // In a real application, you would send a PUT request to update the enrollee status in the backend
    console.log(`Accepted enrollee with ID: ${id}`);
  };
  */
  return (
    <Grid
      sx={{
        minHeight: "100vh", // Ensure it covers the full height of the viewport
        backgroundColor: "#03153e", // Set your desired background color
        display: "flex", // Center the content horizontally and vertically
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: 2,
          boxShadow: { xs: "none", sm: 3 },
          justifyContent: "center",
          backgroundColor: "#f5f5f5", // Add your desired background color here
          padding: "50px", // Optional: Add some padding inside the Box
        }}
      >
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: React.ReactNode;
            } = {};
            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant="caption">Optional</Typography> // example
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>
              All steps completed - you&apos;re finished
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Box sx={{ flex: "1 1 auto" }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography>
            <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
                sx={{ mr: 1 }}
              >
                Back
              </Button>
              <Box sx={{ flex: "1 1 auto" }} />
              {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )}
              <Button onClick={handleNext}>
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Grid>
  );
}
