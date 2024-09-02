import * as yup from 'yup';
import { MotherData } from '../../Types/FamilyBackgroundTypes/Modularization(only for v2)/MotherType';
const requiredMsg = 'This field is required';
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;



export const motherDataSchema: yup.ObjectSchema<MotherData> = yup.object().shape({
  motherFname: yup.string().required(requiredMsg).max(100, 'Input exceeds the maximum allowed length'),
  motherMname: yup.string().notRequired().max(100, 'Input exceeds the maximum allowed length'),
  motherLname: yup.string().required(requiredMsg).max(100, 'Input exceeds the maximum allowed length'),
  motherContactNumber: yup.string().required(requiredMsg).max(30, 'Input exceeds the maximum allowed length'),
  motherEmail: yup.string().required(requiredMsg).matches(emailRegex, "Invalid Email Format"),
  motherOccupation: yup.string().trim().required(),
  motherIncome: yup.number().required().typeError("Invalid Income"),
  motherCompany: yup.string().required(),
});
