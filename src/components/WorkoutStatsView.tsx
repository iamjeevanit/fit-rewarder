
import React from 'react';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Tooltip } from 'recharts';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { workoutHistory, WorkoutRecord } from '@/lib/workoutData';
import { format, subDays, isAfter } from 'date-fns';

interface WorkoutStatsViewProps {
  records?: WorkoutRecord[];
}

const WorkoutStatsView: React.FC<WorkoutStatsViewProps> = ({ records = [] }) => {
  // Convert date strings to actual Date objects for the demo data
  const processedHistory = workoutHistory.map(item => ({
    ...item,
    date: new Date(item.date),
  }));
  
  // Get data for the last 30 days
  const thirtyDaysAgo = subDays(new Date(), 30);
  const recentHistory = processedHistory.filter(
    item => isAfter(new Date(item.date), thirtyDaysAgo)
  );
  
  // Process data for monthly view (aggregate by week)
  const weeklyData = processedHistory.reduce((acc, curr) => {
    const weekNum = Math.floor(new Date(curr.date).getDate() / 7) + 1;
    const month = format(new Date(curr.date), 'MMM');
    const key = `${month} W${weekNum}`;
    
    if (!acc[key]) {
      acc[key] = { week: key, count: 0 };
    }
    
    acc[key].count += curr.count;
    return acc;
  }, {} as Record<string, { week: string; count: number }>);
  
  const weeklyChartData = Object.values(weeklyData).slice(-8); // Last 8 weeks
  
  return (
    <div className="space-y-6 animate-reveal">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Workout Frequency (Last 30 Days)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ChartContainer
              config={{
                count: {
                  theme: {
                    light: "#8B5CF6",
                    dark: "#8B5CF6"
                  },
                  label: "Workouts"
                }
              }}
            >
              <BarChart data={recentHistory} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(date) => format(new Date(date), 'dd MMM')}
                  tick={{ fontSize: 12 }}
                />
                <YAxis allowDecimals={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent
                          className="border-none"
                          indicator="line"
                          payload={payload.map(entry => ({
                            ...entry,
                            name: 'count',
                            value: entry.value,
                            color: "#8B5CF6"
                          }))}
                          labelFormatter={(label) => 
                            format(new Date(payload[0].payload.date), 'EEEE, MMMM d')
                          }
                          nameKey="name"
                        />
                      )
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" name="count" fill="var(--color-count)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Weekly Workout Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ChartContainer
              config={{
                count: {
                  theme: {
                    light: "#0EA5E9",
                    dark: "#0EA5E9"
                  },
                  label: "Workouts"
                }
              }}
            >
              <LineChart data={weeklyChartData} margin={{ top: 10, right: 10, bottom: 20, left: 10 }}>
                <XAxis 
                  dataKey="week" 
                  tick={{ fontSize: 12 }}
                />
                <YAxis allowDecimals={false} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <ChartTooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <ChartTooltipContent
                          className="border-none"
                          indicator="dot"
                          payload={payload.map(entry => ({
                            ...entry,
                            name: 'count',
                            value: entry.value,
                            color: "#0EA5E9"
                          }))}
                          labelFormatter={(label) => payload[0].payload.week}
                          nameKey="name"
                        />
                      )
                    }
                    return null;
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="count" 
                  name="count"
                  stroke="var(--color-count)" 
                  strokeWidth={2}
                  dot={{ fill: "var(--color-count)", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ChartContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recent Workout Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Workouts</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentHistory.slice(0, 7).map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{format(new Date(entry.date), 'MMM dd, yyyy')}</TableCell>
                  <TableCell>{entry.count}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkoutStatsView;
