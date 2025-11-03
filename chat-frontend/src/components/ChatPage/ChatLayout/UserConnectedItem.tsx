import { generateTailwindColor } from "@/lib/functions";
import { UserConnected } from "@/types/tipos";
import { Avatar } from "flowbite-react";

interface UserConnectedItemProps {
  user: UserConnected;
  selectedUser: UserConnected | null;
  onSelectUser: (user: UserConnected) => void;
}

export const UserConnectedItem = ({
  selectedUser,
  user,
  onSelectUser,
}: UserConnectedItemProps) => {
  const bgColorClass = generateTailwindColor(user.username);
  return (
    <button
      onClick={() => onSelectUser(user)}
      className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
        selectedUser && selectedUser?.id === user.id
          ? "bg-blue-50 dark:bg-blue-900/20"
          : "hover:bg-gray-50 dark:hover:bg-gray-700"
      }`}
    >
      <Avatar className={bgColorClass} />
      <div className="flex-1 text-left">
        <p className="font-medium text-gray-900 dark:text-white">
          {user.username}
        </p>
      </div>
    </button>
  );
};
