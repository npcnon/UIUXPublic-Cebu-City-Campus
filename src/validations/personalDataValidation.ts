//filename: personalDataValidation.ts

import * as yup from 'yup';
import dayjs from 'dayjs';

// Define validation schema based on the Personal interface
export const personalDataSchema = yup.object().shape({

  studentId: yup.string(),

  firstName: yup
    .string()
    .trim()
    .max(100, 'Input exceeds the maximum allowed length')
    .required("First Name is Required"),

  middleName: yup
    .string()
    .trim()
    .notRequired()
    .max(100, 'Input exceeds the maximum allowed length'),

  lastName: yup
    .string()
    .trim()
    .required('Last Name is required')
    .max(100, 'Input exceeds the maximum allowed length'),

  gender: yup
    .string()
    .required('Gender is required'),

  // Birth Date: Must not be null, must be in the past, and cannot be today or in the future
  birthDate: yup
    .date()
    .nonNullable() 
    .typeError('Invalid date format')
    .required('Birth Date is required')
    .max(dayjs().subtract(1, 'day').toDate(), 'Birth Date cannot be today or in the future'), 

  birthPlace: yup
    .string()
    .trim()
    .required('Birth Place is required'),

  maritalStatus: yup
    .string()
    .required('Marital Status is required'),

  religion: yup
    .string()
    .trim()
    .max(70, 'Input exceeds the maximum allowed length')
    .required('Religion is required'),

  country: yup
    .string()
    .trim()
    .required('Country is required')
    .max(50, 'Input exceeds the maximum allowed length'),

  acr: yup
    .string()
    .trim()
    .max(100, 'Input exceeds the maximum allowed length')
    .notRequired(), // Optional field


  cityAddress: yup
    .string()
    .trim()
    .required('City Address is required'),

  provinceAddress: yup
    .string()
    .trim()
    .notRequired(), // Optional field

  contactNumber: yup
    .string()
    .trim()
    .max(30, 'Input exceeds the maximum allowed length')
    .required('Contact Number is required'),

  cityContactNumber: yup
    .string()
    .trim()
    .max(20, 'Input exceeds the maximum allowed length')
    .notRequired(),
    
  provinceContactNumber: yup
    .string()
    .trim()
    .max(20, 'Input exceeds the maximum allowed length')
    .notRequired(), // Optional field

  email: yup
    .string()
    .trim()
    .email('Invalid email format')
    .required('Email is required'),

  citizenship: yup
    .string()
    .trim()
    .max(70, 'Input exceeds the maximum allowed length')
    .required('Citizenship is required'),
});
