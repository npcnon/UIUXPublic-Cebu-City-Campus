import * as yup from 'yup';
import { FamilyBackgroundData } from '../Types/FamilyBackgroundTypes/FamilyBackgroundType';






 export const fatherDataSchema: yup.ObjectSchema<FamilyBackgroundData> = yup.object().shape({
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

});

/*
first if this schema validates and the fields contain values, is it possible to modify the validations? like


export const fatherDataSchema: yup.ObjectSchema<FamilyBackgroundData> = yup.object().shape({
  stdntId: yup.string(),

    if(function_to_check_if_fields_contain_value())
  {
  fatherFname: yup.string().required(),
  fatherMname: yup.string().required(),
  fatherLname: yup.string().nullable(),
  fatherContactNumber: yup.string().required(),
  fatherEmail: yup.string().required(),
  fatherOccupation: yup.string().required(),
  fatherIncome: yup.number().required(),
  fatherCompany: yup.string().required(),
  }
  else
  {
  fatherFname: yup.string().nullable(),
  fatherMname: yup.string().nullable(),
  fatherLname: yup.string().nullable(),
  fatherContactNumber: yup.string().nullable(),
  fatherEmail: yup.string().nullable(),
  fatherOccupation: yup.string().nullable(),
  fatherIncome: yup.number().nullable(),
  fatherCompany: yup.string().nullable(),
  }
  


});

function_to_check_if_fields_contain_value(){

if fields contain values
return true
else return false
}

*/