
import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Tenant {
  id: string;
  name: string;
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  subscriptionTier: 'basic' | 'standard' | 'premium';
  customDomain?: string;
}

export interface FeatureFlag {
  id: string;
  name: string;
  description: string;
  requiredTier: 'basic' | 'standard' | 'premium';
  enabled: boolean;
}

interface TenantContextType {
  currentTenant: Tenant | null;
  setCurrentTenant: (tenant: Tenant | null) => void;
  isFeatureEnabled: (featureId: string) => boolean;
  features: FeatureFlag[];
  customizeTheme: (primaryColor: string, secondaryColor: string) => void;
}

const defaultTenantContext: TenantContextType = {
  currentTenant: null,
  setCurrentTenant: () => {},
  isFeatureEnabled: () => false,
  features: [],
  customizeTheme: () => {}
};

const TenantContext = createContext<TenantContextType>(defaultTenantContext);

// List of features and their required subscription tiers
const featureDefinitions: Omit<FeatureFlag, 'enabled'>[] = [
  {
    id: 'member-management',
    name: 'Member Management',
    description: 'Add, edit, and manage gym members',
    requiredTier: 'basic'
  },
  {
    id: 'payment-tracking',
    name: 'Payment Tracking',
    description: 'Record and track member payments',
    requiredTier: 'basic'
  },
  {
    id: 'attendance',
    name: 'Attendance Tracking',
    description: 'Track member check-ins and attendance',
    requiredTier: 'basic'
  },
  {
    id: 'basic-analytics',
    name: 'Basic Analytics',
    description: 'View simple reports and charts',
    requiredTier: 'basic'
  },
  {
    id: 'whatsapp-notifications',
    name: 'WhatsApp Notifications',
    description: 'Send payment reminders via WhatsApp',
    requiredTier: 'standard'
  },
  {
    id: 'advanced-analytics',
    name: 'Advanced Analytics',
    description: 'Access detailed analytics and forecasting',
    requiredTier: 'premium'
  },
  {
    id: 'custom-branding',
    name: 'Custom Branding',
    description: 'Customize colors and logo',
    requiredTier: 'standard'
  },
  {
    id: 'gallery-management',
    name: 'Gallery Management',
    description: 'Manage gym photos and media',
    requiredTier: 'standard'
  }
];

interface TenantProviderProps {
  children: React.ReactNode;
}

export const TenantProvider: React.FC<TenantProviderProps> = ({ children }) => {
  const [currentTenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [features, setFeatures] = useState<FeatureFlag[]>([]);
  
  // Initialize features when tenant changes
  useEffect(() => {
    if (currentTenant) {
      const enabledFeatures = featureDefinitions.map(feature => ({
        ...feature,
        enabled: isFeatureAvailableForTier(feature.requiredTier, currentTenant.subscriptionTier)
      }));
      
      setFeatures(enabledFeatures);
      
      // Apply tenant's theme
      if (currentTenant.primaryColor) {
        document.documentElement.style.setProperty('--gym-primary', currentTenant.primaryColor);
      }
      if (currentTenant.secondaryColor) {
        document.documentElement.style.setProperty('--gym-secondary', currentTenant.secondaryColor);
      }
    }
  }, [currentTenant]);
  
  // Check if a feature is enabled for current tenant
  const isFeatureEnabled = (featureId: string): boolean => {
    if (!currentTenant) return false;
    
    const feature = features.find(f => f.id === featureId);
    return feature ? feature.enabled : false;
  };
  
  // Helper function to check if a feature tier is available for subscription tier
  const isFeatureAvailableForTier = (featureTier: string, subscriptionTier: string): boolean => {
    const tierLevels = {
      'basic': 0,
      'standard': 1,
      'premium': 2
    };
    
    return tierLevels[subscriptionTier as keyof typeof tierLevels] >= 
           tierLevels[featureTier as keyof typeof tierLevels];
  };
  
  // Allow customization of theme colors
  const customizeTheme = (primaryColor: string, secondaryColor: string) => {
    if (currentTenant && isFeatureEnabled('custom-branding')) {
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
      features,
      customizeTheme
    }}>
      {children}
    </TenantContext.Provider>
  );
};

export const useTenant = () => useContext(TenantContext);
