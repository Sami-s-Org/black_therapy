import React, { PropsWithChildren } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from '../../Components/Navbar'
import ContactUs from '../../Pages/Contact Us'
import Home from '../../Pages/Home'
import Footer from '../../Components/Footer'
import JoinAsACoach from '../../Pages/JoinAsACoach'
import JoinAsATherapist from '../../Pages/JoinaAsATherapist'
import FindCoach from '../../Pages/FindCoach'
import BoardMembers from '../../Pages/BoardMember'
import OurTeam from '../../Pages/OurTeam'
import ApplyForFreeHelp from '../../Pages/ApplyFreehelp'
import Store from '../../Pages/Store'
import Profile from '../../Pages/Profile'
import FindTherapist from '../../Pages/FindTherapist'
import PrivacyPolicy from '../../Pages/Privacypolicy'
import TermsOfUse from '../../Pages/TermUsed'
import BlogPage from '../../Pages/Blog'
import Donate from '../../Pages/Donate'
import BlogDetailPage from '../../Pages/Blog/blogDetails'
import AdminPanel from '../../Pages/AdminPage'
import ToastNotification from '../../Components/Toast'
import ChatBot from '../../Components/Chatbot'
import AppointmentList from '../../Pages/Appointmentslist'
import Chatpage from '../../Pages/Chatpage'
import MyProfile from '../../Pages/MyProfile'
import KingTable from "../../Pages/King's Table"
import FreeTherapy from '../../Pages/FreeTherapy'
const Layout: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <>
      {!isAdminRoute && <Navbar />}
      {children}
      <ToastNotification />
      {!isAdminRoute && <ChatBot />}
      {!isAdminRoute && <Footer />}
    </>
  )
}

const AppRouter = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contactUs" element={<ContactUs />} />
          <Route path="/joinAsACoach" element={<JoinAsACoach />} />
          <Route path="/joinAsATherapist" element={<JoinAsATherapist />} />
          <Route path="/findCoach" element={<FindCoach />} />
          <Route path="/boardMembers" element={<BoardMembers />} />
          <Route path="/ourTeam" element={<OurTeam />} />
          <Route path="/store" element={<Store />} />
          <Route path="/applyForFreeHelp" element={<ApplyForFreeHelp />} />
          <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/termsOfUse" element={<TermsOfUse />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/donate" element={<Donate />} />
          <Route path="/blogDetails" element={<BlogDetailPage />} />
          <Route path="/admin/*" element={<AdminPanel />} />
          <Route path="/findTherapist" element={<FindTherapist />} />
          <Route path="/appointmentlist" element={<AppointmentList />} />
          <Route path="/chat/:appointmentId" element={<Chatpage />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/freeTherapy" element={<FreeTherapy />} />
          <Route path="/kingTable" element={<KingTable />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default AppRouter
