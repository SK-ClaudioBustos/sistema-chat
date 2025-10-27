import { UserConnected } from "@/types/tipos";
import { HiUsers } from "react-icons/hi";

interface UsersListConnectedProps {
  usersConnected: UserConnected[];
}

export const UsersListConnected = ({
  usersConnected,
}: UsersListConnectedProps) => {
  return (
    <div className="p-4 flex items-center gap-2">
      <HiUsers className="w-5 h-5 text-gray-500 dark:text-gray-400" />
      <h2 className="font-semibold text-gray-900 dark:text-white">
        Online Users ({usersConnected.length})
      </h2>
    </div>
  );
};
