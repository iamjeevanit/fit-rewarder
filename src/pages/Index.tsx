
import React from 'react';
import Layout from '@/components/Layout';
import { goalsData, workoutData } from '@/lib/workoutData';
import { Award, Check, ChevronRight, Dumbbell, Plus } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import ProgressCircle from '@/components/ProgressCircle';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();
  
  const handleStartRandomWorkout = () => {
    // Pick a random workout
    const randomIndex = Math.floor(Math.random() * workoutData.length);
    const randomWorkout = workoutData[randomIndex];
    navigate(`/workout/${randomWorkout.id}`);
  };
  
  return (
    <Layout>
      <div className="animate-reveal">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome</h1>
          <p className="text-gray-600 mt-1">Track your fitness journey</p>
        </header>
        
        <section className="mb-8 animate-reveal-delay-1">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Daily Goal</h2>
            <Link to="/progress" className="text-primary text-sm font-medium flex items-center">
              View all
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="glass-card rounded-2xl p-6 mb-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Today's Progress</h3>
                <p className="text-gray-600 text-sm mt-1">2/3 workouts completed</p>
                
                <div className="mt-4">
                  <Button className="bg-primary hover:bg-primary/90" onClick={handleStartRandomWorkout}>
                    <Plus size={16} className="mr-2" />
                    Start Workout
                  </Button>
                </div>
              </div>
              
              <ProgressCircle
                value={2}
                max={3}
                subtitle="workouts"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            {goalsData.slice(0, 2).map((goal) => (
              <div key={goal.id} className="glass-card rounded-2xl p-4">
                <h3 className="text-sm font-medium text-gray-900">{goal.description}</h3>
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
            ))}
          </div>
        </section>
        
        <section className="mb-8 animate-reveal-delay-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Quick Workouts</h2>
            <Link to="/workouts" className="text-primary text-sm font-medium flex items-center">
              View all
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {workoutData.slice(0, 3).map((workout) => (
              <div key={workout.id} className="glass-card rounded-2xl p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="bg-primary/10 p-3 rounded-xl mr-4">
                    <Dumbbell size={20} className="text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{workout.name}</h3>
                    <p className="text-xs text-gray-600">{workout.defaultSets} sets • {workout.defaultReps} reps</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="rounded-full"
                  onClick={() => navigate(`/workout/${workout.id}`)}
                >
                  <Plus size={16} />
                </Button>
              </div>
            ))}
          </div>
        </section>
        
        <section className="animate-reveal-delay-3">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Recent Achievements</h2>
            <Link to="/achievements" className="text-primary text-sm font-medium flex items-center">
              View all
              <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="glass-card rounded-2xl p-4 flex items-center justify-between">
            <div className="flex items-center">
              <div className="bg-primary/10 p-3 rounded-xl mr-4">
                <Award size={20} className="text-primary" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">First Workout</h3>
                <p className="text-xs text-gray-600">Completed your first workout</p>
              </div>
            </div>
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <Check size={16} className="text-green-600" />
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Index;
