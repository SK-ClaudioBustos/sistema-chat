import { Message, UserConnected } from "@/types/tipos";
import { useEffect, useRef, useState } from "react";
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
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("on-clients-changed", (clients: UserConnected[]) => {
      const filteredClients = clients.filter(
        (client) => client.id !== socket.id
      );
      onClientsChanged(filteredClients);
    });

    socket.on("message-to-client", (message) => {
      onMessage(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [url, username, onClientsChanged, onMessage]);

  useEffect(() => {
    if (username && socketRef.current?.id) {
      setUserData({
        id: socketRef.current.id,
        username: username,
      });
    }
  }, [username, socketRef.current]);

  const sendMessage = (message: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("send-message", message);
    }
  };

  return {
    isConnected,
    socket: socketRef.current,
    userData,
    sendMessage,
  };
};
