
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import RetentionChart from './RetentionChart';
import PaymentForecastChart from './PaymentForecastChart';
import PeakHoursChart from './PeakHoursChart';
import MembershipTrendsChart from './MembershipTrendsChart';

const AdvancedAnalytics: React.FC = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Advanced Analytics</CardTitle>
        <CardDescription>
          In-depth analysis of gym performance and member behavior
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="members" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="members" className="pt-4 space-y-4">
            <RetentionChart />
          </TabsContent>
          
          <TabsContent value="revenue" className="pt-4 space-y-4">
            <PaymentForecastChart />
          </TabsContent>
          
          <TabsContent value="attendance" className="pt-4 space-y-4">
            <PeakHoursChart />
          </TabsContent>
          
          <TabsContent value="trends" className="pt-4 space-y-4">
            <MembershipTrendsChart />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default AdvancedAnalytics;
