// Filename: studentIdService.ts

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // Adjust this URL based on your API's actual URL



export const fetchLatestStudentId = async (year: string, department: string): Promise<string> => {
  try {
    const response = await axios.get(`${API_URL}/student/`);
    
    if (response.status === 200) {
      const students = response.data;
      
      if (students.length === 0) {
        return '0001'; // Return '0001' if no students are found
      }

      // Assuming the student ID is in the format: last2digits of year + department ID + student number
      // Get the latest student ID by ordering by the primary key or ID field in descending order
      const latestStudent = students[0]; // Fetch the first item, assuming it's the latest
      const latestId = latestStudent.student_id; // Adjust according to your data structure

      const last4Digits = latestId.slice(-4); // Extract the last 4 digits
      const incrementedId = (parseInt(last4Digits, 10) + 1).toString().padStart(4, '0'); // Increment and pad with leading zeros

      // Extract year entry and department ID (assuming you have these values or you can fetch them from another service)
      const yearEntry = year; // Example, replace with actual logic
      const departmentId = department; // Example, replace with actual logic

      return `${yearEntry}${departmentId}${incrementedId}`;
    } else {
      throw new Error(response.data.message || 'An error occurred');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Error Message:', error.response.data.message || 'An unexpected error occurred');
      } else if (error.request) {
        console.error('Error Request:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
    } else {
      console.error('Unexpected Error:', error);
    }
    throw error;
  }
};
