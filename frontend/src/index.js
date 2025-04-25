import React from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot from react-dom/client
import { BrowserRouter } from 'react-router-dom'; // Assuming you're using react-router-dom
import App from './App'; // Your main App component

// Create a root element
const root = createRoot(document.getElementById('root'));

// Render the app
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);