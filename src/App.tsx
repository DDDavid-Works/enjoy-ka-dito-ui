import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import TourPackages from './pages/TourPackages'
import PackageDetail from './pages/PackageDetail'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import TravelServices from './pages/TravelServices'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tour-packages" element={<TourPackages />} />
        <Route path="/tour-packages/:slug" element={<PackageDetail />} />
        <Route path="/travel-services" element={<TravelServices />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
      <Footer />
    </>
  )
}
