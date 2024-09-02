// Filename: AcHistType.ts

export interface AcHistData {
    stdntId: string | undefined;   
    elementarySchool: string;
    elementaryAddress: string;
    elementaryHonors?: string | null; 
    elementaryGraduate: number | null;
    juniorHighschool: string;
    juniorAddress: string;
    juniorHonors?: string | null; 
    juniorGraduate: number | null;
    seniorHighschool: string;
    seniorAddress: string;
    seniorHonors?: string | null; 
    seniorGraduate: number | null;
    ncaeGrade?: string | null;
    ncaeYearTaken?: number | null;
    latestCollege?: string | null; 
    collegeAddress?: string | null; 
    collegeHonors?: string | null; 
    course?: string | null; 
}
