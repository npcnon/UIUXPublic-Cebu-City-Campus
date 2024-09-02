//filename : usePersonalStore

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { FamilyBackgroundAPIData } from '../Types/FamilyBackgroundTypes/FamilyBackgroundAPIType';
import { FamilyBackgroundData } from '../Types/FamilyBackgroundTypes/FamilyBackgroundType';


interface FamilyStore{
    familyBackground: FamilyBackgroundData;
    setFamilyBackground: (update: ((prev: FamilyBackgroundData) => FamilyBackgroundData) | FamilyBackgroundData) => void;
    familyBackgroundAPI: FamilyBackgroundAPIData;
    updateFamilyBackgroundAPI: ()=>void;
}

export const useFamilyStore = create<FamilyStore>()(
    devtools((set) => ({
        familyBackground: {
            stdntId : '',
            fatherFname : '',
            fatherMname : '',
            fatherLname : '',
            fatherContactNumber : '',
            fatherEmail : '',
            fatherOccupation : '',
            fatherIncome : null,
            fatherCompany : '',
            motherFname : '',
            motherMname : '',
            motherLname : '',
            motherContactNumber : '',
            motherEmail : '', 
            motherOccupation : '',
            motherIncome : null,
            motherCompany : '',
            guardianFname : '',
            guardianMname : '',
            guardianLname : '',
            guardianRelation : '',
            guardianContactNumber : '',
            guardianEmail : '',
        },
        familyBackgroundAPI:{
            stdnt_id : '',
            father_fname : '',
            father_mname : '',
            father_lname : '',
            father_contact_number : '',
            father_email : '',
            father_occupation : '',
            father_income : 0,
            father_company : '',
            mother_fname : '',
            mother_mname : '',
            mother_lname : '',
            mother_contact_number : '',
            mother_email : '',
            mother_occupation : '',
            mother_income : 0,
            mother_company : '',
            guardian_fname : '',
            guardian_mname : '',
            guardian_lname : '',
            guardian_relation : '',
            guardian_contact_number : '',
            guardian_email : '',
        },


        setFamilyBackground: (update) => {
          console.log(`--set familybackground--`);
            set(state => {
              const newFamily = typeof update === 'function' ? update(state.familyBackground) : update;
              return {
                familyBackground: newFamily,
              };
            });
          },
          updateFamilyBackgroundAPI: () => {

            set((state) => {
              const { familyBackground } = state;
              return    {
                familyBackgroundAPI: {
                    stdnt_id : familyBackground.stdntId,
                    father_fname : familyBackground.fatherFname,
                    father_mname : familyBackground.fatherMname,
                    father_lname : familyBackground.fatherLname,
                    father_contact_number : familyBackground.fatherContactNumber,
                    father_email : familyBackground.fatherEmail,
                    father_occupation : familyBackground.fatherOccupation,
                    father_income : familyBackground.fatherIncome,
                    father_company : familyBackground.fatherCompany,
                    mother_fname : familyBackground.motherFname,
                    mother_mname : familyBackground.motherMname,
                    mother_lname : familyBackground.motherLname,
                    mother_contact_number : familyBackground.motherContactNumber,
                    mother_email : familyBackground.motherEmail,
                    mother_occupation : familyBackground.motherOccupation,
                    mother_income : familyBackground.motherIncome,
                    mother_company : familyBackground.motherCompany,
                    guardian_fname : familyBackground.guardianFname,
                    guardian_mname : familyBackground.guardianMname,
                    guardian_lname : familyBackground.guardianLname,
                    guardian_relation : familyBackground.guardianRelation,
                    guardian_contact_number : familyBackground.guardianContactNumber,
                    guardian_email : familyBackground.guardianEmail,
                        },}
            });
        },
    }))
);