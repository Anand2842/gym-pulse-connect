
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import AdvancedAnalytics from '@/components/admin/analytics/AdvancedAnalytics';

const AdvancedAnalyticsPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Advanced Analytics</h1>
        <AdvancedAnalytics />
      </div>
    </MainLayout>
  );
};

export default AdvancedAnalyticsPage;
