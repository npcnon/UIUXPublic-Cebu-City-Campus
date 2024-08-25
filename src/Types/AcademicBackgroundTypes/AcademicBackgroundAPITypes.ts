// Filename: AcademicBackgroundAPITypes.ts

export interface AcademicBackgroundAPIData {
  stdnt_id: string;
  department: string;
  course: string;
  major_in?: string;
  student_type: string;
  semester_entry: string;
  year_entry: number;
  year_graduate: number;
  application_type: string;
}
