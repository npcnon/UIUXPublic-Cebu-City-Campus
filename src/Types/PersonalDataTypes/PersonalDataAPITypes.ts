// Filename: PersonalDataAPITypes.ts

export interface PersonalAPIData {
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
