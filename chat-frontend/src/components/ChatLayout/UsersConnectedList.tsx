import { UserConnected } from "@/types/tipos";
import { Avatar } from "flowbite-react";

interface UsersConnectedListProps {
  usersConnected: UserConnected[];
  selectedUser: UserConnected | null;
  onSelectUser: (user: UserConnected) => void;
}

export const UsersConnectedList = ({
  usersConnected,
  selectedUser,
  onSelectUser
}: UsersConnectedListProps) => {
  return (
    <div className="space-y-1 px-2">
      {usersConnected.length === 0 ? (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          No users online
        </div>
      ) : (
        usersConnected.map((user) => (
          <button
            key={user.id}
            onClick={() => onSelectUser(user)}
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
              selectedUser && selectedUser?.id === user.id
                ? "bg-blue-50 dark:bg-blue-900/20"
                : "hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <Avatar
              placeholderInitials={user?.username.charAt(0).toUpperCase()}
              rounded
              statusPosition="bottom-right"
            />
            <div className="flex-1 text-left">
              <p className="font-medium text-gray-900 dark:text-white">
                {user.username}
              </p>
            </div>
          </button>
        ))
      )}
    </div>
  );
};
