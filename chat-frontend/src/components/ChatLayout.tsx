import React from 'react';
import { Avatar, Badge, Sidebar } from 'flowbite-react';
import { HiUsers, HiLogout } from 'react-icons/hi';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface ChatLayoutProps {
  currentUserName: string;
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({
  currentUserName,
  users,
  selectedUser,
  onSelectUser,
}) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
            {/* Current User Header */}
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3">
                <Avatar
                  placeholderInitials={currentUserName.charAt(0).toUpperCase()}
                  rounded
                  status="online"
                  statusPosition="bottom-right"
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {currentUserName}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Online
                  </p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  title="Logout"
                >
                  <HiLogout className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Users List Header */}
            <div className="p-4 flex items-center gap-2">
              <HiUsers className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <h2 className="font-semibold text-gray-900 dark:text-white">
                Online Users ({users.filter(u => u.online).length})
              </h2>
            </div>

            {/* Users List */}
            <div className="space-y-1 px-2">
              {users.map((user) => (
                <button
                  key={user.id}
                  onClick={() => onSelectUser(user)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    selectedUser?.id === user.id
                      ? 'bg-blue-50 dark:bg-blue-900/20'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  <Avatar
                    placeholderInitials={user.name.charAt(0).toUpperCase()}
                    rounded
                    status={user.online ? 'online' : 'offline'}
                    statusPosition="bottom-right"
                  />
                  <div className="flex-1 text-left">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {user.online ? 'Online' : 'Offline'}
                    </p>
                  </div>
                  {!user.online && (
                    <Badge color="gray" size="sm">
                      Away
                    </Badge>
                  )}
                </button>
              ))}
            </div>

            {users.length === 0 && (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                No users online
              </div>
            )}
      </div>
    </div>
  );
};

export default ChatLayout;