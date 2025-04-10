
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ServiceAccessMethod, ServiceAccessResult, hasValidAccess, clearAccessToken } from '@/services/paymentService';

interface ServiceContextType {
  hasAccess: boolean;
  accessMethod: ServiceAccessMethod | null;
  accessExpiry: Date | null;
  lastResult: ServiceAccessResult | null;
  setAccessResult: (result: ServiceAccessResult, method: ServiceAccessMethod) => void;
  clearAccess: () => void;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const [hasAccess, setHasAccess] = useState<boolean>(false);
  const [accessMethod, setAccessMethod] = useState<ServiceAccessMethod | null>(null);
  const [accessExpiry, setAccessExpiry] = useState<Date | null>(null);
  const [lastResult, setLastResult] = useState<ServiceAccessResult | null>(null);
  
  useEffect(() => {
    // Check for existing access on component mount
    const access = hasValidAccess();
    setHasAccess(access);
    
    // If access is expired, clear it
    if (!access) {
      clearAccessToken();
    }
    
    // Check expiry
    const expiryStr = localStorage.getItem('serviceAccessExpires');
    if (expiryStr) {
      try {
        setAccessExpiry(new Date(expiryStr));
      } catch (e) {
        setAccessExpiry(null);
      }
    }
    
    // Get access method if any
    const method = localStorage.getItem('serviceAccessMethod');
    if (method) {
      setAccessMethod(method as ServiceAccessMethod);
    }
  }, []);
  
  const setAccessResult = (result: ServiceAccessResult, method: ServiceAccessMethod) => {
    setLastResult(result);
    setHasAccess(result.success);
    
    if (result.success) {
      setAccessMethod(method);
      if (result.expiresAt) {
        setAccessExpiry(result.expiresAt);
        localStorage.setItem('serviceAccessMethod', method);
      }
    }
  };
  
  const clearAccess = () => {
    setHasAccess(false);
    setAccessMethod(null);
    setAccessExpiry(null);
    clearAccessToken();
    localStorage.removeItem('serviceAccessMethod');
  };
  
  return (
    <ServiceContext.Provider 
      value={{ 
        hasAccess, 
        accessMethod, 
        accessExpiry, 
        lastResult, 
        setAccessResult, 
        clearAccess 
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = (): ServiceContextType => {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error('useService must be used within a ServiceProvider');
  }
  return context;
};
