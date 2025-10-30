import { Message, UserConnected } from "@/types/tipos";
import { MessageItem } from "./MessageItem";

interface MessageBox {
  messages: Message[];
  userData: UserConnected;
}

export const MessagesBox = ({ messages, userData }: MessageBox) => {
  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => (
        <MessageItem
          msg={msg}
          key={msg.id}
          isFromUser={userData.id === msg.senderId}
        />
      ))}
    </div>
  );
};
