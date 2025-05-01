import React from 'react';
import { Button } from "@/components/ui/button";
import { BookOpen, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { ThemeToggle } from './theme-toggle';

const NavBar: React.FC = () => {
  return (
    <nav className="w-full py-4 px-4 md:px-8 flex items-center justify-between bg-white/80 dark:bg-background backdrop-blur-md shadow-sm">
      <div className="flex items-center gap-2">
        <BookOpen className="h-6 w-6 text-education-primary" />
        <span className="text-xl font-semibold text-gray-900 dark:text-white">SmartElect</span>
      </div>
      
      <div className="flex items-center gap-4">
        <a href="#features" className="hidden md:block text-gray-600 dark:text-gray-200 hover:text-education-primary">Features</a>
        <a href="#how-it-works" className="hidden md:block text-gray-600 dark:text-gray-200 hover:text-education-primary">How It Works</a>
        <Link to="/chatbot" className="hidden md:block text-gray-600 dark:text-gray-200 hover:text-education-primary">AI Assistant</Link>
        <ThemeToggle />
        <Button variant="outline" className="hidden md:flex items-center gap-2">
          <MessageCircle className="h-4 w-4" /> Chat Support
        </Button>
        <Button className="bg-education-primary hover:bg-education-secondary text-white">
          Get Started
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
