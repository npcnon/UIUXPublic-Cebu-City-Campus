import * as React from 'react';
import { Controller } from 'react-hook-form';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { FormControl, InputLabel, TextField } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

interface YearPickerProps {
  name: string;
  label: string;
  control: any;
}

const YearPicker: React.FC<YearPickerProps> = ({ name, label, control }) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <FormControl fullWidth>
      <InputLabel id={`${name}-label`}>{label}</InputLabel>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            views={['year']}
            label={label}
            value={field.value ? dayjs(field.value) : null}
            onChange={(date: Dayjs | null) => field.onChange(date?.year().toString() || '')}
            slotProps={{
              textField: {
                variant: 'outlined',
                fullWidth: true,
                InputLabelProps: {
                  shrink: true,
                },
              },
            }}
          />
        )}
      />
    </FormControl>
  </LocalizationProvider>
);

export default YearPicker;
