import { useChatContext } from "@/context/ChatContext";
import { CloseIcon } from "@/icons/CloseIcon";

export const CloseChatButton = () => {
  const { handleChangeSelectedChatUser } = useChatContext();

  const handleCloseChat = () => {
    handleChangeSelectedChatUser(null);
  };

  return (
    <button
      onClick={handleCloseChat}
      type="button"
      aria-label="Close chat"
      className="text-white hover:cursor-pointer text-lg"
    >
      <CloseIcon />
    </button>
  );
};
