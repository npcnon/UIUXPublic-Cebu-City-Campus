// Filename: academicBackgroundStore.ts

import { create } from 'zustand';

// Types for Academic Background
export interface AcademicBackgroundData {
  stdntId: string;
  department: string;
  studentType: string;
  applicationType: string;
  course: string;
  majorIn?: string;
  semesterEntry: string;
  yearEntry: number;
  yearGraduate: number;
}

// Types for Academic Background API
export interface AcademicBackgroundAPIData {
  stdnt_id: string;
  department: string;
  course: string;
  major_in: string;
  student_type: string;
  semester_entry: string;
  year_entry: number;
  year_graduate: number;
  application_type: string;
}

// Zustand store for Academic Background
interface AcademicBackgroundState {
  academicBackground: AcademicBackgroundData;
  setAcademicBackground: (data: AcademicBackgroundData) => void;
  getAcademicBackgroundAPIData: () => AcademicBackgroundAPIData;
}

export const useAcademicBackgroundStore = create<AcademicBackgroundState>((set, get) => ({
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
  setAcademicBackground: (data) => set({ academicBackground: data }),
  getAcademicBackgroundAPIData: () => {
    const { academicBackground } = get();
    return {
      stdnt_id: 'S555666777', // Placeholder; adjust as needed
      department: academicBackground.department,
      course: academicBackground.course || '',
      major_in: academicBackground.majorIn || '',
      student_type: academicBackground.studentType || '',
      semester_entry: academicBackground.semesterEntry || '',
      year_entry: academicBackground.yearEntry,
      year_graduate: academicBackground.yearGraduate,
      application_type: academicBackground.applicationType || '',
    };
  },
}));
