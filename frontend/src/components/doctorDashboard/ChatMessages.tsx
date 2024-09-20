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
  socket? : any;
}


const ChatMessages: React.FC<ChatMessagesProps> = ({ roomId,socket }) => {
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
    // Listen for incoming messages
    socket.on('chat_message', (message: Message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    // Clean up on unmount
    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    fetchMessages();
  }, [roomId]);

  const handleSendMessage = async () => {
    // if (!newMessage.trim() || typeof roomId !== 'number' || isNaN(roomId)) {
    //   console.error('Invalid input:', { newMessage, roomId });
    //   return;
    // }
  
    const data = {
      chatroomId: roomId,  // Ensure this matches the expected field name
      messageText: newMessage.trim()  // Ensure this matches the expected field name
    };

    console.log(data);
    
  

  
    try {
      // socket.emit('sendMessage', message);
      const response = await axios.post("http://localhost:5000/api/chats/message",data,
        {
          headers: { 
        Authorization: `Bearer ${localStorage.getItem('token')}`,
       'Content-Type': 'application/json'
      }
    });
      console.log('Message sent successfully:', response.data);
      setNewMessage("");
      // Fetch updated messages after sending
    } catch (error) {
    
        console.error('Error sending message:', error);
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