
import React from 'react';
import Layout from '@/components/Layout';
import { workoutData } from '@/lib/workoutData';
import WorkoutCard from '@/components/WorkoutCard';
import { Dumbbell, Heart, Calendar, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'All', icon: Dumbbell, active: true },
  { name: 'Strength', icon: Dumbbell, active: false },
  { name: 'Cardio', icon: Heart, active: false },
  { name: 'Flexibility', icon: Calendar, active: false },
];

const Workouts = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [activeCategory, setActiveCategory] = React.useState('All');
  const navigate = useNavigate();
  
  const filteredWorkouts = workoutData.filter(workout => {
    const matchesQuery = workout.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         workout.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || 
                            workout.category.toLowerCase() === activeCategory.toLowerCase();
    
    return matchesQuery && matchesCategory;
  });
  
  const handleWorkoutStart = (workoutId: string) => {
    navigate(`/workout/${workoutId}`);
  };
  
  return (
    <Layout>
      <div className="animate-reveal">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Workouts</h1>
          <p className="text-gray-600 mt-1">Choose your workout</p>
        </header>
      
        <div className="relative mb-6 animate-reveal-delay-1">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search workouts"
            className="pl-10 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="mb-6 overflow-x-auto animate-reveal-delay-1">
          <div className="flex gap-3 min-w-[400px]">
            {categories.map((category) => (
              <button
                key={category.name}
                className={`flex items-center gap-2 py-2 px-4 rounded-full ${
                  activeCategory === category.name
                    ? 'bg-primary text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                } transition-all duration-300`}
                onClick={() => setActiveCategory(category.name)}
              >
                <category.icon size={16} />
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="animate-reveal-delay-2">
          {filteredWorkouts.length > 0 ? (
            filteredWorkouts.map((workout) => (
              <WorkoutCard 
                key={workout.id} 
                workout={workout} 
                onClick={() => handleWorkoutStart(workout.id)}
              />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="rounded-full bg-gray-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Dumbbell size={24} className="text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900">No workouts found</h3>
              <p className="text-gray-600 text-sm mt-1">Try a different search or category</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Workouts;
