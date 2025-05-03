
export enum SubscriptionTier {
  FREE = 'free',
  BASIC = 'basic',
  PRO = 'pro',
  ENTERPRISE = 'enterprise'
}

export enum FeatureFlag {
  MEMBER_MANAGEMENT = 'member_management',
  PAYMENT_TRACKING = 'payment_tracking',
  ATTENDANCE_TRACKING = 'attendance_tracking',
  REPORTS_BASIC = 'reports_basic',
  REPORTS_ADVANCED = 'reports_advanced',
  STAFF_MANAGEMENT = 'staff_management',
  WHATSAPP_INTEGRATION = 'whatsapp_integration',
  EMAIL_NOTIFICATIONS = 'email_notifications',
  CUSTOM_BRANDING = 'custom_branding',
  API_ACCESS = 'api_access'
}

export interface SubscriptionFeatures {
  [FeatureFlag.MEMBER_MANAGEMENT]: boolean;
  [FeatureFlag.PAYMENT_TRACKING]: boolean;
  [FeatureFlag.ATTENDANCE_TRACKING]: boolean;
  [FeatureFlag.REPORTS_BASIC]: boolean;
  [FeatureFlag.REPORTS_ADVANCED]: boolean;
  [FeatureFlag.STAFF_MANAGEMENT]: boolean;
  [FeatureFlag.WHATSAPP_INTEGRATION]: boolean;
  [FeatureFlag.EMAIL_NOTIFICATIONS]: boolean;
  [FeatureFlag.CUSTOM_BRANDING]: boolean;
  [FeatureFlag.API_ACCESS]: boolean;
}

export interface SubscriptionPlan {
  tier: SubscriptionTier;
  name: string;
  description: string;
  price: number;
  features: SubscriptionFeatures;
}
