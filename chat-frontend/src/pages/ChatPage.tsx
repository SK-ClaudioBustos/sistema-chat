import { SocketProvider } from "@/context/socket.provider";
import { UserConnected } from "@/types/tipos";
import ChatLayout from "@components/ChatLayout";
import ChatView from "@components/ChatView";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { userName } = useParams<{ userName: string }>();
  const [selectedUser, setSelectedUser] = useState<UserConnected | null>(null);
  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      <SocketProvider userName={userName!}>
        <ChatLayout
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
        />
        <ChatView selectedUser={selectedUser} />
      </SocketProvider>
    </div>
  );
};

export default ChatPage;
