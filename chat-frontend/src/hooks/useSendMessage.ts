import { generarUUID } from "@/lib/generateUUID";
import { Message, UserConnected } from "@/types/tipos";
import { FormEvent, useRef } from "react";

export const useSendMessages = (
  userData: UserConnected,
  selectedUser: UserConnected,
  handleSendMessages: (messageData: Message) => void
) => {
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmitMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Obtengo el mensaje del formulario
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;
    const receiverId = selectedUser.id;
    const timestamp = new Date();

    // Envío el mensaje al destinatario
    const messageData: Message = {
      id: generarUUID(),
      content: message,
      senderId: userData.id,
      receiverId,
      timestamp,
    };
    handleSendMessages(messageData);

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
