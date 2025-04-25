
/**
 * Service for handling payment and service access
 */

// Define available service access methods
export type ServiceAccessMethod = 'subscription' | 'oneTimePayment' | 'referral' | 'promoCode';

// Service access request interface
export interface ServiceAccessRequest {
  method: ServiceAccessMethod;
  promoCode?: string;
  email?: string;
  referralCode?: string;
}

// Service access result
export interface ServiceAccessResult {
  success: boolean;
  message: string;
  accessToken?: string;
  expiresAt?: Date;
}

/**
 * Process a service access request
 * This is a mock implementation that would connect to a real backend in production
 */
export const processServiceAccess = async (request: ServiceAccessRequest): Promise<ServiceAccessResult> => {
  // Simulate network request
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Mock implementation - in a real app, this would call an API
  switch (request.method) {
    case 'subscription':
      return {
        success: true,
        message: 'Subscription activated successfully. You now have access to all services.',
        accessToken: 'mock-subscription-token-' + Date.now(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
      };
    
    case 'oneTimePayment':
      return {
        success: true,
        message: 'Payment processed successfully. You now have access to the service.',
        accessToken: 'mock-payment-token-' + Date.now(),
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      };
    
    case 'referral':
      if (!request.referralCode) {
        return {
          success: false,
          message: 'Referral code is required',
        };
      }
      return {
        success: true,
        message: 'Referral validated successfully. You have been granted access.',
        accessToken: 'mock-referral-token-' + Date.now(),
        expiresAt: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      };
    
    case 'promoCode':
      if (!request.promoCode) {
        return {
          success: false,
          message: 'Promo code is required',
        };
      }
      
      // Validate promo code (this is just a mock)
      const validPromoCodes = ['WELCOME10', 'NEWUSER20', 'SPRING25'];
      if (!validPromoCodes.includes(request.promoCode)) {
        return {
          success: false,
          message: 'Invalid promo code',
        };
      }
      
      return {
        success: true,
        message: 'Promo code applied successfully. You have been granted access.',
        accessToken: 'mock-promo-token-' + Date.now(),
        expiresAt: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // 5 days
      };
    
    default:
      return {
        success: false,
        message: 'Invalid access method',
      };
  }
};

// Save access token to local storage
export const saveAccessToken = (result: ServiceAccessResult): void => {
  if (result.success && result.accessToken) {
    localStorage.setItem('serviceAccessToken', result.accessToken);
    localStorage.setItem('serviceAccessExpires', result.expiresAt?.toISOString() || '');
  }
};

// Check if user has valid access
export const hasValidAccess = (): boolean => {
  const token = localStorage.getItem('serviceAccessToken');
  const expiresStr = localStorage.getItem('serviceAccessExpires');
  
  if (!token || !expiresStr) return false;
  
  try {
    const expires = new Date(expiresStr);
    return expires > new Date();
  } catch (e) {
    return false;
  }
};

// Clear access token from storage
export const clearAccessToken = (): void => {
  localStorage.removeItem('serviceAccessToken');
  localStorage.removeItem('serviceAccessExpires');
};
