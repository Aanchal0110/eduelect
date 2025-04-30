
import React from 'react';
import { Button } from "@/components/ui/button";
import { motion } from 'framer-motion';
import { GraduationCap, Users } from 'lucide-react';

interface UserTypeToggleProps {
  userType: 'student' | 'teacher';
  setUserType: (type: 'student' | 'teacher') => void;
}

const UserTypeToggle: React.FC<UserTypeToggleProps> = ({ userType, setUserType }) => {
  return (
    <div className="relative flex rounded-full p-1 bg-gray-100 w-fit mx-auto">
      <div 
        className={`absolute top-1 bottom-1 ${userType === 'student' ? 'left-1' : 'left-[50%]'} 
        w-[calc(50%-2px)] rounded-full transition-all duration-300 bg-white shadow-sm`}
      ></div>
      
      <Button
        type="button" 
        variant="ghost"
        onClick={() => setUserType('student')}
        className={`relative z-10 rounded-full px-6 py-2 ${
          userType === 'student' 
            ? 'text-education-primary font-medium' 
            : 'text-gray-500'
        }`}
      >
        <GraduationCap className="mr-2 h-4 w-4" />
        Student
      </Button>
      
      <Button 
        type="button"
        variant="ghost"
        onClick={() => setUserType('teacher')}
        className={`relative z-10 rounded-full px-6 py-2 ${
          userType === 'teacher' 
            ? 'text-education-primary font-medium' 
            : 'text-gray-500'
        }`}
      >
        <Users className="mr-2 h-4 w-4" />
        Teacher
      </Button>
    </div>
  );
};

export default UserTypeToggle;
