import { Message, UserConnected } from "@/types/tipos";
import { ChatHeader } from "./ChatView/ChatHeader";
import { MessageInput } from "./ChatView/MessageInput";
import { MessagesBox } from "./ChatView/MessagesBox";
import { NoChatSelected } from "./ChatView/NoChatSelected";

interface ChatViewProps {
  userData: UserConnected;
  selectedUser: UserConnected | null;
  messages: Message[];
  handleSendMessages: (message: Message) => void;
}

const ChatView = ({
  userData,
  selectedUser,
  messages,
  handleSendMessages,
}: ChatViewProps) => {
  if (!selectedUser) {
    return <NoChatSelected />;
  }

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
      <ChatHeader selectedUser={selectedUser} />
      <MessagesBox userData={userData} messages={messages} />
      <MessageInput
        handleSendMessages={handleSendMessages}
        selectedUser={selectedUser}
      />
    </div>
  );
};

export default ChatView;
