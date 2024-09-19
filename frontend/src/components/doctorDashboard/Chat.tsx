import React from 'react';
import {
  Box,
  Typography,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Paper,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { styled, useTheme } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  isCurrentUser: boolean;
}

const dummyMessages: Message[] = [
  {
    id: '1',
    sender: 'Alice',
    content: 'Hello, how are you?',
    timestamp: '10:00 AM',
    isCurrentUser: false,
  },
  {
    id: '2',
    sender: 'Bob',
    content: 'I am good, thanks! How about you?',
    timestamp: '10:02 AM',
    isCurrentUser: true,
  },
  {
    id: '3',
    sender: 'Alice',
    content: 'I am doing well, thank you!',
    timestamp: '10:05 AM',
    isCurrentUser: false,
  },
];

const Chat: React.FC = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Box sx={{ flex: '1 1 auto', overflow: 'auto' }}>
        <List>
          {dummyMessages.map((message) => (
            <ListItem key={message.id} sx={{ justifyContent: message.isCurrentUser ? 'flex-end' : 'flex-start' }}>
              {!message.isCurrentUser && (
                <ListItemAvatar>
                  <Avatar>{message.sender.charAt(0)}</Avatar>
                </ListItemAvatar>
              )}
              <Paper sx={{ padding: theme.spacing(1), maxWidth: '60%', backgroundColor: message.isCurrentUser ? '#e0f7fa' : '#f1f1f1' }}>
                <ListItemText
                  primary={message.content}
                  secondary={message.timestamp}
                  sx={{ textAlign: message.isCurrentUser ? 'right' : 'left' }}
                />
              </Paper>
            </ListItem>
          ))}
        </List>
      </Box>
      <Paper sx={{ padding: theme.spacing(2), display: 'flex', alignItems: 'center' }}>
        <TextField
          fullWidth
          placeholder="Type a message"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton>
                  <AttachFileIcon />
                </IconButton>
                <IconButton>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Paper>
    </Box>
  );
};

export default Chat;