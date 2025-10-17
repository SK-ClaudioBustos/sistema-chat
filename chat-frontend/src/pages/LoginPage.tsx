import { Button, Card, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateUsername = (name: string): boolean => {
    // Only allow letters and spaces
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(name);
  };

  const sanitizeUsername = (name: string): string => {
    // Convert to lowercase and replace spaces with underscores
    return name.toLowerCase().replace(/\s+/g, "_");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserName(value);

    if (value && !validateUsername(value)) {
      setError("Only letters and spaces are allowed");
    } else {
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = userName.trim();

    if (!trimmedName) {
      setError("Please enter your name");
      return;
    }

    if (!validateUsername(trimmedName)) {
      setError("Only letters and spaces are allowed");
      return;
    }

    const sanitizedName = sanitizeUsername(trimmedName);
    navigate(`/chat/${sanitizedName}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-ocean-900 via-secondary-800 to-primary-900">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-info-500/10 rounded-full blur-3xl"></div>
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl border-primary-700/50 bg-white/95 dark:bg-secondary-900/95 backdrop-blur-sm">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6"
          aria-label="Login form"
        >
          {/* Logo/Icon */}
          <div className="flex justify-center mb-2">
            <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-info-500 rounded-2xl flex items-center justify-center shadow-lg">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
            </div>
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-ocean-600 bg-clip-text text-transparent mb-2">
              Welcome to Chat App
            </h1>
            <p className="text-secondary-600 dark:text-secondary-300">
              Enter your name to start chatting
            </p>
          </div>

          <div>
            <div className="mb-2 block">
              <Label
                htmlFor="userName"
                className="text-secondary-700 dark:text-secondary-200 font-medium"
              >
                Your name
              </Label>
            </div>
            <TextInput
              id="userName"
              type="text"
              placeholder="John Doe"
              value={userName}
              onChange={handleInputChange}
              required
              autoFocus
              color={error ? "failure" : undefined}
              className="focus:ring-primary-500 focus:border-primary-500"
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

          <Button
            type="submit"
            disabled={!userName.trim() || !!error}
            className="bg-gradient-to-r from-primary-600 to-ocean-600 hover:from-primary-700 hover:to-ocean-700 focus:ring-4 focus:ring-primary-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            aria-label="Join chat room"
          >
            <span className="flex items-center gap-2">
              Join Chat
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
        </form>
      </Card>
    </div>
  );
};

export default LoginPage;