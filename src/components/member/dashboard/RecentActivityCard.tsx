
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import { AttendanceRecord } from '@/types';

interface RecentActivityCardProps {
  memberAttendance: AttendanceRecord[];
}

const RecentActivityCard: React.FC<RecentActivityCardProps> = ({ memberAttendance }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        {memberAttendance.length > 0 ? (
          <div className="space-y-3">
            {memberAttendance.slice(0, 5).map((record) => (
              <div key={record.id} className="flex justify-between items-center border-b border-gray-100 pb-2 last:border-0 last:pb-0">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                    <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  </div>
                  <p className="text-sm">Checked in at {record.checkInTime}</p>
                </div>
                <p className="text-xs text-gray-500">
                  {new Date(record.date).toLocaleDateString('en-US', {
                    month: 'short', day: 'numeric'
                  })}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No recent activity to display</p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
