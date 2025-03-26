
import React from 'react';
import { Goal } from '@/lib/workoutData';
import { CheckSquare, Target, Edit, Trash, Plus, Minus, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from 'sonner';

interface GoalCardProps {
  goal: Goal;
  onDelete: (id: string) => void;
  onComplete: (id: string, completed: boolean) => void;
  onUpdateProgress: (id: string, amount: number) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ 
  goal, 
  onDelete, 
  onComplete,
  onUpdateProgress
}) => {
  const progress = Math.min(100, Math.round((goal.current / goal.target) * 100));
  
  const handleProgressUpdate = (amount: number) => {
    onUpdateProgress(goal.id, amount);
    
    // Show progress milestone toasts
    if (amount > 0 && goal.current + amount >= goal.target && goal.current < goal.target) {
      toast.success("🏆 Goal target reached! Great work!", {
        description: `You've reached your target for "${goal.description}"`,
      });
    } else if (amount > 0 && (goal.current + amount) / goal.target >= 0.5 && goal.current / goal.target < 0.5) {
      toast.success("🎯 Halfway there!", {
        description: `You're halfway to your goal of "${goal.description}"`,
      });
    }
  };
  
  return (
    <div className={`glass-card rounded-2xl p-4 mb-4 ${goal.completed ? 'border-2 border-primary/20' : ''}`}>
      <div className="flex items-center gap-3">
        <div className={`bg-primary/10 p-2 rounded-lg flex items-center justify-center`}>
          {goal.completed ? 
            <Trophy size={18} className="text-yellow-500" /> : 
            <Target size={18} className="text-primary" />
          }
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">{goal.description}</h3>
            <Checkbox 
              id={`goal-completed-${goal.id}`}
              checked={goal.completed} 
              onCheckedChange={(checked) => onComplete(goal.id, !!checked)}
              className="ml-2"
            />
          </div>
          
          <div className="mt-2 w-full">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-gray-500">
                {goal.current}/{goal.target} {goal.unit}
              </span>
              <span className="text-xs text-gray-500">{progress}%</span>
            </div>
            
            <Progress 
              value={progress} 
              className={`h-2 ${progress >= 100 ? 'bg-green-100' : ''}`}
              color={progress >= 100 ? 'bg-green-500' : undefined}
            />
          </div>
          
          {!goal.completed && (
            <div className="flex justify-between mt-3">
              <div className="flex gap-1">
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="h-7 w-7"
                  onClick={() => handleProgressUpdate(-1)}
                  disabled={goal.current <= 0}
                >
                  <Minus size={14} />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => handleProgressUpdate(1)}
                >
                  <Plus size={14} />
                </Button>
              </div>
              
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 text-destructive hover:text-destructive"
                onClick={() => onDelete(goal.id)}
              >
                <Trash size={14} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
