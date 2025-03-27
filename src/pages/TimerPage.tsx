
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ChevronDown, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import ExerciseTimer from '@/components/ExerciseTimer';
import { useNavigate, useLocation } from 'react-router-dom';
import { Dialog, DialogContent, DialogTitle, DialogHeader } from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { toast } from 'sonner';

interface TimerHistoryItem {
  id: string;
  date: Date;
  duration: number;
}

const TimerPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [history, setHistory] = useState<TimerHistoryItem[]>(() => {
    const saved = localStorage.getItem('timer-history');
    return saved ? JSON.parse(saved) : [];
  });
  const [showHistory, setShowHistory] = useState(false);
  
  // Check if we have a time to save from a workout
  useEffect(() => {
    const state = location.state as { timeToSave?: number } | null;
    if (state?.timeToSave) {
      handleSaveTime(state.timeToSave);
      // Clear the state after saving
      navigate(location.pathname, { replace: true });
      toast.success("Workout time saved to history!");
    }
  }, [location]);
  
  // Save history to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('timer-history', JSON.stringify(history));
  }, [history]);
  
  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Handle saving new time entry
  const handleSaveTime = (timeInSeconds: number) => {
    if (timeInSeconds < 1) return; // Don't save times less than 1 second
    
    const newEntry: TimerHistoryItem = {
      id: Date.now().toString(),
      date: new Date(),
      duration: timeInSeconds
    };
    
    setHistory(prev => [newEntry, ...prev.slice(0, 99)]); // Keep last 100 entries
  };
  
  // Delete a history entry
  const handleDeleteEntry = (id: string) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  };
  
  // Clear all history
  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear all timer history?')) {
      setHistory([]);
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="glass-morphism sticky top-0 z-10 p-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-1 text-gray-700"
          >
            <ArrowLeft size={20} />
            <span>Back</span>
          </button>
          
          <h1 className="text-xl font-bold">Workout Timer</h1>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setShowHistory(true)}
          >
            <Clock size={20} />
          </Button>
        </div>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="text-center max-w-md w-full mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-1">Track Your Workout</h2>
            <p className="text-gray-600">Time yourself and save your results</p>
          </div>
          
          <div className="flex justify-center mb-8">
            <ExerciseTimer 
              showControls={true} 
              size="xl"
              onSaveTime={handleSaveTime}
            />
          </div>
        </div>
      </main>
      
      {/* History Dialog */}
      <Dialog open={showHistory} onOpenChange={setShowHistory}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Timer History</DialogTitle>
          </DialogHeader>
          
          <div className="max-h-[60vh] overflow-y-auto">
            {history.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Clock className="mx-auto mb-2 h-12 w-12 opacity-20" />
                <p>No timer history yet</p>
                <p className="text-sm">Complete a timed workout to save it here</p>
              </div>
            ) : (
              <>
                <div className="space-y-2">
                  {history.map((entry) => (
                    <motion.div
                      key={entry.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 border"
                    >
                      <div>
                        <p className="font-medium">{formatTime(entry.duration)}</p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(entry.date), 'MMM d, yyyy • h:mm a')}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-red-500 h-8"
                        onClick={() => handleDeleteEntry(entry.id)}
                      >
                        Delete
                      </Button>
                    </motion.div>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClearHistory}
                    className="text-red-500"
                  >
                    Clear All History
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TimerPage;
