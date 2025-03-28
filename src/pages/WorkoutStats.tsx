
import React from 'react';
import Layout from '@/components/Layout';
import WorkoutStatsView from '@/components/WorkoutStatsView';
import { ChartBar } from 'lucide-react';

const WorkoutStats = () => {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto">
        <header className="mb-6 flex items-center gap-2">
          <ChartBar className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Workout Statistics</h1>
            <p className="text-gray-600 mt-1">Track your workout habits and progress</p>
          </div>
        </header>
        
        <WorkoutStatsView />
      </div>
    </Layout>
  );
};

export default WorkoutStats;
