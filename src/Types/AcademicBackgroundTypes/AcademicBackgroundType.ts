// Filename: academicBackgroundTypes.ts

export interface AcademicBackgroundData {
  stdntId: string | undefined;
  department: string | undefined;
  studentType: string;
  applicationType: string;
  course: string | number;
  majorIn: string;
  semesterEntry: string;
  yearEntry: number | null;
  yearGraduate: number | null;
}
