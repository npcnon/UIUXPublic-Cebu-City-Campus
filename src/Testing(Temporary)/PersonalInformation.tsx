// Filename: PersonalInformation.tsx

import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useFormStore } from './useFormStore'; // Adjust the path as necessary
import { TextField, FormControl, InputLabel, MenuItem, Select, Tooltip } from '@mui/material';
import { debounce } from 'lodash';

const PersonalInformation = () => {
  const { control, formState: { errors }, trigger } = useForm();
  const { validateForm, setValidationStatus } = useFormStore();

  const handleValidation = async () => {
    const isValid = await trigger(); // Validate form fields
    setValidationStatus(isValid);
    return isValid;
  };

  React.useEffect(() => {
    handleValidation();
  }, [errors]);

  return (
    <div>
      <h2>Personal Information</h2>
      <form>
        {/* First Name */}
        <FormControl fullWidth error={!!errors.firstName}>
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Tooltip
                title={errors.firstName?.message || ""}
                open={!!errors.firstName}
                arrow
                placement="top-end"
              >
                <TextField
                  {...field}
                  label="First Name"
                  variant="outlined"
                  error={!!errors.firstName}
                />
              </Tooltip>
            )}
          />
        </FormControl>

        {/* Middle Name */}
        <FormControl fullWidth error={!!errors.middleName}>
          <Controller
            name="middleName"
            control={control}
            render={({ field }) => (
              <Tooltip
                title={errors.middleName?.message || ""}
                open={!!errors.middleName}
                arrow
                placement="top-end"
              >
                <TextField
                  {...field}
                  label="Middle Name (Optional)"
                  variant="outlined"
                  error={!!errors.middleName}
                />
              </Tooltip>
            )}
          />
        </FormControl>

        {/* Last Name */}
        <FormControl fullWidth error={!!errors.lastName}>
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Tooltip
                title={errors.lastName?.message || ""}
                open={!!errors.lastName}
                arrow
                placement="top-end"
              >
                <TextField
                  {...field}
                  label="Last Name"
                  variant="outlined"
                  error={!!errors.lastName}
                />
              </Tooltip>
            )}
          />
        </FormControl>

        {/* Gender */}
        <FormControl fullWidth error={!!errors.gender}>
          <InputLabel id="gender-label">Gender</InputLabel>
          <Controller
            name="gender"
            control={control}
            render={({ field }) => (
              <Select
                labelId="gender-label"
                {...field}
                label="Gender"
                error={!!errors.gender}
              >
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
              </Select>
            )}
          />
        </FormControl>

        {/* Additional fields... */}
      </form>
    </div>
  );
};

export default PersonalInformation;
