import React, { useState } from 'react';
import { Droplet, PlusCircle, MinusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { toast } from "sonner";
import { 
  WaterIntakeLog, 
  WaterTracking, 
  calculateTodayIntake, 
  formatWaterAmount, 
  getWaterGoalPercentage,
  getTodayLogs
} from '@/lib/waterIntakeData';

interface WaterIntakeTrackerProps {
  waterData: WaterTracking;
  onUpdateWaterData: (data: WaterTracking) => void;
}

const predefinedAmounts = [
  { label: 'Small', amount: 200, icon: 'S' },
  { label: 'Medium', amount: 330, icon: 'M' },
  { label: 'Large', amount: 500, icon: 'L' },
];

const WaterIntakeTracker: React.FC<WaterIntakeTrackerProps> = ({ 
  waterData, 
  onUpdateWaterData 
}) => {
  const [customAmount, setCustomAmount] = useState(250);
  
  // Today's total intake
  const todayIntake = calculateTodayIntake(waterData.logs);
  const goalPercentage = getWaterGoalPercentage(todayIntake, waterData.dailyGoal);
  
  // Add water log
  const handleAddWater = (amount: number) => {
    const newLog: WaterIntakeLog = {
      id: `water-${Date.now()}`,
      timestamp: new Date(),
      amount,
    };
    
    const updatedData = {
      ...waterData,
      logs: [...waterData.logs, newLog],
    };
    
    onUpdateWaterData(updatedData);
    toast.success(`Added ${formatWaterAmount(amount)} of water!`);
    
    // Show celebratory message when reaching daily goal
    const newTotal = todayIntake + amount;
    if (newTotal >= waterData.dailyGoal && todayIntake < waterData.dailyGoal) {
      toast.success("🎉 Daily water goal reached! Great job staying hydrated!");
    }
  };
  
  // Adjust custom amount
  const adjustCustomAmount = (delta: number) => {
    setCustomAmount(prev => Math.max(50, prev + delta));
  };
  
  // Update daily goal
  const updateDailyGoal = (delta: number) => {
    const newGoal = Math.max(500, waterData.dailyGoal + delta);
    onUpdateWaterData({
      ...waterData,
      dailyGoal: newGoal,
    });
    toast.info(`Water goal updated to ${formatWaterAmount(newGoal)}`);
  };
  
  return (
    <div className="space-y-6 animate-reveal">
      {/* Water Progress Card */}
      <Card className="glass-card overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center">
              <Droplet className="mr-2 h-5 w-5 text-blue-500" />
              Water Intake
            </span>
            <span className="text-sm font-normal">
              Goal: {formatWaterAmount(waterData.dailyGoal)}
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6 ml-1" 
                onClick={() => updateDailyGoal(250)}
              >
                <PlusCircle className="h-4 w-4" />
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-6 w-6" 
                onClick={() => updateDailyGoal(-250)}
              >
                <MinusCircle className="h-4 w-4" />
              </Button>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative pt-1">
            <Progress value={goalPercentage} className="h-6" />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-medium">
              {formatWaterAmount(todayIntake)} / {formatWaterAmount(waterData.dailyGoal)} ({goalPercentage}%)
            </span>
          </div>
        </CardContent>
      </Card>
      
      {/* Quick Add Buttons */}
      <div className="grid grid-cols-3 gap-3">
        {predefinedAmounts.map((option) => (
          <Button 
            key={option.label}
            variant="outline" 
            className="flex flex-col py-4 h-auto gap-1 border-blue-200"
            onClick={() => handleAddWater(option.amount)}
          >
            <span className="text-2xl font-light text-blue-500">{option.icon}</span>
            <span className="text-xs">{formatWaterAmount(option.amount)}</span>
          </Button>
        ))}
      </div>
      
      {/* Custom Amount */}
      <Card>
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => adjustCustomAmount(-50)}
            >
              <MinusCircle className="h-4 w-4" />
            </Button>
            
            <div className="text-center">
              <p className="text-sm text-gray-500">Custom Amount</p>
              <p className="text-2xl font-medium text-blue-600">{formatWaterAmount(customAmount)}</p>
            </div>
            
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => adjustCustomAmount(50)}
            >
              <PlusCircle className="h-4 w-4" />
            </Button>
          </div>
          
          <Button 
            className="w-full mt-4 bg-blue-500 hover:bg-blue-600"
            onClick={() => handleAddWater(customAmount)}
          >
            Add Water
          </Button>
        </CardContent>
      </Card>
      
      {/* Today's Log */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Today's Water Log</CardTitle>
        </CardHeader>
        <CardContent>
          {getTodayLogs(waterData.logs).length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No water logged today</p>
          ) : (
            <ul className="space-y-2">
              {getTodayLogs(waterData.logs)
                .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
                .map(log => (
                  <li key={log.id} className="flex items-center justify-between text-sm p-2 border-b">
                    <span className="flex items-center">
                      <Droplet className="mr-2 h-4 w-4 text-blue-500" />
                      {formatWaterAmount(log.amount)}
                    </span>
                    <span className="text-gray-500">
                      {new Date(log.timestamp).toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </li>
                ))
              }
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterIntakeTracker;
