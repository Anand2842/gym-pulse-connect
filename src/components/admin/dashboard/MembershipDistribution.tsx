
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Member } from '@/types';

interface MembershipDistributionProps {
  members: Member[];
}

const MembershipDistribution: React.FC<MembershipDistributionProps> = ({ members }) => {
  // Calculate membership type distribution
  const membershipTypes = members.reduce((acc, member) => {
    acc[member.membershipType] = (acc[member.membershipType] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  
  const membershipData = Object.entries(membershipTypes).map(([type, count]) => ({
    type: type.charAt(0).toUpperCase() + type.slice(1),
    count
  }));
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Membership Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {membershipData.map(({ type, count }) => (
            <div key={type} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{type}</span>
                <span className="text-sm text-gray-500">{count} members</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${(count / members.length) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MembershipDistribution;
