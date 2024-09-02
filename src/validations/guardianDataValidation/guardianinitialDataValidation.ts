//filename: guardianInitialvalidation.ts

import * as yup from 'yup';
import { GuardianData } from '../../Types/FamilyBackgroundTypes/Modularization(only for v2)/GuardianType';

export const guardianInitialDataSchema: yup.ObjectSchema<GuardianData> = yup.object().shape({
    guardianFname: yup.string().nullable().notRequired(),
    guardianMname: yup.string().nullable().notRequired(),
    guardianLname: yup.string().nullable().notRequired(),
    guardianRelation: yup.string().nullable().notRequired(),
    guardianContactNumber: yup.string().nullable().notRequired(),
    guardianEmail: yup.string().nullable().notRequired(),
  });
  