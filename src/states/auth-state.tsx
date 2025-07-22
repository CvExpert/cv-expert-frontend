import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { validateAndHydrateAuth, clearAuth } from '@/auth/auth-utils';

// Define the authentication state interface
interface GlobalAuthState {
  isSignedIn: boolean;
  userID: string;
  email: string;
  name: string;
}

// Create context with default value
const GlobalAuthStateContext = createContext<
  | {
      state: GlobalAuthState;
      setState: React.Dispatch<React.SetStateAction<GlobalAuthState>>;
      logout: () => void;
    }
  | undefined
>(undefined);

// Provider component
export const GlobalAuthStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load state from localStorage on first render
  const [state, setState] = useState<GlobalAuthState>(() => {
    const savedState = localStorage.getItem('authState');
    return savedState
      ? JSON.parse(savedState)
      : { isSignedIn: false, userID: '', email: '', name: '' };
  });

  // Hydrate from cookie on mount and on every refresh
  useEffect(() => {
    async function checkAuth() {
      await validateAndHydrateAuth(setState);
    }
    checkAuth();
    // Listen for storage changes (multi-tab logout/login)
    window.addEventListener('storage', checkAuth);
    return () => window.removeEventListener('storage', checkAuth);
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('authState', JSON.stringify(state));
  }, [state]);

  // Add logout utility
  const logout = () => {
    clearAuth();
    setState({ isSignedIn: false, userID: '', email: '', name: '' });
  };

  return (
    <GlobalAuthStateContext.Provider value={{ state, setState, logout }}>
      {children}
    </GlobalAuthStateContext.Provider>
  );
};

// Custom hook to use global authentication state
export const useGlobalAuthState = () => {
  const context = useContext(GlobalAuthStateContext);
  if (!context) {
    throw new Error('useGlobalAuthState must be used within a GlobalAuthStateProvider');
  }
  return context;
};
