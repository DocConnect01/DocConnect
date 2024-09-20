import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

interface Message {
  MessageID: number;
  ChatroomID: number;
  SenderID: number;
  MessageText: string;
  Sender: {
    UserID: number;
    Username: string;
    FirstName: string;
    // ... other sender properties
  };
  SentAt: string;
  createdAt: string;
  updatedAt: string;
}

interface ChatMessagesProps {
  roomId: number;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ roomId }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

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

  useEffect(() => {
    fetchMessages();
  }, [roomId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || typeof roomId !== 'number' || isNaN(roomId)) {
      console.error('Invalid input:', { newMessage, roomId });
      return;
    }
  
    const data = {
      ChatroomID: roomId,
      messageText: newMessage.trim()
    };
  
    const config = {
      method: 'post',
      url: 'http://localhost:5000/api/chats/message',
      headers: { 
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      },
      data: data
    };
  
    console.log('Request config:', JSON.stringify(config, null, 2));
  
    try {
      const response = await axios(config);
      console.log('Message sent successfully:', response.data);
      setNewMessage("");
      fetchMessages();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error details:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          headers: error.response?.headers
        });
      } else {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Messages</Typography>
      <List sx={{ flex: 1, overflow: 'auto' }}>
        {messages.map((message) => (
          <ListItem key={message.MessageID}>
            <ListItemText 
              primary={message.MessageText}
              secondary={`${message.Sender.Username} - ${new Date(message.SentAt).toLocaleString()}`}
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