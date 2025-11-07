import ChatPage from "@/components/ChatPage";
import { ChatProvider } from "@/context/ChatContext";
import { useParams } from "react-router-dom";

const ChatHomePage = () => {
  const { userName } = useParams<{ userName: string }>();

  if(!userName) {
    return <span>NO SE HA INGRESADO EL NOMBRE DE UN USUARIO</span>
  }

  return (
    <ChatProvider username={userName}>
      <ChatPage />
    </ChatProvider>
  );
};

export default ChatHomePage;
