import { RightArrowIcon } from "@/icons/RightArrowIcon";
import { Button } from "flowbite-react";

export const LoginButton = ({
  userName,
  error,
}: {
  userName: string;
  error: string;
}) => {
  return (
    <Button
      type="submit"
      disabled={!userName.trim() || !!error}
      className="bg-gradient-to-r from-gray-700 to-gray-600 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
      aria-label="Join chat room"
    >
      <span className="flex items-center gap-2">
        Unirse al chat
        <RightArrowIcon />
      </span>
    </Button>
  );
};
