// src/components/EmbedModeSelector.jsx
import React from 'react';
import './EmbedModeSelector.css';

/**
 * EmbedModeSelector Component
 * Allows the user to select between 'overlay' and 'embedded' modes.
 */
function EmbedModeSelector({ embedMode, setEmbedMode, title }) {
  return (
    <div className="embed-mode-selector" title={title}>
      <label>
        <input
          type="radio"
          value="overlay"
          checked={embedMode === 'overlay'}
          onChange={(e) => setEmbedMode(e.target.value)}
        />
        Overlay
      </label>
      <label>
        <input
          type="radio"
          value="embedded"
          checked={embedMode === 'embedded'}
          onChange={(e) => setEmbedMode(e.target.value)}
        />
        Embedded
      </label>
    </div>
  );
}

export default EmbedModeSelector;
