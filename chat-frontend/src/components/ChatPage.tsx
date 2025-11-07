import ChatLayout from "@/components/ChatPage/ChatLayout";
import ChatView from "@/components/ChatPage/ChatView";

const ChatPage = () => {
  return (
    <div className="h-screen flex bg-gray-900">
      <ChatLayout />
      <ChatView />
    </div>
  );
};

export default ChatPage;
