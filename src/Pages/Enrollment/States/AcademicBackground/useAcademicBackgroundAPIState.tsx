//useAcademicBackgroundAPIState.tsx

import { useMemo } from 'react';
import { AcademicBackgroundData } from '../../Types/AcademicBackgroundType';
import { AcademicBackgroundAPIData } from '../../Types/AcademicBackgroundAPITypes';

export const useAcademicBackgroundAPIState = (academicBackground: AcademicBackgroundData): AcademicBackgroundAPIData => {
  return useMemo(() => ({
    stdnt_id: 'S555666777',
    department: '01',
    course: academicBackground.course || '',
    major_in: academicBackground.majorIn || '',
    student_type: academicBackground.studentType || '',
    semester_entry: academicBackground.semesterEntry || '',
    year_entry: academicBackground.yearEntry,
    year_graduate: academicBackground.yearGraduate,
    application_type: academicBackground.applicationType || '',
  }), [academicBackground]);
};