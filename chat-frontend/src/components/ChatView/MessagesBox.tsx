import { Message } from "@/types/tipos";

export const MessagesBox = ({ messages }: { messages: Message[] }) => {

  const formatTime = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map((msg) => {
        const isCurrentUser = msg.senderId === "current";
        return (
          <div
            key={msg.id}
            className={`flex ${
              isCurrentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md xl:max-w-lg ${
                isCurrentUser
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white"
              } rounded-lg px-4 py-2`}
            >
              <p className="break-words">{msg.content}</p>
              <p
                className={`text-xs mt-1 ${
                  isCurrentUser
                    ? "text-blue-100"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {formatTime(msg.timestamp)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
