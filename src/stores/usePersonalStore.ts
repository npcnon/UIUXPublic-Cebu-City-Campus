//filename : usePersonalStore

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Personal } from '../Types/PersonalDataTypes/PersonalDataTypes';
import { PersonalAPIData } from '../Types/PersonalDataTypes/PersonalDataAPITypes';

interface PersonalStore{
    personal: Personal;
    setPersonal: (update: ((prev: Personal) => Personal) | Personal) => void;
    personalAPI: PersonalAPIData;
    updatePersonalAPI: ()=>void;
}

export const usePersonalStore = create<PersonalStore>()(
    devtools((set) => ({
        personal: {
            studentId: '',
            firstName: '',
            middleName: '',
            lastName: '',
            gender: '',
            birthDate: new Date(),
            birthPlace: '',
            maritalStatus: '',
            religion: '',
            country: '',
            acr: '', 
        },
        personalAPI:{
            student_id: '', // Placeholder; adjust as needed
            f_name: '',
            m_name:  '',
            l_name: '',
            gender: '',
            birth_date: null,
            birth_place:'',
            marital_status:'',
            religion: '',
            country: '',
            acr: '',
        },
        setPersonal: (update) => {
            set(state => {
              const newPersonal = typeof update === 'function' ? update(state.personal) : update;
              return {
                personal: newPersonal,
              };
            });
          },
          updatePersonalAPI: () => {
      
            set((state) => {
              const { personal } = state;
              return    {
                personalAPI: {
                ...state.personalAPI,
                    student_id: personal.studentId, // Placeholder; adjust as needed
                    f_name: personal.firstName || '',
                    m_name: personal.middleName || '',
                    l_name: personal.lastName || '',
                    gender: personal.gender || '',
                    birth_date: personal.birthDate || null,
                    birth_place: personal.birthPlace || '',
                    marital_status: personal.maritalStatus || '',
                    religion: personal.religion || '',
                    country: personal.country || '',
                    acr: personal.acr || '',
                },}
            });
        },
    }))
);