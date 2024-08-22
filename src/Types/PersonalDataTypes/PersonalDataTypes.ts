// Filename: PersonalDataTypes.ts

export interface PersonalData {
    studentId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    birthDate: Date | null; // Updated type
    birthPlace: string;
    maritalStatus: string;
    religion: string;
    country: string;
    acr?: string; 
  }
  