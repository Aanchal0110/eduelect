
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const TeacherForm: React.FC = () => {
  const [department, setDepartment] = useState<string>("");
  const [courseLevel, setCourseLevel] = useState<string>("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!department || !courseLevel) {
      toast.error("Please fill all required fields");
      return;
    }
    
    toast.success("Course information submitted successfully!");
    // In a real app, this would store the course information
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="text-education-secondary">Course Management</CardTitle>
        <CardDescription>Add or update course information for student recommendations</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="computer-science">Computer Science</SelectItem>
                <SelectItem value="information-technology">Information Technology</SelectItem>
                <SelectItem value="electrical-engineering">Electrical Engineering</SelectItem>
                <SelectItem value="mathematics">Mathematics</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="design">Design & Media</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="course-level">Course Level</Label>
            <Select value={courseLevel} onValueChange={setCourseLevel}>
              <SelectTrigger id="course-level">
                <SelectValue placeholder="Select course level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="introductory">Introductory (100 Level)</SelectItem>
                <SelectItem value="intermediate">Intermediate (200-300 Level)</SelectItem>
                <SelectItem value="advanced">Advanced (400 Level)</SelectItem>
                <SelectItem value="graduate">Graduate (500+ Level)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="course-name">Course Name</Label>
            <Input id="course-name" placeholder="Introduction to Data Structures" />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="prerequisites">Prerequisites (Optional)</Label>
            <Textarea 
              id="prerequisites" 
              placeholder="List any prerequisite courses or skills required"
              className="min-h-[80px]"
            />
          </div>
          
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full bg-education-primary hover:bg-education-secondary text-white"
            >
              Submit Course Information
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default TeacherForm;
