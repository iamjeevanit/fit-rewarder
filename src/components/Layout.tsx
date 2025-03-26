
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, Dumbbell, Award, Activity } from 'lucide-react';

const navigationItems = [
  { path: '/', icon: Home, label: 'Home' },
  { path: '/workouts', icon: Dumbbell, label: 'Workouts' },
  { path: '/achievements', icon: Award, label: 'Rewards' },
  { path: '/progress', icon: Activity, label: 'Progress' }
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <main className="flex-1 w-full max-w-md mx-auto px-4 pb-20 pt-6">
        {children}
      </main>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 z-10">
        <ul className="flex items-center justify-around max-w-md mx-auto">
          {navigationItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className="flex flex-col items-center py-3 px-6"
                >
                  <div className={`flex items-center justify-center transition-all duration-300 ${
                    isActive 
                      ? 'text-primary scale-110' 
                      : 'text-gray-400 hover:text-gray-700'
                  }`}>
                    <item.icon size={20} strokeWidth={2} />
                  </div>
                  <span 
                    className={`text-xs mt-1 font-medium transition-all duration-300 ${
                      isActive 
                        ? 'text-primary' 
                        : 'text-gray-500'
                    }`}
                  >
                    {item.label}
                  </span>
                  {isActive && (
                    <span className="absolute -bottom-[1px] left-1/2 w-8 h-0.5 bg-primary rounded-full -translate-x-1/2 transition-all duration-300" />
                  )}
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Layout;
