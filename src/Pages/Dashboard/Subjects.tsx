import * as React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

interface Subject {
  id: number;
  subjectName: string;
  teacher: string;
  schedule: string;
}

// Generate Subject Data
function createSubjectData(
  id: number,
  subjectName: string,
  teacher: string,
  schedule: string
): Subject {
  return { id, subjectName, teacher, schedule };
}

const subjects: Subject[] = [
  createSubjectData(0, 'Mathematics', 'Mr. Smith', 'Mon & Wed 9:00-10:30 AM'),
  createSubjectData(1, 'Physics', 'Dr. Johnson', 'Tue & Thu 10:00-11:30 AM'),
  createSubjectData(2, 'Chemistry', 'Ms. Lee', 'Mon & Wed 11:00-12:30 PM'),
  createSubjectData(3, 'Biology', 'Mr. Brown', 'Tue & Thu 1:00-2:30 PM'),
  createSubjectData(4, 'History', 'Ms. Davis', 'Fri 9:00-11:00 AM'),
];

export default function Subjects() {
  const [addedSubjects, setAddedSubjects] = React.useState<Subject[]>([]);

  const handleAddSubject = (subject: Subject) => {
    setAddedSubjects((prevSubjects) => [...prevSubjects, subject]);
  };

  const handleSubmitSubjects = () => {
    // Implement the submit logic here
    console.log('Submitted Subjects:', addedSubjects);
  };

  return (
    <React.Fragment>
      <Title>Available Subjects</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Subject Name</TableCell>
            <TableCell>Teacher</TableCell>
            <TableCell>Schedule</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {subjects.map((subject) => (
            <TableRow key={subject.id}>
              <TableCell>{subject.subjectName}</TableCell>
              <TableCell>{subject.teacher}</TableCell>
              <TableCell>{subject.schedule}</TableCell>
              <TableCell>
                <Button 
                  variant="contained" 
                  onClick={() => handleAddSubject(subject)}
                >
                  ADD
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Title>Added Subjects</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Subject Name</TableCell>
            <TableCell>Teacher</TableCell>
            <TableCell>Schedule</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addedSubjects.map((subject, index) => (
            <TableRow key={index}>
              <TableCell>{subject.subjectName}</TableCell>
              <TableCell>{subject.teacher}</TableCell>
              <TableCell>{subject.schedule}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleSubmitSubjects} 
        sx={{ mt: 3 }}
      >
        Submit Subjects
      </Button>
    </React.Fragment>
  );
}
