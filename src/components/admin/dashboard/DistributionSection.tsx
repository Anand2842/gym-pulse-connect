
import React from 'react';
import MembershipDistribution from './MembershipDistribution';
import RecentPayments from './RecentPayments';
import { Member, Payment } from '@/types';

interface DistributionSectionProps {
  members: Member[];
  payments: Payment[];
}

const DistributionSection: React.FC<DistributionSectionProps> = ({ members, payments }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <MembershipDistribution members={members} />
      <RecentPayments payments={payments} members={members} />
    </div>
  );
};

export default DistributionSection;
