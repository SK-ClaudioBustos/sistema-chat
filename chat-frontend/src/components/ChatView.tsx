import React, { useState } from 'react';
import { Avatar, Button, Textarea } from 'flowbite-react';
import { HiPaperAirplane } from 'react-icons/hi';
import { User, Message } from '../types';

interface ChatViewProps {
  selectedUser: User | null;
  currentUserName: string;
}

const ChatView: React.FC<ChatViewProps> = ({ selectedUser, currentUserName }) => {
  const [message, setMessage] = useState('');
  
  // Mock messages for now - will be replaced with socket data
  const [messages] = useState<Message[]>([
    {
      id: '1',
      senderId: '1',
      receiverId: 'current',
      content: 'Hey! How are you?',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      senderId: 'current',
      receiverId: '1',
      content: 'I\'m doing great! Thanks for asking.',
      timestamp: new Date(Date.now() - 3000000),
    },
    {
      id: '3',
      senderId: '1',
      receiverId: 'current',
      content: 'That\'s awesome! Want to grab coffee later?',
      timestamp: new Date(Date.now() - 1800000),
    },
  ]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && selectedUser) {
      // TODO: Send message via socket
      console.log('Sending message:', message, 'to:', selectedUser.name);
      setMessage('');
    }
  };

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (!selectedUser) {
    return (
      <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-24 w-24 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Select a conversation
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            Choose a user from the list to start chatting
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
      {/* Chat Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center gap-3">
          <Avatar
            placeholderInitials={selectedUser.name.charAt(0).toUpperCase()}
            rounded
            status={selectedUser.online ? 'online' : 'offline'}
            statusPosition="bottom-right"
          />
          <div>
            <h2 className="font-semibold text-gray-900 dark:text-white">
              {selectedUser.name}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {selectedUser.online ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => {
          const isCurrentUser = msg.senderId === 'current';
          return (
            <div
              key={msg.id}
              className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                  isCurrentUser
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white'
                } rounded-lg px-4 py-2`}
              >
                <p className="break-words">{msg.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    isCurrentUser
                      ? 'text-blue-100'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}
                >
                  {formatTime(msg.timestamp)}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Message Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message ${selectedUser.name}...`}
            rows={1}
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage(e);
              }
            }}
          />
          <Button
            type="submit"
            disabled={!message.trim()}
            className="self-end"
          >
            <HiPaperAirplane className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ChatView;