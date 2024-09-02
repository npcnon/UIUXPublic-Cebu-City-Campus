//filename: fatherinitialValidation.ts

import * as yup from 'yup';
import { FatherData } from '../../Types/FamilyBackgroundTypes/Modularization(only for v2)/FatherType';



export const fatherInitialDataSchema: yup.ObjectSchema<FatherData> = yup.object().shape({
    fatherFname: yup.string().nullable(),
    fatherMname: yup.string().nullable(),
    fatherLname: yup.string().nullable(),
    fatherContactNumber: yup.string().nullable(),
    fatherEmail: yup.string().nullable(),
    fatherOccupation: yup.string().nullable(),
    fatherIncome: yup.number().nullable(),
    fatherCompany: yup.string().nullable(),
  });