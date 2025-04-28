
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CheckInCard from '@/components/member/CheckInCard';
import MemberQRCode from '@/components/member/MemberQRCode';
import { useMockData } from '@/context/MockDataContext';
import { Member } from '@/types';
import { CalendarDays, QrCode } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const CheckIn = () => {
  const { currentUser, attendance } = useMockData();

  if (!currentUser || currentUser.role !== 'member') {
    return (
      <MainLayout>
        <div className="container mx-auto py-12 px-4 text-center">
          <h1 className="text-2xl font-semibold text-red-600">Access Denied</h1>
          <p className="mt-2">You don't have permission to view this page.</p>
        </div>
      </MainLayout>
    );
  }

  const member = currentUser as Member;
  
  // Filter attendance records for the current member
  const memberAttendance = attendance
    .filter(record => record.memberId === member.id)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Group attendance by month
  const groupByMonth = (records: typeof memberAttendance) => {
    return records.reduce((groups, record) => {
      const date = new Date(record.date);
      const month = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      
      if (!groups[month]) {
        groups[month] = [];
      }
      
      groups[month].push(record);
      return groups;
    }, {} as Record<string, typeof memberAttendance>);
  };
  
  const attendanceByMonth = groupByMonth(memberAttendance);

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Check-In</h1>
          <p className="text-gray-600">Mark your attendance and view history</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Check-In Section */}
          <div className="md:col-span-1">
            <Tabs defaultValue="manual">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="manual">Manual Check-in</TabsTrigger>
                <TabsTrigger value="qr">QR Code</TabsTrigger>
              </TabsList>
              
              <TabsContent value="manual">
                <CheckInCard />
              </TabsContent>
              
              <TabsContent value="qr">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <QrCode className="mr-2 h-5 w-5" />
                      QR Check-in
                    </CardTitle>
                    <CardDescription>
                      Show this QR code at the gym entrance
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-center">
                      <MemberQRCode size={200} />
                    </div>
                    <p className="text-sm text-gray-500 text-center mt-4">
                      Your QR code contains your unique membership information
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Attendance History */}
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CalendarDays className="mr-2 h-5 w-5" />
                  Attendance History
                </CardTitle>
                <CardDescription>
                  Your gym visit records
                </CardDescription>
              </CardHeader>
              <CardContent>
                {Object.keys(attendanceByMonth).length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No attendance records yet</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {Object.entries(attendanceByMonth).map(([month, records]) => (
                      <div key={month}>
                        <h3 className="font-medium text-lg mb-3">{month}</h3>
                        <div className="space-y-2">
                          {records.map(record => (
                            <div 
                              key={record.id} 
                              className="flex justify-between items-center p-3 rounded-md border border-gray-200 hover:bg-gray-50"
                            >
                              <div className="flex items-center">
                                <div className="bg-blue-100 text-blue-800 h-10 w-10 rounded-full flex items-center justify-center mr-4">
                                  {new Date(record.date).getDate()}
                                </div>
                                <div>
                                  <p className="font-medium">
                                    {new Date(record.date).toLocaleDateString('en-US', { 
                                      weekday: 'long', day: 'numeric', month: 'long' 
                                    })}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium">
                                  Check-in time:
                                </p>
                                <p className="text-sm text-gray-500">
                                  {record.checkInTime}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
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

export default CheckIn;
