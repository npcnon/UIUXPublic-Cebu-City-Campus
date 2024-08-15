import * as React from 'react';
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { Snackbar, Alert, Modal, Box, Button, Typography } from '@mui/material';
import MyAddedSubjects from './MyAddedSubjects';

interface Subject {
  offercode: string;
  Description: string;
  subject_code: string;
  unit: number;
  course_id: number; 
  active: boolean;
}

interface Staff {
  id: number;
  f_name: string;
  m_name: string;
  l_name: string;
  department_id: number;
  active:boolean;
}

export interface Schedule {
  id: number;
  class_day: string;
  class_hour_start: string;
  class_hour_end: string;
  staff: number;
  offercode: string;
  room: number;
  active: boolean;
  staffName?: string;
  conflict?: boolean;
}

export default function Subjects() {
  const [subjects, setSubjects] = React.useState<Subject[]>([]);
  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(null);
  const [schedules, setSchedules] = React.useState<Schedule[]>([]);
  const [myAddedSubjects, setMyAddedSubjects] = React.useState<Schedule[]>([]);
  const [conflictMap, setConflictMap] = React.useState<Map<number, boolean>>(new Map());
  const [addedSubjectIds, setAddedSubjectIds] = React.useState<Set<number>>(new Set()); // Track added subject IDs
  const [openSnackbar, setOpenSnackbar] = React.useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = React.useState<string>('');
  const [snackbarSeverity, setSnackbarSeverity] = React.useState<'success' | 'error' | 'info' | 'warning'>('success');
  const [openModal, setOpenModal] = React.useState<boolean>(false);

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

  const checkForConflicts = (schedules: Schedule[]) => {
    const conflicts = new Map<number, boolean>();
    schedules.forEach(schedule => {
      const hasConflict = !addedSubjectIds.has(schedule.id) && myAddedSubjects.some(addedSubject =>
        schedule.class_day === addedSubject.class_day &&
        ((schedule.class_hour_start <= addedSubject.class_hour_end && schedule.class_hour_end >= addedSubject.class_hour_start) ||
        (addedSubject.class_hour_start <= schedule.class_hour_end && addedSubject.class_hour_end >= schedule.class_hour_start))
        && schedule.room === addedSubject.room
      );
      conflicts.set(schedule.id, hasConflict);
    });
    return conflicts;
  };

  const handleSubjectClick = async (subject: Subject) => {
    setSelectedSubject(subject);
    try {
      const schedulesResponse = await axios.get<Schedule[]>(`http://127.0.0.1:8000/api/schedule/`);
      const filteredSchedules = schedulesResponse.data.filter(schedule => schedule.offercode === subject.offercode);
      setSchedules(filteredSchedules);
      console.log('Fetched schedules successfully:', filteredSchedules);
  
      const staffIds = Array.from(new Set(filteredSchedules.map(schedule => schedule.staff)));
  
      const staffResponse = await axios.get<Staff[]>(`http://127.0.0.1:8000/api/staff/?ids=${staffIds.join(',')}`);
      const staffData = staffResponse.data;
      
      const staffMap = new Map<number, Staff>();
      staffData.forEach(staff => staffMap.set(staff.id, staff));
  
      const schedulesWithStaff = filteredSchedules.map(schedule => ({
        ...schedule,
        staffName: staffMap.get(schedule.staff)?.f_name + ' ' + staffMap.get(schedule.staff)?.l_name || 'Unknown'
      }));
      
      const conflictMap = checkForConflicts(schedulesWithStaff);
      setConflictMap(conflictMap);
      setSchedules(schedulesWithStaff);
      setOpenModal(true);
    } catch (error) {
      console.error('Error fetching schedules:', error);
      setSnackbarMessage('Error fetching schedules.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleAddSubject = (schedule: Schedule) => {
    if (addedSubjectIds.has(schedule.id)) {
      setSnackbarMessage('Subject already added.');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return;
    }

    if (conflictMap.get(schedule.id)) {
      setSnackbarMessage('Cannot add subject due to conflict.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    setMyAddedSubjects(prev => [...prev, schedule]);
    setAddedSubjectIds(prev => new Set(prev).add(schedule.id));
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

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

      <MyAddedSubjects 
        myAddedSubjects={myAddedSubjects} 
        selectedSubject={selectedSubject ? {
          subject_code: selectedSubject.subject_code,
          unit: selectedSubject.unit
        } : null} 
        onRemoveSubject={(id) => {
          setMyAddedSubjects(prev => prev.filter(schedule => schedule.id !== id));
          setAddedSubjectIds(prev => {
            const newSet = new Set(prev);
            newSet.delete(id);
            return newSet;
          });
        }} 
      />

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

      <Modal
        open={openModal}
        onClose={handleCloseModal}
      >
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)', 
          width: { xs: '90%', sm: '80%', md: '70%' }, 
          maxWidth: 800,
          bgcolor: 'background.paper', 
          border: '2px solid #000', 
          boxShadow: 24, 
          p: 2,
          overflow: 'auto'
        }}>
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Schedules for {selectedSubject?.subject_code}
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Day</TableCell>
                <TableCell>Start Time</TableCell>
                <TableCell>End Time</TableCell>
                <TableCell>Instructor</TableCell>
                <TableCell>Room</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schedules.map((schedule) => (
                <TableRow key={schedule.id}>
                  <TableCell>{schedule.class_day}</TableCell>
                  <TableCell>{schedule.class_hour_start}</TableCell>
                  <TableCell>{schedule.class_hour_end}</TableCell>
                  <TableCell>{`${schedule.staffName}`}</TableCell>
                  <TableCell>{`${schedule.room}`}</TableCell>
                  <TableCell>
                    <Button 
                      onClick={() => handleAddSubject(schedule)} 
                      variant="outlined" 
                      color={
                        addedSubjectIds.has(schedule.id) ? 'success' : (conflictMap.get(schedule.id) ? 'error' : 'primary')
                      }
                    >
                      {addedSubjectIds.has(schedule.id) ? 'Added' : (conflictMap.get(schedule.id) ? 'Conflict' : 'Add')}
                    </Button>
                  </TableCell>
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
