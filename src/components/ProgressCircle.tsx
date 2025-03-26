
import React from 'react';

interface ProgressCircleProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  textClassName?: string;
  title?: string;
  subtitle?: string;
}

const ProgressCircle: React.FC<ProgressCircleProps> = ({
  value,
  max,
  size = 120,
  strokeWidth = 8,
  textClassName = "text-3xl font-semibold",
  title,
  subtitle
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progressPercentage = (value / max) * 100;
  const dashoffset = circumference - (progressPercentage / 100) * circumference;
  
  // For the animation to work, set a CSS variable
  React.useEffect(() => {
    document.documentElement.style.setProperty('--progress-value', `${progressPercentage}`);
  }, [progressPercentage]);

  return (
    <div className="flex flex-col items-center">
      {title && <h3 className="text-sm font-medium text-gray-500 mb-3">{title}</h3>}
      
      <div className="relative flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e2e8f0"  // light gray
            strokeWidth={strokeWidth}
          />
          
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={dashoffset}
            strokeLinecap="round"
            className="text-primary transition-all duration-700 ease-out animate-progress-circular"
            style={{ '--progress-value': progressPercentage } as React.CSSProperties}
          />
        </svg>
        
        <div className="absolute flex flex-col items-center justify-center">
          <span className={textClassName}>{value}</span>
          {subtitle && <span className="text-xs text-gray-500 mt-1">{subtitle}</span>}
        </div>
      </div>
    </div>
  );
};

export default ProgressCircle;
