import { UserConnected } from "@/types/tipos";
import { FC } from "react";
import { CurrentUserHeader } from "./ChatLayout/CurrentUserHeader";
import { UsersConnectedList } from "./ChatLayout/UsersConnectedList";
import { UsersListConnected } from "./ChatLayout/UsersListHeader";

interface ChatLayoutProps {
  userName: string;
  selectedUser: UserConnected | null;
  isConnected: boolean;
  usersConnected: UserConnected[];
  onSelectUser: (user: UserConnected) => void;
}

const ChatLayout: FC<ChatLayoutProps> = ({
  userName,
  isConnected,
  selectedUser,
  usersConnected,
  onSelectUser,
}) => {
  return (
    <div className="w-80 border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <CurrentUserHeader isConnected={isConnected} userName={userName} />
        <UsersListConnected usersConnected={usersConnected} />
        <UsersConnectedList
          usersConnected={usersConnected}
          selectedUser={selectedUser}
          onSelectUser={onSelectUser}
        />
      </div>
    </div>
  );
};

export default ChatLayout;
