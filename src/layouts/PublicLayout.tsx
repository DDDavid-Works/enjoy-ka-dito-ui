import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'
import ChatWidget from '../components/ChatWidget'

export default function PublicLayout() {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
      <ChatWidget />
    </>
  )
}
