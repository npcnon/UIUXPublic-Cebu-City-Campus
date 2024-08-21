//familybackground.tsx

import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
//imports
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
//end of imports

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));


export default function FamilyBackground() {
  
  return (
    
    <>
    <Typography variant="h6" gutterBottom>
    I. Father's Name
    </Typography>
    
    <Grid container spacing={3} 
      sx={{
        mb: 3
      }}>
      
      <FormGrid item xs={12} md={6} lg={4}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off" 
      >
      <FormControl fullWidth>
       <TextField id="f-fname" label="First Name" variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>

      <FormGrid item xs={12} md={6} lg={4}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off"
      >
      <FormControl fullWidth>
       <TextField id="f-mname" label="Middle Name" variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>

      <FormGrid item xs={12} md={6} lg={4}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth>
       <TextField id="f-lname" label="Last Name" variant="outlined" /> 
       </FormControl>
        </Box>
      </FormGrid>
    
      <FormGrid item xs={12} md={8}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off" 
      >
      <FormControl fullWidth>
       <TextField id="fb-email" label="Email" variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>

      <FormGrid item xs={12} md={4}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off" 
      >
      <FormControl fullWidth>
       <TextField id="fb-contactno" label="Contact No." variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>

      <FormGrid item xs={12}>
      <Box sx={{ minWidth: 120}}
        component="form"
        noValidate
        autoComplete="off" 
      >
      <FormControl fullWidth>
       <TextField id="fb-address" label="Name & Address of Company" variant="outlined" />
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
       <TextField id="f-occupation" label="Occupation" variant="outlined" />
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
       <TextField id="f-occupation" label="Income" variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>
      </Grid>

      <Typography variant="h6" gutterBottom>
    II. Mother's Name
    </Typography>
    
    <Grid container spacing={3} 
      sx={{
        mb: 3
      }}>
      
      <FormGrid item xs={12} md={6} lg={4}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off" 
      >
      <FormControl fullWidth>
       <TextField id="m-fname" label="First Name" variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>

      <FormGrid item xs={12} md={6} lg={4}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off"
      >
      <FormControl fullWidth>
       <TextField id="m-mname" label="Middle Name" variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>

      <FormGrid item xs={12} md={6} lg={4}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth>
       <TextField id="m-lname" label="Last Name" variant="outlined" /> 
       </FormControl>
        </Box>
      </FormGrid>
    
      <FormGrid item xs={12} md={8}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off" 
      >
      <FormControl fullWidth>
       <TextField id="mb-email" label="Email" variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>

      <FormGrid item xs={12} md={4}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off" 
      >
      <FormControl fullWidth>
       <TextField id="mb-contactno" label="Contact No." variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>

      <FormGrid item xs={12}>
      <Box sx={{ minWidth: 120}}
        component="form"
        noValidate
        autoComplete="off" 
      >
      <FormControl fullWidth>
       <TextField id="mb-address" label="Name & Address of Company" variant="outlined" />
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
       <TextField id="m-occupation" label="Occupation" variant="outlined" />
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
       <TextField id="m-occupation" label="Income" variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>
      </Grid>




      <Typography variant="h6" gutterBottom>
    III. Guardian's Information
    </Typography>
    
    <Grid container spacing={3} 
      sx={{
        mb: 3
      }}>
      
      <FormGrid item xs={12} md={6} lg={4}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off" 
      >
      <FormControl fullWidth>
       <TextField id="g-fname" label="First Name" variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>

      <FormGrid item xs={12} md={6} lg={4}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off"
      >
      <FormControl fullWidth>
       <TextField id="g-mname" label="Middle Name" variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>

      <FormGrid item xs={12} md={6} lg={4}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off"
      >
        <FormControl fullWidth>
       <TextField id="g-lname" label="Last Name" variant="outlined" /> 
       </FormControl>
        </Box>
      </FormGrid>
    
      <FormGrid item xs={12} md={8}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off" 
      >
      <FormControl fullWidth>
       <TextField id="gb-email" label="Email" variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>

      <FormGrid item xs={12} md={4}>
      <Box sx={{ minWidth: 120 }}
        component="form"
        noValidate
        autoComplete="off" 
      >
      <FormControl fullWidth>
       <TextField id="gb-contactno" label="Contact No." variant="outlined" />
       </FormControl>
        </Box>
      </FormGrid>
      </Grid>
      

   
  </>
    
  );

}
