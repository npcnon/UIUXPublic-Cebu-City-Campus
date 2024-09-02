// Filename: academicbgDataValidation.ts

import * as yup from 'yup';
import { AcademicBackgroundData } from '../Types/AcademicBackgroundTypes/AcademicBackgroundType';

const currentYear = new Date().getFullYear();

export const academicBgDataSchema: yup.ObjectSchema<AcademicBackgroundData> = yup.object().shape({
  stdntId: yup.string(),
  department: yup.string(),
  studentType: yup.string().required('Student Type is required'),
  applicationType: yup.string().required('Application Type is required'),
  course: yup.string().required('Course is required'),
  majorIn: yup.string().required('Major is required'),
  semesterEntry: yup.string().required('Semester Entry is required'),
  yearEntry: yup
    .number()
    .required('Year Entry is required')
    .min(1900, 'Year Entry must be after 1900')
    .max(currentYear, `Year Entry cannot be later than ${currentYear}`),
  yearGraduate: yup
    .number()
    .required('Year Graduate is required')
    .min(yup.ref('yearEntry'), 'Year Graduate must be after Year Entry')
    .max(currentYear + 10, `Year Graduate cannot be later than ${currentYear + 10}`),
});