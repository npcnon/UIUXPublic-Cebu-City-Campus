//filename: StudentBasicDataTypes.ts

export interface StudentBasicAPIData{
    first_name: string;
    last_name: string;
    contact_number: string;
    address: string;
    campus: string;
    birth_date: Date | string | null;
    sex: string;
    email: string;
}