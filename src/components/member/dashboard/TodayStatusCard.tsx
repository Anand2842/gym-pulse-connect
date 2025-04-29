
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle2, Clock } from 'lucide-react';

interface TodayStatusCardProps {
  checkedInToday: boolean;
  today: string;
}

const TodayStatusCard: React.FC<TodayStatusCardProps> = ({ checkedInToday, today }) => {
  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Today's Status</h3>
          <span className="text-sm text-gray-500">{today}</span>
        </div>
        
        {checkedInToday ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="font-semibold">Checked In</p>
                <p className="text-sm text-gray-500">Keep up the good work!</p>
              </div>
            </div>
            <Link to="/member/check-in">
              <Button variant="outline" size="sm">View Details</Button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold">Not Checked In</p>
                <p className="text-sm text-gray-500">Don't miss your workout today!</p>
              </div>
            </div>
            <Link to="/member/check-in">
              <Button className="bg-gym-primary hover:bg-blue-600">Check In Now</Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TodayStatusCard;
