//filename: StudentBasicDataTypes.ts

export interface StudentBasicAPIData{
    first_name: string;
    middle_name: string;
    last_name: string;
    suffix:string;
    is_transferee: boolean;
    year_level: string;
    contact_number: string;
    address: string;
    campus: string;
    program: string;
    birth_date: Date | string | null;
    sex: string;
    email: string;
}