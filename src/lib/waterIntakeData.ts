
// Sample data for water intake tracking
// This would typically come from a database or local storage in a real app

// Default water goal in milliliters (2000ml = 2 liters)
export const DEFAULT_WATER_GOAL = 2000;

// Initial water intake logs
export interface WaterIntakeLog {
  id: string;
  timestamp: Date;
  amount: number; // Amount in milliliters
}

// User's water tracking data
export interface WaterTracking {
  dailyGoal: number; // Daily goal in milliliters
  logs: WaterIntakeLog[];
}

// Initialize with some sample data
export const initialWaterTracking: WaterTracking = {
  dailyGoal: DEFAULT_WATER_GOAL,
  logs: [
    {
      id: 'water-1',
      timestamp: new Date(new Date().setHours(8, 30, 0, 0)),
      amount: 250,
    },
    {
      id: 'water-2',
      timestamp: new Date(new Date().setHours(10, 15, 0, 0)),
      amount: 330,
    },
  ],
};

// Get today's logs only
export const getTodayLogs = (logs: WaterIntakeLog[]) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  return logs.filter(log => {
    const logDate = new Date(log.timestamp);
    return logDate >= today && logDate < tomorrow;
  });
};

// Calculate total water intake for today
export const calculateTodayIntake = (logs: WaterIntakeLog[]) => {
  const todayLogs = getTodayLogs(logs);
  return todayLogs.reduce((total, log) => total + log.amount, 0);
};

// Format milliliters to a readable format
export const formatWaterAmount = (ml: number) => {
  if (ml >= 1000) {
    return `${(ml / 1000).toFixed(1)}L`;
  }
  return `${ml}ml`;
};

// Get percentage of daily goal completed
export const getWaterGoalPercentage = (current: number, goal: number) => {
  return Math.min(Math.round((current / goal) * 100), 100);
};
