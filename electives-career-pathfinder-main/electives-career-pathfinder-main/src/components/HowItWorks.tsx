
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, CircleUser, FileCheck, Search } from 'lucide-react';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-16 px-4 md:px-8 gradient-bg">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Four simple steps to find your perfect elective courses
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: '0ms' }}>
            <div className="rounded-full bg-education-light p-4 mb-4">
              <CircleUser className="w-10 h-10 text-education-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Create Profile</h3>
            <p className="text-center text-gray-600">Tell us about your academic background and career goals</p>
          </div>
          
          <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: '100ms' }}>
            <div className="rounded-full bg-education-light p-4 mb-4">
              <Search className="w-10 h-10 text-education-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Get Recommendations</h3>
            <p className="text-center text-gray-600">Receive AI-powered course suggestions tailored to your needs</p>
          </div>
          
          <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: '200ms' }}>
            <div className="rounded-full bg-education-light p-4 mb-4">
              <FileCheck className="w-10 h-10 text-education-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Check Eligibility</h3>
            <p className="text-center text-gray-600">Verify prerequisites and assess your readiness</p>
          </div>
          
          <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: '300ms' }}>
            <div className="rounded-full bg-education-light p-4 mb-4">
              <CheckCircle className="w-10 h-10 text-education-secondary" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900">Make Informed Choices</h3>
            <p className="text-center text-gray-600">Select the best courses for your academic and career journey</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
