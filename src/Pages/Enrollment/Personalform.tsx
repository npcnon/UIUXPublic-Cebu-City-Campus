//filename: Pesonalform.tsx

import React, { useCallback, useEffect, useState } from 'react';
import { Grid, TextField, FormControl, Typography, Select, MenuItem, InputLabel, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useForm, Controller, Resolver } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { debounce } from 'lodash';
import { usePersonalStore } from '../../stores/usePersonalStore';
import { Personal } from '../../Types/PersonalDataTypes/PersonalDataTypes';
import { yupResolver } from '@hookform/resolvers/yup';
import { personalDataSchema } from '../../validations/personalDataValidation';
import Tooltip from '@mui/material/Tooltip';
import { Zoom } from '@mui/material';
import Divider from '@mui/material/Divider';

const StyledSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(6),
}));

const CustomDivider = styled(Divider)(({  }) => ({
  height: 2, // Thickness of the divider
  backgroundColor: "#b8b5b5", // Color of the divider
}));

const StyledSectionTitle = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  fontWeight: 'bold',
  color: "#909090", 
}));


const StyledGrid = styled(Grid)(({ theme }) => ({
  '& .MuiGrid-item': {
    paddingBottom: theme.spacing(3), // Bottom padding only
  },
}));


const FormField = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

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

interface PersonalDataProps {
  onValidate: React.MutableRefObject<() => Promise<boolean>>;
}

