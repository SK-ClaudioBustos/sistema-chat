import { useChatContext } from "@/context/ChatContext";
import { ChatHeader } from "./ChatView/ChatHeader";
import { MessageInput } from "./ChatView/MessageInput";
import { MessagesBox } from "./ChatView/MessagesBox";
import { NoChatSelected } from "./ChatView/NoChatSelected";

const ChatView = () => {
  const { selectedUser } = useChatContext();
  if (!selectedUser) {
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
