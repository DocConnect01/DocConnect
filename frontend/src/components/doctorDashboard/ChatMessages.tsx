import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
}

interface ChatMessagesProps {
  roomId: string;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ roomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/chats/${roomId}/messages`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });
        setMessages(response.data);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
  }, [roomId]);

  const handleSendMessage = async () => {
    try {
      await axios.post('http://localhost:5000/api/chats/message', {
        chatroomId: roomId,
        content: newMessage
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      setNewMessage('');
      // Refetch messages or add the new message to the list
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Messages</Typography>
      <List sx={{ flex: 1, overflow: 'auto' }}>
        {messages.map((message) => (
          <ListItem key={message.id}>
            <ListItemText 
              primary={message.content}
              secondary={`${message.sender} - ${new Date(message.timestamp).toLocaleString()}`}
            />
          </ListItem>
        ))}
      </List>
      <Box sx={{ display: 'flex', mt: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message"
        />
        <Button variant="contained" onClick={handleSendMessage} sx={{ ml: 1 }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatMessages;