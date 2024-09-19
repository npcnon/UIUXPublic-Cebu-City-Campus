//filename: EnrollmentPage.tsx

import  { useState } from 'react';
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
  CircularProgress,
  Modal,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import bcCebu from "../../StaticFiles/benedicto_background.jpg";
import logo from "../../StaticFiles/Logo.jpg";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useStudentBasicStore } from "../../stores/useStudentBasicStore";
import { StudentBasicAPIData } from "../../Types/StudentBasicDataAPITypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, Resolver, useForm } from "react-hook-form";
import { studentBasicAPIDataSchema } from "../../validations/StudentBasicAPIDataValidation";
import dayjs from "dayjs";
import axios from "axios";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";

export default function StudentRegistration() {
  const { studentBasicAPI, setStudentBasicAPI } = useStudentBasicStore(
    (state) => ({
      studentBasicAPI: state.studentBasicAPI,
      setStudentBasicAPI: state.setStudentBasicAPI,
    })
  );

  const { control, handleSubmit, setValue, formState: { errors } } = useForm<StudentBasicAPIData>({
    defaultValues: studentBasicAPI,
    resolver: yupResolver(studentBasicAPIDataSchema) as Resolver<StudentBasicAPIData>,
    mode: "onSubmit",
    shouldUnregister: false,
  });
  
  const [email, setEmail] = useState('');
  const [isVerificationSent, setIsVerificationSent] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleVerifyClick = async () => {
    setIsVerifying(true);
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/emailapi', { "email": email });
      if (response.data.message === "Verification code sent") {
        setIsVerificationSent(true);
      }
    } catch (error) {
      console.error('Error sending verification code:', error);
    } finally {
      setIsVerifying(false);
    }
  };

  const handleVerificationSubmit = async () => {
    setIsVerifying(true);
    try {
      const response = await axios.put('http://127.0.0.1:8000/api/emailapi', { "email": email, "verification_code": verificationCode });
      if (response.status === 200) {
        setIsVerified(true);
      }
    } catch (error) {
      console.error('Error verifying code:', error);
    } finally {
      setIsVerifying(false);
    }
  };
  
  const onInvalid = (errors: any) => console.error(errors);

  const onSubmit = async (data: StudentBasicAPIData) => {
    setIsSubmitting(true);
    console.clear();
    console.log(data);
    if (email){
      console.log(`email is set: ${email}`);
      data.email = email
    }
    else{
      console.log("no email is set");
    }
    if (data.birth_date instanceof Date) {
      data.birth_date = data.birth_date.toISOString().split("T")[0];
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/stdntbasicinfoapplication/",
        data
      );
      if (response.status === 200 || response.status === 201) {
        setShowSuccessModal(true);
      }
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
    } finally {
      setIsSubmitting(false);
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
    <>
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
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
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
              md={6}
              lg={4}
              sx={{
                display: "flex",
                justifyContent: "center",
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
                          <InputLabel id="program-label">Preferred Course</InputLabel>
                          <Select
                            {...field}
                            labelId="program-label"
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
                            <MenuItem value="1st Year">First Year</MenuItem>
                            <MenuItem value="2nd Year">Second Year</MenuItem>
                            <MenuItem value="3rd Year">Third Year</MenuItem>
                            <MenuItem value="4th Year">Fourth Year</MenuItem>
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

                
                  {/* Email Field Inside Controller */}
                  <Grid item xs={12}>
                    <Controller
                      name="email"
                      control={control}
                      render={({ field }) => (
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
                            {...field}
                            sx={{ ml: 1, flex: 1 }}
                            placeholder="Email"
                            inputProps={{ "aria-label": "Email" }}
                            onChange={(e) => {
                              field.onChange(e);
                              setEmail(e.target.value); // Sync state with field
                            }}
                          />
                          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                          <Button
                            color="primary"
                            sx={{ p: "10px" }}
                            aria-label="verify"
                            onClick={() => handleVerifyClick()}
                            disabled={isVerifying || isVerified}
                          >
                            {isVerifying ? (
                              <CircularProgress size={24} />
                            ) : isVerified ? (
                              <CheckCircleIcon color="success" />
                            ) : (
                              "Verify"
                            )}
                          </Button>
                        </Paper>
                      )}
                    />
                  </Grid>

                {isVerificationSent && !isVerified && (
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
                        disabled={isVerifying}
                      >
                        {isVerifying ? <CircularProgress size={24} /> : "Submit"}
                      </Button>
                    </Paper>
                  </Grid>
                )}

                <Button
                  type="button"
                  onClick={handleButtonClick}
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={isSubmitting ? <CircularProgress size={24} color="inherit" /> : <AddCircleIcon />}
                  disabled={isSubmitting || !isVerified}
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
                  {isSubmitting ? "Submitting..." : "Submit"}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Grid>

      <Modal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Enrollment Submitted Successfully
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Your enrollment has been successfully submitted. Please check your email for further updates.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
