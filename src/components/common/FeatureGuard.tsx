
import React from 'react';
import { useTenant } from '@/context/TenantContext';
import { Card } from '@/components/ui/card';
import { Lock } from 'lucide-react';

interface FeatureGuardProps {
  featureId: string;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

const FeatureGuard: React.FC<FeatureGuardProps> = ({ 
  featureId, 
  fallback, 
  children 
}) => {
  const { isFeatureEnabled, currentTenant } = useTenant();
  
  if (!currentTenant) {
    return null;
  }
  
  if (isFeatureEnabled(featureId)) {
    return <>{children}</>;
  }
  
  // Default fallback if none provided
  if (!fallback) {
    return (
      <Card className="p-4 bg-gray-50 flex flex-col items-center justify-center min-h-[200px] text-center">
        <Lock className="h-10 w-10 text-gray-400 mb-2" />
        <h3 className="text-lg font-medium mb-1">Feature Not Available</h3>
        <p className="text-sm text-gray-500">
          This feature requires a higher subscription tier.
          Upgrade your plan to access {featureId.replace(/-/g, ' ')}.
        </p>
      </Card>
    );
  }
  
  return <>{fallback}</>;
};

export default FeatureGuard;
