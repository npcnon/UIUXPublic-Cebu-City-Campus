// Filename: studentIdService.ts

import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api'; // Adjust this URL based on your API's actual URL

/**
 * Fetches the latest student ID, increments the last 4 digits, and returns a new student ID.
 * @param year - The year to be included in the new student ID.
 * @param department - The department code to be included in the new student ID.
 * @returns A promise that resolves to the new student ID.
 */
export const fetchLatestStudentId = async (year: string, department: string): Promise<string> => {
  try {
    const response = await axios.get(`${API_URL}/stdntpersonal/?latest=true`);
    console.log("response data: ", response.data);
    if (response.status === 200) {
      
      const students = response.data;
      
      if (students.length === 0) {
        return `${year.slice(-2)}${department}${"0001"}`; // Return '0001' if no students are found
      }

      // Assuming the student ID is in the format: last2digits of year + department ID + student number
      // Get the latest student ID by ordering by the primary key or ID field in descending order
      const latestId = students.student_id; // Adjust according to your data structure

      // Extract the last 4 digits
      const last4Digits = latestId.slice(-4);
      console.log("last digits: ", last4Digits);
      // Increment the last 4 digits
      const incrementedNumber = (parseInt(last4Digits, 10) + 1).toString();
      
      // Pad with leading zeros
      const incrementedId = incrementedNumber.padStart(4, '0');
      
      // Extract year entry and department ID
      const yearEntry = year.slice(-2); // Use the last 2 digits of the year
      
      const departmentId = department; // Use the provided department code
      console.log(`service year: ${yearEntry}`);
      console.log(`service department: ${departmentId}`);
      // Construct and return the new student ID
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
