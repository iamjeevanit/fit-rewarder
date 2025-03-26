
import React, { useEffect } from 'react';
import Layout from '@/components/Layout';
import { achievementsData } from '@/lib/workoutData';
import RewardBadge from '@/components/RewardBadge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Achievements = () => {
  const unlockedAchievements = achievementsData.filter(achievement => achievement.unlocked);
  const lockedAchievements = achievementsData.filter(achievement => !achievement.unlocked);
  
  useEffect(() => {
    console.log("Achievements page rendered");
    console.log("Unlocked achievements:", unlockedAchievements.length);
    console.log("Locked achievements:", lockedAchievements.length);
  }, []);
  
  return (
    <Layout>
      <div className="animate-reveal">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Rewards</h1>
          <p className="text-gray-600 mt-1">Track your achievements</p>
        </header>
        
        <div className="mb-6 animate-reveal-delay-1">
          <div className="glass-card rounded-2xl p-6 text-center">
            <h2 className="text-xl font-semibold mb-2">Your Progress</h2>
            <div className="flex items-center justify-center gap-2 mb-4">
              <span className="text-3xl font-bold text-primary">{unlockedAchievements.length}</span>
              <span className="text-gray-500">/ {achievementsData.length}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2.5">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-700 ease-out"
                style={{ width: `${(unlockedAchievements.length / achievementsData.length) * 100}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-3">Keep going to unlock all rewards!</p>
          </div>
        </div>
        
        <div className="animate-reveal-delay-2">
          <Tabs defaultValue="inProgress" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 rounded-xl">
              <TabsTrigger value="inProgress" className="rounded-lg">In Progress</TabsTrigger>
              <TabsTrigger value="unlocked" className="rounded-lg">Unlocked</TabsTrigger>
            </TabsList>
            
            <TabsContent value="inProgress">
              {lockedAchievements.length > 0 ? (
                lockedAchievements.map((achievement) => (
                  <RewardBadge key={achievement.id} achievement={achievement} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">You've unlocked all achievements!</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="unlocked">
              {unlockedAchievements.length > 0 ? (
                unlockedAchievements.map((achievement) => (
                  <RewardBadge key={achievement.id} achievement={achievement} />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600">No achievements unlocked yet. Keep going!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Achievements;
