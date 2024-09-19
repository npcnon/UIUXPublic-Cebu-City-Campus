//filename: EnrollmentPage.tsx

import {
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import bcCebu from "../../StaticFiles/benedicto_background.jpg";
import logo from "../../StaticFiles/Logo.jpg";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useStudentBasicStore } from "../../stores/useStudentBasicStore";
import { StudentBasicAPIData } from "../../Types/StudentBasicDataAPITypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, Resolver, useForm } from "react-hook-form";
import { studentBasicAPIDataSchema } from "../../validations/StudentBasicAPIDataValidation";
import dayjs from "dayjs";
import axios from "axios";

//
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import { useState } from "react";

export default function StudentRegistration() {
  const { studentBasicAPI, setStudentBasicAPI } = useStudentBasicStore(
    (state) => ({
      studentBasicAPI: state.studentBasicAPI,
      setStudentBasicAPI: state.setStudentBasicAPI,
    })
  );

  const { control, handleSubmit, setValue,formState: { errors },} = useForm<StudentBasicAPIData>({
    defaultValues: studentBasicAPI,
    resolver: yupResolver(studentBasicAPIDataSchema) as Resolver<StudentBasicAPIData>,
    mode: "onSubmit",
    shouldUnregister: false,
  });
  
  
  const [email, setEmail] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleVerifyClick = async() => {
    await axios.post('http://127.0.0.1:8000/api/emailapi', {"email":email});
    setIsVerificationSent(true);

  };

  const handleVerificationSubmit = () => {
    // Here you would typically verify the code with your backend
    // For this example, we'll just log the code
    console.log('Verification code submitted:', verificationCode);
    // Add your verification logic here
  };

  
  const onInvalid = (errors: any) => console.error(errors);

  const onSubmit = async (data: StudentBasicAPIData) => {
    console.clear();
    console.log(data);
    if (data.birth_date instanceof Date) {
      data.birth_date = data.birth_date.toISOString().split("T")[0]; // 'YYYY-MM-DD'
    }
    try {
      await axios.post(
        "https://afknon.pythonanywhere.com/api/stdntbasicinfoapplication/",
        data
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.message);
        if (error.response) {
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          console.error("Request data:", error.request);
        }
      } else {
        console.error("Error:", error);
      }
    }
  };

  const handleButtonClick = () => {
    setValue("campus", studentBasicAPI.campus);
    handleSubmit(onSubmit, onInvalid)();
  };
  const renderTextField = (name: keyof StudentBasicAPIData, label: string) => (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <FormControl fullWidth error={!!errors[name]}>
          <TextField
            {...field}
            label={label}
            helperText={errors[name]?.message || ""}
            variant="outlined"
            value={field.value || ""}
            onBlur={(e) => {
              field.onBlur();
              setStudentBasicAPI((prev) => ({
                ...prev,
                [name]: e.target.value,
              }));
            }}
            autoComplete="off"
            error={!!errors[name]}
          />
        </FormControl>
      )}
    />
  );

  return (
    <form>
      <Grid container>
        <Box
          id="hero"
          sx={{
            width: "100%",
            minHeight: "100vh",
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0), rgba(0,0,0,1)), url(${bcCebu})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
            //
            display: "flex", // Flexbox for centering
            justifyContent: "center", // Center horizontally
            alignItems: "center", // Center vertically
          }}
        >
          <Grid
            container
            sx={{
              width: { xs: "100%", sm: "100%", md: "100%", lg: "100%" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "100vh",
              py: { xs: 2, sm: 3 },
              px: { xs: 2, sm: 3 },
            }}
          >
            <Grid
              item
              xs={12}
              sm={8}
              md={6} // Adjust for medium screens
              lg={4} // Add a new breakpoint for larger screens
              sx={{
                display: "flex",
                justifyContent: "center", // Center the content horizontally
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  bgcolor: "#fbfcf8",
                  width: { xs: "90%", sm: "400px", md: "500px" },
                  p: { xs: 2, sm: 3 },
                  borderRadius: "8px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                  boxSizing: "border-box",
                }}
              >
                <img
                  src={logo}
                  alt="BC Logo"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: "2px solid #fff",
                  }}
                />
                <Typography
                  variant="h5"
                  color="#2e2e2e"
                  sx={{ fontWeight: "bold", lineHeight: 3 }}
                >
                  Student Registration
                </Typography>

                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {renderTextField("first_name", "First Name")}
                  </Grid>
                  {/* render & function*/}
                  <Grid item xs={6}>
                    {renderTextField("middle_name", "Middle Name")}
                  </Grid>
                  <Grid item xs={6}>
                    {renderTextField("suffix", "Suffix")}
                  </Grid>
                  <Grid item xs={12}>
                    {renderTextField("last_name", "Last Name")}
                  </Grid>
                  <Grid item xs={4}>
                    <Controller
                      name="sex"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.sex}
                          variant="outlined"
                        >
                          <InputLabel id="sex">Sex</InputLabel>
                          <Select
                            {...field}
                            labelId="sex"
                            label="Sex"
                            MenuProps={{ disableScrollLock: true }}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                          >
                            <MenuItem value="Male">Male</MenuItem>
                            <MenuItem value="Female">Female</MenuItem>
                          </Select>
                          {errors.sex && (
                            <Typography color="error" variant="caption">
                              {errors.sex.message}
                            </Typography>
                          )}
                        </FormControl>
                      )}
                    />
                  </Grid>
                  <Grid item xs={8}>
                    <Controller
                      name="birth_date"
                      control={control}
                      render={({ field }) => (
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            {...field}
                            label="Birth Date"
                            value={field.value ? dayjs(field.value) : null}
                            onChange={(date) => {
                              const dateValue = date ? date.toDate() : null;
                              field.onChange(dateValue);
                              field.onBlur();
                              setStudentBasicAPI((prev) => ({
                                ...prev,
                                birth_date: dateValue,
                              }));
                            }}
                            slotProps={{
                              textField: {
                                variant: "outlined",
                                fullWidth: true,
                                error: !!errors.birth_date,
                                helperText: errors.birth_date?.message,
                              },
                            }}
                          />
                        </LocalizationProvider>
                      )}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    {renderTextField("address", "Address")}
                  </Grid>
                  <Grid item xs={12}>
                    {renderTextField("contact_number", "Contact No.")}
                  </Grid>

                  <Grid item xs={12}>
                    <Controller
                      name="program"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.program}
                          variant="outlined"
                        >
                          <InputLabel id="program">Preferred Course</InputLabel>
                          <Select
                            {...field}
                            labelId="program"
                            label="Preferred Course"
                            MenuProps={{ disableScrollLock: true }}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                          >
                            <MenuItem value="BSIT">BSIT</MenuItem>
                            <MenuItem value="BSTM">BSTM</MenuItem>
                            <MenuItem value="BMMA">BMMA</MenuItem>
                          </Select>
                          {errors.program && (
                            <Typography color="error" variant="caption">
                              {errors.program.message}
                            </Typography>
                          )}
                        </FormControl>
                      )}
                    />
                  </Grid>




                  {/* butngi nig function*/}
                  <Grid item xs={12}>
                    <Controller
                      name="year_level"
                      control={control}
                      render={({ field }) => (
                        <FormControl
                          fullWidth
                          error={!!errors.year_level}
                          variant="outlined"
                        >
                          <InputLabel id="year_label">Year Level</InputLabel>
                          <Select
                            {...field}
                            labelId="year_label"
                            label="Year Level"
                            MenuProps={{ disableScrollLock: true }}
                            onChange={(e) => {
                              field.onChange(e);
                            }}
                          >
                            <MenuItem value="First Year">First Year</MenuItem>
                            <MenuItem value="Second Year">Second Year</MenuItem>
                            <MenuItem value="Third Year">Third Year</MenuItem>
                            <MenuItem value="Fourth Year">Fourth Year</MenuItem>
                          </Select>
                          {errors.year_level && (
                            <Typography color="error" variant="caption">
                              {errors.year_level.message}
                            </Typography>
                          )}
                        </FormControl>
                      )}
                    />
                  </Grid>
 
                  <Grid item xs={6} sx={{ alignItems: "center" }}>
                    <Typography
                      variant="subtitle1"
                      color="#1565c0"
                      sx={{ fontWeight: "bold", fontSize: 20 }}
                    >
                      Are you a transferee?
                    </Typography>
                  </Grid>

                  <Grid item xs={6}>
                    <Controller
                      name="is_transferee"
                      control={control}
                      render={({ field }) => (
                        <FormControl component="fieldset">
                          <RadioGroup
                            {...field}  
                            row
                            aria-labelledby="demo-row-radio-buttons-group-label"
                            name="transferee"
                            onChange={(e) => {
                              field.onChange(e.target.value); 
                            }}
                          >
                            <FormControlLabel
                              value= {true}
                              control={<Radio />}
                              label="Yes"
                            />
                            <FormControlLabel
                              value= {false}
                              control={<Radio />}
                              label="No"
                            />
                          </RadioGroup>
                        </FormControl>
                      )}
                    />
                  </Grid>

        
                </Grid>

                <Grid item xs={12}>
                  <Paper
                    component="form"
                    sx={{
                      p: "2px 4px",
                      display: "flex",
                      alignItems: "center",
                      width: 450,
                      maxWidth: "100%",
                      border: "1px solid",
                      borderColor: "#42a5f5",
                      mt: 1,
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1 }}
                      placeholder="Email"
                      inputProps={{ "aria-label": "Email" }}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <Button
                      color="primary"
                      sx={{ p: "10px" }}
                      aria-label="verify"
                      onClick={handleVerifyClick}
                    >
                      Verify
                    </Button>
                  </Paper>
                </Grid>

                {isVerificationSent && (
                  <Grid item xs={12}>
                    <Paper
                      component="form"
                      sx={{
                        p: "2px 4px",
                        display: "flex",
                        alignItems: "center",
                        width: 450,
                        maxWidth: "100%",
                        border: "1px solid",
                        borderColor: "#42a5f5",
                        mt: 1,
                      }}
                    >
                      <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Verification Code"
                        inputProps={{ "aria-label": "Verification Code" }}
                        value={verificationCode}
                        onChange={(e) => setVerificationCode(e.target.value)}
                      />
                      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                      <Button
                        color="primary"
                        sx={{ p: "10px" }}
                        aria-label="submit verification"
                        onClick={handleVerificationSubmit}
                      >
                        Submit
                      </Button>
                    </Paper>
                  </Grid>
                )}

                <Button
                  type="button" // Change this to "button"
                  onClick={handleButtonClick} // Call the handleButtonClick function
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={<AddCircleIcon />}
                  sx={{
                    mt: 3,
                    mb: 1,
                    backgroundColor: "#f15800",
                    color: "#FFFFFF",
                    "&:hover": {
                      backgroundColor: "#FFA500",
                    },
                    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",
                    boxShadow: "3px 3px 6px rgba(0, 0, 0, 0.3)",
                  }}
                >
                  Submit
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    </form>
  );
}
