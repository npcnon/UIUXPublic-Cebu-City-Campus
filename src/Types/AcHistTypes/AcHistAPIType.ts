// Filename: AcHistAPIType.ts

export interface AcHistAPIData {
    stdnt_id: string | undefined;
    elementary_school: string;
    elementary_address: string;
    elementary_honors?: string | null; 
    elementary_graduate: number | null;
    junior_highschool: string;
    junior_address: string;
    junior_honors?: string | null; 
    junior_graduate: number | null;
    senior_highschool: string;
    senior_address: string;
    senior_honors?: string | null; 
    senior_graduate: number | null;
    ncae_grade?: string | null; 
    ncae_year_taken?: number | null;
    latest_college?: string | null; 
    college_address?: string | null; 
    college_honors?: string | null; 
    course?: string | null; 
}
