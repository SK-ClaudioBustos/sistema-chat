import { UserConnected } from "@/types/tipos";
import { Avatar } from "flowbite-react";

export const ChatHeader = ({
  selectedUser,
}: {
  selectedUser: UserConnected;
}) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center gap-3">
        <Avatar
          placeholderInitials={selectedUser.name.charAt(0).toUpperCase()}
          rounded
          status="online"
          statusPosition="bottom-right"
        />
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white">
            {selectedUser.name}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">Online</p>
        </div>
      </div>
    </div>
  );
};
