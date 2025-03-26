
import React from 'react';
import Layout from '@/components/Layout';
import { goalsData, workoutHistory } from '@/lib/workoutData';
import ProgressCircle from '@/components/ProgressCircle';
import { Calendar, CheckSquare, Plus, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

const Progress = () => {
  // Calculate stats
  const totalWorkouts = workoutHistory.reduce((acc, curr) => acc + curr.count, 0);
  const daysWithWorkouts = workoutHistory.length;
  const targetGoalsCompleted = goalsData.filter(goal => goal.completed).length;
  
  const handleAddGoal = () => {
    toast.success("Goal creation will be available in the next update!");
  };
  
  return (
    <Layout>
      <div className="animate-reveal">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Progress</h1>
          <p className="text-gray-600 mt-1">Track your fitness journey</p>
        </header>
        
        <section className="mb-8 animate-reveal-delay-1">
          <h2 className="text-xl font-semibold mb-4">Key Stats</h2>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card rounded-2xl p-4 flex flex-col items-center">
              <div className="bg-blue-50 p-2 rounded-lg mb-2">
                <Calendar size={20} className="text-blue-600" />
              </div>
              <span className="text-2xl font-bold">{daysWithWorkouts}</span>
              <span className="text-sm text-gray-500">Active Days</span>
            </div>
            
            <div className="glass-card rounded-2xl p-4 flex flex-col items-center">
              <div className="bg-green-50 p-2 rounded-lg mb-2">
                <CheckSquare size={20} className="text-green-600" />
              </div>
              <span className="text-2xl font-bold">{totalWorkouts}</span>
              <span className="text-sm text-gray-500">Workouts</span>
            </div>
          </div>
        </section>
        
        <section className="mb-8 animate-reveal-delay-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Goals</h2>
            <Button variant="outline" size="sm" onClick={handleAddGoal}>
              <Plus size={16} className="mr-1" />
              Add Goal
            </Button>
          </div>
          
          {goalsData.map((goal) => (
            <div key={goal.id} className="glass-card rounded-2xl p-4 mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg">
                  <Target size={18} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium">{goal.description}</h3>
                  
                  <div className="mt-2 w-full">
                    <div className="w-full bg-gray-100 rounded-full h-2">
                      <div
                        className="bg-primary h-2 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${(goal.current / goal.target) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-xs text-gray-500">{goal.current}/{goal.target}</span>
                      <span className="text-xs text-gray-500">{goal.unit}</span>
                    </div>
                  </div>
                </div>
                
                <ProgressCircle 
                  value={goal.current}
                  max={goal.target}
                  size={60}
                  strokeWidth={4}
                  textClassName="text-sm font-medium"
                />
              </div>
            </div>
          ))}
        </section>
        
        <section className="animate-reveal-delay-3">
          <h2 className="text-xl font-semibold mb-4">Weekly Activity</h2>
          
          <div className="glass-card rounded-2xl p-6">
            <div className="flex justify-between items-center">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
                <div key={index} className="flex flex-col items-center">
                  <span className="text-xs text-gray-500 mb-2">{day}</span>
                  <div className={`w-8 rounded-lg ${
                    // This is just a mock-up visualization
                    index === 1 || index === 3 || index === 5
                      ? 'bg-primary h-24'
                      : index === 0 || index === 4
                      ? 'bg-primary/60 h-16'
                      : 'bg-gray-200 h-8'
                  }`} />
                </div>
              ))}
            </div>
            
            <div className="text-center mt-6">
              <p className="text-lg font-medium">This Week</p>
              <p className="text-gray-600 text-sm">You've worked out 4 days</p>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Progress;
