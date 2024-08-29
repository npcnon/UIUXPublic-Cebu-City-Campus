import React from 'react';
import { Box, Typography, Divider } from '@mui/material';
import { styled } from '@mui/system';

const DividerContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  margin: theme.spacing(4, 0),
}));

const StyledDivider = styled(Divider)(({  }) => ({
  flexGrow: 1,
  borderStyle: 'dotted',
  borderWidth: '2px',
  borderColor: "#bdbdbd",
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  padding: theme.spacing(0, 2),
  color: "#6c757d",
  fontWeight: 'bold',
}));

interface CustomSectionDividerProps {
  title: string;
}

const CustomSectionDivider: React.FC<CustomSectionDividerProps> = ({ title }) => {
  return (
    <DividerContainer>
      <StyledDivider />
      <SectionTitle variant="h6">{title}</SectionTitle>
      <StyledDivider />
    </DividerContainer>
  );
};

export default CustomSectionDivider;