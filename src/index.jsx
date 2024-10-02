// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Get the root element from the HTML
const container = document.getElementById('root');

// Create a root and render the App component
const root = ReactDOM.createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
