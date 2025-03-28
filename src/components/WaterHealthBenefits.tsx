
import React from 'react';
import { Activity, Droplet, Heart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Health tips and benefits information
const healthTips = [
  { 
    id: 'brain',
    icon: <Activity className="h-5 w-5 text-purple-500" />,
    title: 'Brain Function',
    description: 'Even mild dehydration (1-3% of body weight) can impair many aspects of brain function. Stay hydrated to improve concentration and memory.',
  },
  { 
    id: 'metabolism',
    icon: <Heart className="h-5 w-5 text-red-500" />,
    title: 'Metabolism',
    description: 'Proper hydration can boost your metabolism by up to 30% and help with weight management.',
  },
  { 
    id: 'detox',
    icon: <Droplet className="h-5 w-5 text-blue-500" />,
    title: 'Natural Detoxification',
    description: 'Water helps your kidneys filter waste from your blood and keep your organs functioning properly.',
  },
];

// Hydration recommendations based on activity level
const hydrationSuggestions = [
  {
    id: 'sedentary',
    title: 'Sedentary Lifestyle',
    amount: '2 liters (8 cups)',
    description: 'For people who are mostly inactive throughout the day.',
  },
  {
    id: 'moderate',
    title: 'Moderately Active',
    amount: '2.5 liters (10 cups)',
    description: 'For people who engage in light exercise or are on their feet for part of the day.',
  },
  {
    id: 'active',
    title: 'Very Active',
    amount: '3+ liters (12+ cups)',
    description: 'For people who exercise regularly or have physically demanding jobs.',
  },
];

const WaterHealthBenefits: React.FC = () => {
  return (
    <div className="space-y-6 animate-reveal">
      {/* Health Benefits Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Heart className="mr-2 h-4 w-4 text-red-500" />
            Benefits of Proper Hydration
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {healthTips.map((tip) => (
              <div key={tip.id} className="flex items-start gap-3">
                <div className="bg-gray-50 p-2 rounded-lg">{tip.icon}</div>
                <div>
                  <h4 className="font-medium text-sm">{tip.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recommendations Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center">
            <Droplet className="mr-2 h-4 w-4 text-blue-500" />
            Personalized Hydration Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-5">
            {hydrationSuggestions.map((suggestion, index) => (
              <div key={suggestion.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-2 h-2 rounded-full ${
                      index === 0 ? 'bg-blue-300' :
                      index === 1 ? 'bg-blue-500' :
                      'bg-blue-700'
                    } mr-2`}></div>
                    <h4 className="font-medium text-sm">{suggestion.title}</h4>
                  </div>
                  <span className="font-semibold text-blue-600 text-sm">{suggestion.amount}</span>
                </div>
                <p className="text-sm text-gray-600 mt-1 pl-4">{suggestion.description}</p>
              </div>
            ))}
            <div className="bg-blue-50 p-3 rounded-lg mt-4">
              <p className="text-sm text-blue-800">
                <strong>Pro Tip:</strong> Increase your intake on hot days, during illness, or when exercising. Your body loses more water in these situations.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WaterHealthBenefits;
