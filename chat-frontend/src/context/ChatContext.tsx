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

interface ChatContextValue {
  username: string;
  clientsConnected: UserConnected[];
  selectedUser: UserConnected | null;
  messages: Message[];
  isConnected: boolean;
  socket: any;
  userData: any;
  handleChangeSelectedChatUser: (userChatSelected: UserConnected | null) => void;
  handleSendMessages: (message: Message) => void;
}

interface ChatProviderProps extends PropsWithChildren {
  username: string;
}

const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export const ChatProvider = ({ username, children }: ChatProviderProps) => {
  const [clientsConnected, setClientsConnected] = useState<UserConnected[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserConnected | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleChangeSelectedChatUser = useCallback((userChatSelected: UserConnected | null) => {
    setSelectedUser(userChatSelected);
  }, []);

  const handleOnClientsConnecteds = useCallback((clients: UserConnected[]) => {
    setClientsConnected(clients);
  }, []);

  const handleAddMessages = useCallback((message: Message) => {
    setMessages((prevState) => [...prevState, message]);
  }, []);

  const { isConnected, socket, userData, sendMessage } = useSocketIO({
    url: import.meta.env.VITE_WEBSOCKET_URL,
    username: username || "userName",
    onClientsChanged: handleOnClientsConnecteds,
    onMessage: handleAddMessages,
  });

  const handleSendMessages = useCallback((message: Message) => {
    setMessages((prevState) => [...prevState, message]);
    sendMessage(message);
  }, [sendMessage]);

  const value: ChatContextValue = useMemo(
    () => ({
      username,
      clientsConnected,
      selectedUser,
      messages,
      isConnected,
      socket,
      userData,
      handleChangeSelectedChatUser,
      handleSendMessages,
    }),
    [
      username,
      clientsConnected,
      selectedUser,
      messages,
      isConnected,
      socket,
      userData,
      handleChangeSelectedChatUser,
      handleSendMessages,
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
