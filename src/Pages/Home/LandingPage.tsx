import CssBaseline from "@mui/material/CssBaseline";
import AppAppBar from "./components/AppAppbar";
import Hero from "./components/Hero";
import Checkout from "../Enrollment/Checkout";
import SignInSide from "../Login/SignInSide";
import EnrollmentPage from "../Enrollment/BasicEnrollmentPage";
import Registration from "../Subjects/Registration";
import Enlistment from "../Subjects/Enlistment";
// import LogoCollection from './components/LogoCollection';
// import Highlights from './components/Highlights';
// import Pricing from './components/Pricing';
// import Features from './components/Features';
// import Testimonials from './components/Testimonials';
// import FAQ from './components/FAQ';
// import Footer from './components/Footer';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Dashboard from "../Dashboard/Dashboard";
import Sidebar from "../Subjects/Sidebar";
import Studyload from "../Subjects/Studyload";
import StudentDashboard from "../Subjects/StudentDashboard";
// Layout with AppAppBar
const LayoutWithAppBar = () => (
  <>
    <CssBaseline />
    <AppAppBar />
    <Outlet /> {/* This will render the nested route components */}
  </>
);

// Layout without AppAppBar
const LayoutWithoutAppBar = () => (
  <>
    <CssBaseline />
    <Outlet /> {/* This will render the nested route components */}
  </>
);

export default function LandingPage() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/">
          <Route path="/" element={<LayoutWithAppBar />}>
            <Route path="/" element={<Hero />} />
            <Route path="/Enrollment" element={<Checkout />} />
          </Route>
          <Route path="/" element={<LayoutWithoutAppBar />}>
            <Route path="/EnrollmentPage" element={<EnrollmentPage />} />
            <Route path="/Sign-in" element={<SignInSide />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Subjects" element={<Sidebar />} />
            <Route
              path="/Subjects/StudentDashboard"
              element={<StudentDashboard />}
            />
            <Route path="/Subjects/Registration" element={<Registration />} />
            <Route path="/Subjects/Enlistment" element={<Enlistment />} />
            <Route path="/Subjects/Studyload" element={<Studyload />} />
          </Route>
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
}
