import { validateUsername } from "@/lib/functions";
import { Label, TextInput } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";

interface UsernameInputProps {
  userName: string;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  setUserName: Dispatch<SetStateAction<string>>;
}

export const UsernameInput = ({
  error,
  userName,
  setUserName,
  setError,
}: UsernameInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);

    if (value && !validateUsername(value)) {
      setError("Solamente se permiten letras y espacios");
    } else {
      setError("");
    }
  };
  return (
    <div>
      <div className="mb-2 block">
        <Label htmlFor="userName" className="text-white font-medium">
          Tu nombre
        </Label>
      </div>
      <TextInput
        style={{ padding: "0.5rem"}}
        id="userName"
        type="text"
        placeholder="John Doe"
        value={userName}
        onChange={handleInputChange}
        required
        autoFocus
        color={error ? "failure" : undefined}
        aria-invalid={!!error}
        aria-describedby={error ? "username-error" : undefined}
      />
      {error && (
        <p
          id="username-error"
          className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
          role="alert"
        >
          <svg
            className="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
};
