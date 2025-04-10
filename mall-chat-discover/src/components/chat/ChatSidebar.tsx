
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ShoppingBag } from "lucide-react";

interface Chat {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  chats: Chat[];
  currentChatId: string | null;
  onChatSelect: (chatId: string) => void;
  onNewChat: () => void;
}

const ChatSidebar = ({
  isOpen,
  onClose,
  chats,
  currentChatId,
  onChatSelect,
  onNewChat,
}: ChatSidebarProps) => {
  return (
    <div
      className={`bg-white border-r border-gray-200 md:w-80 flex flex-col fixed md:static inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
      } transition-transform duration-200 ease-in-out z-30 w-3/4 sm:w-96`}
    >
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <ShoppingBag className="h-6 w-6 text-mall-primary" />
          <span className="ml-2 font-semibold text-lg">MallChat</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden"
          onClick={onClose}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </Button>
      </div>

      <div className="p-4">
        <Button
          onClick={onNewChat}
          className="w-full bg-mall-primary hover:bg-mall-dark"
        >
          New Chat
        </Button>
      </div>

      <ScrollArea className="flex-1 px-4 pb-4">
        <div className="space-y-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onChatSelect(chat.id)}
              className={`w-full text-left p-3 rounded-lg transition-colors hover:bg-gray-100 ${
                chat.id === currentChatId ? "bg-mall-primary/10 border border-mall-primary/20" : ""
              }`}
            >
              <div className="font-medium text-sm line-clamp-1">{chat.title}</div>
              <div className="text-xs text-gray-500 line-clamp-1 mt-1">
                {chat.lastMessage}
              </div>
              <div className="text-xs text-gray-400 mt-1">{chat.timestamp}</div>
            </button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t border-gray-200">
        <div className="text-xs text-gray-500">
          MallChat - Your Shopping Assistant
        </div>
      </div>
    </div>
  );
};

export default ChatSidebar;
