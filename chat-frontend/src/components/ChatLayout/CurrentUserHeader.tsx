import { Avatar } from "flowbite-react";
import { HiLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

interface CurrentUserHeaderProps {
  userName: string;
  isConnected: boolean;
}

export const CurrentUserHeader = ({
  isConnected,
  userName,
}: CurrentUserHeaderProps) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };
  const connectionStatusLabel = isConnected ? "En línea" : "Desconectado";
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <Avatar
          placeholderInitials={userName?.charAt(0).toUpperCase()}
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
  );
};
