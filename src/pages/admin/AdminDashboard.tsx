
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import StatCard from '@/components/dashboard/StatCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useMockData } from '@/context/MockDataContext';
import { Users, CalendarCheck, IndianRupee, AlertCircle, BarChart, UserPlus } from 'lucide-react';
import { ResponsiveContainer, BarChart as RechartBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const AdminDashboard = () => {
  const { getDashboardStats, members, payments } = useMockData();
  
  const stats = getDashboardStats();
  
  // Generate attendance data for the chart (mock data)
  const attendanceData = [
    { day: 'Mon', count: 12 },
    { day: 'Tue', count: 19 },
    { day: 'Wed', count: 15 },
    { day: 'Thu', count: 18 },
    { day: 'Fri', count: 22 },
    { day: 'Sat', count: 24 },
    { day: 'Sun', count: 10 },
  ];
  
  // Generate revenue data for the chart (mock data)
  const currentYear = new Date().getFullYear();
  const revenueData = [
    { month: 'Jan', revenue: 12000 },
    { month: 'Feb', revenue: 15000 },
    { month: 'Mar', revenue: 18000 },
    { month: 'Apr', revenue: stats.revenueThisMonth },
    { month: 'May', revenue: 0 },
    { month: 'Jun', revenue: 0 },
    { month: 'Jul', revenue: 0 },
    { month: 'Aug', revenue: 0 },
    { month: 'Sep', revenue: 0 },
    { month: 'Oct', revenue: 0 },
    { month: 'Nov', revenue: 0 },
    { month: 'Dec', revenue: 0 },
  ];

  // Get current month name
  const currentMonth = new Date().toLocaleString('default', { month: 'long' });
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Welcome back to GymPulse</p>
        </div>
        
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
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Attendance Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Weekly Attendance</span>
                <BarChart className="h-5 w-5 text-gray-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartBarChart
                    data={attendanceData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="count" name="Attendance" fill="#3B82F6" />
                  </RechartBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
          
          {/* Revenue Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>Monthly Revenue</span>
                <IndianRupee className="h-5 w-5 text-gray-500" />
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartBarChart
                    data={revenueData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`₹${value}`, 'Revenue']} />
                    <Legend />
                    <Bar dataKey="revenue" name="Revenue (₹)" fill="#10B981" />
                  </RechartBarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Members by Membership Type */}
          <Card>
            <CardHeader>
              <CardTitle>Membership Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Calculate membership type distribution */}
              {(() => {
                const membershipTypes = members.reduce((acc, member) => {
                  acc[member.membershipType] = (acc[member.membershipType] || 0) + 1;
                  return acc;
                }, {} as Record<string, number>);
                
                const membershipData = Object.entries(membershipTypes).map(([type, count]) => ({
                  type: type.charAt(0).toUpperCase() + type.slice(1),
                  count
                }));
                
                return (
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
                );
              })()}
            </CardContent>
          </Card>
          
          {/* Recent Payments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payments.length === 0 ? (
                  <p className="text-gray-500">No payments recorded yet.</p>
                ) : (
                  payments.slice(0, 5).map((payment) => {
                    const member = members.find(m => m.id === payment.memberId);
                    return (
                      <div key={payment.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                        <div>
                          <p className="font-medium">{member?.name || 'Unknown Member'}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(payment.date).toLocaleDateString()} • {payment.paymentMethod}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">₹{payment.amount}</p>
                          <p className="text-xs text-gray-500 capitalize">{payment.membershipType}</p>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
