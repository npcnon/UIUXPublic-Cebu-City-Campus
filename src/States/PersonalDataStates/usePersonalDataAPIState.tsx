// // Filename: usePersonalDataState.tsx

// import { useMemo } from 'react';
// import { PersonalData } from '../../Types/PersonalDataTypes/PersonalDataTypes';
// import { PersonalDataAPIData } from '../../Types/PersonalDataTypes/PersonalDataAPITypes';

// export const usePersonalDataAPIState = (personalData: PersonalData): PersonalDataAPIData => {
//   return useMemo(() => ({
//     student_id: 'qwer666777', // Placeholder; adjust as needed
//     f_name: personalData.firstName || '',
//     m_name: personalData.middleName || '',
//     l_name: personalData.lastName || '',
//     gender: personalData.gender || '',
//     birth_date: personalData.birthDate || null,
//     birth_place: personalData.birthPlace || '',
//     marital_status: personalData.maritalStatus || '',
//     religion: personalData.religion || '',
//     country: personalData.country || '',
//     acr: personalData.acr || '',
//   }), [personalData]);
// };
