import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ShoppingBag } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "./ChatMessage";
import axios from 'axios'; // Import axios
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown

// ✅ Import and initialize Gemini AI
import { GoogleGenerativeAI } from "@google/generative-ai";
const API_KEY = "AIzaSyDAGc5u8jOjEOHsivZIlrYDSqrtbLS_jCE"; // Replace with your actual API key
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

interface ChatInterfaceProps {
  chatId: string | null;
  onNewChat: () => void;
  resetMessages: boolean; // New prop to reset messages
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'assistant';
  timestamp: Date;
  products?: string[]; // Adjusted to store URLs of product images
  query?: string; // Store the query for generating dynamic links
  response?: string; // Add a field for the response from Gemini AI
}

const ChatInterface = ({ chatId, onNewChat, resetMessages }: ChatInterfaceProps) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [useOpenAI, setUseOpenAI] = useState(false); // State for checkbox
  const messageEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (resetMessages) {
      setMessages([]); // Clear messages when a new chat is created
      setInput('');
      setIsTyping(false);
    }

    if (chatId) {
      // Load chat messages from localStorage
      const savedChats = JSON.parse(localStorage.getItem('chats') || '[]');
      const currentChat = savedChats.find((chat: { id: string }) => chat.id === chatId);
      if (currentChat) {
        setMessages(currentChat.messages || []);
      }
    }
  }, [resetMessages, chatId]); // Runs when resetMessages or chatId changes

  const handleSendMessage = async () => {
    if (!input.trim()) return;
  
    const userMessage: Message = {
      id: `msg-${Date.now()}`,
      content: input,
      sender: 'user',
      timestamp: new Date(),
      query: input, // Store the query in the message
    };
  
    setMessages([...messages, userMessage]);
    setInput('');
    setIsTyping(true);
  
    console.log("Sending message to Gemini API...");
  
    try {
      let assistantMessage;
  
      if (useOpenAI) {
        // Using Gemini API to generate response
        const result = await model.generateContent(input);
        const geminiResponse = await result.response.text(); // Fetch text response
  
        console.log("Gemini AI Response: ", geminiResponse);
  
        assistantMessage = {
          id: `msg-${Date.now() + 1}`,
          content: geminiResponse, // Use the response from Gemini
          sender: 'assistant',
          timestamp: new Date(),
          response: geminiResponse, // Store response in the message object
        };
      } else {
        // Using your fallback API (axios call)
        const response = await axios.get('https://e-commerence-product-search.onrender.com/search', {
          params: { query: input },
        });
  
        console.log("API Response: ", response.data);
  
        const data = response.data;
  
        assistantMessage = {
          id: `msg-${Date.now() + 1}`,
          content: `Here are some products I found for "${input}"`,
          sender: 'assistant',
          timestamp: new Date(),
          products: data.amazon || data.flipkart || [],
          query: input, // Store query for dynamic links
        };
      }
  
      // Ensure only one message is added to the chat
      setMessages((prevMessages) => [...prevMessages, assistantMessage]);
  
      setIsTyping(false);
  
      // Save the updated chat data to localStorage
      const savedChats = JSON.parse(localStorage.getItem('chats') || '[]');
      const updatedChats = savedChats.map((chat: any) => {
        if (chat.id === chatId) {
          chat.messages = [...messages, userMessage, assistantMessage];
        }
        return chat;
      });
      localStorage.setItem('chats', JSON.stringify(updatedChats));
  
    } catch (error) {
      console.error("Error fetching response:", error);
      setIsTyping(false);
    }
  };
  
  

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-3xl mx-auto space-y-4 pb-20">
          {messages.map((message) => (
            <div key={message.id}>
            <ChatMessage message={message} />
              {/* {message.response && (
                <div className="bg-green-100 p-3 rounded text-sm text-gray-800 prose prose-sm max-w-none">
                  <ReactMarkdown>{message.response}</ReactMarkdown>
                </div>
              )} */}
              {message.products && (
                <div className="pl-10 mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {message.products.map((productImage, index) => (
                    <div key={index} className="relative">
                      <a
                        href={`https://www.amazon.in/s?k=${message.query?.replace(' ', '+')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group block overflow-hidden rounded-lg shadow-md transition-transform transform hover:scale-105"
                      >
                        <img
                          src={productImage}
                          alt="Product image"
                          className="w-full h-48 object-cover rounded-lg"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black opacity-50 group-hover:opacity-30 transition-opacity"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-2 text-white text-sm bg-black bg-opacity-40 group-hover:bg-opacity-30">
                          <span className="font-bold">View Details</span>
                        </div>
                      </a>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-mall-primary/20 p-2 rounded-full mr-3">
                <ShoppingBag className="h-5 w-5 text-mall-primary" />
              </div>
              <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                <div className="flex space-x-2">
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="h-2 w-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messageEndRef} />
        </div>
      </ScrollArea>

      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="max-w-3xl mx-auto flex">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about products, styles, recommendations..."
            className="resize-none border-gray-300 focus:border-mall-primary focus:ring-mall-primary"
            rows={1}
          />
          <Button
            onClick={handleSendMessage}
            className="ml-2 bg-mall-primary hover:bg-mall-dark shrink-0"
            disabled={!input.trim()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </Button>
        </div>

        {/* Checkbox to toggle between OpenAI and Gemini API */}
        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={useOpenAI}
              onChange={() => setUseOpenAI(!useOpenAI)}
              className="text-mall-primary"
            />
            <span>Use Gemini for responses</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
