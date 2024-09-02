// Filename: FamilyBackground.tsx

import { useCallback, useEffect, useState } from 'react';
import { Grid, TextField, FormControl, Box } from '@mui/material';
import { styled } from '@mui/system';
import { useForm, Controller, Resolver, } from 'react-hook-form';
import { debounce } from 'lodash';
import { yupResolver } from '@hookform/resolvers/yup';
import { FamilyBackgroundData } from '../../Types/FamilyBackgroundTypes/FamilyBackgroundType';
import { useFamilyStore } from '../../stores/useFamilyStore';
import CustomSectionDivider from './CustomSectionDivider';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import { FatherData } from '../../Types/FamilyBackgroundTypes/Modularization(only for v2)/FatherType';
import { MotherData } from '../../Types/FamilyBackgroundTypes/Modularization(only for v2)/MotherType';
import { GuardianData } from '../../Types/FamilyBackgroundTypes/Modularization(only for v2)/GuardianType';
import { fatherDataSchema } from '../../validations/fatherDataValidation/fatherDatavalidation';
import { fatherInitialDataSchema } from '../../validations/fatherDataValidation/fatherinitialDataValidation';
import { motherDataSchema } from '../../validations/motherDataValidation/motherDatavalidation';
import { motherInitialDataSchema } from '../../validations/motherDataValidation/motherinitialDataValidation';
import { guardianDataSchema } from '../../validations/guardianDataValidation/guardianDataValidation';
import { guardianInitialDataSchema } from '../../validations/guardianDataValidation/guardianinitialDataValidation';


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
    }, 300),
    [setFamilyBackground]
  );

  const [currentFatherSchema, setCurrentFatherSchema] = useState(fatherInitialDataSchema);
  const [currentMotherSchema, setCurrentMotherSchema] = useState(motherInitialDataSchema);
  const [currentGuardianSchema, setCurrentGuardianSchema] = useState(guardianInitialDataSchema);
  const [openModal, setOpenModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  

 

  
  useEffect(() => {
    const familystate = useFamilyStore.getState().familyBackground;
    const fatherDependency = [
      familystate.fatherFname,
      familystate.fatherMname,
      familystate.fatherLname,
      familystate.fatherContactNumber,
      familystate.fatherEmail,
      familystate.fatherOccupation,
      familystate.fatherIncome,
      familystate.fatherCompany,
    ];
  
    const motherDependency = [
      familystate.motherFname,
      familystate.motherMname,
      familystate.motherLname,
      familystate.motherContactNumber,
      familystate.motherEmail,
      familystate.motherOccupation,
      familystate.motherIncome,
      familystate.motherCompany,
    ];
    
  
    const guardianDependency = [
      familystate.guardianFname,
      familystate.guardianMname,
      familystate.guardianLname,
      familystate.guardianContactNumber,
      familystate.guardianEmail,
    ];
  
    console.log("changing schema's")
    const fatherHasChanges = fatherDependency.some(dependency => 
      dependency !== null && dependency !== '' && dependency !== undefined
    );
    const motherHasChanges = motherDependency.some(dependency => 
      dependency !== null && dependency !== '' && dependency !== undefined
    );
    const guardianHasChanges = guardianDependency.some(dependency => 
      dependency !== null && dependency !== '' && dependency !== undefined
    );

    if (fatherHasChanges) {
      console.log("changing fatherschema to strict mode")
      setCurrentFatherSchema(fatherDataSchema)
    }
    else{
      console.log("changing fatherschema to initial mode")
      setCurrentFatherSchema(fatherInitialDataSchema)
    }

    if (motherHasChanges) {
      console.log("changing motherschema to strict mode")
      setCurrentMotherSchema(motherDataSchema)
    }
    else{
      console.log("changing motherschema to initial mode")
      setCurrentMotherSchema(motherInitialDataSchema)
    }
    if (guardianHasChanges) {
      console.log("changing guardianschema to strict mode")
      setCurrentGuardianSchema(guardianDataSchema)
    }
    else{
      console.log("changing guardianschema to initial mode")
      setCurrentGuardianSchema(guardianInitialDataSchema)
    }

  }, [familyBackground, onValidate]);




  
  const { control: fatherControl, formState: { errors: fatherErrors }, trigger: fatherTrigger } = useForm<FatherData>({
    defaultValues: familyBackground,
    resolver: yupResolver(currentFatherSchema) as Resolver<FatherData>,
    mode: 'all',
    shouldUnregister: false,
  });

  const { control: guardianControl, formState: { errors: guardianErrors }, trigger: guardianTrigger } = useForm<GuardianData>({
    defaultValues: familyBackground,
    resolver: yupResolver(currentGuardianSchema) as Resolver<GuardianData>,
    mode: 'all',
    shouldUnregister: false,
  });

  const { control: motherControl, formState: { errors: motherErrors }, trigger: motherTrigger } = useForm<MotherData>({
    defaultValues: familyBackground,
    resolver: yupResolver(currentMotherSchema) as Resolver<MotherData>,
    mode: 'all',
    shouldUnregister: false,
  });

  useEffect(() => {
    onValidate.current = async () => {
      const familystate = await useFamilyStore.getState().familyBackground;
      // Trigger validation for each form
      const fatherDependency = [
        familystate.fatherFname,
        familystate.fatherMname,
        familystate.fatherLname,
        familystate.fatherContactNumber,
        familystate.fatherEmail,
        familystate.fatherOccupation,
        familystate.fatherIncome,
        familystate.fatherCompany,
      ];
    
      const motherDependency = [
        familystate.motherFname,
        familystate.motherMname,
        familystate.motherLname,
        familystate.motherContactNumber,
        familystate.motherEmail,
        familystate.motherOccupation,
        familystate.motherIncome,
        familystate.motherCompany,
      ];
      
    
      const guardianDependency = [
        familystate.guardianFname,
        familystate.guardianMname,
        familystate.guardianLname,
        familystate.guardianContactNumber,
        familystate.guardianEmail,
      ];
      const hasFilledFather = fatherDependency.some(dependency =>
        dependency !== null && dependency !== '' && dependency !== undefined
      );
  
      const hasFilledMother = motherDependency.some(dependency =>
        dependency !== null && dependency !== '' && dependency !== undefined
      );
  
      const hasFilledGuardian = guardianDependency.some(dependency =>
        dependency !== null && dependency !== '' && dependency !== undefined
      );
  
      if (hasFilledFather) {
        console.log("changing fatherschema to strict mode");
        setCurrentFatherSchema(fatherDataSchema);
      } else {
        console.log("changing fatherschema to initial mode");
        setCurrentFatherSchema(fatherInitialDataSchema);
      }
  
      if (hasFilledMother) {
        console.log("changing motherschema to strict mode");
        setCurrentMotherSchema(motherDataSchema);
      } else {
        console.log("changing motherschema to initial mode");
        setCurrentMotherSchema(motherInitialDataSchema);
      }
  
      if (hasFilledGuardian) {
        console.log("changing guardianschema to strict mode");
        setCurrentGuardianSchema(guardianDataSchema);
      } else {
        console.log("changing guardianschema to initial mode");
        setCurrentGuardianSchema(guardianInitialDataSchema);
      }
  
      const [isValidFather, isValidMother, isValidGuardian] = await Promise.all([
        fatherTrigger(undefined, { shouldFocus: true }), // Father Data
        motherTrigger(undefined, { shouldFocus: true }), // Mother Data
        guardianTrigger(undefined, { shouldFocus: true }) // Guardian Data
      ]);
      
      //Ensure at least one section is filled
      if (!hasFilledFather && !hasFilledMother && !hasFilledGuardian) {

        setModalMessage(`At least one section must be filled out`);
        setOpenModal(true);
        return false;
      }
  
      console.log("Father validation result:", isValidFather);
      if (!isValidFather) {
        console.log("Father Validation errors:", fatherErrors);
      }
  
      console.log("Mother validation result:", isValidMother);
      if (!isValidMother) {
        console.log("Mother Validation errors:", motherErrors);
      }
  
      console.log("Guardian validation result:", isValidGuardian);
      if (!isValidGuardian) {
        console.log("Guardian Validation errors:", guardianErrors);
      }
      console.log(`will return: ${isValidFather && isValidMother && isValidGuardian}`)
      return isValidFather && isValidMother && isValidGuardian;
    };
  }, [fatherTrigger, motherTrigger, guardianTrigger, onValidate, fatherErrors, motherErrors, guardianErrors]);
      

  const renderTextField = (name: keyof FamilyBackgroundData, label: string, control: any, errors: any, optional: boolean = false) => (
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
            onChange={(e) => {
              field.onChange(e);
              debouncedSetFamilyBackground({ [name]: e.target.value });
            }}
            autoComplete="off"
            error={!!errors[name]}
          />
        </FormControl>
      )}
    />
  );

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Dialog open={openModal} onClose={handleCloseModal}>
          <DialogTitle>Validation Error</DialogTitle>
          <DialogContent>
            <p>{modalMessage}</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>OK</Button>
          </DialogActions>
        </Dialog>
      <StyledSection>
        <CustomSectionDivider title="I. Father's Information" />
        <StyledGrid container spacing={3}>
          <FormField item xs={12} md={6}>
            {renderTextField('fatherFname', "Father's First Name", fatherControl, fatherErrors)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('fatherMname', "Father's Middle Name", fatherControl, fatherErrors, true)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('fatherLname', "Father's Last Name", fatherControl, fatherErrors)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('fatherContactNumber', "Father's Contact Number", fatherControl, fatherErrors)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('fatherEmail', "Father's Email", fatherControl, fatherErrors)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('fatherOccupation', "Father's Occupation", fatherControl, fatherErrors)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('fatherIncome', "Father's Income", fatherControl, fatherErrors)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('fatherCompany', "Father's Company", fatherControl, fatherErrors)}
          </FormField>
        </StyledGrid>
      </StyledSection>

      <StyledSection>
        <CustomSectionDivider title="II. Mother's Information" />
        <StyledGrid container spacing={3}>
          <FormField item xs={12} md={6}>
            {renderTextField('motherFname', "Mother's First Name", motherControl, motherErrors)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('motherMname', "Mother's Middle Name", motherControl, motherErrors, true)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('motherLname', "Mother's Last Name", motherControl, motherErrors)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('motherContactNumber', "Mother's Contact Number", motherControl, motherErrors)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('motherEmail', "Mother's Email", motherControl, motherErrors)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('motherOccupation', "Mother's Occupation", motherControl, motherErrors)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('motherIncome', "Mother's Income", motherControl, motherErrors)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('motherCompany', "Mother's Company", motherControl, motherErrors)}
          </FormField>
        </StyledGrid>
      </StyledSection>

      <StyledSection>
        <CustomSectionDivider title="III. Guardian's Information" />
        <StyledGrid container spacing={3}>
          <FormField item xs={12} md={6}>
            {renderTextField('guardianFname', "Guardian's First Name", guardianControl, guardianErrors)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('guardianMname', "Guardian's Middle Name", guardianControl, guardianErrors, true)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('guardianLname', "Guardian's Last Name", guardianControl, guardianErrors)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('guardianRelation', "Guardian's Relation", guardianControl, guardianErrors)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('guardianContactNumber', "Guardian's Contact Number", guardianControl, guardianErrors)}
          </FormField>
          <FormField item xs={12} md={6}>
            {renderTextField('guardianEmail', "Guardian's Email", guardianControl, guardianErrors)}
          </FormField>
        </StyledGrid>
      </StyledSection>
    </>
  );
}
