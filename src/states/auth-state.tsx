import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the authentication state
interface GlobalAuthState {
  isSignedIn: boolean;
}

// Create a context with a default value
const GlobalAuthStateContext = createContext<
  | {
      state: GlobalAuthState;
      setState: React.Dispatch<React.SetStateAction<GlobalAuthState>>;
    }
  | undefined
>(undefined);

// Define the provider
export const GlobalAuthStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize the state with default values
  const [state, setState] = useState<GlobalAuthState>({
    isSignedIn: false, // Default to false
  });

  return (
    <GlobalAuthStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalAuthStateContext.Provider>
  );
};

// Custom hook to use the authentication state
export const useGlobalAuthState = () => {
  const context = useContext(GlobalAuthStateContext);
  if (!context) {
    throw new Error('useGlobalAuthState must be used within a GlobalAuthStateProvider');
  }
  return context;
};
