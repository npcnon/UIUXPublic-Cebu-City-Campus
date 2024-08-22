// Filename: academicBackgroundTypes.ts

export interface AcademicBackgroundData {
  stdntId: string;
  department: string;
  studentType: string;
  applicationType: string;
  course: string;
  majorIn?: string;
  semesterEntry: string;
  yearEntry: number;
  yearGraduate: number;
}
