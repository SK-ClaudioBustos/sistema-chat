import { UserAvatar } from "@/components/common/UserAvatar";
import { useChatContext } from "@/context/ChatContext";
import { UserConnected } from "@/types/tipos";
import { useEffect, useState } from "react";

export interface UserConnectedItemProps {
  user: UserConnected;
}

export const UserConnectedItem = ({ user }: UserConnectedItemProps) => {
  const { selectedUser, messages, messageCount, markMessagesAsRead, handleChangeSelectedChatUser } =
    useChatContext();
  const [showNewMessageIndicator, setShowNewMessageIndicator] =
    useState<boolean>(false);

  useEffect(() => {
    const messagesFromAnotherUser = messages.get(user.id) || [];
    const existenMensajesSinLeer = Boolean(
      messagesFromAnotherUser.filter((msg) => !msg.isRead).length
    );

    if (selectedUser && selectedUser.id === user.id) {
      markMessagesAsRead(user.id);
      setShowNewMessageIndicator(false);
    } else {
      if (existenMensajesSinLeer) {
        setShowNewMessageIndicator(true);
      }
    }
  }, [selectedUser, messageCount]);

  const changeSelectedUser = () => handleChangeSelectedChatUser(user);

  return (
    <button
      onClick={changeSelectedUser}
      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
        selectedUser && selectedUser?.id === user.id
          ? "bg-blue-50 dark:bg-blue-900/20"
          : "hover:bg-gray-50 dark:hover:bg-gray-700"
      }`}
    >
      <div className="flex items-center gap-3">
        <UserAvatar username={user.username} />
        <div className="flex-1 text-left">
          <p className="font-medium text-gray-900 dark:text-white">
            {user.username}
          </p>
        </div>
      </div>
      {showNewMessageIndicator && (
        <div className="size-3 rounded-full bg-green-300 shadow-[0_0_10px_2px_rgba(0,128,0,0.7)]"></div>
      )}
    </button>
  );
};