export default function PersonalData({ onValidate }: PersonalDataProps) {
  const { personal, setPersonal } = usePersonalStore((state) => ({
    personal: state.personal,
    setPersonal: state.setPersonal
  }));

  const [isBackspaceHeld, setIsBackspaceHeld] = useState(false);

  const debouncedSetPersonal = useCallback(
    debounce((data: Partial<Personal>) => {
      setPersonal((prev) => ({ ...prev, ...data }));
    }, 100),
    [setPersonal]
  );

  const { control, formState: { errors }, trigger } = useForm<Personal>({
    defaultValues: personal,
    resolver: yupResolver(personalDataSchema) as Resolver<Personal>,
    mode: 'onBlur',
    shouldUnregister: false,
  });

  useEffect(() => {
    onValidate.current = async () => {
      const isValid = await trigger(undefined, { shouldFocus: true });
      console.log("validation is triggered");
      console.log("Validation result:", isValid);
  
      if (!isValid) {
        console.log("Validation errors:", errors);
      }
  
      return isValid;
    };
  }, [trigger, onValidate, errors]);
 


  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        setIsBackspaceHeld(true);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        setIsBackspaceHeld(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);



  const renderTextField = (name: keyof Personal, label: string, optional: boolean = false) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth error={!!errors[name]}>
          <Tooltip
            title={errors[name]?.message || ""}
            open={!!errors[name]}
            arrow
            TransitionComponent={Zoom}
            slotProps={defaultTooltipProp}
            placement="top-end"
          >
            <TextField
              {...field}
              label={`${label}`}
              helperText={`${optional ? ' Optional' : ''}`}
              variant="standard"
              value={field.value || ''}

              onBlur={(e) => {
                field.onBlur();
                debouncedSetPersonal({ [name]: e.target.value });
              }}
              error={!!errors[name]}
            />
          </Tooltip>
        </FormControl>
      )}
    />
  );

  return (
    <form>
      <CustomDivider />
      <StyledSection>
        <StyledSectionTitle variant="h5">
          Personal Information
        </StyledSectionTitle>
        <StyledGrid container spacing={3} >
          <FormField item xs={12} md={5}>
            {renderTextField('firstName', 'First Name')}
          </FormField>
        </StyledGrid>
        <StyledGrid container spacing={3} >
        <FormField item xs={12} md={3.5}>
            {renderTextField('middleName', 'Middle Initial', true)}
          </FormField>

          
        </StyledGrid>
          <FormField item xs={12} md={4.8} >
            {renderTextField('lastName', 'Last Name')}
          </FormField>
        <StyledGrid container spacing={3}>

          <FormField item xs={12} md={3}>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={!!errors.gender}     variant="standard">
                    <InputLabel id="gender-label">Sex</InputLabel>
                    <Select
                      {...field}
                      labelId="gender-label"
                      label="Sex"

                      MenuProps={{ disableScrollLock: true }}
                      onChange={(e) => {
                        field.onChange(e);
                        setPersonal((prev) => ({ ...prev, gender: e.target.value }));
                      }}
                    >
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                    {errors.gender && (
                      <Typography color="error" variant="caption">
                        {errors.gender.message}
                      </Typography>
                    )}
                  </FormControl>
                )}
              />
            </FormField>
            <FormField item xs={12} md={3}>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    {...field}
                    label="Birth Date"
                    value={field.value ? dayjs(field.value) : null}
                    onChange={(date) => {
                      const dateValue = date ? date.toDate() : null;
                      field.onChange(dateValue);
                      field.onBlur()
                      setPersonal((prev) => ({ ...prev, birthDate: dateValue }));
                    }}
                    slotProps={{
                      textField: {
                        variant: 'outlined',
                        fullWidth: true,
                        error: !!errors.birthDate,
                        helperText: errors.birthDate?.message,
                      },
                    }}
                  />
                </LocalizationProvider>
              )}
            />
          </FormField>

          <FormField item xs={12} md={6}>
            {renderTextField('birthPlace', 'Birth Place')}
          </FormField>

        </StyledGrid>
          
          

          

          
          <FormField item xs={12} md={4}>
            <Controller
              name="maritalStatus"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.maritalStatus}>
                  <InputLabel id="marital-status-label">Marital Status</InputLabel>
                  <Select
                    {...field}
                    labelId="marital-status-label"
                    label="Marital Status"
                    MenuProps={{ disableScrollLock: true }}
                    onChange={(e) => {
                      field.onChange(e);
                      setPersonal((prev) => ({ ...prev, maritalStatus: e.target.value }));
                    }}
                  >
                    <MenuItem value="single">Single</MenuItem>
                    <MenuItem value="married">Married</MenuItem>
                    <MenuItem value="divorced">Divorced</MenuItem>
                    <MenuItem value="widowed">Widowed</MenuItem>
                  </Select>
                  {errors.maritalStatus && (
                    <Typography color="error" variant="caption">
                      {errors.maritalStatus.message}
                    </Typography>
                  )}
                </FormControl>
              )}
            />
          </FormField>
          
          <FormField item xs={12} md={4}>
            {renderTextField('religion', 'Religion')}
          </FormField>
          
          <FormField item xs={12} md={4}>
            {renderTextField('country', 'Country')}
          </FormField>
          
          <FormField item xs={12} md={6}>
            {renderTextField('citizenship', 'Citizenship')}
          </FormField>
          
          <FormField item xs={12} md={6}>
            {renderTextField('acr', 'ACR', true)}
          </FormField>
        
      </StyledSection>

      <Divider />
      
      <StyledSection>
        <StyledSectionTitle variant="h5">
          Address and Contact Information
        </StyledSectionTitle>
        <Grid container spacing={3}>
          <FormField item xs={12}>
            {renderTextField('cityAddress', 'City Address')}
          </FormField>
          
          <FormField item xs={12}>
            {renderTextField('provinceAddress', 'Province Address', true)}
          </FormField>
          
          <FormField item xs={12} md={4}>
            {renderTextField('contactNumber', 'Contact Number')}
          </FormField>
          
          <FormField item xs={12} md={4}>
            {renderTextField('cityContactNumber', 'City Contact Number', true)}
          </FormField>
          
          <FormField item xs={12} md={4}>
            {renderTextField('provinceContactNumber', 'Province Contact Number', true)}
          </FormField>
          
          <FormField item xs={12}>
            {renderTextField('email', 'Email')}
          </FormField>
        </Grid>
      </StyledSection>
    </form>
  );
}