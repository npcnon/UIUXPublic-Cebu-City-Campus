// Filename: academichist.tsx


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
import { throttle } from 'lodash';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function AcademicHist() {
  const { acHist, setAcHist } = useAcHistStore((state) => ({
    acHist: state.acHist,
    setAcHist: state.setAcHist,
  }));


  const throttledSetAcHist = throttle((data: Partial<AcHistData>) => {
    useAcHistStore.getState().setAcHist(data);
  }, 300);

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
                    onChange={(e) => {
                      field.onChange(e);
                      throttledSetAcHist({
                        elementarySchool: e.target.value,
                      });
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
                    onChange={(e) => {
                      field.onChange(e);
                      throttledSetAcHist({
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
                    onChange={(e) => {
                      field.onChange(e);
                      throttledSetAcHist({
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
                    onChange={(e) => {
                      field.onChange(e);
                      throttledSetAcHist({
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
                    onChange={(e) => {
                      field.onChange(e);
                      throttledSetAcHist({
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
                    onChange={(e) => {
                      field.onChange(e);
                      throttledSetAcHist({
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
                    onChange={(e) => {
                      field.onChange(e);
                      throttledSetAcHist({
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
                    onChange={(e) => {
                      field.onChange(e);
                      throttledSetAcHist({
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
                    onChange={(e) => {
                      field.onChange(e);
                      throttledSetAcHist({
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
                    onChange={(e) => {
                      field.onChange(e);
                      throttledSetAcHist({
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
                    onChange={(e) => {
                      field.onChange(e);
                      throttledSetAcHist({
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
                    onChange={(e) => {
                      field.onChange(e);
                      throttledSetAcHist({
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
                    onChange={(e) => {
                      field.onChange(e);
                      throttledSetAcHist({
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
                    onChange={(e) => {
                      field.onChange(e);
                      throttledSetAcHist({
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
