import * as React from 'react';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/system';

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const FormGrid = styled(Grid)(() => ({
  display: 'flex',
  flexDirection: 'column',
  
}));

export default function Review() {
  const [age, setAge] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (

    <Grid container spacing={3}>
      <FormGrid item xs={12} md={6}>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Course</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Select Course"
          onChange={handleChange}
        >
          <MenuItem value={1}>BSIT</MenuItem>
          <MenuItem value={2}>BSTM</MenuItem>
          <MenuItem value={3}>BMMA</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </FormGrid>

    <FormGrid item xs={12} md={6}>
      <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Select Major</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Select Course"
          onChange={handleChange}
        >
          <MenuItem value={1}>BSIT</MenuItem>
          <MenuItem value={2}>BSTM</MenuItem>
          <MenuItem value={3}>BMMA</MenuItem>
        </Select>
      </FormControl>
    </Box>
    </FormGrid>
    
    <FormGrid item xs={12}>
      <FormLabel htmlFor="address1" required>
        Address line 1
      </FormLabel>
      <OutlinedInput
        id="address1"
        name="address1"
        type="address1"
        placeholder="Street name and number"
        autoComplete="shipping address-line1"
        required
      />
    </FormGrid>
    <FormGrid item xs={12}>
      <FormLabel htmlFor="address2">Address line 2</FormLabel>
      <OutlinedInput
        id="address2"
        name="address2"
        type="address2"
        placeholder="Apartment, suite, unit, etc. (optional)"
        autoComplete="shipping address-line2"
        required
      />
    </FormGrid>
    <FormGrid item xs={6}>
      <FormLabel htmlFor="city" required>
        City
      </FormLabel>
      <OutlinedInput
        id="city"
        name="city"
        type="city"
        placeholder="New York"
        autoComplete="City"
        required
      />
    </FormGrid>
    <FormGrid item xs={6}>
      <FormLabel htmlFor="state" required>
        State
      </FormLabel>
      <OutlinedInput
        id="state"
        name="state"
        type="state"
        placeholder="NY"
        autoComplete="State"
        required
      />
    </FormGrid>
    <FormGrid item xs={6}>
      <FormLabel htmlFor="zip" required>
        Zip / Postal code
      </FormLabel>
      <OutlinedInput
        id="zip"
        name="zip"
        type="zip"
        placeholder="12345"
        autoComplete="shipping postal-code"
        required
      />
    </FormGrid>
    <FormGrid item xs={6}>
      <FormLabel htmlFor="country" required>
        Country
      </FormLabel>
      <OutlinedInput
        id="country"
        name="country"
        type="country"
        placeholder="United States"
        autoComplete="shipping country"
        required
      />
    </FormGrid>
    <FormGrid item xs={12}>
      <FormControlLabel
        control={<Checkbox name="saveAddress" value="yes" />}
        label="Use this address for payment details"
      />
    </FormGrid>
  </Grid>
);
}
