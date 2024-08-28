import * as yup from 'yup';
import dayjs from 'dayjs';

// Define validation schema based on the Personal interface
export const personalDataSchema = yup.object().shape({
  studentId: yup.string().required('Student ID is required'),
  firstName: yup
    .string()
    .max(3, 'First Name cannot be longer than 3 characters')
    .required("First Name is Required"),
  middleName: yup
    .string()
    .notRequired()
    .max(3, 'Middle Name cannot be longer than 3 characters'),
  lastName: yup.string().required('Last Name is required'),
  gender: yup.string().required('Gender is required'),

  // Birth Date: Must not be null, must be in the past, and cannot be today or in the future
  birthDate: yup
    .date()
    .nonNullable() 
    .typeError('Invalid date format')
    .required('Birth Date is required')
    .max(dayjs().subtract(1, 'day').toDate(), 'Birth Date cannot be today or in the future'), // Ensure birthDate is in the past

  birthPlace: yup.string().required('Birth Place is required'),
  maritalStatus: yup.string().required('Marital Status is required'),
  religion: yup.string().required('Religion is required'),
  country: yup.string().required('Country is required'),
  acr: yup.string().notRequired(), // Optional field
  cityAddress: yup.string().required('City Address is required'),
  provinceAddress: yup.string().notRequired(), // Optional field
  contactNumber: yup.string().required('Contact Number is required'),
  cityContactNumber: yup.string().notRequired(),
  provinceContactNumber: yup.string().notRequired(), // Optional field
  email: yup.string().email('Invalid email format').required('Email is required'),
  citizenship: yup.string().required('Citizenship is required'),
});
