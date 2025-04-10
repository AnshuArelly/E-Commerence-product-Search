
import { ShoppingBag } from "lucide-react";
import { format } from "date-fns";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  products?: any[];
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const isAssistant = message.sender === 'assistant';
  
  return (
    <div className="flex items-start">
      {isAssistant ? (
        <div className="flex-shrink-0 bg-mall-primary/20 p-2 rounded-full mr-3">
          <ShoppingBag className="h-5 w-5 text-mall-primary" />
        </div>
      ) : (
        <div className="flex-shrink-0 bg-gray-200 p-2 rounded-full mr-3">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="20" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-gray-600"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
      )}
      
      <div className={`rounded-lg p-3 max-w-[80%] ${
        isAssistant ? 'bg-gray-100' : 'bg-mall-primary/10'
      }`}>
        <div className="text-sm text-gray-800 whitespace-pre-wrap">{message.content}</div>
        
        <div className="text-xs text-gray-500 mt-1">
          {format(new Date(message.timestamp), 'h:mm a')}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
