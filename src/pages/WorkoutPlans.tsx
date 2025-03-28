
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { workoutPlansData } from '@/lib/workoutData';
import WorkoutPlanCard from '@/components/WorkoutPlanCard';
import { Calendar, Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const WorkoutPlans = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const filteredPlans = workoutPlansData.filter(plan => {
    const matchesQuery = plan.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          plan.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter ? plan.difficulty === activeFilter.toLowerCase() : true;
    
    return matchesQuery && matchesFilter;
  });
  
  return (
    <Layout>
      <div className="animate-reveal">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Workout Plans</h1>
          <p className="text-gray-600 mt-1">Find a plan that matches your fitness goals</p>
        </header>
      
        <div className="relative mb-6 animate-reveal-delay-1">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search plans"
            className="pl-10 rounded-xl"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="mb-6 animate-reveal-delay-1">
          <div className="flex gap-3 overflow-x-auto pb-2">
            <Button
              variant={activeFilter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(null)}
              className="rounded-full flex items-center gap-2"
            >
              <Filter size={14} />
              <span>All Levels</span>
            </Button>
            <Button
              variant={activeFilter === 'beginner' ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter('beginner')}
              className="rounded-full flex items-center gap-2"
            >
              <Calendar size={14} />
              <span>Beginner</span>
            </Button>
            <Button
              variant={activeFilter === 'intermediate' ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter('intermediate')}
              className="rounded-full flex items-center gap-2"
            >
              <Calendar size={14} />
              <span>Intermediate</span>
            </Button>
            <Button
              variant={activeFilter === 'advanced' ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter('advanced')}
              className="rounded-full flex items-center gap-2"
            >
              <Calendar size={14} />
              <span>Advanced</span>
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-reveal-delay-2">
          {filteredPlans.length > 0 ? (
            filteredPlans.map((plan) => (
              <WorkoutPlanCard key={plan.id} plan={plan} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <div className="rounded-full bg-gray-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Calendar size={24} className="text-gray-400" />
              </div>
              <h3 className="font-medium text-gray-900">No workout plans found</h3>
              <p className="text-gray-600 text-sm mt-1">Try a different search or filter</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WorkoutPlans;
