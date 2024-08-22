//academicBg.tsx

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
import { AcademicBackgroundData } from '../../Types/AcademicBackgroundTypes/AcademicBackgroundType';
import { fetchDepartmentIdByCourse } from '../../services/courseService';
const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

interface AcademicBackgroundProps {
  data: AcademicBackgroundData;
  setData: React.Dispatch<React.SetStateAction<AcademicBackgroundData>>;
}

export default function AcademicBackground({
  data,
  setData,
}: AcademicBackgroundProps) {
  const { control, handleSubmit } = useForm<AcademicBackgroundData>({
    defaultValues: data,
  });

  // State to track selected course
  const [selectedCourse, setSelectedCourse] = React.useState<string | null>(null);

  React.useEffect(() => {
    const fetchDepartment = async () => {
      if (selectedCourse) { 
        try {
          const departmentId = await fetchDepartmentIdByCourse(selectedCourse);
          console.log(`course deparment id: ${departmentId}`)
          // Update the department field in the data state
          setData((prev) => ({
            ...prev,
            department: departmentId,
          }));
        } catch (error) {
          console.error('Failed to fetch department ID:', error);
        }
      }
    };

    fetchDepartment();
  }, [selectedCourse]);

  const onSubmit = (formData: AcademicBackgroundData) => {
    setData(formData);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        I. Academic Background Form
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <FormGrid item xs={12} md={6} lg={5}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="studentType-label">Student Type</InputLabel>
                <Controller
                  name="studentType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="studentType-label"
                      id="studentType"
                      value={field.value}
                      label="Student Type"
                      onChange={(e) => {
                        field.onChange(e); // Update the internal form state
                        setData((prev) => ({
                          ...prev,
                          studentType: e.target.value,
                        })); // Update the parent state
                      }}
                    >
                      <MenuItem value="Graduate">Graduate</MenuItem>
                      <MenuItem value="Undergraduate">Undergraduate</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Box>
          </FormGrid>

          <FormGrid item xs={12} md={6} lg={7}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="applicationType-label">
                  Application Type
                </InputLabel>
                <Controller
                  name="applicationType"
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="applicationType-label"
                      id="applicationType"
                      value={field.value}
                      label="Application Type"
                      onChange={(e) => {
                        field.onChange(e); // Update the internal form state
                        setData((prev) => ({
                          ...prev,
                          applicationType: e.target.value,
                        })); // Update the parent state
                      }}
                    >
                      <MenuItem value="Freshmen">Freshmen</MenuItem>
                      <MenuItem value="Transferee">Transferee</MenuItem>
                      <MenuItem value="Cross Enrollee">Cross Enrollee</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Box>
          </FormGrid>

          <FormGrid item xs={12} md={6} lg={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="course-label">Course</InputLabel>
                <Controller
                  name="course"
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="course-label"
                      id="course"
                      value={field.value}
                      label="Course"
                      onChange={(e) => {
                        field.onChange(e); // Update the internal form state
                        const newCourse = e.target.value;
                        setSelectedCourse(newCourse); // Update the local state
                        setData((prev) => ({
                          ...prev,
                          course: newCourse,
                        })); // Update the parent state
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
                  )}
                />
              </FormControl>
            </Box>
          </FormGrid>

          <FormGrid item xs={12} md={6} lg={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="major-label">Major</InputLabel>
                <Controller
                  name="majorIn"
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="major-label"
                      id="major"
                      value={field.value || ""}
                      label="Major"
                      onChange={(e) => {
                        field.onChange(e); // Update the internal form state
                        setData((prev) => ({
                          ...prev,
                          majorIn: e.target.value,
                        })); // Update the parent state
                      }}
                    >
                      <MenuItem value="BSIT">BSIT</MenuItem>
                      <MenuItem value="BSTM">BSTM</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Box>
          </FormGrid>

          <Grid item xs={12} md={6} lg={12}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Box sx={{ flex: "40%" }}>
                <FormControl fullWidth>
                  <InputLabel id="semester-label">Semester Entry</InputLabel>
                  <Controller
                    name="semesterEntry"
                    control={control}
                    render={({ field }) => (
                      <Select
                        labelId="semester-label"
                        id="semester"
                        value={field.value}
                        label="Semester Entry"
                        onChange={(e) => {
                          field.onChange(e); // Update the internal form state
                          setData((prev) => ({
                            ...prev,
                            semesterEntry: e.target.value,
                          })); // Update the parent state
                        }}
                      >
                        <MenuItem value="First Semester">
                          First Semester
                        </MenuItem>
                        <MenuItem value="Second Semester">
                          Second Semester
                        </MenuItem>
                        <MenuItem value="Summer">Summer</MenuItem>
                      </Select>
                    )}
                  />
                </FormControl>
              </Box>

              <Box sx={{ flex: "30%" }}>
                <FormControl fullWidth>
                  <Controller
                    name="yearEntry"
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          views={["year"]}
                          label="Year Entry"
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(date: dayjs.Dayjs | null) => {
                            const year = date?.year() ?? 0; // Convert to number
                            field.onChange(year); // Update the internal form state
                            setData((prev) => ({ ...prev, yearEntry: year })); // Update the parent state
                          }}
                          slotProps={{
                            textField: { variant: "outlined", fullWidth: true },
                          }}
                        />
                      </LocalizationProvider>
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
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          views={["year"]}
                          label="Year Graduate"
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(date: dayjs.Dayjs | null) => {
                            const year = date?.year() ?? 0; // Convert to number
                            field.onChange(year); // Update the internal form state
                            setData((prev) => ({
                              ...prev,
                              yearGraduate: year,
                            })); // Update the parent state
                          }}
                          slotProps={{
                            textField: { variant: "outlined", fullWidth: true },
                          }}
                        />
                      </LocalizationProvider>
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
