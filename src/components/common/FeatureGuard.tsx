
import React from 'react';
import { useTenant } from '@/context/TenantContext';
import { Card } from '@/components/ui/card';
import { Lock } from 'lucide-react';
import { FeatureFlag } from '@/types/subscription';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

interface FeatureGuardProps {
  featureId: string | FeatureFlag;
  fallback?: React.ReactNode;
  children: React.ReactNode;
}

const FeatureGuard: React.FC<FeatureGuardProps> = ({ 
  featureId, 
  fallback, 
  children 
}) => {
  const { isFeatureEnabled, currentTenant, getSubscriptionPlan, updateSubscription } = useTenant();
  
  if (!currentTenant) {
    return null;
  }
  
  if (isFeatureEnabled(featureId)) {
    return <>{children}</>;
  }
  
  // Find the feature info for better display
  let featureName = typeof featureId === 'string' ? featureId.replace(/-/g, ' ') : featureId;
  
  // Find the lowest plan that has this feature
  const currentPlan = getSubscriptionPlan();
  if (!currentPlan) return null;
  
  // Default fallback if none provided
  if (!fallback) {
    const requiredPlan = findLowestPlanWithFeature(featureId);
    
    return (
      <Card className="p-6 bg-gray-50 flex flex-col items-center justify-center min-h-[200px] text-center">
        <Lock className="h-12 w-12 text-gray-400 mb-3" />
        <h3 className="text-xl font-medium mb-2">Premium Feature</h3>
        <p className="text-gray-600 mb-4 max-w-md mx-auto">
          {getFeatureDisplayName(featureId)} is available in the {requiredPlan?.name || 'higher'} plan.
          {requiredPlan && (
            <span className="block mt-1 text-sm">
              Upgrade for just ₹{(requiredPlan.price - currentPlan.price)} more per month.
            </span>
          )}
        </p>
        {requiredPlan && (
          <Button 
            variant="default" 
            className="flex gap-2 items-center mt-2"
            onClick={() => updateSubscription(requiredPlan.tier)}
          >
            Upgrade to {requiredPlan.name} <ArrowUpRight className="h-4 w-4" />
          </Button>
        )}
      </Card>
    );
  }
  
  return <>{fallback}</>;
};

// Helper function to get display name for a feature
function getFeatureDisplayName(featureId: string | FeatureFlag): string {
  if (typeof featureId === 'string') {
    // Convert kebab-case or snake_case to display text
    return featureId
      .replace(/-/g, ' ')
      .replace(/_/g, ' ')
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
  
  // For enum values, convert to display text
  return featureId
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

// Helper function to find the lowest subscription plan that includes a feature
function findLowestPlanWithFeature(featureId: string | FeatureFlag) {
  const { subscriptionPlans } = require('@/config/subscriptionPlans');
  
  return subscriptionPlans
    .filter(plan => {
      if (typeof featureId === 'string' && Object.values(FeatureFlag).includes(featureId as FeatureFlag)) {
        return plan.features[featureId as FeatureFlag];
      }
      
      // For string-based feature IDs (legacy support)
      const mappedFeature = featureId.toString().replace(/-/g, '_').toUpperCase();
      if (Object.values(FeatureFlag).includes(mappedFeature as FeatureFlag)) {
        return plan.features[mappedFeature as FeatureFlag];
      }
      
      return false;
    })
    .sort((a, b) => a.price - b.price)[0];
}

export default FeatureGuard;
