import { CurrentUserHeader } from "./ChatLayout/CurrentUserHeader/CurrentUserHeader";
import { UsersConnectedList } from "./ChatLayout/UsersConnectedList";
import { UsersListConnected } from "./ChatLayout/UsersListHeader";

const ChatLayout = () => {
  return (
    <div className="w-80 border-r border-gray-700 bg-gray-800 flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <CurrentUserHeader />
        <UsersListConnected />
        <UsersConnectedList />
      </div>
    </div>
  );
};

export default ChatLayout;
