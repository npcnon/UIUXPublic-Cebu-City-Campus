  // Filename: courseService.ts

  import axios from 'axios';

  const API_URL = 'http://127.0.0.1:8000/api'; // Adjust this URL based on your API's actual URL

  export const fetchDepartmentIdByCourse = async (courseName: string) => {
    try {
      const response = await axios.get(`${API_URL}/course/?filter=course=${courseName}`);
      
      if (response.status === 200) {
        // Assuming the response data contains a list of courses
        const courseData = response.data[0]; // Get the first course item
        if (courseData && courseData.department_Id) {
          return courseData.department_Id;
        } else {
          throw new Error('Department ID not found'); 
        }
      } else {
        // Handle non-200 status codes
        throw new Error(response.data.message || 'An error occurred');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle known Axios errors
        if (error.response) {
          // Server responded with a status other than 2xx
          // Extract and use the message from the response if available
          if (error.response.data.message) {
            console.error('Error Message:', error.response.data.message);
          } else {
            console.error('Error Message:', 'An unexpected error occurred');
          }
        } else if (error.request) {
          // Request was made but no response was received
          console.error('Error Request:', error.request);
        } else {
          // Something happened in setting up the request
          console.error('Error Message:', error.message);
        }
      } else {
        // Handle unknown errors
        console.error('Unexpected Error:', error);
      }
      throw error;
    }
  };
