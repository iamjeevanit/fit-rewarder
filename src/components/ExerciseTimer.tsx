
import React, { useEffect, useState } from 'react';

interface ExerciseTimerProps {
  duration: number;
  isPaused?: boolean;
  onComplete?: () => void;
}

const ExerciseTimer: React.FC<ExerciseTimerProps> = ({ 
  duration, 
  isPaused = false,
  onComplete 
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const circumference = 2 * Math.PI * 45; // 45 is the radius
  
  useEffect(() => {
    if (isPaused) return;
    
    if (timeLeft <= 0) {
      if (onComplete) onComplete();
      return;
    }
    
    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, isPaused, onComplete]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-32 h-32">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          {/* Gray background circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="8"
          />
          
          {/* Progress circle */}
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - timeLeft / duration)}
            transform="rotate(-90 50 50)"
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold">{formatTime(timeLeft)}</span>
        </div>
      </div>
    </div>
  );
};

export default ExerciseTimer;
