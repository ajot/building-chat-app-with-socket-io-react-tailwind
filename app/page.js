"use client"; // Directive to specify that this is a client-side component in Next.js

import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import ChatUI from './ChatUI'; // Import the ChatUI component

let socket;

export default function Page() {
  // Arrays of random names and colors for user avatars
  const randomNames = ["BlueRaven", "QuietStorm", "Sunshine", "CrazyArtist", "MoonWalker", "StarGazer", "OceanDreamer", "MysticTraveler", "DigitalWizard", "GalaxyDefender"];
  const randomColors = ["E6E6FA", "FFC0CB", "FFD700", "98FB98", "AFEEEE", "DB7093", "FFA07A", "20B2AA", "87CEFA", "778899"];
  
  const [username, setUsername] = useState(randomNames[Math.floor(Math.random() * randomNames.length)]);
  const [avatarColor, setAvatarColor] = useState(randomColors[Math.floor(Math.random() * randomColors.length)]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const messageInputRef = useRef(null);

  useEffect(() => {
    socket = io('http://localhost:3001');

    socket.on('chat message', (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    // Focus the message input field when the component mounts
    if (messageInputRef.current) {
      messageInputRef.current.focus();
    }

    return () => {
      socket.off('chat message');
    };
  }, []);

  const sendMessage = () => {
    if (message) {
      const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${avatarColor}&color=fff`;
      socket.emit('chat message', { username, text: message, avatar: avatarUrl });
      setMessage('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <ChatUI 
      username={username}
      setUsername={setUsername}
      message={message}
      setMessage={setMessage}
      handleKeyDown={handleKeyDown}
      sendMessage={sendMessage}
      messages={messages}
      ref={messageInputRef}
    />
  );
}