//filename: EnrollmentPage.tsx

import {
  Container,
  Button,
  TextField,
  Box,
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import bcCebu from "../../StaticFiles/benedicto_background.jpg";
import logo from "../../StaticFiles/Logo.jpg";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useStudentBasicStore } from "../../stores/useStudentBasicStore";
import { StudentBasicAPIData } from "../../Types/StudentBasicInfoTypes/StudentBasicDataAPITypes";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, Resolver, useForm } from "react-hook-form";
import { studentBasicAPIDataSchema } from "../../validations/StudentBasicAPIDataValidation";
import dayjs from "dayjs";
import axios from "axios";

export default function StudentRegistration() {
  const { studentBasicAPI, setStudentBasicAPI } = useStudentBasicStore(
    (state) => ({
      studentBasicAPI: state.studentBasicAPI,
      setStudentBasicAPI: state.setStudentBasicAPI,
    })
  );

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<StudentBasicAPIData>({
    defaultValues: studentBasicAPI,
    resolver: yupResolver(
      studentBasicAPIDataSchema
    ) as Resolver<StudentBasicAPIData>,
    mode: "onSubmit",
    shouldUnregister: false,
  });
  const onInvalid = (errors: any) => console.error(errors);

  const onSubmit = async (data: StudentBasicAPIData) => {
    console.clear();
    console.log(data);
    if (data.birth_date instanceof Date) {
      data.birth_date = data.birth_date.toISOString().split("T")[0]; // 'YYYY-MM-DD'
    }
    try {
      await axios.post(
        "https://afknon.pythonanywhere.com/api/stdntbasicinfo/",
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
          }}
        >
          <Container
            maxWidth={false}
            sx={{
              width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" },
              maxWidth: "none",
              py: { xs: 2, sm: 3 },
              px: { xs: 2, sm: 3 },
              height: "100vh",
            }}
          >
            <Grid
              container
              sx={{
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid item xs={12} sm={8} md={5}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    bgcolor: "#fbfcf8",
                    width: { xs: "90%", sm: "400px" },
                    p: { xs: 2, sm: 3 },
                    borderRadius: "8px",
                    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                    boxSizing: "border-box",
                    mx: 2,
                    ml: "auto",
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
                    sx={{ fontWeight: "bold", lineHeight: 3 }}
                  >
                    Student Registration
                  </Typography>

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      {renderTextField("first_name", "First Name")}
                    </Grid>
                    <Grid item xs={6}>
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
                    <Grid item xs={5}>
                      {renderTextField("contact_number", "Contact No.")}
                    </Grid>
                    <Grid item xs={7}>
                      {renderTextField("email", "Email")}
                    </Grid>
                  </Grid>

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
          </Container>
        </Box>
      </Grid>
    </form>
  );
}
