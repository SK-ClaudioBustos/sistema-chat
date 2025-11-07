import { useChatContext } from "@/context/ChatContext";
import { useSendMessages } from "@/hooks/useSendMessage";
import { Button, Textarea } from "flowbite-react";
import { KeyboardEvent } from "react";
import { HiPaperAirplane } from "react-icons/hi2";

export const MessageInput = () => {
  const { userData, selectedUser, handleSendMessages } = useChatContext();

  const { formRef, handleSubmitMessage } = useSendMessages(
    userData,
    selectedUser!,
    handleSendMessages
  );

  const handleOnKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={(e) => handleSubmitMessage(e)}
      className="border-t border-gray-700 p-4"
    >
      <div className="flex gap-2">
        <Textarea
          placeholder={`Enviar mensaje a ${selectedUser?.username}...`}
          rows={1}
          name="message"
          className="flex-1 px-4 py-2 min-h-9 bg-gray-700"
          onKeyDownCapture={handleOnKeyDown}
        />
        <Button
          type="submit"
          className="self-end bg-gray-600 rounded-full size-9 hover:bg-gray-700 cursor-pointer"
        >
          <HiPaperAirplane className="size-6" />
        </Button>
      </div>
    </form>
  );
};
