
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Workouts from "./pages/Workouts";
import Achievements from "./pages/Achievements";
import Progress from "./pages/Progress";
import NotFound from "./pages/NotFound";
import WorkoutSession from "./pages/WorkoutSession";
import TimerPage from "./pages/TimerPage";
import WorkoutPlans from "./pages/WorkoutPlans";
import WorkoutPlanDetail from "./pages/WorkoutPlanDetail";
import WaterIntake from "./pages/WaterIntake";
import WorkoutStats from "./pages/WorkoutStats";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner position="top-center" closeButton={true} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/workout-plans" element={<WorkoutPlans />} />
          <Route path="/workout-plans/:planId" element={<WorkoutPlanDetail />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/workout/:workoutId" element={<WorkoutSession />} />
          <Route path="/timer" element={<TimerPage />} />
          <Route path="/water-intake" element={<WaterIntake />} />
          <Route path="/workout-stats" element={<WorkoutStats />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
