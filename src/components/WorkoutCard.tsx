
import React from 'react';
import { Workout } from '@/lib/workoutData';
import { Dumbbell, ArrowUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface WorkoutCardProps {
  workout: Workout;
  onClick?: () => void;
}

const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout, onClick }) => {
  const navigate = useNavigate();
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700';
      case 'intermediate':
        return 'bg-blue-100 text-blue-700';
      case 'advanced':
        return 'bg-orange-100 text-orange-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const handleStartWorkout = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(`/workout/${workout.id}`);
    }
  };

  return (
    <div 
      className="glass-card card-hover rounded-2xl p-4 mb-4 animate-reveal w-full cursor-pointer"
      onClick={handleStartWorkout}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-gray-900">{workout.name}</h3>
          <p className="text-sm text-gray-600 mb-2 text-balance">{workout.description}</p>
          
          <div className="flex items-center flex-wrap gap-2 mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(workout.difficulty)}`}>
              {workout.difficulty}
            </span>
            
            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
              {workout.category}
            </span>
          </div>
          
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-1">Sets:</span>
              <span className="text-sm font-medium">{workout.defaultSets}</span>
            </div>
            <div className="flex items-center">
              <span className="text-xs text-gray-500 mr-1">Reps:</span>
              <span className="text-sm font-medium">{workout.defaultReps}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-primary/10 p-3 rounded-xl">
          <Dumbbell size={24} className="text-primary" />
        </div>
      </div>
      
      <div className="flex justify-end">
        <div className="flex items-center mt-2 text-xs text-primary font-medium">
          Start workout
          <ArrowUp className="w-3 h-3 ml-1 -rotate-45" />
        </div>
      </div>
    </div>
  );
};

export default WorkoutCard;
