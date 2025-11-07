import { useChatContext } from "@/context/ChatContext";

export const UserHeaderTitle = () => {
  const { isConnected, username } = useChatContext();
  const connectionStatusLabel = isConnected ? "En línea" : "Desconectado";
  return (
    <div className="flex-1">
      <p className="font-semibold text-gray-900 dark:text-white">{username}</p>
      <p className="text-sm text-gray-500 dark:text-gray-400">
        {connectionStatusLabel}
      </p>
    </div>
  );
};
