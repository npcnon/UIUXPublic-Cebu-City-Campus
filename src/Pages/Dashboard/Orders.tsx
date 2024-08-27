import { useState } from 'react';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Enrollee {
  id: number;
  name: string;
  department: string;
  status: string;
}

export default function Orders() {
  const [enrollees, setEnrollees] = useState<Enrollee[]>([
    { id: 1, name: 'John Doe', department: 'Bachelor of Science in Computer Science', status: 'Pending' },
    { id: 2, name: 'Jane Smith', department: 'Bachelor of Arts in English Literature', status: 'Pending' },
    { id: 3, name: 'Alice Johnson', department: 'Bachelor of Science in Mechanical Engineering', status: 'Pending' },
    { id: 4, name: 'Bob Brown', department: 'Bachelor of Business Administration', status: 'Pending' },
  ]);

  const handleAccept = (id: number) => {
    // Simulate acceptance by updating status locally
    const updatedEnrollees = enrollees.map(enrollee =>
      enrollee.id === id ? { ...enrollee, status: 'Accepted' } : enrollee
    );
    setEnrollees(updatedEnrollees);

    // In a real application, you would send a PUT request to update the enrollee status in the backend
    console.log(`Accepted enrollee with ID: ${id}`);
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Department</TableCell>
            <TableCell>Status</TableCell>
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
                {enrollee.status !== 'Accepted' && (
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAccept(enrollee.id)}
                  >
                    Accept
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
