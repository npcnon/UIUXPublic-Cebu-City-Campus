import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, Typography, Grid, Divider, Chip, CircularProgress, Box, Avatar } from '@mui/material';
import {  School, Email, Phone, Home, Cake, WcOutlined } from '@mui/icons-material';
import apiClient from '../../services/interceptors';

interface ApplicantDetails {
  first_name: string;
  middle_name?: string;
  last_name: string;
  email: string;
  year_level: string;
  program: string;
  campus: string;
  contact_number: string;
  address: string;
  sex: string;
  birth_date: string;
  status: string;
}

interface StudentInfo {
  student_id: string;
  applicant_details: ApplicantDetails;
}

interface ProfileData {
  student_id: string;
  profile: {
    student_info: StudentInfo;
  };
}

const Registration: React.FC = () => {
    const [profile, setProfile] = useState<ProfileData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const fetchStudentInfo = async () => {
        try {
          const response = await apiClient.get("/user");
          setProfile(response.data);
        } catch (err) {
          console.error("Error fetching student info:", err);
          setError("Failed to load registration data.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchStudentInfo();
    }, []);
  
    if (loading) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <CircularProgress />
        </Box>
      );
    }
  
    if (error) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography color="error">{error}</Typography>
        </Box>
      );
    }
  
    if (!profile || !profile.profile || !profile.profile.student_info) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
          <Typography>No registration data available.</Typography>
        </Box>
      );
    }
  
    const { applicant_details } = profile.profile.student_info;
  
    const getStatusColor = (status: string) => {
      switch (status.toLowerCase()) {
        case 'approved':
          return 'success';
        case 'pending':
          return 'warning';
        case 'rejected':
          return 'error';
        default:
          return 'default';
      }
    };
  
    return (
      <Card variant="outlined" sx={{ maxWidth: 800, margin: 'auto', mt: 4, boxShadow: 3 }}>
        <CardHeader
          title={
            <Typography variant="h5" sx={{ mb: 2 }}>
              Student Registration Information
            </Typography>
          }
          sx={{ pb: 0 }}
        />
        <CardContent>
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar
              sx={{ width: 80, height: 80, bgcolor: 'primary.main', fontSize: '2rem' }}
            >
              {applicant_details.first_name[0]}{applicant_details.last_name[0]}
            </Avatar>
            <Box ml={3}>
              <Typography variant="h6">
                {`${applicant_details.first_name} ${applicant_details.middle_name ? applicant_details.middle_name + ' ' : ''}${applicant_details.last_name}`}
              </Typography>
              <Chip
                label={applicant_details.status.charAt(0).toUpperCase() + applicant_details.status.slice(1)}
                color={getStatusColor(applicant_details.status) as "success" | "warning" | "error" | "default"}
                sx={{ mt: 1, fontWeight: 'bold' }}
              />
            </Box>
          </Box>
          <Divider sx={{ mb: 3 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <InfoItem icon={<School color="primary" />} label="Year Level" value={applicant_details.year_level} />
              <InfoItem icon={<School color="primary" />} label="Program" value={applicant_details.program} />
              <InfoItem icon={<School color="primary" />} label="Campus" value={applicant_details.campus} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoItem icon={<Phone color="primary" />} label="Contact Number" value={applicant_details.contact_number} />
              <InfoItem icon={<Email color="primary" />} label="Email" value={applicant_details.email} />
              <InfoItem icon={<Home color="primary" />} label="Address" value={applicant_details.address} />
            </Grid>
            <Grid item xs={12} md={6}>
              <InfoItem icon={<Cake color="primary" />} label="Birth Date" value={applicant_details.birth_date} />
              <InfoItem icon={<WcOutlined color="primary" />} label="Sex" value={applicant_details.sex} />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  };
  
  const InfoItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
    <Box display="flex" alignItems="center" mb={2}>
      {icon}
      <Box ml={2}>
        <Typography variant="body2" color="text.secondary">{label}</Typography>
        <Typography variant="body1">{value}</Typography>
      </Box>
    </Box>
  );
  
  export default Registration;