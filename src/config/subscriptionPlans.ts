
import { SubscriptionTier, FeatureFlag, SubscriptionPlan } from '../types/subscription';

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    tier: SubscriptionTier.FREE,
    name: 'Free Trial',
    description: 'Basic gym management features for new businesses',
    price: 0,
    features: {
      [FeatureFlag.MEMBER_MANAGEMENT]: true,
      [FeatureFlag.PAYMENT_TRACKING]: true,
      [FeatureFlag.ATTENDANCE_TRACKING]: true,
      [FeatureFlag.REPORTS_BASIC]: true,
      [FeatureFlag.REPORTS_ADVANCED]: false,
      [FeatureFlag.STAFF_MANAGEMENT]: false,
      [FeatureFlag.WHATSAPP_INTEGRATION]: false,
      [FeatureFlag.EMAIL_NOTIFICATIONS]: false,
      [FeatureFlag.CUSTOM_BRANDING]: false,
      [FeatureFlag.API_ACCESS]: false,
    }
  },
  {
    tier: SubscriptionTier.BASIC,
    name: 'Basic',
    description: 'Essential features for small gym operations',
    price: 999,
    features: {
      [FeatureFlag.MEMBER_MANAGEMENT]: true,
      [FeatureFlag.PAYMENT_TRACKING]: true,
      [FeatureFlag.ATTENDANCE_TRACKING]: true,
      [FeatureFlag.REPORTS_BASIC]: true,
      [FeatureFlag.REPORTS_ADVANCED]: false,
      [FeatureFlag.STAFF_MANAGEMENT]: true,
      [FeatureFlag.WHATSAPP_INTEGRATION]: false,
      [FeatureFlag.EMAIL_NOTIFICATIONS]: true,
      [FeatureFlag.CUSTOM_BRANDING]: false,
      [FeatureFlag.API_ACCESS]: false,
    }
  },
  {
    tier: SubscriptionTier.PRO,
    name: 'Professional',
    description: 'Advanced features for growing gyms',
    price: 1999,
    features: {
      [FeatureFlag.MEMBER_MANAGEMENT]: true,
      [FeatureFlag.PAYMENT_TRACKING]: true,
      [FeatureFlag.ATTENDANCE_TRACKING]: true,
      [FeatureFlag.REPORTS_BASIC]: true,
      [FeatureFlag.REPORTS_ADVANCED]: true,
      [FeatureFlag.STAFF_MANAGEMENT]: true,
      [FeatureFlag.WHATSAPP_INTEGRATION]: true,
      [FeatureFlag.EMAIL_NOTIFICATIONS]: true,
      [FeatureFlag.CUSTOM_BRANDING]: false,
      [FeatureFlag.API_ACCESS]: false,
    }
  },
  {
    tier: SubscriptionTier.ENTERPRISE,
    name: 'Enterprise',
    description: 'Complete solution for large gym chains',
    price: 3999,
    features: {
      [FeatureFlag.MEMBER_MANAGEMENT]: true,
      [FeatureFlag.PAYMENT_TRACKING]: true,
      [FeatureFlag.ATTENDANCE_TRACKING]: true,
      [FeatureFlag.REPORTS_BASIC]: true,
      [FeatureFlag.REPORTS_ADVANCED]: true,
      [FeatureFlag.STAFF_MANAGEMENT]: true,
      [FeatureFlag.WHATSAPP_INTEGRATION]: true,
      [FeatureFlag.EMAIL_NOTIFICATIONS]: true,
      [FeatureFlag.CUSTOM_BRANDING]: true,
      [FeatureFlag.API_ACCESS]: true,
    }
  }
];
