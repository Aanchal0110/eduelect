
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { toast } from "sonner";

const StudentForm: React.FC = () => {
  const [academicLevel, setAcademicLevel] = useState<string>("");
  const [careerInterest, setCareerInterest] = useState<string>("");
  const [academicStrength, setAcademicStrength] = useState<number>(50);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!academicLevel || !careerInterest) {
      toast.error("Please fill all required fields");
      return;
    }
    
    toast.success("Analyzing your preferences... Redirecting to recommendations!");
    // In a real app, this would redirect or load recommendations
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-education-secondary">Student Preferences</CardTitle>
        <CardDescription>Tell us about yourself to get personalized course recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="academic-level">Your Academic Level</Label>
            <Select value={academicLevel} onValueChange={setAcademicLevel}>
              <SelectTrigger id="academic-level">
                <SelectValue placeholder="Select your academic level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="freshman">Freshman</SelectItem>
                <SelectItem value="sophomore">Sophomore</SelectItem>
                <SelectItem value="junior">Junior</SelectItem>
                <SelectItem value="senior">Senior</SelectItem>
                <SelectItem value="graduate">Graduate</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="career-interest">Career Interest</Label>
            <Select value={careerInterest} onValueChange={setCareerInterest}>
              <SelectTrigger id="career-interest">
                <SelectValue placeholder="Select your career interest" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="software-development">Software Development</SelectItem>
                <SelectItem value="data-science">Data Science</SelectItem>
                <SelectItem value="cyber-security">Cyber Security</SelectItem>
                <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                <SelectItem value="web-development">Web Development</SelectItem>
                <SelectItem value="mobile-development">Mobile App Development</SelectItem>
                <SelectItem value="product-management">Product Management</SelectItem>
                <SelectItem value="ux-design">UX Design</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between">
              <Label htmlFor="academic-strength">Academic Strength</Label>
              <span className="text-sm text-gray-500">{academicStrength}%</span>
            </div>
            <Slider 
              id="academic-strength"
              defaultValue={[50]} 
              max={100} 
              step={1} 
              onValueChange={([value]) => setAcademicStrength(value)}
              className="py-4"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>Beginner</span>
              <span>Intermediate</span>
              <span>Advanced</span>
            </div>
          </div>
          
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full bg-education-primary hover:bg-education-secondary text-white"
            >
              Get Recommendations
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentForm;
