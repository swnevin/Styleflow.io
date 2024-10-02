// src/components/ColorPicker.jsx
import React from 'react';
import './ColorPicker.css';

/**
 * ColorPicker Component
 * Renders a color input with a label.
 *
 * @param {string} label - The label for the color picker.
 * @param {string} color - The current color value.
 * @param {function} onChange - The handler for color changes.
 * @param {string} title - Tooltip text for the color picker.
 */
function ColorPicker({ label, color, onChange, title }) {
  return (
    <div className="color-picker" title={title}>
      <label>{label}</label>
      <input type="color" value={color} onChange={onChange} />
    </div>
  );
}

export default ColorPicker;
