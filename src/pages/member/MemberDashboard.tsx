
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useMockData } from '@/context/MockDataContext';
import { Member } from '@/types';
import MembershipCard from '@/components/member/MembershipCard';
import MemberQRCode from '@/components/member/MemberQRCode';
import TodayStatusCard from '@/components/member/dashboard/TodayStatusCard';
import AttendanceStats from '@/components/member/dashboard/AttendanceStats';
import RecentActivityCard from '@/components/member/dashboard/RecentActivityCard';
import QuickActionsCard from '@/components/member/dashboard/QuickActionsCard';
import { calculateAttendanceStreak, isCheckedInToday } from '@/components/member/dashboard/AttendanceUtils';

const MemberDashboard = () => {
  const { currentUser, attendance } = useMockData();

  if (!currentUser || currentUser.role !== 'member') {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl font-semibold text-red-600">Access Denied</h1>
          <p className="mt-2">You don't have permission to view this page.</p>
          <Link to="/">
            <Button className="mt-4">Return to Home</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const member = currentUser as Member;
  
  // Filter attendance records for the current member
  const memberAttendance = attendance.filter(record => record.memberId === member.id);
  
  // Get last check-in
  const lastCheckIn = memberAttendance.length > 0 
    ? memberAttendance.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0]
    : null;
    
  // Check if checked in today
  const today = new Date().toISOString().split('T')[0];
  const checkedInToday = isCheckedInToday(memberAttendance);
  
  // Calculate attendance streak
  const attendanceStreak = calculateAttendanceStreak(memberAttendance);

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Welcome, {member.name}</h1>
          <p className="text-gray-600">Track your fitness journey with GymPulse</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="md:col-span-2 space-y-6">
            {/* Check-in Status Card */}
            <TodayStatusCard checkedInToday={checkedInToday} today={today} />
            
            {/* Attendance Stats */}
            <AttendanceStats lastCheckIn={lastCheckIn} attendanceStreak={attendanceStreak} />
            
            {/* Activity Preview */}
            <RecentActivityCard memberAttendance={memberAttendance} />
          </div>
          
          {/* Right Column - Membership Status */}
          <div className="space-y-6">
            {/* QR Code Card - Added for quick check-in */}
            <MemberQRCode size={180} />
            
            {/* Membership Status */}
            <MembershipCard />
            
            {/* Quick Actions */}
            <QuickActionsCard member={member} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MemberDashboard;
