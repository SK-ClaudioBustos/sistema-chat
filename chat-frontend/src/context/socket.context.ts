import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

// Tipo para almacenar información completa del error
export interface SocketError {
  type: "connection" | "auth" | "transport" | "generic";
  message: string;
  timestamp: Date;
  details?: any;
  code?: string | number;
}

export interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  error: SocketError | null;
  sendMessage: (event: string, message: any) => void;
  on: (event: string, callback: (data: any) => void) => void;
  off: (event: string, callback?: (data: any) => void) => void;
  clearError: () => void;
}

const initValue: SocketContextType = {
  socket: null,
  isConnected: false,
  error: null,
  sendMessage: () => {},
  on: () => {},
  off: () => {},
  clearError: () => {},
};

export const SocketContext = createContext<SocketContextType>(initValue);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error("useSocket debe ser usado dentro de un SocketProvider");
  }
  return context;
};
