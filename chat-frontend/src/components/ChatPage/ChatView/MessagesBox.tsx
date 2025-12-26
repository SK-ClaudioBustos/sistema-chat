import { useChatContext } from "@/context/ChatContext";
import { MessageItem } from "./MessageItem";

export const MessagesBox = () => {
  const { messages, selectedUser, userData } = useChatContext();
  const userSelectedMessages = messages.get(`${selectedUser?.id}`) || [];
  return (
    <div
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-900"
      style={{
        backgroundImage:
          "radial-gradient(circle, #1E2939 2px, transparent 2px)",
        backgroundSize: "25px 25px",
      }}
    >
      {userSelectedMessages.map((msg) => (
        <MessageItem
          msg={msg}
          key={msg.id}
          isFromUser={userData.id === msg.senderId}
        />
      ))}
    </div>
  );
};
