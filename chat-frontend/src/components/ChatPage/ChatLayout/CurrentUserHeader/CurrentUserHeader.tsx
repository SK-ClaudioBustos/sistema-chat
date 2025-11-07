import { UserAvatar } from "@/components/common/UserAvatar";
import { DisconnectButton } from "./DisconnectButton";
import { UserHeaderTitle } from "./UserHeaderTitle";
import { useChatContext } from "@/context/ChatContext";

export const CurrentUserHeader = () => {
  const {  username } = useChatContext();
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <UserAvatar username={username} />
        <UserHeaderTitle />
        <DisconnectButton />
      </div>
    </div>
  );
};
