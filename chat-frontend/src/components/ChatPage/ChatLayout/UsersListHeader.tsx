import { useChatContext } from "@/context/ChatContext";
import { HiUsers } from "react-icons/hi";

export const UsersListConnected = () => {
  const { clientsConnected } = useChatContext();
  const clientsConnectedCount = clientsConnected.length;
  return (
    <div className="p-4 flex items-center gap-2">
      <HiUsers className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      <h2 className="font-semibold text-gray-900 dark:text-white">
        Usuarios conectados ({clientsConnectedCount})
      </h2>
    </div>
  );
};
