import React, { useEffect, useState } from "react";
import apiClient from "../../services/interceptors";
import { Box, Typography, CircularProgress } from "@mui/material";

interface ApplicantDetails {
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    year_level: string;
    program: string;
    campus: string;
  }
  
  interface StudentInfo {
    student_id: string;
    applicant_details: ApplicantDetails;
  }
  
  interface ProfileData {
    student_id: string;
    first_name: string;
    last_name: string;
    profile: {
      student_info: StudentInfo;
    };
  }
  

const UserProfile: React.FC = () => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await apiClient.get("/user");
        setProfile(response.data);
      } catch (err) {
        console.error("Error fetching user profile:", err);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  if (!profile || !profile.profile || !profile.profile.student_info) {
    return <Typography>No profile data available.</Typography>;
  }

  const { applicant_details } = profile.profile.student_info;

  return (
    <Box sx={{ mt: 4, textAlign: "center" }}>
      <Typography variant="h4">Welcome, {applicant_details.first_name}!</Typography>
      <Typography variant="body1">
        Student ID: {profile.student_id}
      </Typography>
      <Typography variant="body1">
        Full Name: {applicant_details.first_name} {applicant_details.last_name}
      </Typography>
      <Typography variant="body1">Email: {applicant_details.email}</Typography>
      <Typography variant="body1">
        Year Level: {applicant_details.year_level}
      </Typography>
      <Typography variant="body1">Program: {applicant_details.program}</Typography>
      <Typography variant="body1">Campus: {applicant_details.campus}</Typography>
    </Box>
  );
};

export default UserProfile;
