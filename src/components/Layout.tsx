
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Timer, BarChart2, Award, Users, 
  Menu, X, Settings, LogOut, User, Dumbbell, Calendar, Droplet
} from 'lucide-react';
import { 
  Sheet, SheetContent, SheetHeader, 
  SheetTitle, SheetTrigger 
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface LayoutProps {
  children: React.ReactNode;
}

const navItems = [
  { name: 'Home', path: '/', icon: User },
  { name: 'Workouts', path: '/workouts', icon: Dumbbell },
  { name: 'Workout Plans', path: '/workout-plans', icon: Calendar },
  { name: 'Water Intake', path: '/water-intake', icon: Droplet },
  { name: 'Achievements', path: '/achievements', icon: Award },
  { name: 'Progress', path: '/progress', icon: BarChart2 },
];

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Mobile Header */}
      <header className="sticky top-0 z-10 bg-white border-b md:hidden">
        <div className="container flex items-center justify-between py-4">
          <h1 className="font-bold text-xl text-primary">FitTrack</h1>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[300px]">
              <SheetHeader>
                <SheetTitle className="text-primary">FitTrack</SheetTitle>
              </SheetHeader>
              <div className="py-4">
                <nav className="space-y-1">
                  {navItems.map((item) => (
                    <Button
                      key={item.name}
                      variant={isActive(item.path) ? "secondary" : "ghost"}
                      className="w-full justify-start text-left"
                      onClick={() => {
                        navigate(item.path);
                        setOpen(false);
                      }}
                    >
                      <item.icon className="mr-2 h-4 w-4" />
                      {item.name}
                    </Button>
                  ))}
                </nav>
                <Separator className="my-4" />
                <div className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start text-left">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex w-64 shrink-0 flex-col border-r bg-card h-screen sticky top-0">
          <div className="p-6">
            <h1 className="font-bold text-2xl text-primary">FitTrack</h1>
          </div>
          <nav className="space-y-1 px-4 flex-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant={isActive(item.path) ? "secondary" : "ghost"}
                className="w-full justify-start text-left"
                onClick={() => navigate(item.path)}
              >
                <item.icon className="mr-2 h-4 w-4" />
                {item.name}
              </Button>
            ))}
          </nav>
          <div className="border-t p-4">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start text-left">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
              <Button variant="ghost" className="w-full justify-start text-left">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 max-w-5xl mx-auto w-full">
          {children}
        </main>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden sticky bottom-0 w-full bg-card border-t">
        <div className="flex justify-around px-2 py-3">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant="ghost"
              size="icon"
              className={isActive(item.path) ? "text-primary bg-primary/10" : ""}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="h-5 w-5" />
            </Button>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Layout;
