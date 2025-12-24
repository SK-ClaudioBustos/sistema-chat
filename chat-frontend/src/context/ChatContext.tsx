import { useSocketIO } from "@/hooks/useSocketIO";
import { Message, UserConnected } from "@/types/tipos";
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Socket } from "socket.io-client";

interface ChatContextValue {
  username: string;
  clientsConnected: UserConnected[];
  selectedUser: UserConnected | null;
  messages: Map<string, Message[]>;
  isConnected: boolean;
  socket: Socket | null;
  userData: UserConnected | null;
  messageCount: number;
  handleChangeSelectedChatUser: (
    userChatSelected: UserConnected | null
  ) => void;
  handleSendMessages: (message: Message) => void;
  markMessagesAsRead: (userId: string) => void;
}

interface ChatProviderProps extends PropsWithChildren {
  username: string;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export const ChatProvider = ({ username, children }: ChatProviderProps) => {
  const [clientsConnected, setClientsConnected] = useState<UserConnected[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserConnected | null>(null);
  const [messageCount, setMessageCount] = useState<number>(0);
  const [messages, setMessages] = useState<Map<string, Message[]>>(
    new Map<string, Message[]>()
  );

  const handleChangeSelectedChatUser = useCallback(
    (userChatSelected: UserConnected | null) => {
      setSelectedUser(userChatSelected);
    },
    []
  );

  const handleOnClientsConnecteds = useCallback((clients: UserConnected[]) => {
    setClientsConnected(clients);
  }, []);

  const handleAddMessages = useCallback(
    (message: Message, fromLocalUser = false) => {
      try {
        setMessages((prevState) => {
          const newMap = new Map<string, Message[]>(prevState);
          const chatKey = fromLocalUser ? message.receiverId : message.senderId;
          const isRead = fromLocalUser;
          const currentMessages = newMap.get(chatKey) || [];
          newMap.set(chatKey, [...currentMessages, { ...message, isRead }]);
          return newMap;
        });
        setMessageCount(prevState => prevState + 1);
      } catch (error) {
        console.error("Error al añadir un mensaje ", error);
      }
    },
    []
  );

  const { isConnected, socket, userData, sendMessage } = useSocketIO({
    url: import.meta.env.VITE_WEBSOCKET_URL,
    username: username,
    onClientsChanged: handleOnClientsConnecteds,
    onMessage: handleAddMessages,
  });

  const handleSendMessages = useCallback(
    (message: Message) => {
      try {
        handleAddMessages(message, true);
        sendMessage(message);
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
      }
    },
    [sendMessage, handleAddMessages]
  );

  const markMessagesAsRead = useCallback((userId: string) => {
    setMessages((prevMessages) => {
      const updatedMessages = new Map(prevMessages);
      const userMessages = updatedMessages.get(userId) || [];
      updatedMessages.set(
        userId,
        userMessages.map((msg) => ({ ...msg, isRead: true }))
      );
      return updatedMessages;
    });
  }, []);

  const value: ChatContextValue = useMemo(
    () => ({
      username,
      clientsConnected,
      selectedUser,
      messages,
      isConnected,
      socket,
      userData,
      messageCount,
      handleChangeSelectedChatUser,
      handleSendMessages,
      markMessagesAsRead
    }),
    [
      username,
      clientsConnected,
      selectedUser,
      messages,
      isConnected,
      socket,
      userData,
      messageCount,
      handleChangeSelectedChatUser,
      handleSendMessages,
      markMessagesAsRead,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = (): ChatContextValue => {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error("useChatContext debe ser usado dentro de un ChatProvider");
  }

  return context;
};
