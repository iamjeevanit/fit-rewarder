
import React from 'react';
import Layout from '@/components/Layout';
import { goalsData, workoutHistory } from '@/lib/workoutData';
import ProgressCircle from '@/components/ProgressCircle';
import { Calendar, CheckSquare, Droplet } from 'lucide-react';
import GoalManager from '@/components/GoalManager';
import { getWaterSummary } from '@/lib/waterIntakeUtils';

const Progress = () => {
  // Calculate stats
  const totalWorkouts = workoutHistory.reduce((acc, curr) => acc + curr.count, 0);
  const daysWithWorkouts = workoutHistory.length;
  
  // Get water intake summary
  const waterSummary = getWaterSummary();
  
  return (
    <Layout>
      <div className="animate-reveal">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Progress</h1>
          <p className="text-gray-600 mt-1">Track your fitness journey</p>
        </header>
        
        <section className="mb-8 animate-reveal-delay-1">
          <h2 className="text-xl font-semibold mb-4">Key Stats</h2>
          
          <div className="grid grid-cols-3 gap-4">
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
            
            <div className="glass-card rounded-2xl p-4 flex flex-col items-center">
              <div className="bg-blue-50 p-2 rounded-lg mb-2">
                <Droplet size={20} className="text-blue-600" />
              </div>
              <span className="text-2xl font-bold">{waterSummary.percentage}%</span>
              <span className="text-sm text-gray-500">Hydration</span>
            </div>
          </div>
        </section>
        
        <section className="mb-8 animate-reveal-delay-2">
          <GoalManager initialGoals={goalsData} />
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
