import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemButton, ListItemText, Box, Typography, CircularProgress, IconButton } from '@mui/material';
import axios from 'axios';
import ChatMessages from './ChatMessages';
import CloseIcon from '@mui/icons-material/Close';

interface ChatRoom {
  ChatroomID: number;
  Patient: {
    FirstName: string;
    LastName: string;
  };
}

interface ChatRoomsProps {
  onClose?: () => void;
}

const ChatRooms: React.FC<ChatRoomsProps> = ({ onClose }) => {
  const [chatRooms, setChatRooms] = useState<ChatRoom[]>([]);
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchChatRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/chats', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setChatRooms(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching chat rooms. Please try again.');
        setLoading(false);
      }
    };

    fetchChatRooms();
  }, []);

  return (
    <Box sx={{ display: 'flex', height: '100%' }}>
      {/* Chat Rooms List */}
      <Box sx={{ width: 250, borderRight: '1px solid #ccc' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 2 }}>
          <Typography variant="h6">Chat Rooms</Typography>
          {onClose && (
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          )}
        </Box>

        {/* Loading State */}
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Typography sx={{ p: 2, color: 'red' }}>{error}</Typography>
        ) : (
          <List>
            {chatRooms.map((room) => (
              <ListItem 
                disablePadding 
                key={room.ChatroomID} // Using ChatroomID as the key
              >
                <ListItemButton
                  onClick={() => setSelectedRoom(room.ChatroomID)}
                  selected={selectedRoom === room.ChatroomID}
                >
                  <ListItemText primary={`${room.Patient.FirstName} ${room.Patient.LastName}`} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>

      {/* Chat Messages Section */}
      {selectedRoom ? (
        <Box sx={{ flexGrow: 1 }}>
          <ChatMessages roomId={selectedRoom} />
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="body1">Select a chat room to view messages</Typography>
        </Box>
      )}
    </Box>
  );
};

export default ChatRooms;
