
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { workoutData } from '@/lib/workoutData';
import { ArrowLeft, Play, Pause, CheckCircle, XCircle, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import ExerciseTimer from '@/components/ExerciseTimer';

const WorkoutSession = () => {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [restTime, setRestTime] = useState(30); // Rest time in seconds
  
  const workout = workoutData.find(w => w.id === workoutId);
  
  useEffect(() => {
    if (!workout) {
      toast.error("Workout not found");
      navigate('/workouts');
    }
  }, [workout, navigate]);
  
  if (!workout) return null;
  
  const handleCompleteSet = () => {
    if (currentSet < workout.defaultSets) {
      setIsResting(true);
      toast.success(`Set ${currentSet} completed! Rest for ${restTime} seconds.`);
      setCurrentSet(currentSet + 1);
    } else {
      setIsComplete(true);
      toast.success("Workout completed! Great job!");
    }
  };
  
  const handleSkipRest = () => {
    setIsResting(false);
  };
  
  const handleFinishWorkout = () => {
    navigate('/');
    toast.success("Workout session saved!");
  };
  
  const handleTogglePause = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      toast.info("Workout resumed");
    } else {
      toast.info("Workout paused");
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
          
          <h1 className="text-xl font-bold">{workout.name}</h1>
          
          <Button 
            variant="ghost" 
            size="icon"
            onClick={handleTogglePause}
          >
            {isPaused ? <Play size={20} /> : <Pause size={20} />}
          </Button>
        </div>
      </header>
      
      <main className="flex-1 p-4 max-w-md mx-auto w-full">
        {!isComplete ? (
          <>
            {/* Workout Progress */}
            <div className="glass-card rounded-2xl p-6 mb-6 animate-reveal">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="font-semibold text-lg">{workout.name}</h2>
                  <p className="text-sm text-gray-600">{workout.description}</p>
                </div>
              </div>
              
              <div className="w-full bg-gray-100 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-primary h-2.5 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${(currentSet / workout.defaultSets) * 100}%` }}
                />
              </div>
              
              <div className="flex justify-between text-sm">
                <span>Set {currentSet} of {workout.defaultSets}</span>
                <span>{workout.defaultReps} reps</span>
              </div>
            </div>
            
            {isResting ? (
              /* Rest Timer */
              <div className="glass-card rounded-2xl p-6 animate-reveal text-center">
                <h2 className="font-semibold text-lg mb-4">Rest Time</h2>
                <ExerciseTimer 
                  duration={restTime} 
                  isPaused={isPaused}
                  onComplete={handleSkipRest}
                />
                <p className="text-gray-600 mt-4 mb-6">
                  Rest between sets to recover. Take deep breaths and stay hydrated.
                </p>
                <Button onClick={handleSkipRest}>
                  Skip Rest
                </Button>
              </div>
            ) : (
              /* Exercise Instructions */
              <div className="glass-card rounded-2xl p-6 animate-reveal">
                <h2 className="font-semibold text-lg mb-4">Current Exercise</h2>
                
                <div className="mb-6">
                  <p className="text-gray-700 mb-4">
                    Perform {workout.defaultReps} repetitions with proper form.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2 flex-shrink-0">
                        <CheckCircle size={16} />
                      </span>
                      <span className="text-sm">Maintain proper form throughout the movement</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2 flex-shrink-0">
                        <CheckCircle size={16} />
                      </span>
                      <span className="text-sm">Control your breathing - exhale during exertion</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-red-100 text-red-800 p-1 rounded-full mr-2 flex-shrink-0">
                        <XCircle size={16} />
                      </span>
                      <span className="text-sm">Avoid rushing through repetitions</span>
                    </li>
                  </ul>
                </div>
                
                <div className="flex flex-col gap-3">
                  <Button 
                    onClick={handleCompleteSet}
                    className="w-full"
                  >
                    Complete Set {currentSet}
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Workout Complete */
          <div className="glass-card rounded-2xl p-6 animate-reveal text-center">
            <div className="bg-green-100 text-green-800 p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} />
            </div>
            <h2 className="font-bold text-xl mb-2">Workout Complete!</h2>
            <p className="text-gray-600 mb-6">Great job! You've completed all sets of {workout.name}.</p>
            
            <div className="glass-card rounded-xl p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Total Sets</span>
                <span className="font-medium">{workout.defaultSets}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Total Reps</span>
                <span className="font-medium">{workout.defaultSets * workout.defaultReps}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Target Muscles</span>
                <span className="font-medium">{workout.targetMuscles.join(', ')}</span>
              </div>
            </div>
            
            <Button 
              onClick={handleFinishWorkout}
              className="w-full"
            >
              Finish Workout
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default WorkoutSession;
