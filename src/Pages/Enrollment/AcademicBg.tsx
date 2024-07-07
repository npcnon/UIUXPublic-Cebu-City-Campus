import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';
//imports
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Typography from '@mui/material/Typography';
//end of imports
const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  
}));

export default function Review() {
  const [studentType, setStudentType] = React.useState('');
  const [applicationType, setApplicationType] = React.useState('');
  const [course, setCourse] = React.useState('');
  const [major, setMajor] = React.useState('');
  const [semester, setSemester] = React.useState('');
  const [year, setYear] = React.useState('');


  const handleStudentTypeChange = (event: SelectChangeEvent) => {
    setStudentType(event.target.value as string);
  };

  const handleApplicationTypeChange = (event: SelectChangeEvent) => {
    setApplicationType(event.target.value as string);
  };

  const handleCourseChange = (event: SelectChangeEvent) => {
    setCourse(event.target.value as string);
  };
  const handleMajorChange = (event: SelectChangeEvent) => {
    setMajor(event.target.value as string);
  };

  const handleSemesterChange = (event: SelectChangeEvent) => {
    setSemester(event.target.value as string);
  };

  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };


  return (
    <>
  
  <Typography variant="h6" gutterBottom>
    I. Academic Background Form
    </Typography>

    <Grid container spacing={3} 
    sx={{
      mb: 3
    }}>
    <FormGrid item xs={12} md={6} lg={5}>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Student Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="studentType"
          value={studentType}
          label="Student Type"
          onChange={handleStudentTypeChange}
        >
          <MenuItem value={1}>Graduate</MenuItem>
          <MenuItem value={2}>Undergraduate</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
    </FormGrid>

    <FormGrid item xs={12} md={6} lg={7}>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Application Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="applicationType"
          value={applicationType}
          label="Application Type"
          onChange={handleApplicationTypeChange}
        >
          <MenuItem value={1}>Freshmen</MenuItem>
          <MenuItem value={2}>Transferee</MenuItem>
          <MenuItem value={2}>Cross Enrollee</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
    </FormGrid>
   
    <FormGrid item xs={12} md={6} lg={6}>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Course</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="course"
          value={course}
          label="Course"
          onChange={handleCourseChange}
        >
          <MenuItem value={1}>BSIT</MenuItem>
          <MenuItem value={2}>BSTM</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
    </FormGrid>

    <FormGrid item xs={12} md={6} lg={6}>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Major</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="major"
          value={major}
          label="major"
          onChange={handleMajorChange}
        >
          <MenuItem value={1}>BSIT</MenuItem>
          <MenuItem value={2}>BSTM</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
    </FormGrid>

    <FormGrid item xs={12} md={6} lg={8}>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Semester Entry</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="semester"
          value={semester}
          label="Semester Year"
          onChange={handleSemesterChange}
        >
          <MenuItem value={1}>First Semester</MenuItem>
          <MenuItem value={2}>Second Semester</MenuItem>
          <MenuItem value={3}>Summer</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
    </FormGrid>

    <FormGrid item xs={12} md={6} lg={4}>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Year Entry</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="year"
          value={year}
          label="Year Entry"
          onChange={handleYearChange}
        >
          <MenuItem value={1}>2021-2022</MenuItem>
          <MenuItem value={2}>2022-2023</MenuItem>
          
        </Select>
      </FormControl>
    </Box>
    </FormGrid>


  </Grid>
  
  
  </>
);
}
