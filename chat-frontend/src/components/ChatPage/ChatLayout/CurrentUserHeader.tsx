import { UserAvatar } from "@/components/common/UserAvatar";
import { DisconnectButton } from "./DisconnectButton";

interface CurrentUserHeaderProps {
  userName: string;
  isConnected: boolean;
}

export const CurrentUserHeader = ({
  isConnected,
  userName,
}: CurrentUserHeaderProps) => {
  const connectionStatusLabel = isConnected ? "En línea" : "Desconectado";
  return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <UserAvatar username={userName} />
        <div className="flex-1">
          <p className="font-semibold text-gray-900 dark:text-white">
            {userName}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {connectionStatusLabel}
          </p>
        </div>
        <DisconnectButton />
      </div>
    </div>
  );
};
