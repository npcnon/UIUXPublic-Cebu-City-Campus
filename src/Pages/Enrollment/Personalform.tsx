// Filename: personalData.tsx

import * as React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { useForm, Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

// Import the 'PersonalData' interface as a type
import { usePersonalStore } from "../../stores/usePersonalStore";
import { Personal } from "../../Types/PersonalDataTypes/PersonalDataTypes";
const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));



export default function PersonalData() {

  const {personal, setPersonal} = usePersonalStore((state)=> ({
    personal: state.personal,
    setPersonal: state.setPersonal

  }));

  const { control, handleSubmit } = useForm<Personal>({
    defaultValues: personal,
  });

  const onSubmit = (formData: Personal) => {
    
    setPersonal(formData);
  };
  
  return (
    <>
    
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* First Name */}
          <Typography variant="h6" gutterBottom>
            I. Personal Information
          </Typography>
          <FormGrid item xs={12} md={6}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="First Name"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setPersonal((prev) => ({
                        ...prev,
                        firstName: e.target.value,
                      })); // Update the parent state
                    }}
                    required
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          {/* Middle Name */}
          <FormGrid item xs={12} md={6}>
            <Controller
              name="middleName"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Middle Name"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setPersonal((prev) => ({
                        ...prev,
                        middleName: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          {/* Last Name */}
          <FormGrid item xs={12} md={6}>
            <Controller
              name="lastName"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Last Name"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setPersonal((prev) => ({
                        ...prev,
                        lastName: e.target.value,
                      })); // Update the parent state
                    }}
                    required
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          {/* Gender */}
          <FormGrid item xs={12} md={6} >
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="gender-label">
                  Gender
                </InputLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="gender-label"
                      id="gender"
                      value={field.value}
                      label="Gender"
                      onChange={(e) => {
                        field.onChange(e); // Update the internal form state
                        setPersonal(prev => ({
                          ...prev,
                          gender: e.target.value,
                        }));
                      }}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  )}
                />
              </FormControl>
            </Box>
          </FormGrid>


          {/* Birth Date */}
          <FormGrid item xs={12} md={6}>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    label="Birth Date"
                    value={field.value ? dayjs(field.value) : null} // Ensure value is Dayjs or null
                    onChange={(date: Dayjs | null) => {
                      const dateValue = date ? date.toDate() : null; // Convert Dayjs to Date
                      field.onChange(dateValue); // Update internal form state
                      setPersonal((prev) => ({
                        ...prev,
                        birthDate: dateValue, // Update parent state
                      }));
                    }}
                    slotProps={{ textField: { variant: 'outlined' } }}
                  />
                </LocalizationProvider>
              )}
            />
          </FormGrid>

          {/* Birth Place */}
          <FormGrid item xs={12} md={6}>
            <Controller
              name="birthPlace"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Birth Place"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setPersonal((prev) => ({
                        ...prev,
                        birthPlace: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          {/* Marital Status */}
          <FormGrid item xs={12} md={6}>
            <Controller
              name="maritalStatus"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel id="marital-status-label">Marital Status</InputLabel>
                  <Select
                    labelId="marital-status-label"
                    {...field}
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setPersonal((prev) => ({
                        ...prev,
                        maritalStatus: e.target.value,
                      })); // Update the parent state
                    }}
                  >
                    <MenuItem value="single">Single</MenuItem>
                    <MenuItem value="married">Married</MenuItem>
                    <MenuItem value="divorced">Divorced</MenuItem>
                    <MenuItem value="widowed">Widowed</MenuItem>
                  </Select>
                </FormControl>
              )}
            />
          </FormGrid>

          {/* Religion */}
          <FormGrid item xs={12} md={6}>
            <Controller
              name="religion"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Religion"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setPersonal((prev) => ({
                        ...prev,
                        religion: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          {/* Country */}
          <FormGrid item xs={12} md={6}>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Country"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setPersonal((prev) => ({
                        ...prev,
                        country : e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          {/* Citizenship */}
          <FormGrid item xs={12} md={6}>
            <Controller
              name="citizenship"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Citizenship"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setPersonal((prev) => ({
                        ...prev,
                        citizenship : e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          {/* Acr */}
          <FormGrid item xs={12}>
            <Controller
              name="acr"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Acr (Optional)"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setPersonal((prev) => ({
                        ...prev,
                        acr: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>
         
        
      <Typography variant="h6">
      II. Address and Contact Information
      </Typography>

            {/*City Address*/}
            <FormGrid item xs={12} md={10}>
              <Controller
                name="cityAddress"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextField
                      {...field}
                      label="City Adress"
                      variant="outlined"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e); // Update the internal form state
                        setPersonal((prev) => ({
                          ...prev,
                          cityAddress: e.target.value,
                        })); // Update the parent state
                      }}
                    />
                  </FormControl>
                )}
              />
            </FormGrid>



            {/*Province Address*/}
            <FormGrid item xs={12} md={10}>
              <Controller
                name="provinceAddress"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextField
                      {...field}
                      label="Province Adress"
                      variant="outlined"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e); // Update the internal form state
                        setPersonal((prev) => ({
                          ...prev,
                          provinceAddress: e.target.value,
                        })); // Update the parent state
                      }}
                    />
                  </FormControl>
                )}
              />
            </FormGrid>



            {/*Contact Number*/}
            <FormGrid item xs={12} md={10}>
              <Controller
                name="contactNumber"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextField
                      {...field}
                      label="Contact Number"
                      variant="outlined"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e); // Update the internal form state
                        setPersonal((prev) => ({
                          ...prev,
                          contactNumber: e.target.value,
                        })); // Update the parent state
                      }}
                    />
                  </FormControl>
                )}
              />
            </FormGrid>



            {/*City Contact Number*/}
            <FormGrid item xs={12} md={10}>
              <Controller
                name="cityContactNumber"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextField
                      {...field}
                      label="City Contact Number"
                      variant="outlined"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e); // Update the internal form state
                        setPersonal((prev) => ({
                          ...prev,
                          cityContactNumber: e.target.value,
                        })); // Update the parent state
                      }}
                    />
                  </FormControl>
                )}
              />
            </FormGrid>



            {/*Province Contact Number*/}
            <FormGrid item xs={12} md={10}>
              <Controller
                name="provinceContactNumber"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextField
                      {...field}
                      label="Province Contact Number"
                      variant="outlined"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e); // Update the internal form state
                        setPersonal((prev) => ({
                          ...prev,
                          provinceContactNumber: e.target.value,
                        })); // Update the parent state
                      }}
                    />
                  </FormControl>
                )}
              />
            </FormGrid>



            {/*Email*/}
            <FormGrid item xs={12} md={10}>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth>
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      value={field.value}
                      onChange={(e) => {
                        field.onChange(e); // Update the internal form state
                        setPersonal((prev) => ({
                          ...prev,
                          email: e.target.value,
                        })); // Update the parent state
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
