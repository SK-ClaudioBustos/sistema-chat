import { formatTime } from "@/lib/formatTime";
import { Message } from "@/types/tipos";

interface MessageItemProps {
  msg: Message;
  isFromUser: boolean;
}

export const MessageItem = ({ msg, isFromUser }: MessageItemProps) => {
  const { content, timestamp } = msg;
  const fecha = new Date(timestamp);
  const alignMessageClass = isFromUser ? "justify-end" : "justify-start";
  const backgroundColorMessageClasses = isFromUser
    ? "bg-blue-600 text-white"
    : "bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white";
  const textColorClasses = isFromUser
    ? "text-blue-100"
    : "text-gray-500 dark:text-gray-400";
  return (
    <div className={`flex ${alignMessageClass}`}>
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg ${backgroundColorMessageClasses} rounded-lg px-4 py-2`}
      >
        <p className="break-words">{content}</p>
        <p className={`text-xs mt-1 ${textColorClasses}`}>
          {formatTime(fecha)}
        </p>
      </div>
    </div>
  );
};
