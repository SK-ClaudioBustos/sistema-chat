import { UserConnected } from "@/types/tipos";
import { UserConnectedItem } from "./UserConnectedItem";

interface UsersConnectedListProps {
  usersConnected: UserConnected[];
  selectedUser: UserConnected | null;
  onSelectUser: (user: UserConnected) => void;
}

export const UsersConnectedList = ({
  usersConnected,
  selectedUser,
  onSelectUser
}: UsersConnectedListProps) => {
  return (
    <div className="space-y-1 px-2">
      {usersConnected.length === 0 ? (
        <div className="p-4 text-center text-gray-500 dark:text-gray-400">
          No users online
        </div>
      ) : (
        usersConnected.map((user) => (
          <UserConnectedItem key={user.id} user={user} selectedUser={selectedUser} onSelectUser={onSelectUser}/>
        ))
      )}
    </div>
  );
};
