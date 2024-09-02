// filename: familyDataValidation.ts

import * as yup from 'yup';
import { FatherData } from '../Types/FamilyBackgroundTypes/Modularization(only for v2)/FatherType';
import { MotherData } from '../Types/FamilyBackgroundTypes/Modularization(only for v2)/MotherType';
import { GuardianData } from '../Types/FamilyBackgroundTypes/Modularization(only for v2)/GuardianType';
// Import individual schemas
import { fatherInitialDataSchema } from './fatherDataValidation/fatherinitialDataValidation';
import { motherInitialDataSchema } from './motherDataValidation/motherinitialDataValidation';
import { guardianInitialDataSchema } from './guardianDataValidation/guardianinitialDataValidation';

export const familyDataSchema = yup.object().shape({
  father: fatherInitialDataSchema,
  mother: motherInitialDataSchema,
  guardian: guardianInitialDataSchema,
}).test('at-least-one-filled', 'At least one section must be filled out.', function (value) {
  const { father, mother, guardian } = value as {
    father: FatherData;
    mother: MotherData;
    guardian: GuardianData;
  };

  const isFatherFilled = Object.values(father).some(field => field !== null && field !== undefined && field !== '');
  const isMotherFilled = Object.values(mother).some(field => field !== null && field !== undefined && field !== '');
  const isGuardianFilled = Object.values(guardian).some(field => field !== null && field !== undefined && field !== '');

  // Check if at least one section has any data
  return isFatherFilled || isMotherFilled || isGuardianFilled;
});
