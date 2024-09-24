import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  Chip,
  Menu,
  MenuItem,
} from "@mui/material";
import { RootState, AppDispatch } from "../../store/store";
import { fetchUsers, updateStatus } from "../../features/userSlice";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const statusOptions = ["rejected", "confirmed", "pending"];

const AppointmentList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const now = dayjs();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedAppointment, setSelectedAppointment] = useState<any>(null);

  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <Typography>Loading appointments...</Typography>;
  if (error)
    return <Typography>Error loading appointments: {error}</Typography>;

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    appointment: any
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedAppointment(appointment);
    const latestStatus =
      appointment.PatientAppointments?.slice(-1)[0]?.Status || "";
    setSelectedStatus(latestStatus);
  };

  const handleClose = () => setAnchorEl(null);

  const handleChangeStatus = async (status: string) => {
    if (selectedAppointment) {
      const latestAppointmentID =
        selectedAppointment.PatientAppointments?.slice(-1)[0]?.AppointmentID;
      if (latestAppointmentID) {
        await dispatch(updateStatus({ id: latestAppointmentID, status }));
        dispatch(fetchUsers());
        setSelectedStatus(status);
        handleClose();
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "warning";
      case "rejected":
        return "error";
      case "confirmed":
        return "success";
      default:
        return "default";
    }
  };

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Appointment Requests
      </Typography>
      <List>
        {users.length ? (
          users.map((appointment: any, index: number) => {
            const latestAppointment =
              appointment.PatientAppointments?.slice(-1)[0] || {};
            const { Status = "", createdAt } = latestAppointment;
            return (
              <ListItem key={index} divider>
                <ListItemAvatar>
                  <Avatar src={`https://i.pravatar.cc/150?img=${index + 1}`} />
                </ListItemAvatar>
                <ListItemText
                  primary={`${appointment.FirstName} ${appointment.LastName}`}
                  secondary={createdAt ? now.from(createdAt) : null}
                />
                <Chip
                  label={Status}
                  color={getStatusColor(Status)}
                  size="small"
                  onClick={(event) => handleClick(event, appointment)}
                />
              </ListItem>
            );
          })
        ) : (
          <Typography>No appointments found</Typography>
        )}
      </List>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {statusOptions.map((status) => (
          <MenuItem key={status} onClick={() => handleChangeStatus(status)}>
            {status}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default AppointmentList;