import * as yup from 'yup';
import { GuardianData } from '../../Types/FamilyBackgroundTypes/Modularization(only for v2)/GuardianType';
const requiredMsg = 'This field is required';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export const guardianDataSchema: yup.ObjectSchema<GuardianData> = yup.object().shape({
    guardianFname: yup.string().required(requiredMsg).max(100, 'Input exceeds the maximum allowed length'),
    guardianMname: yup.string().notRequired().max(100, 'Input exceeds the maximum allowed length'),
    guardianLname: yup.string().required(requiredMsg).max(100, 'Input exceeds the maximum allowed length'),
    guardianRelation: yup.string().required(requiredMsg).max(100, 'Input exceeds the maximum allowed length'),
    guardianContactNumber: yup.string().required(requiredMsg).max(30, 'Input exceeds the maximum allowed length'),
    guardianEmail: yup.string().required(requiredMsg).matches(emailRegex, "Invalid Email"),
  });
