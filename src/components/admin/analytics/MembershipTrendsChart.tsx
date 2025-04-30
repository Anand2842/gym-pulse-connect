
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample data for membership trends
const membershipTrendsData = [
  { month: 'Jan', monthly: 25, quarterly: 15, yearly: 10, total: 50 },
  { month: 'Feb', monthly: 30, quarterly: 18, yearly: 12, total: 60 },
  { month: 'Mar', monthly: 35, quarterly: 20, yearly: 15, total: 70 },
  { month: 'Apr', monthly: 40, quarterly: 22, yearly: 18, total: 80 },
  { month: 'May', monthly: 45, quarterly: 25, yearly: 20, total: 90 },
  { month: 'Jun', monthly: 50, quarterly: 28, yearly: 22, total: 100 },
];

const MembershipTrendsChart: React.FC = () => {
  // Calculate growth rate
  const firstMonth = membershipTrendsData[0].total;
  const lastMonth = membershipTrendsData[membershipTrendsData.length - 1].total;
  const growthRate = Math.round(((lastMonth - firstMonth) / firstMonth) * 100);
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Membership Trends</CardTitle>
        <CardDescription>
          Growth of different membership types
        </CardDescription>
        <div className="flex items-center justify-between mt-2">
          <div className="text-2xl font-bold">+{growthRate}%</div>
          <div className="text-sm text-muted-foreground">Growth Rate</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={membershipTrendsData}
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
              <Line 
                type="monotone" 
                dataKey="monthly" 
                name="Monthly" 
                stroke="#FF9800" 
                activeDot={{ r: 8 }} 
              />
              <Line 
                type="monotone" 
                dataKey="quarterly" 
                name="Quarterly" 
                stroke="#2196F3" 
              />
              <Line 
                type="monotone" 
                dataKey="yearly" 
                name="Yearly" 
                stroke="#4CAF50" 
              />
              <Line 
                type="monotone" 
                dataKey="total" 
                name="Total Members" 
                stroke="#9C27B0" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default MembershipTrendsChart;
