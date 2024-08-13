import * as React from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Snackbar, Alert, Modal, Box, Button, Typography } from '@mui/material';

interface Subject {
  offercode: string;
  Description: string;
  subject_code: string;
  unit: number;
  course_id: number; 
  active: boolean;
}

interface Schedule {
  id: number;
  class_day: string;
  class_hour_start: string;
  class_hour_end: string;
  staff: number; // Adjust based on your API response
  offercode: string;
  room: number; // Adjust based on your API response
  active: boolean;
}

export default function Subjects() {
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(null);
  const [schedules, setSchedules] = React.useState<Schedule[]>([]);
  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error'>('success');
  const [openModal, setOpenModal] = React.useState<boolean>(false);

  // Fetch subjects from the backend on component mount
  React.useEffect(() => {   
    axios.get<Subject[]>('http://127.0.0.1:8000/api/subject/')
      .then((response) => {
        setSubjects(response.data);
        console.log('Fetched subjects successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching subjects:', error);
        setSnackbarMessage('Error fetching subjects.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  }, []);

  // Fetch schedules for a subject
  const fetchSchedules = (subjectCode: string) => {
    axios.get<Schedule[]>(`http://127.0.0.1:8000/api/schedule/`)
      .then((response) => {
        setSchedules(response.data.filter(schedule => schedule.offercode === subjectCode));
        console.log('Fetched schedules successfully:', response.data);
      })
      .catch((error) => {
        console.error('Error fetching schedules:', error);
        setSnackbarMessage('Error fetching schedules.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  };

  // Handle subject row click
  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
    fetchSchedules(subject.subject_code);
    setOpenModal(true);
  };

  // Close the Snackbar
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Close the modal
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <React.Fragment>
      <Title>Available Subjects</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Subject Code</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Units</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((subject) => (
            <TableRow key={subject.offercode} onClick={() => handleSubjectClick(subject)}>
              <TableCell>{subject.subject_code}</TableCell>
              <TableCell>{subject.Description}</TableCell>
              <TableCell>{subject.unit}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      {/* Modal for showing schedules */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
      >
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: 400, 
          bgcolor: 'background.paper', 
          border: '2px solid #000', 
          boxShadow: 24, 
          p: 4 
        }}>
          <Typography variant="h6" component="h2">
            Schedules for {selectedSubject?.subject_code}
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Staff</TableCell>
                <TableCell>Room</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>{schedule.class_day}</TableCell>
                  <TableCell>{schedule.class_hour_start}</TableCell>
                  <TableCell>{schedule.class_hour_end}</TableCell>
                  <TableCell>{`${schedule.staff}`}</TableCell>
                  <TableCell>{`${schedule.room}`}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button onClick={handleCloseModal} variant="outlined" color="primary" sx={{ mt: 2 }}>
            Close
          </Button>
        </Box>
      </Modal>
    </React.Fragment>
  );
}
