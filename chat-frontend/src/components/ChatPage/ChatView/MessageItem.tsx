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
    ? "bg-blue-800"
    : "bg-gray-800";
  return (
    <div className={`flex ${alignMessageClass}`}>
      <div
        className={`max-w-xs lg:max-w-md xl:max-w-lg ${backgroundColorMessageClasses} rounded-lg px-4 py-2 flex flex-col text-white`}
      >
        <p className="break-words">{content}</p>
        <p className="text-xs mt-1 self-end">
          {formatTime(fecha)}
        </p>
      </div>
    </div>
  );
};
