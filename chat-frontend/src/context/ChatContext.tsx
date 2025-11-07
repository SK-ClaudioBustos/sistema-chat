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

// Definición de tipos
interface ChatContextValue {
  username: string;
  clientsConnected: UserConnected[];
  selectedUser: UserConnected | null;
  messages: Message[];
  isConnected: boolean;
  socket: any;
  userData: any;
  handleChangeSelectedChatUser: (userChatSelected: UserConnected) => void;
  handleSendMessages: (message: Message) => void;
}

interface ChatProviderProps extends PropsWithChildren {
  username: string;
}

// Creación del contexto
const ChatContext = createContext<ChatContextValue | undefined>(undefined);

export const ChatProvider = ({ username, children }: ChatProviderProps) => {
  const [clientsConnected, setClientsConnected] = useState<UserConnected[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserConnected | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  // ✅ Memoizar con useCallback
  const handleChangeSelectedChatUser = useCallback((userChatSelected: UserConnected) => {
    setSelectedUser(userChatSelected);
  }, []); // Sin dependencias porque solo usa setState

  const handleOnClientsConnecteds = useCallback((clients: UserConnected[]) => {
    setClientsConnected(clients);
  }, []);

  const handleAddMessages = useCallback((message: Message) => {
    setMessages((prevState) => [...prevState, message]);
  }, []);

  // ⚠️ Esta función depende de sendMessage del hook
  const { isConnected, socket, userData, sendMessage } = useSocketIO({
    url: import.meta.env.VITE_WEBSOCKET_URL,
    username: username || "userName",
    onClientsChanged: handleOnClientsConnecteds,
    onMessage: handleAddMessages,
  });

  // ✅ Ahora memoizamos handleSendMessages con sendMessage como dependencia
  const handleSendMessages = useCallback((message: Message) => {
    setMessages((prevState) => [...prevState, message]);
    sendMessage(message);
  }, [sendMessage]); // Depende de sendMessage

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
      handleChangeSelectedChatUser, // ✅ Ahora sí incluir las funciones
      handleSendMessages,
    ]
  );

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

// Hook personalizado para consumir el contexto
export const useChatContext = (): ChatContextValue => {
  const context = useContext(ChatContext);

  if (context === undefined) {
    throw new Error("useChatContext debe ser usado dentro de un ChatProvider");
  }

  return context;
};
