
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import WaterIntakeTracker from '@/components/WaterIntakeTracker';
import { initialWaterTracking, WaterTracking } from '@/lib/waterIntakeData';

// This would ideally use localStorage or backend storage
// For now we'll use state that resets on page refresh
const WaterIntake = () => {
  const [waterData, setWaterData] = useState<WaterTracking>(initialWaterTracking);
  
  // Simulate loading from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('waterTrackingData');
    if (savedData) {
      try {
        // Need to parse dates from JSON
        const parsed = JSON.parse(savedData);
        parsed.logs = parsed.logs.map((log: any) => ({
          ...log,
          timestamp: new Date(log.timestamp),
        }));
        setWaterData(parsed);
      } catch (error) {
        console.error('Error parsing water data', error);
      }
    }
  }, []);
  
  // Save to localStorage when data changes
  useEffect(() => {
    localStorage.setItem('waterTrackingData', JSON.stringify(waterData));
  }, [waterData]);
  
  return (
    <Layout>
      <div className="max-w-md mx-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Water Intake</h1>
          <p className="text-gray-600 mt-1">Track your daily hydration</p>
        </header>
        
        <WaterIntakeTracker 
          waterData={waterData}
          onUpdateWaterData={setWaterData}
        />
      </div>
    </Layout>
  );
};

export default WaterIntake;
