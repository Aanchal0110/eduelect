import React from 'react';
import { BookOpen, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-background text-foreground dark:bg-background dark:text-foreground py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-6 w-6 text-education-primary" />
            <span className="text-xl font-semibold text-foreground">SmartElect</span>
          </div>
          <p className="mb-4 text-sm text-muted-foreground">
            AI-powered elective course selection and career guidance for students.
          </p>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Links</h3>
          <ul className="space-y-2">
            <li><Link to="/" className="hover:text-education-primary transition-colors">Home</Link></li>
            <li><a href="#features" className="hover:text-education-primary transition-colors">Features</a></li>
            <li><a href="#how-it-works" className="hover:text-education-primary transition-colors">How It Works</a></li>
            <li><Link to="/chatbot" className="hover:text-education-primary transition-colors">AI Assistant</Link></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Resources</h3>
          <ul className="space-y-2">
            <li><a href="#" className="hover:text-education-primary transition-colors">Career Guides</a></li>
            <li><a href="#" className="hover:text-education-primary transition-colors">Course Catalog</a></li>
            <li><a href="#" className="hover:text-education-primary transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-education-primary transition-colors">Support</a></li>
          </ul>
        </div>
        
        <div>
          <h3 className="text-lg font-semibold mb-4 text-foreground">Contact</h3>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href="mailto:support@smartelect.com" className="hover:text-education-primary transition-colors">
                support@smartelect.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <a href="tel:+1234567890" className="hover:text-education-primary transition-colors">
                +1 (234) 567-890
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span>123 Education St, Learning City</span>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} SmartElect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
