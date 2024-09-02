import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

interface YearPickerProps {
  label: string;
  value: number | null;
  onChange: (year: number) => void;
}

const YearPicker: React.FC<YearPickerProps> = ({ label, value, onChange }) => {
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

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

  return (
    <div>
      <TextField
        label={label}
        value={value || ''}
        onClick={handleClick}
        
        InputProps={{
          readOnly: true,
        }}
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
        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
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