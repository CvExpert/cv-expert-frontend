// GlobalStateContext.tsx
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the shape of the state
interface GlobalFileState {
  projectName: string | null;
  file: File | null;
  submitted: boolean;
  progress: number;
}

// Create a context with a default value
const GlobalFileStateContext = createContext<
  | {
      state: GlobalFileState;
      setState: React.Dispatch<React.SetStateAction<GlobalFileState>>;
    }
  | undefined
>(undefined);

// Define the provider
export const GlobalFileStateProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize the state with default values
  const [state, setState] = useState<GlobalFileState>({
    projectName: null,
    file: null,
    submitted: false,
    progress: 0,
  });

  return (
    <GlobalFileStateContext.Provider value={{ state, setState }}>
      {children}
    </GlobalFileStateContext.Provider>
  );
};

// Custom hook to use the global state
export const useGlobalFileState = () => {
  const context = useContext(GlobalFileStateContext);
  if (!context) {
    throw new Error('useGlobalState must be used within a GlobalStateProvider');
  }
  return context;
};
