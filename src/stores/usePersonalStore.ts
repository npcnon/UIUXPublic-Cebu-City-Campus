//filename : usePersonalStore

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Personal } from '../Types/PersonalDataTypes/PersonalDataTypes';
import { PersonalAPIData } from '../Types/PersonalDataTypes/PersonalDataAPITypes';
import { AddPersonalDataAPI } from '../Types/AddPersonalDataTypes/AddPersonalDataAPIType';
interface PersonalStore{
    personal: Personal;
    setPersonal: (update: ((prev: Personal) => Personal) | Personal) => void;
    personalAPI: PersonalAPIData;
    updatePersonalAPI: ()=>void;
    addPersonalAPI: AddPersonalDataAPI;
    updateAddPersonalAPI: ()=>void;
}

export const usePersonalStore = create<PersonalStore>()(
    devtools((set) => ({
        personal: {
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

            //addPersonalInfo
            cityAddress :'',
            provinceAddress :'',
            contactNumber :'',
            cityContactNumber :'',
            provinceContactNumber :'',
            email :'',
            citizenship :'',
 
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
        addPersonalAPI:{
            stdnt_id :'',
            city_address :'',
            province_address :'',
            contact_number :'',
            city_contact_number :'',
            province_contact_number :'',
            email :'',
            citizenship :'',
        },

        setPersonal: (update) => {
          console.log("setpersonal is triggered")
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
        updateAddPersonalAPI: () => {
      
          set((state) => {
            const { personal } = state;
            return    {
              addPersonalAPI: {
              stdnt_id : personal.studentId || '',
              city_address : personal.cityAddress || '',
              province_address : personal.provinceAddress || '',
              contact_number : personal.contactNumber || '',
              city_contact_number : personal.cityContactNumber || '',
              province_contact_number : personal.provinceContactNumber || '',
              email : personal.email || '',
              citizenship : personal.citizenship || '',
              },}
          });
      },
    }))
);