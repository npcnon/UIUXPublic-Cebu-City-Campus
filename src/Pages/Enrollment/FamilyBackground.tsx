  // Filename: FamilyBackground.tsx

  import { useCallback,useEffect, useMemo, useState} from 'react';
  import { Grid, TextField, FormControl, Box } from '@mui/material';
  import { styled } from '@mui/system';
  import { useForm, Controller, Resolver } from 'react-hook-form';
  import { debounce } from 'lodash';
  import { yupResolver } from '@hookform/resolvers/yup';
  import { FamilyBackgroundData } from '../../Types/FamilyBackgroundTypes/FamilyBackgroundType';
  import { useFamilyStore } from '../../stores/useFamilyStore';
  import CustomSectionDivider from './CustomSectionDivider';
  import { familyDataSchema } from '../../validations/familyDataValidation';
  import { FatherData } from '../../Types/FamilyBackgroundTypes/Modularization(only for v2)/FatherType';
  import { MotherData } from '../../Types/FamilyBackgroundTypes/Modularization(only for v2)/MotherType';
  import { GuardianData } from '../../Types/FamilyBackgroundTypes/Modularization(only for v2)/GuardianType';

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

  interface FamilyDataProps {
    onValidate: React.MutableRefObject<() => Promise<boolean>>;
  }

  export default function FamilyBackground({ onValidate }: FamilyDataProps) {
    const { familyBackground, setFamilyBackground } = useFamilyStore((state) => ({
      familyBackground: state.familyBackground,
      setFamilyBackground: state.setFamilyBackground,
    }));

    const debouncedSetFamilyBackground = useCallback(
      debounce((data: Partial<FamilyBackgroundData>) => {
        setFamilyBackground((prev) => ({
          ...prev,
          ...data,
        }));
      }, 100),
      [setFamilyBackground]
    );

    const [currentSchema, setCurrentSchema] = useState(familyDataSchema);

    useEffect(() => {
      if (/* your condition here, e.g., fatherFname is filled */) {
        setCurrentSchema(updatedSchema);  // Replace `updatedSchema` with the updated validation schema
      }
    }, [/* dependencies */]);
    
    const { control, formState: { errors }, trigger ,watch} = useForm<FamilyBackgroundData>({
      defaultValues: familyBackground,
      resolver: yupResolver(currentSchema) as Resolver<FamilyBackgroundData>,
      mode: 'onBlur',
      shouldUnregister: false,
    });

    const { control: fatherControl, formState: { errors: fatherErrors }, trigger: fatherTrigger, setResolver } = useForm<FatherData>({
      defaultValues: familyBackground,
      resolver: yupResolver(familyDataSchema) as Resolver<FamilyBackgroundData>,
      mode: 'onBlur',
      shouldUnregister: false,
    });


    const { control: gardianControl, formState: { errors: guardianErrors }, trigger: guardianTrigger } = useForm<GuardianData>({
      defaultValues: familyBackground,
      resolver: yupResolver(familyDataSchema) as Resolver<FamilyBackgroundData>,
      mode: 'onBlur',
      shouldUnregister: false,
    });


    const { control: motherControl, formState: { errors: motherErrors }, trigger: motherTrigger } = useForm<MotherData>({
      defaultValues: familyBackground,
      resolver: yupResolver(familyDataSchema) as Resolver<FamilyBackgroundData>,
      mode: 'onBlur',
      shouldUnregister: false,
    });

      // Watch all form fields
    const formValues = watch();

    // Memoized function to check if any field is filled
    const isAnyFieldFilled = useMemo(() => {
      return Object.values(formValues).some(value => value !== '' && value !== undefined);
    }, [formValues]);
    useEffect(() => {
      console.log('Is any field filled?', isAnyFieldFilled);
      // You can use the `isAnyFieldFilled` value for further logic here.
    }, [isAnyFieldFilled]);
  

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


    const renderTextField = (name: keyof FamilyBackgroundData, label: string, optional: boolean = false) => (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <FormControl fullWidth error={!!errors[name]}>
            <TextField
              {...field}
              label={label}
              helperText={errors[name] ? errors[name]?.message : optional ? 'Optional' : ''}
              variant="outlined"
              value={field.value || ''}
              onBlur={(e) => {
                field.onBlur();
                debouncedSetFamilyBackground({ [name]: e.target.value });
              }}
              autoComplete="off"
              error={!!errors[name]}
            />
          </FormControl>
        )}
      />
    );

    return (
      <>
        <StyledSection>
          <CustomSectionDivider title="I. Father's Information" />
          <StyledGrid container spacing={3}>
            <FormField item xs={12} md={6}>
              {renderTextField('fatherFname', "Father's First Name")}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('fatherMname', "Father's Middle Name", true)}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('fatherLname', "Father's Last Name")}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('fatherContactNumber', "Father's Contact Number")}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('fatherEmail', "Father's Email")}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('fatherOccupation', "Father's Occupation")}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('fatherIncome', "Father's Income")}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('fatherCompany', "Father's Company")}
            </FormField>
          </StyledGrid>
        </StyledSection>

        <StyledSection>
          <CustomSectionDivider title="II. Mother's Information" />
          <StyledGrid container spacing={3}>
            <FormField item xs={12} md={6}>
              {renderTextField('motherFname', "Mother's First Name")}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('motherMname', "Mother's Middle Name", true)}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('motherLname', "Mother's Last Name")}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('motherContactNumber', "Mother's Contact Number")}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('motherEmail', "Mother's Email")}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('motherOccupation', "Mother's Occupation")}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('motherIncome', "Mother's Income")}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('motherCompany', "Mother's Company")}
            </FormField>
          </StyledGrid>
        </StyledSection>

        <StyledSection>
          <CustomSectionDivider title="III. Guardian's Information" />
          <StyledGrid container spacing={3}>
            <FormField item xs={12} md={6}>
              {renderTextField('guardianFname', "Guardian's First Name")}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('guardianMname', "Guardian's Middle Name", true)}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('guardianLname', "Guardian's Last Name")}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('guardianRelation', "Guardian's Relation")}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('guardianContactNumber', "Guardian's Contact Number")}
            </FormField>
            <FormField item xs={12} md={6}>
              {renderTextField('guardianEmail', "Guardian's Email")}
            </FormField>
          </StyledGrid>
        </StyledSection>
      </>
    );
  }
