
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CalendarDays, BarChart3 } from 'lucide-react';
import { AttendanceRecord } from '@/types';

interface AttendanceStatsProps {
  lastCheckIn: AttendanceRecord | null;
  attendanceStreak: number;
}

const AttendanceStats: React.FC<AttendanceStatsProps> = ({ lastCheckIn, attendanceStreak }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium flex items-center">
            <CalendarDays className="h-4 w-4 mr-2" />
            Last Check-In
          </CardTitle>
        </CardHeader>
        <CardContent>
          {lastCheckIn ? (
            <div>
              <p className="font-semibold text-lg">
                {new Date(lastCheckIn.date).toLocaleDateString('en-US', { 
                  weekday: 'long', month: 'short', day: 'numeric'
                })}
              </p>
              <p className="text-sm text-gray-500">{lastCheckIn.checkInTime}</p>
            </div>
          ) : (
            <p className="text-gray-500">No check-in records yet</p>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium flex items-center">
            <BarChart3 className="h-4 w-4 mr-2" />
            Attendance Streak
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center">
            <p className="text-3xl font-bold text-gym-primary">{attendanceStreak}</p>
            <p className="text-sm text-gray-500 mt-1">consecutive days</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AttendanceStats;
