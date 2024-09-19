import React, { useState } from 'react';
import {
  Fab,
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  Snackbar,
} from '@mui/material';
import BugReportIcon from '@mui/icons-material/BugReport';
import axios from 'axios';

const BugReportComponent: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [bugDescription, setBugDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async () => {
    if (!bugDescription.trim()) {
      setSnackbarMessage('Please enter a bug description');
      setSnackbarOpen(true);
      return;
    }

    setIsSubmitting(true);
    try {
      // Replace with your actual API endpoint
      await axios.post('https://afknon.pythonanywhere.com/api/bugs/', { report_data: bugDescription });
      setSnackbarMessage('Bug report submitted successfully');
      setSnackbarOpen(true);
      handleClose();
      setBugDescription('');
    } catch (error) {
      console.error('Error submitting bug report:', error);
      setSnackbarMessage('Failed to submit bug report. Please try again.');
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Fab
        color="secondary"
        aria-label="report bug"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
        }}
        onClick={handleOpen}
      >
        <BugReportIcon />
      </Fab>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="bug-report-modal-title"
        aria-describedby="bug-report-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}>
          <Typography id="bug-report-modal-title" variant="h6" component="h2" gutterBottom>
            Report a Bug
          </Typography>
          <TextField
            id="bug-description"
            label="Bug Description"
            multiline
            rows={4}
            value={bugDescription}
            onChange={(e) => setBugDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
            sx={{ mt: 2 }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Bug Report'}
          </Button>
        </Box>
      </Modal>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message={snackbarMessage}
      />
    </>
  );
};

export default BugReportComponent;