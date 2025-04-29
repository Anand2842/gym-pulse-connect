
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart } from 'lucide-react';
import { ResponsiveContainer, BarChart as RechartBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface AttendanceChartProps {
  attendanceData: { day: string; count: number }[];
}

const AttendanceChart: React.FC<AttendanceChartProps> = ({ attendanceData }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Weekly Attendance</span>
          <BarChart className="h-5 w-5 text-gray-500" />
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartBarChart
              data={attendanceData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" name="Attendance" fill="#3B82F6" />
            </RechartBarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default AttendanceChart;
