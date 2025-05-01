
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import UserTypeToggle from '../components/UserTypeToggle';
import StudentForm from '../components/StudentForm';
import TeacherForm from '../components/TeacherForm';
import FeatureSection from '../components/FeatureSection';
import HowItWorks from '../components/HowItWorks';
import ChatbotSection from '../components/ChatbotSection';
import Footer from '../components/Footer';

const Index = () => {
  const [userType, setUserType] = useState<'student' | 'teacher'>('student');

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <Hero />
      
      <section className="py-16 px-4 md:px-8">
        <div className="max-w-2xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Find Your Perfect Electives
          </h2>
          <p className="text-xl text-gray-600">
            Whether you're a student looking for course recommendations or a teacher adding course information,
            we've got you covered.
          </p>
        </div>
        
        <div className="mb-10">
          <UserTypeToggle userType={userType} setUserType={setUserType} />
        </div>
        
        {userType === 'student' ? <StudentForm /> : <TeacherForm />}
      </section>
      
      <FeatureSection />
      
      <HowItWorks />
      
      <ChatbotSection />
      
      <Footer />
    </div>
  );
};

export default Index;
