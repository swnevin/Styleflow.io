// src/components/ThemeButton.jsx
import React from 'react';
import './ThemeButton.css';

/**
 * ThemeButton Component
 * Renders a button to switch themes.
 *
 * @param {string} theme - The theme this button represents.
 * @param {function} onClick - The handler for button clicks.
 * @param {boolean} active - Whether the button is active.
 * @param {ReactNode} children - The button label.
 * @param {string} title - Tooltip text for the button.
 */
function ThemeButton({ theme, onClick, active, children, title }) {
  return (
    <button
      className={`theme-button ${active ? 'active' : ''}`}
      onClick={() => onClick(theme)}
      title={title}
    >
      {children}
    </button>
  );
}

export default ThemeButton;
