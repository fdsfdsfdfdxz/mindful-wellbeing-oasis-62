
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
  isLoggedIn: boolean;
  userEmail: string | null;
  login: (email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  useEffect(() => {
    // Check for existing login on component mount
    const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
    const email = localStorage.getItem('userEmail');
    
    setIsLoggedIn(loginStatus);
    setUserEmail(email);
  }, []);
  
  const login = (email: string) => {
    setIsLoggedIn(true);
    setUserEmail(email);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);
  };
  
  const logout = () => {
    setIsLoggedIn(false);
    setUserEmail(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userEmail');
  };
  
  return (
    <AuthContext.Provider 
      value={{ 
        isLoggedIn, 
        userEmail, 
        login, 
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
