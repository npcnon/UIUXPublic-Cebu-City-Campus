//filename: motherInitialvalidation.ts


import * as yup from 'yup';
import { MotherData } from '../../Types/FamilyBackgroundTypes/Modularization(only for v2)/MotherType';



export const motherInitialDataSchema: yup.ObjectSchema<MotherData> = yup.object().shape({
    motherFname: yup.string().nullable(),
    motherMname: yup.string().nullable(),
    motherLname: yup.string().nullable(),
    motherContactNumber: yup.string().nullable(),
    motherEmail: yup.string().nullable(),
    motherOccupation: yup.string().nullable(),
    motherIncome: yup.number().nullable(),
    motherCompany: yup.string().nullable(),
  });