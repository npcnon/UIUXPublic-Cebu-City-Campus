import * as React from 'react';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
//imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import Typography from '@mui/material/Typography';
//end of imports

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));


export default function AcademicHist() {
  const [honor, setHonor] = React.useState('');
  const [year, setYear] = React.useState('');
  const [yearTaken, setTaken] = React.useState('');
  const [course, setCourse] = React.useState('');
  

  const handleHonorChange = (event: SelectChangeEvent) => {
    setHonor(event.target.value as string);
  };
  const handleYearChange = (event: SelectChangeEvent) => {
    setYear(event.target.value as string);
  };
  const handleTakenChange = (event: SelectChangeEvent) => {
    setTaken(event.target.value as string);
  }

  const handleCourseChange = (event: SelectChangeEvent) => {
    setCourse(event.target.value as string);
  }
  return (
    
    <>
    <Typography variant="h5" gutterBottom>
    For Undergraduate
    </Typography>
    <Typography variant="h6" gutterBottom>
    I. Elementary
    </Typography>
    
    <Grid container spacing={3} 
      sx={{
        mb: 3
      }}>
      
      <FormGrid item xs={12} md={6} lg={12}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off" 
      >
      <FormControl fullWidth>
       <TextField id="Eschool-name" label="School Name" variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>

      <FormGrid item xs={12} md={6} lg={12}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off"
      >
      <FormControl fullWidth>
       <TextField id="school-address" label="Address" variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>

      <FormGrid item xs={12} md={6} lg={4}>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Year Graduated</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="elemYearGrad"
          value={year}
          label="Year Graduated"
          onChange={handleYearChange}
        >
          <MenuItem value={1}>2001-2002</MenuItem>
          <MenuItem value={2}>2002-2003</MenuItem>
          
        </Select>
      </FormControl>    
    </Box>
    </FormGrid> 

      
      </Grid>


      <Typography variant="h6" gutterBottom>
      II. Secondary
      </Typography>
      <Grid container spacing={3} 
      sx={{
        mb: 3
      }}>
      
      <FormGrid item xs={12} md={6} lg={12}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off" 
      >
      <FormControl fullWidth>
       <TextField id="hschool-name" label="School Name" variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>

      <FormGrid item xs={12} md={6} lg={8}>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Honor Received</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="honor1"
          value={honor}
          label="Honor Received"
          onChange={handleHonorChange}
        >
          <MenuItem value={1}>Summa-cum laude</MenuItem>
          <MenuItem value={2}>Magna-cum laude</MenuItem>
          <MenuItem value={3}>Cum laude</MenuItem>
          
        </Select>
      </FormControl>    
    </Box>
    </FormGrid> 

      <FormGrid item xs={12} md={6} lg={4}>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Year Graduated</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="hsgrad"
          value={year}
          label="Year Graduated"
          onChange={handleYearChange}
        >
          <MenuItem value={1}>2001-2002</MenuItem>
          <MenuItem value={2}>2002-2003</MenuItem>
          
        </Select>
      </FormControl>    
    </Box>
    </FormGrid> 

      <FormGrid item xs={12} md={6} lg={12}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off"
      >
      <FormControl fullWidth>
       <TextField id="school-address" label="Address" variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>

      <FormGrid item xs={12} md={6} lg={6}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off"
      >
      <FormControl fullWidth>
       <TextField id="ncaeGrade" label="NCAE Grade" variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>

      <FormGrid item xs={12} md={6} lg={6}>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Year Taken</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="elemYearGrad"
          value={yearTaken}
          label="Year Graduated"
          onChange={handleTakenChange}
        >
          <MenuItem value={1}>2001-2002</MenuItem>
          <MenuItem value={2}>2002-2003</MenuItem>
          
        </Select>
      </FormControl>    
    </Box>
    </FormGrid> 
      </Grid>

      <Typography variant="h6" gutterBottom>
      III. Latest College Attended
      </Typography>
      <Grid container spacing={3} 
      sx={{
        mb: 3
      }}>
      
      <FormGrid item xs={12} md={6} lg={12}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off" 
      >
      <FormControl fullWidth>
       <TextField id="college-name" label="School Name" variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>

      <FormGrid item xs={12} md={6} lg={7}>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Honor Received</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="honor1"
          value={honor}
          label="Honor Received"
          onChange={handleHonorChange}
        >
          <MenuItem value={1}>Summa-cum laude</MenuItem>
          <MenuItem value={2}>Magna-cum laude</MenuItem>
          <MenuItem value={3}>Cum laude</MenuItem>
          
        </Select>
      </FormControl>    
    </Box>
    </FormGrid> 

      <FormGrid item xs={12} md={6} lg={5}>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Course</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="current-course"
          value={year}
          label="course"
          onChange={handleCourseChange}
        >
          <MenuItem value={1}>BSIT</MenuItem>
          <MenuItem value={2}>BSTM</MenuItem>
          
        </Select>
      </FormControl>    
    </Box>
    </FormGrid> 

      <FormGrid item xs={12} md={6} lg={12}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off"
      >
      <FormControl fullWidth>
       <TextField id="school-address" label="Address" variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>
      </Grid>
      

   
  </>
    
  );

}
