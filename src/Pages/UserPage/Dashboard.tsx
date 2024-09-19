// Dashboard.tsx

import * as React from 'react';
import { Typography, Box, Paper } from '@mui/material';

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Paper elevation={3} sx={{ padding: 2, marginBottom: 2 }}>
        <Typography variant="h4">Dashboard</Typography>
        <Typography variant="body1">
          Welcome to the student portal dashboard! Here you can view important information and updates.
        </Typography>
      </Paper>
      <Paper elevation={3} sx={{ padding: 2 }}>
        <Typography variant="h6">Recent Activities</Typography>
        <Typography variant="body2">
          - Completed registration for the new semester.
          <br />
          - Enrolled in courses for the upcoming term.
        </Typography>
      </Paper>
    </Box>
  );
};

export default Dashboard;
