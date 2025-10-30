import ChatLayout from "@/components/ChatPage/ChatLayout";
import ChatView from "@/components/ChatPage/ChatView";
import { useSocketIO } from "@/hooks/useSocketIO";
import { Message, UserConnected } from "@/types/tipos";
import { useState } from "react";
import { useParams } from "react-router-dom";

const ChatPage = () => {
  const { userName } = useParams<{ userName: string }>();
  const [clientsConnected, setClientsConnected] = useState<UserConnected[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserConnected | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChangeSelectedChatUser = (userChatSelected: UserConnected) => {
    setSelectedUser(userChatSelected);
  };
  const handleOnClientsConnecteds = (clients: UserConnected[]) => {
    setClientsConnected(clients);
  };
  const handleAddMessages = (message: Message) => {
    setMessages((prevState) => [...prevState, message]);
  };
  const handleSendMessages = (message: Message) => {
    setMessages((prevState) => [...prevState, message]);
    sendMessage(message);
  };

  const { isConnected, socket, userData, sendMessage } = useSocketIO({
    url: import.meta.env.VITE_WEBSOCKET_URL,
    username: userName || "userName",
    onClientsChanged: handleOnClientsConnecteds,
    onMessage: handleAddMessages,
  });

  if (!userName || !socket || !userData) {
    return (
      <div>
        <span>Cargando Datos del usuario</span>
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      <ChatLayout
        usersConnected={clientsConnected}
        userName={userName}
        isConnected={isConnected}
        selectedUser={selectedUser}
        onSelectUser={handleChangeSelectedChatUser}
      />
      <ChatView
        userData={userData}
        messages={messages}
        selectedUser={selectedUser}
        handleSendMessages={handleSendMessages}
      />
    </div>
  );
};

export default ChatPage;
