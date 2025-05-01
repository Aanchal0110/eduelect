
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookCheck, Brain, CheckCircle2, LineChart, MessageSquare, RefreshCw } from 'lucide-react';

const features = [
  {
    icon: <BookCheck className="w-10 h-10 text-education-primary" />,
    title: "Personalized Course Suggestions",
    description: "Get AI-powered course recommendations based on your career goals and academic performance"
  },
  {
    icon: <CheckCircle2 className="w-10 h-10 text-education-primary" />,
    title: "Eligibility Check",
    description: "Instantly verify if you meet all prerequisites for any course you're interested in"
  },
  {
    icon: <Brain className="w-10 h-10 text-education-primary" />,
    title: "Readiness Assessment",
    description: "Take interactive quizzes to determine if you're prepared for advanced courses"
  },
  {
    icon: <RefreshCw className="w-10 h-10 text-education-primary" />,
    title: "Feedback Loop",
    description: "Review choices and explore alternatives with our adaptive recommendation system"
  },
  {
    icon: <LineChart className="w-10 h-10 text-education-primary" />,
    title: "Real-Time Data",
    description: "Access the latest course information synchronized with your college's database"
  },
  {
    icon: <MessageSquare className="w-10 h-10 text-education-primary" />,
    title: "AI Assistant",
    description: "Chat with our AI assistant to answer questions about courses and career paths"
  },
];

const FeatureSection: React.FC = () => {
  return (
    <section id="features" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Smart Features for Smarter Choices</h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Our AI-powered platform helps you navigate course selection with confidence
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="card-hover border-t-4 border-t-education-primary">
            <CardHeader>
              <div className="mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
