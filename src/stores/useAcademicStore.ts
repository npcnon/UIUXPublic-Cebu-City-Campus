// Filename: useAcademicStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { AcademicBackgroundData } from '../Types/AcademicBackgroundTypes/AcademicBackgroundType';
import { AcademicBackgroundAPIData } from '../Types/AcademicBackgroundTypes/AcademicBackgroundAPITypes';

// Define the shape of your store
interface AcademicStore {
  academicBackground: AcademicBackgroundData;
  setAcademicBackground: (update: ((prev: AcademicBackgroundData) => AcademicBackgroundData) | AcademicBackgroundData) => void;
  academicBackgroundAPI: AcademicBackgroundAPIData;
  updateAcademicBackgroundAPI: () => void; // Method to update academicBackgroundAPI
}

// Create the store with Zustand
export const useAcademicStore = create<AcademicStore>()(
  devtools((set) => ({
    academicBackground: {
      stdntId: '',
      department: '',
      studentType: '',
      applicationType: '',
      course: '',
      majorIn: '',
      semesterEntry: '',
      yearEntry: 0,
      yearGraduate: 0,
    },
    academicBackgroundAPI: {
      stdnt_id: '',
      department: '',
      course: '',
      major_in: '',
      student_type: '',
      semester_entry: '',
      year_entry: 0,
      year_graduate: 0,
      application_type: '',
    },
    setAcademicBackground: (update) => {
      set(state => {
        const newAcademicBackground = typeof update === 'function' ? update(state.academicBackground) : update;
        return {
          academicBackground: newAcademicBackground,
        };
      });
    },
    updateAcademicBackgroundAPI: () => {
      
        set((state) => {
          const { academicBackground } = state;
          return{
            academicBackgroundAPI: {
              ...state.academicBackgroundAPI,
              stdnt_id: academicBackground.stdntId,
              department: academicBackground.department,
              course: academicBackground.course,
              major_in: academicBackground.majorIn,
              student_type: academicBackground.studentType,
              semester_entry: academicBackground.semesterEntry,
              year_entry: academicBackground.yearEntry,
              year_graduate: academicBackground.yearGraduate,
              application_type: academicBackground.applicationType,
            },
        }
        
      });
    },
  }))
);
  