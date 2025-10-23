import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface UseSocketIOProps {
  url: string;
  username: string;
  onClientsChanged?: (clients: any[]) => void;
  onMessage?: (message: any) => void;
}

export const useSocketIO = ({
  url,
  username,
  onClientsChanged,
  onMessage,
}: UseSocketIOProps) => {
  const [isConnected, setIsConnected] = useState(false);
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

    socket.on("on-clients-changed", (clients) => {
      onClientsChanged?.(clients);
    });

    socket.on("message-to-client", (message) => {
      onMessage?.(message);
    });

    return () => {
      socket.disconnect();
    };
  }, [url, username, onClientsChanged, onMessage]);

  const sendMessage = (message: any) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit("send-message", message);
    }
  };

  return {
    isConnected,
    sendMessage,
    socket: socketRef.current,
  };
};
