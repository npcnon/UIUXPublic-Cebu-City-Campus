// MyAddedSubjects.tsx
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Schedule } from './Subjects';

interface MyAddedSubjectsProps {
  myAddedSubjects: Schedule[];
  selectedSubject: {
    subject_code: string;
    unit: number;
  } | null;
  onRemoveSubject: (id: number) => void; // Function to remove a subject
}

const MyAddedSubjects: React.FC<MyAddedSubjectsProps> = ({ myAddedSubjects,  onRemoveSubject }) => {
  return (
    <>
      <Typography variant="h6" component="h2" sx={{ mt: 4, mb: 2 }}>
        My Added Subjects
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Subject Code</TableCell>
            <TableCell>Units</TableCell>
            <TableCell>Day</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Instructor</TableCell>
            <TableCell>Room</TableCell>
            <TableCell>Actions</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {myAddedSubjects.map((schedule) => (
            <TableRow key={schedule.id}>
              <TableCell>{schedule.subject_code}</TableCell>
              <TableCell>{schedule.unit}</TableCell>
              <TableCell>{schedule.class_day}</TableCell>
              <TableCell>{schedule.class_hour_start}</TableCell>
              <TableCell>{schedule.class_hour_end}</TableCell>
              <TableCell>{schedule.staffName}</TableCell>
              <TableCell>{schedule.room}</TableCell>
              <TableCell>
                <Button onClick={() => onRemoveSubject(schedule.id)} variant="outlined" color="secondary">
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </>
  );
};

export default MyAddedSubjects;
