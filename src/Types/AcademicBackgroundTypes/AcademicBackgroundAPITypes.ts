// Filename: AcademicBackgroundAPITypes.ts

export interface AcademicBackgroundAPIData {
  stdnt_id: string | undefined;
  department: string | undefined;
  course: string | number;
  major_in?: string;
  student_type: string;
  semester_entry: string;
  year_entry: number | null;
  year_graduate: number | null;
  application_type: string;
}
