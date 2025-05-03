
import React, { useEffect } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { useMockData } from '@/context/MockDataContext';
import DashboardHeader from '@/components/admin/dashboard/DashboardHeader';
import StatCardGrid from '@/components/admin/dashboard/StatCardGrid';
import ChartSection from '@/components/admin/dashboard/ChartSection';
import DistributionSection from '@/components/admin/dashboard/DistributionSection';
import TenantSelector from '@/components/admin/TenantSelector';
import { useTenant } from '@/context/TenantContext';
import FeatureGuard from '@/components/common/FeatureGuard';
import { SubscriptionTier } from '@/types/subscription';

const AdminDashboard = () => {
  const { getDashboardStats, members, payments } = useMockData();
  const { currentTenant, setCurrentTenant } = useTenant();
  
  const stats = getDashboardStats();
  
  // Initialize with default tenant if none selected
  useEffect(() => {
    if (!currentTenant) {
      setCurrentTenant({
        id: 'gym-1',
        name: 'Fitness First',
        primaryColor: '#2C8EFF',
        secondaryColor: '#4CAF50',
        subscriptionTier: SubscriptionTier.BASIC
      });
    }
  }, [currentTenant, setCurrentTenant]);
  
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
        {/* Demo tenant selector */}
        <TenantSelector />
        
        <DashboardHeader />
        
        <StatCardGrid 
          stats={stats} 
          currentMonth={currentMonth} 
          currentYear={currentYear} 
        />
        
        <ChartSection 
          attendanceData={attendanceData} 
          revenueData={revenueData} 
        />
        
        <FeatureGuard featureId="advanced-analytics">
          <DistributionSection 
            members={members} 
            payments={payments} 
          />
        </FeatureGuard>
      </div>
    </MainLayout>
  );
};

export default AdminDashboard;
