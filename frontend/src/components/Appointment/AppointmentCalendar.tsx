import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useDispatch } from 'react-redux';
import { setSelectedDate } from '../../Actions/appointmentActions';

import { Avatar, Card,  Box, Typography, Button, Grid, Divider } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Importing the calendar icon
const AppointmentCalendar: React.FC = () => {

const dispatch = useDispatch();
const [date, setDate] = useState<Date | null>(new Date());
const [appointments, setAppointments] = useState<any[]>([]); 
const [patients] = useState([
    { name: "Stacy Mitchell", type: "Weekly Visit", time: "8:15 AM" },
    { name: "Amy Dunham", type: "Routine Checkup", time: "9:30 AM" },
    { name: "Demi Joan", type: "Report", time: "9:50 AM" },
    { name: "Susan Myers", type: "Weekly Visit", time: "10:15 AM" },
    { name: "Jane Doe", type: "Routine Checkup", time: "10:30 AM" },
    { name: "Karen Brown", type: "Report", time: "10:50 AM" },
    { name: "Michael Johnson", type: "Weekly Visit", time: "11:15 AM" },
]);

const handleDateChange = (value: Date | Date[] | null) => {
    if (value) {
        const newDate = Array.isArray(value) ? value[0] : value;
        setDate(newDate);
        dispatch(setSelectedDate(newDate)); // Dispatching the selected date to Redux
    }
};

useEffect(() => {
    
    const fetchAppointments = async () => {
        const response = await fetch('/api/appointments');
        const data = await response.json();
        setAppointments(data);
    };
    fetchAppointments();

    // Dummy data for appointments
    setAppointments([
        { title: 'Consultation with John Doe', time: '11:00 AM', description: 'General Consultation' },
        { title: 'Follow-up with Jane Smith', time: '12:30 PM', description: 'Post-surgery follow-up' },
        { title: 'Routine Checkup with Jane Doe', time: '1:00 PM', description: 'Follow-up with Jane Smith' },
        { title: 'Follow-up with Jane Smith', time: '3:30 PM', description: 'Follow-up with Jane Smith' },
        { title: 'Follow-up with Jane Smith', time: '5:00 PM', description: 'Follow-up with Jane Smith' },
    ]);
}, []);

return (
    <Box sx={{ p: 4 }}>
        {/* Dashboard Header */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
            <Box>
                <Typography variant="h4" gutterBottom>
                    Good Morning, Dr. Kim!
                </Typography>
                <Typography variant="subtitle1">
                    Visits for Today: 104 | New Patients: 40 | Old Patients: 64
                </Typography>
            </Box>
            <Avatar
                sx={{ width: 60, height: 60 ,position: 'center', right: 20, top: 20 }}
                src="https://skinmedspa.com/wp-content/uploads/2016/08/doc4.png" 
            />
        </Box>

        {/* Main Content Grid */}
        <Grid container spacing={3}>
            {/* Left Side - Patient List */}
            <Grid item xs={12} md={8}>
                <Card sx={{ p: 3, backgroundColor: '#f5f5f5', borderRadius: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Patient List
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    {patients.map((patient, index) => (
                        <Box key={index} display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                            <Box display="flex" alignItems="center">
                                <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                                    {patient.name[0]}
                                </Avatar>
                                <Box>
                                    <Typography variant="body1">{patient.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {patient.type}
                                    </Typography>
                                </Box>
                            </Box>
                            <Typography variant="body2">{patient.time}</Typography>
                        </Box>
                    ))}
                </Card>
            </Grid>

            {/* Right Side - Calendar & Details */}
            <Grid item xs={12} md={4}>
                {/* Calendar Card */}
                <Card sx={{ p: 3, textAlign: 'center', mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        <CalendarTodayIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                        Appointment Calendar
                    </Typography>
                    <Calendar
                onChange={handleDateChange as any}
                value={date}
                className="border border-gray-300 rounded-lg shadow-lg"
            />
        <Button
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                            onClick={() => alert(`Selected date: ${date?.toDateString()}`)}
                        >
                            Confirm Date
                        </Button>
                    </Card>

                    {/* Upcoming Appointments */}
                    <Card sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Upcoming Appointments
                        </Typography>
                        <Divider sx={{ mb: 2 }} />
                        {appointments.length ? (
                            appointments.map((appointment, index) => (
                                <Box key={index} mb={2}>
                                    <Typography variant="body1">
                                        {appointment.title} - {appointment.time}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {appointment.description}
                                    </Typography>
                                </Box>
                            ))
                        ) : (
                            <Typography variant="body2" color="textSecondary">
                                No appointments for today.
                            </Typography>
                        )}
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AppointmentCalendar;
