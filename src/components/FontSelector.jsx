// src/components/FontSelector.jsx
import React from 'react';
import './FontSelector.css';

/**
 * FontSelector Component
 * Renders a dropdown to select font families.
 *
 * @param {string} font - The current selected font.
 * @param {function} onChange - The handler for font changes.
 * @param {string} title - Tooltip text for the font selector.
 */
function FontSelector({ font, onChange, title }) {
  const fonts = [
    'sans-serif',
    'Arial, sans-serif',
    'Helvetica, sans-serif',
    'Courier New, monospace',
    'Times New Roman, serif',
    'Georgia, serif',
    'Verdana, sans-serif',
  ];

  return (
    <div className="font-selector" title={title}>
      <label>Font Family:</label>
      <select value={font} onChange={onChange}>
        {fonts.map((f, index) => (
          <option key={index} value={f}>
            {f.split(',')[0]}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FontSelector;
