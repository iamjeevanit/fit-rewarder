
import React from 'react';
import { WorkoutPlan } from '@/lib/workoutData';
import { Calendar, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface WorkoutPlanCardProps {
  plan: WorkoutPlan;
}

const WorkoutPlanCard: React.FC<WorkoutPlanCardProps> = ({ plan }) => {
  const navigate = useNavigate();
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-700 hover:bg-green-200';
      case 'intermediate':
        return 'bg-blue-100 text-blue-700 hover:bg-blue-200';
      case 'advanced':
        return 'bg-orange-100 text-orange-700 hover:bg-orange-200';
      default:
        return 'bg-gray-100 text-gray-700 hover:bg-gray-200';
    }
  };

  const handleViewPlan = () => {
    navigate(`/workout-plans/${plan.id}`);
  };

  return (
    <Card 
      className="w-full transition-all duration-300 hover:shadow-md cursor-pointer animate-reveal"
      onClick={handleViewPlan}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
            <CardDescription className="mt-1">{plan.description}</CardDescription>
          </div>
          <Badge className={`${getDifficultyColor(plan.difficulty)}`}>
            {plan.difficulty}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-primary" />
            <span className="text-gray-600">{plan.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar size={14} className="text-primary" />
            <span className="text-gray-600">{plan.frequency}</span>
          </div>
        </div>
        
        <div className="mt-3">
          <h4 className="text-sm font-medium text-gray-700">Goals:</h4>
          <ul className="mt-1 space-y-1">
            {plan.goals.slice(0, 2).map((goal, index) => (
              <li key={index} className="text-xs text-gray-600 flex items-start">
                <span className="mr-1">•</span>
                <span>{goal}</span>
              </li>
            ))}
            {plan.goals.length > 2 && (
              <li className="text-xs text-gray-600">
                <span className="mr-1">•</span>
                <span>+{plan.goals.length - 2} more</span>
              </li>
            )}
          </ul>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full flex justify-end">
          <span className="text-xs text-primary font-medium flex items-center">
            View plan
            <ChevronRight size={14} className="ml-1" />
          </span>
        </div>
      </CardFooter>
    </Card>
  );
};

export default WorkoutPlanCard;
