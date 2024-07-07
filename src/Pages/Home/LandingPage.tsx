import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from './components/AppAppbar';
import Hero from './components/Hero';
import Checkout from '../Enrollment/Checkout';
import SignInSide from '../Login/SignInSide';

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
  Outlet
} from 'react-router-dom';

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
        <Route element={<LayoutWithAppBar />}>
          <Route path="/" element={<Hero />} />
          <Route path="/Enrollment" element={<Checkout />} />
        </Route>
        <Route element={<LayoutWithoutAppBar />}>
          <Route path="/Sign-in" element={<SignInSide />} />
        </Route>
      </>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}
