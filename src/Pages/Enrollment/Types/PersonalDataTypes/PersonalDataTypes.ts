// Filename: PersonalDataTypes.ts

export interface PersonalData {
    studentId: string;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
    birthDate: Date;
    birthPlace: string;
    maritalStatus: string;
    religion: string;
    country: string;
    acr?: string | null; 
  }
  