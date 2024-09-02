// Filename: YearPicker.tsx

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { FieldError } from 'react-hook-form';

interface YearPickerProps {
  label: string;
  value: number | null | undefined;
  onChange: (year: number) => void;
  error?: FieldError;
  minYear?: number;
  maxYear?: number;
  helperText?: string;
  showOptional?: boolean; // Added prop to show "Optional"
}

const YearPicker: React.FC<YearPickerProps> = ({ 
  label, 
  value, 
  onChange, 
  error, 
  minYear = 1900, 
  maxYear = new Date().getFullYear() + 10,
  helperText,
  showOptional = false // Default to showing optional text
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleYearSelect = (year: number) => {
    onChange(year);
    handleClose();
  };

  const open = Boolean(anchorEl);
  const id = open ? 'year-popover' : undefined;

  const years = Array.from(
    { length: maxYear - minYear + 1 }, 
    (_, i) => maxYear - i
  );

  return (
    <div>
      <TextField
        label={label}
        value={value || ''}
        onClick={handleClick}
        InputProps={{
          readOnly: true,
        }}
        error={!!error}
        helperText={error ? error.message : (showOptional ? 'Optional' : helperText)}
      />
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        disableScrollLock={true}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', maxHeight: 300, overflow: 'auto' }}>
          {years.map((year) => (
            <ListItem key={year} disablePadding>
              <ListItemButton onClick={() => handleYearSelect(year)}>
                <ListItemText primary={year} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Popover>
    </div>
  );
};

export default YearPicker;
