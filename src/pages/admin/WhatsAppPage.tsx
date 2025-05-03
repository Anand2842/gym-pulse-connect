
import React from 'react';
import MainLayout from '@/components/layout/MainLayout';
import WhatsAppNotificationPanel from '@/components/admin/WhatsAppNotificationPanel';
import FeatureGuard from '@/components/common/FeatureGuard';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, MessageSquare } from 'lucide-react';
import { FeatureFlag } from '@/types/subscription';
import { useTenant } from '@/context/TenantContext';

const WhatsAppPage = () => {
  const { getSubscriptionPlan, updateSubscription } = useTenant();
  const currentPlan = getSubscriptionPlan();
  
  // Find the lowest plan that has WhatsApp integration
  const requiredPlan = currentPlan?.features[FeatureFlag.WHATSAPP_INTEGRATION] 
    ? null 
    : findPlanWithWhatsApp();
  
  function findPlanWithWhatsApp() {
    const { subscriptionPlans } = require('@/config/subscriptionPlans');
    return subscriptionPlans
      .filter(plan => plan.features[FeatureFlag.WHATSAPP_INTEGRATION])
      .sort((a, b) => a.price - b.price)[0];
  }
  
  const handleUpgrade = () => {
    if (requiredPlan) {
      updateSubscription(requiredPlan.tier);
    }
  };
  
  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">WhatsApp Notifications</h1>
        
        <FeatureGuard 
          featureId={FeatureFlag.WHATSAPP_INTEGRATION}
          fallback={
            <div className="border border-gray-200 rounded-lg bg-gray-50 p-8 text-center">
              <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold mb-2">Unlock WhatsApp Integration</h2>
              <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                Send automatic payment reminders and notifications to your members via WhatsApp.
                {requiredPlan && currentPlan && (
                  <span className="block mt-2">
                    Available with the {requiredPlan.name} plan (₹{requiredPlan.price}/month).
                    Upgrade for just ₹{requiredPlan.price - currentPlan.price} more per month.
                  </span>
                )}
              </p>
              <Button 
                variant="default" 
                className="flex gap-2 items-center mx-auto"
                onClick={handleUpgrade}
              >
                Upgrade to {requiredPlan?.name} <ArrowUpRight className="h-4 w-4" />
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
