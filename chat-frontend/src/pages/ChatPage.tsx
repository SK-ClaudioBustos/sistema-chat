import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ChatLayout from '../components/ChatLayout';
import ChatView from '../components/ChatView';
import { User } from '../types';

const ChatPage: React.FC = () => {
  const { userName } = useParams<{ userName: string }>();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Mock users for now - will be replaced with socket data
  const [users] = useState<User[]>([
    { id: '1', name: 'Alice', online: true },
    { id: '2', name: 'Bob', online: true },
    { id: '3', name: 'Charlie', online: false },
  ]);

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      <ChatLayout
        currentUserName={userName || 'Guest'}
        users={users}
        selectedUser={selectedUser}
        onSelectUser={setSelectedUser}
      />
      <ChatView
        selectedUser={selectedUser}
        currentUserName={userName || 'Guest'}
      />
    </div>
  );
};

export default ChatPage;