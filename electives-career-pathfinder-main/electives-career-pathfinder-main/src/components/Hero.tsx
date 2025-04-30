import React from 'react';
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="py-16 px-4 md:px-8 gradient-bg">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Choose Your Electives <span className="text-education-primary dark:text-education-light">Smarter</span>, 
            <br />Plan Your Career <span className="text-education-primary dark:text-education-light">Better</span>
          </h1>
          
          <p className="text-xl text-gray-700 dark:text-gray-200">
            AI-powered course recommendations aligned with your career goals and academic strengths.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-education-accent text-white hover:bg-education-accent/90">
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            
            <Button size="lg" variant="outline" className="border-education-primary text-education-primary hover:bg-education-primary/10">
              Learn More
            </Button>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
            <GraduationCap className="h-4 w-4 text-education-primary" />
            <span>Trusted by 50+ educational institutions</span>
          </div>
        </div>
        
        <div className="lg:w-1/2 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <img 
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2000&auto=format&fit=crop&ixlib=rb-4.0.3"
            alt="Students exploring course options" 
            className="w-full h-auto rounded-xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
