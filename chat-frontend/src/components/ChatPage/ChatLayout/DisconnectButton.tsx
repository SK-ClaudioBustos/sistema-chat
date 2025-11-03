import { HiLogout } from "react-icons/hi";
import { useNavigate } from "react-router-dom";

export const DisconnectButton = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
  };
  return (
    <button
      onClick={handleLogout}
      className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
      title="Logout"
    >
      <HiLogout className="w-5 h-5" />
    </button>
  );
};
