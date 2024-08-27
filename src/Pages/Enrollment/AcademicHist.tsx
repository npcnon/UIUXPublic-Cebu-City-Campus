// Filename: academichist.tsx

import * as React from "react";
import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';
import { useAcHistStore } from '../../stores/useAcHistStore';
import { AcHistData } from '../../Types/AcHistTypes/AcHistType';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { debounce } from "lodash";
const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AcademicHist() {
  const { acHist, setAcHist } = useAcHistStore((state) => ({
    acHist: state.acHist,
    setAcHist: state.setAcHist,
  }));


  const debouncedSetAcHist = React.useCallback(
    debounce((data: Partial<AcHistData>) => {
      setAcHist((prev) => ({
        ...prev,
        ...data,
      }));
    }, 100),
    [setAcHist]
  );

  const { control, handleSubmit } = useForm<AcHistData>({
    defaultValues: acHist,
  });

  const onSubmit = (formData: AcHistData) => {
    setAcHist(formData);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, mt: 3 }}>
        Academic History
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Elementary School Information */}
          <Typography variant="subtitle1" gutterBottom>
            Elementary School Information
          </Typography>
          <FormGrid item xs={12} md={6}>
            <Controller
              name="elementarySchool"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Elementary School"
                    variant="outlined"
                    required
                    value={field.value}
                    onBlur={(e) => {
                      field.onChange(e); // Update the internal form state
                      debouncedSetAcHist({
                        elementarySchool: e.target.value,
                      }); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="elementaryAddress"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Elementary School Address"
                    variant="outlined"
                    value={field.value}
                    onBlur={(e) => {
                      field.onChange(e);
                      debouncedSetAcHist({
                        elementaryAddress: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="elementaryHonors"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Elementary School Honors"
                    variant="outlined"
                    value={field.value}
                    onBlur={(e) => {
                      field.onChange(e);
                      debouncedSetAcHist({
                        elementaryHonors: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <Box sx={{ flex: "30%" }}>
                <FormControl fullWidth>
                  <Controller
                    name="elementaryGraduate"
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          views={["year"]}
                          label="Elementary Year Graduate"
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(date: dayjs.Dayjs | null) => {
                            const year = date?.year() ?? 0;
                            setAcHist((prev) => ({
                              ...prev,
                              elementaryGraduate: year,
                            }));
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

          {/* Junior High School Information */}
          <Typography variant="subtitle1" gutterBottom>
            Junior High School Information
          </Typography>
          <FormGrid item xs={12} md={6}>
            <Controller
              name="juniorHighschool"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Junior High School"
                    variant="outlined"
                    value={field.value}
                    onBlur={(e) => {
                      field.onChange(e);
                      debouncedSetAcHist({
                        juniorHighschool: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="juniorAddress"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Junior High School Address"
                    variant="outlined"
                    value={field.value}
                    onBlur={(e) => {
                      field.onChange(e);
                      debouncedSetAcHist({
                        juniorAddress: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="juniorHonors"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Junior High School Honors"
                    variant="outlined"
                    value={field.value}
                    onBlur={(e) => {
                      field.onChange(e);
                      debouncedSetAcHist({
                        juniorHonors: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <Box sx={{ flex: "30%" }}>
                <FormControl fullWidth>
                  <Controller
                    name="juniorGraduate"
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          views={["year"]}
                          label="Junior Highschool Year Graduate"
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(date: dayjs.Dayjs | null) => {
                            const year = date?.year() ?? 0;
                            setAcHist((prev) => ({
                              ...prev,
                              juniorGraduate: year,
                            }));
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
          {/* Senior High School Information */}
          <Typography variant="subtitle1" gutterBottom>
            Senior High School Information
          </Typography>
          <FormGrid item xs={12} md={6}>
            <Controller
              name="seniorHighschool"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Senior High School"
                    variant="outlined"
                    value={field.value}
                    onBlur={(e) => {
                      field.onChange(e);
                      debouncedSetAcHist({
                        seniorHighschool: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="seniorAddress"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Senior High School Address"
                    variant="outlined"
                    value={field.value}
                    onBlur={(e) => {
                      field.onChange(e);
                      debouncedSetAcHist({
                        seniorAddress: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="seniorHonors"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Senior High School Honors"
                    variant="outlined"
                    value={field.value}
                    onBlur={(e) => {
                      field.onChange(e);
                      debouncedSetAcHist({
                        seniorHonors: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <Box sx={{ flex: "30%" }}>
                <FormControl fullWidth>
                  <Controller
                    name="seniorGraduate"
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          views={["year"]}
                          label="Senior Highschool Year Graduate"
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(date: dayjs.Dayjs | null) => {
                            const year = date?.year() ?? 0;
                            setAcHist((prev) => ({
                              ...prev,
                              seniorGraduate: year,
                            }));
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
          


          {/* NCAE Information */}
          <Typography variant="subtitle1" gutterBottom>
            NCAE
          </Typography>
          <FormGrid item xs={12} md={6}>
            <Controller
              name="ncaeGrade"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="NCAE Grade"
                    variant="outlined"
                    value={field.value}
                    onBlur={(e) => {
                      field.onChange(e);
                      debouncedSetAcHist({
                        ncaeGrade: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>


          <Box sx={{ flex: "30%" }}>
                <FormControl fullWidth>
                  <Controller
                    name="ncaeYearTaken"
                    control={control}
                    render={({ field }) => (
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                          views={["year"]}
                          label="NCAE Year Taken"
                          value={field.value ? dayjs(field.value) : null}
                          onChange={(date: dayjs.Dayjs | null) => {
                            const year = date?.year() ?? 0;
                            setAcHist((prev) => ({
                              ...prev,
                              ncaeYearTaken: year,
                            }));
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



          {/* College Information */}
          <Typography variant="subtitle1" gutterBottom>
            College Information
          </Typography>
          <FormGrid item xs={12} md={6}>
            <Controller
              name="latestCollege"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Latest College"
                    variant="outlined"
                    value={field.value}
                    onBlur={(e) => {
                      field.onChange(e);
                      debouncedSetAcHist({
                        latestCollege: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="collegeAddress"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="College Address"
                    variant="outlined"
                    value={field.value}
                    onBlur={(e) => {
                      field.onChange(e);
                      debouncedSetAcHist({
                        collegeAddress: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="collegeHonors"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="College Honors"
                    variant="outlined"
                    value={field.value}
                    onBlur={(e) => {
                      field.onChange(e);
                      debouncedSetAcHist({
                        collegeHonors: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="course"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Course"
                    variant="outlined"
                    value={field.value}
                    onBlur={(e) => {
                      field.onChange(e);
                      debouncedSetAcHist({
                        course: e.target.value,
                      });
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

        </Grid>
      </form>
    </>
  );
}
