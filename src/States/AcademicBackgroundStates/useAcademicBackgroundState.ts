// Filename: useAcademicBackgroundState.ts

import { useState } from 'react';
import { AcademicBackgroundData } from '../../Types/AcademicBackgroundTypes/AcademicBackgroundType';
export const useAcademicBackgroundState = () => {
  const [academicBackground, setAcademicBackground] = useState<AcademicBackgroundData>({
    stdntId:'',
    department:'',
    studentType: '',
    applicationType: '',
    course: '',
    majorIn: '',
    semesterEntry: '',
    yearEntry: 0,
    yearGraduate: 0,
  });

  return { academicBackground, setAcademicBackground };
};
