// Filename: AcademicHist.tsx

import React, { useCallback, useEffect } from "react";
import { Grid, TextField, FormControl, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useForm, Controller, Resolver } from 'react-hook-form';
import { debounce } from "lodash";
import { useAcHistStore } from '../../stores/useAcHistStore';
import { AcHistData } from '../../Types/AcHistTypes/AcHistType';
import CustomSectionDivider from './CustomSectionDivider';
import YearPicker from './yearpicker';
import { academichistDataSchema } from "../../validations/academichistDataValidation";
import { yupResolver } from "@hookform/resolvers/yup";

const StyledSection = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  marginTop: theme.spacing(6),
}));

const StyledGrid = styled(Grid)(({ theme }) => ({
  '& .MuiGrid-item': {
    paddingBottom: theme.spacing(3),
  },
}));

const FormField = styled(Grid)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

interface AcademicHistDataProps {
  onValidate: React.MutableRefObject<() => Promise<boolean>>;
}

export default function AcademicHist({ onValidate }: AcademicHistDataProps) {
  const { acHist, setAcHist } = useAcHistStore((state) => ({
    acHist: state.acHist,
    setAcHist: state.setAcHist,
  }));

  const debouncedSetAcHist = useCallback(
    debounce((data: Partial<AcHistData>) => {
      setAcHist((prev) => ({
        ...prev,
        ...data,
      }));
    }, 100),
    [setAcHist]
  );

  const { control, formState: { errors }, trigger } = useForm<AcHistData>({
    defaultValues: acHist,
    resolver: yupResolver(academichistDataSchema) as Resolver<AcHistData>,
    mode: 'all',
    shouldUnregister: false,
  });

  const renderTextField = (name: keyof AcHistData, label: string, optional: boolean = false) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth error={!!errors[name]}>
          <TextField
            {...field}
            label={label}
            helperText={optional ? 'Optional' : errors[name]?.message || ''}
            variant="outlined"
            value={field.value || ''}
            onBlur={(e) => {
              field.onBlur();
              debouncedSetAcHist({ [name]: e.target.value });
            }}
            onChange={(e) => {
              field.onChange(e);
              debouncedSetAcHist({ [name]: e.target.value });
            }}
            autoComplete="off"
            error={!!errors[name]}
          />
        </FormControl>
      )}
    />
  );

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

  return (
    <form>
      <StyledSection>
        <CustomSectionDivider title="Elementary School Information" />
        <StyledGrid container spacing={3}>
          <FormField item xs={12} md={6}>
            {renderTextField('elementarySchool', 'Elementary School')}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('elementaryAddress', 'Elementary School Address')}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('elementaryHonors', 'Elementary School Honors', true)}
          </FormField>
          <FormField item xs={12} md={6}>
            <Controller
              name="elementaryGraduate"
              control={control}
              render={({ field, fieldState }) => (
                <YearPicker
                  label="Elementary Year Graduate"
                  value={field.value}
                  onChange={(year: number) => {
                    field.onChange(year);
                    setAcHist((prev) => ({
                      ...prev,
                      elementaryGraduate: year,
                    }));
                  }}
                  error={fieldState.error}
                />
              )}
            />
          </FormField>
        </StyledGrid>
      </StyledSection>

      <StyledSection>
        <CustomSectionDivider title="Junior High School Information" />
        <StyledGrid container spacing={3}>
          <FormField item xs={12} md={6}>
            {renderTextField('juniorHighschool', 'Junior High School')}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('juniorAddress', 'Junior High School Address')}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('juniorHonors', 'Junior High School Honors', true)}
          </FormField>
          <FormField item xs={12} md={6}>
            <Controller
              name="juniorGraduate"
              control={control}
              render={({ field, fieldState }) => (
                <YearPicker
                  label="Junior High Year Graduate"
                  value={field.value}
                  onChange={(year: number) => {
                    field.onChange(year);
                    setAcHist((prev) => ({
                      ...prev,
                      juniorGraduate: year,
                    }));
                  }}
                  error={fieldState.error}
                />
              )}
            />
          </FormField>
        </StyledGrid>
      </StyledSection>

      <StyledSection>
        <CustomSectionDivider title="Senior High School Information" />
        <StyledGrid container spacing={3}>
          <FormField item xs={12} md={6}>
            {renderTextField('seniorHighschool', 'Senior High School')}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('seniorAddress', 'Senior High School Address')}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('seniorHonors', 'Senior High School Honors', true)}
          </FormField>
          <FormField item xs={12} md={6}>
            <Controller
              name="seniorGraduate"
              control={control}
              render={({ field, fieldState }) => (
                <YearPicker
                  label="Senior High Year Graduate"
                  value={field.value}
                  onChange={(year: number) => {
                    field.onChange(year);
                    setAcHist((prev) => ({
                      ...prev,
                      seniorGraduate: year,
                    }));
                  }}
                  error={fieldState.error}
                />
              )}
            />
          </FormField>
        </StyledGrid>
      </StyledSection>

      <StyledSection>
        <CustomSectionDivider title="NCAE Information" />
        <StyledGrid container spacing={3}>
          <FormField item xs={12} md={6}>
            {renderTextField('ncaeGrade', 'NCAE Grade', true)}
          </FormField>
          <FormField item xs={12} md={6}>
            <Controller
              name="ncaeYearTaken"
              control={control}
              render={({ field, fieldState }) => (
                <YearPicker
                  label="NCAE Year Taken"
                  value={field.value}
                  onChange={(year: number) => {
                    field.onChange(year);
                    setAcHist((prev) => ({
                      ...prev,
                      ncaeYearTaken: year,
                    }));
                  }}
                  error={fieldState.error}
                  helperText="Optional"
                  showOptional={true}
                />
              )}
            />
          </FormField>
        </StyledGrid>
      </StyledSection>

      <StyledSection>
        <CustomSectionDivider title="College Information" />
        <StyledGrid container spacing={3}>
          <FormField item xs={12} md={6}>
            {renderTextField('latestCollege', 'Latest College', true)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('collegeAddress', 'College Address', true)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('collegeHonors', 'College Honors', true)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('course', 'Course', true)}
          </FormField>
        </StyledGrid>
      </StyledSection>
    </form>
  );
}
