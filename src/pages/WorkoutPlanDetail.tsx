
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { workoutPlansData, workoutData, Workout } from '@/lib/workoutData';
import { ArrowLeft, Calendar, Dumbbell, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { toast } from 'sonner';

const WorkoutPlanDetail = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<Record<number, boolean>>({});
  
  const plan = workoutPlansData.find(p => p.id === planId);
  
  const getWorkoutsForDay = (day: number): Workout[] => {
    if (!plan) return [];
    
    const dayPlan = plan.workouts.find(w => w.day === day);
    if (!dayPlan) return [];
    
    return dayPlan.workoutIds
      .map(id => workoutData.find(w => w.id === id))
      .filter((w): w is Workout => w !== undefined);
  };
  
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
  
  const handleStartWorkout = (workoutId: string) => {
    navigate(`/workout/${workoutId}`);
  };
  
  const handleStartPlan = () => {
    // In a real app, this would start tracking the plan
    toast.success("Plan started! Check your first day's workout.");
    
    // Navigate to first workout if available
    if (plan?.workouts[0]?.workoutIds[0]) {
      setTimeout(() => {
        navigate(`/workout/${plan.workouts[0].workoutIds[0]}`);
      }, 1500);
    }
  };
  
  // Toggle day workouts visibility
  const toggleDay = (day: number) => {
    setIsOpen(prev => ({
      ...prev,
      [day]: !prev[day]
    }));
  };
  
  if (!plan) {
    return (
      <Layout>
        <div className="text-center py-12">
          <h2 className="text-xl font-semibold">Workout plan not found</h2>
          <Button 
            variant="outline"
            className="mt-4"
            onClick={() => navigate('/workout-plans')}
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Plans
          </Button>
        </div>
      </Layout>
    );
  }
  
  return (
    <Layout>
      <div className="animate-reveal">
        <div className="flex items-center mb-4">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/workout-plans')}
            className="mr-2"
          >
            <ArrowLeft size={16} className="mr-1" />
            Back
          </Button>
          <Badge className={getDifficultyColor(plan.difficulty)}>
            {plan.difficulty}
          </Badge>
        </div>
        
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{plan.name}</h1>
        <p className="text-gray-600 mb-6">{plan.description}</p>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Calendar size={16} className="text-primary" />
              <span className="font-medium">Duration</span>
            </div>
            <p className="text-gray-600">{plan.duration}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <Dumbbell size={16} className="text-primary" />
              <span className="font-medium">Frequency</span>
            </div>
            <p className="text-gray-600">{plan.frequency}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-3">Goals</h2>
          <ul className="space-y-2">
            {plan.goals.map((goal, index) => (
              <li key={index} className="flex items-start gap-2">
                <Check size={18} className="text-green-500 mt-0.5 flex-shrink-0" />
                <span className="text-gray-700">{goal}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Separator className="my-6" />
        
        <h2 className="text-xl font-semibold mb-4">Workout Schedule</h2>
        <div className="space-y-4 mb-8">
          {plan.workouts.map((workoutDay) => (
            <Collapsible
              key={`day-${workoutDay.day}`}
              open={isOpen[workoutDay.day]}
              onOpenChange={() => toggleDay(workoutDay.day)}
              className="border rounded-lg overflow-hidden"
            >
              <CollapsibleTrigger asChild>
                <div className="p-4 bg-gray-50 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition-colors">
                  <div className="font-medium">Day {workoutDay.day}</div>
                  <div className="text-sm text-gray-500">{workoutDay.workoutIds.length} exercises</div>
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                <div className="p-4 pt-2 space-y-3">
                  {getWorkoutsForDay(workoutDay.day).map((workout) => (
                    <Card key={workout.id} className="overflow-hidden border-0 shadow-sm">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="font-medium">{workout.name}</h3>
                            <p className="text-xs text-gray-500">{workout.defaultSets} sets × {workout.defaultReps} reps</p>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleStartWorkout(workout.id)}
                            className="text-primary"
                          >
                            Start
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CollapsibleContent>
            </Collapsible>
          ))}
        </div>
        
        <div className="flex justify-center mb-8">
          <Button onClick={handleStartPlan} size="lg" className="w-full max-w-md">
            Start This Plan
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default WorkoutPlanDetail;
