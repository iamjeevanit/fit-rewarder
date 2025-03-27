
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { workoutData } from '@/lib/workoutData';
import { ArrowLeft, Play, Pause, CheckCircle, XCircle, ChevronRight, Info, Timer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import ExerciseTimer from '@/components/ExerciseTimer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const WorkoutSession = () => {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [isResting, setIsResting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [restTime, setRestTime] = useState(30); // Rest time in seconds
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutTime, setWorkoutTime] = useState(0);
  
  const workout = workoutData.find(w => w.id === workoutId);
  
  useEffect(() => {
    if (!workout) {
      toast.error("Workout not found");
      navigate('/workouts');
    }
  }, [workout, navigate]);
  
  // Start the workout timer
  const startWorkout = () => {
    setWorkoutStarted(true);
    toast.success("Workout started!");
  };
  
  // Save workout time to history when complete
  const handleFinishWorkout = () => {
    // If we have a workout time recorded, save it to history
    if (workoutTime > 0) {
      navigate('/timer', { state: { timeToSave: workoutTime } });
    } else {
      navigate('/');
      toast.success("Workout session saved!");
    }
  };
  
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
  
  const handleTogglePause = () => {
    setIsPaused(!isPaused);
    if (isPaused) {
      toast.info("Workout resumed");
    } else {
      toast.info("Workout paused");
    }
  };
  
  // Get exercise instructions based on workout type
  const getExerciseInstructions = () => {
    if (!workout) return { steps: [], tips: [], resources: [] };
    
    switch (workout.name.toLowerCase()) {
      case 'push-ups':
        return {
          steps: [
            "Start in a plank position with your hands slightly wider than shoulder-width apart",
            "Keep your body in a straight line from head to heels",
            "Lower your body until your chest nearly touches the floor",
            "Push back up to the starting position by fully extending your arms",
            "Breathe out as you push up, breathe in as you lower down"
          ],
          tips: [
            "Keep your core engaged throughout the movement",
            "Don't let your hips sag or pike up",
            "For beginners, try knee push-ups until you build more strength",
            "Look slightly ahead of you, not straight down, to maintain proper neck alignment"
          ],
          resources: [
            "ACE Fitness Guide to Perfect Push-ups",
            "National Academy of Sports Medicine - Push-up Variations"
          ]
        };
      case 'air squats':
        return {
          steps: [
            "Stand with feet shoulder-width apart, toes slightly turned out",
            "Extend arms forward at shoulder height for balance (optional)",
            "Bend at the knees and hips, lowering until thighs are parallel to the ground",
            "Keep your chest up and back straight",
            "Push through your heels to return to standing position"
          ],
          tips: [
            "Keep your weight in your heels, not your toes",
            "Make sure your knees track over your toes, not caving inward",
            "Maintain a neutral spine throughout the movement",
            "Go as low as comfortable while maintaining good form"
          ],
          resources: [
            "Harvard Health - The Right Way to Do Squats",
            "ACE Fitness - Squat Technique Guide"
          ]
        };
      case 'plank':
        return {
          steps: [
            "Start in a forearm position with elbows directly below shoulders",
            "Extend your legs behind you, with only your toes and forearms touching the ground",
            "Create a straight line from your head to your heels",
            "Look at the floor about a foot in front of your hands to maintain neutral neck position",
            "Hold the position while breathing normally"
          ],
          tips: [
            "Engage your core by drawing your navel toward your spine",
            "Don't hold your breath - breathe normally throughout the hold",
            "Avoid sagging hips or raising your buttocks too high",
            "Start with shorter holds (20-30 seconds) and gradually increase time"
          ],
          resources: [
            "National Strength and Conditioning Association - Plank Guide",
            "Mayo Clinic - Core Exercises: Plank Variations"
          ]
        };
      case 'burpees':
        return {
          steps: [
            "Start standing with feet shoulder-width apart",
            "Squat down and place hands on the floor in front of you",
            "Jump feet back into a plank position",
            "Perform a push-up (optional for additional challenge)",
            "Jump feet forward back to squat position",
            "Explosively jump up with arms overhead",
            "Land softly and immediately begin the next repetition"
          ],
          tips: [
            "Modify by stepping back instead of jumping if needed",
            "Focus on controlled movements rather than speed initially",
            "Land softly with bent knees to protect your joints",
            "Take breaks as needed - proper form is more important than rep count"
          ],
          resources: [
            "ACE Fitness - How to Do a Proper Burpee",
            "ACSM's Complete Guide to Fitness & Health - Burpee Technique"
          ]
        };
      case 'mountain climbers':
        return {
          steps: [
            "Start in a push-up/plank position with arms straight",
            "Keep your hands directly under your shoulders, core tight",
            "Bring one knee toward your chest, keeping foot off the ground",
            "Quickly switch legs, bringing the other knee forward",
            "Continue alternating legs in a running motion"
          ],
          tips: [
            "Keep your hips level - don't let them rise up",
            "Maintain a tight core throughout the exercise",
            "Start slow and focus on form before increasing speed",
            "Breathe rhythmically - don't hold your breath"
          ],
          resources: [
            "NASM - Mountain Climber Technique Guide",
            "Journal of Strength and Conditioning Research - Mountain Climber Benefits"
          ]
        };
      case 'lunges':
        return {
          steps: [
            "Stand tall with feet hip-width apart",
            "Step forward with one leg, lowering your hips until both knees are bent at 90 degrees",
            "Front knee should be directly above ankle, not pushed forward past your toes",
            "Back knee should hover just above the ground",
            "Push through the heel of your front foot to return to starting position",
            "Repeat with the opposite leg"
          ],
          tips: [
            "Keep your upper body straight, shoulders back and relaxed",
            "Look straight ahead and keep your chin parallel to the ground",
            "Step far enough forward to allow proper knee alignment",
            "For balance issues, hold onto a sturdy chair or wall until comfortable"
          ],
          resources: [
            "American Council on Exercise - Lunge Guide",
            "Journal of Sports Science & Medicine - Lunge Biomechanics"
          ]
        };
      default:
        return {
          steps: [
            "Start in proper form position",
            "Follow controlled movement patterns",
            "Focus on proper breathing",
            "Maintain good form throughout the exercise"
          ],
          tips: [
            "Maintain proper form over higher repetitions",
            "Focus on the mind-muscle connection",
            "Start with lighter weights or modifications if needed",
            "Consult with a fitness professional for personalized guidance"
          ],
          resources: [
            "ACE Fitness Exercise Library",
            "National Academy of Sports Medicine Exercise Guide"
          ]
        };
    }
  };
  
  const exerciseInfo = getExerciseInstructions();
  
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
        {!workoutStarted ? (
          /* Workout Start Screen */
          <div className="glass-card rounded-2xl p-6 animate-reveal text-center">
            <div className="bg-primary/10 text-primary p-3 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <Timer size={32} />
            </div>
            <h2 className="font-bold text-xl mb-2">Ready to start {workout.name}?</h2>
            <p className="text-gray-600 mb-6">
              This workout consists of {workout.defaultSets} sets of {workout.defaultReps} reps.
              We'll track your time and help you maintain proper form.
            </p>
            
            <div className="glass-card rounded-xl p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Target Muscles</span>
                <span className="font-medium">{workout.targetMuscles.join(', ')}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Difficulty</span>
                <span className="font-medium capitalize">{workout.difficulty}</span>
              </div>
            </div>
            
            <Button 
              onClick={startWorkout}
              className="w-full"
            >
              Start Workout
              <Play size={16} />
            </Button>
          </div>
        ) : !isComplete ? (
          <>
            {/* Workout Timer */}
            <div className="glass-card rounded-2xl p-4 mb-4 animate-reveal">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-600">Workout Time</h3>
                <ExerciseTimer 
                  showControls={false}
                  size="sm"
                  isPaused={isPaused}
                  onTimeUpdate={setWorkoutTime}
                />
              </div>
            </div>
            
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
              /* Exercise Instructions with Tabs */
              <div className="glass-card rounded-2xl p-6 animate-reveal">
                <Tabs defaultValue="instructions" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-4">
                    <TabsTrigger value="instructions">Instructions</TabsTrigger>
                    <TabsTrigger value="details">Expert Tips</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="instructions" className="mt-0">
                    <h2 className="font-semibold text-lg mb-4">How to Perform {workout.name}</h2>
                    
                    <ol className="space-y-3 mb-5">
                      {exerciseInfo.steps.map((step, index) => (
                        <li key={index} className="flex items-start">
                          <span className="bg-primary/10 text-primary font-medium rounded-full w-6 h-6 flex items-center justify-center mr-2 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-sm">{step}</span>
                        </li>
                      ))}
                    </ol>
                    
                    <Button 
                      onClick={handleCompleteSet}
                      className="w-full mt-4"
                    >
                      Complete Set {currentSet}
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="details" className="mt-0">
                    <div className="mb-5">
                      <h3 className="font-medium text-md mb-2 flex items-center gap-1">
                        <Info size={16} className="text-primary" />
                        Expert Tips
                      </h3>
                      <ul className="space-y-2">
                        {exerciseInfo.tips.map((tip, index) => (
                          <li key={index} className="flex items-start">
                            <span className="bg-green-100 text-green-800 p-1 rounded-full mr-2 flex-shrink-0">
                              <CheckCircle size={14} />
                            </span>
                            <span className="text-sm">{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mb-3">
                      <h3 className="font-medium text-md mb-2">Further Resources</h3>
                      <ul className="space-y-1 text-sm text-primary">
                        {exerciseInfo.resources.map((resource, index) => (
                          <li key={index} className="underline">{resource}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button 
                      onClick={handleCompleteSet}
                      className="w-full mt-4"
                    >
                      Complete Set {currentSet}
                    </Button>
                  </TabsContent>
                </Tabs>
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
              <div className="flex justify-between mb-2">
                <span className="text-gray-600">Target Muscles</span>
                <span className="font-medium">{workout.targetMuscles.join(', ')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Workout Time</span>
                <span className="font-medium">{Math.floor(workoutTime / 60)}:{(workoutTime % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>
            
            <Button 
              onClick={handleFinishWorkout}
              className="w-full"
            >
              Finish & Save Time
              <ChevronRight size={16} />
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default WorkoutSession;
