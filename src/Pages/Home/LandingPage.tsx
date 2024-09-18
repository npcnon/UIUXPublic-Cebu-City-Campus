import { Navigate, Outlet, RouterProvider } from "react-router-dom";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "./components/AppAppbar";
import Hero from "./components/Hero";
import Checkout from "../Enrollment/Checkout";
import SignInSide from "../Login/SignInSide";
import EnrollmentPage from "../Enrollment/BasicEnrollmentPage";
import Registration from "../Subjects/Registration";
import Enlistment from "../Subjects/Enlistment";
import Dashboard from "../Dashboard/Dashboard";
import Sidebar from "../Subjects/Sidebar";
import Studyload from "../Subjects/Studyload";
import StudentDashboard from "../Subjects/StudentDashboard";
import UserProfile from "../UserPage/UserProfile";

// Check if user is authenticated
const isAuthenticated = () => {
  const token = localStorage.getItem("access_token");
  return !!token; // Returns true if token exists, false otherwise
};

// Protected Route component
const ProtectedRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/Sign-in" replace />;
  }
  return <Outlet />;
};

// Layout with AppAppBar
const LayoutWithAppBar = () => (
  <>
    <CssBaseline />
    <AppAppBar />
    <Outlet />
  </>
);

// Layout without AppAppBar
const LayoutWithoutAppBar = () => (
  <>
    <CssBaseline />
    <Outlet />
  </>
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<LayoutWithAppBar />}>
        <Route index element={<Hero />} />
        <Route path="Enrollment" element={<Checkout />} />
      </Route>
      <Route path="/" element={<LayoutWithoutAppBar />}>
        <Route path="EnrollmentPage" element={<EnrollmentPage />} />
        <Route path="Sign-in" element={<SignInSide />} />

        <Route path="Subjects" element={<Sidebar />} />
        <Route
          path="Subjects/StudentDashboard"
          element={<StudentDashboard />}
        />
        <Route path="Subjects/Registration" element={<Registration />} />
        <Route path="Subjects/Enlistment" element={<Enlistment />} />
        <Route path="Subjects/Studyload" element={<Studyload />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="Profile" element={<UserProfile />} />
          <Route path="Dashboard" element={<Dashboard />} />
        </Route>
      </Route>
    </>
  )
);

export default function LandingPage() {
  return <RouterProvider router={router} />;
}
