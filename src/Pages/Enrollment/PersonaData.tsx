//personaldata.tsx

import * as React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
//imports
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

//end of imports

const FormGrid = styled(Grid)(() => ({
  display: "flex",
  flexDirection: "column",
}));

export default function PersonaData() {
  const [gender, setGender] = React.useState("");
  const [citizenship, setCitizenship] = React.useState("");
  const [status, setStatus] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [religion, setReligion] = React.useState("");

  const handleGenderChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string);
  };
  const handleCitizenshipChange = (event: SelectChangeEvent) => {
    setCitizenship(event.target.value as string);
  };
  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };
  const handleCountryChange = (event: SelectChangeEvent) => {
    setCountry(event.target.value as string);
  };

  const handleReligionChange = (event: SelectChangeEvent) => {
    setReligion(event.target.value as string);
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        I. Personal Information
      </Typography>

      <Grid
        container
        spacing={3}
        sx={{
          mb: 3,
        }}
      >
        <FormGrid item xs={12} md={6} lg={4}>
          <Box
            sx={{ minWidth: 120 }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
              <TextField id="fname" label="First Name" variant="outlined" />
            </FormControl>
          </Box>
        </FormGrid>

        <FormGrid item xs={12} md={6} lg={4}>
          <Box
            sx={{ minWidth: 120 }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
              <TextField id="mname" label="Middle Name" variant="outlined" />
            </FormControl>
          </Box>
        </FormGrid>

        <FormGrid item xs={12} md={6} lg={4}>
          <Box
            sx={{ minWidth: 120 }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
              <TextField id="lname" label="Last Name" variant="outlined" />
            </FormControl>
          </Box>
        </FormGrid>

        <FormGrid item xs={12} md={6} lg={4}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">
                Marital Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="status"
                value={status}
                label="Marital Status"
                onChange={handleStatusChange}
              >
                <MenuItem value={1}>Single</MenuItem>
                <MenuItem value={2}>Married</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </FormGrid>

        <FormGrid item xs={12}>
          <FormControl>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker label="Birth date" />
              </DemoContainer>
            </LocalizationProvider>
          </FormControl>
        </FormGrid>

        <FormGrid item xs={12} md={6} lg={4}>
          <Box
            sx={{ minWidth: 120 }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
              <TextField
                id="birthPlace"
                label="Birth Place"
                variant="outlined"
              />
            </FormControl>
          </Box>
        </FormGrid>

        <FormGrid item xs={12} md={6} lg={4}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="gender"
                value={gender}
                label="Gender"
                onChange={handleGenderChange}
              >
                <MenuItem value={1}>Male</MenuItem>
                <MenuItem value={2}>Female</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </FormGrid>

        <FormGrid item xs={12} md={6} lg={4}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Citizenship</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="citizenship"
                value={citizenship}
                label="Citizenship"
                onChange={handleCitizenshipChange}
              >
                <MenuItem value={1}>Filipino</MenuItem>
                <MenuItem value={2}>Chinese</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </FormGrid>

        <FormGrid item xs={12} md={6} lg={4}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Country</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="citizenship"
                value={citizenship}
                label="Citizenship"
                onChange={handleCitizenshipChange}
              >
                <MenuItem value={1}>Filipino</MenuItem>
                <MenuItem value={2}>Chinese</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </FormGrid>

        <FormGrid item xs={12} md={6} lg={4}>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Religion</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="religion"
                value={religion}
                label="Religion"
                onChange={handleReligionChange}
              >
                <MenuItem value={1}>Roman Catholic</MenuItem>
                <MenuItem value={2}>Muslim</MenuItem>
                <MenuItem value={3}>Buddism</MenuItem>
                <MenuItem value={4}>Jewish</MenuItem>
                <MenuItem value={5}>Satanist</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </FormGrid>
      </Grid>
      <FormGrid item xs={12} md={8}>
        <Box
          sx={{ minWidth: 120 }}
          component="form"
          noValidate
          autoComplete="off"
        >
          <FormControl fullWidth>
            <TextField
              id="acr"
              label="ACR (for foreign students)"
              variant="outlined"
            />
          </FormControl>
        </Box>
      </FormGrid>

      <Typography variant="h6" gutterBottom>
        II. Address Information
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{
          mb: 3,
        }}
      >
        <FormGrid item xs={12}>
          <Box
            sx={{ minWidth: 120 }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
              <TextField
                id="haddress"
                label="Home Address"
                variant="outlined"
              />
            </FormControl>
          </Box>
        </FormGrid>

        <FormGrid item xs={12}>
          <Box
            sx={{ minWidth: 120 }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
              <TextField
                id="paddress"
                label="Province Address (Optional)"
                variant="outlined"
              />
            </FormControl>
          </Box>
        </FormGrid>
      </Grid>

      <Typography variant="h6" gutterBottom>
        III. Contact Information
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{
          mb: 3,
        }}
      >
        <FormGrid item xs={12} md={8}>
          <Box
            sx={{ minWidth: 120 }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
              <TextField id="email" label="Email" variant="outlined" />
            </FormControl>
          </Box>
        </FormGrid>

        <FormGrid item xs={12} md={4}>
          <Box
            sx={{ minWidth: 120 }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
              <TextField
                id="contactno"
                label="Contact No."
                variant="outlined"
              />
            </FormControl>
          </Box>
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <Box
            sx={{ minWidth: 120 }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
              <TextField
                id="ccontact"
                label="City Contact No."
                variant="outlined"
              />
            </FormControl>
          </Box>
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <Box
            sx={{ minWidth: 120 }}
            component="form"
            noValidate
            autoComplete="off"
          >
            <FormControl fullWidth>
              <TextField
                id="pcontact"
                label="Province Contact No. (Optional)"
                variant="outlined"
              />
            </FormControl>
          </Box>
        </FormGrid>
      </Grid>
    </>
  );
}
