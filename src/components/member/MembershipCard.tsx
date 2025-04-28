
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useMockData } from '@/context/MockDataContext';
import { Member } from '@/types';
import { CalendarDays, Clock } from 'lucide-react';

const MembershipCard = () => {
  const { currentUser } = useMockData();

  if (!currentUser || currentUser.role !== 'member') {
    return null;
  }

  const member = currentUser as Member;

  const calculateDaysLeft = () => {
    const endDate = new Date(member.membershipEndDate);
    const today = new Date();
    
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays > 0 ? diffDays : 0;
  };

  const calculateProgress = () => {
    const startDate = new Date(member.lastPaymentDate || member.joinDate);
    const endDate = new Date(member.membershipEndDate);
    const today = new Date();
    
    const totalDays = (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    const daysElapsed = (today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24);
    
    if (daysElapsed > totalDays) return 100;
    if (daysElapsed < 0) return 0;
    
    return Math.round((daysElapsed / totalDays) * 100);
  };

  const daysLeft = calculateDaysLeft();
  const progressPercentage = calculateProgress();

  // Format dates for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Status indicator based on payment status
  const getStatusIndicator = () => {
    switch (member.paymentStatus) {
      case 'paid':
        return { color: 'bg-green-500', text: 'Active' };
      case 'pending':
        return { color: 'bg-yellow-500', text: 'Pending Payment' };
      case 'overdue':
        return { color: 'bg-red-500', text: 'Overdue' };
      default:
        return { color: 'bg-gray-500', text: 'Unknown' };
    }
  };

  const statusIndicator = getStatusIndicator();

  return (
    <Card className="w-full">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="font-semibold text-lg">Membership Status</h3>
            <div className="flex items-center mt-1">
              <div className={`h-2.5 w-2.5 rounded-full ${statusIndicator.color} mr-2`}></div>
              <p className="text-sm text-gray-600">{statusIndicator.text}</p>
            </div>
          </div>
          <div className="bg-blue-50 px-3 py-1 rounded-full text-xs font-medium text-blue-700 capitalize">
            {member.membershipType} Plan
          </div>
        </div>

        <div className="space-y-4 mt-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <CalendarDays size={16} className="mr-2" />
              <span>Valid Until</span>
            </div>
            <span className="font-medium">{formatDate(member.membershipEndDate)}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center text-gray-600">
              <Clock size={16} className="mr-2" />
              <span>Days Remaining</span>
            </div>
            <span className="font-medium">{daysLeft} days</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-gray-600">Membership Progress</span>
              <span className="font-medium">{progressPercentage}%</span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          {member.paymentStatus === 'overdue' && (
            <div className="bg-red-50 border border-red-200 p-3 rounded-md mt-2">
              <p className="text-sm text-red-700">
                Your membership has expired. Please make a payment to continue using gym facilities.
              </p>
            </div>
          )}

          {member.paymentStatus === 'pending' && (
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md mt-2">
              <p className="text-sm text-yellow-700">
                Payment pending. Please complete your payment to activate your membership.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MembershipCard;
