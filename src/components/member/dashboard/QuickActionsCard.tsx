
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { CheckCircle2, IndianRupee } from 'lucide-react';
import { Member } from '@/types';

interface QuickActionsCardProps {
  member: Member;
}

const QuickActionsCard: React.FC<QuickActionsCardProps> = ({ member }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Link to="/member/check-in">
            <Button variant="outline" className="w-full justify-start">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Check-In
            </Button>
          </Link>
          <Link to="/member/workout">
            <Button variant="outline" className="w-full justify-start">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M18 8h1a4 4 0 1 1 0 8h-1"></path>
                <path d="M6 8h-1a4 4 0 1 0 0 8h1"></path>
                <line x1="2" y1="12" x2="22" y2="12"></line>
              </svg>
              Log Workout
            </Button>
          </Link>
        </div>
        
        {member.paymentStatus !== 'paid' && (
          <div className="mt-4">
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md">
              <h4 className="font-medium text-yellow-800 flex items-center">
                <IndianRupee className="h-4 w-4 mr-1" />
                Payment Required
              </h4>
              <p className="text-sm text-yellow-700 mt-1">
                Please contact the gym staff to make your payment.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuickActionsCard;
