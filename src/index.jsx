import React from 'react';
import ReactDOM from 'react-dom/client';
import { injectSpeedInsights } from '@vercel/speed-insights';
import App from './App';
import './index.css';

// Initialize Vercel Speed Insights (client-side only)
// This must run on the client side to track performance metrics
if (typeof window !== 'undefined') {
  injectSpeedInsights();
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
