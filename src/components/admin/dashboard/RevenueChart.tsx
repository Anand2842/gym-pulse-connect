
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { IndianRupee } from 'lucide-react';
import { ResponsiveContainer, BarChart as RechartBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface RevenueChartProps {
  revenueData: { month: string; revenue: number }[];
}

const RevenueChart: React.FC<RevenueChartProps> = ({ revenueData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Monthly Revenue</span>
          <IndianRupee className="h-5 w-5 text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartBarChart
              data={revenueData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
              <Legend />
              <Bar dataKey="revenue" name="Revenue (₹)" fill="#10B981" />
            </RechartBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default RevenueChart;
