
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample data for member retention
const retentionData = [
  { month: 'Jan', newMembers: 12, retained: 10, lost: 2 },
  { month: 'Feb', newMembers: 15, retained: 12, lost: 3 },
  { month: 'Mar', newMembers: 18, retained: 15, lost: 3 },
  { month: 'Apr', newMembers: 20, retained: 18, lost: 2 },
  { month: 'May', newMembers: 22, retained: 20, lost: 2 },
  { month: 'Jun', newMembers: 25, retained: 21, lost: 4 }
];

const RetentionChart: React.FC = () => {
  // Calculate retention rate
  const retentionRate = Math.round((retentionData.reduce((sum, item) => sum + item.retained, 0) / 
    retentionData.reduce((sum, item) => sum + item.newMembers, 0)) * 100);
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Member Retention</CardTitle>
        <CardDescription>
          Tracking member acquisition and retention over time
        </CardDescription>
        <div className="flex items-center justify-between mt-2">
          <div className="text-2xl font-bold">{retentionRate}%</div>
          <div className="text-sm text-muted-foreground">Retention Rate</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={retentionData}
              margin={{
                top: 20,
                right: 30,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="newMembers" fill="#2C8EFF" name="New Members" />
              <Bar dataKey="retained" fill="#4CAF50" name="Retained Members" />
              <Bar dataKey="lost" fill="#FF5252" name="Lost Members" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RetentionChart;
