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
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 7l5 5m0 0l-5 5m5-5H6"
          />
        </svg>
      </span>
    </Button>
  );
};
