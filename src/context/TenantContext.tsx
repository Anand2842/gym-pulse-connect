import React, { createContext, useContext, useState, useEffect } from 'react';
import { SubscriptionTier, FeatureFlag, SubscriptionPlan } from '../types/subscription';
import { subscriptionPlans } from '../config/subscriptionPlans';

export interface Tenant {
  id: string;
  name: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  subscriptionTier: SubscriptionTier;
  customDomain?: string;
  customFeatures?: Partial<Record<FeatureFlag, boolean>>; // Override specific features
}

interface TenantContextType {
  currentTenant: Tenant | null;
  setCurrentTenant: (tenant: Tenant | null) => void;
  isFeatureEnabled: (featureId: string | FeatureFlag) => boolean;
  getSubscriptionPlan: () => SubscriptionPlan | null;
  updateSubscription: (tier: SubscriptionTier) => void;
  features: {id: string, name: string, enabled: boolean}[];
  customizeTheme: (primaryColor: string, secondaryColor: string) => void;
}

const defaultTenantContext: TenantContextType = {
  currentTenant: null,
  setCurrentTenant: () => {},
  isFeatureEnabled: () => false,
  getSubscriptionPlan: () => null,
  updateSubscription: () => {},
  features: [],
  customizeTheme: () => {}
};

const TenantContext = createContext<TenantContextType>(defaultTenantContext);

// Feature definitions for UI display
const featureDefinitions = [
  {
    id: FeatureFlag.MEMBER_MANAGEMENT,
    name: 'Member Management',
    description: 'Add, edit, and manage gym members'
  },
  {
    id: FeatureFlag.PAYMENT_TRACKING,
    name: 'Payment Tracking',
    description: 'Record and track member payments'
  },
  {
    id: FeatureFlag.ATTENDANCE_TRACKING,
    name: 'Attendance Tracking',
    description: 'Track member check-ins and attendance'
  },
  {
    id: FeatureFlag.REPORTS_BASIC,
    name: 'Basic Reports',
    description: 'View simple reports and charts'
  },
  {
    id: FeatureFlag.REPORTS_ADVANCED,
    name: 'Advanced Analytics',
    description: 'Access detailed analytics and forecasting'
  },
  {
    id: FeatureFlag.STAFF_MANAGEMENT,
    name: 'Staff Management',
    description: 'Manage gym staff and trainers'
  },
  {
    id: FeatureFlag.WHATSAPP_INTEGRATION,
    name: 'WhatsApp Notifications',
    description: 'Send payment reminders via WhatsApp'
  },
  {
    id: FeatureFlag.EMAIL_NOTIFICATIONS,
    name: 'Email Notifications',
    description: 'Send automated email notifications'
  },
  {
    id: FeatureFlag.CUSTOM_BRANDING,
    name: 'Custom Branding',
    description: 'Customize colors and logo'
  },
  {
    id: FeatureFlag.API_ACCESS,
    name: 'API Access',
    description: 'Connect with external systems'
  }
];

interface TenantProviderProps {
  children: React.ReactNode;
}

export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [features, setFeatures] = useState<{id: string, name: string, enabled: boolean}[]>([]);
  
  // Initialize default tenant or fetch from storage/API
  useEffect(() => {
    const defaultTenant: Tenant = {
      id: 'gym-1',
      name: 'Fitness First',
      primaryColor: '#2C8EFF',
      secondaryColor: '#4CAF50',
      subscriptionTier: SubscriptionTier.BASIC,
      logoUrl: '/logo-fitness-first.png'
    };
    
    setCurrentTenant(defaultTenant);
  }, []);

  // Update features whenever tenant changes
  useEffect(() => {
    if (currentTenant) {
      updateFeaturesBasedOnSubscription();
      
      // Apply tenant's theme
      document.documentElement.style.setProperty('--gym-primary', currentTenant.primaryColor);
      document.documentElement.style.setProperty('--gym-secondary', currentTenant.secondaryColor);
    }
  }, [currentTenant]);
  
  const updateFeaturesBasedOnSubscription = () => {
    if (!currentTenant) return;
    
    const plan = getSubscriptionPlan();
    if (!plan) return;
    
    const enabledFeatures = featureDefinitions.map(feature => {
      // First check if there's a custom override for this feature
      if (currentTenant.customFeatures && feature.id in currentTenant.customFeatures) {
        return {
          ...feature,
          enabled: !!currentTenant.customFeatures[feature.id as FeatureFlag]
        };
      }
      
      // Otherwise use the subscription plan definition
      return {
        ...feature,
        enabled: plan.features[feature.id as FeatureFlag] || false
      };
    });
    
    setFeatures(enabledFeatures);
  };
  
  const getSubscriptionPlan = (): SubscriptionPlan | null => {
    if (!currentTenant) return null;
    
    return subscriptionPlans.find(plan => plan.tier === currentTenant.subscriptionTier) || null;
  };

  const isFeatureEnabled = (featureId: string | FeatureFlag): boolean => {
    if (!currentTenant) return false;
    
    // First check if there's a custom override for this feature
    if (currentTenant.customFeatures && featureId in currentTenant.customFeatures) {
      return !!currentTenant.customFeatures[featureId as FeatureFlag];
    }
    
    // Otherwise check the subscription plan
    const plan = getSubscriptionPlan();
    if (!plan) return false;
    
    if (Object.values(FeatureFlag).includes(featureId as FeatureFlag)) {
      return !!plan.features[featureId as FeatureFlag];
    }
    
    // Legacy string-based feature ID compatibility
    const feature = featureDefinitions.find(f => f.id === featureId);
    return feature ? isFeatureEnabled(feature.id as FeatureFlag) : false;
  };
  
  const updateSubscription = (tier: SubscriptionTier) => {
    if (!currentTenant) return;
    
    // In a real app, this would involve payment processing and API calls
    setCurrentTenant({
      ...currentTenant,
      subscriptionTier: tier
    });
    
    // Show toast or notification
    console.log(`Subscription updated to ${tier} for ${currentTenant.name}`);
  };
  
  // Allow customization of theme colors (premium feature)
  const customizeTheme = (primaryColor: string, secondaryColor: string) => {
    if (currentTenant && isFeatureEnabled(FeatureFlag.CUSTOM_BRANDING)) {
      document.documentElement.style.setProperty('--gym-primary', primaryColor);
      document.documentElement.style.setProperty('--gym-secondary', secondaryColor);
      
      setCurrentTenant({
        ...currentTenant,
        primaryColor,
        secondaryColor
      });
    }
  };
  
  return (
    <TenantContext.Provider value={{
      currentTenant,
      setCurrentTenant,
      isFeatureEnabled,
      getSubscriptionPlan,
      updateSubscription,
      features,
      customizeTheme
    }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);
