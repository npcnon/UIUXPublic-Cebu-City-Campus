import * as React from "react";

import Typography from "@mui/material/Typography";
import Sidebar from "./Sidebar";
import { Grid, Box, Paper, Divider } from "@mui/material";
export default function Registration() {
  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid container spacing={1} direction="row">
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  color="#2e2e2e"
                  sx={{
                    fontWeight: "bold",
                    lineHeight: 3,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  Enrollment Status for School Year 2024 - 2025
                </Typography>
              </Grid>
            </Grid>
            <Box sx={{ m: 3 }}>
              <Paper
                component="form"
                sx={{
                  p: 2,
                  display: "flex",
                  flexDirection: "column",
                  height: 400,

                  bgcolor: "#fbfcf8",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.6)",
                  boxSizing: "border-box",
                }}
              >
                {/* Set Grid container direction to row */}
                <Grid container spacing={1} direction="row">
                  <Grid item xs={6}>
                    <Typography
                      color="primary"
                      sx={{ fontWeight: "bold", lineHeight: 3 }}
                    >
                      REGISTRATION
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography
                      color="#64dd17"
                      sx={{ fontWeight: "bold", lineHeight: 3 }}
                    >
                      Approved
                    </Typography>
                  </Grid>
                  <Divider orientation="vertical" flexItem sx={{ m: 0.5 }} />
                  <Grid item xs={3}>
                    <Typography sx={{ lineHeight: 3 }}>
                      August 29, 2024
                    </Typography>
                  </Grid>
                </Grid>
                <Divider sx={{ m: 1 }} />
                {/*Grid */}
                <Grid container spacing={1} direction="row">
                  <Grid item xs={2}>
                    <Typography
                      color="#2e2e2e"
                      sx={{ fontWeight: "bold", lineHeight: 3 }}
                    >
                      Registration Number :
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ lineHeight: 3 }}>R00817-2024</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography
                      color="#2e2e2e"
                      sx={{ fontWeight: "bold", lineHeight: 3 }}
                    >
                      Course :
                    </Typography>
                  </Grid>
                  <Grid item xs={5}>
                    <Typography sx={{ lineHeight: 3 }}>
                      Bachelor of Science in Information Technology
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container spacing={1} direction="row">
                  <Grid item xs={2}>
                    <Typography
                      color="#2e2e2e"
                      sx={{ fontWeight: "bold", lineHeight: 3 }}
                    >
                      Student Name :
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ lineHeight: 3 }}>
                      Aballe , Ulymar L.
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography
                      color="#2e2e2e"
                      sx={{ fontWeight: "bold", lineHeight: 3 }}
                    >
                      Year Level :
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography sx={{ lineHeight: 3 }}>Fourth Year</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} direction="row">
                  <Grid item xs={2}>
                    <Typography
                      color="#2e2e2e"
                      sx={{ fontWeight: "bold", lineHeight: 3 }}
                    >
                      Email Address :
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ lineHeight: 3 }}>
                      ulymaraballe@gmail.com
                    </Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography
                      color="#2e2e2e"
                      sx={{ fontWeight: "bold", lineHeight: 3 }}
                    >
                      Shiftee :
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography sx={{ lineHeight: 3 }}>No</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} direction="row">
                  <Grid item xs={2}>
                    <Typography
                      color="#2e2e2e"
                      sx={{ fontWeight: "bold", lineHeight: 3 }}
                    >
                      Phone Number :
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ lineHeight: 3 }}>09082568916</Typography>
                  </Grid>
                  <Grid item xs={1}>
                    <Typography
                      color="#2e2e2e"
                      sx={{ fontWeight: "bold", lineHeight: 3 }}
                    >
                      Transferee :
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography sx={{ lineHeight: 3 }}>No</Typography>
                  </Grid>
                </Grid>
                <Grid container spacing={1} direction="row">
                  <Grid item xs={2}>
                    <Typography
                      color="#2e2e2e"
                      sx={{ fontWeight: "bold", lineHeight: 3 }}
                    >
                      Registration Submitted :
                    </Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography sx={{ lineHeight: 3 }}>
                      August 29, 2024
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography
                      color="#2e2e2e"
                      sx={{ fontWeight: "bold", lineHeight: 3 }}
                    >
                      Registration Approved :
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography sx={{ lineHeight: 3 }}>
                      August 29, 2024
                    </Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
