
import React from 'react';
import { Droplet } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { getWaterSummary } from '@/lib/waterIntakeUtils';
import { useNavigate } from 'react-router-dom';

const WaterProgressIndicator = () => {
  const navigate = useNavigate();
  const waterSummary = getWaterSummary();
  
  const handleClick = () => {
    navigate('/water-intake');
  };
  
  return (
    <div 
      className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 hover:bg-blue-100 cursor-pointer transition-colors"
      onClick={handleClick}
    >
      <div className="shrink-0">
        <Droplet className="h-6 w-6 text-blue-500" />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-center text-sm mb-1">
          <span className="font-medium">Water Intake</span>
          <span className="text-gray-500">{waterSummary.formattedCurrent} / {waterSummary.formattedGoal}</span>
        </div>
        <Progress value={waterSummary.percentage} className="h-2" />
      </div>
    </div>
  );
};

export default WaterProgressIndicator;
