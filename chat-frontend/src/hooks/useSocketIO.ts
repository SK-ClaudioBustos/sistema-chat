import { Message, UserConnected } from "@/types/tipos";
import { useEffect, useRef, useState, useCallback } from "react";
import { io, Socket } from "socket.io-client";

interface UseSocketIOProps {
  url: string;
  username: string;
  onClientsChanged: (clients: UserConnected[]) => void;
  onMessage: (message: Message) => void;
}

export const useSocketIO = ({
  url,
  username,
  onClientsChanged,
  onMessage,
}: UseSocketIOProps) => {
  const [isConnected, setIsConnected] = useState(false);
  const [userData, setUserData] = useState<UserConnected | null>(null);
  const socketRef = useRef<Socket | null>(null);
  
  // ✅ Guardar los callbacks en refs para que no causen reconexiones
  const onClientsChangedRef = useRef(onClientsChanged);
  const onMessageRef = useRef(onMessage);

  // ✅ Actualizar las refs cuando cambien los callbacks
  useEffect(() => {
    onClientsChangedRef.current = onClientsChanged;
  }, [onClientsChanged]);

  useEffect(() => {
    onMessageRef.current = onMessage;
  }, [onMessage]);

  // ✅ Efecto del socket solo depende de url y username
  useEffect(() => {
    const socket = io(url, {
      auth: {
        username: username,
      },
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      
      // ✅ Actualizar userData cuando conecte
      setUserData({
        id: socket.id!,
        username: username,
      });
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("on-clients-changed", (clients: UserConnected[]) => {
      const filteredClients = clients.filter(
        (client) => client.id !== socket.id
      );
      // ✅ Usar la ref en lugar del callback directo
      onClientsChangedRef.current(filteredClients);
    });

    socket.on("message-to-client", (message) => {
      // ✅ Usar la ref en lugar del callback directo
      onMessageRef.current(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [url, username]); // ✅ Solo depende de url y username

  // ✅ Memoizar sendMessage para que sea estable
  const sendMessage = useCallback((message: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("send-message", message);
    }
  }, []); // Sin dependencias porque usa ref

  return {
    isConnected,
    socket: socketRef.current,
    userData,
    sendMessage,
  };
};