import React, { useEffect, useMemo, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import {
  SocketContext,
  SocketContextType,
  SocketError,
} from "./socket.context";

interface SocketProviderProps {
  children: React.ReactNode;
  userName: string;
}

export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  userName,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState<SocketError | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    if (!backendUrl) {
      const envError: SocketError = {
        type: "generic",
        message:
          "VITE_BACKEND_URL no está definida en las variables de entorno",
        timestamp: new Date(),
      };
      setError(envError);
      console.error(envError.message);
      return;
    }

    // Limpiar error previo al intentar reconectar
    setError(null);

    // Crear conexión con la api socket
    const newSocket = io(backendUrl, {
      auth: {
        username: userName,
      },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });
    socketRef.current = newSocket;

    // Evento: Conexión exitosa
    newSocket.on("connect", () => {
      console.log("Socket.IO conectado:", newSocket.id);
      setIsConnected(true);
      setSocket(newSocket);
      setError(null); // Limpiar errores al conectar exitosamente
    });

    // Evento: Desconexión
    newSocket.on("disconnect", (reason) => {
      console.log("Socket.IO desconectado:", reason);
      setIsConnected(false);

      // Solo guardar como error si no fue una desconexión intencional
      if (reason !== "io client disconnect") {
        const disconnectError: SocketError = {
          type: "connection",
          message: `Desconectado del servidor: ${reason}`,
          timestamp: new Date(),
          details: { reason },
        };
        setError(disconnectError);
      }
    });

    // Evento: Error de conexión
    newSocket.on("connect_error", (err) => {
      console.error("Error de conexión Socket.IO:", err.message);

      const connectionError: SocketError = {
        type: "connection",
        message: err.message || "Error de conexión desconocido",
        timestamp: new Date(),
        details: {
          name: err.name,
          message: err.message,
          stack: err.stack,
          // Capturar información adicional si existe
          ...(err as any),
        },
      };
      setError(connectionError);
    });

    // Evento: Error de autenticación (si tu backend lo emite)
    newSocket.on("auth_error", (err) => {
      console.error("Error de autenticación:", err);

      const authError: SocketError = {
        type: "auth",
        message:
          typeof err === "string"
            ? err
            : err.message || "Error de autenticación",
        timestamp: new Date(),
        details: err,
      };
      setError(authError);
    });

    // Evento: Error genérico
    newSocket.on("error", (err) => {
      console.error("Error en Socket.IO:", err);

      const genericError: SocketError = {
        type: "generic",
        message:
          typeof err === "string" ? err : err.message || "Error desconocido",
        timestamp: new Date(),
        details: err,
      };
      setError(genericError);
    });

    // Cleanup al desmontar
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userName]);

  const sendMessage = (event: string, message: any) => {
    if (socket?.connected) {
      try {
        socket.emit(event, message);
      } catch (err: any) {
        const emitError: SocketError = {
          type: "generic",
          message: `Error al enviar mensaje: ${err.message}`,
          timestamp: new Date(),
          details: err,
        };
        setError(emitError);
        console.error("Error al enviar mensaje:", err);
      }
    } else {
      const notConnectedError: SocketError = {
        type: "connection",
        message: "No se puede enviar el mensaje: Socket no está conectado",
        timestamp: new Date(),
      };
      setError(notConnectedError);
      console.warn(notConnectedError.message);
    }
  };

  const on = (event: string, callback: (data: any) => void) => {
    if (socket) {
      socket.on(event, callback);
    }
  };

  const off = (event: string, callback?: (data: any) => void) => {
    if (socket) {
      socket.off(event, callback);
    }
  };

  // Función para limpiar errores manualmente
  const clearError = () => {
    setError(null);
  };

  const value: SocketContextType = useMemo(
    () => ({
      socket,
      isConnected,
      error,
      sendMessage,
      on,
      off,
      clearError,
    }),
    [socket, isConnected, error]
  );

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
