
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTenant } from '@/context/TenantContext';
import { Badge } from '@/components/ui/badge';
import { SubscriptionTier } from '@/types/subscription';

// Demo tenants for testing multi-tenancy
const demoTenants = [
  {
    id: 'gym-1',
    name: 'Fitness First',
    primaryColor: '#2C8EFF',
    secondaryColor: '#4CAF50',
    subscriptionTier: SubscriptionTier.BASIC,
    logoUrl: '/logo-fitness-first.png'
  },
  {
    id: 'gym-2',
    name: 'Power Zone',
    primaryColor: '#FF5722',
    secondaryColor: '#673AB7',
    subscriptionTier: SubscriptionTier.PRO,
    logoUrl: '/logo-power-zone.png'
  },
  {
    id: 'gym-3',
    name: 'Elite Fitness Club',
    primaryColor: '#009688',
    secondaryColor: '#FFC107',
    subscriptionTier: SubscriptionTier.ENTERPRISE,
    logoUrl: '/logo-elite-fitness.png'
  },
  {
    id: 'gym-4',
    name: 'Budget Gym',
    primaryColor: '#607D8B',
    secondaryColor: '#FFEB3B',
    subscriptionTier: SubscriptionTier.FREE,
    logoUrl: '/logo-budget-gym.png'
  }
];

const TenantSelector = () => {
  const { currentTenant, setCurrentTenant } = useTenant();
  
  const handleTenantChange = (tenantId: string) => {
    const selected = demoTenants.find(tenant => tenant.id === tenantId);
    if (selected) {
      setCurrentTenant(selected as any);
    }
  };
  
  // Helper function to get the badge color based on subscription tier
  const getTierBadgeColor = (tier: SubscriptionTier) => {
    switch (tier) {
      case SubscriptionTier.FREE:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case SubscriptionTier.BASIC:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case SubscriptionTier.PRO:
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case SubscriptionTier.ENTERPRISE:
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  
  // Helper function to get the subscription tier display name
  const getTierDisplayName = (tier: SubscriptionTier) => {
    switch (tier) {
      case SubscriptionTier.FREE:
        return 'Free';
      case SubscriptionTier.BASIC:
        return 'Basic';
      case SubscriptionTier.PRO:
        return 'Pro';
      case SubscriptionTier.ENTERPRISE:
        return 'Enterprise';
      default:
        return tier;
    }
  };
  
  return (
    <div className="mb-4 p-3 bg-gray-50 rounded-md">
      <p className="text-xs text-gray-500 mb-1">Demo Mode: Switch Gym</p>
      <Select 
        value={currentTenant?.id || 'gym-1'} 
        onValueChange={handleTenantChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select a gym" />
        </SelectTrigger>
        <SelectContent>
          {demoTenants.map(tenant => (
            <SelectItem key={tenant.id} value={tenant.id} className="flex items-center">
              <div className="flex justify-between w-full items-center">
                <span>{tenant.name}</span>
                <Badge className={getTierBadgeColor(tenant.subscriptionTier)}>
                  {getTierDisplayName(tenant.subscriptionTier)}
                </Badge>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {currentTenant && (
        <div className="mt-2 text-xs">
          <span className="text-gray-500">Current tier: </span>
          <Badge className={getTierBadgeColor(currentTenant.subscriptionTier as SubscriptionTier)}>
            {getTierDisplayName(currentTenant.subscriptionTier as SubscriptionTier)}
          </Badge>
        </div>
      )}
    </div>
  );
};

export default TenantSelector;
