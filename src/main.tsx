import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import App from './App.tsx';
import { Provider } from './provider.tsx';
import '@/styles/globals.css';
import { GlobalAuthStateProvider } from './states/auth-state.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider>
        <GlobalAuthStateProvider>
          <App />
        </GlobalAuthStateProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
);
