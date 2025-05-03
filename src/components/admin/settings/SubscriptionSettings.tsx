
import React from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useTenant } from '@/context/TenantContext';
import { Check, X } from 'lucide-react';
import { subscriptionPlans } from '@/config/subscriptionPlans';
import { SubscriptionTier, FeatureFlag } from '@/types/subscription';
import { toast } from '@/components/ui/use-toast';

const SubscriptionSettings = () => {
  const { currentTenant, getSubscriptionPlan, updateSubscription, features } = useTenant();
  
  if (!currentTenant) {
    return null;
  }

  const currentPlan = getSubscriptionPlan();
  
  const handleSubscriptionChange = (tier: SubscriptionTier) => {
    if (!currentTenant) return;
    
    // Don't do anything if selecting current tier
    if (tier === currentTenant.subscriptionTier) {
      return;
    }
    
    // Simulate subscription change
    updateSubscription(tier);
    
    // Show success message
    toast({
      title: "Subscription updated",
      description: `Your subscription has been changed to ${getTierDisplayName(tier)}`,
    });
  };
  
  // Helper to get display name for subscription tiers
  const getTierDisplayName = (tier: SubscriptionTier) => {
    return tier.charAt(0).toUpperCase() + tier.slice(1);
  };
  
  // Helper to format price with currency
  const formatPrice = (price: number) => {
    return `₹${price}`;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Plan</CardTitle>
        <CardDescription>
          Manage your subscription and features
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-blue-50 p-4 rounded-md">
          <p className="font-medium">Current Plan: {
            currentPlan ? getTierDisplayName(currentPlan.tier) : '-'
          }</p>
          <p className="text-sm text-blue-600 mt-1">
            {currentPlan ? formatPrice(currentPlan.price) + '/month' : '-'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {subscriptionPlans.map((plan) => (
            <Card key={plan.tier} className={`border ${currentTenant.subscriptionTier === plan.tier ? 'border-blue-500 ring-2 ring-blue-200' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{plan.name}</CardTitle>
                  {currentTenant.subscriptionTier === plan.tier && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Current
                    </Badge>
                  )}
                </div>
                <CardDescription>{plan.description}</CardDescription>
                <p className="text-lg font-bold mt-1">{formatPrice(plan.price)}<span className="text-sm font-normal">/month</span></p>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {Object.entries(plan.features)
                    .map(([featureId, isEnabled]) => {
                      // Find the feature display name
                      const feature = features.find(f => f.id === featureId);
                      return { 
                        id: featureId, 
                        name: feature?.name || featureId.replace(/_/g, ' '), 
                        enabled: isEnabled 
                      };
                    })
                    .sort((a, b) => Number(b.enabled) - Number(a.enabled)) // Enabled features first
                    .map(feature => (
                      <div key={feature.id} className="flex items-center text-sm">
                        {feature.enabled ? (
                          <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        ) : (
                          <X className="h-4 w-4 text-gray-300 mr-2 flex-shrink-0" />
                        )}
                        <span className={feature.enabled ? '' : 'text-gray-400'}>
                          {feature.name}
                        </span>
                      </div>
                    ))
                  }
                </div>
                
                <Button 
                  className="w-full mt-4"
                  variant={
                    currentTenant.subscriptionTier === plan.tier
                      ? "outline"
                      : "default"
                  }
                  disabled={currentTenant.subscriptionTier === plan.tier}
                  onClick={() => handleSubscriptionChange(plan.tier)}
                >
                  {currentTenant.subscriptionTier === plan.tier
                    ? "Current Plan"
                    : "Select Plan"
                  }
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-sm text-gray-500">
          <p>Next billing date: June 1, 2025</p>
          <p className="mt-1">Contact support@gympulseconnect.com for billing assistance</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubscriptionSettings;
