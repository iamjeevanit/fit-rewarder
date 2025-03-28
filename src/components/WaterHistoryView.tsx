
import React from 'react';
import { Calendar, ChartBar, Droplet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { WaterTracking, formatWaterAmount } from '@/lib/waterIntakeData';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChartContainer } from "@/components/ui/chart";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer 
} from 'recharts';

interface WaterHistoryViewProps {
  waterData: WaterTracking;
}

// Group logs by date for the chart display
const groupLogsByDate = (logs: WaterTracking['logs']) => {
  const grouped = logs.reduce((acc, log) => {
    const date = new Date(log.timestamp).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += log.amount;
    return acc;
  }, {} as Record<string, number>);

  // Convert to array for chart
  return Object.entries(grouped).map(([date, amount]) => ({
    date,
    amount,
  })).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
};

const WaterHistoryView: React.FC<WaterHistoryViewProps> = ({ waterData }) => {
  // Group data for the chart
  const chartData = groupLogsByDate(waterData.logs);
  
  // Sort logs by date (newest first) for the log table
  const sortedLogs = [...waterData.logs].sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime()
  );

  return (
    <div className="space-y-6 animate-reveal">
      <Tabs defaultValue="chart">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="chart" className="flex items-center gap-2">
            <ChartBar className="h-4 w-4" />
            <span>Charts</span>
          </TabsTrigger>
          <TabsTrigger value="logs" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Daily Logs</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Chart View */}
        <TabsContent value="chart" className="animate-reveal">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <ChartBar className="mr-2 h-4 w-4 text-blue-500" />
                Water Intake Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ChartContainer
                  config={{
                    water: { color: "#3b82f6" },
                    goal: { color: "#94a3b8" }
                  }}
                >
                  <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 20, left: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis 
                      dataKey="date" 
                      tick={{ fontSize: 12 }} 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date);
                      }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `${value}ml`} 
                      tick={{ fontSize: 12 }}
                      width={50}
                    />
                    <Tooltip 
                      formatter={(value) => [`${value}ml`, 'Water Intake']}
                      labelFormatter={(label) => {
                        const date = new Date(label);
                        return new Intl.DateTimeFormat('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        }).format(date);
                      }}
                    />
                    <Bar 
                      dataKey="amount" 
                      fill="var(--color-water)" 
                      radius={[4, 4, 0, 0]}
                      name="Water"
                    />
                  </BarChart>
                </ChartContainer>
              </div>
              <div className="text-center text-sm text-gray-500 mt-4">
                {chartData.length === 0 ? (
                  <p>Start tracking your water intake to see your trends here!</p>
                ) : (
                  <p>Showing water intake for the last {chartData.length} days</p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Logs View */}
        <TabsContent value="logs" className="animate-reveal">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center">
                <Calendar className="mr-2 h-4 w-4 text-blue-500" />
                Water Intake History
              </CardTitle>
            </CardHeader>
            <CardContent>
              {sortedLogs.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Droplet className="h-12 w-12 mx-auto text-blue-200 mb-2" />
                  <p>No water intake records yet</p>
                  <p className="text-sm mt-2">Start tracking today for better hydration!</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date & Time</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sortedLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>
                          <div className="font-medium">
                            {new Date(log.timestamp).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {new Date(log.timestamp).toLocaleTimeString([], { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </TableCell>
                        <TableCell className="text-right font-medium text-blue-600">
                          {formatWaterAmount(log.amount)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default WaterHistoryView;
