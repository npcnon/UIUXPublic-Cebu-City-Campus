  // Filename: academicBg.tsx

  import * as React from 'react';
  import Grid from '@mui/material/Grid';
  import Box from '@mui/material/Box';
  import InputLabel from '@mui/material/InputLabel';
  import MenuItem from '@mui/material/MenuItem';
  import FormControl from '@mui/material/FormControl';
  import Select from '@mui/material/Select';
  import Typography from '@mui/material/Typography';
  import { styled } from '@mui/material/styles';
  import { useForm, Controller } from 'react-hook-form';
  import { DatePicker } from '@mui/x-date-pickers/DatePicker';
  import { TextField } from '@mui/material';
  import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
  import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
  import dayjs from 'dayjs';
  import { fetchDepartmentIdByCourse } from '../../services/courseService';
  import { fetchLatestStudentId } from '../../services/studentIdService';
  import { useAcademicStore } from '../../stores/useAcademicStore';
  import { AcademicBackgroundData } from '../../Types/AcademicBackgroundTypes/AcademicBackgroundType';
  import { usePersonalStore } from '../../stores/usePersonalStore';
  import { useFamilyStore } from '../../stores/useFamilyStore';
  import { useAcHistStore } from '../../stores/useAcHistStore';
  import {debounce} from 'lodash';
  import YearPicker from './yearpicker'; 

  //TODO: switching of course will change regenerate the sudent id
  const FormGrid = styled(Grid)(() => ({
    display: "flex",
    flexDirection: "column",
  }));

  const FormField = styled(Grid)(({ theme }) => ({
    marginBottom: theme.spacing(2),
  }));


  export default function AcademicBackground() {
    const { academicBackground, setAcademicBackground } = useAcademicStore(state => ({
      academicBackground: state.academicBackground,
      setAcademicBackground: state.setAcademicBackground,
    }));
    const {setPersonal } = usePersonalStore(state => ({
      setPersonal : state.setPersonal,

    }));

    const {setFamilyBackground } = useFamilyStore(state => ({
      setFamilyBackground : state.setFamilyBackground,

    }));

    const {setAcHist} = useAcHistStore(state => ({
      setAcHist : state.setAcHist
    }));


    const debouncedSetAcademicBackground = React.useCallback(
      debounce((data: Partial<AcademicBackgroundData>) => {
        setAcademicBackground((prev) => ({
          ...prev,
          ...data,
        }));
      }, 100),
      [setAcademicBackground]
    );

    const { control, formState: { errors }} = useForm<AcademicBackgroundData>({
      defaultValues: academicBackground,
    });

    




  React.useEffect(() => {
    const selectedYear = useAcademicStore.getState().academicBackground.yearEntry;
    const selectedCourse = useAcademicStore.getState().academicBackground.course;
    const fetchDepartment = async () => {
      if (selectedCourse) {
        try {
          const departmentId = await fetchDepartmentIdByCourse(selectedCourse);
          setAcademicBackground(prev => ({
            ...prev,
            department: departmentId,
          }));
          console.log(`Academic Background department: ${useAcademicStore.getState().academicBackground.department} while fetched : ${departmentId}`);
        } catch (error) {
          console.error('Failed to fetch department ID:', error);
        }
      }
    }

    const fetchStudentId = async () => {
      
      if (selectedYear && selectedCourse) {
        try {
          const studentId = await fetchLatestStudentId();
          setPersonal(prev => ({
            ...prev,
            studentId : studentId 
          }));
          setAcademicBackground(prev => ({
            ...prev,
            stdntId : studentId
          }));
          setFamilyBackground(prev => ({
            ...prev,
            stdntId : studentId
          }));
          setAcHist(prev => ({
            ...prev,
            stdntId : studentId
          }));
          console.log(`Academic Background studentid: ${useAcademicStore.getState().academicBackground.stdntId}while fetched : ${studentId}`);
        } catch (error) {
          console.error('Failed to fetch student ID:', error);
        }
      }
    };

    const fetchData = async () => {
      if (useAcademicStore.getState().academicBackground.course && useAcademicStore.getState().academicBackground.yearEntry) {
        await fetchDepartment();
        await fetchStudentId();
      } else if (selectedCourse && !selectedYear) {
         fetchDepartment();
      }
    };

    fetchData(); 
    
  }, [useAcademicStore.getState().academicBackground.yearEntry, useAcademicStore.getState().academicBackground.course]);


    

    return (
      <>
        <Typography variant="h6" gutterBottom>
          I. Academic Background Form
        </Typography>
        <form >

          <Grid container spacing={3} sx={{ mb: 3 }}>
            
            <FormField item xs={12} md={6}>
                <Controller
                  name="studentType"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.studentType} variant="outlined">
                      <InputLabel id="studenttype-label">Student Type</InputLabel>
                      <Select
                        {...field}
                        labelId="studenttype-label"
                        label="Student Type"
                        MenuProps={{ disableScrollLock: true }}
                        onChange={(e) => {
                          field.onChange(e); // Update the internal form state
                          setAcademicBackground((prev) => ({
                            ...prev,
                            studentType: e.target.value,
                          }));                        
                        }}
                      >
                        <MenuItem value="Graduate">Graduate</MenuItem>
                        <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                      </Select>
                      {errors.studentType && (
                        <Typography color="error" variant="caption">
                          {errors.studentType.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </FormField>


            <FormField item xs={12} md={6}>
                <Controller
                  name="applicationType"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.applicationType} variant="outlined">
                      <InputLabel id="applicationtype-label">Application Type</InputLabel>
                      <Select
                        {...field}
                        labelId="applicationtype-label"
                        label="Application Type"
                        MenuProps={{ disableScrollLock: true }}
                        onChange={(e) => {
                          field.onChange(e); // Update the internal form state
                          setAcademicBackground((prev) => ({
                            ...prev,
                            applicationType: e.target.value,
                          }));                        
                        }}
                      >
                        <MenuItem value="Freshmen">Freshmen</MenuItem>
                        <MenuItem value="Transferee">Transferee</MenuItem>
                        <MenuItem value="Cross Enrollee">Cross Enrollee</MenuItem>
                      </Select>
                      {errors.applicationType && (
                        <Typography color="error" variant="caption">
                          {errors.applicationType.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </FormField>


            <FormField item xs={12} md={6} lg={6}>
                <Controller
                  name="course"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.course} variant="outlined">
                      <InputLabel id="course-label">Course</InputLabel>
                      <Select
                        {...field}
                        labelId="course-label"
                        label="Course"
                        MenuProps={{ disableScrollLock: true }}
                        onChange={(e) => {
                          field.onChange(e); // Update the internal form state
                          setAcademicBackground((prev) => ({
                            ...prev,
                            course: e.target.value,
                          }));                        
                        }}
                      >
                        <MenuItem value="Bachelor of Arts in Mass Communication">Bachelor of Arts in Mass Communication</MenuItem>
                        <MenuItem value="Bachelor of Science in Accountancy (BSA)">Bachelor of Science in Accountancy (BSA)</MenuItem>
                        <MenuItem value="Bachelor of Science in Business Administration (BSBA)">Bachelor of Science in Business Administration (BSBA)</MenuItem>
                        <MenuItem value="Bachelor of Science in Information Technology (BSIT)">Bachelor of Science in Information Technology (BSIT)</MenuItem>
                        <MenuItem value="Associate in Computer Technology (ACT)">Associate in Computer Technology (ACT)</MenuItem>
                        <MenuItem value="Bachelor of Science in Electrical Engineering (BSEE)">Bachelor of Science in Electrical Engineering (BSEE)</MenuItem>
                        <MenuItem value="Bachelor of Science in Electronics and Communications Engineering (BSECE)">Bachelor of Science in Electronics and Communications Engineering (BSECE)</MenuItem>
                        <MenuItem value="Bachelor of Science in Industrial Engineering (BSIE)">Bachelor of Science in Industrial Engineering (BSIE)</MenuItem>
                        <MenuItem value="Bachelor of Science in Mechanical Engineering (BSME)">Bachelor of Science in Mechanical Engineering (BSME)</MenuItem>
                        <MenuItem value="Bachelor of Science in Civil Engineering (BSCE)">Bachelor of Science in Civil Engineering (BSCE)</MenuItem>
                        <MenuItem value="Bachelor of Science in Industrial Technology (BSIT)">Bachelor of Science in Industrial Technology (BSIT)</MenuItem>
                        <MenuItem value="Bachelor of Science in Electronics and Communications Engineering (BSECE)">Bachelor of Science in Electronics and Communications Engineering (BSECE)</MenuItem>
                        <MenuItem value="Bachelor of Science in Tourism Management (BSTM)">Bachelor of Science in Tourism Management (BSTM)</MenuItem>
                      </Select>
                      {errors.course && (
                        <Typography color="error" variant="caption">
                          {errors.course.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </FormField>

            <FormGrid item xs={12} md={6}>
            <Controller
              name="majorIn"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Major In"
                    variant="outlined"
                    required
                    value={field.value}
                    onBlur={(e) => {
                      field.onChange(e); // Update the internal form state
                      debouncedSetAcademicBackground({
                        majorIn: e.target.value,
                      }); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <Grid item xs={12} md={6} lg={12}>
            <Box sx={{ display: "flex", gap: 2 }}>
              
              <FormField item xs={12} md={6}>
                <Controller
                  name="semesterEntry"
                  control={control}
                  render={({ field }) => (
                    <FormControl fullWidth error={!!errors.semesterEntry} variant="outlined">
                      <InputLabel id="semesterentry-label">Semester Entry</InputLabel>
                      <Select
                        {...field}
                        labelId="semesterentry-label"
                        label="Semester Entry"
                        MenuProps={{ disableScrollLock: true }}
                        onChange={(e) => {
                          field.onChange(e); // Update the internal form state
                          setAcademicBackground((prev) => ({
                            ...prev,
                            semesterEntry: e.target.value,
                          }));                        
                        }}
                      >
                        <MenuItem value="First Semester">First Semester</MenuItem>
                        <MenuItem value="Second Semester">Second Semester</MenuItem>
                        <MenuItem value="Summer">Summer</MenuItem>                  
                      </Select>
                      {errors.semesterEntry && (
                        <Typography color="error" variant="caption">
                          {errors.semesterEntry.message}
                        </Typography>
                      )}
                    </FormControl>
                  )}
                />
              </FormField>
              
              <Box sx={{ flex: "30%" }}>
                <FormControl fullWidth>
                  <Controller
                    name="yearEntry"
                    control={control}
                    render={({ field }) => (
                      <YearPicker
                        label="Year Entry"
                        value={field.value}
                        onChange={(year: number) => {
                          field.onChange(year);
                          setAcademicBackground((prev) => ({
                            ...prev,
                            yearEntry: year,
                          }));
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Box>

              <Box sx={{ flex: "30%" }}>
                <FormControl fullWidth>
                  <Controller
                    name="yearGraduate"
                    control={control}
                    render={({ field }) => (
                      <YearPicker
                        label="Year Graduate"
                        value={field.value}
                        onChange={(year: number) => {
                          field.onChange(year);
                          setAcademicBackground((prev) => ({
                            ...prev,
                            yearGraduate: year,
                          }));
                        }}
                      />
                    )}
                  />
                </FormControl>
              </Box>
            </Box>
          </Grid>
          </Grid>
        </form>
      </>
    );
  }
