import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SendHorizontal, Bot, User, Loader2, AlertCircle } from 'lucide-react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatMessage, sendMessage } from '@/services/chatbot';

interface ChatbotSectionProps {
  initialContext?: 'courses' | 'preferences' | 'general';
  onSaveSession?: (messages: ChatMessage[]) => void;
}

const getInitialMessage = (context?: string) => {
  switch (context) {
    case 'courses':
      return "Hi! I can help you find the perfect courses. What kind of courses are you interested in?";
    case 'preferences':
      return "Let's set up your course preferences. What's your preferred learning style and schedule?";
    case 'general':
      return "How can I help you with your academic planning today?";
    default:
      return "Hi there! I'm your AI course assistant. How can I help you with elective course selection today?";
  }
};

const ChatbotSection: React.FC<ChatbotSectionProps> = ({ initialContext, onSaveSession }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      text: getInitialMessage(initialContext),
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    // Reset error state
    setError(null);
    
    // Add user message
    const userMessage: ChatMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user'
    };
    setMessages(prev => {
      const updated = [...prev, userMessage];
      if (onSaveSession) onSaveSession(updated);
      return updated;
    });
    setInput('');
    setIsLoading(true);
    
    // Add temporary typing indicator
    const typingIndicatorId = Date.now();
    setMessages(prev => [...prev, { 
      id: typingIndicatorId, 
      text: "Thinking...", 
      sender: 'bot' 
    }]);
    
    try {
      // Get response from n8n webhook
      const response = await sendMessage(input);
      
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== typingIndicatorId));
      
      // Add bot response
      const botMessage: ChatMessage = {
        id: messages.length + 3, // +1 for user message, +1 for typing indicator, +1 for this response
        text: response,
        sender: 'bot'
      };
      
      setMessages(prev => {
        const updated = [...prev, botMessage];
        if (onSaveSession) onSaveSession(updated);
        return updated;
      });
    } catch (error) {
      console.error('Error getting response:', error);
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      setError(errorMessage);
      
      // Remove typing indicator
      setMessages(prev => prev.filter(msg => msg.id !== typingIndicatorId));
      
      // Add error message to chat
      const errorBotMessage: ChatMessage = {
        id: messages.length + 3,
        text: `Sorry, I encountered an error: ${errorMessage}. Please try again later.`,
        sender: 'bot'
      };
      setMessages(prev => {
        const updated = [...prev, errorBotMessage];
        if (onSaveSession) onSaveSession(updated);
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formatMessageText = (text: string) => {
    return text.split('\n').map((line, i) => (
      <span key={i} className="block">
        {line}
      </span>
    ));
  };

  return (
    <section id="chatbot" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">AI Course Assistant</h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Chat with our AI to get instant answers about courses, prerequisites, and career paths
        </p>
      </div>
      
      <Card className="w-full max-w-2xl mx-auto shadow-lg border-education-primary/20">
        <CardHeader className="bg-education-primary/10 border-b">
          <CardTitle className="text-education-secondary dark:text-education-light flex items-center gap-2">
            <Bot className="w-5 h-5" />
            Course Assistant
          </CardTitle>
        </CardHeader>
        
        <ScrollArea className="h-[400px] p-4">
          <CardContent className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[80%] px-4 py-2 rounded-lg ${
                    message.sender === 'user' 
                      ? 'bg-education-primary text-white'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    {message.sender === 'user' ? (
                      <>
                        <span className="font-medium">You</span>
                        <User className="w-3 h-3" />
                      </>
                    ) : (
                      <>
                        <Bot className="w-3 h-3" />
                        <span className="font-medium">Assistant</span>
                      </>
                    )}
                  </div>
                  <div className="whitespace-pre-wrap">
                    {message.text === "Thinking..." ? (
                      <div className="flex items-center gap-2">
                        <span>{message.text}</span>
                        <Loader2 className="w-3 h-3 animate-spin" />
                      </div>
                    ) : (
                      formatMessageText(message.text)
                    )}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </CardContent>
        </ScrollArea>
        
        <CardFooter className="border-t p-4">
          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex w-full gap-2"
          >
            <Input 
              placeholder="Ask about courses, prerequisites, or career paths..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-grow"
              disabled={isLoading}
            />
            <Button 
              type="submit" 
              size="icon" 
              className="bg-education-primary hover:bg-education-secondary"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <SendHorizontal className="h-4 w-4" />
              )}
            </Button>
          </form>
        </CardFooter>
      </Card>
    </section>
  );
};

export default ChatbotSection;
