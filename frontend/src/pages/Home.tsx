import React from 'react'
import AppointmentRequest from "../components/login/AppointmentRequest";
import Header from "../components/login/Header";
import PatientStats from "../components/login/PatientStats";
import RecentPatients from "../components/login/RecentPatients";
import Sidebar from "../components/login/Sidebar";
import TodayAppointments from "../components/login/TodayAppointments";
function Home() {
  return (
   <>
   <Header/>
   <Sidebar/>
   <PatientStats/>
   <AppointmentRequest/>
   <RecentPatients/>
   <TodayAppointments/>
   </>
  )
}

export default Home