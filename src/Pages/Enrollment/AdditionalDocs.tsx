
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
//imports
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import ImageIcon from '@mui/icons-material/Image';
//end of imports
const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  
}));

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

export default function AdditionalDocs() {
  

  return (
    <>
    <Typography variant="h6" gutterBottom>
    I. Supporting Documents
    </Typography>

    <Grid container spacing={3} 
    sx={{
        justifyContent: 'center',
      mt: 2,
      mb: 3
    }}>
        <FormGrid item xs={12} md={6} lg={6}>
        <Box
      sx={{
        
        bgcolor: '#f5f5f5',
        p: 8,
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Skeleton
        sx={{ bgcolor: 'grey.900' }}
        variant="rectangular"
        width={210}
        height={118}
      />
    </Box>
    </FormGrid>
 
    <FormGrid item xs={12} md={6} lg={4}>     
    <Button sx={{
        mb:2
    }}
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<ImageIcon />}
    >
      Upload Image
      <VisuallyHiddenInput type="file" />
    </Button>

    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<AttachFileIcon />}
    >
      Upload File
      <VisuallyHiddenInput type="file" />
    </Button>
    
    </FormGrid>

    </Grid>
  </>
);
}
