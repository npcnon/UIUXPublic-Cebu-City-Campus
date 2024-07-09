// subjects.ts

export interface Subject {
    id: number;
    subjectName: string;
    teacher: string;
    schedule: string;
  }
  
  export const subjects: Subject[] = [
    { id: 0, subjectName: 'Mathematics', teacher: 'Mr. Smith', schedule: 'Mon & Wed 9:00-10:30 AM' },
    { id: 1, subjectName: 'Physics', teacher: 'Dr. Johnson', schedule: 'Tue & Thu 10:00-11:30 AM' },
    { id: 2, subjectName: 'Chemistry', teacher: 'Ms. Lee', schedule: 'Mon & Wed 11:00-12:30 PM' },
    { id: 3, subjectName: 'Biology', teacher: 'Mr. Brown', schedule: 'Tue & Thu 1:00-2:30 PM' },
    { id: 4, subjectName: 'History', teacher: 'Ms. Davis', schedule: 'Fri 9:00-11:00 AM' },
  ];
  