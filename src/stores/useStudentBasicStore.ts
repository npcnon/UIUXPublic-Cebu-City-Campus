//filename: useStudentBasicStore.ts


import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { StudentBasicAPIData } from '../Types/StudentBasicDataAPITypes';


interface StudentBasicStore{
    studentBasicAPI: StudentBasicAPIData;
    setStudentBasicAPI: (update: ((prev: StudentBasicAPIData) => StudentBasicAPIData) | StudentBasicAPIData) => void;

}

export const useStudentBasicStore = create<StudentBasicStore>()(
    devtools((set) => ({


        studentBasicAPI:{
            first_name: '',
            middle_name:'',
            suffix:'',
            program:'',
            year_level:'',
            is_transferee: null,
            last_name: '',
            contact_number: '',
            address: '',
            campus: '',
            birth_date: '',
            sex: '',
            email: '',

        },
        setStudentBasicAPI:(update) => {
            console.log("setstudentbasic is triggered")
           
              set(state => {
                const newStudentBasicAPI = typeof update === 'function' ? update(state.studentBasicAPI) : update;
                console.log(newStudentBasicAPI);
                return {
                  studentBasicAPI: newStudentBasicAPI,
                };
              });
            },
        
    }))




);