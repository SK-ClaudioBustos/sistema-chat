import { User } from "@/types/tipos";
import ChatLayout from "@components/ChatLayout";
import ChatView from "@components/ChatView";
import { SocketProvider } from "@/context/socket.provider";
import { useParams } from "react-router-dom";
import { useState } from 'react';

const ChatPage = () => {
  const { userName } = useParams<{ userName: string }>();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Mock users for now - will be replaced with socket data
  const [users] = useState<User[]>([
    { id: "1", name: "Alice", online: true },
    { id: "2", name: "Bob", online: true },
    { id: "3", name: "Charlie", online: false },
  ]);

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      <SocketProvider userName={userName!}>
        <ChatLayout
          currentUserName={userName!}
          users={users}
          selectedUser={selectedUser}
          onSelectUser={setSelectedUser}
        />
        <ChatView selectedUser={selectedUser} currentUserName={userName!} />
      </SocketProvider>
    </div>
  );
};

export default ChatPage;
