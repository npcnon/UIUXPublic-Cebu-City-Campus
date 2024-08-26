// Filename: PersonalDataTypes.ts

export interface Personal {
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

    //addPersonalInfo
    cityAddress :string;
    provinceAddress :string;
    contactNumber :string;
    cityContactNumber :string;
    provinceContactNumber :string;
    email :string;
    citizenship :string;
  }
  