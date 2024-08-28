// filename: PersonalData.tsx
import { Zoom } from "@mui/material";
import * as React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import { useForm, Controller, Resolver } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { debounce } from "lodash";
import { usePersonalStore } from "../../stores/usePersonalStore";
import { Personal } from "../../Types/PersonalDataTypes/PersonalDataTypes";
import { yupResolver } from '@hookform/resolvers/yup';
import { personalDataSchema } from "../../validations/personalDataValidation";
import Tooltip from '@mui/material/Tooltip';

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

interface PersonalDataProps {
  onValidate: React.MutableRefObject<() => Promise<boolean>>;
}

const defaultTooltipProp = {
  popper: {
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, -7],
        },
      },
    ],
  },
};


export default function PersonalData({ onValidate }: PersonalDataProps) {
  const { personal, setPersonal } = usePersonalStore((state) => ({
    personal: state.personal,
    setPersonal: state.setPersonal
  }));

  const debouncedSetPersonal = React.useCallback(
    debounce((data: Partial<Personal>) => {
      setPersonal((prev) => ({
        ...prev,
        ...data,
      }));
    }, 100),
    [setPersonal]
  );

  const { control, formState: { errors }, trigger } = useForm<Personal>({
    defaultValues: personal,
    resolver: yupResolver(personalDataSchema) as Resolver<Personal>,
    mode: 'onChange',
    shouldUnregister: false,
  });

  React.useEffect(() => {
    onValidate.current = async () => {
      const result = await trigger();
      return result;
    };
  }, [trigger, onValidate]);
  
  return (
    <>
      <form>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            I. Personal Information
          </Typography>

          {/* First Name */}
          <FormGrid item xs={12} md={6}>
            <Controller
              name="firstName"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.firstName?.message}>
                  <Tooltip
                    title={errors.firstName?.message || ""}
                    open={!!errors.firstName}
                    arrow
                    TransitionComponent={Zoom}
                    slotProps={defaultTooltipProp}
                    placement="top-end"
                  > 
                    <TextField
                      {...field}
                      label="First Name"
                      variant="outlined"
                      value={field.value}
                      onBlur={(e) => {
                        field.onBlur(); // Update the internal form state
                        debouncedSetPersonal({
                          firstName: e.target.value,
                        }); // Update the parent state
                      }}
                      error={!!errors.firstName} // Use error prop to highlight field
                      required
                    />
                  </Tooltip>
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
                <FormControl fullWidth error={!!errors.middleName}>
                  <Tooltip
                    title={errors.middleName?.message || ""}
                    open={!!errors.middleName}
                    arrow
                    slotProps={defaultTooltipProp}
                    placement="top-end"
                  >
                    <TextField
                      {...field}
                      label="Middle Name (Optional)"
                      variant="outlined"
                      value={field.value}
                      onBlur={(e) => {
                        field.onBlur(); // Update the internal form state
                        debouncedSetPersonal({
                          middleName: e.target.value, 
                        }); // Update the parent state
                      }}
                      error={!!errors.middleName}
                  />
                  </Tooltip>
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
                <FormControl fullWidth error={!!errors.lastName}>
                  <Tooltip
                    title={errors.lastName?.message || ""}
                    open={!!errors.lastName}
                    arrow
                    slotProps={defaultTooltipProp}
                    placement="top-end"
                  >
                    <TextField
                      {...field}
                      label="Last Name"
                      variant="outlined"
                      value={field.value}
                      onBlur={(e) => {
                        field.onBlur(); // Update the internal form state
                        debouncedSetPersonal({
                          lastName: e.target.value,
                        }); // Update the parent state
                      }}
                      error={!!errors.lastName}
                    />
                  </Tooltip>
                </FormControl>
              )}
            />
          </FormGrid>

          {/* Gender */}
          <FormGrid item xs={12} md={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth error={!!errors.gender}>
                <InputLabel id="gender-status-label">Gender</InputLabel>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="gender-label"
                      id="gender"
                      value={field.value || ''}
                      label="Gender"
                      onChange={(e) => {
                        field.onChange(e); // Update the internal form state
                        setPersonal((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        })); // Update the parent state
                      }}
                      onBlur={field.onBlur} // Make sure blur is handled
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  )}
                />
                {errors.gender && (
                  <Typography
                    color="error"
                    sx={{ fontSize: '0.75rem', mt: 0.5 }} // Adjust font size and margin
                  >
                    {errors.gender.message}
                  </Typography>
                )}
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
                    value={field.value ? dayjs(field.value) : null} // Convert Date to Dayjs
                    onChange={(date: Dayjs | null) => {
                      const dateValue = date ? date.toDate() : null; // Convert Dayjs to Date or set to null
                      field.onChange(dateValue); // Update internal form state
                      setPersonal((prev) => ({
                        ...prev,
                        birthDate: dateValue, // Update parent state
                      }));
                    }}
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        error: !!errors.birthDate, // Highlight the field in error state
                        helperText: errors.birthDate?.message, // Display error message
                      },
                    }}
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
                <FormControl fullWidth error={!!errors.birthPlace}>
                  <Tooltip
                    title={errors.birthPlace?.message || ""}
                    open={!!errors.birthPlace}
                    arrow
                    slotProps={defaultTooltipProp}
                    placement="top-end"
                  >
                    <TextField
                      {...field}
                      label="Birth Place"
                      variant="outlined"
                      value={field.value}
                      onBlur={(e) => {
                        field.onBlur(); // Update the internal form state
                        debouncedSetPersonal({
                          birthPlace: e.target.value,
                        }); // Update the parent state
                      }}
                      error={!!errors.birthPlace}
                    />
                  </Tooltip>
                </FormControl>
              )}
            />
          </FormGrid>

          {/* Marital Status */}
          <FormGrid item xs={12} md={6}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth error={!!errors.maritalStatus}>
                <InputLabel id="marital-status-label">Marital Status</InputLabel>
                <Controller
                  name="maritalStatus"
                  control={control}
                  render={({ field }) => (
                    <Select
                      labelId="marital-status-label"
                      id="marital-status"
                      value={field.value || ''}
                      label="Marital Status"
                      onChange={(e) => {
                        field.onChange(e); // Update the internal form state
                        setPersonal((prev) => ({
                          ...prev,
                          maritalStatus: e.target.value,
                        })); // Update the parent state
                      }}
                      onBlur={field.onBlur} // Make sure blur is handled
                    >
                      <MenuItem value="single">Single</MenuItem>
                      <MenuItem value="married">Married</MenuItem>
                      <MenuItem value="divorced">Divorced</MenuItem>
                      <MenuItem value="widowed">Widowed</MenuItem>
                    </Select>
                  )}
                />
                {errors.maritalStatus && (
                  <Typography
                    color="error"
                    sx={{ fontSize: '0.75rem', mt: 0.5 }} // Adjust font size and margin
                  >
                    {errors.maritalStatus.message}
                  </Typography>
                )}              </FormControl>
            </Box>
          </FormGrid>


          {/* Religion */}
          <FormGrid item xs={12} md={6}>
            <Controller
              name="religion"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.religion}>
                  <Tooltip
                    title={errors.religion?.message || ""}
                    open={!!errors.religion}
                    arrow
                    slotProps={defaultTooltipProp}
                    placement="top-end"
                  >
                    <TextField
                      {...field}
                      label="Religion"
                      variant="outlined"
                      value={field.value}
                      onBlur={(e) => {
                        field.onBlur(); // Update the internal form state
                        debouncedSetPersonal({
                          religion: e.target.value,
                        }); // Update the parent state
                      }}
                      error={!!errors.religion}
                    />
                  </Tooltip>
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
                <FormControl fullWidth error={!!errors.country}>
                  <Tooltip
                    title={errors.country?.message || ""}
                    open={!!errors.country}
                    arrow
                    slotProps={defaultTooltipProp}
                    placement="top-end"
                  >
                    <TextField
                      {...field}
                      label="Country"
                      variant="outlined"
                      value={field.value}
                      onBlur={(e) => {
                        field.onBlur(); // Update the internal form state
                        debouncedSetPersonal({
                          country: e.target.value,
                        }); // Update the parent state
                      }}
                      error={!!errors.country}
                    />
                  </Tooltip>
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
                <FormControl fullWidth error={!!errors.citizenship}>
                  <Tooltip
                    title={errors.citizenship?.message || ""}
                    open={!!errors.citizenship}
                    arrow
                    slotProps={defaultTooltipProp}
                    placement="top-end"
                  >
                    <TextField
                      {...field}
                      label="Citizenship"
                      variant="outlined"
                      value={field.value}
                      onBlur={(e) => {
                        field.onBlur(); // Update the internal form state
                        debouncedSetPersonal({
                          citizenship: e.target.value,
                        }); // Update the parent state
                      }}
                      error={!!errors.citizenship}
                    />
                  </Tooltip>
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
                 <Tooltip
                    title={errors.acr?.message || ""}
                    open={!!errors.acr}
                    arrow
                    placement="top-end"
                  >
                    <TextField
                      {...field}
                      label="Acr (Optional)"
                      variant="outlined"
                      value={field.value}
                      onBlur={(e) => {
                        field.onBlur(); // Update the internal form state
                        debouncedSetPersonal({
                          acr: e.target.value,
                        }); // Update the parent state
                      }}
                      error={!!errors.acr}
                    />
                  </Tooltip>
                </FormControl>
              )}
            />
          </FormGrid>

          <Typography variant="h6">
            II. Address and Contact Information
          </Typography>

          {/* City Address */}
          <FormGrid item xs={12} md={10}>
            <Controller
              name="cityAddress"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.cityAddress}>
                  <Tooltip
                    title={errors.cityAddress?.message || ""}
                    open={!!errors.cityAddress}
                    arrow
                    placement="top-end"
                  >
                    <TextField
                      {...field}
                      label="City Address"
                      variant="outlined"
                      value={field.value}
                      onBlur={(e) => {
                        field.onBlur(); // Update the internal form state
                        debouncedSetPersonal({
                          cityAddress: e.target.value,
                        }); // Update the parent state
                      }}
                      error={!!errors.cityAddress}
                    />
                  </Tooltip>
                </FormControl>
              )}
            />
          </FormGrid>

          {/* Province Address */}
          <FormGrid item xs={12} md={10}>
            <Controller
              name="provinceAddress"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.provinceAddress}>
                  <Tooltip
                    title={errors.provinceAddress?.message || ""}
                    open={!!errors.provinceAddress}
                    arrow
                    placement="top-end"
                  >
                    <TextField
                      {...field}
                      label="Province Address (Optional)"
                      variant="outlined"
                      value={field.value}
                      onBlur={(e) => {
                        field.onBlur(); // Update the internal form state
                        debouncedSetPersonal({
                          provinceAddress: e.target.value,
                        }); // Update the parent state
                      }}
                      error={!!errors.provinceAddress}
                    />
                  </Tooltip>
                </FormControl>
              )}
            />
          </FormGrid>

          {/* Contact Number */}
          <FormGrid item xs={12} md={10}>
            <Controller
              name="contactNumber"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.contactNumber}>
                  <Tooltip
                    title={errors.contactNumber?.message || ""}
                    open={!!errors.contactNumber}
                    arrow
                    placement="top-end"
                  >
                    <TextField
                      {...field}
                      label="Contact Number"
                      variant="outlined"
                      value={field.value}
                      onBlur={(e) => {
                        field.onBlur(); // Update the internal form state
                        debouncedSetPersonal({
                          contactNumber: e.target.value,
                        }); // Update the parent state
                      }}
                      error={!!errors.contactNumber}
                    />
                  </Tooltip>
                </FormControl>
              )}
            />
          </FormGrid>

          {/* City Contact Number */}
          <FormGrid item xs={12} md={10}>
            <Controller
              name="cityContactNumber"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.cityContactNumber}>
                  <Tooltip
                    title={errors.cityContactNumber?.message || ""}
                    open={!!errors.cityContactNumber}
                    arrow
                    placement="top-end"
                  >
                    <TextField
                      {...field}
                      label="City Contact Number (Optional)"
                      variant="outlined"
                      value={field.value}
                      onBlur={(e) => {
                        field.onBlur(); // Update the internal form state
                        debouncedSetPersonal({
                          cityContactNumber: e.target.value,
                        }); // Update the parent state
                      }}
                      error={!!errors.cityContactNumber}
                    />
                  </Tooltip>
                </FormControl>
              )}
            />
          </FormGrid>

          {/* Province Contact Number */}
          <FormGrid item xs={12} md={10}>
            <Controller
              name="provinceContactNumber"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.provinceContactNumber}>
                  <Tooltip
                    title={errors.provinceContactNumber?.message || ""}
                    open={!!errors.provinceContactNumber}
                    arrow
                    placement="top-end"
                  >
                    <TextField
                      {...field}
                      label="Province Contact Number (Optional)"
                      variant="outlined"
                      value={field.value}
                      onBlur={(e) => {
                        field.onBlur(); // Update the internal form state
                        debouncedSetPersonal({
                          provinceContactNumber: e.target.value,
                        }); // Update the parent state
                      }}
                      error={!!errors.provinceContactNumber}
                    />
                  </Tooltip>
                </FormControl>
              )}
            />
          </FormGrid>

          {/* Email */}
          <FormGrid item xs={12} md={10}>
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.email}>
                  <Tooltip
                    title={errors.email?.message || ""}
                    open={!!errors.email}
                    arrow
                    placement="top-end"
                  >
                    <TextField
                      {...field}
                      label="Email"
                      variant="outlined"
                      value={field.value}
                      onBlur={(e) => {
                        field.onBlur(); // Update the internal form state
                        debouncedSetPersonal({
                          email: e.target.value,
                        }); // Update the parent state
                      }}
                      error={!!errors.email}
                    />
                  </Tooltip>
                </FormControl>
              )}
            />
          </FormGrid>
        </Grid>
      </form>
    </>
  );
}
