
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useTenant } from '@/context/TenantContext';

// Demo tenants for testing multi-tenancy
const demoTenants = [
  {
    id: 'gym-1',
    name: 'Fitness First',
    primaryColor: '#2C8EFF',
    secondaryColor: '#4CAF50',
    subscriptionTier: 'basic',
    logoUrl: '/logo-fitness-first.png'
  },
  {
    id: 'gym-2',
    name: 'Power Zone',
    primaryColor: '#FF5722',
    secondaryColor: '#673AB7',
    subscriptionTier: 'standard',
    logoUrl: '/logo-power-zone.png'
  },
  {
    id: 'gym-3',
    name: 'Elite Fitness Club',
    primaryColor: '#009688',
    secondaryColor: '#FFC107',
    subscriptionTier: 'premium',
    logoUrl: '/logo-elite-fitness.png'
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
  
  return (
    <div className="mb-4 p-2 bg-gray-50 rounded-md">
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
            <SelectItem key={tenant.id} value={tenant.id}>
              {tenant.name} ({tenant.subscriptionTier})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default TenantSelector;
