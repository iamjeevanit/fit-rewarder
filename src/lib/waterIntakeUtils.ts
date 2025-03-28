
import { 
  WaterTracking,
  initialWaterTracking,
  calculateTodayIntake,
  formatWaterAmount
} from './waterIntakeData';

// Get water tracking data from localStorage
export const getWaterTrackingData = (): WaterTracking => {
  try {
    const savedData = localStorage.getItem('waterTrackingData');
    if (savedData) {
      const parsed = JSON.parse(savedData);
      parsed.logs = parsed.logs.map((log: any) => ({
        ...log,
        timestamp: new Date(log.timestamp),
      }));
      return parsed;
    }
  } catch (error) {
    console.error('Error getting water data', error);
  }
  return initialWaterTracking;
};

// Get a summary of today's water intake
export const getWaterSummary = (): {
  current: number;
  goal: number;
  percentage: number;
  formattedCurrent: string;
  formattedGoal: string;
} => {
  const data = getWaterTrackingData();
  const current = calculateTodayIntake(data.logs);
  const percentage = Math.min(Math.round((current / data.dailyGoal) * 100), 100);
  
  return {
    current,
    goal: data.dailyGoal,
    percentage,
    formattedCurrent: formatWaterAmount(current),
    formattedGoal: formatWaterAmount(data.dailyGoal),
  };
};
