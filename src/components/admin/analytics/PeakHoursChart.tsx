
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for gym peak hours
const peakHoursData = [
  { time: '6 AM', count: 8 },
  { time: '8 AM', count: 15 },
  { time: '10 AM', count: 12 },
  { time: '12 PM', count: 9 },
  { time: '2 PM', count: 7 },
  { time: '4 PM', count: 14 },
  { time: '6 PM', count: 25 },
  { time: '8 PM', count: 22 },
  { time: '10 PM', count: 10 },
];

const PeakHoursChart: React.FC = () => {
  const peakTime = [...peakHoursData].sort((a, b) => b.count - a.count)[0];
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Peak Hours Analysis</CardTitle>
        <CardDescription>
          Most active hours at the gym
        </CardDescription>
        <div className="flex items-center justify-between mt-2">
          <div className="text-2xl font-bold">{peakTime.time}</div>
          <div className="text-sm text-muted-foreground">Peak Activity Time</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={peakHoursData}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Area 
                type="monotone" 
                dataKey="count" 
                stroke="#2C8EFF" 
                fill="#2C8EFF" 
                fillOpacity={0.2} 
                name="Member Count"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PeakHoursChart;
