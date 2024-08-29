import * as yup from 'yup';
import { FamilyBackgroundData } from '../Types/FamilyBackgroundTypes/FamilyBackgroundType';

const requiredMsg = 'This field is required';

const nameSchema = yup.object().shape({
  fname: yup.string().nullable().required(requiredMsg).max(100, 'Input exceeds the maximum allowed length'),
  mname: yup.string().nullable().notRequired().max(100, 'Input exceeds the maximum allowed length'),
  lname: yup.string().nullable().required(requiredMsg).max(100, 'Input exceeds the maximum allowed length'),
});

const contactSchema = yup.object().shape({
  contactNumber: yup.string().nullable().required(requiredMsg).max(30, 'Input exceeds the maximum allowed length'),
  email: yup.string().nullable().notRequired().email('Invalid email format'),
});

const occupationSchema = yup.object().shape({
  occupation: yup.string().nullable().required(requiredMsg),
  income: yup.number().nullable().typeError('Invalid format').required(requiredMsg),
  company: yup.string().nullable().required(requiredMsg),
});

export const familyDataSchema: yup.ObjectSchema<FamilyBackgroundData> = yup.object().shape({
  stdntId: yup.string(),

  // Father Section
  fatherFname: yup.string().nullable(),
  fatherMname: yup.string().nullable(),
  fatherLname: yup.string().nullable(),
  fatherContactNumber: yup.string().nullable(),
  fatherEmail: yup.string().nullable(),
  fatherOccupation: yup.string().nullable(),
  fatherIncome: yup.number().nullable(),
  fatherCompany: yup.string().nullable(),

  // Mother Section
  motherFname: yup.string().nullable(),
  motherMname: yup.string().nullable(),
  motherLname: yup.string().nullable(),
  motherContactNumber: yup.string().nullable(),
  motherEmail: yup.string().nullable(),
  motherOccupation: yup.string().nullable(),
  motherIncome: yup.number().nullable(),
  motherCompany: yup.string().nullable(),

  // Guardian Section
  guardianFname: yup.string().nullable(),
  guardianMname: yup.string().nullable(),
  guardianLname: yup.string().nullable(),
  guardianRelation: yup.string().nullable(),
  guardianContactNumber: yup.string().nullable(),
  guardianEmail: yup.string().nullable(),
}).test('at-least-one-section', 'At least one section must be filled', function(values) {
  const fatherFilled = values.fatherFname || values.fatherLname;
  const motherFilled = values.motherFname || values.motherLname;
  const guardianFilled = values.guardianFname || values.guardianLname;

  if (!fatherFilled && !motherFilled && !guardianFilled) {
    return this.createError({ message: 'At least one section (Father, Mother, or Guardian) must be filled' });
  }

  if (fatherFilled) {
    try {
      nameSchema.validateSync({ fname: values.fatherFname, mname: values.fatherMname, lname: values.fatherLname });
      contactSchema.validateSync({ contactNumber: values.fatherContactNumber, email: values.fatherEmail });
      occupationSchema.validateSync({ occupation: values.fatherOccupation, income: values.fatherIncome, company: values.fatherCompany });
    } catch (error) {
      return this.createError({ message: 'All required fields in Father section must be filled' });
    }
  }

  if (motherFilled) {
    try {
      nameSchema.validateSync({ fname: values.motherFname, mname: values.motherMname, lname: values.motherLname });
      contactSchema.validateSync({ contactNumber: values.motherContactNumber, email: values.motherEmail });
      occupationSchema.validateSync({ occupation: values.motherOccupation, income: values.motherIncome, company: values.motherCompany });
    } catch (error) {
      return this.createError({ message: 'All required fields in Mother section must be filled' });
    }
  }

  if (guardianFilled) {
    try {
      nameSchema.validateSync({ fname: values.guardianFname, mname: values.guardianMname, lname: values.guardianLname });
      contactSchema.validateSync({ contactNumber: values.guardianContactNumber, email: values.guardianEmail });
      yup.string().nullable().required().validateSync(values.guardianRelation);
    } catch (error) {
      return this.createError({ message: 'All required fields in Guardian section must be filled' });
    }
  }

  return true;
});