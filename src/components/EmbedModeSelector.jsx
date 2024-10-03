// src/components/EmbedModeSelector.jsx
import React from 'react';
import './EmbedModeSelector.css';

/**
 * EmbedModeSelector Component
 * Allows the user to select between 'overlay' and 'embedded' modes.
 * Embedded option is disabled and marked as 'COMING SOON'.
 */
function EmbedModeSelector({ embedMode, setEmbedMode, title }) {
  return (
    <div className="embed-mode-selector" title={title}>
      {/* Overlay Option */}
      <label>
        <input
          type="radio"
          value="overlay"
          checked={embedMode === 'overlay'}
          onChange={(e) => setEmbedMode(e.target.value)}
        />
        Overlay
      </label>
      
      {/* Embedded Option (disabled and marked as 'COMING SOON') */}
      <label style={{ color: '#888', cursor: 'not-allowed' }}>
        <input
          type="radio"
          value="embedded"
          disabled
        />
        Embedded (COMING SOON)
      </label>
    </div>
  );
}

export default EmbedModeSelector;
