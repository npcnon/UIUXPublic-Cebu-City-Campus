// Filename: useAcademicStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AcHistData } from '../Types/AcHistTypes/AcHistType';
import { AcHistAPIData } from '../Types/AcHistTypes/AcHistAPIType';
// Define the shape of your store

interface AcHistStore {
  acHist: AcHistData;
  setAcHist: (update: ((prev: AcHistData) => AcHistData) | AcHistData) => void;
  acHistAPI: AcHistAPIData;
  updateAcHistAPI: () => void; // Method to update academicBackgroundAPI
}

// Create the store with Zustand
export const useAcHistStore = create<AcHistStore>()(
  devtools((set) => ({
    acHist: {
        stdntId : '',   
        elementarySchool : '',
        elementaryAddress : '',
        elementaryHonors : '',
        elementaryGraduate : 0,
        juniorHighschool : '',
        juniorAddress : '',
        juniorHonors : '',
        juniorGraduate : 0,
        seniorHighschool : '',
        seniorAddress : '',
        seniorHonors : '',
        seniorGraduate : 0,
        ncaeGrade : '',
        ncaeYearTaken : 0,
        latestCollege : '',
        collegeAddress : '',
        collegeHonors : '',
        course : '',
    
    },
    acHistAPI: {
        stdnt_id : '',   
        elementary_school : '',   
        elementary_address : '',   
        elementary_honors : '',   
        elementary_graduate : 0,   
        junior_highschool : '',   
        junior_address : '',   
        junior_honors : '',   
        junior_graduate : 0,   
        senior_highschool : '',   
        senior_address : '',   
        senior_honors : '',   
        senior_graduate : 0,   
        ncae_grade : '',   
        ncae_year_taken : 0,   
        latest_college : '',   
        college_address : '',   
        college_honors  : '',   
        course : '',   
    
    },
    setAcHist: (update) => {
      set(state => {
        const newAcHist = typeof update === 'function' ? update(state.acHist) : update;
        return {
          acHist: newAcHist,
        };
      });
    },
    updateAcHistAPI: () => {
      
        set((state) => {
          const { acHist } = state;
          return{
            acHistAPI: {
                stdnt_id : acHist.stdntId,   
                elementary_school : acHist.elementarySchool,   
                elementary_address : acHist.elementaryAddress,   
                elementary_honors : acHist.elementaryHonors,   
                elementary_graduate : acHist.elementaryGraduate,   
                junior_highschool : acHist.juniorHighschool,   
                junior_address : acHist.juniorAddress,   
                junior_honors : acHist.juniorHonors,   
                junior_graduate : acHist.juniorGraduate,   
                senior_highschool : acHist.seniorHighschool,   
                senior_address : acHist.seniorAddress,   
                senior_honors : acHist.seniorHonors,   
                senior_graduate : acHist.seniorGraduate,   
                ncae_grade : acHist.ncaeGrade,   
                ncae_year_taken : acHist.ncaeYearTaken,   
                latest_college : acHist.latestCollege,   
                college_address : acHist.collegeAddress,   
                college_honors  : acHist.collegeHonors,   
                course : acHist.course,           
            },
        }
        
      });
    },
  }))
);
  