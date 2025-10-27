import { useSendMessages } from "@/hooks/useSendMessage";
import { UserConnected } from "@/types/tipos";
import { Button, Textarea } from "flowbite-react";
import { KeyboardEvent } from "react";
import { HiPaperAirplane } from "react-icons/hi";

interface MessageInputProps {
  userData: UserConnected;
  selectedUser: UserConnected;
  handleSendMessages: (message: any) => void;
}

export const MessageInput = ({
  userData,
  selectedUser,
  handleSendMessages,
}: MessageInputProps) => {
  const { formRef, handleSubmitMessage } = useSendMessages(
    userData,
    selectedUser,
    handleSendMessages
  );

  const handleOnKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      formRef.current?.requestSubmit();
    }
  };

  return (
    <div className="border-t border-gray-200 dark:border-gray-700 p-4">
      <form
        ref={formRef}
        onSubmit={(e) => handleSubmitMessage(e)}
        className="flex gap-2"
      >
        <Textarea
          placeholder={`Message ${selectedUser.username}...`}
          rows={1}
          name="message"
          className="flex-1 px-4 py-2 min-h-9"
          onKeyDownCapture={handleOnKeyDown}
        />
        <Button type="submit" className="self-end">
          <HiPaperAirplane className="h-5 w-5" />
        </Button>
      </form>
    </div>
  );
};
