import { UserAvatar } from "@/components/common/UserAvatar";
import { UserConnected } from "@/types/tipos";

export const ChatHeader = ({
  selectedUser,
}: {
  selectedUser: UserConnected;
}) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="flex items-center gap-3">
      <UserAvatar username={selectedUser.username}/>
        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white">
            {selectedUser.username}
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">En línea</p>
        </div>
      </div>
    </div>
  );
};
