// src/components/PreviewWindow.jsx
import React from 'react';
import './PreviewWindow.css';

/**
 * PreviewWindow Component
 * Renders the live preview section with a button to refresh the widget.
 *
 * @param {function} loadWidget - The handler to load or refresh the Voiceflow widget.
 */
function PreviewWindow({ loadWidget }) {
  const handleRefresh = () => {
    loadWidget();
  };

  return (
    <div className="preview-window">
      <h2>Live Preview</h2>
      <button onClick={handleRefresh} title="Reload the widget to apply changes">
        Refresh Widget
      </button>
    </div>
  );
}

export default PreviewWindow;
