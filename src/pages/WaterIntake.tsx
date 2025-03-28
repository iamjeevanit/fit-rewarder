
import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import WaterIntakeTracker from '@/components/WaterIntakeTracker';
import WaterHistoryView from '@/components/WaterHistoryView';
import WaterHealthBenefits from '@/components/WaterHealthBenefits';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { initialWaterTracking, WaterTracking } from '@/lib/waterIntakeData';
import { Droplet, ChartBar, Heart } from 'lucide-react';

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
          <p className="text-gray-600 mt-1">Track and improve your hydration habits</p>
        </header>
        
        <Tabs defaultValue="tracker" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tracker" className="flex items-center gap-2">
              <Droplet className="h-4 w-4" />
              <span>Tracker</span>
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <ChartBar className="h-4 w-4" />
              <span>History</span>
            </TabsTrigger>
            <TabsTrigger value="benefits" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Benefits</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="tracker">
            <WaterIntakeTracker 
              waterData={waterData}
              onUpdateWaterData={setWaterData}
            />
          </TabsContent>
          
          <TabsContent value="history">
            <WaterHistoryView waterData={waterData} />
          </TabsContent>
          
          <TabsContent value="benefits">
            <WaterHealthBenefits />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default WaterIntake;
