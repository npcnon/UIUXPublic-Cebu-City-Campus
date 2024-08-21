// Filename: useAcademicBackgroundState.ts

import { useState } from 'react';
import { AcademicBackgroundData } from '../../Types/AcademicBackgroundType';

export const useAcademicBackgroundState = () => {
  const [academicBackground, setAcademicBackground] = useState<AcademicBackgroundData>({
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
