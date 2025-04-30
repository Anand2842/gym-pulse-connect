
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import WhatsAppNotificationPanel from '@/components/admin/WhatsAppNotificationPanel';

const WhatsAppPage: React.FC = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">WhatsApp Communications</h1>
        <WhatsAppNotificationPanel />
      </div>
    </MainLayout>
  );
};

export default WhatsAppPage;
