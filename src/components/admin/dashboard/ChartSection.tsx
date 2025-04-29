
import React from 'react';
import AttendanceChart from './AttendanceChart';
import RevenueChart from './RevenueChart';

interface ChartSectionProps {
  attendanceData: { day: string; count: number }[];
  revenueData: { month: string; revenue: number }[];
}

const ChartSection: React.FC<ChartSectionProps> = ({ attendanceData, revenueData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <AttendanceChart attendanceData={attendanceData} />
      <RevenueChart revenueData={revenueData} />
    </div>
  );
};

export default ChartSection;
