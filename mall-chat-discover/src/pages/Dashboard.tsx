import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatSidebar from "@/components/chat/ChatSidebar";
import ChatInterface from "@/components/chat/ChatInterface";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

const Dashboard = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<{ id: string, title: string, lastMessage: string, timestamp: string }[]>([]);
  const [resetMessages, setResetMessages] = useState(false); // State to trigger reset

  useEffect(() => {
    // Initialize chat history from localStorage
    const savedChats = JSON.parse(localStorage.getItem('chats') || '[]');
    setChats(savedChats);

    // Set initial chat (first chat from saved chats or default)
    const initialChatId = savedChats.length > 0 ? savedChats[0].id : null;
    setCurrentChatId(initialChatId);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const createNewChat = () => {
    const newChatId = Math.random().toString(36).substr(2, 9);
    const newChat = {
      id: newChatId,
      title: 'New Conversation',
      lastMessage: 'Start a new product discovery conversation',
      timestamp: 'Just now'
    };

    const updatedChats = [newChat, ...chats];
    setChats(updatedChats);
    setCurrentChatId(newChatId);
    setResetMessages(true); // Trigger reset of messages in ChatInterface
    
    // Save to localStorage
    localStorage.setItem('chats', JSON.stringify(updatedChats));

    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const selectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    setResetMessages(false); // Prevent resetting when selecting an existing chat
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-mall-light">
      <DashboardHeader onMenuToggle={toggleMobileMenu} />
      
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar 
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
          chats={chats}
          currentChatId={currentChatId}
          onChatSelect={selectChat}
          onNewChat={createNewChat}
        />
        
        <main className="flex-1 flex flex-col">
          <ChatInterface 
            chatId={currentChatId}
            onNewChat={createNewChat}
            resetMessages={resetMessages}  // Pass resetMessages state
          />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
