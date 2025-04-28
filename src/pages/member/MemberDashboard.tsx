
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useMockData } from '@/context/MockDataContext';
import { Member } from '@/types';
import MembershipCard from '@/components/member/MembershipCard';
import { CalendarDays, Clock, IndianRupee, CheckCircle2, BarChart3 } from 'lucide-react';

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
  const checkedInToday = memberAttendance.some(record => record.date === today);
  
  // Calculate attendance streak (consecutive days)
  const calculateStreak = () => {
    if (memberAttendance.length === 0) return 0;
    
    const sortedAttendance = [...memberAttendance].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    let streak = 0;
    let currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    
    // Check if checked in today
    const latestAttendance = new Date(sortedAttendance[0].date);
    latestAttendance.setHours(0, 0, 0, 0);
    
    // If not checked in today, start from yesterday
    if (currentDate.getTime() !== latestAttendance.getTime()) {
      currentDate.setDate(currentDate.getDate() - 1);
    }
    
    // Count consecutive days
    for (let i = 0; i < sortedAttendance.length; i++) {
      const attendanceDate = new Date(sortedAttendance[i].date);
      attendanceDate.setHours(0, 0, 0, 0);
      
      if (attendanceDate.getTime() === currentDate.getTime()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else if (attendanceDate.getTime() < currentDate.getTime()) {
        // Break streak
        break;
      }
    }
    
    return streak;
  };
  
  const attendanceStreak = calculateStreak();

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
            
            {/* Attendance Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium flex items-center">
                    <CalendarDays className="h-4 w-4 mr-2" />
                    Last Check-In
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {lastCheckIn ? (
                    <div>
                      <p className="font-semibold text-lg">
                        {new Date(lastCheckIn.date).toLocaleDateString('en-US', { 
                          weekday: 'long', month: 'short', day: 'numeric'
                        })}
                      </p>
                      <p className="text-sm text-gray-500">{lastCheckIn.checkInTime}</p>
                    </div>
                  ) : (
                    <p className="text-gray-500">No check-in records yet</p>
                  )}
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-base font-medium flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Attendance Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <p className="text-3xl font-bold text-gym-primary">{attendanceStreak}</p>
                    <p className="text-sm text-gray-500 mt-1">consecutive days</p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            {/* Activity Preview */}
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
          </div>
          
          {/* Membership Status */}
          <div className="space-y-6">
            <MembershipCard />
            
            {/* Quick Actions */}
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
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default MemberDashboard;
