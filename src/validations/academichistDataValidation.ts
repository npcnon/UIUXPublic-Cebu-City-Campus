// Filename: academicbgDataValidation.ts

import * as yup from 'yup';
import { AcHistData } from '../Types/AcHistTypes/AcHistType';

const currentYear = new Date().getFullYear();
export const academichistDataSchema: yup.ObjectSchema<AcHistData> = yup.object().shape({
    stdntId: yup.string(),
    elementarySchool: yup.string().required('Elementary school name is required'),
    elementaryAddress: yup.string().required('Elementary school address is required'),
    elementaryHonors: yup.string().notRequired(), 
    elementaryGraduate: yup
        .number()
        .required() 
        .min(1900, 'Year must be 1900 or later')
        .max(currentYear, `Year cannot be later than ${currentYear}`),
    juniorHighschool: yup.string().required('Junior high school name is required'),
    juniorAddress: yup.string().required('Junior high school address is required'),
    juniorHonors: yup.string().notRequired(), 
    juniorGraduate: yup
        .number()
        .required() 
        .min(1900, 'Year must be 1900 or later')
        .max(currentYear, `Year cannot be later than ${currentYear}`), 
    seniorHighschool: yup.string().required('Senior high school name is required'),
    seniorAddress: yup.string().required('Senior high school address is required'),
    seniorHonors: yup.string().notRequired(), 
    seniorGraduate: yup
        .number()
        .required() 
        .min(1900, 'Year must be 1900 or later')
        .max(currentYear, `Year cannot be later than ${currentYear}`), 
    ncaeGrade: yup.string().notRequired(), 
    ncaeYearTaken: yup
        .number()
        .notRequired() 
        .min(1900, 'Year must be 1900 or later')
        .max(currentYear, `Year cannot be later than ${currentYear}`), 
    latestCollege: yup.string().notRequired(), 
    collegeAddress: yup.string().notRequired(), 
    collegeHonors: yup.string().notRequired(), 
    course: yup.string().notRequired(), 
});
