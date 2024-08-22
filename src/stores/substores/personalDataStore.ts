// Filename: personalDataStore.ts

import { create } from 'zustand';

// Types for Personal Data
export interface PersonalData {
  studentId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  birthDate: Date | null;
  birthPlace: string;
  maritalStatus: string;
  religion: string;
  country: string;
  acr?: string;
}

// Types for Personal Data API
export interface PersonalDataAPIData {
  student_id: string;
  f_name: string;
  m_name: string;
  l_name: string;
  gender: string;
  birth_date: Date | null;
  birth_place: string;
  marital_status: string;
  religion: string;
  country: string;
  acr?: string;
}

// Zustand store for Personal Data
interface PersonalDataState {
  personalData: PersonalData;
  setPersonalData: (data: PersonalData) => void;
  getPersonalDataAPIData: () => PersonalDataAPIData;
}

export const usePersonalDataStore = create<PersonalDataState>((set, get) => ({
  personalData: {
    studentId: '',
    firstName: '',
    middleName: '',
    lastName: '',
    gender: '',
    birthDate: null,
    birthPlace: '',
    maritalStatus: '',
    religion: '',
    country: '',
    acr: '',
  },
  setPersonalData: (data) => set({ personalData: data }),
  getPersonalDataAPIData: () => {
    const { personalData } = get();
    return {
      student_id: 'qwer666777', // Placeholder; adjust as needed
      f_name: personalData.firstName || '',
      m_name: personalData.middleName || '',
      l_name: personalData.lastName || '',
      gender: personalData.gender || '',
      birth_date: personalData.birthDate || null,
      birth_place: personalData.birthPlace || '',
      marital_status: personalData.maritalStatus || '',
      religion: personalData.religion || '',
      country: personalData.country || '',
      acr: personalData.acr || '',
    };
  },
}));
