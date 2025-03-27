
import React, { useEffect, useState, useCallback } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ExerciseTimerProps {
  duration?: number;
  isPaused?: boolean;
  onComplete?: () => void;
  showControls?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  onSaveTime?: (timeInSeconds: number) => void;
}

interface TimerHistoryItem {
  date: Date;
  duration: number;
}

const ExerciseTimer: React.FC<ExerciseTimerProps> = ({ 
  duration = 0, 
  isPaused: externalPaused,
  onComplete,
  showControls = false,
  size = 'md',
  onSaveTime
}) => {
  const [timeLeft, setTimeLeft] = useState(duration > 0 ? duration : 0);
  const [isPaused, setIsPaused] = useState(externalPaused || false);
  const [isCountUp, setIsCountUp] = useState(duration === 0);
  const [elapsedTime, setElapsedTime] = useState(0);
  
  // Size mappings
  const sizeMap = {
    sm: { container: 'w-24 h-24', text: 'text-xl', stroke: 4 },
    md: { container: 'w-32 h-32', text: 'text-2xl', stroke: 6 },
    lg: { container: 'w-40 h-40', text: 'text-3xl', stroke: 8 },
    xl: { container: 'w-64 h-64', text: 'text-5xl', stroke: 10 },
  };
  
  const { container, text, stroke } = sizeMap[size];
  const radius = size === 'xl' ? 120 : 45;
  const circumference = 2 * Math.PI * radius;
  
  // Effect to handle countdown/countup timer
  useEffect(() => {
    if (isPaused) return;
    
    if (!isCountUp && timeLeft <= 0) {
      if (onComplete) onComplete();
      return;
    }
    
    const timer = setTimeout(() => {
      if (isCountUp) {
        setElapsedTime(prev => prev + 1);
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [timeLeft, isPaused, onComplete, isCountUp, elapsedTime]);
  
  // Format time as MM:SS
  const formatTime = useCallback((seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }, []);
  
  // Handle timer reset
  const handleReset = useCallback(() => {
    if (isCountUp) {
      // Save the elapsed time to history before resetting
      if (onSaveTime && elapsedTime > 0) {
        onSaveTime(elapsedTime);
        toast.success(`Workout time saved: ${formatTime(elapsedTime)}`);
      }
      setElapsedTime(0);
    } else {
      setTimeLeft(duration);
    }
  }, [isCountUp, duration, elapsedTime, formatTime, onSaveTime]);
  
  // Toggle pause/play
  const handleTogglePause = useCallback(() => {
    setIsPaused(!isPaused);
  }, [isPaused]);

  // Handle timer mode switch
  const handleSwitchMode = useCallback(() => {
    setIsCountUp(!isCountUp);
    if (isCountUp) {
      // Switch to countdown
      setTimeLeft(duration > 0 ? duration : 60);
      setElapsedTime(0);
    } else {
      // Switch to countup
      setElapsedTime(0);
    }
  }, [isCountUp, duration]);
  
  // Calculate progress
  const calculateProgress = useCallback(() => {
    if (isCountUp) {
      // For countup timer, cap at 60 minutes (3600 seconds) for the circle
      const maxTime = 3600;
      return Math.min(elapsedTime / maxTime, 1);
    } else {
      // For countdown timer
      return timeLeft / duration;
    }
  }, [isCountUp, elapsedTime, timeLeft, duration]);
  
  return (
    <div className={cn("flex flex-col items-center", size === 'xl' && "w-full")}>
      <div className={cn("relative", container)}>
        <svg className="w-full h-full" viewBox={`0 0 ${radius * 2 + 10} ${radius * 2 + 10}`}>
          {/* Gray background circle */}
          <circle
            cx={radius + 5}
            cy={radius + 5}
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth={stroke}
          />
          
          {/* Progress circle */}
          <circle
            cx={radius + 5}
            cy={radius + 5}
            r={radius}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - calculateProgress())}
            transform={`rotate(-90 ${radius + 5} ${radius + 5})`}
            className="transition-all duration-1000"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn("font-bold", text)}>
            {isCountUp ? formatTime(elapsedTime) : formatTime(timeLeft)}
          </span>
        </div>
      </div>
      
      {showControls && (
        <div className="flex gap-2 mt-4">
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleTogglePause}
            className="h-10 w-10"
          >
            {isPaused ? <Play size={18} /> : <Pause size={18} />}
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleReset}
            className="h-10 w-10"
          >
            <RotateCcw size={18} />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon"
            onClick={handleSwitchMode}
            className="h-10 w-10"
          >
            <Clock size={18} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ExerciseTimer;
