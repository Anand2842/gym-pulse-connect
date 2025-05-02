
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import WhatsAppNotificationPanel from '@/components/admin/WhatsAppNotificationPanel';
import FeatureGuard from '@/components/common/FeatureGuard';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

const WhatsAppPage = () => {
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">WhatsApp Notifications</h1>
        
        <FeatureGuard 
          featureId="whatsapp-notifications"
          fallback={
            <div className="border border-gray-200 rounded-lg bg-gray-50 p-8 text-center">
              <h2 className="text-xl font-semibold mb-2">Unlock WhatsApp Integration</h2>
              <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                Send automatic payment reminders and notifications to your members via WhatsApp.
                Available with the Standard and Premium subscription plans.
              </p>
              <Button variant="default" className="flex gap-2 items-center mx-auto">
                Upgrade to Standard <ArrowUpRight className="h-4 w-4" />
              </Button>
            </div>
          }
        >
          <WhatsAppNotificationPanel />
        </FeatureGuard>
      </div>
    </MainLayout>
  );
};

export default WhatsAppPage;
