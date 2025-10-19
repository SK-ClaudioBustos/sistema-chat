import { useSocket } from "@/context/socket.context";
import { UserConnected } from "@/types/tipos";
import { Avatar } from "flowbite-react";
import React from "react";
import { HiLogout, HiUsers } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface ChatLayoutProps {
  selectedUser: UserConnected | null;
  onSelectUser: (user: UserConnected) => void;
}

const ChatLayout: React.FC<ChatLayoutProps> = ({
  selectedUser,
  onSelectUser,
}) => {
  const navigate = useNavigate();
  const { userName, isConnected, usersConnected } = useSocket();
  const handleLogout = () => {
    navigate("/");
  };
  const connectionStatusLabel = isConnected ? "Online" : "Offline";
  return (
    <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        {/* Current User Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <Avatar
              placeholderInitials={userName.charAt(0).toUpperCase()}
              rounded
              status="online"
              statusPosition="bottom-right"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-900 dark:text-white">
                {userName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {connectionStatusLabel}
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
            Online Users ({usersConnected.length})
          </h2>
        </div>

        {/* usersConnected List */}
        <div className="space-y-1 px-2">
          {usersConnected.map((user) => (
            <button
              key={user.id}
              onClick={() => onSelectUser(user)}
              className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                selectedUser?.id === user.id
                  ? "bg-blue-50 dark:bg-blue-900/20"
                  : "hover:bg-gray-50 dark:hover:bg-gray-700"
              }`}
            >
              <Avatar
                placeholderInitials={user.name.charAt(0).toUpperCase()}
                rounded
                statusPosition="bottom-right"
              />
              <div className="flex-1 text-left">
                <p className="font-medium text-gray-900 dark:text-white">
                  {user.name}
                </p>
              </div>
            </button>
          ))}
        </div>

        {usersConnected.length === 0 && (
          <div className="p-4 text-center text-gray-500 dark:text-gray-400">
            No users online
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLayout;
