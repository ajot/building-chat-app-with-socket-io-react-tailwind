// ChatUI.js
import React, { forwardRef } from 'react';

const ChatUI = forwardRef(({ username, setUsername, message, setMessage, handleKeyDown, sendMessage, messages }, ref) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-4">My Chat App</h1>
      <div className="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-md p-4">
        <div className="mb-4">
          <input 
            type="text" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded mb-3"
            placeholder="Username"
          />
          <input 
            ref={ref}
            type="text" 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full p-2 border border-gray-300 rounded mb-3"
            placeholder="Type a message..."
          />
          <button 
            onClick={sendMessage}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Send
          </button>
        </div>
        <div className="overflow-y-auto h-64">
          {messages.map((msg, index) => (
            <div key={index} className={`flex items-center p-1 ${msg.username === username ? 'justify-end' : 'justify-start'}`}>
              {/* Display avatar next to message */}
              <img src={msg.avatar} alt="Avatar" className="w-8 h-8 rounded-full mr-2" />
              <p className={`${msg.username === username ? 'text-right' : 'text-left'} text-gray-700`}>
                <strong>{msg.username}: </strong> {msg.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default ChatUI;