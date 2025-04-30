import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, BookOpen, Settings, MessageSquare, History, Trash2, Home } from 'lucide-react';
import ChatbotSection from '../components/ChatbotSection';
import { Link } from 'react-router-dom';

interface ChatHistoryItem {
  id: string;
  title: string;
  date: string;
  context: 'courses' | 'preferences' | 'general';
  messages: any[];
}

const CHAT_HISTORY_KEY = 'chatai_history';

const Chatbot = () => {
  const [activeTab, setActiveTab] = useState<'courses' | 'preferences' | 'general'>('courses');
  const [history, setHistory] = useState<ChatHistoryItem[]>([]);
  const [activeHistory, setActiveHistory] = useState<ChatHistoryItem | null>(null);

  // Load history from localStorage
  useEffect(() => {
    const stored = localStorage.getItem(CHAT_HISTORY_KEY);
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  // Save history to localStorage
  const saveHistory = (item: ChatHistoryItem) => {
    const updated = [item, ...history.filter(h => h.id !== item.id)];
    setHistory(updated);
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(updated));
  };

  // Delete a history item
  const deleteHistory = (id: string) => {
    const updated = history.filter(h => h.id !== id);
    setHistory(updated);
    localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(updated));
    if (activeHistory?.id === id) setActiveHistory(null);
  };

  // When a new chat starts, clear activeHistory
  useEffect(() => {
    setActiveHistory(null);
  }, [activeTab]);

  // Handler for saving a chat session (to be passed to ChatbotSection)
  const handleSaveSession = (messages: any[], context: 'courses' | 'preferences' | 'general') => {
    const title = messages.find(m => m.sender === 'user')?.text?.slice(0, 30) || 'New Chat';
    const item: ChatHistoryItem = {
      id: Date.now().toString(),
      title,
      date: new Date().toLocaleString(),
      context,
      messages,
    };
    saveHistory(item);
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-72 bg-sidebar-background border-r border-sidebar-border p-4 flex flex-col dark:bg-sidebar-background">
        <div className="flex items-center gap-2 mb-6">
          {/* Home Button */}
          <Link to="/" className="mr-2 p-1 rounded hover:bg-sidebar-accent/30 transition-colors" title="Home">
            <Home className="h-6 w-6 text-sidebar-primary" />
          </Link>
          <History className="h-5 w-5 text-sidebar-primary" />
          <span className="font-semibold text-lg text-sidebar-foreground">Chat History</span>
        </div>
        <div className="flex-1 overflow-y-auto space-y-2">
          {history.length === 0 && (
            <div className="text-sm text-gray-400 dark:text-gray-500 text-center mt-8">No previous chats</div>
          )}
          {history.map(item => (
            <Card
              key={item.id}
              className={`cursor-pointer border-sidebar-border hover:border-sidebar-primary transition-all ${activeHistory?.id === item.id ? 'ring-2 ring-sidebar-primary' : ''}`}
              onClick={() => setActiveHistory(item)}
            >
              <CardHeader className="flex flex-row items-center justify-between p-3 pb-1">
                <div className="flex items-center gap-2">
                  {item.context === 'courses' && <BookOpen className="h-4 w-4 text-sidebar-primary" />}
                  {item.context === 'preferences' && <Settings className="h-4 w-4 text-sidebar-primary" />}
                  {item.context === 'general' && <MessageSquare className="h-4 w-4 text-sidebar-primary" />}
                  <span className="truncate max-w-[120px] text-sm font-medium text-sidebar-foreground">{item.title}</span>
                </div>
                <Button size="icon" variant="ghost" className="text-gray-400 hover:text-red-500" onClick={e => { e.stopPropagation(); deleteHistory(item.id); }}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="px-3 pb-2 pt-0 text-xs text-gray-500 dark:text-gray-400">
                {item.date}
              </CardContent>
            </Card>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">AI Course Assistant</h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-300">
            Get personalized help with course selection and career guidance
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={v => setActiveTab(v as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="general" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              General
            </TabsTrigger>
          </TabsList>

          {/* If a history item is selected, show its messages in read-only mode */}
          {activeHistory ? (
            <TabsContent value={activeHistory.context} forceMount>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {activeHistory.context === 'courses' && <BookOpen className="h-5 w-5 text-education-primary" />}
                    {activeHistory.context === 'preferences' && <Settings className="h-5 w-5 text-education-primary" />}
                    {activeHistory.context === 'general' && <MessageSquare className="h-5 w-5 text-education-primary" />}
                    Previous Chat
                  </CardTitle>
                  <CardDescription>
                    {activeHistory.title}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {/* Render chat messages in read-only mode */}
                  <div className="space-y-2 max-h-[400px] overflow-y-auto">
                    {activeHistory.messages.map((msg, idx) => (
                      <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] px-4 py-2 rounded-lg ${msg.sender === 'user' ? 'bg-education-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100'}`}>
                          <div className="flex items-center gap-2 mb-1">
                            {msg.sender === 'user' ? (
                              <><span className="font-medium">You</span></>
                            ) : (
                              <><span className="font-medium">Assistant</span></>
                            )}
                          </div>
                          <div className="whitespace-pre-wrap">{msg.text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ) : (
            <>
              <TabsContent value="courses">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-education-primary" />
                      Course Recommendations
                    </CardTitle>
                    <CardDescription>
                      Ask about specific courses, prerequisites, or get personalized course recommendations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChatbotSection initialContext="courses" onSaveSession={msgs => handleSaveSession(msgs, 'courses')} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="preferences">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Settings className="h-5 w-5 text-education-primary" />
                      Course Preferences
                    </CardTitle>
                    <CardDescription>
                      Set your preferences for course difficulty, schedule, and learning style
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChatbotSection initialContext="preferences" onSaveSession={msgs => handleSaveSession(msgs, 'preferences')} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="general">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-education-primary" />
                      General Questions
                    </CardTitle>
                    <CardDescription>
                      Ask general questions about classes, subjects, or academic planning
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ChatbotSection initialContext="general" onSaveSession={msgs => handleSaveSession(msgs, 'general')} />
                  </CardContent>
                </Card>
              </TabsContent>
            </>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default Chatbot; 