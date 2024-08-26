// familybackground.tsx

import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { useForm, Controller } from 'react-hook-form';
import { FamilyBackgroundData } from '../../Types/FamilyBackgroundTypes/FamilyBackgroundType';
import { useFamilyStore } from '../../stores/useFamilyStore';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

export default function FamilyBackground() {
  const { familyBackground, setFamilyBackground } = useFamilyStore((state) => ({
    familyBackground: state.familyBackground,
    setFamilyBackground: state.setFamilyBackground,
  }));

  const { control, handleSubmit } = useForm<FamilyBackgroundData>({
    defaultValues: familyBackground,
  });

  const onSubmit = (formData: FamilyBackgroundData) => {
    setFamilyBackground(formData);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom sx={{ mb: 2, mt: 3 }}>
        I. Father's Information
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          {/* Father's Information */}
          <FormGrid item xs={12} md={6}>
            <Controller
              name="fatherFname"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Father's First Name"
                    variant="outlined"
                    required
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setFamilyBackground((prev) => ({
                        ...prev,
                        fatherFname: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="fatherMname"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Father's Middle Name"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setFamilyBackground((prev) => ({
                        ...prev,
                        fatherMname: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="fatherLname"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Father's Last Name"
                    variant="outlined"
                    required
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setFamilyBackground((prev) => ({
                        ...prev,
                        fatherLname: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="fatherContactNumber"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Father's Contact Number"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setFamilyBackground((prev) => ({
                        ...prev,
                        fatherContactNumber: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="fatherEmail"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Father's Email"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setFamilyBackground((prev) => ({
                        ...prev,
                        fatherEmail: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="fatherOccupation"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Father's Occupation"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setFamilyBackground((prev) => ({
                        ...prev,
                        fatherOccupation: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="fatherIncome"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Father's Income"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setFamilyBackground((prev) => ({
                        ...prev,
                        fatherIncome: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="fatherCompany"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Father's Company"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setFamilyBackground((prev) => ({
                        ...prev,
                        fatherCompany: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          {/* Mother's Information */}
          <Typography variant="h6" gutterBottom sx={{ mb: 2, mt: 3 }}>
            II. Mother's Information
          </Typography>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="motherFname"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Mother's First Name"
                    variant="outlined"
                    required
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setFamilyBackground((prev) => ({
                        ...prev,
                        motherFname: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="motherMname"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Mother's Middle Name"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setFamilyBackground((prev) => ({
                        ...prev,
                        motherMname: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="motherLname"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Mother's Last Name"
                    variant="outlined"
                    required
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setFamilyBackground((prev) => ({
                        ...prev,
                        motherLname: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="motherContactNumber"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Mother's Contact Number"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setFamilyBackground((prev) => ({
                        ...prev,
                        motherContactNumber: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="motherEmail"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Mother's Email"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setFamilyBackground((prev) => ({
                        ...prev,
                        motherEmail: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="motherOccupation"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Mother's Occupation"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setFamilyBackground((prev) => ({
                        ...prev,
                        motherOccupation: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="motherIncome"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Mother's Income"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setFamilyBackground((prev) => ({
                        ...prev,
                        motherIncome: e.target.value,
                      })); // Update the parent state
                    }}
                  />
                </FormControl>
              )}
            />
          </FormGrid>

          <FormGrid item xs={12} md={6}>
            <Controller
              name="motherCompany"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    label="Mother's Company"
                    variant="outlined"
                    value={field.value}
                    onChange={(e) => {
                      field.onChange(e); // Update the internal form state
                      setFamilyBackground((prev) => ({
                        ...prev,
                        motherCompany: e.target.value,
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
