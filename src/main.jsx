import React from 'react';
import ReactDOM from 'react-dom/client';
import { ClerkProvider } from '@clerk/clerk-react';
import App from './App.jsx';
import ErrorBoundary from './ErrorBoundary.jsx';
import './index.css';

const pk = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const SAFE = import.meta.env.VITE_SAFE_MODE === '1';

function AppRoot(){
  if (SAFE) {
    return <App />;
  }
  if (!pk) {
    return (
      <div style={{ padding: 24 }}>
        <h1>Sovereign Sign In</h1>
        <p>Missing Clerk publishable key. Add VITE_CLERK_PUBLISHABLE_KEY to .env.local and restart dev.</p>
        <p>Debug without Clerk by setting VITE_SAFE_MODE=1 temporarily.</p>
      </div>
    );
  }
  return (
    <ClerkProvider publishableKey={pk}>
      <App />
    </ClerkProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <AppRoot />
    </ErrorBoundary>
  </React.StrictMode>
);
