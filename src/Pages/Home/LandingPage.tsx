
import CssBaseline from '@mui/material/CssBaseline';
import AppAppBar from './components/AppAppbar';
import Hero from './components/Hero';
import Checkout from '../Enrollment/Checkout';
import Dashboard from '../Dashboard/Dashboard';
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
 // combination
  const router = createBrowserRouter(
    createRoutesFromElements(
      //app bar - layout
      //hero - background 
      <Route  element={<Layout/>}> 
        <Route path="/" element={<Hero />}/>
        <Route path="/Enrollment" element={<Checkout/>}/>
       
        

      </Route>
    )
  );
  



  return (
    <RouterProvider router={router} />
 
  );
}