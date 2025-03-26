
import React from 'react';
import { Achievement } from '@/lib/workoutData';
import { Trophy, Star } from 'lucide-react';

interface RewardBadgeProps {
  achievement: Achievement;
}

const RewardBadge: React.FC<RewardBadgeProps> = ({ achievement }) => {
  const progressPercentage = Math.min(100, Math.round((achievement.progress / achievement.target) * 100));
  
  return (
    <div className={`glass-card p-4 rounded-2xl mb-4 animate-reveal ${achievement.unlocked ? 'border-2 border-primary/40' : ''}`}>
      <div className="flex items-center gap-4">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
          achievement.unlocked 
            ? 'bg-primary/20 text-primary animate-pulse-gentle' 
            : 'bg-gray-100 text-gray-400'
        }`}>
          {achievement.category === 'milestone' ? (
            <Trophy size={24} />
          ) : (
            <Star size={24} />
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
          <p className="text-sm text-gray-600 text-balance">{achievement.description}</p>
          
          {!achievement.unlocked && (
            <div className="mt-2 w-full">
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">{achievement.progress}/{achievement.target}</span>
                <span className="text-xs text-gray-500">{progressPercentage}%</span>
              </div>
            </div>
          )}
          
          {achievement.unlocked && (
            <div className="mt-1 flex items-center">
              <span className="text-xs font-medium text-primary flex items-center">
                <Check size={14} className="mr-1" />
                Unlocked
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Check icon component
const Check = ({ size = 24, className = "" }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export default RewardBadge;
