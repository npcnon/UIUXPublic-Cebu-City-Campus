//filename: fatherDataValidation


import * as yup from 'yup';
import { FatherData } from '../../Types/FamilyBackgroundTypes/Modularization(only for v2)/FatherType';

const requiredMsg = 'This field is required';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



export const fatherDataSchema: yup.ObjectSchema<FatherData> = yup.object().shape({
  fatherFname: yup.string().required(requiredMsg).max(100, 'Input exceeds the maximum allowed length'),
  fatherMname: yup.string().notRequired().max(100, 'Input exceeds the maximum allowed length'),
  fatherLname: yup.string().required(requiredMsg).max(100, 'Input exceeds the maximum allowed length'),
  fatherContactNumber: yup.string().required(requiredMsg).max(30, 'Input exceeds the maximum allowed length'),
  fatherEmail: yup.string().required(requiredMsg).matches(emailRegex, "Invalid Email Format"),
  fatherOccupation: yup.string().trim().required(),
  fatherIncome: yup.number().required().typeError("Invalid Income"),
  fatherCompany: yup.string().required(),
});
