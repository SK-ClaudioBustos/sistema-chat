import { useChatContext } from "@/context/ChatContext";
import { ChatHeader } from "./ChatView/ChatHeader";
import { MessageInput } from "./ChatView/MessageInput";
import { MessagesBox } from "./ChatView/MessagesBox";
import { NoChatSelected } from "./ChatView/NoChatSelected";

const ChatView = () => {
  const { selectedUser, clientsConnected } = useChatContext();
  const isUserSelectedConnected = clientsConnected.find((user) => user.id === selectedUser?.id);
  if (!selectedUser || isUserSelectedConnected === undefined) {
    return <NoChatSelected />;
  }
  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
      <ChatHeader selectedUser={selectedUser} />
      <MessagesBox />
      <MessageInput />
    </div>
  );
};

export default ChatView;
