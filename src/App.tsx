import { Route, Routes } from 'react-router-dom'
import PublicLayout from './layouts/PublicLayout'
import Home from './pages/Home'
import TourPackages from './pages/TourPackages'
import PackageDetail from './pages/PackageDetail'
import ContactUs from './pages/ContactUs'
import RequestQuote from './pages/RequestQuote'
import AboutUs from './pages/AboutUs'
import TravelServices from './pages/TravelServices'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import PackagesList from './pages/admin/packages/PackagesList'
import PackageForm from './pages/admin/packages/PackageForm'
import InquiriesList from './pages/admin/inquiries/InquiriesList'
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
        <Route path="/request-a-quote" element={<RequestQuote />} />
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
      <Route
        path="/admin/packages"
        element={
          <ProtectedRoute>
            <PackagesList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/packages/new"
        element={
          <ProtectedRoute>
            <PackageForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/packages/:id/edit"
        element={
          <ProtectedRoute>
            <PackageForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/inquiries"
        element={
          <ProtectedRoute>
            <InquiriesList />
          </ProtectedRoute>
        }
      />
    </Routes>
  )
}
