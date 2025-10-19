import { useSocket } from "@/context/socket.context";
import { UserConnected } from "@/types/tipos";
import { FormEvent, useRef } from "react";

export const useSendMessages = (
  selectedUser: UserConnected,
  handleSendMessages: (message: string) => void
) => {
  const { userName, sendMessage } = useSocket();
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmitMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Obtengo el mensaje del formulario
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;
    const to = selectedUser.id;
    const actualDateTime = new Date();
    const dateTime = actualDateTime.toString();

    // Envío el mensaje al destinatario
    const messageData = {
      from: userName,
      message,
      to,
      dateTime,
    };
    sendMessage("send-message", messageData);

    // Agrego el mensaje enviado al chat
    handleSendMessages(message);

    // Limpio el formulario
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  return {
    formRef,
    handleSubmitMessage,
  };
};
