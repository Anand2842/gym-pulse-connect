
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useMockData } from '@/context/MockDataContext';
import { Member } from '@/types';
import { CheckCircle, Clock } from 'lucide-react';

const CheckInCard = () => {
  const { currentUser, recordAttendance } = useMockData();
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [checkInTime, setCheckInTime] = useState<string | null>(null);

  if (!currentUser || currentUser.role !== 'member') {
    return null;
  }

  const member = currentUser as Member;

  const handleCheckIn = async () => {
    setIsLoading(true);
    try {
      const attendance = await recordAttendance(member.id);
      setIsCheckedIn(true);
      setCheckInTime(attendance.checkInTime);
    } catch (error) {
      console.error('Error recording attendance:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const today = new Date().toLocaleDateString('en-IN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const currentTime = new Date().toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Daily Check-In</span>
          <span className="text-sm font-normal text-gray-500">{today}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-8">
        {isCheckedIn ? (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Successfully Checked In!</h3>
            <div className="mt-2 flex items-center justify-center text-gray-500">
              <Clock className="mr-1 h-4 w-4" />
              <span>Check-in time: {checkInTime}</span>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="mx-auto w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Ready to work out?</h3>
            <p className="mt-1 text-gray-500">Current time: {currentTime}</p>
            <Button
              onClick={handleCheckIn}
              className="mt-6 bg-gym-primary hover:bg-blue-600"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Check In Now"}
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-center text-xs text-gray-500">
        Your attendance is tracked automatically
      </CardFooter>
    </Card>
  );
};

export default CheckInCard;
