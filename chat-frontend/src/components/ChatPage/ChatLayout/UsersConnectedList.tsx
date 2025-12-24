import { useChatContext } from "@/context/ChatContext";
import { UserConnectedItem } from "./UserConnectedItem";

export const UsersConnectedList = () => {
  const { clientsConnected } = useChatContext();
  const clientsConnectedCount = clientsConnected.length;
  return (
    <div className="space-y-1 px-2">
      {clientsConnectedCount === 0 ? (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          Ningún usuario conectado
        </div>
      ) : (
        clientsConnected.map((user) => (
          <UserConnectedItem key={user.id} user={user} />
        ))
      )}
    </div>
  );
};
