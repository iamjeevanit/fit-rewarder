
import React, { useState } from 'react';
import { Goal } from '@/lib/workoutData';
import GoalCard from './GoalCard';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import GoalForm from './GoalForm';
import { toast } from "sonner";

interface GoalManagerProps {
  initialGoals: Goal[];
}

const GoalManager: React.FC<GoalManagerProps> = ({ initialGoals }) => {
  const [goals, setGoals] = useState<Goal[]>(initialGoals);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Add a new goal
  const handleAddGoal = (goalData: Omit<Goal, 'id' | 'completed'>) => {
    const newGoal: Goal = {
      ...goalData,
      id: `goal-${Date.now()}`,
      completed: false,
    };
    
    setGoals([...goals, newGoal]);
    setIsDialogOpen(false);
    toast.success("New goal created successfully!");
  };
  
  // Delete a goal
  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
    toast.info("Goal removed");
  };
  
  // Toggle goal completion status
  const handleToggleComplete = (goalId: string, completed: boolean) => {
    setGoals(goals.map(goal => 
      goal.id === goalId 
        ? { ...goal, completed } 
        : goal
    ));
    
    if (completed) {
      toast.success("🎉 Goal completed!");
    }
  };
  
  // Update goal progress
  const handleUpdateProgress = (goalId: string, amount: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const newCurrent = Math.max(0, goal.current + amount);
        const newCompleted = newCurrent >= goal.target;
        
        // If reaching the target, show celebration
        if (newCurrent >= goal.target && goal.current < goal.target) {
          toast.success("🎉 Goal reached! Great job!");
        }
        
        return { 
          ...goal, 
          current: newCurrent,
          completed: newCompleted
        };
      }
      return goal;
    }));
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Your Goals</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus size={16} className="mr-1" /> Add Goal
        </Button>
      </div>
      
      {goals.length === 0 ? (
        <div className="glass-card rounded-2xl p-6 text-center">
          <p className="text-gray-500 mb-3">You don't have any goals yet</p>
          <Button 
            variant="outline" 
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus size={16} className="mr-1" /> Create your first goal
          </Button>
        </div>
      ) : (
        goals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            onDelete={handleDeleteGoal}
            onComplete={handleToggleComplete}
            onUpdateProgress={handleUpdateProgress}
          />
        ))
      )}
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-[400px] rounded-lg">
          <DialogHeader>
            <DialogTitle>Create New Goal</DialogTitle>
          </DialogHeader>
          <GoalForm
            onSubmit={handleAddGoal}
            onCancel={() => setIsDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoalManager;
