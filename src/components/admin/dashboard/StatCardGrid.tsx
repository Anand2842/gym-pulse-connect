
import React from 'react';
import StatCard from '@/components/dashboard/StatCard';
import { Users, CalendarCheck, IndianRupee, AlertCircle, UserPlus } from 'lucide-react';
import { DashboardStats } from '@/types';

interface StatCardGridProps {
  stats: DashboardStats;
  currentMonth: string;
  currentYear: number;
}

const StatCardGrid: React.FC<StatCardGridProps> = ({ stats, currentMonth, currentYear }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <StatCard 
        title="Total Members" 
        value={stats.totalMembers} 
        icon={<Users className="h-6 w-6 text-blue-600" />} 
      />
      <StatCard 
        title="Active Members" 
        value={stats.activeMembers} 
        icon={<Users className="h-6 w-6 text-green-600" />} 
        change={`${Math.round((stats.activeMembers / stats.totalMembers) * 100)}% of total`}
        trend="neutral"
      />
      <StatCard 
        title="Attendance Today" 
        value={stats.attendanceToday} 
        icon={<CalendarCheck className="h-6 w-6 text-blue-600" />} 
      />
      <StatCard 
        title="Revenue This Month" 
        value={`₹${stats.revenueThisMonth.toLocaleString()}`} 
        icon={<IndianRupee className="h-6 w-6 text-blue-600" />} 
        change={`${currentMonth} ${currentYear}`}
        trend="neutral"
      />
      <StatCard 
        title="Overdue Payments" 
        value={stats.overduePayments} 
        icon={<AlertCircle className="h-6 w-6 text-red-600" />} 
      />
      <StatCard 
        title="New Members This Month" 
        value={stats.newMembersThisMonth} 
        icon={<UserPlus className="h-6 w-6 text-purple-600" />} 
      />
    </div>
  );
};

export default StatCardGrid;
