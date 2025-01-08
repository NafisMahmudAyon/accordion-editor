'use client';
import React, { createContext, useContext, ReactNode } from 'react';
import { useAuth, useUser } from '@clerk/nextjs';

interface AuthProviderProps {
  children: ReactNode;
}

interface AuthContextType {
  isSignedIn: boolean;
  user: UserResource | null | undefined;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { isSignedIn = false } = useAuth();
  const { user } = useUser();

  const value: AuthContextType = { isSignedIn, user };

  console.log(user);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
