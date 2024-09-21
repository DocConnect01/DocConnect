import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

interface Message {
  MessageID: number | string;
  ChatroomID: number;
  SenderID: number;
  MessageText: string;
  Sender: {
    UserID: number;
    Username: string;
    FirstName: string;
  };
  SentAt: string;
  createdAt: string;
  updatedAt: string;
}

interface ChatMessagesProps {
  roomId: number;
  socket: any;
}

const ChatMessages: React.FC<ChatMessagesProps> = ({ roomId, socket }) => {
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

    socket.on('chat_message', (message: Message) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      socket.off('chat_message');
    };
  }, [roomId, socket]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData: Partial<Message> = {
      ChatroomID: roomId,
      MessageText: newMessage.trim(),
      Sender: {
        UserID: parseInt(localStorage.getItem('userId') || '0', 10),
        Username: localStorage.getItem('username') || '',
        FirstName: localStorage.getItem('firstName') || '',
      },
      SentAt: new Date().toISOString(),
      MessageID: `temp-${Date.now()}`, // Temporary ID for optimistic UI update
    };

    try {
      socket.emit('chat_message', messageData);
      setNewMessage('');
      setMessages(prevMessages => [...prevMessages, messageData as Message]);

      const response = await axios.post("http://localhost:5000/api/chats/message", {
        chatroomId: roomId,
        messageText: newMessage.trim()
      }, {
        headers: { 
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });

      // Update the message with the real ID from the server
      setMessages(prevMessages =>
        prevMessages.map(msg => 
          msg.MessageID === messageData.MessageID ? { ...msg, MessageID: response.data.MessageID } : msg
        )
      );
    } catch (error) {
      console.error('Error sending message:', error);
      // Remove the optimistically added message if the server request fails
      setMessages(prevMessages => prevMessages.filter(msg => msg.MessageID !== messageData.MessageID));
    }
  };

  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Messages</Typography>
      <List sx={{ flex: 1, overflow: 'auto' }}>
        {messages.map((message) => (
          <ListItem key={`${message.MessageID}-${message.SentAt}`}>
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
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSendMessage();
              e.preventDefault(); // Prevent default Enter behavior
            }
          }}
        />
        <Button variant="contained" onClick={handleSendMessage} sx={{ ml: 1 }}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default ChatMessages;