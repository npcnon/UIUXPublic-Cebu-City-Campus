// filename: studentBasicDataValidation.ts

import * as yup from 'yup';
import dayjs from 'dayjs';

// Regular expression to validate email format
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

// Validation schema based on the StudentBasicAPIData interface
export const studentBasicAPIDataSchema = yup.object().shape({

  first_name: yup
    .string()
    .trim()
    .max(100, 'Input exceeds the maximum allowed length')
    .required('First Name is required'),

  middle_name: yup
    .string()
    .trim()
    .max(100, 'Input exceeds the maximum allowed length'),

  last_name: yup
    .string()
    .trim()
    .max(100, 'Input exceeds the maximum allowed length')
    .required('Last Name is required'),

  suffix: yup
    .string()
    .trim()
    .max(100, 'Input exceeds the maximum allowed length'),

  is_transferee: yup
    .boolean()
    .required('this field is required'),
  year_level: yup
    .string()
    .trim()
    .max(100, 'Input exceeds the maximum allowed length')
    .required('Year Level is required'),
  contact_number: yup
    .string()
    .trim()
    .max(15, 'Input exceeds the maximum allowed length')
    .required('Contact Number is required'),

  address: yup
    .string()
    .trim()
    .required('Address is required'),

  campus: yup
    .string()
    .trim()
    .required('Campus is required'),
  
  program: yup
    .string()
    .trim()
    .required('Course is Required'),

  birth_date: yup
    .date()
    .nullable()
    .typeError('Invalid date format')
    .max(dayjs().subtract(1, 'day').toDate(), 'Birth date cannot be today or in the future')
    .required('Birth Date is required'),

  sex: yup
    .string()
    .oneOf(['Male', 'Female'], 'Sex must be either Male or Female')
    .required('Sex is required'),

  email: yup
    .string()
    .trim()
    .matches(emailRegex, 'Invalid email format')
    .required('Email is required'),
});
