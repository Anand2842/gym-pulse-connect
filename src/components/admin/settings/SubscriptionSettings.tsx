
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

const SubscriptionSettings = () => {
  const { currentTenant, features } = useTenant();
  
  if (!currentTenant) {
    return null;
  }
  
  const subscriptionTiers = [
    { 
      name: 'Basic', 
      price: '₹999/month',
      value: 'basic', 
      description: 'Essential features for small gyms' 
    },
    { 
      name: 'Standard', 
      price: '₹1,999/month',
      value: 'standard', 
      description: 'Complete solution for growing facilities' 
    },
    { 
      name: 'Premium', 
      price: '₹3,999/month',
      value: 'premium', 
      description: 'Advanced tools for established businesses' 
    },
  ];
  
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
            subscriptionTiers.find(tier => tier.value === currentTenant.subscriptionTier)?.name
          }</p>
          <p className="text-sm text-blue-600 mt-1">
            {subscriptionTiers.find(tier => tier.value === currentTenant.subscriptionTier)?.price}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {subscriptionTiers.map((tier) => (
            <Card key={tier.value} className={`border ${currentTenant.subscriptionTier === tier.value ? 'border-blue-500 ring-2 ring-blue-200' : ''}`}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-lg">{tier.name}</CardTitle>
                  {currentTenant.subscriptionTier === tier.value && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      Current
                    </Badge>
                  )}
                </div>
                <CardDescription>{tier.description}</CardDescription>
                <p className="text-lg font-bold mt-1">{tier.price}</p>
              </CardHeader>
              <CardContent className="space-y-2">
                <ul className="space-y-2">
                  {features
                    .filter(feature => 
                      tier.value === 'premium' || 
                      (tier.value === 'standard' && feature.requiredTier !== 'premium') ||
                      (tier.value === 'basic' && feature.requiredTier === 'basic')
                    )
                    .map(feature => (
                      <li key={feature.id} className="flex items-center text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-2" />
                        {feature.name}
                      </li>
                    ))
                  }
                  
                  {features
                    .filter(feature => 
                      (tier.value === 'basic' && feature.requiredTier !== 'basic') ||
                      (tier.value === 'standard' && feature.requiredTier === 'premium')
                    )
                    .map(feature => (
                      <li key={feature.id} className="flex items-center text-sm text-gray-400">
                        <X className="h-4 w-4 text-gray-300 mr-2" />
                        {feature.name}
                      </li>
                    ))
                  }
                </ul>
                
                {currentTenant.subscriptionTier !== tier.value && (
                  <Button 
                    className="w-full mt-4"
                    variant={
                      subscriptionTiers.findIndex(t => t.value === tier.value) >
                      subscriptionTiers.findIndex(t => t.value === currentTenant.subscriptionTier)
                        ? "default"
                        : "outline"
                    }
                  >
                    {subscriptionTiers.findIndex(t => t.value === tier.value) >
                      subscriptionTiers.findIndex(t => t.value === currentTenant.subscriptionTier)
                        ? "Upgrade"
                        : "Downgrade"
                    }
                  </Button>
                )}
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
