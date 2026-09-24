import { Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import Home from './pages/Home'
import TourPackages from './pages/TourPackages'
import PackageDetail from './pages/PackageDetail'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import TravelServices from './pages/TravelServices'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/tour-packages" element={<TourPackages />} />
        <Route path="/tour-packages/:slug" element={<PackageDetail />} />
        <Route path="/travel-services" element={<TravelServices />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Route>
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
