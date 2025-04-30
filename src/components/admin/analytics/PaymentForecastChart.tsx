
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Sample data for payment forecasting
const forecastData = [
  { month: 'Jan', actual: 18000, forecast: 18000 },
  { month: 'Feb', actual: 22000, forecast: 20000 },
  { month: 'Mar', actual: 25000, forecast: 24000 },
  { month: 'Apr', actual: 27500, forecast: 26000 },
  { month: 'May', actual: null, forecast: 29000 },
  { month: 'Jun', actual: null, forecast: 31500 },
  { month: 'Jul', actual: null, forecast: 32000 },
  { month: 'Aug', actual: null, forecast: 34000 },
];

const PaymentForecastChart: React.FC = () => {
  const currentMonth = new Date().toLocaleString('default', { month: 'short' });
  const projectedRevenue = forecastData.find(item => item.month === currentMonth)?.forecast || 0;
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Revenue Forecast</CardTitle>
        <CardDescription>
          Projected gym revenue for the next 4 months
        </CardDescription>
        <div className="flex items-center justify-between mt-2">
          <div className="text-2xl font-bold">₹{projectedRevenue.toLocaleString()}</div>
          <div className="text-sm text-muted-foreground">Projected Monthly Revenue</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={forecastData}
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
              <Tooltip formatter={(value) => [`₹${value}`, 'Amount']} />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="actual" 
                stroke="#4CAF50" 
                strokeWidth={2} 
                name="Actual Revenue"
                dot={{ stroke: '#4CAF50', strokeWidth: 2, r: 4 }}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="forecast" 
                stroke="#2C8EFF" 
                strokeDasharray="5 5" 
                strokeWidth={2}
                name="Forecasted Revenue"
                dot={{ stroke: '#2C8EFF', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PaymentForecastChart;
