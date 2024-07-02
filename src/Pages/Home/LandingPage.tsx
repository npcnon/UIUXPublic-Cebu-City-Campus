
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from './components/AppAppbar';
import Hero from './components/Hero';
import EnrollmentForm from '../Enrollment/EnrollmentForm';

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



const Layout = () => (
  <>
    <CssBaseline />
    <AppAppBar />
    <Outlet /> {/* This will render the nested route components */}
  </>
);

export default function LandingPage() {
 
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route  element={<Layout/>}>
        <Route path="/" element={<Hero />}/>
        <Route path="/Enrollment" element={<EnrollmentForm/>}/>

      </Route>
    )
  );
  



  return (
    <RouterProvider router={router} />
 
  );
}
