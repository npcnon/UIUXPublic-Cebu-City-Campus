// Filename: studentIdService.ts

import axios from 'axios';
import { useAcademicStore } from '../stores/useAcademicStore';
const API_URL = 'http://127.0.0.1:8000/api'; // Adjust this URL based on your API's actual URL

/**
 * Fetches the latest student ID, increments the last 4 digits, and returns a new student ID.
 * @param year - The year to be included in the new student ID.
 * @param department - The department code to be included in the new student ID.
 * @returns A promise that resolves to the new student ID.
 */
export const fetchLatestStudentId = async (): Promise<string> => {
  try {
    const response = await axios.get(`${API_URL}/stdntpersonal/?latest=true`);
    if (response.status === 200) {
      const students = response.data;
      const yearEntry = useAcademicStore.getState().academicBackground.yearEntry.toString().slice(-2); // Use the last 2 digits of the year
      const departmentId = useAcademicStore.getState().academicBackground.department;
      if(students.length === 0){
        console.log(`service---yearentry: ${yearEntry}-----departmentid${departmentId}`)
        return `${yearEntry.slice(-2)}${departmentId}${"0001"}`;
      }
      const latestId = students.student_id; // Adjust according to your data structure

      const last4Digits = latestId.slice(-4);
      const incrementedNumber = (parseInt(last4Digits, 10) + 1).toString();
      const incrementedId = incrementedNumber.padStart(4, '0');

      console.log(`service---yearentry: ${yearEntry}-----departmentid${departmentId}`)
      return `${yearEntry}${departmentId}${incrementedId}`;
    } else {
      throw new Error('Unexpected response status');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response) {
          // Handle other error messages or log them
          console.error('Error Message:', error.response.data.message || 'An unexpected error occurred');
      } else if (error.request) {
        console.error('Error Request:', error.request);
      } else {
        console.error('Error Message:', error.message);
      }
    } else {
      console.error('Unexpected Error:', error);
    }
    // Optionally, handle user-friendly fallback or rethrow the error
    throw new Error('Failed to fetch student ID. Please try again later.');
  }
};
