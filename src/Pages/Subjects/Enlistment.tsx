import * as React from "react";
import Sidebar from "./Sidebar";
import {
  Typography,
  Grid,
  Box,
  Paper,
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  InputLabel,
  MenuItem,
  FormControl,
} from "@mui/material";
import { useState } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";

interface Enrollee {
  id: number;
  name: string;
  department: string;
  status: string;
}

export default function Enlistment() {
  const [enrollees, setEnrollees] = useState<Enrollee[]>([
    {
      id: 1,
      name: "IT 410",
      department: "Capstone Project II",
      status: "2",
    },
    {
      id: 1,
      name: "IT 410L",
      department: "Capstone Project II",
      status: "2",
    },
    {
      id: 2,
      name: "IT 411",
      department: "Integrative Programming & Technologies",
      status: "2",
    },
    {
      id: 2,
      name: "IT 411L",
      department: "Integrative Programming & Technologies",
      status: "2",
    },
    {
      id: 3,
      name: "IT 412",
      department: "Systems Administration & Maintenance",
      status: "2",
    },
    {
      id: 3,
      name: "IT 412L",
      department: "Systems Administration & Maintenance",
      status: "2",
    },
    {
      id: 4,
      name: "IT ELEC 3",
      department: "IT Elective III",
      status: "2",
    },
    {
      id: 4,
      name: "IT ELEC 3L",
      department: "IT Elective III",
      status: "2",
    },
  ]);

  const handleAccept = (id: number) => {
    // Simulate acceptance by updating status locally
    const updatedEnrollees = enrollees.map((enrollee) =>
      enrollee.id === id ? { ...enrollee, status: "Accepted" } : enrollee
    );
    setEnrollees(updatedEnrollees);

    // In a real application, you would send a PUT request to update the enrollee status in the backend
    console.log(`Accepted enrollee with ID: ${id}`);
  };

  //select inputs
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={1} direction="row">
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  color="#2e2e2e"
                  sx={{
                    fontWeight: "bold",
                    lineHeight: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Enrollment Status for School Year 2024 - 2025
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ m: 3 }}>
              {/* Set Grid container direction to row */}
              <Grid container spacing={1} direction="row">
                <Grid item xs={3}>
                  <Box
                    sx={{
                      mb: 2,
                    }}
                  >
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Semester
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={age}
                        label="Semester"
                        onChange={handleChange}
                        sx={{
                          borderRadius: "16px", // apply border-radius to the Select component
                          "& fieldset": {
                            borderRadius: "32px", // apply border-radius to the border itself
                          },
                        }}
                      >
                        <MenuItem value={10}>1st Semester</MenuItem>
                        <MenuItem value={20}>2nd Semester</MenuItem>
                        <MenuItem value={30}>Summer</MenuItem>
                      </Select>
                    </FormControl>
                  </Box>
                </Grid>

                {/*table */}
                <TableContainer
                  component={Paper}
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    height: 400,

                    bgcolor: "#fbfcf8",
                    borderRadius: "6px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.6)",
                    boxSizing: "border-box",
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Code</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Units</TableCell>
                        <TableCell>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {enrollees.map((enrollee) => (
                        <TableRow key={enrollee.id}>
                          <TableCell>{enrollee.name}</TableCell>
                          <TableCell>{enrollee.department}</TableCell>
                          <TableCell>{enrollee.status}</TableCell>
                          <TableCell>
                            {enrollee.status !== "Accepted" && (
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleAccept(enrollee.id)}
                              >
                                Add
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
