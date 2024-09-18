import './App.css';
import TimeSlotSelector from './components/Appointment/TimeSlotSelector';
import AppointmentCalendar from './components/Appointment/AppointmentCalendar';
import Login from './components/login/Login';
function App() {
  return (
<>


<div>hello app tsx</div>
<Login/>
<AppointmentCalendar/>
<TimeSlotSelector doctorId="123" patientId="456"/>

</>
  );
}

export default App;
